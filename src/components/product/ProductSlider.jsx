import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import api from "../../api/axios";
import { MyContext } from "../../App";

// filter prop: "newArrival" | "popular"  (defaults to "newArrival")
function ProductSlider({ items = 6, filter = "newArrival" }) {
  const [products, setProducts]   = useState([]);
  const [loading, setLoading]     = useState(true);
  const [wishlist, setWishlist]   = useState([]);
  const context                   = useContext(MyContext);

  useEffect(() => {
    fetchProducts();
  }, [filter]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filter === "newArrival") params.append("isNewArrival", "true");
      if (filter === "popular")    params.append("isFeatured",   "true");
      params.append("limit", items);

      const res = await api.get(`/product?${params.toString()}`);
      setProducts(res.data.data || []);
    } catch (err) {
      console.error("ProductSlider fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    if (!context.isLogin) {
      context.openAlertBox("error", "Please login to add items to cart");
      return;
    }
    try {
      await api.post("/cart/add", { productId: product._id, quantity: 1 });
      context.openAlertBox("success", "Added to cart!");
      context.getCartData?.();
    } catch (err) {
      context.openAlertBox("error", err.response?.data?.message || "Failed to add");
    }
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id]
    );
  };

  const breakpoints = {
    0:   { slidesPerView: 1.3, spaceBetween: 12 },
    480: { slidesPerView: 2,   spaceBetween: 14 },
    768: { slidesPerView: 3,   spaceBetween: 16 },
    1024:{ slidesPerView: 4,   spaceBetween: 18 },
  };

  /* ── Loading skeletons ── */
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {Array.from({ length: items > 4 ? 4 : items }).map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse"
          >
            <div className="bg-gray-200 h-[160px] sm:h-[200px] w-full" />
            <div className="p-3 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
              <div className="h-8 bg-gray-200 rounded mt-3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* ── Empty state ── */
  if (!products.length) {
    return (
      <p className="text-center text-gray-400 text-sm py-8">
        No products found.
      </p>
    );
  }

  return (
    <div className="productSlider relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        breakpoints={breakpoints}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        loop={products.length > 4}
        className="!pb-10"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard
              product={product}
              isWishlisted={wishlist.includes(product._id)}
              onToggleWishlist={() => toggleWishlist(product._id)}
              onAddToCart={() => handleAddToCart(product)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

/* ── Individual product card ── */
function ProductCard({ product, isWishlisted, onToggleWishlist, onAddToCart }) {
  const discount = product.oldPrice && product.oldPrice > product.price
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : null;

  return (
    <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col">

      {/* ── Image area ── */}
      <div className="relative overflow-hidden bg-[#f5f0eb]">
        <Link to={`/Product/${product._id}`}>
          <img
            src={product.images?.[0]}
            alt={product.name}
            className="w-full h-[150px] sm:h-[190px] object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNewArrival && (
            <span className="bg-[#A0522D] text-white text-[10px] font-semibold px-2 py-[2px] rounded-full">
              NEW
            </span>
          )}
          {discount && (
            <span className="bg-red-500 text-white text-[10px] font-semibold px-2 py-[2px] rounded-full">
              -{discount}%
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={onToggleWishlist}
          className="absolute top-2 right-2 w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          {isWishlisted ? (
            <IoMdHeart className="text-red-500 text-[16px]" />
          ) : (
            <IoMdHeartEmpty className="text-gray-400 text-[16px]" />
          )}
        </button>
      </div>

      {/* ── Info area ── */}
      <div className="p-3 flex flex-col flex-1 gap-1">
        {/* Category badge */}
        {product.catName && (
          <span className="text-[10px] text-[#A0522D] font-semibold uppercase tracking-wide">
            {product.catName}
          </span>
        )}

        {/* Name */}
        <Link to={`/Product/${product._id}`}>
          <h4 className="text-[13px] sm:text-[14px] font-semibold text-[#2C1A0E] line-clamp-2 leading-snug hover:text-[#A0522D] transition-colors">
            {product.name}
          </h4>
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Rating
            size="small"
            value={product.rating || 0}
            precision={0.5}
            readOnly
            sx={{ fontSize: "14px" }}
          />
          <span className="text-[11px] text-gray-400">
            ({product.numReviews || 0})
          </span>
        </div>

        {/* Price row */}
        <div className="flex items-center gap-2 mt-auto pt-1">
          <span className="text-[14px] sm:text-[15px] font-bold text-[#A0522D]">
            ${product.price?.toFixed(2)}
          </span>
          {product.oldPrice && (
            <span className="text-[12px] text-gray-400 line-through">
              ${product.oldPrice?.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to cart */}
        <Button
          onClick={onAddToCart}
          className="btn-org !w-full !mt-2 !text-[11px] sm:!text-[12px] !py-[6px] flex items-center gap-1"
          size="small"
        >
          <MdOutlineShoppingCart className="text-[15px]" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}

export default ProductSlider;