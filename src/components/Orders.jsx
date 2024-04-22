import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaBox, FaTruck, FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  // const [orders, setOrders] = useState([
  //   {
  //     id: 1,
  //     orderNumber: "ORD-1234",
  //     date: "2023-06-01",
  //     totalAmount: 99.99,
  //     status: "Delivered",
  //     items: [
  //       { id: 1, name: "Product 1", quantity: 2, price: 19.99 },
  //       { id: 2, name: "Product 2", quantity: 1, price: 29.99 },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     orderNumber: "ORD-5678",
  //     date: "2023-06-05",
  //     totalAmount: 149.99,
  //     status: "Shipped",
  //     items: [
  //       { id: 3, name: "Product 3", quantity: 1, price: 49.99 },
  //       { id: 4, name: "Product 4", quantity: 3, price: 39.99 },
  //     ],
  //   },
  //   {
  //     id: 3,
  //     orderNumber: "ORD-9012",
  //     date: "2023-06-10",
  //     totalAmount: 79.99,
  //     status: "Cancelled",
  //     items: [{ id: 5, name: "Product 5", quantity: 1, price: 79.99 }],
  //   },
  // ]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <FaCheckCircle className="text-green-500 mr-2" />;
      case "Shipped":
        return <FaTruck className="text-blue-500 mr-2" />;
      case "Cancelled":
        return <FaTimesCircle className="text-red-500 mr-2" />;
      case "processing":
        return <FaSpinner className="text-yellow-500 mr-2" />;
      default:
        return null;
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("token");
      try {
        const res = await axios.get(
          "http://localhost:8080/api/appuser/getuserorders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
        const orderData = res.data;
        setOrders(orderData);
        console.log(orders);
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-white mb-8">Order History</h2>
          {orders.length === 0 ? (
            <p className="text-gray-400">No orders found.</p>
          ) : (
            <div className="space-y-8">
              {orders &&
                orders.map((order) => (
                  <div
                    key={order._id}
                    className="bg-gray-800 rounded-lg shadow-md p-6"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        {/* <h3 className="text-xl font-bold text-white">
                        {order.orderNumber}
                      </h3> */}
                        <p className="text-gray-400">
                          {order.paymentInfo.createdAt.substring(0, 10)}
                        </p>
                      </div>
                      <div className="flex items-center">
                        {getStatusIcon(order.paymentInfo.status)}
                        <span className="text-white">
                          {order.paymentInfo.status}
                        </span>
                      </div>
                    </div>
                    <div className="mb-4">
                    {order.orderItems.map((item) => (
                      <div key={item._id} className="flex justify-between mb-2">
                        <div className="flex items-center">
                          <FaBox className="text-gray-400 mr-2" />
                          <span className="text-white">{item.ProductsTitle}</span>
                        </div>
                        <span className="text-white">
                          {item.quantity} x ₹ {item.ProductsPrice}
                        </span>
                      </div>
                    ))}
                  </div>
                    <div className="flex justify-end">
                    <p className="text-xl font-bold text-white">
                      Total: ₹ {order.paymentInfo.totalPrice}
                    </p>
                  </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
