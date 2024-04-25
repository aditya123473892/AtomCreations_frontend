// CollectionSlider.js
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { collectionData } from "../../constants/HomeCollectionData";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";
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
    <div className="flex flex-col relative">
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
            <div className="flex aspect-[3/4] gap-8 mb-20 justify-center text-white overflow-hidden cursor-pointer group relative">
              <img
                className="h-full w-full ease-in-out duration-500 group-hover:scale-110"
                src={item.images[0]}
                alt={item.title}
              />
              <div className="absolute h-full w-full flex items-start justify-end">
                <div className="h-14 w-14 bg-white text-black m-4 rounded-full flex justify-center items-center rotate-[-45deg] hover:rotate-0 transition duration-75">
                  <FaArrowRight className="text-2xl" />
                </div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-75 bg-black bg-opacity-20">
                <button
                  className="px-6 py-2 text-white text-lg font-semibold font-base bg-transparent border border-white rounded-full hover:bg-white hover:text-black transition duration-75"
                  onClick={() => handleBuyNowClick(item)}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CollectionSlider;
