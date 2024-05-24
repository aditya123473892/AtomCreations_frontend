import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { collectionData } from "../../constants/UpcomingDesigndata";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { Autoplay, FreeMode, Navigation } from "swiper/modules";
import { FaArrowRight } from "react-icons/fa";

const CollectionSlider = () => {
  return (
    <div className="flex flex-col relative mb-24 px-4">
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
        {collectionData.map((item) => (
          <SwiperSlide key={item.title}>
            <div className="flex aspect-[3/4] gap-8 mb-20 justify-center text-white overflow-hidden cursor-pointer group relative">
              <img
                className="h-full w-full ease-in-out duration-500 group-hover:scale-110"
                src={item.image}
                alt={item.title}
              />
              <div className="absolute h-full w-full flex items-start justify-end">
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-75 bg-black bg-opacity-20">
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CollectionSlider;