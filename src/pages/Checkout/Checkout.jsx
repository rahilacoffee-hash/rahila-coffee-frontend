import React, { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import api from "../../api/axios";
import { MyContext } from "../../App";
import { useNavigate, Link } from "react-router-dom";
import Button from "@mui/material/Button";

// ← Replace with your real Stripe publishable key
const stripePromise = loadStripe("pk_test_51TJiyFGsWrJwccaa51FfXuGenesSLaxC5hsowxMvPhUK477rZa6jj7HyHxDEQkV31EZ27ICqYfPYiudeVuTNY5VD00v1IOhhiw");

const CheckoutForm = () => {
  const stripe   = useStripe();
  const elements = useElements();
  const context  = useContext(MyContext);
  const navigate = useNavigate();

  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [total, setTotal]             = useState(0);
  const [cartItems, setCartItems]     = useState([]);
  const [address, setAddress]         = useState({
    street: "", city: "", zip: "", country: ""
  });

  useEffect(() => {
    loadCartAndIntent();
  }, []);

  const loadCartAndIntent = async () => {
    try {
      // Step 1: Load cart items to display
      const cartRes = await api.get("/cart");
      const items = cartRes.data.data || [];
      setCartItems(items);

      if (items.length === 0) {
        setError("Your cart is empty. Add items before checkout.");
        return;
      }

      // Step 2: Create payment intent
      const intentRes = await api.post("/order/create-payment-intent");
      setClientSecret(intentRes.data.clientSecret);
      setTotal(intentRes.data.totalAmt || 0);
    } catch (err) {
      console.error("Checkout load error:", err.response?.data);
      setError(err.response?.data?.message || "Failed to load checkout.");
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!stripe || !elements || !clientSecret) return;

  setLoading(true);
  setError("");

  try {
    // ✅ STEP 1: SAVE ADDRESS FIRST
    const addressRes = await api.post("/address/create", {
      street: address.street,
      city: address.city,
      zip: address.zip,
      country: address.country,
    });

    const addressId = addressRes.data.data._id;

    // ✅ STEP 2: CONFIRM PAYMENT
    const { error: stripeError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

    if (stripeError) {
      setError(stripeError.message);
      return;
    }

    // ✅ STEP 3: PLACE ORDER WITH ADDRESS ID
    if (paymentIntent.status === "succeeded") {
      await api.post("/order/place", {
        paymentId: paymentIntent.id,
        delivery_address: addressId, // ✅ FIXED
      });

      context.openAlertBox("success", "Order placed successfully!");

      // ✅ UPDATE CART IMMEDIATELY
      context.setCartItems?.([]);
      context.fetchCartItems?.();

      navigate("/my-orders");
    }

  } catch (err) {
    console.error(err);
    setError(err.response?.data?.message || "Payment failed");
  } finally {
    setLoading(false);
  }
};
  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.productId?.price || 0) * item.quantity, 0
  );

  return (
    <div className="flex flex-col lg:flex-row gap-6 ">

      {/* LEFT — Address + Payment */}
      <div className="flex-1 space-y-4">
        <form onSubmit={handleSubmit} id="checkout-form">

          {/* Cart Items Summary */}
          <div className="bg-white shadow-md rounded-md p-5 mb-4">
            <h3 className="text-[16px] font-[700] mb-4">
              Order Summary ({cartItems.length} item{cartItems.length !== 1 ? "s" : ""})
            </h3>
            {cartItems.length === 0 ? (
              <p className="text-gray-400 text-[13px]">
                Cart is empty.{" "}
                <Link to="/ShopNow" className="text-amber-800 underline">Shop Now</Link>
              </p>
            ) : (
              <div className="space-y-3">
                {cartItems.map(item => (
                  <div key={item._id} className="flex items-center gap-3">
                    <img
                      src={item.productId?.images?.[0]}
                      alt={item.productId?.name}
                      className="w-12 h-12 object-cover rounded-md border"
                    />
                    <div className="flex-1">
                      <p className="text-[13px] font-semibold">{item.productId?.name}</p>
                      <p className="text-[11px] text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-[13px] font-semibold text-amber-800">
                      ${(item.productId?.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Shipping Address */}
          <div className="bg-white shadow-md rounded-md p-5">
            <h3 className="text-[16px] font-[700] mb-4">Shipping Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-gray-500">Street *</label>
                <input required value={address.street}
                  onChange={e => setAddress({...address, street: e.target.value})}
                  className="border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-amber-700"
                  placeholder="123 Main Street" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-gray-500">City *</label>
                <input required value={address.city}
                  onChange={e => setAddress({...address, city: e.target.value})}
                  className="border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-amber-700"
                  placeholder="Abuja" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-gray-500">ZIP *</label>
                <input required value={address.zip}
                  onChange={e => setAddress({...address, zip: e.target.value})}
                  className="border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-amber-700"
                  placeholder="900211" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[12px] text-gray-500">Country *</label>
                <input required value={address.country}
                  onChange={e => setAddress({...address, country: e.target.value})}
                  className="border border-gray-200 rounded-md px-3 py-2 text-[13px] focus:outline-none focus:border-amber-700"
                  placeholder="Nigeria" />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white shadow-md rounded-md p-5">
            <h3 className="text-[16px] font-[700] mb-4">Payment Details</h3>
            <div className="border border-gray-200 rounded-md p-3">
              <CardElement options={{ style: { base: { fontSize: "14px", color: "#1f2937" } } }} />
            </div>
            <p className="text-[11px] text-gray-400 mt-2">
              Test card: 4242 4242 4242 4242 · Any future date · Any CVV
            </p>
          </div>

          {error && <p className="text-red-500 text-[13px] text-center">{error}</p>}
        </form>
      </div>

      {/* RIGHT — Total + Pay Button */}
      <div className="w-full lg:w-[300px]">
        <div className="bg-white shadow-md rounded-md p-5 sticky top-4">
          <h3 className="text-[16px] font-[700] mb-4">Order Total</h3>
          <div className="flex justify-between mb-2">
            <span className="text-[13px] text-gray-500">Subtotal</span>
            <span className="font-[600]">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-[13px] text-gray-500">Shipping</span>
            <span className="font-[600]">$5.00</span>
          </div>
          <hr className="my-3" />
          <div className="flex justify-between mb-5">
            <span className="font-[700]">Total</span>
            <span className="font-[700] text-amber-800">${(subtotal + 5).toFixed(2)}</span>
          </div>

          <Button
            type="submit"
            form="checkout-form"
            disabled={!stripe || loading || cartItems.length === 0}
            className="!bg-amber-800 !text-white !capitalize !w-full !py-3 !text-[14px]"
          >
            {loading ? "Processing..." : `Pay $${(subtotal + 5).toFixed(2)}`}
          </Button>
        </div>
      </div>
    </div>
  );
};

const Checkout = () => {
  const context = useContext(MyContext);

  if (!context.isLogin) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gray-500 mb-4">Please login to checkout</p>
        <Link to="/login">
          <Button className="!bg-amber-800 !text-white !capitalize">Login</Button>
        </Link>
      </div>
    );
  }

  return (
    <section className="py-10">
      <div className="container">
        <h2 className="text-[22px] font-[700] mb-6">Checkout</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </section>
  );
};

export default Checkout;