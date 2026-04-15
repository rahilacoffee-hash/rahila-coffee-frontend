import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Search from "../Search/Search";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { IoMdHeartEmpty } from "react-icons/io";
import { MdOutlineShoppingCart, MdOutlineLogout, MdMenu, MdClose } from "react-icons/md";
import Tooltip from "@mui/material/Tooltip";
import Navigation from "./Navigation/Navigation";
import Profile from "./Account/Profile";
import { MyContext } from "../../App";
import { FaRegUser } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

const StyledBadge = styled(Badge)(() => ({
  "& .MuiBadge-badge": {
    right: -1, top: 3,
    border: `2px solid #371903`,
    padding: "0 4px",
    background: "#D4A853",
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl]         = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const open    = Boolean(anchorEl);
  const context = useContext(MyContext);
  const cartCount = context.cartItems?.length || 0;

  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = ()  => setAnchorEl(null);
  const closeMobile = ()  => setMobileMenuOpen(false);

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">

      {/* ── Top Strip ── */}
      <div className="bg-[#fff8dc] py-1.5 border-b border-gray-100">
        <div className="container">
          <div className="flex items-center justify-between">
            <p className="hidden sm:block text-[12px] md:text-[14px] font-[500]">
             🚚 Free shipping on orders over ₦100,000!
            </p>
            <p className="sm:hidden text-[11px] font-[500]">🚚 Free shipping over ₦100k</p>
            <ul className="flex items-center gap-3">
              <li className="list-none">
                <Link to="/help-center" className="text-[11px] md:text-[13px] link font-[500]">Help Center</Link>
              </li>
              <li className="list-none">
                <Link to="/order-tracking" className="text-[11px] md:text-[13px] link font-[500]">Track Order</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Main Header Row ── */}
      <div className="py-2 md:py-3 border-b border-gray-100">
        <div className="container flex items-center justify-between gap-2">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className=" logo text-[1.3rem] sm:text-[1.6rem] md:text-[2rem] font-bold text-[#D4A853]">
              ☕ Rahila Coffee
            </h1>
          </Link>

         

          {/* Right icons */}
          <div className="flex items-center gap-1 flex-shrink-0">

            {/* User */}
            {context.isLogin === false ? (
              <Profile />
            ) : (
              <>
                <Button onClick={handleClick} className="!text-black !min-w-0 !p-1 flex items-center gap-2">
                  <div className="w-[34px] h-[34px] rounded-full bg-gray-200 flex items-center justify-center shrink-0">
                    <img  src={context.user?.avatar ||
                        `https://i.pravatar.cc/150?u=${context.user?._id}`} className="text-[16px] text-[#D4A853] rounded-full" />
                  </div>
                  {/* Name only on md+ */}
                  <div className="hidden md:flex flex-col text-left">
                    <span className="text-[13px] font-[500] text-gray-800 capitalize leading-tight">
                      {context.user?.name || "User"}
                    </span>
                    <span className="text-[11px] text-gray-400 truncate max-w-[120px]">
                      {context.user?.email || ""}
                    </span>
                  </div>
                </Button>

                <Menu
                  anchorEl={anchorEl} open={open}
                  onClose={handleClose} onClick={handleClose}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.15))",
                        mt: 1.5,
                        "&::before": {
                          content: '""', display: "block", position: "absolute",
                          top: 0, right: 14, width: 10, height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)", zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <Link to="/my-account" className="w-full block">
                    <MenuItem className="flex gap-2 !py-2">
                      <FaRegUser className="text-[16px]" />
                      <span className="text-[13px]">My Account</span>
                    </MenuItem>
                  </Link>
                  <Link to="/my-orders" className="w-full block">
                    <MenuItem className="flex gap-2 !py-2">
                      <IoMdHeartEmpty className="text-[16px]" />
                      <span className="text-[13px]">My Orders</span>
                    </MenuItem>
                  </Link>
                  <Link to="/my-list" className="w-full block">
                    <MenuItem className="flex gap-2 !py-2">
                      <IoMdHeartEmpty className="text-[16px]" />
                      <span className="text-[13px]">My Wishlist</span>
                    </MenuItem>
                  </Link>
                  <Link to="/logout" className="w-full block">
                    <MenuItem className="flex gap-2 !py-2">
                      <MdOutlineLogout className="text-[16px] text-red-500" />
                      <span className="text-[13px] text-red-500">Logout</span>
                    </MenuItem>
                  </Link>
                </Menu>
              </>
            )}

            {/* Wishlist — sm+ */}
            <div className="hidden sm:block">
              <Tooltip title="My Wishlist">
                <IconButton>
                  <StyledBadge badgeContent={0} color="secondary">
                    <IoMdHeartEmpty className="text-[#D4A853] text-[20px]" />
                  </StyledBadge>
                </IconButton>
              </Tooltip>
            </div>

            {/* Cart */}
            <div
              className="relative cursor-pointer p-2"
              onClick={() => context.setOpennCartPanel(true)}
            >
              <MdOutlineShoppingCart size={22} className="text-[#D4A853]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#D4A853] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </div>

            {/* Shop Now — sm+ */}
            <div className="hidden sm:block">
              <Link to="/ShopNow">
                <Button className="!ml-1 !bg-[#A0522D] !text-white !font-bold !text-[12px] !capitalize !py-1.5 !px-3">
                  Shop Now
                </Button>
              </Link>
            </div>

            {/* Hamburger — mobile only */}
            <button
              className="md:hidden ml-1 p-1.5 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen
                ? <MdClose className="text-[22px] text-gray-700" />
                : <MdMenu  className="text-[22px] text-gray-700" />
              }
            </button>
          </div>
        </div>

        {/* Mobile search — below main row */}
        <div className="md:hidden px-4 pt-2">
        </div>
      </div>

      

      {/* ── Mobile Menu Drawer ── */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute left-0 right-0 bg-white border-t border-gray-100 shadow-xl z-50">
          <nav className="flex flex-col divide-y divide-gray-50">
            {[
              { to: "/",               label: "🏠  Home" },
              { to: "/ShopNow",        label: "☕  Shop" },
              { to: "/stories",        label: "📖  Blog & Stories" },
              { to: "/about",          label: "ℹ️  About Us" },
              { to: "/contact",        label: "📞  Contact" },
              { to: "/order-tracking", label: "📦  Track Order" },
              { to: "/my-orders",      label: "🧾  My Orders" },
              { to: "/my-list",        label: "❤️  My Wishlist" },
              { to: "/help-center",    label: "❓  Help Center" },
            ].map(item => (
              <Link
                key={item.to}
                to={item.to}
                onClick={closeMobile}
                className="px-6 py-3.5 text-[14px] font-[500] text-gray-700 hover:bg-amber-50 hover:text-amber-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="px-6 py-4 bg-amber-50 border-t">
            <Link to="/ShopNow" onClick={closeMobile}>
              <Button fullWidth className="!bg-[#A0522D] !text-white !capitalize !font-bold !py-2">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      )}

    </header>
  );
};

export default Header;