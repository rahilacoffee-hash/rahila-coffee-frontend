import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  MdOutlineClose,
  MdDeleteOutline,
  MdOutlineShoppingCart,
  MdLocalShipping,
} from "react-icons/md";

/* =========================================================
   CONFIG — matches the header's "Free shipping over ₦100,000"
========================================================= */

const FREE_SHIPPING_THRESHOLD = 100000;

const currency = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});
const formatPrice = (n) => currency.format(n || 0);

/* =========================================================
   STYLES
========================================================= */

const primaryBtn =
  "flex-1 rounded-full bg-[#A0522D] px-4 py-2.5 text-center text-[13px] font-semibold text-white hover:bg-[#8B4526] transition-colors";
const outlineBtn =
  "flex-1 rounded-full border border-[#A0522D] px-4 py-2.5 text-center text-[13px] font-semibold text-[#A0522D] hover:bg-[#A0522D] hover:text-white transition-colors";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

/* =========================================================
   FREE SHIPPING PROGRESS
========================================================= */

const ShippingProgress = ({ subtotal }) => {
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  const pct = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <div className="border-b bg-[#F5F0EB] px-4 py-3">
      <p className="flex items-center gap-2 text-[12px] text-[#2C1A0E]">
        <MdLocalShipping className="text-[16px] text-[#A0522D]" />
        {remaining === 0 ? (
          <span className="font-semibold">You've unlocked free shipping!</span>
        ) : (
          <span>
            Add <strong>{formatPrice(remaining)}</strong> more for free shipping
          </span>
        )}
      </p>
      <div
        className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#E8DDCA]"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
        aria-label="Progress towards free shipping"
      >
        <div
          className="h-full rounded-full bg-[#A0522D] transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};

/* =========================================================
   CART DRAWER
   props: open, onClose, items, loading, subtotal, onRemove
========================================================= */

const CartDrawer = ({ open, onClose, items, loading, subtotal, onRemove }) => {
  const panelRef = useRef(null);
  const closeRef = useRef(null);
  const onCloseRef = useRef(onClose);
  const [removingId, setRemovingId] = useState(null);

  /* Always call the latest onClose without re-running the effect below,
     so an inline handler in the parent can't reset focus on every render */
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  /* Scroll lock, Escape, focus trap, and focus restore */
  useEffect(() => {
    if (!open) return undefined;

    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const nodes = panelRef.current.querySelectorAll(FOCUSABLE);
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const raf = requestAnimationFrame(() => closeRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      cancelAnimationFrame(raf);
      previouslyFocused?.focus?.();
    };
  }, [open]);

  const handleRemove = async (itemId, productId) => {
    setRemovingId(itemId);
    try {
      await onRemove(itemId, productId);
    } finally {
      setRemovingId(null);
    }
  };

  const hasItems = items.length > 0;
  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  return (
    /* `invisible` keeps the closed drawer out of the tab order; the
       visibility transition waits for the slide-out to finish */
    <div
      className={`fixed inset-0 z-[60] transition-[visibility] duration-300 ${
        open ? "visible" : "invisible"
      }`}
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`absolute inset-0 bg-[#2C1A0E]/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`absolute right-0 top-0 bottom-0 flex w-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-out sm:w-[400px] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-4 py-3">
          <h2 className="text-[16px] font-semibold text-[#2C1A0E]">
            Shopping Cart ({items.length})
          </h2>
          <button
            ref={closeRef}
            type="button"
            aria-label="Close cart"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-[#A0522D] transition-colors"
          >
            <MdOutlineClose className="text-[22px]" />
          </button>
        </div>

        {hasItems && !loading && <ShippingProgress subtotal={subtotal} />}

        {/* Items */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4">
          {loading ? (
            <p className="py-8 text-center text-sm text-gray-400" role="status">
              Loading your cart...
            </p>
          ) : !hasItems ? (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <MdOutlineShoppingCart className="text-[44px] text-gray-300" />
              <p className="text-sm text-gray-500">Your cart is empty</p>
              <Link to="/ShopNow" onClick={onClose} className={`${primaryBtn} flex-none px-6`}>
                Shop Coffee
              </Link>
            </div>
          ) : (
            <ul>
              {items.map((item) => {
                const product = item.productId;
                const lineTotal = (product?.price || 0) * item.quantity;
                const removing = removingId === item._id;

                return (
                  <li
                    key={item._id}
                    className={`flex items-start gap-3 border-b py-4 transition-opacity ${
                      removing ? "opacity-40" : ""
                    }`}
                  >
                    <Link
                      to={product?._id ? `/Product/${product._id}` : "#"}
                      onClick={onClose}
                      className="shrink-0"
                    >
                      <img
                        src={product?.images?.[0]}
                        alt={product?.name || "Product"}
                        className="h-[64px] w-[64px] rounded-md bg-gray-100 object-cover sm:h-[72px] sm:w-[72px]"
                      />
                    </Link>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="line-clamp-2 text-sm font-medium text-[#2C1A0E]">
                          {product?.name}
                        </h3>
                        <button
                          type="button"
                          disabled={removing}
                          aria-label={`Remove ${product?.name || "item"} from cart`}
                          onClick={() => handleRemove(item._id, product?._id)}
                          className="-mr-1 -mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-red-400 hover:bg-red-50 disabled:cursor-not-allowed transition-colors"
                        >
                          <MdDeleteOutline className="text-[18px]" />
                        </button>
                      </div>

                      <p className="mt-1 text-xs text-gray-500">
                        {formatPrice(product?.price)} × {item.quantity}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-amber-700">
                        {formatPrice(lineTotal)}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer */}
        {hasItems && !loading && (
          <div className="space-y-2 border-t px-4 py-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-bold text-amber-700">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className={freeShipping ? "font-semibold text-green-700" : "text-gray-500"}>
                {freeShipping ? "Free" : "Calculated at checkout"}
              </span>
            </div>

            <div className="flex flex-col gap-2 pt-2 sm:flex-row">
              <Link to="/cart" onClick={onClose} className={outlineBtn}>
                View Cart
              </Link>
              <Link to="/checkout" onClick={onClose} className={primaryBtn}>
                Checkout
              </Link>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
};

export default CartDrawer;