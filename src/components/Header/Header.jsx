import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  MdOutlineShoppingCart,
  MdOutlineLogout,
  MdMenu,
  MdClose,
  MdSearch,
  MdKeyboardArrowRight,
  MdLocalShipping,
} from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";

import Profile from "./Account/Profile";
import { MyContext } from "../../App";

/* =========================================================
   DATA
========================================================= */

const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/ShopNow" },
  { label: "Our Story", to: "/stories" },
  { label: "About Us", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const ACCOUNT_LINKS = [
  { label: "My Account", to: "/my-account", Icon: FaRegUser, size: "text-[15px]" },
  { label: "My Orders", to: "/my-orders", Icon: MdOutlineShoppingCart, size: "text-[16px]" },
  { label: "My Wishlist", to: "/my-list", Icon: IoMdHeartEmpty, size: "text-[17px]" },
];

/* =========================================================
   SMALL PIECES (replace MUI Badge / IconButton / Tooltip)
========================================================= */

const CountBadge = ({ count }) =>
  count > 0 ? (
    <span
      className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 flex items-center justify-center rounded-full bg-[#A0522D] text-white text-[9px] font-bold border-2 border-[#F5F0EB]"
      aria-hidden="true"
    >
      {count}
    </span>
  ) : null;

const iconBtn =
  "relative w-10 h-10 flex items-center justify-center rounded-full text-[#2C1A0E] hover:bg-[#E8DDCA] focus-visible:outline-2 focus-visible:outline-[#A0522D] transition-colors duration-300";

/* Tooltip is pure CSS: hover or keyboard focus on the wrapper */
const Tip = ({ label, children }) => (
  <span className="relative group inline-flex">
    {children}
    <span
      role="tooltip"
      className="hidden md:block pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap rounded bg-[#2C1A0E] px-2 py-1 text-[11px] text-[#F5F0EB] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
    >
      {label}
    </span>
  </span>
);

const shopBtn =
  "inline-flex items-center justify-center rounded-full bg-[#A0522D] text-white font-semibold tracking-wide transition-all duration-300 hover:bg-[#8B4526] hover:shadow-lg hover:shadow-[#A0522D]/20";

/* =========================================================
   HEADER
========================================================= */

const Header = () => {
  const context = useContext(MyContext);
  const location = useLocation();

  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const userMenuRef = useRef(null);

  const cartCount = context.cartItems?.length || 0;
  const wishlistCount = context.wishlistIds?.length || 0;

  /* Header turns solid while scrolled or while the mobile drawer is open */
  const solid = isScrolled || mobileMenuOpen;

  const isActive = (path) => location.pathname === path;

  /* Scroll detection */
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close menus on route change */
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
  }, [location.pathname]);

  /* Escape closes whichever menu is open */
  useEffect(() => {
    if (!mobileMenuOpen && !userMenuOpen) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileMenuOpen, userMenuOpen]);

  /* Lock page scroll behind the mobile drawer */
  useEffect(() => {
    if (!mobileMenuOpen) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileMenuOpen]);

  /* Close the drawer if the viewport grows to desktop */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = (e) => e.matches && setMobileMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* Click outside closes the user dropdown */
  useEffect(() => {
    if (!userMenuOpen) return undefined;
    const onClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [userMenuOpen]);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        solid
          ? "bg-[#F5F0EB]/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(44,26,14,0.08)]"
          : "bg-white/10 backdrop-blur-md"
      }`}
    >
      {/* ---------- Announcement bar ---------- */}
      <div
        className={`transition-all duration-500 ${
          solid ? "bg-[#2C1A0E]" : "bg-[#2C1A0E]/85 backdrop-blur-sm"
        }`}
      >
        <div className="container">
          <div className="h-8 flex items-center justify-center sm:justify-between">
            <div className="flex items-center gap-2 whitespace-nowrap text-[#F5F0EB] text-[10px] sm:text-[11px] tracking-wide">
              <MdLocalShipping className="text-[#D4A853] text-[15px]" />
              <span>
                Free shipping on orders over
                <span className="font-semibold text-[#D4A853] ml-1">₦100,000</span>
              </span>
            </div>

            <div className="hidden sm:flex items-center gap-5 text-[10px] uppercase tracking-[0.12em] text-[#D9C9BB]">
              <Link to="/help-center" className="hover:text-white transition-colors">
                Help Center
              </Link>
              <span className="w-px h-3 bg-white/20" />
              <Link to="/order-tracking" className="hover:text-white transition-colors">
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Main bar ---------- */}
      <div
        className={`border-b transition-all duration-500 ${
          solid
            ? "bg-[#F5F0EB]/95 backdrop-blur-xl border-[#2C1A0E]/10"
            : "bg-white/10 backdrop-blur-md border-white/20"
        }`}
      >
        <div className="container">
          <div className="h-[70px] lg:h-[78px] flex items-center justify-between gap-2 sm:gap-5">
            {/* Logo */}
            <Link to="/" aria-label="Rahila Coffee home" className="flex items-center gap-1 shrink-0">
              <span className="text-[25px] sm:text-[28px] leading-none font-serif font-semibold tracking-[-0.04em] text-[#2C1A0E]">
                R
              </span>
              <span className="flex flex-col leading-none">
                <span className="text-[17px] sm:text-[19px] font-semibold tracking-[0.08em] text-[#2C1A0E]">
                  AHILA
                </span>
                <span className="text-[7px] sm:text-[8px] tracking-[0.42em] text-[#A0522D] ml-[2px] mt-1">
                  COFFEE
                </span>
              </span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-10" aria-label="Main">
              {NAV_ITEMS.map((item) => {
                const active = isActive(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                      active ? "text-[#A0522D]" : "text-[#2C1A0E] hover:text-[#A0522D]"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 -bottom-1 h-[2px] rounded-full bg-[#A0522D] transition-all duration-300 ${
                        active ? "w-full opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                  </Link>
                );
              })}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-0.5 sm:gap-2">
              <Tip label="Search">
                <button type="button" aria-label="Search" className={iconBtn}>
                  <MdSearch className="text-[21px]" />
                </button>
              </Tip>

              <div className="hidden sm:block">
                <Tip label="My Wishlist">
                  <Link to="/my-list" aria-label="Open my wishlist" className={iconBtn}>
                    <IoMdHeartEmpty className="text-[21px]" />
                    <CountBadge count={wishlistCount} />
                  </Link>
                </Tip>
              </div>

              <Tip label="Shopping Cart">
                <button
                  type="button"
                  aria-label="Open shopping cart"
                  onClick={() => context.setOpennCartPanel(true)}
                  className={iconBtn}
                >
                  <MdOutlineShoppingCart className="text-[22px]" />
                  <CountBadge count={cartCount} />
                </button>
              </Tip>

              {/* User / profile */}
              {context.isLogin === false ? (
                <Profile />
              ) : (
                <div className="relative ml-1" ref={userMenuRef}>
                  <button
                    type="button"
                    aria-haspopup="menu"
                    aria-expanded={userMenuOpen}
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="flex items-center gap-2 rounded-full p-1 text-[#2C1A0E] hover:bg-[#E8DDCA]/60 focus-visible:outline-2 focus-visible:outline-[#A0522D] transition-colors"
                  >
                    <span className="w-[34px] h-[34px] rounded-full overflow-hidden border border-[#A0522D]/30 bg-[#E8DDCA] flex items-center justify-center">
                      <img
                        src={
                          context.user?.avatar ||
                          `https://i.pravatar.cc/150?u=${context.user?._id}`
                        }
                        alt={context.user?.name || "User"}
                        className="w-full h-full object-cover"
                      />
                    </span>

                    <span className="hidden xl:flex flex-col text-left pr-2">
                      <span className="text-[12px] font-semibold capitalize leading-tight">
                        {context.user?.name || "User"}
                      </span>
                      <span className="text-[10px] text-[#765F50] truncate max-w-[120px]">
                        {context.user?.email || ""}
                      </span>
                    </span>
                  </button>

                  {userMenuOpen && (
                    <div
                      role="menu"
                      className="absolute right-0 top-full mt-3 min-w-[190px] rounded-[14px] border border-[#2C1A0E]/10 bg-[#F5F0EB] py-1 shadow-[0_15px_40px_rgba(44,26,14,0.12)]"
                    >
                      <span
                        aria-hidden="true"
                        className="absolute -top-[5px] right-4 w-2.5 h-2.5 rotate-45 bg-[#F5F0EB] border-l border-t border-[#2C1A0E]/10"
                      />

                      {ACCOUNT_LINKS.map(({ label, to, Icon, size }) => (
                        <Link
                          key={to}
                          to={to}
                          role="menuitem"
                          className="relative flex items-center gap-3 px-4 py-2.5 hover:bg-[#E8DDCA]/60 transition-colors"
                        >
                          <Icon className={`${size} text-[#A0522D]`} />
                          <span className="text-[13px] text-[#2C1A0E]">{label}</span>
                        </Link>
                      ))}

                      <div className="h-px bg-[#2C1A0E]/10 my-1" />

                      <Link
                        to="/logout"
                        role="menuitem"
                        className="relative flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors"
                      >
                        <MdOutlineLogout className="text-[16px] text-red-500" />
                        <span className="text-[13px] text-red-500">Logout</span>
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Shop CTA (desktop) */}
              <Link to="/ShopNow" className={`hidden md:inline-flex ml-1 px-5 py-2 text-[12px] ${shopBtn}`}>
                Shop Coffee
              </Link>

              {/* Mobile toggle */}
              <button
                type="button"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMobileMenuOpen((v) => !v)}
                className={`lg:hidden ml-1 ${iconBtn}`}
              >
                {mobileMenuOpen ? (
                  <MdClose className="text-[23px]" />
                ) : (
                  <MdMenu className="text-[23px]" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- Mobile drawer ---------- */}
      {mobileMenuOpen && (
        <>
          {/* Tap outside the drawer to close it */}
          <div
            aria-hidden="true"
            onClick={closeMobile}
            className="lg:hidden absolute left-0 right-0 top-full h-screen bg-[#2C1A0E]/40"
          />

          <div
            id="mobile-menu"
            className="lg:hidden absolute left-0 right-0 top-full max-h-[calc(100dvh-102px)] overflow-y-auto overscroll-contain border-b border-[#2C1A0E]/10 bg-[#F5F0EB] shadow-[0_20px_40px_rgba(44,26,14,0.12)]"
          >
          <nav className="px-5 py-4" aria-label="Mobile">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMobile}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between py-4 border-b border-[#2C1A0E]/10 text-[14px] font-medium transition-colors ${
                    active ? "text-[#A0522D]" : "text-[#2C1A0E] hover:text-[#A0522D]"
                  }`}
                >
                  <span>{item.label}</span>
                  <MdKeyboardArrowRight className="text-[19px]" />
                </Link>
              );
            })}

            <div className="grid grid-cols-2 gap-3 mt-5">
              {[
                { label: "My Orders", to: "/my-orders" },
                { label: "Wishlist", to: "/my-list", count: wishlistCount },
              ].map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={closeMobile}
                  className="rounded-xl border border-[#2C1A0E]/10 bg-white/40 p-4 text-center text-[12px] font-medium text-[#2C1A0E] hover:bg-[#E8DDCA] transition-colors"
                >
                  {l.label}
                  {l.count > 0 && <span className="ml-1 text-[#A0522D]">({l.count})</span>}
                </Link>
              ))}
            </div>

            <Link to="/ShopNow" onClick={closeMobile} className={`mt-4 w-full py-3 text-[13px] ${shopBtn}`}>
              Shop Coffee
            </Link>

            <div className="flex items-center justify-center gap-5 mt-5 pb-2">
              <Link
                to="/order-tracking"
                onClick={closeMobile}
                className="text-[11px] text-[#765F50] hover:text-[#A0522D] transition-colors"
              >
                Track Order
              </Link>
              <span className="w-1 h-1 rounded-full bg-[#A0522D]" />
              <Link
                to="/help-center"
                onClick={closeMobile}
                className="text-[11px] text-[#765F50] hover:text-[#A0522D] transition-colors"
              >
                Help Center
              </Link>
            </div>
          </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;