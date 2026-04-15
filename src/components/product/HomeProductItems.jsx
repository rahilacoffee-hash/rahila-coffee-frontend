import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import Rating from "@mui/material/Rating";
import api from "../../api/axios";
import { MyContext } from "../../App";

const PLACEHOLDER = "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop";

const HomeProductItems = ({ product }) => {
  const context = useContext(MyContext);
  if (!product) return null;

  // ← Handles both images[] array and single image field
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
      context.openAlertBox("error", err.response?.data?.message || "Failed");
    }
  };

  const addToWishlist = async (e) => {
    e.preventDefault();
    if (!context.isLogin) { context.openAlertBox("error", "Please login first"); return; }
    try {
      await api.post("/mylist/add", {
        productId: product._id,
        productTitle: product.name,
        image,
        rating: product.rating || 0,
        price: product.price,
      });
      context.openAlertBox("success", "Added to wishlist!");
    } catch (err) {
      context.openAlertBox("error", err.response?.data?.message || "Already in wishlist");
    }
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">

      {/* Image area */}
      <Link to={`/Product/${product._id}`} className="block relative overflow-hidden">
        <div className="h-[110px] overflow-hidden bg-amber-50 ">
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>

        {/* Left badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.countInStock === 0 && (
            <span className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Sold Out</span>
          )}
          {product.isFeatured && (
            <span className="bg-amber-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Featured</span>
          )}
        </div>

        {/* Roast badge */}
        {product.roastLevel && (
          <span className="absolute top-3 right-3 bg-white/90 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded-full capitalize shadow-sm">
            {product.roastLevel}
          </span>
        )}

        {/* Wishlist button — appears on hover */}
        <button
          onClick={addToWishlist}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50"
        >
          <IoMdHeartEmpty className="text-red-400 text-[16px]" />
        </button>
      </Link>

      {/* Product info */}
      <div className="flex flex-col flex-1 p-4">
        <p className="text-[10px] text-amber-800 font-semibold uppercase tracking-wider mb-1">
          {product.origin || "Single Origin"}
        </p>

        <Link to={`/Product/${product._id}`}>
          <h3 className="text-[14px] font-bold text-gray-800 hover:text-amber-800 transition-colors line-clamp-2 leading-tight mb-2">
            {product.name}
          </h3>
        </Link>

        <Rating value={product.rating || 0} precision={0.5} readOnly size="small" className="mb-3" />

        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span className="text-[18px] font-black text-gray-900">
            ${Number(product.price || 0).toFixed(2)}
          </span>

          {product.countInStock > 0 ? (
            <button
              onClick={addToCart}
              className="flex items-center gap-1.5 bg-amber-800 hover:bg-amber-900 active:scale-95 text-white text-[11px] font-bold px-3 py-2 rounded-xl transition-all shadow-sm"
            >
              <MdOutlineShoppingCart className="text-[15px]" /> Add
            </button>
          ) : (
            <span className="text-[11px] text-red-400 font-semibold">Out of Stock</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeProductItems;