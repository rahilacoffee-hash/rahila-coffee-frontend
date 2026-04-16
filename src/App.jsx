import React, { createContext, useState, useEffect } from "react";
import Header from "./components/Header/Header";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import ProductListing from "./pages/ProductListing/ProductListing";
import Footer from "./components/Footer/Footer";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Signup from "./pages/Login_signup/SignUp";
import Login from "./pages/Login_signup/Login";
import Drawer from "@mui/material/Drawer";
import { MdOutlineClose, MdDeleteOutline } from "react-icons/md";
import Button from "@mui/material/Button";
import CartPage from "./pages/cart/CartPage";
import Verify from "./pages/Verify/Verify";
import toast, { Toaster } from "react-hot-toast";
import ForgotPassword from "./pages/Login_signup/ForgotPassword";
import Checkout from "./pages/Checkout/Checkout";
import MyAccount from "./pages/MyAccount/MyAccount";
import MyList from "./pages/MyList/MyLIst";
import Orders from "./pages/Orders/Orders";
import Logout from "./pages/Logout/LogOut";
import api from "./api/axios";
import OrderTracking from "./pages/OrderTracking/OrderTracking";
import StoryDetail from "./pages/Stories/StoryDetail";
import CoffeeStories from "./pages/Stories/CoffeeStories";
import ContactUs from "./pages/Contact/ContactUs";
import AboutUs from "./pages/About/AboutUs";
import HelpCenter from "./pages/HelpCenter/HelpCenter";
import VerifyForgotOTP from "./pages/Verify/verify-forgot-otp";
import ChangePassword from "./pages/Login_signup/ChangePassword";

export const MyContext = createContext();

const App = () => {
  const [openCartPanel, setOpennCartPanel] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );
  const [isLogin, setIsLogin] = useState(
    localStorage.getItem("accessToken") ? true : false,
  );

  // ── Fetch cart whenever login state changes
  useEffect(() => {
    if (isLogin) fetchCartItems();
    else setCartItems([]);
  }, [isLogin]);

  const fetchCartItems = async () => {
    setCartLoading(true);
    try {
      const res = await api.get("/cart");
      setCartItems(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setCartLoading(false);
    }
  };

  const removeFromCartDrawer = async (id, productId) => {
    try {
      await api.delete("/cart/delete", { data: { id, productId } });
      fetchCartItems();
    } catch (err) {
      console.error(err);
    }
  };

  const toggleCartPanel = (newOpen) => () => {
    setOpennCartPanel(newOpen);
    if (newOpen && isLogin) fetchCartItems();
  };

  const openAlertBox = (status, msg) => {
    if (status === "success") toast.success(msg);
    else toast.error(msg);
  };

  const cartSubtotal = cartItems.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
    0,
  );

  const values = {
    setOpennCartPanel,
    openAlertBox,
    isLogin,
    setIsLogin,
    user,
    setUser,
    cartItems,
    fetchCartItems,
  };

  return (
    <>
      <BrowserRouter>
        <MyContext.Provider value={values}>
          {/* Only show Header/Footer on non-admin pages */}
          <Routes>
            {/* ── Admin routes (no header/footer) */}

            {/* ── Public/Customer routes (with header/footer) */}
            <Route
              path="*"
              element={
                <>
                  <Header />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/ShopNow" element={<ProductListing />} />
                    <Route path="/Product/:id" element={<ProductDetails />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/verify" element={<Verify />} />
                    <Route path="/otp" element={<Verify />} />
                    <Route path="/signUp" element={<Signup />} />
                    <Route
                      path="/forgot-password"
                      element={<ForgotPassword />}
                    />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/my-account" element={<MyAccount />} />
                    <Route path="/my-list" element={<MyList />} />
                    <Route path="/my-orders" element={<Orders />} />
                    <Route path="/stories" element={<CoffeeStories />} />
                    <Route path="/stories/:id" element={<StoryDetail />} />
                    <Route path="/order-tracking" element={<OrderTracking />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/help-center" element={<HelpCenter />} />
                    <Route path="/verify-forgot-otp" element={<VerifyForgotOTP />} />
                    <Route path="/change-password" element={<ChangePassword />} />
                  </Routes>
                  <Footer />
                </>
              }
            />
          </Routes>

          {/* ── Cart Drawer ── */}
          <Drawer
  open={openCartPanel}
  onClose={toggleCartPanel(false)}
  anchor="right"
>
  <div className="w-[100vw] xs:w-[340px] sm:w-[380px] h-full flex flex-col bg-white">

    {/* Header */}
    <div className="flex items-center justify-between py-3 px-4 border-b">
      <h4 className="font-semibold">
        Shopping Cart ({cartItems.length})
      </h4>
      <MdOutlineClose
        className="text-[22px] cursor-pointer"
        onClick={toggleCartPanel(false)}
      />
    </div>

    {/* Items */}
    <div className="flex-1 overflow-y-auto px-4 py-3">
      {cartLoading ? (
        <p className="text-center text-gray-400 text-sm py-5">Loading...</p>
      ) : cartItems.length === 0 ? (
        <p className="text-center text-gray-400 text-sm py-5">
          Your cart is empty
        </p>
      ) : (
        cartItems.map(item => (
          <div key={item._id} className="flex items-start gap-3 border-b py-4">

            <img
              src={item.productId?.images?.[0]}
              className="w-[60px] h-[60px] sm:w-[70px] sm:h-[70px] rounded-md object-cover"
            />

            <div className="flex-1 relative">
              <h4 className="text-sm font-medium line-clamp-2">
                {item.productId?.name}
              </h4>

              <p className="flex justify-between mt-1 text-xs text-gray-500">
                <span>Qty: {item.quantity}</span>
                <span className="text-amber-700 font-semibold">
                  ${(item.productId?.price * item.quantity).toFixed(2)}
                </span>
              </p>

              <MdDeleteOutline
                onClick={() => removeFromCartDrawer(item._id, item.productId?._id)}
                className="absolute top-0 right-0 cursor-pointer text-red-400"
              />
            </div>
          </div>
        ))
      )}
    </div>

    {/* Footer */}
    <div className="border-t px-4 py-3 space-y-3">
      <div className="flex justify-between font-semibold text-sm">
        <span>{cartItems.length} items</span>
        <span className="text-amber-700">${cartSubtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span>Shipping</span>
        <span>$5.00</span>
      </div>

      <div className="flex justify-between font-bold">
        <span>Total</span>
        <span className="text-amber-700">
          ${(cartSubtotal + 5).toFixed(2)}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <Link to="/cart" onClick={toggleCartPanel(false)}>
          <Button className="btn-org w-full">View Cart</Button>
        </Link>

        <Link to="/checkout" onClick={toggleCartPanel(false)}>
          <Button className="btn-org btn-border w-full">Checkout</Button>
        </Link>
      </div>
    </div>
  </div>
</Drawer>
        </MyContext.Provider>
      </BrowserRouter>
      <Toaster />
    </>
  );
};

export default App;
