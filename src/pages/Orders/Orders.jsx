
import React, { useState, useEffect, useContext } from "react";
import Button from "@mui/material/Button";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Collapse } from "react-collapse";
import AccountSidebar from "../../components/AccountSidebar/AccountSidebar";
import api from "../../api/axios";
import { MyContext } from "../../App";

const MyOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openOrders, setOpenOrders] = useState({});
  const context = useContext(MyContext);

  useEffect(() => {
    if (context.isLogin) fetchOrders();
  }, [context.isLogin]);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/order/my-orders");
      const data = res.data.data || [];
      setOrders(data);
      const openAll = {};
      data.forEach(o => openAll[o._id] = true);
      setOpenOrders(openAll);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleOrder = (id) => {
    setOpenOrders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const statusStyle = (status) => {
    if (status === "paid" || status === "delivered") return "bg-green-100 text-green-700";
    if (status === "shipped") return "bg-blue-100 text-blue-700";
    if (status === "pending" || status === "processing") return "bg-yellow-100 text-yellow-700";
    if (status === "cancelled") return "bg-red-100 text-red-600";
    return "bg-gray-100 text-gray-600";
  };

  return (
    <section className="py-10 w-full">
      <div className="container flex flex-col md:flex-row gap-5">

        {/* Sidebar */}
        <div className="w-full md:w-[20%]">
          <AccountSidebar />
        </div>

        {/* Orders */}
        <div className="w-full md:w-[80%]">
          <div className="card bg-white p-5 shadow-md rounded-md">
            <div className="flex items-center justify-between">
              <h2 className="pb-3">My Orders</h2>
            </div>
            <hr />

            {loading ? (
              <p className="text-center py-10 text-gray-400">Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="text-center py-10 text-gray-400">No orders yet.</p>
            ) : (
              orders.map(order => (
                <div key={order._id} className="mt-5 border border-[#f1f1f1] rounded-md p-3 sm:p-4 mb-3">

                  {/* Order header */}
                  <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                    <div className="min-w-0">
                      <h6 className="text-[13px] sm:text-[14px] font-semibold truncate">{order.orderId}</h6>
                      <p className="text-[12px] text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`text-[11px] sm:text-[12px] font-semibold px-2 sm:px-3 py-1 rounded-full capitalize ${statusStyle(order.payment_status)}`}>
                        {order.payment_status}
                      </span>
                      <Button
                        className="!w-[30px] !h-[30px] !min-w-[30px] !rounded-full !text-black"
                        onClick={() => toggleOrder(order._id)}
                      >
                        {openOrders[order._id] ? <FaAngleUp /> : <FaAngleDown />}
                      </Button>
                    </div>
                  </div>

                  {/* Collapsible content */}
                  <Collapse isOpened={openOrders[order._id] || false}>
                    {/* Product row — wraps on mobile */}
                    <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4 mb-3">
                      <img
                        src={order.product_details?.image?.[0]}
                        alt={order.product_details?.name}
                        className="w-[60px] h-[60px] rounded-md object-cover flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold">{order.product_details?.name}</p>
                        <p className="text-[12px] text-gray-400 truncate">Payment ID: {order.paymentId}</p>
                      </div>
                      <p className="text-[13px] font-semibold sm:ml-auto">
                        ${order.totalAmt?.toFixed(2)}
                      </p>
                    </div>
                    <hr />

                    {/* Footer row — wraps on mobile */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mt-3">
                      <p className="text-[13px]">
                        Total: <span className="font-semibold">${order.totalAmt?.toFixed(2)}</span>
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {order.payment_status === "delivered" && (
                          <Button size="small" variant="outlined"
                            className="!capitalize !text-[12px] !border-[#92400e] !text-[#92400e]">
                            Leave Review
                          </Button>
                        )}
                        <Button size="small" variant="contained"
                          className="!capitalize !text-[12px] !bg-[#92400e]">
                          Reorder
                        </Button>
                      </div>
                    </div>
                  </Collapse>

                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default MyOrder;