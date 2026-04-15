import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaTwitter, FaFacebookF, FaWhatsapp } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

// Mobile accordion section
function FooterSection({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#3D2B1F] md:border-none">
      {/* Toggle button — mobile only */}
      <button
        className="flex items-center justify-between w-full py-3 md:hidden"
        onClick={() => setOpen(!open)}
      >
        <h4 className="text-[14px] font-bold text-white uppercase tracking-wider">
          {title}
        </h4>
        {open
          ? <FaAngleUp className="text-amber-400 text-[13px]" />
          : <FaAngleDown className="text-amber-400 text-[13px]" />
        }
      </button>

      {/* Desktop title — always visible */}
      <h4 className="hidden md:block text-[13px] font-bold text-white uppercase tracking-wider mb-4">
        {title}
      </h4>

      {/* Content — hidden on mobile unless open, always visible on md+ */}
      <div className={`pb-3 md:pb-0 ${open ? "block" : "hidden"} md:block`}>
        {children}
      </div>
    </div>
  );
}

const Footer = () => {
  const [email, setEmail] = useState("");

  const linkClass = "text-[13px] text-[#B8A99A] hover:text-amber-400 transition-colors block py-1 md:py-0.5";

  return (
    <footer className="bg-[#1A0F0A] text-white">

      {/* ── Top CTA Banner ── */}
      <div className="bg-[#92400E] py-6 px-4">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h3 className="text-[18px] sm:text-[22px] font-bold">Get 10% off your first order</h3>
              <p className="text-amber-200 text-[13px] mt-0.5">Subscribe for exclusive deals, brewing tips & new arrivals</p>
            </div>
            {/* Newsletter form */}
            <div className="flex w-full sm:w-auto gap-2">
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="flex-1 sm:w-[240px] px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-[13px] focus:outline-none focus:border-white/60"
              />
              <button className="bg-white text-amber-900 font-bold text-[13px] px-4 py-2.5 rounded-lg hover:bg-amber-50 transition-colors shrink-0">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="container py-8 md:py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 md:gap-10">

          {/* Brand column — always fully visible */}
          <div className="py-4 md:py-0 border-b border-[#3D2B1F] md:border-none mb-2 md:mb-0">
            <Link to="/">
              <h2 className="text-[1.6rem] font-bold text-amber-400 mb-2">☕ Rahila Coffee</h2>
            </Link>
            <p className="text-[13px] text-[#B8A99A] leading-relaxed mb-4 max-w-[260px]">
              Specialty coffee sourced directly from farms across Africa and beyond.
              Roasted fresh, delivered fast.
            </p>

            {/* Contact info */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-[13px] text-[#B8A99A]">
                <MdLocationOn className="text-amber-400 shrink-0 text-[16px]" />
                <span>12 Aminu Kano Crescent, Wuse 2, Abuja</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-[#B8A99A]">
                <MdPhone className="text-amber-400 shrink-0 text-[16px]" />
                <span>+234 801 234 5678</span>
              </div>
              <div className="flex items-center gap-2 text-[13px] text-[#B8A99A]">
                <MdEmail className="text-amber-400 shrink-0 text-[16px]" />
                <span>hello@rahilacoffee.com</span>
              </div>
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: <FaInstagram />, href: "#",  label: "Instagram" },
                { icon: <FaTwitter />,   href: "#",  label: "Twitter" },
                { icon: <FaFacebookF />, href: "#",  label: "Facebook" },
                { icon: <FaWhatsapp />,  href: "#",  label: "WhatsApp" },
              ].map(s => (
                <a key={s.label} href={s.href} aria-label={s.label}
                  className="w-8 h-8 rounded-full bg-[#3D2B1F] flex items-center justify-center text-[#B8A99A] hover:bg-amber-800 hover:text-white transition-all text-[14px]">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <FooterSection title="Quick Links">
            <ul className="space-y-0.5">
              {[
                { to: "/",               label: "Home" },
                { to: "/ShopNow",        label: "Shop Coffee" },
                { to: "/about",          label: "About Us" },
                { to: "/stories",        label: "Coffee Blog" },
                { to: "/contact",        label: "Contact Us" },
              ].map(item => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Customer Service */}
          <FooterSection title="Customer Service">
            <ul className="space-y-0.5">
              {[
                { to: "/my-orders",      label: "My Orders" },
                { to: "/order-tracking", label: "Track My Order" },
                { to: "/my-account",     label: "My Account" },
                { to: "/cart",           label: "Shopping Cart" },
                { to: "/help-center",    label: "Help Center" },
              ].map(item => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClass}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Shop by Roast */}
          <FooterSection title="Shop by Roast">
            <ul className="space-y-0.5">
              {[
                { to: "/ShopNow?roast=light",  label: "Light Roast" },
                { to: "/ShopNow?roast=medium", label: "Medium Roast" },
                { to: "/ShopNow?roast=dark",   label: "Dark Roast" },
                { to: "/ShopNow",              label: "Single Origin" },
                { to: "/ShopNow",              label: "Espresso Blends" },
                { to: "/ShopNow",              label: "Cold Brew" },
              ].map((item, i) => (
                <li key={i}>
                  <Link to={item.to} className={linkClass}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </FooterSection>

        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-[#3D2B1F] py-4 px-4">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <p className="text-[12px] text-[#7A6A60]">
            © {new Date().getFullYear()} Rahila Coffee. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="#" className="text-[12px] text-[#7A6A60] hover:text-amber-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="text-[12px] text-[#7A6A60] hover:text-amber-400 transition-colors">
              Terms of Service
            </Link>
            <Link to="#" className="text-[12px] text-[#7A6A60] hover:text-amber-400 transition-colors">
              Returns
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;