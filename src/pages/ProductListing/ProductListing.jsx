import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ProductItems from "../../components/product/ProductItems";
import Button from "@mui/material/Button";
import { GiCoffeeBeans } from "react-icons/gi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Pagination from "@mui/material/Pagination";
import api from "../../api/axios";

const ProductListing = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("newest");
  const [search, setSearch] = useState("");

  // Filters
  const [category, setCategory] = useState("");
  const [roast, setRoast] = useState("");
  const [origin, setOrigin] = useState("");

  // Mobile sidebar toggle
  const [showSidebar, setShowSidebar] = useState(false);

  const open = Boolean(anchorEl);

  useEffect(() => {
    fetchProducts();
  }, [page, sort, roast, category, origin]);

  useEffect(() => {
    const timer = setTimeout(() => fetchProducts(), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();

      if (search) params.append("search", search);
      if (roast) params.append("roast", roast);
      if (category) params.append("category", category);
      if (origin) params.append("origin", origin);

      if (sort === "priceLow") params.append("sort", "price");
      if (sort === "priceHigh") params.append("sort", "-price");
      if (sort === "name") params.append("sort", "name");

      const res = await api.get(`/product?${params.toString()}`);
      setProducts(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = (option) => {
    if (option) setSort(option);
    setAnchorEl(null);
  };

  const sortLabel = {
    newest: "Newest First",
    priceLow: "Price: Low to High",
    priceHigh: "Price: High to Low",
    name: "Name (A-Z)",
  }[sort] || "Sort";

  return (
    <section className="py-5 pb-0">
      {/* Breadcrumb */}
      <div className="container text-white">
        <Breadcrumbs className="!text-white">
          <Link underline="hover" color="inherit" href="/">Home</Link>
          <Link underline="hover" color="inherit" href="/">Shop</Link>
        </Breadcrumbs>
      </div>

      <div className="bg-white p-3 mt-4">
        {/* ✅ RESPONSIVE LAYOUT */}
        <div className="container flex flex-col lg:flex-row gap-3">

          {/* ✅ SIDEBAR */}
          <div className={`w-full lg:w-[20%] ${showSidebar ? "block" : "hidden"} lg:block`}>
            <Sidebar
              category={category}
              setCategory={setCategory}
              roast={roast}
              setRoast={setRoast}
              origin={origin}
              setOrigin={setOrigin}
            />
          </div>

          {/* ✅ RIGHT CONTENT */}
          <div className="w-full lg:w-[80%]">

            {/* TOP BAR */}
            <div className="bg-[#f1f1f1] p-3 mb-3 rounded-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              
              {/* LEFT */}
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <Button
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-black"
                >
                  <GiCoffeeBeans />
                </Button>

                <span className="text-[14px] font-[500]">
                  {products.length} products
                </span>

                {/* SEARCH */}
                <input
                  type="text"
                  placeholder="Search coffee..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full sm:w-[180px] px-3 py-1.5 border border-gray-200 rounded-md text-[13px] focus:outline-none focus:border-amber-700"
                />
              </div>

              {/* SORT */}
              <div className="flex items-center gap-2">
                <p className="text-[14px] font-[500]">Sort:</p>

                <Button
                  onClick={handleClick}
                  className="!bg-white !text-[12px] !text-gray-600 !font-bold !border-2 !border-slate-300"
                >
                  {sortLabel}
                </Button>

                <Menu anchorEl={anchorEl} open={open} onClose={() => handleClose(null)}>
                  <MenuItem onClick={() => handleClose("newest")}>Newest</MenuItem>
                  <MenuItem onClick={() => handleClose("priceLow")}>Low Price</MenuItem>
                  <MenuItem onClick={() => handleClose("priceHigh")}>High Price</MenuItem>
                  <MenuItem onClick={() => handleClose("name")}>Name</MenuItem>
                </Menu>
              </div>
            </div>

            {/* PRODUCTS GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {loading ? (
                <p className="col-span-4 text-center py-10 text-gray-400">
                  Loading products...
                </p>
              ) : products.length === 0 ? (
                <p className="col-span-4 text-center py-10 text-gray-400">
                  No products found.
                </p>
              ) : (
                products.map((product) => (
                  <ProductItems key={product._id} product={product} />
                ))
              )}
            </div>

            {/* PAGINATION */}
            <div className="flex items-center justify-center mt-6 sm:mt-8">
              <Pagination
                count={10}
                page={page}
                onChange={(e, val) => setPage(val)}
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductListing;