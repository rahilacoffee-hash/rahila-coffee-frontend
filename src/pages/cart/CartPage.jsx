
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
   <section className="section py-10 bg-white">
  <div className="container max-w-[1400px] flex flex-col lg:flex-row gap-6">

    {/* LEFT */}
    <div className="w-full lg:w-[70%]">
      <h2 className="font-semibold text-[20px]">Your Cart</h2>
      <p className="mb-4">
        There are <b>{cartItems.length}</b> product{cartItems.length !== 1 && "s"} in your cart
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
            <div key={item._id} className="flex flex-col sm:flex-row gap-4 border-b py-5">

              <img
                src={item.productId?.images?.[0]}
                className="w-full sm:w-[120px] rounded-md object-cover"
              />

              <div className="flex-1 relative">
                <IoMdClose
                  onClick={() => removeItem(item._id, item.productId?._id)}
                  className="absolute top-0 right-0 text-[22px] cursor-pointer"
                />

                <h3 className="font-bold">{item.productId?.name}</h3>

                <p className="text-gray-600 text-sm">
                  {item.productId?.roastLevel} · {item.productId?.grindType}
                </p>

                <div className="mt-3 font-bold text-amber-700">
                  ${(item.productId?.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))}

        </div>
      )}
    </div>

    {/* RIGHT TOTALS */}
    <div className="w-full lg:w-[30%]">
      <div className="shadow-md rounded-md bg-white p-5 lg:sticky lg:top-24">
        <h3 className="font-semibold mb-3">Cart Totals</h3>

        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <b>${subtotal.toFixed(2)}</b>
        </div>

        <div className="flex justify-between mb-2">
          <span>Shipping</span>
          <b>Free</b>
        </div>

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-amber-700">${subtotal.toFixed(2)}</span>
        </div>

        <Link to="/checkout">
          <Button className="btn-org btn-lg w-full mt-4">
            Checkout
          </Button>
        </Link>
      </div>
    </div>

  </div>
</section>
  );
};

export default CartPage;