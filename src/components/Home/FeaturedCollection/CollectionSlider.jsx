import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CollectionSlider = () => {
  const [products, setProducts] = useState([]);
  const [imageHeight, setImageHeight] = useState({
    mobile: 300,
    desktop: 480,
  });
  const [hoverIndex, setHoverIndex] = useState(null); // Add a new state for hover index

  const handleMouseEnter = (itemIndex) => {
    setHoverIndex(itemIndex); // Set the hover index when mouse enters
  };

  const handleMouseLeave = () => {
    setHoverIndex(null); // Reset the hover index when mouse leaves
  };
  const navigate = useNavigate();

  const handleBuyNowClick = (item) => {
    navigate(`/product?id=${item._id}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "https://atom-creations-backend.vercel.app/api/products/",
          {
            params: {
              type: "featured",
            },
          }
        );

        setProducts(() => res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col relative pb-2 px-4">
      <Swiper
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        freeMode={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, FreeMode, Navigation]}
        className="max-w-full"
      >
        {products.map((item, itemIndex) => (
          <SwiperSlide key={item.title}>
            <div className="relative bg-transparent overflow-hidden font-base">
              <div
                className="aspect-w-1 aspect-h-1 bg-[#E5E1DA] rounded-[20px]  overflow-hidden cursor-pointer"
                onMouseEnter={() => handleMouseEnter(itemIndex)} // Call handleMouseEnter with itemIndex
                onMouseLeave={handleMouseLeave} // Call handleMouseLeave
                onClick={() => handleBuyNowClick(item)}
              >
                <img
                  className="w-full object-cover object-center transition duration-500 ease-in-out transform"
                  src={
                    hoverIndex === itemIndex && item.images.length > 1
                      ? item.images[(itemIndex + 1) % item.images.length] // Show next image if hovering
                      : item.images[0] // Show first image if not hovering
                  }
                  alt={item.title}
                  style={{
                    height: `${
                      window.innerWidth < 768
                        ? imageHeight.mobile
                        : imageHeight.desktop
                    }px`,
                    width: "100%",
                  }}
                />
              </div>
              <div className="px-4 py-3">
                <h3
                  className="text-xs font-semibold text-gray-400 mb-2 cursor-pointer"
                  onClick={() => handleBuyNowClick(item)}
                >
                  LATEST COLLECTION, OVERSIZED T-SHIRT
                </h3>
                <h3
                  className="text-s font-Roboto font-semibold text-gray-800 mb-4 cursor-pointer"
                  onClick={() => handleBuyNowClick(item)}
                >
                  {item.title}
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xl font-bold text-gray-700 mr-2">
                      ₹{item.price}
                    </span>
                    <span className="text-sm font-semibold text-gray-500 line-through">
                      ₹1099
                    </span>
                  </div>
                  <div className="flex items-center">
                    <button
                      className="px-6 py-2 bg-black text-white text-sm border border-[#e5e1da] rounded-[50px] hover:bg-[#e5e1da] hover:text-black transition duration-300 mr-2"
                      onClick={() => handleBuyNowClick(item)}
                    >
                      Buy Now
                    </button>
                    <button
                      className="p-2 bg-transparent text-gray-800 text-lg transition duration-300 focus:outline-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.currentTarget.classList.toggle("text-black");
                      }}
                    >
                      <FaHeart />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CollectionSlider;
