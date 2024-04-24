import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { collectionData } from "../../src/components/constants/HomeCollectionData";
import { motion } from "framer-motion";
import axios from "axios";
const CheckoutPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState({});
  // const item = collectionData.find((item) => item.id === itemId);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phoneNo: "",
    city: "",
    state: "",
    pinCode: "",
    couponCode: "",
    paymentMethod: "cashOnDelivery",
  });

  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormData(() => {
      return {
        ...formData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const { name, email, address, city, state, pinCode, phoneNo } = formData;
    console.log(formData);

    // Process the form submission (e.g., send data to server)
    try {
      const res = await axios.post(
        "http://localhost:8080/api/appuser/placeorder",
        {
          address,
          city,
          state,
          pinCode,
          phoneNo,
          orderItems: [
            {
              product: item._id,
              quantity: 1,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOrderPlaced(true);
      console.log(res);
    } catch (error) {
      console.log(error);
    }

    setDiscountPercentage(0);
    // setOrderPlaced(true);
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
  const handleRazorpayPayment = () => {
    // Implement Razorpay payment logic here
    // You can use the Razorpay API or SDK to create an order and proceed with the payment
    // Once the payment is successful, you can update the order status and display a success message
    console.log("Initiating Razorpay payment...");
    // ...
  };

  const discountedPrice = item.price - (item.price * discountPercentage) / 100;
  const shippingCharges = formData.paymentMethod === "cashOnDelivery" ? 50 : 0;
  const totalPrice = discountedPrice + shippingCharges;

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/products/${itemId}`
        );

        setItem(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [itemId]);

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
              Your order has been placed successfully. We will process your
              order and ship it to you soon.
            </p>
            <p className="text-lg mb-8">Order Details:</p>
            <div className="flex justify-center mb-8">
              {/* <img
                src={item.images[0]}
                alt={item.title}
                className="w-32 h-32 object-cover mr-4"
              /> */}
              <div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-lg">Price: ₹{discountedPrice.toFixed(2)}</p>
                <p className="text-lg">
                  Shipping Charges: ₹{shippingCharges.toFixed(2)}
                </p>
                <p className="text-xl font-bold">
                  Total Price: ₹{totalPrice.toFixed(2)}
                </p>
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
            {item && (
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
                      {item.images && (
                        <>
                          <img
                            src={item.images[0]}
                            alt={item.title}
                            className="w-32 h-32 object-cover mr-4"
                          />
                        </>
                      )}

                      <div>
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        {discountPercentage > 0 ? (
                          <div>
                            <p className="text-lg text-gray-500 line-through">
                              ₹{item.price}
                            </p>
                            <p className="text-lg text-green-500">
                              ₹{discountedPrice.toFixed(2)}
                            </p>
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
                    <h2 className="text-2xl font-bold mb-4">
                      Billing Information
                    </h2>
                    <form>
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
                        <label
                          htmlFor="address"
                          className="block mb-2 font-bold"
                        >
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
                          <label
                            htmlFor="city"
                            className="block mb-2 font-bold"
                          >
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
                          <label
                            htmlFor="state"
                            className="block mb-2 font-bold"
                          >
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
                          <label
                            htmlFor="pinCode"
                            className="block mb-2 font-bold"
                          >
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
                          <label
                            htmlFor="phoneNo"
                            className="block mb-2 font-bold"
                          >
                            phoneNo:
                          </label>
                          <input
                            type="text"
                            id="phoneNo"
                            name="phoneNo"
                            value={formData.phoneNo}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="paymentMethod"
                          className="block mb-2 font-bold"
                        >
                          Payment Method:
                        </label>
                        <div>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="cashOnDelivery"
                              checked={
                                formData.paymentMethod === "cashOnDelivery"
                              }
                              onChange={handleChange}
                              className="form-radio h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-gray-400">
                              Cash on Delivery
                            </span>
                          </label>
                        </div>
                        <div>
                          <label className="inline-flex items-center">
                            <input
                              type="radio"
                              name="paymentMethod"
                              value="razorpay"
                              checked={formData.paymentMethod === "razorpay"}
                              onChange={handleChange}
                              className="form-radio h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2 text-gray-400">Razorpay</span>
                          </label>
                        </div>
                        {formData.paymentMethod === "razorpay" && (
                          <button
                            type="button"
                            onClick={handleRazorpayPayment}
                            className="px-6 py-2 mt-4 text-white text-lg font-semibold bg-green-500 rounded-full hover:bg-green-600 transition duration-75"
                          >
                            Pay with Razorpay
                          </button>
                        )}
                        {formData.paymentMethod === "razorpay" && (
  <div className="mt-4">
    <p className="text-gray-400">
      Proceed with Razorpay payment to securely complete your order.
    </p>
    <button
      type="button"
      onClick={handleRazorpayPayment}
      className="px-6 py-2 mt-4 text-white text-lg font-semibold bg-green-500 rounded-full hover:bg-green-600 transition duration-75 flex items-center"
    >
      <img
        src="https://razorpay.com/assets/razorpay-logo.svg"
        alt="Razorpay"
        className="h-6 mr-2"
      />
      Pay with Razorpay
    </button>
  </div>
)}
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="couponCode"
                          className="block mb-2 font-bold"
                        >
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
                        <p className="text-xl font-bold">
                          Total Price: ₹{totalPrice.toFixed(2)}
                        </p>
                      </div>
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="px-6 py-2 text-white text-lg font-semibold bg-blue-500 rounded-full hover:bg-blue-600 transition duration-75"
                      >
                        Place Order
                      </button>
                    </form>
                  </motion.div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
