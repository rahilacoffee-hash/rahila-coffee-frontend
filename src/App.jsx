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
            className="cartPanel overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between py-3 px-4 gap-3 border-b border-gray-200">
              <h4 className="font-[600]">Shopping Cart ({cartItems.length})</h4>
              <MdOutlineClose
                className="text-[20px] cursor-pointer"
                onClick={toggleCartPanel(false)}
              />
            </div>

            {/* Cart Items */}
            <div className="scroll w-full max-h-[380px] overflow-y-scroll overflow-x-hidden py-3 px-4">
              {cartLoading ? (
                <p className="text-center text-gray-400 text-[13px] py-5">
                  Loading...
                </p>
              ) : cartItems.length === 0 ? (
                <p className="text-center text-gray-400 text-[13px] py-5">
                  Your cart is empty
                </p>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="cartItem w-full flex items-center gap-4 border-b border-gray-200 pb-4 pt-4"
                  >
                    <div className="img w-[25%] overflow-hidden h-[80px] rounded-md">
                      <Link
                        to={`/Product/${item.productId?._id}`}
                        className="block group"
                        onClick={toggleCartPanel(false)}
                      >
                        <img
                          src={item.productId?.images?.[0]}
                          alt={item.productId?.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-all"
                        />
                      </Link>
                    </div>

                    <div className="info w-[75%] pr-5 relative">
                      <h4 className="text-[14px] font-[500] pr-6 line-clamp-2">
                        <Link
                          to={`/Product/${item.productId?._id}`}
                          className="link transition-all"
                          onClick={toggleCartPanel(false)}
                        >
                          {item.productId?.name}
                        </Link>
                      </h4>
                      <p className="flex items-center gap-5 mt-1 mb-1">
                        <span className="text-[12px] text-gray-500">
                          Qty:{" "}
                          <span className="font-[600]">{item.quantity}</span>
                        </span>
                        <span className="text-amber-700 font-[600] text-[13px]">
                          ${(item.productId?.price * item.quantity).toFixed(2)}
                        </span>
                      </p>
                      <MdDeleteOutline
                        onClick={() =>
                          removeFromCartDrawer(item._id, item.productId?._id)
                        }
                        className="absolute top-[0px] right-[0px] cursor-pointer text-[20px] text-red-400 hover:text-red-600 transition-all"
                      />
                    </div>
                  </div>
                ))
              )}
            </div>

            <br />

            {/* Bottom Summary */}
            <div className="bottomSection absolute bottom-[10px] w-full overflow-hidden pr-5">
              <div className="bottomInfo py-3 px-4 flex items-center justify-between w-full border-t border-gray-200 flex-col gap-1">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[14px] font-[600]">
                    {cartItems.length} item{cartItems.length !== 1 ? "s" : ""}
                  </span>
                  <span className="text-amber-700 font-[600]">
                    ${cartSubtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="text-[14px] font-[600]">Shipping</span>
                  <span className="text-gray-500 font-[600]">$5.00</span>
                </div>
              </div>

              <div className="bottomInfo py-3 px-4 flex items-center justify-between w-full border-t border-gray-200 flex-col gap-3">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[14px] font-[600]">Total</span>
                  <span className="text-amber-700 font-[700]">
                    ${(cartSubtotal + 5).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between w-full gap-3">
                  <Link
                    to="/cart"
                    className="w-[50%] block"
                    onClick={toggleCartPanel(false)}
                  >
                    <Button className="btn-org btn-lg w-full">View Cart</Button>
                  </Link>
                  <Link
                    to="/checkout"
                    className="w-[50%] block"
                    onClick={toggleCartPanel(false)}
                  >
                    <Button className="btn-org btn-border btn-lg w-full">
                      Checkout
                    </Button>
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
