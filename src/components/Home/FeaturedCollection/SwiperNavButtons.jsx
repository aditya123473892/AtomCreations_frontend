import { useSwiper } from "swiper/react";
import React from "react";

const SwiperNavButtons = () => {
    const swiper = useSwiper();

  return (
    <div className="text-black">
      <button onClick={() => swiper.slidePrev()}>Prev</button>
      <button onClick={() => swiper.slideNext()}>Next</button>
    </div>
  );
};

export default SwiperNavButtons;
