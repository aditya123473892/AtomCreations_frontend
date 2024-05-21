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

const TypographySlider = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleBuyNowClick = (item) => {
    navigate(`/product?id=${item._id}`);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/products/", {
          params: {
            type: "typography",
          },
        });
        console.log(res.data);
        setProducts(() => res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col relative pb-6">
      <Swiper
        breakpoints={{
          500: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          800: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1000: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1440: {
            slidesPerView: 5,
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
        className="max-w-[92%] lg:max-w-[98%]"
      >
        {products.map((item) => (
          <SwiperSlide key={item.title}>
            <div className="relative bg-white shadow-md rounded-xl overflow-hidden">
              <div className=" overflow-hidden  aspect-[1/1] lg:aspect-[3/4] ">
                <img
                  className="w-full h-full rounded-xl object-cover transition duration-500 ease-in-out transform hover:scale-110"
                  src={item.images[0]}
                  alt={item.title}
                />
                <button className="absolute top-4 right-4 p-2 bg-opacity-50  hover:bg-opacity-100 transition duration-300">
                  <FaHeart className="text-red-500 text-lg" />
                </button>
              </div>
              <div className="px-4 py-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between mt-3.5">
                  <p className="text-xl font-bold text-gray-900">
                    ₹{item.price}
                  </p>
                  <button
                    className="px-6 py-[8px] border-[1px] border-gray-700 text-black text-sm font-semibold hover:bg-gray-400 transition duration-300 rounded-3xl"
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

export default TypographySlider;
