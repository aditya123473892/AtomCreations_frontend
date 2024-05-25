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
      "http://atom-creations-backend.vercel.app/api/appuser/removefromcart",
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
      window.location.reload();
      // setCartItems(cartItems.filter((item) => item.productId !== id));
      toast.success("Item removed from cart.");
    }
  };

  const clearCart = async () => {
    const YOUR_TOKEN = localStorage.getItem("token");
    const res = await fetch("http://atom-creations-backend.vercel.app/api/appuser/emptycart", {
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
      toast.warning(
        "Your cart is empty. Please add items to proceed to checkout."
      );
    }
  };

  const incrementQuantity = async (id, size) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      "http://atom-creations-backend.vercel.app/api/appuser/incquantity",
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
    // Update the state without reloading the page
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.productId === id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrementQuantity = async (id, size) => {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      "http://atom-creations-backend.vercel.app/api/appuser/decquantity",
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
    // Update the state without reloading the page
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.productId === id && item.size === size
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  useEffect(() => {
    const subtotal = calculateSubtotal();
    const totalPrice = subtotal;
    setTotalPrice(totalPrice);
  }, [cartItems]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const YOUR_TOKEN = localStorage.getItem("token");
        if (YOUR_TOKEN) {
          const myCart = await axios.get(
            "http://atom-creations-backend.vercel.app/api/appuser/getcartitem",
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
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-200 text-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-black">
          My Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg p-6 mb-8 shadow-2xl">
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
                      <h2 className="text-2xl font-semibold text-black-400">
                        {item.productDetails.title}
                      </h2>
                      <p className="text-black-400 mb-2">
                        Price: ₹{item.productDetails.price}
                      </p>
                      <p className="text-black-400 mb-4">Size: {item.size}</p>
                      <div className="flex items-center mb-4">
                        <button
                          className="text-black hover:text-dark-800    rounded-full px-3 py-1"
                          onClick={() =>
                            decrementQuantity(item.productId, item.size)
                          }
                        >
                          <FaMinus className="w-5 h-5" />
                        </button>
                        <span className="mx-2 text-xl">{item.quantity}</span>
                        <button
                          className="text-black hover:text-dark-800    rounded-full px-3 py-1"
                          onClick={() =>
                            incrementQuantity(item.productId, item.size)
                          }
                        >
                          <FaPlus className="w-5 h-5" />
                        </button>
                      </div>
                      <button
                        className="text-black-600 hover:text-black-800 focus:outline-black border border-black bg-white hover:bg-white-300 rounded-full px-4 py-2"
                        onClick={() =>
                          removeFromCart(item.productId, item.size)
                        }
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
            <div className="bg-white rounded-lg p-6 sticky top-8 shadow-2xl">
              <h2 className="text-2xl font-semibold mb-4 text-black">
                Order Summary
              </h2>
              <div className="flex justify-between font-semibold text-xl mt-4">
                <p>Total:</p>
                <p>₹{TotalPrice}</p>
              </div>
              <button
                className="bg-white-600 text-black rounded-full py-3 px-6 mt-6 w-full focus:outline-black border border-black shadow-lg"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              <button
                className="flex items-center justify-center bg-white-600 tbg-white-600 text-black rounded-full py-3 px-6 mt-6 w-full focus:outline-black border border-black shadow-lg"
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