import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useLocation, useParams } from "react-router";

const ConfirmationPage = ({ orderDetails, selectedItem }) => {
  const [formData, setFormData] = useState({
    couponCode: "",
  });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("id");
  console.log(orderId);

  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [order, setOrder] = useState({});
  const [totalPrice, setTotalPrice] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleApplyCoupon = async () => {
    const { couponCode } = formData;
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:8080/api/appuser/applyCoupon/${orderId}`,
        {
          couponCode,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Apply Coupon Response:", res);
      setTotalPrice(res.data.paymentInfo.totalPrice);

      // Uncomment and define couponCodes with sample coupon codes and their discounts
      const couponCodes = {
        ATOMS20: 20,
        // Add more coupon codes here if needed
      };

      const enteredCode = formData.couponCode.toUpperCase();
      if (couponCodes[enteredCode]) {
        setDiscountPercentage(couponCodes[enteredCode]);
      } else {
        setDiscountPercentage(0);
      }
    } catch (error) {
      console.log("Apply Coupon Error:", error);
    }
  };

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `http://localhost:8080/api/appuser/confirmOrder/${orderId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Confirm Order Response:", res);
      alert("Order placed successfully!");
    } catch (error) {
      console.log("Confirm Order Error:", error);
    }
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:8080/api/appuser/getorder/${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Fetch Order Details Response:", res);
        setOrder(res.data);
        setTotalPrice(res.data.paymentInfo.totalPrice);
      } catch (error) {
        console.log("Fetch Order Details Error:", error);
      }
    };

    fetchOrderDetails();
  }, [orderId, totalPrice]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className=" rounded-lg p-8 shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
        {order && (
          <>
            <div className="mb-4">
              {order.shippingInfo && (
                <>
                  <p className="text-lg">
                    Address: {order.shippingInfo.address}
                  </p>
                  <p className="text-lg">City: {order.shippingInfo.city}</p>
                  <p className="text-lg">State: {order.shippingInfo.state}</p>
                  <p className="text-lg">
                    Pin Code: {order.shippingInfo.pinCode}
                  </p>
                  <p className="text-lg">
                    Phone No: {order.shippingInfo.phoneNo}
                  </p>
                </>
              )}

              {order.orderItems &&
                order.orderItems.map((item, index) => (
                  <div className="mb-4" key={index}>
                    <h3 className="text-xl font-bold mb-2">Selected Item</h3>
                    <div className="flex items-center">
                      <div>
                        <h4 className="text-lg font-bold">
                          {item.ProductsTitle}
                        </h4>
                        <p className="text-lg">Price: ₹{item.ProductsPrice}</p>
                        <p className="text-lg">Quantity: {item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </>
        )}

        <div className="mb-4">
          <label htmlFor="couponCode" className="block mb-2 font-bold">
            Coupon Code:
          </label>
          <div className="flex">
            <input
              type="text"
              id="couponCode"
              name="couponCode"
              value={formData.couponCode}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 bg-gray-800 text-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={handleApplyCoupon}
              className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Apply
            </button>
          </div>
          {discountPercentage > 0 && (
            <p className="text-green-500 mt-2">
              {discountPercentage}% discount applied!
            </p>
          )}
        </div>
        <div className="mb-4">
          {order.paymentInfo && (
            <p className="text-xl font-bold">
              Total Price: ₹{parseInt(order.paymentInfo.totalPrice)}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={handleConfirmOrder}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Confirm Order
        </button>
      </motion.div>
    </>
  );
};

export default ConfirmationPage;
