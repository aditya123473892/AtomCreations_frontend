import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { getProductById } from "./api";
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
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "./ContextProvider/AuthContext";
const ProductDetails = () => {
  // const { id } = useParams();
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
    console.log(id);
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        // const data = await getProductById(id);
        const getMyProduct = await axios.get(
          `http://atom-creations-backend.vercel.app/api/products/${id}`
        );
        // console.log(getMyProduct.data);
        setProduct(() => getMyProduct.data);
       
        // console.log(getMyProduct.data);
        // console.log(getMyProduct.data.color);
        // setSelectedSize(getMyProduct.data.size[0]);
        setSelectedColor(getMyProduct.data.color[0]);
        // setSelectedSize("")
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
        const res = await axios.post(
          "http://atom-creations-backend.vercel.app/api/appuser/addToWishList",
          {
            productId: id,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        
      } catch (error) {
        console.log(error);
      }
      setIsFavorite(!isFavorite);
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

  // const handleAddToCart = () => {
  //   const cartItem = {
  //     id: product.id,
  //     title: product.title,
  //     price: product.price,
  //     image: product.images,
  //     size: selectedSize,
  //     color: selectedColor,
  //     quantity: 1,
  //   };
  //   addToCart(cartItem);
  // };
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
          "http://atom-creations-backend.vercel.app/api/appuser/addtocart",
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
      // navigate(`/checkout/${id}`);
      navigate(`/checkout/?id=${id}&size=${selectedSize}`);
    }
  };
  const formatKey = (key) => {
    // Split the key by uppercase letters and join with space
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
      className="bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row">
          <ToastContainer />
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`absolute top-4 right-4 z-10 text-gray-500 hover:text-red-500 focus:outline-none ${
                  isFavorite ? "text-red-500" : ""
                }`}
                onClick={handleFavoriteClick}
              >
                <FaHeart size={24} />
              </motion.button>
              <img
                src={images[currentImageIndex]}
                alt={title}
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                onClick={handlePrevImage}
              >
                <FaChevronLeft />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                onClick={handleNextImage}
              >
                <FaChevronRight />
              </motion.button>
            </div>
            <div className="flex mt-4">
              {images.map((image, index) => (
                <motion.img
                  key={index}
                  src={image}
                  alt={`${name} ${index + 1}`}
                  className={`w-16 h-16 object-cover rounded-lg shadow-md mr-2 cursor-pointer ${
                    index === currentImageIndex ? "border-2 border-black" : ""
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
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
              className="text-3xl font-semibold mb-2"
            >
              {title}
            </motion.h2>
            {/* <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-gray-500 mb-4"
            >
              {producer} - {type}
            </motion.p> */}
            {/* <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center mb-4"
            >
              {[...Array(5)].map((_, index) => (
                <FaStar
                  key={index}
                  className={`text-yellow-500 ${
                    index < rating ? "fill-current" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-gray-600">{reviews} reviews</span>
            </motion.div> */}
            <motion.p
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-gray-900 font-bold text-3xl mb-6"
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
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`px-4 py-2 mr-2 mb-2 rounded-full font-semibold ${
                      selectedSize === size
                        ? "bg-black text-white"
                        : "bg-gray-200 text-gray-800 hover:bg-gray-300"
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
                        : "border-gray-300"
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
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center bg-black text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 mr-4 focus:outline-none"
                onClick={handleAddToCart}
              >
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none"
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
              <h3 className="text-lg font-semibold mb-2">Product Details</h3>
              <ul className="list-disc pl-4">
                {/* <li>Material: 100% Cotton</li>
                <li>Fit Type: Regular Fit</li>
                <li>Care Instructions: Machine wash cold, tumble dry low</li>
                <li>Imported</li> */}

                {/* {Object.entries(description).map(([key, value]) => (
                  <li key={key}>{`${key}: ${value}`}</li>
                ))} */}
              </ul>

              <ul className="list-none pl-4">
                {Object.entries(description).map(([key, value]) => (
                  <li key={key}>{`${formatKey(key)} : ${value}`}</li>
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
