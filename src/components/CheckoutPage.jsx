import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { collectionData } from "../../src/components/constants/HomeCollectionData";
import { motion } from "framer-motion";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// import { FaArrowRight } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
const CheckoutPage = () => {
  // const { itemId } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const itemId = searchParams.get("id");
  const size = searchParams.get("size");
  const cart = searchParams.get("cart");
  const [item, setItem] = useState({});
  const [cartItem, setCartItem] = useState([]);
  const [TotalPrice, setTotalPrice] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);
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
    paymentMethod: "",
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
    const {
      name,
      email,
      address,
      city,
      state,
      pinCode,
      phoneNo,
      paymentMethod,
    } = formData;
    // console.log(formData);
    // console.log(paymentMethod);

    if (phoneNo.length !== 10) {
      toast.warning("Phone Number must be of 10 digits", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.warning("email must include @", {
        position: "top-center",
      });
    } else {
      // Process the form submission (e.g., send data to server)
      if (itemId) {
        try {
          const res = await axios.post(
            "http://atom-creations-backend.vercel.app/api/appuser/placeorder",
            {
              address,
              email,
              name,
              city,
              paymentMethod,
              state,
              pinCode,
              phoneNo,
              orderItems: [
                {
                  product: item._id,
                  quantity: 1,
                  size: size,
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

         
          navigate(`/confirmation/?id=${res.data.data._id}&m=${paymentMethod}`);
        } catch (error) {
          console.log(error);
        }
      }

      if (cart) {
        const orderItems = cartItem.map((cartItem) => ({
          product: cartItem.productId,
          quantity: cartItem.quantity,
          size: cartItem.size,
        }));
        try {
          const res = await axios.post(
            "http://atom-creations-backend.vercel.app/api/appuser/placeorder",
            {
              address,
              city,
              email,
              name,
              paymentMethod,
              state,
              pinCode,
              phoneNo,
              orderItems: orderItems,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setOrderPlaced(true);
          setOrderDetails(res.data);
          // console.log(res);
          // console.log(res.data.data._id);

          navigate(`/confirmation/?id=${res.data.data._id}`);
        } catch (error) {
          console.log(error);
        }
      }

      setDiscountPercentage(0);
    }

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
  // const handleRazorpayPayment = () => {
  //   // Implement Razorpay payment logic here
  //   // You can use the Razorpay API or SDK to create an order and proceed with the payment
  //   // Once the payment is successful, you can update the order status and display a success message
  //   console.log("Initiating Razorpay payment...");
  //   // ...
  // };

  const discountedPrice = item.price - (item.price * discountPercentage) / 100;
  const shippingCharges = formData.paymentMethod === "cashOnDelivery" ? 50 : 0;
  const totalPrice = discountedPrice + shippingCharges;

  useEffect(() => {
    const getProduct = async () => {
      if (itemId) {
        try {
          const res = await axios.get(
            `http://atom-creations-backend.vercel.app/api/products/${itemId}`
          );

          setItem(res.data);
          setTotalPrice(res.data.price);
        } catch (error) {
          console.log(error);
        }
      }

      if (cart) {
        try {
          const YOUR_TOKEN = localStorage.getItem("token");
          if (YOUR_TOKEN) {
            const myCart = await axios.get(
              "http://atom-creations-backend.vercel.app/api/appuser/getcartitem",
              {
                headers: {
                  Authorization: `Bearer ${YOUR_TOKEN}`, // Assuming the token is a bearer token
                },
              }
            );
            if (myCart) {
              
              setCartItem(myCart.data.cartItems);
              setTotalPrice(myCart.data.totalprice);
              // console.log(myCart.data.totalprice);
              // console.log(TotalPrice);
              
            }
           
          }
        } catch (error) {
          console.log("Error fetching user:", error);
        }
      }
    };
    getProduct();
  }, [itemId, cart]);

  if (!item) {
    return <div>Item not found.</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ToastContainer />

        {/* {orderDetails ? (
          <PaymentComponent orderDetails={orderDetails} selectedItem={item} />
        ) : ( */}
        <>
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
              {/* {item && (
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
              )} */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gray-900 rounded-lg p-8 shadow-2xl"
              >
                <h2 className="text-2xl font-bold mb-4">Item Details</h2>

                {itemId && (
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
                )}

                {cartItem &&
                  cartItem.map((item) => (
                    <>
                      <div className="flex items-center mb-4">
                        {item.productDetails.images && (
                          <>
                            <img
                              src={item.productDetails.images[0]}
                              alt={item.name}
                              className="w-32 h-32 object-cover mr-4"
                            />
                          </>
                        )}

                        <div>
                          <h3 className="text-xl font-bold">
                            {item.productDetails.title}
                          </h3>
                          {discountPercentage > 0 ? (
                            <div>
                              <p className="text-lg text-gray-500 line-through">
                                ₹{item.productDetails.price}
                              </p>

                              <p className="text-lg text-green-500">
                                ₹{discountedPrice.toFixed(2)}
                              </p>
                            </div>
                          ) : (
                            <>
                              <p className="text-lg">
                                ₹{item.productDetails.price}
                              </p>
                              <p className="text-lg">{item.size}</p>
                              <p className="text-lg">{item.quantity}</p>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="bg-gray-900 rounded-lg p-8 shadow-2xl"
              >
                <h2 className="text-2xl font-bold mb-4">Billing Information</h2>
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
                      />
                      <label
                        htmlFor="razorpay"
                        className="text-lg text-gray-400 relative"
                      >
                        UPI
                        {/* <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          UPI
                        </span> */}
                      </label>
                    </div>
                  </div>
                  <div className="mb-4">
                    <p className="text-xl font-bold">
                      Total Price: ₹ {TotalPrice}
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
        </>
      </div>
    </div>
  );
};

export default CheckoutPage;
