import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const ConfirmationPage = ({ orderDetails, selectedItem }) => {
  const [formData, setFormData] = useState({
    couponCode: "",
  });

  const [discountPercentage, setDiscountPercentage] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleApplyCoupon = () => {
    const couponCodes = {
      ATOMS20: 20,
    };

    const enteredCode = formData.couponCode.toUpperCase();
    if (couponCodes[enteredCode]) {
      setDiscountPercentage(couponCodes[enteredCode]);
    } else {
      setDiscountPercentage(0);
    }
  };

  const discountedPrice =
    orderDetails.totalPrice - (orderDetails.totalPrice * discountPercentage) / 100;
  const shippingCharges = 0;
  const finalPrice = discountedPrice + shippingCharges;

  useEffect(() => {
    // Fetch the latest order details from the server
    const fetchOrderDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8080/api/appuser/getorderdetails/${orderDetails._id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Update the orderDetails state with the latest data
        // You can use the response data to update the orderDetails state
        // For example: setOrderDetails(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderDetails();
  }, [orderDetails._id]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-900 rounded-lg p-8 shadow-2xl"
    >
      <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>
      <div className="mb-4">
        <p className="text-lg">Order ID: {orderDetails._id}</p>
        <p className="text-lg">Name: {orderDetails.name}</p>
        <p className="text-lg">Email: {orderDetails.email}</p>
        <p className="text-lg">Address: {orderDetails.address}</p>
        <p className="text-lg">City: {orderDetails.city}</p>
        <p className="text-lg">State: {orderDetails.state}</p>
        <p className="text-lg">Pin Code: {orderDetails.pinCode}</p>
        <p className="text-lg">Phone No: {orderDetails.phoneNo}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-bold mb-2">Selected Item</h3>
        <div className="flex items-center">
          <img
            src={selectedItem.images[0]}
            alt={selectedItem.title}
            className="w-32 h-32 object-cover mr-4"
          />
          <div>
            <h4 className="text-lg font-bold">{selectedItem.title}</h4>
            <p className="text-lg">Price: ₹{selectedItem.price}</p>
            <p className="text-lg">Quantity: 1</p>
          </div>
        </div>
      </div>
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
          <p className="text-green-500 mt-2">{discountPercentage}% discount applied!</p>
        )}
      </div>
      <div className="mb-4">
        <p className="text-xl font-bold">Total Price: ₹{finalPrice.toFixed(2)}</p>
      </div>
    </motion.div>
  );
};

export default ConfirmationPage;