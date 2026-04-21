import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import Button from "@mui/material/Button";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsFillBagCheckFill } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaRegUser } from "react-icons/fa";
import { MyContext } from "../../App";
import { useContext } from "react";

const AccountSidebar = () => {
  const context = useContext(MyContext);
  return (
    <div>
      <div className="card bg-white shadow-md rounded-md ">
        <div className="w-full p-3 flex items-center justify-center flex-col">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden mb-4 relative group">
            <img
              src={
                context.user?.avatar ||
                `https://i.pravatar.cc/150?u=${context.user?._id}`
              }
            />

            <div className="overlay w-[100%] h-[100%] absolute top-0 left-0 z-50  bg-[rgba(0,0,0,0.7)] flex items-center justify-center cursor-pointer opacity-0 transition-all group-hover:opacity-100">
              <FaCloudUploadAlt className="text-white text-[25px]" />
              <input
                type="file"
                className="absolute top-0 left-0 w-full h-full opacity-0"
              />
            </div>
          </div>

          <h3 className="">{context.user?.name || "User"}</h3>
          <h6 className="text-[13px] !font-[500]">
            {" "}
            {context.user?.email || ""}
          </h6>
        </div>

        <ul className="list-none pb-5 w-full myAccountTabs ">
          <li className="w-full">
            <NavLink
              to="/my-account"
              exact={true}
              activeClassName="isActive"
              className=""
            >
              <Button className="w-full !text-left  !px-5  !justify-start !capitalize !text-[#000] !rounded-none flex items-center gap-2">
                <FaRegUser className="text-[18px]" /> My Profile
              </Button>
            </NavLink>
          </li>

          <li className="w-full">
            <NavLink
              to="/my-list"
              exact={true}
              activeClassName="isActive"
              className=""
            >
              <Button className="w-full !text-left  !px-5  !justify-start !capitalize !text-[#000] !rounded-none flex items-center gap-2">
                <IoMdHeartEmpty className="text-[18px]" /> My List
              </Button>
            </NavLink>
          </li>

          <li className="w-full">
            <NavLink
              to="/my-orders"
              exact={true}
              activeClassName="isActive"
              className=""
            >
              <Button
                className="w-full !text-left 
                 !px-5  !justify-start !capitalize !text-[#000] !rounded-none flex items-center gap-2"
              >
                <BsFillBagCheckFill className="text-[18px]" /> My Order
              </Button>
            </NavLink>
          </li>

          <li className="w-full">
            <NavLink
              to="/logout"
              exact={true}
              activeClassName="isActive"
              className=""
            >
              <Button className="w-full !text-left   !px-5  !justify-start !capitalize !text-[#000] !rounded-none flex items-center gap-2">
                <MdOutlineLogout className="text-[18px]" />
                Logout
              </Button>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AccountSidebar;
