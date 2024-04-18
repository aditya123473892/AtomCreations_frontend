import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collectionData } from "../../src/components/constants/HomeCollectionData";
import { motion } from "framer-motion";

const CheckoutPage = () => {
  const { itemId } = useParams();
  const item = collectionData.find((item) => item.id === itemId);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pinCode: "",
    couponCode: "",
    paymentMethod: "cashOnDelivery",
  });

  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process the form submission (e.g., send data to server)
    console.log("Form submitted:", formData);
    // Reset the form after submission
    setFormData({
      name: "",
      email: "",
      address: "",
      city: "",
      state: "",
      pinCode: "",
      country: "",
      couponCode: "",
      paymentMethod: "cashOnDelivery",
    });
    setDiscountPercentage(0);
    setOrderPlaced(true);
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

  const handleContinueShopping = () => {
    navigate("/");
  };

  if (!item) {
    return <div>Item not found.</div>;
  }

  const discountedPrice = item.price - (item.price * discountPercentage) / 100;
  const shippingCharges = formData.paymentMethod === "cashOnDelivery" ? 50 : 0;
  const totalPrice = discountedPrice + shippingCharges;

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {orderPlaced ? (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-900 rounded-lg p-8 shadow-2xl text-center"
          >
            <h2 className="text-4xl font-extrabold mb-4">Thank You!</h2>
            <p className="text-xl mb-6">
              Your order has been placed successfully. We will process your order and ship it to you soon.
            </p>
            <p className="text-lg mb-8">Order Details:</p>
            <div className="flex justify-center mb-8">
              <img src={item.image} alt={item.title} className="w-32 h-32 object-cover mr-4" />
              <div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-lg">Price: ₹{discountedPrice.toFixed(2)}</p>
                <p className="text-lg">Shipping Charges: ₹{shippingCharges.toFixed(2)}</p>
                <p className="text-xl font-bold">Total Price: ₹{totalPrice.toFixed(2)}</p>
              </div>
            </div>
            <button
              onClick={handleContinueShopping}
              className="px-6 py-2 text-white text-lg font-semibold bg-blue-500 rounded-full hover:bg-blue-600 transition duration-75"
            >
              Continue Shopping
            </button>
          </motion.div>
        ) : (
          <>
            <motion.h1
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl font-extrabold text-left mb-8"
            >
              Checkout
            </motion.h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gray-900 rounded-lg p-8 shadow-2xl"
              >
                <h2 className="text-2xl font-bold mb-4">Item Details</h2>
                <div className="flex items-center mb-4">
                  <img src={item.image} alt={item.title} className="w-32 h-32 object-cover mr-4" />
                  <div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    {discountPercentage > 0 ? (
                      <div>
                        <p className="text-lg text-gray-500 line-through">₹{item.price}</p>
                        <p className="text-lg text-green-500">₹{discountedPrice.toFixed(2)}</p>
                      </div>
                    ) : (
                      <p className="text-lg">₹{item.price}</p>
                    )}
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gray-900 rounded-lg p-8 shadow-2xl"
              >
                <h2 className="text-2xl font-bold mb-4">Billing Information</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-4">
  <label htmlFor="name" className="block mb-2 font-bold">
    Full Name:
  </label>
  <input
    type="text"
    id="name"
    name="name"
    value={formData.name}
    onChange={handleChange}
    required
    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>
<div className="mb-4">
  <label htmlFor="email" className="block mb-2 font-bold">
    Email Address:
  </label>
  <input
    type="email"
    id="email"
    name="email"
    value={formData.email}
    onChange={handleChange}
    required
    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>
<div className="mb-4">
  <label htmlFor="address" className="block mb-2 font-bold">
    Address:
  </label>
  <input
    type="text"
    id="address"
    name="address"
    value={formData.address}
    onChange={handleChange}
    required
    className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
</div>
<div className="grid grid-cols-2 gap-4 mb-4">
  <div>
    <label htmlFor="city" className="block mb-2 font-bold">
      City:
    </label>
    <input
      type="text"
      id="city"
      name="city"
      value={formData.city}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <div>
    <label htmlFor="state" className="block mb-2 font-bold">
      State:
    </label>
    <input
      type="text"
      id="state"
      name="state"
      value={formData.state}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</div>
<div className="grid grid-cols-2 gap-4 mb-4">
  <div>
    <label htmlFor="pinCode" className="block mb-2 font-bold">
      Pin Code:
    </label>
    <input
      type="text"
      id="pinCode"
      name="pinCode"
      value={formData.pinCode}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
  <div>
    <label htmlFor="country" className="block mb-2 font-bold">
      Country:
    </label>
    <input
      type="text"
      id="country"
      name="country"
      value={formData.country}
      onChange={handleChange}
      required
      className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</div>
                  <div className="mb-4">
                    <label htmlFor="paymentMethod" className="block mb-2 font-bold">
                      Payment Method:
                    </label>
                    <div>
                      <label className="inline-flex items-center">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cashOnDelivery"
                          checked={formData.paymentMethod === "cashOnDelivery"}
                          onChange={handleChange}
                          className="form-radio h-5 w-5 text-blue-600"
                        />
                        <span className="ml-2 text-gray-400">Cash on Delivery</span>
                      </label>
                    </div>
                    {formData.paymentMethod === "cashOnDelivery" && (
                      <p className="text-gray-500 mt-2">
                        ₹50 shipping charges will be added for Cash on Delivery.
                      </p>
                    )}
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
                      <p className="text-green-500 mt-2">
                        {discountPercentage}% discount applied!
                      </p>
                    )}
                  </div>
                  <div className="mb-4">
                    <p className="text-xl font-bold">Total Price: ₹{totalPrice.toFixed(2)}</p>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 text-white text-lg font-semibold bg-blue-500 rounded-full hover:bg-blue-600 transition duration-75"
                  >
                    Place Order
                  </button>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;