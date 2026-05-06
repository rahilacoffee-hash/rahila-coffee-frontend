import React, { useState } from "react";
import Button from "@mui/material/Button";
import api from "../../api/axios";
import {
  FaBox,
  FaShippingFast,
  FaTruck,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

const steps = [
  { title: "Order Placed", icon: <FaBox /> },
  { title: "Processing", icon: <FaBox /> },
  { title: "Shipped", icon: <FaShippingFast /> },
  { title: "Out for Delivery", icon: <FaTruck /> },
  { title: "Delivered", icon: <FaCheckCircle /> },
];

const statusToStep = (status) => {
  switch (status) {
    case "pending":
      return 0;
    case "paid":
      return 1;
    case "shipped":
      return 2;
    case "out_for_delivery":
      return 3;
    case "delivered":
      return 4;
    case "cancelled":
      return -1;
    default:
      return 0;
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case "delivered":
      return "bg-green-100 text-green-700";
    case "shipped":
    case "out_for_delivery":
      return "bg-blue-100 text-blue-700";
    case "cancelled":
      return "bg-red-100 text-red-700";
    default:
      return "bg-yellow-100 text-yellow-700";
  }
};

const getStatusEmoji = (status) => {
  switch (status) {
    case "pending":
      return "🛒";
    case "paid":
      return "💳";
    case "shipped":
      return "📦";
    case "out_for_delivery":
      return "🚚";
    case "delivered":
      return "🎉";
    case "cancelled":
      return "❌";
    default:
      return "📍";
  }
};

const OrderTracking = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTrack = async (e) => {
    e.preventDefault();

    if (!orderId.trim()) {
      setError("Please enter an Order ID");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await api.get("/order/my-orders");
      const orders = res.data.data || [];

      const found = orders.find(
        (o) =>
          o.orderId?.toLowerCase() === orderId.trim().toLowerCase()
      );

      if (!found) {
        setError("Oops! Order not found 😢");
      } else {
        setOrder(found);
      }
    } catch (err) {
      setError("Please login first to track your order.");
    } finally {
      setLoading(false);
    }
  };

  const currentStep = order ? statusToStep(order.payment_status) : -1;

  return (
    <section className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-100 py-10">
      <div className="max-w-3xl mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800">
            Track Your Order 📦
          </h1>
          <p className="text-gray-500 mt-2">
            Enter your order ID and watch your package journey in real-time.
          </p>
        </div>

        {/* Search Box */}
        <form
          onSubmit={handleTrack}
          className="bg-white shadow-xl rounded-2xl p-6 mb-8"
        >
          <label className="block text-sm font-semibold text-gray-600 mb-3">
            Order ID
          </label>

          <div className="flex gap-3 flex-col sm:flex-row">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Order ID..."
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />

            <Button
              type="submit"
              disabled={loading}
              className="!bg-amber-700 !text-white !rounded-xl !px-6"
            >
              {loading ? "Tracking..." : "Track Order"}
            </Button>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-3">{error}</p>
          )}
        </form>

        {/* Empty State */}
        {!order && !loading && !error && (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center">
            <div className="text-6xl mb-4">📍</div>
            <h3 className="text-xl font-semibold text-gray-700">
              No Order Tracked Yet
            </h3>
            <p className="text-gray-500 mt-2">
              Enter your order ID above to start tracking.
            </p>
          </div>
        )}

        {/* Order Details */}
        {order && (
          <div className="bg-white rounded-2xl shadow-xl p-6">
            
            {/* Status Header */}
            <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
              <div>
                <h2 className="font-bold text-lg text-gray-800">
                  {order.orderId}
                </h2>
                <p className="text-gray-500 text-sm">
                  Ordered on{" "}
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`px-4 py-2 rounded-full font-semibold text-sm capitalize ${getStatusColor(
                  order.payment_status
                )}`}
              >
                {getStatusEmoji(order.payment_status)}{" "}
                {order.payment_status.replace("_", " ")}
              </span>
            </div>

            {/* Product Card */}
            <div className="bg-gray-50 rounded-xl p-4 flex items-center gap-4 mb-8 hover:shadow-md transition">
              <img
                src={order.product_details?.image?.[0]}
                alt={order.product_details?.name}
                className="w-20 h-20 rounded-xl object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">
                  {order.product_details?.name}
                </h3>
                <p className="text-gray-500 text-sm">
                  Quantity: {order.quantity || 1}
                </p>
                <p className="font-bold text-amber-700 mt-1">
                  ${order.totalAmt?.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Cancelled Order */}
            {order.payment_status === "cancelled" ? (
              <div className="text-center py-6">
                <FaTimesCircle className="text-red-500 text-5xl mx-auto mb-3" />
                <h3 className="text-xl font-bold text-red-600">
                  Order Cancelled
                </h3>
                <p className="text-gray-500 mt-2">
                  This order was cancelled and won't be delivered.
                </p>
              </div>
            ) : (
              <>
                <h3 className="font-semibold text-gray-700 mb-6">
                  Delivery Journey 🚚
                </h3>

                {/* Progress Tracker */}
                <div className="relative">
                  {/* Progress Line */}
                  <div className="absolute top-6 left-0 w-full h-1 bg-gray-200 rounded-full"></div>

                  <div
                    className="absolute top-6 left-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-700"
                    style={{
                      width: `${
                        (currentStep / (steps.length - 1)) * 100
                      }%`,
                    }}
                  ></div>

                  <div className="flex justify-between relative">
                    {steps.map((step, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center w-20 text-center"
                      >
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center text-lg shadow-md transition-all duration-300 ${
                            index <= currentStep
                              ? "bg-amber-700 text-white scale-110"
                              : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {step.icon}
                        </div>

                        <p
                          className={`text-xs mt-3 font-medium ${
                            index <= currentStep
                              ? "text-amber-700"
                              : "text-gray-400"
                          }`}
                        >
                          {step.title}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fun message */}
                <div className="mt-8 text-center bg-amber-50 p-4 rounded-xl">
                  <p className="text-gray-700 font-medium">
                    {order.payment_status === "delivered"
                      ? "🎉 Your order has arrived! Enjoy!"
                      : "Hang tight! Your order is on its way 🚀"}
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default OrderTracking;