import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  FaStar,
  FaHeart,
  FaShoppingCart,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { CartContext } from "./CartContext";
import LoadingSpinner from "./LoadingSpinner";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./ContextProvider/AuthContext";

const ProductDetails = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const [isAdded, setIsAdded] = useState(false);
  const { logindata } = useContext(AuthContext);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        const getMyProduct = await axios.get(
          `https://atom-creations-backend.vercel.app/api/products/${id}`
        );
        setProduct(getMyProduct.data);
        setSelectedColor(getMyProduct.data.color[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
      setIsLoading(false);
    };

    fetchProduct();
  }, [id]);

  if (isLoading || !product) {
    return <LoadingSpinner />;
  }

  const {
    title,
    producer,
    type,
    price,
    images,
    size,
    color,
    rating,
    reviews,
    description,
  } = product;

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleFavoriteClick = async () => {
    const token = localStorage.getItem("token");
    if (!logindata) {
      toast.warning("Please login to add items to the wishlist", {
        position: "top-center",
      });
    } else {
      try {
        await axios.post(
          "https://atom-creations-backend.vercel.app/api/appuser/addToWishList",
          {
            productId: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsFavorite(!isFavorite);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleAddToCart = async (event) => {
    event.stopPropagation();
    if (!logindata) {
      toast.warning("Please login to add items to the cart", {
        position: "top-center",
      });
    } else if (!selectedSize) {
      toast.warning("Please select size", {
        position: "top-center",
      });
    } else {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.post(
          "https://atom-creations-backend.vercel.app/api/appuser/addtocart",
          {
            productId: id,
            size: selectedSize,
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
        } else {
          setIsAdded(true);
          setTimeout(() => {
            setIsAdded(false);
          }, 1500);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleBuyNow = () => {
    if (!logindata) {
      toast.warning("Please login to proceed with the purchase", {
        position: "top-center",
      });
    } else if (!selectedSize) {
      toast.warning("Please select a size", {
        position: "top-center",
      });
    } else {
      navigate(`/checkout/?id=${id}&size=${selectedSize}`);
    }
  };

  const formatKey = (key) => {
    return key
      .split(/(?=[A-Z])/)
      .join(" ")
      .replace(/^\w/, (c) => c.toUpperCase());
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-[#fbf9f1]"
    >
      <div className="max-w-7xl mx-auto font-base px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row">
          <ToastContainer />
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/2 mb-8 md:mb-0 flex"
          >
            <div className="sticky top-28 flex">
              <div className="h-[530px] overflow-y-auto pr-2 mr-4">
                <div className="flex flex-col gap-2">
                  {images.map((image, index) => (
                    <motion.img
                      key={index}
                      src={image}
                      alt={`${title} ${index + 1}`}
                      className={`w-20 h-20 md:w-24 md:h-24 object-cover rounded-[10px] shadow-md cursor-pointer ${
                        index === currentImageIndex
                          ? "border-2 border-[#e5e1da]"
                          : ""
                      }`}
                      onClick={() => setCurrentImageIndex(index)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="image-container w-[400px] h-[500px] relative bg-gray-200 rounded-[20px] overflow-hidden flex items-center justify-center">
              <button
                className={`absolute top-4 right-4 z-10 text-white hover:text-red-500 focus:outline-none ${
                  isFavorite ? "text-red-500" : ""
                }`}
                onClick={handleFavoriteClick}
              >
                <FaHeart size={24} />
              </button>
              <div className="aspect-w-4 aspect-h-3 w-full">
                <img
                  src={images[currentImageIndex]}
                  alt={title}
                  className="object-cover w-full h-full rounded-[20px] shadow-lg bg-[#e5e1da]"
                />
              </div>
              <div
                className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 bg-[#fbf9f1] rounded-full cursor-pointer hover:bg-[#e5e1da] transition-colors duration-300"
                onClick={handlePrevImage}
              >
                <FaChevronLeft className="text-black" size={18} />
              </div>
              <div
                className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 bg-[#fbf9f1] rounded-full cursor-pointer hover:bg-[#e5e1da] transition-colors duration-300"
                onClick={handleNextImage}
              >
                <FaChevronRight className="text-black" size={18} />
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/2 md:pl-8"
          >
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-3xl md:text-5xl capitalize font-semibold mb-2 mt-12"
            >
              {title}
            </motion.h2>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-gray-600 text-lg md:text-xl mb-4"
            >
              {producer}
            </motion.p>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center mb-6"
            >
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FaStar
                    key={index}
                    className={`mr-1 ${
                      index < rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600 ml-2">{reviews} reviews</span>
            </motion.div>
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-gray-900 font-bold text-2xl md:text-4xl mb-6"
            >
              ₹{price}
            </motion.p>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mb-6"
            >
              <p className="text-gray-600 mb-2">Select Size:</p>
              <div className="flex flex-wrap">
                {size.map((size) => (
                  <motion.button
                    key={size}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    className={`px-4 py-2 mr-2 mb-2 bg-[#e5e1da] text-black rounded-full font-semibold ${
                      selectedSize === size
                        ? "text-white bg-black"
                        : "text-black hover:bg-black hover:text-white"
                    }`}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size}
                  </motion.button>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
              className="mb-8"
            >
              <p className="text-gray-600 mb-2">Select Color:</p>
              <div className="flex items-center">
                {color.map((color) => (
                  <motion.div
                    key={color}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-8 h-8 rounded-full mr-2 cursor-pointer border-2 ${
                      selectedColor === color
                        ? "border-black"
                        : "border-[#e5e1da]"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorClick(color)}
                  ></motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="flex items-center mb-8"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center bg-[#e5e1da] text-black px-6 py-3 rounded-full font-semibold hover:bg-black hover:text-white mr-4 focus:outline-none"
                onClick={handleAddToCart}
              >
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center bg-[#e5e1da] text-black px-10 py-3 rounded-full font-semibold hover:bg-black hover:text-white focus:outline-none"
                onClick={handleBuyNow}
              >
                Buy Now
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <h3 className="text-3xl font-semibold mb-2">Product Details</h3>
              <ul className="list-none text-lg md:text-xl pl-4">
                {Object.entries(description).map(([key, value]) => (
                  <li
                    className="pl-2 pt-3 pb-2 border-b-2 border-[#e5e1da]"
                    key={key}
                  >
                    {`${formatKey(key)}: ${value}`}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
