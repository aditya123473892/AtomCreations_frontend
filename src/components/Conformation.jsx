import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ConfirmationPage = ({ orderDetails, selectedItem }) => {
  const [formData, setFormData] = useState({
    couponCode: "",
  });
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("id");
  // setOrderId(()=>id);
  console.log(orderId);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [order, setOrder] = useState({});
  const [totalPrice, setTotalPrice] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleApplyCoupon = async () => {
    const { couponCode } = formData;
    // console.log(couponCode)
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
      console.log(res);
      setTotalPrice(res.data.paymentInfo.totalPrice);
      // setOrder(res.data)
    } catch (error) {
      console.log(error);
    }
    // const couponCodes = {
    //   ATOMS20: 20,
    // };

    const enteredCode = formData.couponCode.toUpperCase();
    if (couponCodes[enteredCode]) {
      setDiscountPercentage(couponCodes[enteredCode]);
    } else {
      setDiscountPercentage(0);
    }
  };
  const handleConfirmOrder = async () => {
    // e.preventDefault();
    try {
      const YOUR_TOKEN = localStorage.getItem("token");
      console.log(orderId);
      if (orderId) {
        const res = await axios.put(
          "http://localhost:8080/api/appuser/confirmOrder",
          {
            orderId: orderId,
          },
          {
            headers: {
              Authorization: `Bearer ${YOUR_TOKEN}`,
            },
          }
        );
        console.log(res);
        // alert("order placed");
        toast.success("Order Placed.");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const discountedPrice =
  //   orderDetails.totalPrice - (orderDetails.totalPrice * discountPercentage) / 100;
  // const shippingCharges = 0;
  // const finalPrice = discountedPrice + shippingCharges;

  useEffect(() => {
    // Fetch the latest order details from the server
    const fetchOrderDetails = async () => {
      // const { id } = orderId;

      try {
        console.log(orderId);
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:8080/api/appuser/getorder/${orderId}`,

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res);
        setOrder(res.data);
        console.log(res.data);
        setTotalPrice(res.data.paymentInfo.totalPrice);
        // Update the orderDetails state with the latest data
        // You can use the response data to update the orderDetails state
        // For example: setOrderDetails(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrderDetails();

    // fetchOrderDetails();
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
                order.orderItems.map((item) => (
                  <>
                    <div className="mb-4">
                      <h3 className="text-xl font-bold mb-2">Selected Item</h3>

                      <div className="flex items-center">
                        {/* <img
              src={selectedItem.images[0]}
              alt={selectedItem.title}
              className="w-32 h-32 object-cover mr-4"
            /> */}
                        <div>
                          <h4 className="text-lg font-bold">
                            {item.ProductsTitle}
                          </h4>
                          <p className="text-lg">
                            Price: ₹{item.ProductsPrice}
                          </p>
                          <p className="text-lg">Quantity: {item.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
              {/* <p className="text-lg">Order ID: {orderDetails._id}</p>
              {/* <p className="text-lg">Name: {orderDetails.name}</p> */}
              {/* <p className="text-lg">Email: {orderDetails.shippingInfo}</p> */}
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
        <ToastContainer position="top-center" autoClose={2000} />
      </motion.div>
    </>
  );
};

export default ConfirmationPage;
