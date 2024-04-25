import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const CheckoutPage = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState({});
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phoneNo: "",
    city: "",
    state: "",
    pinCode: "",
    paymentMethod: "",
  });

  const [orderDetails, setOrderDetails] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const { name, email, address, city, state, pinCode, phoneNo, paymentMethod } = formData;
    console.log(formData);

    // Validate phone number
    if (phoneNo.length !== 10) {
      alert("Phone number should be 10 digits long.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/appuser/placeorder",
        {
          address,
          city,
          state,
          pinCode,
          phoneNo,
          paymentMethod,
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
      console.log(res);
      setOrderDetails(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/products/${itemId}`);
        setItem(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [itemId]);

  if (!item) {
    return <div>Item not found.</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {orderDetails ? (
          <PaymentComponent orderDetails={orderDetails} selectedItem={item} />
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
                            className="w-64 h-64 object-cover mr-8 rounded-lg shadow-lg"
                          />
                        </>
                      )}
                      <div>
                        <h3 className="text-2xl font-bold">{item.title}</h3>
                        <p className="text-xl">₹{item.price}</p>
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
                          <label htmlFor="phoneNo" className="block mb-2 font-bold">
                            Phone No:
                          </label>
                          <input
                            type="tel"
                            id="phoneNo"
                            name="phoneNo"
                            value={formData.phoneNo}
                            onChange={handleChange}
                            required
                            pattern="[0-9]{10}"
                            maxLength="10"
                            className="w-full px-3 py-2 border border-gray-300 bg-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="mb-4">
                        <h3 className="text-xl font-bold mb-2">Payment Method</h3>
                        <div className="flex items-center mb-2">
                          <input
                            type="radio"
                            id="razorpay"
                            name="paymentMethod"
                            value="razorpay"
                            checked={formData.paymentMethod === "razorpay"}
                            onChange={handleChange}
                            className="mr-2"
                            disabled
                          />
                          <label htmlFor="razorpay" className="text-lg text-gray-400 relative">
                            Razorpay
                            <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                              Coming Soon
                            </span>
                          </label>
                        </div>
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id="cod"
                            name="paymentMethod"
                            value="cod"
                            checked={formData.paymentMethod === "cod"}
                            onChange={handleChange}
                            className="mr-2"
                          />
                          <label htmlFor="cod" className="text-lg">
                            Cash on Delivery (COD)
                          </label>
                        </div>
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
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;