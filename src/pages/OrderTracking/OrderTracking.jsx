import React, { useState } from "react";
import Button from "@mui/material/Button";
import api from "../../api/axios";

const steps = ["Order Placed", "Processing", "Shipped", "Out for Delivery", "Delivered"];

const statusToStep = (status) => {
  switch (status) {
    case "pending":   return 0;
    case "paid":      return 1;
    case "shipped":   return 2;
    case "delivered": return 4;
    case "cancelled": return -1;
    default:          return 0;
  }
};

const OrderTracking = () => {
  const [orderId, setOrderId]   = useState("");
  const [order, setOrder]       = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderId.trim()) { setError("Please enter an Order ID"); return; }
    setError(""); setOrder(null); setLoading(true);

    try {
      const res = await api.get("/order/my-orders");
      const orders = res.data.data || [];
      const found = orders.find(o =>
        o.orderId?.toLowerCase() === orderId.trim().toLowerCase()
      );
      if (!found) {
        setError("Order not found. Please check your Order ID.");
      } else {
        setOrder(found);
      }
    } catch (err) {
      setError("Failed to fetch order. Please login first.");
    } finally {
      setLoading(false);
    }
  };

  const currentStep = order ? statusToStep(order.payment_status) : -1;

  return (
    <section className="py-10 min-h-screen bg-gray-50">
      <div className="container max-w-2xl mx-auto px-4">
        <h1 className="text-[28px] font-bold text-gray-800 mb-2">Track Your Order</h1>
        <p className="text-gray-400 text-[14px] mb-8">
          Enter your Order ID to get real-time delivery updates.
        </p>

        {/* Search */}
        <form onSubmit={handleTrack} className="bg-white shadow-md rounded-xl p-6 mb-6">
          <label className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider block mb-2">
            Order ID
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              value={orderId}
              onChange={e => setOrderId(e.target.value)}
              placeholder="e.g. ORD-1234567890-123"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg text-[13px] focus:outline-none focus:border-amber-700"
            />
            <Button
              type="submit"
              disabled={loading}
              className="!bg-amber-800 !text-white !capitalize !px-6 !rounded-lg"
            >
              {loading ? "Tracking..." : "Track"}
            </Button>
          </div>
          {error && <p className="text-red-500 text-[12px] mt-2">{error}</p>}
        </form>

        {/* Result */}
        {order && (
          <div className="bg-white shadow-md rounded-xl p-6">
            {/* Order info */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-[15px] font-bold text-gray-800">{order.orderId}</h3>
                <p className="text-[12px] text-gray-400">
                  Placed on {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
              <span className={`text-[12px] font-semibold px-3 py-1 rounded-full capitalize
                ${order.payment_status === "delivered" ? "bg-green-100 text-green-700" :
                  order.payment_status === "shipped"   ? "bg-blue-100 text-blue-700" :
                  order.payment_status === "cancelled" ? "bg-red-100 text-red-600" :
                  "bg-yellow-100 text-yellow-700"}`}>
                {order.payment_status}
              </span>
            </div>

            {/* Product */}
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg mb-6">
              <img
                src={order.product_details?.image?.[0]}
                alt={order.product_details?.name}
                className="w-14 h-14 object-cover rounded-md"
              />
              <div className="flex-1">
                <p className="text-[13px] font-semibold">{order.product_details?.name}</p>
                <p className="text-[11px] text-gray-400">Order Total: ${order.totalAmt?.toFixed(2)}</p>
              </div>
            </div>

            {/* Stepper */}
            {order.payment_status !== "cancelled" ? (
              <div>
                <h4 className="text-[13px] font-semibold text-gray-600 mb-4 uppercase tracking-wider">
                  Delivery Progress
                </h4>
                <div className="relative">
                  {/* Progress line */}
                  <div className="absolute top-4 left-4 right-4 h-0.5 bg-gray-200 z-0" />
                  <div
                    className="absolute top-4 left-4 h-0.5 bg-amber-700 z-0 transition-all duration-500"
                    style={{ width: currentStep >= 0 ? `${(currentStep / (steps.length - 1)) * 100}%` : "0%" }}
                  />

                  <div className="relative z-10 flex justify-between">
                    {steps.map((step, i) => (
                      <div key={i} className="flex flex-col items-center gap-2">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold transition-all
                          ${i <= currentStep
                            ? "bg-amber-800 text-white"
                            : "bg-gray-200 text-gray-400"}`}>
                          {i <= currentStep ? "✓" : i + 1}
                        </div>
                        <p className={`text-[10px] font-medium text-center max-w-[60px] ${
                          i <= currentStep ? "text-amber-800" : "text-gray-400"
                        }`}>
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-red-500 font-semibold">This order was cancelled.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderTracking;