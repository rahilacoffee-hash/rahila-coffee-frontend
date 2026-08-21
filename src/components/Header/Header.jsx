import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

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
   WISHLIST BADGE
========================================================= */

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    right: -2,
    top: 2,
    minWidth: "16px",
    height: "16px",
    padding: "0 4px",
    border: "2px solid #F5F0EB",
    background: "#A0522D",
    color: "#fff",
    fontSize: "9px",
    fontWeight: 700,
  },
}));


const Header = () => {

  /* =========================================================
     STATE
  ========================================================= */

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const context = useContext(MyContext);
  const location = useLocation();

  const cartCount = context.cartItems?.length || 0;
  const wishlistCount = context.wishlistIds?.length || 0;

  const open = Boolean(anchorEl);


  /* =========================================================
     SCROLL DETECTION
  ========================================================= */

  useEffect(() => {

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, []);


  /* =========================================================
     CLOSE MOBILE MENU WHEN ROUTE CHANGES
  ========================================================= */

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);


  /* =========================================================
     HANDLERS
  ========================================================= */

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileClose = () => {
    setAnchorEl(null);
  };

  const closeMobile = () => {
    setMobileMenuOpen(false);
  };


  /* =========================================================
     ACTIVE NAV
  ========================================================= */

  const isActive = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }

    return location.pathname === path;
  };


  /* =========================================================
     NAVIGATION
  ========================================================= */

  const navItems = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Shop",
      to: "/ShopNow",
    },
    {
      label: "Our Story",
      to: "/stories",
    },
    {
      label: "About Us",
      to: "/about",
    },
    {
      label: "Contact",
      to: "/contact",
    },
  ];


  return (

    <header
      className={`
        fixed
        top-0
        left-0
        right-0
        z-50
        transition-all
        duration-500
        ease-in-out
        ${
          isScrolled
            ? "bg-[#F5F0EB]/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(44,26,14,0.08)]"
            : "bg-white/10 backdrop-blur-md"
        }
      `}
    >

      {/* =====================================================
          TOP ANNOUNCEMENT BAR
      ===================================================== */}

      <div
        className={`
          transition-all
          duration-500
          ${
            isScrolled
              ? "bg-[#2C1A0E]"
              : "bg-[#2C1A0E]/85 backdrop-blur-sm"
          }
        `}
      >

        <div className="container">

          <div className="h-8 flex items-center justify-center sm:justify-between">

            {/* Shipping */}
            <div className="flex items-center gap-2 text-[#F5F0EB] text-[10px] sm:text-[11px] tracking-wide">

              <MdLocalShipping className="text-[#D4A853] text-[15px]" />

              <span>
                Free shipping on orders over
                <span className="font-semibold text-[#D4A853] ml-1">
                  ₦100,000
                </span>
              </span>

            </div>


            {/* Utilities */}
            <div className="hidden sm:flex items-center gap-5 text-[10px] uppercase tracking-[0.12em] text-[#D9C9BB]">

              <Link
                to="/help-center"
                className="hover:text-white transition-colors"
              >
                Help Center
              </Link>

              <span className="w-px h-3 bg-white/20" />

              <Link
                to="/order-tracking"
                className="hover:text-white transition-colors"
              >
                Track Order
              </Link>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          MAIN NAVIGATION
      ===================================================== */}

      <div
        className={`
          border-b
          transition-all
          duration-500
          ${
            isScrolled
              ? "bg-[#F5F0EB]/95 backdrop-blur-xl border-[#2C1A0E]/10"
              : "bg-white/10 backdrop-blur-md border-white/20"
          }
        `}
      >

        <div className="container">

          <div className="h-[70px] lg:h-[78px] flex items-center justify-between gap-5">


            {/* =================================================
                LOGO
            ================================================= */}

               <Link
              to="/"
              className="group flex items-center gap-2 shrink-0"
            >

              <div className="flex flex-col">

                <div className="flex items-center gap-1">

                  <span className="text-[25px] sm:text-[28px] leading-none font-serif font-semibold tracking-[-0.04em] text-[#2C1A0E]">
                    R
                  </span>

                  <div className="flex flex-col leading-none">

                    <span className="text-[17px] sm:text-[19px] font-semibold tracking-[0.08em] text-[#2C1A0E]">
                      AHILA
                    </span>

                    <span className="text-[7px] sm:text-[8px] tracking-[0.42em] text-[#A0522D] ml-[2px] mt-1">
                      COFFEE
                    </span>

                  </div>

                </div>

              </div>

            </Link>



            {/* =================================================
                DESKTOP NAVIGATION
            ================================================= */}

            <nav className="hidden lg:flex items-center gap-7 xl:gap-10">

              {navItems.map((item) => {

                const active = isActive(item.to);

                return (

                  <Link
                    key={item.to}
                    to={item.to}
                    className={`
                      relative
                      py-2
                      text-[13px]
                      font-medium
                      tracking-wide
                      transition-all
                      duration-300
                      ${
                        active
                          ? "text-[#A0522D]"
                          : "text-[#2C1A0E] hover:text-[#A0522D]"
                      }
                    `}
                  >

                    {item.label}

                    {/* Active underline */}
                    <span
                      className={`
                        absolute
                        left-1/2
                        -translate-x-1/2
                        -bottom-1
                        h-[2px]
                        rounded-full
                        bg-[#A0522D]
                        transition-all
                        duration-300
                        ${
                          active
                            ? "w-full opacity-100"
                            : "w-0 opacity-0"
                        }
                      `}
                    />

                  </Link>

                );

              })}

            </nav>


            {/* =================================================
                RIGHT ACTIONS
            ================================================= */}

            <div className="flex items-center gap-1 sm:gap-2">


              {/* SEARCH */}
              <Tooltip title="Search">

                <IconButton
                  aria-label="Search"
                  className="!text-[#2C1A0E] hover:!bg-[#E8DDCA]"
                >

                  <MdSearch className="text-[21px]" />

                </IconButton>

              </Tooltip>


              {/* WISHLIST */}
              <div className="hidden sm:block">

                <Tooltip title="My Wishlist">

                  <Link
                    to="/my-list"
                    aria-label="Open my wishlist"
                  >

                    <IconButton className="!text-[#2C1A0E] hover:!bg-[#E8DDCA]">

                      <StyledBadge
                        badgeContent={wishlistCount}
                        showZero={false}
                      >

                        <IoMdHeartEmpty className="text-[21px]" />

                      </StyledBadge>

                    </IconButton>

                  </Link>

                </Tooltip>

              </div>


              {/* CART */}
              <Tooltip title="Shopping Cart">

                <button
                  type="button"
                  aria-label="Open shopping cart"
                  onClick={() =>
                    context.setOpennCartPanel(true)
                  }
                  className="
                    relative
                    w-10
                    h-10
                    flex
                    items-center
                    justify-center
                    rounded-full
                    text-[#2C1A0E]
                    hover:bg-[#E8DDCA]
                    transition-all
                    duration-300
                  "
                >

                  <MdOutlineShoppingCart className="text-[22px]" />

                  {cartCount > 0 && (

                    <span
                      className="
                        absolute
                        top-0
                        right-0
                        w-[16px]
                        h-[16px]
                        flex
                        items-center
                        justify-center
                        rounded-full
                        bg-[#A0522D]
                        text-white
                        text-[9px]
                        font-bold
                      "
                    >
                      {cartCount}
                    </span>

                  )}

                </button>

              </Tooltip>


              {/* =================================================
                  USER / PROFILE
              ================================================= */}

              {context.isLogin === false ? (

                <div className="hidden sm:block ml-1">

                  <Profile />

                </div>

              ) : (

                <>

                  <Button
                    onClick={handleProfileClick}
                    className="
                      !min-w-0
                      !p-1
                      !ml-1
                      !normal-case
                      flex
                      items-center
                      gap-2
                      !text-[#2C1A0E]
                    "
                  >

                    <div
                      className="
                        w-[34px]
                        h-[34px]
                        rounded-full
                        overflow-hidden
                        border
                        border-[#A0522D]/30
                        bg-[#E8DDCA]
                        flex
                        items-center
                        justify-center
                      "
                    >

                      <img
                        src={
                          context.user?.avatar ||
                          `https://i.pravatar.cc/150?u=${context.user?._id}`
                        }
                        alt={context.user?.name || "User"}
                        className="w-full h-full object-cover"
                      />

                    </div>


                    <div className="hidden xl:flex flex-col text-left">

                      <span className="text-[12px] font-semibold text-[#2C1A0E] capitalize leading-tight">
                        {context.user?.name || "User"}
                      </span>

                      <span className="text-[10px] text-[#765F50] truncate max-w-[120px]">
                        {context.user?.email || ""}
                      </span>

                    </div>

                  </Button>


                  {/* USER DROPDOWN */}

                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleProfileClose}
                    onClick={handleProfileClose}
                    transformOrigin={{
                      horizontal: "right",
                      vertical: "top",
                    }}
                    anchorOrigin={{
                      horizontal: "right",
                      vertical: "bottom",
                    }}
                    slotProps={{
                      paper: {
                        elevation: 0,
                        sx: {
                          overflow: "visible",
                          mt: 1.5,
                          minWidth: "190px",
                          borderRadius: "14px",
                          backgroundColor: "#F5F0EB",
                          border: "1px solid rgba(44,26,14,0.08)",
                          boxShadow:
                            "0 15px 40px rgba(44,26,14,0.12)",

                          "&::before": {
                            content: '""',
                            display: "block",
                            position: "absolute",
                            top: 0,
                            right: 16,
                            width: 10,
                            height: 10,
                            backgroundColor: "#F5F0EB",
                            transform:
                              "translateY(-50%) rotate(45deg)",
                            zIndex: 0,
                            borderLeft:
                              "1px solid rgba(44,26,14,0.08)",
                            borderTop:
                              "1px solid rgba(44,26,14,0.08)",
                          },
                        },
                      },
                    }}
                  >

                    <Link
                      to="/my-account"
                      className="block"
                    >

                      <MenuItem className="!py-2.5 !px-4 !gap-3">

                        <FaRegUser className="text-[15px] text-[#A0522D]" />

                        <span className="text-[13px] text-[#2C1A0E]">
                          My Account
                        </span>

                      </MenuItem>

                    </Link>


                    <Link
                      to="/my-orders"
                      className="block"
                    >

                      <MenuItem className="!py-2.5 !px-4 !gap-3">

                        <MdOutlineShoppingCart className="text-[16px] text-[#A0522D]" />

                        <span className="text-[13px] text-[#2C1A0E]">
                          My Orders
                        </span>

                      </MenuItem>

                    </Link>


                    <Link
                      to="/my-list"
                      className="block"
                    >

                      <MenuItem className="!py-2.5 !px-4 !gap-3">

                        <IoMdHeartEmpty className="text-[17px] text-[#A0522D]" />

                        <span className="text-[13px] text-[#2C1A0E]">
                          My Wishlist
                        </span>

                      </MenuItem>

                    </Link>


                    <div className="h-px bg-[#2C1A0E]/10 my-1" />


                    <Link
                      to="/logout"
                      className="block"
                    >

                      <MenuItem className="!py-2.5 !px-4 !gap-3">

                        <MdOutlineLogout className="text-[16px] text-red-500" />

                        <span className="text-[13px] text-red-500">
                          Logout
                        </span>

                      </MenuItem>

                    </Link>

                  </Menu>

                </>

              )}


              {/* SHOP BUTTON */}

              <Link
                to="/ShopNow"
                className="hidden md:block ml-1"
              >

                <Button
                  className="
                    !normal-case
                    !rounded-full
                    !bg-[#A0522D]
                    !text-white
                    !font-semibold
                    !text-[12px]
                    !tracking-wide
                    !px-5
                    !py-2
                    hover:!bg-[#8B4526]
                    !transition-all
                    !duration-300
                    hover:!shadow-lg
                    hover:!shadow-[#A0522D]/20
                  "
                >
                  Shop Coffee
                </Button>

              </Link>


              {/* MOBILE MENU */}

              <button
                type="button"
                aria-label="Toggle menu"
                onClick={() =>
                  setMobileMenuOpen(!mobileMenuOpen)
                }
                className="
                  lg:hidden
                  ml-1
                  w-10
                  h-10
                  flex
                  items-center
                  justify-center
                  rounded-full
                  text-[#2C1A0E]
                  hover:bg-[#E8DDCA]
                  transition-all
                  duration-300
                "
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


      {/* =====================================================
          MOBILE DRAWER
      ===================================================== */}

      {mobileMenuOpen && (

        <div
          className={`
            lg:hidden
            absolute
            left-0
            right-0
            top-full
            border-b
            border-[#2C1A0E]/10
            shadow-[0_20px_40px_rgba(44,26,14,0.12)]
            ${
              isScrolled
                ? "bg-[#F5F0EB]/98 backdrop-blur-xl"
                : "bg-[#F5F0EB]/95 backdrop-blur-xl"
            }
          `}
        >

          <nav className="px-5 py-4">


            {/* NAV LINKS */}

            {navItems.map((item) => {

              const active = isActive(item.to);

              return (

                <Link
                  key={item.to}
                  to={item.to}
                  onClick={closeMobile}
                  className={`
                    flex
                    items-center
                    justify-between
                    py-4
                    border-b
                    border-[#2C1A0E]/10
                    text-[14px]
                    font-medium
                    transition-colors
                    ${
                      active
                        ? "text-[#A0522D]"
                        : "text-[#2C1A0E] hover:text-[#A0522D]"
                    }
                  `}
                >

                  <span>
                    {item.label}
                  </span>

                  <MdKeyboardArrowRight className="text-[19px]" />

                </Link>

              );

            })}


            {/* ACCOUNT LINKS */}

            <div className="grid grid-cols-2 gap-3 mt-5">

              <Link
                to="/my-orders"
                onClick={closeMobile}
                className="
                  rounded-xl
                  border
                  border-[#2C1A0E]/10
                  bg-white/40
                  p-4
                  text-center
                  text-[12px]
                  font-medium
                  text-[#2C1A0E]
                  hover:bg-[#E8DDCA]
                  transition-colors
                "
              >
                My Orders
              </Link>


              <Link
                to="/my-list"
                onClick={closeMobile}
                className="
                  rounded-xl
                  border
                  border-[#2C1A0E]/10
                  bg-white/40
                  p-4
                  text-center
                  text-[12px]
                  font-medium
                  text-[#2C1A0E]
                  hover:bg-[#E8DDCA]
                  transition-colors
                "
              >
                Wishlist
              </Link>

            </div>


            {/* SHOP CTA */}

            <Link
              to="/ShopNow"
              onClick={closeMobile}
              className="block mt-4"
            >

              <Button
                fullWidth
                className="
                  !normal-case
                  !rounded-full
                  !bg-[#A0522D]
                  !text-white
                  !font-semibold
                  !py-3
                  !text-[13px]
                  hover:!bg-[#8B4526]
                "
              >
                Shop Coffee
              </Button>

            </Link>


            {/* MOBILE UTILITY LINKS */}

            <div className="flex items-center justify-center gap-5 mt-5 pb-2">

              <Link
                to="/order-tracking"
                onClick={closeMobile}
                className="
                  text-[11px]
                  text-[#765F50]
                  hover:text-[#A0522D]
                  transition-colors
                "
              >
                Track Order
              </Link>

              <span className="w-1 h-1 rounded-full bg-[#A0522D]" />

              <Link
                to="/help-center"
                onClick={closeMobile}
                className="
                  text-[11px]
                  text-[#765F50]
                  hover:text-[#A0522D]
                  transition-colors
                "
              >
                Help Center
              </Link>

            </div>

          </nav>

        </div>

      )}

    </header>

  );
};

export default Header;