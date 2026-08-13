import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import Rating from "@mui/material/Rating";
import api from "../../api/axios";
import { MyContext } from "../../App";

const PLACEHOLDER = "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop";

const ROAST_POSITIONS = {
  light: 8,
  "medium-light": 29,
  medium: 50,
  "medium-dark": 71,
  dark: 92,
};

function getRoastPosition(level) {
  return ROAST_POSITIONS[(level || "").toLowerCase()] ?? 50;
}

function getOriginCode(origin) {
  if (!origin) return "SGL·ORI";
  let words = origin.trim().split(/\s+/);
  if (words.length === 1) return words[0].slice(0, 3).toUpperCase();
  return words.map((w) => w[0]).join("").slice(0, 3).toUpperCase();
}

function HomeProductItems({ product }) {
  let context = useContext(MyContext);
  if (!product) return null;

  let image = Array.isArray(product.images) && product.images.length > 0
    ? product.images[0]
    : product.image || PLACEHOLDER;

  let inWishlist = context.wishlistIds?.includes?.(product._id) || false;
  let roastPct = getRoastPosition(product.roastLevel);

  async function addToCart(e) {
    e.preventDefault();
    if (!context.isLogin) { context.openAlertBox("error", "Please login first"); return; }
    try {
      await api.post("/cart/add", { productId: product._id });
      context.openAlertBox("success", "Added to cart!");
      context.fetchCartItems?.();
    } catch (err) {
      context.openAlertBox("error", err.response?.data?.message || "Failed");
    }
  }

  async function addToWishlist(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!context.isLogin) { context.openAlertBox("error", "Please login first"); return; }
    try {
      const existing = context.wishlistItems?.find((item) => item.productId === product._id);
      if (existing) {
        await api.delete(`/mylist/delete/${existing._id}`);
        context.openAlertBox("success", "Removed from wishlist");
        context.fetchWishlist?.();
        return;
      }
      await api.post("/mylist/add", {
        productId: product._id,
        productTitle: product.name,
        image,
        rating: product.rating || 0,
        price: product.price,
      });
      context.fetchWishlist?.();
      context.openAlertBox("success", "Added to wishlist!");
    } catch (err) {
      context.openAlertBox("error", err.response?.data?.message || "Already in wishlist");
    }
  }

  return (
    <div className="group relative flex flex-col w-full bg-[#F3E9D8] border border-[#1C1410]/10 shadow-[0_1px_2px_rgba(28,20,16,0.06)] hover:shadow-[0_18px_36px_-12px_rgba(28,20,16,0.35)] hover:-translate-y-1 transition-all duration-500 ease-out">

      {/* Image + origin stamp */}
      <Link to={`/Product/${product._id}`} className="block relative overflow-hidden">
        <div className="aspect-[4/3] overflow-hidden bg-[#E7D9BE] relative">
          <img
            src={image}
            alt={product.name}
            className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1410]/25 via-transparent to-transparent" />
        </div>

        {/* Rotated origin stamp — overlaps image bottom edge */}
        <div
          className="absolute -bottom-3 sm:-bottom-4 left-3 sm:left-4 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#F3E9D8] border-2 border-[#8F5A2B] flex items-center justify-center shadow-md -rotate-6 group-hover:rotate-0 transition-transform duration-500"
        >
          <span
            className="text-[7px] sm:text-[9px] font-bold text-[#6E2A3D] tracking-wider leading-none"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            {getOriginCode(product.origin)}
          </span>
        </div>

        {/* Status badges */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 flex flex-col gap-1">
          {product.countInStock === 0 && (
            <span
              className="bg-[#6E2A3D] text-[#F3E9D8] text-[8px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-0.5 tracking-wide uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Sold Out
            </span>
          )}
          {product.isFeatured && (
            <span
              className="bg-[#B8763C] text-[#F3E9D8] text-[8px] sm:text-[9px] font-bold px-1.5 sm:px-2 py-0.5 tracking-wide uppercase"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Featured
            </span>
          )}
        </div>

        {/* Wishlist — corner stamp button, always visible on touch devices */}
        <button
          onClick={addToWishlist}
          aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3 w-9 h-9 sm:w-8 sm:h-8 rounded-full bg-[#F3E9D8]/95 backdrop-blur-sm flex items-center justify-center opacity-100 sm:opacity-0 sm:group-hover:opacity-100 translate-y-0 sm:translate-y-1 sm:group-hover:translate-y-0 transition-all duration-300 hover:bg-[#F3E9D8] active:scale-90"
        >
          {inWishlist
            ? <IoMdHeart className="text-[#6E2A3D] text-[16px]" />
            : <IoMdHeartEmpty className="text-[#6E2A3D] text-[16px]" />
          }
        </button>
      </Link>

      {/* Body */}
      <div className="flex flex-col flex-1 pt-5 sm:pt-6 pb-3 sm:pb-4 px-3 sm:px-4">
        <p
          className="text-[8px] sm:text-[9px] text-[#8F5A2B] font-semibold uppercase tracking-[0.12em] sm:tracking-[0.15em] mb-1 sm:mb-1.5"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {product.origin || "Single Origin"}
        </p>

        <Link to={`/Product/${product._id}`}>
          <h3
            className="text-[clamp(15px,4.2vw,19px)] font-semibold text-[#1C1410] group-hover:text-[#6E2A3D] transition-colors line-clamp-2 leading-[1.15] mb-2.5 sm:mb-3"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {product.name}
          </h3>
        </Link>

        {/* Roast intensity gauge — signature element */}
        <div className="mb-2.5 sm:mb-3">
          <div className="flex items-center justify-between mb-1">
            <span
              className="text-[7px] sm:text-[8px] text-[#1C1410]/50 uppercase tracking-widest"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Light
            </span>
            <span
              className="text-[7px] sm:text-[8px] text-[#1C1410]/50 uppercase tracking-widest"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Dark
            </span>
          </div>
          <div className="relative h-[3px] rounded-full bg-gradient-to-r from-[#E3C79A] via-[#B8763C] to-[#1C1410]">
            <div
              className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-[#F3E9D8] border-2 border-[#1C1410] shadow-sm transition-all duration-300"
              style={{ left: `calc(${roastPct}% - 5px)` }}
            />
          </div>
          {product.roastLevel && (
            <span
              className="block text-center text-[7px] sm:text-[8px] text-[#1C1410]/60 uppercase tracking-widest mt-1"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {product.roastLevel} roast
            </span>
          )}
        </div>

        <Rating
          value={product.rating || 0}
          precision={0.5}
          readOnly
          size="small"
          className="mb-2.5 sm:mb-3"
          sx={{
            color: "#B8763C",
            fontSize: "clamp(14px, 3.6vw, 18px)",
            "& .MuiRating-iconEmpty": { color: "#1C1410", opacity: 0.15 },
          }}
        />

        {/* Perforated divider */}
        <div className="border-t border-dashed border-[#1C1410]/20 mt-auto pt-2.5 sm:pt-3 flex items-center justify-between gap-2 flex-wrap">
          <span
            className="text-[clamp(16px,4.5vw,20px)] font-bold text-[#1C1410]"
            style={{ fontFamily: "'JetBrains Mono', monospace" }}
          >
            ${Number(product.price || 0).toFixed(2)}
          </span>

          {product.countInStock > 0 ? (
            <button
              onClick={addToCart}
              aria-label="Add to cart"
              className="flex items-center justify-center gap-1.5 bg-[#1C1410] hover:bg-[#B8763C] active:scale-95 text-[#F3E9D8] text-[9px] sm:text-[10px] font-bold px-3 sm:px-3.5 py-2.5 min-h-[40px] sm:min-h-0 uppercase tracking-wider transition-all duration-300"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              <MdOutlineShoppingCart className="text-[14px] shrink-0" /> Add
            </button>
          ) : (
            <span
              className="text-[9px] sm:text-[10px] text-[#6E2A3D] font-semibold uppercase tracking-wider"
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Out of Stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeProductItems;
