import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaRegCircleUser, FaUserLarge, FaUserPlus } from "react-icons/fa6";

const MENU_LINKS = [
  { label: "Login", to: "/login", Icon: FaUserLarge },
  { label: "Sign Up", to: "/signUp", Icon: FaUserPlus },
];

export default function AccountMenu() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  /* Close on outside click and Escape while open */
  useEffect(() => {
    if (!open) return undefined;

    const onMouseDown = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={wrapperRef} className="relative ml-1 flex items-center">
      {/* Trigger + CSS tooltip */}
      <span className="relative group inline-flex">
        <button
          type="button"
          aria-label="Account settings"
          aria-controls="account-menu"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#E8DDCA] focus-visible:outline-2 focus-visible:outline-[#A0522D] transition-colors duration-300"
        >
          <FaRegCircleUser className="text-[#b8780b] text-[23px]" />
        </button>

        {!open && (
          <span
            role="tooltip"
            className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 mt-1 whitespace-nowrap rounded bg-[#2C1A0E] px-2 py-1 text-[11px] text-[#F5F0EB] opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100"
          >
            Account settings
          </span>
        )}
      </span>

      {/* Dropdown */}
      {open && (
        <div
          id="account-menu"
          role="menu"
          className="absolute right-0 top-full mt-3 min-w-[170px] rounded-[14px] border border-[#2C1A0E]/10 bg-[#F5F0EB] py-1 shadow-[0_15px_40px_rgba(44,26,14,0.12)]"
        >
          {/* Arrow */}
          <span
            aria-hidden="true"
            className="absolute -top-[5px] right-[14px] w-2.5 h-2.5 rotate-45 bg-[#F5F0EB] border-l border-t border-[#2C1A0E]/10"
          />

          {MENU_LINKS.map(({ label, to, Icon }) => (
            <Link
              key={to}
              to={to}
              role="menuitem"
              onClick={() => setOpen(false)}
              className="relative flex items-center gap-3 px-4 py-2.5 text-[13px] text-[#2C1A0E] hover:bg-[#E8DDCA]/60 transition-colors"
            >
              <Icon className="text-[15px] text-[#A0522D]" />
              {label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}