import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./ContextProvider/AuthContext";
const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const { logindata } = useContext(AuthContext);

  const handleRemoveFromWishlist = async (id) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        "http://localhost:8080/api/appuser/removefromwishlist",
        {
          productId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     
      setWishlistItems((prevItems) =>
        prevItems.filter((item) => item.productDetails._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async (id) => {
    // Logic to add the item to the cart
    
    // event.stopPropagation();
    if (!logindata) {
      toast.warning("Please login to add items to the cart", {
        position: "top-center",
      });
    } else {
      const token = localStorage.getItem("token");
     
      try {
        const res = await axios.post(
          "http://localhost:8080/api/appuser/addtocart",
          {
            productId: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const message = res.data.message;
       
        if (message === "Product already exists in the cart") {
          toast.warning("Product already exists", {
            position: "top-center",
          });
          // alert(message);
        } else {
          
          toast.success("Product added to cart", {
            position: "top-center",
          });
          // setIsAdded(true);
          // setTimeout(() => {
          //   setIsAdded(false);
          // }, 1500);
        }
        // setLoginData(res.data)
      } catch (error) {
        console.log(error);
      }
    }
    
  };
  useEffect(() => {
    const fetchWishlist = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          "http://localhost:8080/api/appuser/getwishlist",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
       
        setWishlistItems(res.data.wishlistItems);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWishlist();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ToastContainer />
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-8">Wishlist</h2>
          {wishlistItems.length === 0 ? (
            <p className="text-gray-500">Your wishlist is empty.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlistItems &&
                wishlistItems.map((item) => (
                  <div
                    key={item.productDetails._id}
                    className="bg-white rounded-lg shadow-md p-4"
                  >
                    <div className="relative">
                      <img
                        src={item.productDetails.images[0]}
                        alt={item.productDetails.title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                      />
                      <button
                        onClick={() =>
                          handleRemoveFromWishlist(item.productDetails._id)
                        }
                        className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-100 transition duration-300"
                      >
                        <FaTrash className="text-red-500" />
                      </button>
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      {item.productDetails.title}
                    </h3>
                    <p className="text-gray-500 mb-4">
                      ${item.productDetails.price}
                    </p>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleAddToCart(item.productDetails._id)}
                        className="flex items-center bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-300"
                      >
                        <FaShoppingCart className="mr-2" />
                        Add to Cart
                      </button>
                      <button className="text-red-500 hover:text-red-600 transition duration-300">
                        <FaHeart />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
