import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./ContextProvider/AuthContext";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
axios.defaults.withCredentials = true;

const ProductCard = ({ product, id }) => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  const [isAdded, setIsAdded] = useState(false);
  const { logindata } = useContext(AuthContext);

  const handleClick = () => {
    navigate(`/product/?id=${product._id}`);
    // /verify-otp?email=${email}
  };

  const handleAddToCart = async (event) => {
   
    event.stopPropagation();
    if (!logindata) {
      toast.warning("Please login to add items to the cart", {
        position: "top-center",
      });
    } else {
      const token = localStorage.getItem("token");
      
      try {
        const res = await axios.post(
          "http://atom-creations-backend.vercel.app/api/appuser/addtocart",
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
          setIsAdded(true);
          setTimeout(() => {
            setIsAdded(false);
          }, 1500);
        }
        // setLoginData(res.data)
      } catch (error) {
        console.log(error);
      }
    }

    // const cartItem = {
    //   id: product._id,
    //   title: product.title,
    //   price: product.price,
    //   image: product.images[0],
    //   quantity: 1,
    // };
    // addToCart(cartItem);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
      onClick={handleClick}
    >
      <ToastContainer />
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative pt-[100%]">
          <img
            src={product.images[0]}
            alt={product.title}
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
          <p className="text-gray-600 mb-2">Category: {product.category}</p>
          <p className="text-gray-900 font-bold mb-4">
            Price: ₹{product.price.toLocaleString("en-IN")}
          </p>
          {/* <button
            className={`w-full px-4 py-2 text-white font-semibold rounded-lg focus:outline-none ${
              isAdded ? "bg-black" : "bg-black hover:bg-gray-800"
            }`}
            onClick={handleAddToCart}
          >
            {isAdded ? (
              <span className="flex items-center justify-center">
                <FaCheck className="mr-2" />
                Added
              </span>
            ) : (
              "Add to Cart"
            )}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
