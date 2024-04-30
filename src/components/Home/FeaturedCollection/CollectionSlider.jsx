// CollectionSlider.js
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { collectionData } from "../../constants/HomeCollectionData";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { FaArrowRight, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CollectionSlider = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleBuyNowClick = (item) => {
    navigate(`/product?id=${item._id}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/products/");
        console.log(res.data);
        setProducts(() => res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col relative mb-12">
      <Swiper
        breakpoints={{
          500: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          900: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        freeMode={true}
        navigation={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, FreeMode, Navigation]}
        className="max-w-[90%] lg:max-w-[90%]"
      >
        {products.map((item) => (
          <SwiperSlide key={item.title}>
            <div className="relative bg-white shadow-md rounded-lg overflow-hidden">
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  className="w-full h-full object-cover transition duration-500 ease-in-out transform hover:scale-110"
                  src={item.images[0]}
                  alt={item.title}
                />
                <button className="absolute top-4 right-4 p-2 bg-white bg-opacity-50 rounded-full hover:bg-opacity-100 transition duration-300">
                  <FaHeart className="text-red-500 text-lg" />
                </button>
              </div>
              <div className="px-4 py-3">
                <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                <div className="flex items-center justify-between mt-2">
                  <p className="text-xl font-bold text-gray-900">₹{item.price}</p>
                  <button
                    className="px-4 py-2 bg-gray-800 text-white text-sm font-semibold rounded-md hover:bg-gray-700 transition duration-300"
                    onClick={() => handleBuyNowClick(item)}
                  >
                    Buy Now
                  </button>
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