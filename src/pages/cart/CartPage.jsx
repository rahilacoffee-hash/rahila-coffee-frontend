
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { FaAngleDown } from "react-icons/fa";
import Rating from "@mui/material/Rating";
import Button from "@mui/material/Button";
import { BsBagCheckFill } from "react-icons/bs";
import api from "../../api/axios";
import { MyContext } from "../../App";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [qtyAnchorEls, setQtyAnchorEls] = useState({});
  const context = useContext(MyContext);

  useEffect(() => {
    if (context.isLogin) fetchCart();
  }, [context.isLogin]);

  const fetchCart = async () => {
    try {
      const res = await api.get("/cart");
      setCartItems(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClickQty = (event, id) => {
    setQtyAnchorEls({ ...qtyAnchorEls, [id]: event.currentTarget });
  };

  const handleCloseQty = async (id, productId, value) => {
    setQtyAnchorEls({ ...qtyAnchorEls, [id]: null });
    if (value !== null && value !== undefined) {
      try {
        await api.put("/cart/update", { id, quantity: value });
        fetchCart();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const removeItem = async (id, productId) => {
    try {
      await api.delete("/cart/delete", { data: { id, productId } });
      context.openAlertBox("success", "Item removed");
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => {
    return sum + ((item.productId?.price || 0) * item.quantity);
  }, 0);

  if (!context.isLogin) {
    return (
      <section className="section py-10 bg-white pb-10">
        <div className="container text-center py-20">
          <p className="text-gray-500 mb-4">Please login to view your cart</p>
          <Link to="/login"><Button className="btn-org">Login</Button></Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section py-10 bg-white pb-10">
      <div className="container w-[70%] flex max-w-[80%] gap-5">
        <div className="letfPart w-[75%]">
          <h2 className="font-[600] text-[17px]">Your Cart</h2>
          <p className="mt-0">
            There are <span className="font-bold text-slate-700">{cartItems.length}</span> product{cartItems.length !== 1 ? "s" : ""} in your cart
          </p>

          {loading ? (
            <p className="text-center text-gray-400">Loading cart...</p>
          ) : cartItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-400 mb-4">Your cart is empty</p>
              <Link to="/ShopNow"><Button className="btn-org">Shop Now</Button></Link>
            </div>
          ) : (
            <div className="shadow-md rounded-md p-5 bg-gray-100">
              {cartItems.map(item => (
                <div key={item._id} className="cartItems p-3 w-full flex items-center gap-4 pb-5 pt-5 border-b border-[rgba(0,0,0,0.1)]">
                  <div className="img w-[15%] rounded-md overflow-hidden">
                    <Link to={`/Product/${item.productId?._id}`} className="group">
                      <img
                        src={item.productId?.images?.[0]}
                        alt={item.productId?.name}
                        className="w-full group-hover:scale-105 transition-all"
                      />
                    </Link>
                  </div>

                  <div className="info w-[85%] relative">
                    <IoMdClose
                      onClick={() => removeItem(item._id, item.productId?._id)}
                      className="cursor-pointer absolute top-[0px] right-[0px] text-[22px] link transition-all"
                    />
                    <h3 className="text-[16px] font-bold">
                      <Link to={`/Product/${item.productId?._id}`} className="link">
                        {item.productId?.name}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-[11px] capitalize">
                      {item.productId?.roastLevel} · {item.productId?.grindType}
                    </p>
                    <Rating size="small" value={item.productId?.rating || 0} readOnly />

                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <span
                          className="flex items-center justify-center bg-[#f1f1f1] text-[11px] font-[600] py-1 px-2 rounded-md cursor-pointer"
                          onClick={(e) => handleClickQty(e, item._id)}
                        >
                          Qty: {item.quantity} <FaAngleDown />
                        </span>
                        <Menu
                          anchorEl={qtyAnchorEls[item._id]}
                          open={Boolean(qtyAnchorEls[item._id])}
                          onClose={() => handleCloseQty(item._id, item.productId?._id, null)}
                          disableRestoreFocus
                        >
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <MenuItem key={num} onClick={() => handleCloseQty(item._id, item.productId?._id, num)}>
                              {num}
                            </MenuItem>
                          ))}
                        </Menu>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mt-2">
                      <span className="price text-amber-700 text-[14px] font-[600]">
                        ${(item.productId?.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rightPart w-[25%]">
          <div className="shadow-md rounded-md bg-white p-5">
            <h3>Cart Totals</h3>
            <hr />
            <p className="flex items-center justify-between mb-2">
              <span className="text-[14px] font-[500]">Subtotal</span>
              <span className="text-amber-700 font-bold">${subtotal.toFixed(2)}</span>
            </p>
            <p className="flex items-center justify-between mb-2">
              <span className="text-[14px] font-[500]">Shipping</span>
              <span className="font-bold">Free</span>
            </p>
            <p className="flex items-center justify-between mb-2">
              <span className="text-[14px] font-[500]">Estimate for</span>
              <span className="font-bold">Nigeria</span>
            </p>
            <p className="flex items-center justify-between">
              <span className="text-[14px] font-[500]">Total</span>
              <span className="text-amber-700 font-bold">${subtotal.toFixed(2)}</span>
            </p>
            <Link to="/checkout" className="w-full block">
              <Button className="btn-org btn-lg !w-full flex gap-2">
                <BsBagCheckFill className="text-[20px]" /> Checkout
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartPage;