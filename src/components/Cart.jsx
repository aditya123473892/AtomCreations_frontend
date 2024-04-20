import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./CartContext";
import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  // const { cartItems, removeFromCart, clearCart, updateQuantity } =
  //     useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const [TotalPrice, setTotalPrice] = useState("");
  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const removeFromCart = async (id) => {
    const token = localStorage.getItem("token");
    console.log(id);
    const res = await axios.put(
      "http://localhost:8080/api/appuser/removefromcart",
      {
        productId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.status === 200) {
      setCartItems(cartItems.filter((item) => item.productId._id !== id));
      toast.success("Item removed from cart.");
      console.log(cartItems);
    }
    console.log(res);
    // window.location.reload();
  };
  const clearCart = async () => {
    const YOUR_TOKEN = localStorage.getItem("token");


    // const response = await axios.post(
    //     "http://localhost:8080/api/appuser/emptycart",
    //     {
    //         headers: {
    //             Authorization: `Bearer ${YOUR_TOKEN}`,
    //         },
    //     }
    // );
    const res = await fetch("http://localhost:8080/api/appuser/emptycart", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${YOUR_TOKEN}`,
      },
    });

    console.log(res);
    setCartItems([]);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const shipping = 5.0;
    return subtotal + shipping;
  };

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, quantity);
    }
  };

  const incrementQuantity = async (id) => {
    const token = localStorage.getItem("token");

    // const res = await fetch("http://localhost:8080/api/appuser/incquantity", {
    //   method: "PUT",
    //   headers: {
    //     Authorization: `Bearer ${YOUR_TOKEN}`,
    //   },
    // });

    const res = await axios.put(
      "http://localhost:8080/api/appuser/incquantity",
      {
        productId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    // setCartItems(()=>cartItems)
    console.log(cartItems);
    window.location.reload();
  };

  const decrementQuantity = async (id) => {
    const token = localStorage.getItem("token");

    // const res = await fetch("http://localhost:8080/api/appuser/decquantity", {
    //   method: "PUT",
    //   headers: {
    //     Authorization: `Bearer ${YOUR_TOKEN}`,
    //   },
    // });

    const res = await axios.put(
      "http://localhost:8080/api/appuser/decquantity",
      {
        productId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(res);
    window.location.reload();
  };

  useEffect(() => {
    // setLoginData("")
    const fetchCartItems = async () => {
      try {
        const YOUR_TOKEN = localStorage.getItem("token");
        if (YOUR_TOKEN) {
          const myCart = await axios.get(
            "http://localhost:8080/api/appuser/getcartitem",
            {
              headers: {
                Authorization: `Bearer ${YOUR_TOKEN}`, // Assuming the token is a bearer token
              },
            }
          );
          if (myCart) {
            console.log("Cart USER: ", myCart);
            setCartItems(myCart.data.cartItems);
            setTotalPrice(myCart.data.totalprice);
            console.log(myCart.data.totalprice);
            console.log(TotalPrice);
            console.log(myCart.data.cartItems);
          }
          console.log("CART ITEMS: ", cartItems);
        }
      } catch (error) {
        console.log("Error fetching user:", error);
      }
    };
    fetchCartItems();
  }, []);

  // useEffect(() => {
  //     // setLoginData("")
  //     const fetchCartItems2 = async () => {
  //         try {
  //             const YOUR_TOKEN = localStorage.getItem("token");
  //             if (YOUR_TOKEN) {
  //                 const user = await axios.get(
  //                     "http://localhost:8080/api/user/fetchuser",
  //                     {
  //                         headers: {
  //                             Authorization: `Bearer ${YOUR_TOKEN}`, // Assuming the token is a bearer token
  //                         },
  //                     }
  //                 );
  //                 if (user) {
  //                     console.log("Cart USER: ", user);
  //                 }
  //             }
  //         } catch (error) {
  //             console.log("Error fetching user:", error);
  //         }
  //     };
  //     fetchCartItems2();
  // }, []);

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold text-center mb-8">My Cart</h1>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-gray-900 rounded-lg p-6 mb-8 shadow-2xl">
              {cartItems.length === 0 ? (
                <p className="text-gray-400 text-center">Your cart is empty.</p>
              ) : (
                cartItems.map((item, index) => (
                  <div key={index} className="flex items-center mb-8">
                    <img
                      src={item.productDetails.images[0]}
                      alt={item.name}
                      className="w-32 h-32 object-cover rounded-lg shadow-lg mr-6"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">
                        {item.productDetails.title}
                      </h2>
                      <p className="text-gray-400">
                        Price: ₹ {item.productDetails.price}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          className="text-gray-400 hover:text-gray-200 focus:outline-none"
                          // onClick={() =>
                          //     handleQuantityChange(
                          //         item.id,
                          //         item.quantity - 1
                          //     )
                          // }
                          onClick={() => decrementQuantity(item.productId._id)}
                        >
                          <FaMinus className="w-4 h-4" />
                        </button>
                        <span className="mx-2 text-lg">
                          {item.productId.quantity}
                        </span>
                        <button
                          className="text-gray-400 hover:text-gray-200 focus:outline-none"
                          // onClick={() =>
                          //     handleQuantityChange(
                          //         item.id,
                          //         item.quantity + 1
                          //     )
                          // }
                          onClick={() => incrementQuantity(item.productId._id)}
                        >
                          <FaPlus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        className="text-red-600 hover:text-red-800 mt-2 focus:outline-none"
                        onClick={() => removeFromCart(item.productId._id)}
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
            <div className="bg-gray-900 rounded-lg p-6 sticky top-8 shadow-2xl">
              <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
              {/* <div className="flex justify-between mb-2">
                <p className="text-lg">Subtotal:</p>
                <p className="text-lg">₹{TotalPrice}</p>
              </div> */}
              {/* <div className="flex justify-between mb-2">
                <p className="text-lg">Shipping:</p>
                <p className="text-lg">₹0.00</p>
              </div> */}
              <div className="flex justify-between font-semibold text-xl mt-4">
                <p>Total:</p>
                <p>₹{TotalPrice}</p>
              </div>
              <button className="bg-indigo-600 text-white rounded-lg py-3 px-6 mt-6 w-full focus:outline-none hover:bg-indigo-700 transition duration-200 shadow-lg">
                Proceed to Checkout
              </button>
              <button
                className="flex items-center justify-center bg-red-600 text-white rounded-lg py-3 px-6 mt-4 w-full hover:bg-red-700 focus:outline-none transition duration-200 shadow-lg"
                onClick={clearCart}
              >
                <FaTrash className="mr-2 w-4 h-4" /> Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
