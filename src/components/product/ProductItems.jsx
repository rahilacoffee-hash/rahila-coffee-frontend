import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import Rating from "@mui/material/Rating";
import api from "../../api/axios";
import { MyContext } from "../../App";

const PLACEHOLDER = "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop";

const ProductItems = ({ product }) => {
  const context = useContext(MyContext);
  if (!product) return null;

  const image = Array.isArray(product.images) && product.images.length > 0
    ? product.images[0]
    : product.image || PLACEHOLDER;

  const addToCart = async (e) => {
    e.preventDefault();
    if (!context.isLogin) { context.openAlertBox("error", "Please login first"); return; }
    try {
      await api.post("/cart/add", { productId: product._id });
      context.openAlertBox("success", "Added to cart!");
      context.fetchCartItems?.();
    } catch (err) {
      context.openAlertBox("error", err.response?.data?.message || "Failed to add");
    }
  };

  const addToWishlist = async (e) => {
    e.preventDefault();
    if (!context.isLogin) { context.openAlertBox("error", "Please login first"); return; }
    try {
      await api.post("/mylist/add", {
        productId:    product._id,
        productTitle: product.name,
        image,
        rating:       product.rating || 0,
        price:        product.price,
      });
      context.openAlertBox("success", "Added to wishlist!");
    } catch (err) {
      context.openAlertBox("error", err.response?.data?.message || "Already in wishlist");
    }
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 h-full">

      {/* Image */}
      <Link to={`/Product/${product._id}`} className="block relative overflow-hidden">
        <div className="h-[150px] sm:h-[180px] md:h-[200px] overflow-hidden bg-amber-50">
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.countInStock === 0 && (
            <span className="bg-red-500 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              Sold Out
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-amber-800 text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              Featured
            </span>
          )}
        </div>

        {/* Roast badge */}
        {product.roastLevel && (
          <span className="absolute top-2 right-2 bg-white/90 text-amber-900 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-full capitalize shadow-sm">
            {product.roastLevel}
          </span>
        )}

        {/* Wishlist on hover — hidden on mobile, shows on hover for desktop */}
        <button
          onClick={addToWishlist}
          className="hidden sm:flex absolute bottom-2 right-2 w-7 h-7 rounded-full bg-white shadow-md items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50"
        >
          <IoMdHeartEmpty className="text-red-400 text-[14px]" />
        </button>
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-2.5 sm:p-3 md:p-4">

        {/* Origin */}
        <p className="text-[9px] sm:text-[10px] text-amber-800 font-semibold uppercase tracking-wider mb-0.5 truncate">
          {product.origin || "Single Origin"}
        </p>

        {/* Name */}
        <Link to={`/Product/${product._id}`}>
          <h3 className="text-[12px] sm:text-[13px] md:text-[14px] font-bold text-gray-800 hover:text-amber-800 transition-colors line-clamp-2 leading-tight mb-1.5">
            {product.name}
          </h3>
        </Link>

        {/* Rating — hide on very small screens */}
        <div className="hidden xs:block mb-2">
          <Rating
            value={product.rating || 0}
            precision={0.5}
            readOnly
            size="small"
            sx={{ "& .MuiRating-icon": { fontSize: "14px" } }}
          />
        </div>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100">
          <span className="text-[13px] sm:text-[15px] md:text-[16px] font-black text-gray-900">
            ${Number(product.price || 0).toFixed(2)}
          </span>

          {product.countInStock > 0 ? (
            <button
              onClick={addToCart}
              className="flex items-center gap-1 bg-amber-800 hover:bg-amber-900 active:scale-95 text-white
                text-[9px] sm:text-[10px] md:text-[11px] font-bold
                px-2 sm:px-2.5 md:px-3
                py-1.5 sm:py-2
                rounded-lg transition-all shadow-sm"
            >
              <MdOutlineShoppingCart className="text-[12px] sm:text-[13px] md:text-[14px]" />
              <span className="hidden sm:inline">Add</span>
            </button>
          ) : (
            <span className="text-[9px] sm:text-[10px] text-red-400 font-semibold">Out of Stock</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItems;