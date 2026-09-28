import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GiCoffeeBeans } from "react-icons/gi";
import { MdKeyboardArrowDown, MdChevronLeft, MdChevronRight } from "react-icons/md";

import Sidebar from "../../components/sidebar/Sidebar";
import ProductItems from "../../components/product/ProductItems";
import api from "../../api/axios";

/* =========================================================
   CONSTANTS
========================================================= */

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First", menuLabel: "Newest", param: null },
  { value: "priceLow", label: "Price: Low to High", menuLabel: "Low Price", param: "price" },
  { value: "priceHigh", label: "Price: High to Low", menuLabel: "High Price", param: "-price" },
  { value: "name", label: "Name (A-Z)", menuLabel: "Name", param: "name" },
];

/* =========================================================
   HOOKS
========================================================= */

const useDebounced = (value, delay = 400) => {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
};

/* =========================================================
   SORT DROPDOWN (replaces MUI Button + Menu)
========================================================= */

const SortDropdown = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = SORT_OPTIONS.find((o) => o.value === value) || SORT_OPTIONS[0];

  useEffect(() => {
    if (!open) return undefined;
    const onMouseDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded-md border-2 border-amber-800 bg-white px-3 py-1.5 text-[12px] font-bold text-gray-600 hover:border-amber-900 focus-visible:outline-2 focus-visible:outline-amber-700 transition-colors"
      >
        {current.label}
        <MdKeyboardArrowDown
          className={`text-[18px] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 z-20 mt-1 min-w-[160px] overflow-hidden rounded-md border border-gray-200 bg-white py-1 shadow-lg"
        >
          {SORT_OPTIONS.map((o) => (
            <li key={o.value} role="option" aria-selected={o.value === value}>
              <button
                type="button"
                onClick={() => {
                  onChange(o.value);
                  setOpen(false);
                }}
                className={`w-full px-4 py-2 text-left text-[13px] hover:bg-gray-100 transition-colors ${
                  o.value === value ? "font-semibold text-amber-800" : "text-gray-800"
                }`}
              >
                {o.menuLabel}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

/* =========================================================
   PAGINATION (replaces MUI Pagination)
========================================================= */

const getPageWindow = (page, total) => {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages = new Set([1, total, page - 1, page, page + 1]);
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
  const out = [];
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) out.push("gap-" + p);
    out.push(p);
  });
  return out;
};

const Pagination = ({ page, count, onChange }) => {
  if (count <= 1) return null;

  const base =
    "min-w-[34px] h-[34px] px-2 flex items-center justify-center rounded-full text-[13px] transition-colors";

  return (
    <nav aria-label="Pagination" className="flex items-center gap-1">
      <button
        type="button"
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className={`${base} hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent`}
      >
        <MdChevronLeft className="text-[20px]" />
      </button>

      {getPageWindow(page, count).map((p) =>
        typeof p === "string" ? (
          <span key={p} className="px-1 text-gray-400" aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            aria-current={p === page ? "page" : undefined}
            onClick={() => onChange(p)}
            className={`${base} ${
              p === page ? "bg-[#A0522D] text-white font-semibold" : "hover:bg-gray-100"
            }`}
          >
            {p}
          </button>
        )
      )}

      <button
        type="button"
        aria-label="Next page"
        disabled={page === count}
        onClick={() => onChange(page + 1)}
        className={`${base} hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent`}
      >
        <MdChevronRight className="text-[20px]" />
      </button>
    </nav>
  );
};

/* =========================================================
   PAGE
========================================================= */

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");

  // Filters
  const [category, setCategory] = useState("");
  const [roast, setRoast] = useState("");
  const [origin, setOrigin] = useState("");

  // Mobile sidebar toggle
  const [showSidebar, setShowSidebar] = useState(false);

  const debouncedSearch = useDebounced(search);

  /* Any filter change should return to page 1 */
  const withReset = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  /* One fetch effect; stale requests are cancelled */
  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();

        if (debouncedSearch) params.append("search", debouncedSearch);
        if (roast) params.append("roast", roast);
        if (category) params.append("catName", category);
        if (origin) params.append("origin", origin);

        const sortParam = SORT_OPTIONS.find((o) => o.value === sort)?.param;
        if (sortParam) params.append("sort", sortParam);

        // Page 1 keeps the original request shape; later pages ask for their page
        if (page > 1) params.append("page", page);

        const res = await api.get(`/product?${params.toString()}`, {
          signal: controller.signal,
        });

        setProducts(res.data.data || []);
        setTotalPages(res.data.totalPages || res.data.pagination?.totalPages || 1);
      } catch (err) {
        if (err.code === "ERR_CANCELED") return;
        console.error(err);
        setProducts([]);
        setError(err.response?.data?.message || "Could not load products.");
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    };

    fetchProducts();
    return () => controller.abort();
  }, [page, sort, roast, category, origin, debouncedSearch, reloadKey]);

  return (
    <section className="bg-[#F5F0EB] pt-[120px] lg:pt-[128px] pb-0">
      {/* Breadcrumb */}
      <div className="container pb-4">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-[14px] text-[#2C1A0E]">
            <li>
              <Link to="/" className="hover:text-[#A0522D] hover:underline">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="opacity-60">
              /
            </li>
            <li aria-current="page">Shop</li>
          </ol>
        </nav>
      </div>

      <div className="bg-white p-3">
        <div className="container flex flex-col lg:flex-row gap-3">
          {/* Sidebar */}
          <div
            id="shop-filters"
            className={`w-full lg:w-[20%] ${showSidebar ? "block" : "hidden"} lg:block`}
          >
            <Sidebar
              category={category}
              setCategory={withReset(setCategory)}
              roast={roast}
              setRoast={withReset(setRoast)}
              origin={origin}
              setOrigin={withReset(setOrigin)}
            />
          </div>

          {/* Content */}
          <div className="w-full lg:w-[80%]">
            {/* Top bar */}
            <div className="bg-[#f1f1f1] p-3 mb-3 rounded-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  aria-label="Toggle filters"
                  aria-expanded={showSidebar}
                  aria-controls="shop-filters"
                  onClick={() => setShowSidebar((v) => !v)}
                  className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-black hover:bg-black/5 transition-colors"
                >
                  <GiCoffeeBeans />
                </button>

                <span className="text-[14px] font-medium">
                  {products.length} {products.length === 1 ? "product" : "products"}
                </span>

                <input
                  type="search"
                  aria-label="Search coffee"
                  placeholder="Search coffee..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full sm:w-[180px] px-3 py-1.5 border border-gray-200 rounded-md text-[13px] focus:outline-none focus:border-amber-700"
                />
              </div>

              <div className="flex items-center gap-2">
                <p className="text-[14px] font-medium">Sort:</p>
                <SortDropdown value={sort} onChange={withReset(setSort)} />
              </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {loading ? (
                <p className="col-span-full text-center py-10 text-gray-400" role="status">
                  Loading products...
                </p>
              ) : error ? (
                <div className="col-span-full text-center py-10" role="alert">
                  <p className="text-gray-500">{error}</p>
                  <button
                    type="button"
                    onClick={() => setReloadKey((k) => k + 1)}
                    className="mt-3 rounded-full bg-[#A0522D] px-5 py-2 text-[12px] font-semibold text-white hover:bg-[#8B4526] transition-colors"
                  >
                    Try again
                  </button>
                </div>
              ) : products.length === 0 ? (
                <p className="col-span-full text-center py-10 text-gray-400">
                  No products found.
                </p>
              ) : (
                products.map((product) => (
                  <ProductItems key={product._id} product={product} />
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-6 sm:mt-8 pb-4">
              <Pagination page={page} count={totalPages} onChange={setPage} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListing;