
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import AccountSidebar from "../../components/AccountSidebar/AccountSidebar";
import api from "../../api/axios";
import { MyContext } from "../../App";

const MyList = () => {
  const [myList, setMyList] = useState([]);
  const [loading, setLoading] = useState(true);
  const context = useContext(MyContext);

  useEffect(() => {
    if (context.isLogin) fetchMyList();
  }, [context.isLogin]);

  const fetchMyList = async () => {
    try {
      const res = await api.get("/mylist");
      setMyList(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeFromList = async (id) => {
    try {
      await api.delete(`/mylist/${id}`);
      context.openAlertBox("success", "Removed from list");
      fetchMyList();
    } catch (err) {
      context.openAlertBox("error", "Failed to remove");
    }
  };

  const addToCart = async (item) => {
    if (!context.isLogin) {
      context.openAlertBox("error", "Please login first");
      return;
    }
    try {
      await api.post("/cart/add", { productId: item.productId });
      context.openAlertBox("success", "Added to cart!");
    } catch (err) {
      context.openAlertBox("error", err.response?.data?.message || "Failed");
    }
  };

  return (
    <section className="py-10 w-full">
      <div className="container flex flex-col md:flex-row gap-5">

        {/* Sidebar */}
        <div className="w-full md:w-[20%]">
          <AccountSidebar />
        </div>

        {/* Content */}
        <div className="w-full md:w-[80%] bg-white">
          <div className="py-5 px-3 border-b border-gray-200">
            <h2 className="font-[600] text-[17px]">My List</h2>
            <p className="mt-0 mb-0">
              There are <span className="font-bold text-slate-700">{myList.length}</span> product{myList.length !== 1 ? "s" : ""} in My List
            </p>
          </div>

          {loading ? (
            <p className="text-center py-10 text-gray-400">Loading...</p>
          ) : myList.length === 0 ? (
            <p className="text-center py-10 text-gray-400">Your wishlist is empty.</p>
          ) : (
            <div className="shadow-md rounded-md p-3 sm:p-5 bg-gray-100">
              {myList.map(item => (
                <div key={item._id} className="cartItems p-3 w-full flex items-center gap-3 sm:gap-4 pb-5 pt-5 border-b border-[rgba(0,0,0,0.1)]">

                  {/* Image — slightly bigger on mobile for usability */}
                  <div className="img w-[22%] sm:w-[15%] rounded-md overflow-hidden flex-shrink-0">
                    <Link to={`/Product/${item.productId}`} className="group">
                      <img
                        src={item.image}
                        alt={item.productTitle}
                        className="w-full group-hover:scale-105 transition-all"
                      />
                    </Link>
                  </div>

                  {/* Info */}
                  <div className="info w-[78%] sm:w-[85%] relative">
                    <IoMdClose
                      onClick={() => removeFromList(item._id)}
                      className="cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all"
                    />
                    <h3 className="text-[14px] sm:text-[16px] font-bold pr-6">
                      <Link to={`/Product/${item.productId}`} className="link">
                        {item.productTitle}
                      </Link>
                    </h3>
                    <Rating size="small" value={item.rating || 0} readOnly />
                    <div className="flex items-center gap-4 mt-2 mb-2">
                      <span className="price text-amber-700 text-[14px] font-[600]">
                        ${item.price}
                      </span>
                    </div>
                    <Button onClick={() => addToCart(item)} className="btn-org btn-sm">
                      Add to Cart
                    </Button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

export default MyList;