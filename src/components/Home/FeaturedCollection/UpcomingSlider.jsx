import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { collectionData } from "../../constants/UpcomingDesigndata";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";

const UpcomingSlider = () => {
  return (
    <div className="flex flex-col relative">
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
        {collectionData.map((item) => (
          <SwiperSlide key={item.title}>
            <div className=" aspect-[1/1] md:aspect-[3/4] gap-8 rounded-3xl mb-20 justify-center text-white overflow-hidden cursor-pointer group relative">
              <img
                className="w-full h-full object-cover rounded-3xl ease-in-out duration-500 group-hover:scale-110"
                src={item.image}
                alt={item.title}
              />
              <div className="absolute h-full w-full flex items-start justify-end"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-75 bg-black bg-opacity-20"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default UpcomingSlider;
