import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import Offer1 from "../../assets/sale121.jpg"
import Offer2 from "../../assets/offers2.jpg"
import OfferMobile1 from "../../assets/offers-mobile.jpg"
import OfferMobile2 from "../../assets/offers2-mobile.png"

const OfferCarousel = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [offerImages, setOfferImages] = useState([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    setOfferImages(isMobile ? [OfferMobile2] : [Offer1]);
  }, [isMobile]);

  return (
    <div className="aspect-screen">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full"
      >
        {offerImages.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full relative p-2 rounded-[20px]">
              <img
                src={image}
                alt={`Offer ${index + 1}`}
                className="w-full h-full object-cover rounded-[20px]"
              />
              <div className="absolute inset-0 flex flex-col items-start justify-start m-20">
                <div className="">
                  <span className='text-white font-base text-8xl block'>FLAT</span>
                  <span className='text-white font-base font-bold text-9xl block'>30% OFF</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OfferCarousel;
