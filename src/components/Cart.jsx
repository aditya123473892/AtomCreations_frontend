import React, { useContext, useState, useEffect } from "react";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [TotalPrice, setTotalPrice] = useState("");

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.productDetails.price * item.quantity,
      0
    );
  };

  const removeFromCart = async (id, size) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      "http://localhost:8080/api/appuser/removefromcart",
      {
        productId: id,
        size: size,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      setCartItems(cartItems.filter((item) => item.productId !== id));
      toast.success("Item removed from cart.");
    }
  };

  const clearCart = async () => {
    const YOUR_TOKEN = localStorage.getItem("token");
    const res = await fetch("http://localhost:8080/api/appuser/emptycart", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${YOUR_TOKEN}`,
      },
    });
    setCartItems([]);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = 5.0;
    return subtotal + shipping;
  };

  const handleCheckout = () => {
    if (cartItems.length > 0) {
      navigate(`/checkout?cart=${true}`);
    } else {
      toast.warning("Your cart is empty. Please add items to proceed to checkout.");
    }
  };

  const incrementQuantity = async (id, size) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      "http://localhost:8080/api/appuser/incquantity",
      {
        productId: id,
        size: size,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    window.location.reload();
  };

  const decrementQuantity = async (id, size) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      "http://localhost:8080/api/appuser/decquantity",
      {
        productId: id,
        size: size,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    window.location.reload();
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const YOUR_TOKEN = localStorage.getItem("token");
        if (YOUR_TOKEN) {
          const myCart = await axios.get(
            "http://localhost:8080/api/appuser/getcartitem",
            {
              headers: {
                Authorization: `Bearer ${YOUR_TOKEN}`,
              },
            }
          );
          if (myCart) {
            setCartItems(myCart.data.cartItems);
            setTotalPrice(myCart.data.totalprice);
          }
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };
    fetchCartItems();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold text-center mb-8 text-white">
    My Cart
</h1>


        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-gray-800 rounded-lg p-6 mb-8 shadow-2xl">
              {cartItems.length === 0 ? (
                <p className="text-gray-400 text-center">Your cart is empty.</p>
              ) : (
                cartItems.map((item, index) => (
                  <div key={index} className="flex items-center mb-8">
                    <img
                      src={item.productDetails.images[0]}
                      alt={item.productDetails.title}
                      className="w-48 h-48 object-cover rounded-lg shadow-lg mr-6 transition duration-300 ease-in-out transform hover:scale-105"
                    />
                    <div>
                      <h2 className="text-2xl font-semibold text-indigo-400">
                        {item.productDetails.title}
                      </h2>
                      <p className="text-gray-400 mb-2">
                        Price: ₹{item.productDetails.price}
                      </p>
                      <p className="text-gray-400 mb-4">Size: {item.size}</p>
                      <div className="flex items-center mb-4">
                        <button
                          className="text-gray-400 hover:text-gray-200 focus:outline-none mr-2"
                          onClick={() => decrementQuantity(item.productId, item.size)}
                        >
                          <FaMinus className="w-5 h-5" />
                        </button>
                        <span className="mx-2 text-xl">{item.quantity}</span>
                        <button
                          className="text-gray-400 hover:text-gray-200 focus:outline-none ml-2"
                          onClick={() => incrementQuantity(item.productId, item.size)}
                        >
                          <FaPlus className="w-5 h-5" />
                        </button>
                      </div>
                      <button
                        className="text-red-600 hover:text-red-800 focus:outline-none"
                        onClick={() => removeFromCart(item.productId, item.size)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="bg-gray-800 rounded-lg p-6 sticky top-8 shadow-2xl">
              <h2 className="text-2xl font-semibold mb-4 text-indigo-400">
                Order Summary
              </h2>
              <div className="flex justify-between font-semibold text-xl mt-4">
                <p>Total:</p>
                <p>₹{TotalPrice}</p>
              </div>
              <button
                className="bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-lg py-3 px-6 mt-6 w-full focus:outline-none hover:from-indigo-700 hover:to-pink-700 transition duration-200 shadow-lg"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              <button
                className="flex items-center justify-center bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg py-3 px-6 mt-4 w-full hover:from-red-700 hover:to-pink-700 focus:outline-none transition duration-200 shadow-lg"
                onClick={clearCart}
              >
                <FaTrash className="mr-2 w-4 h-4" /> Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </div>
  );
};

export default Cart;