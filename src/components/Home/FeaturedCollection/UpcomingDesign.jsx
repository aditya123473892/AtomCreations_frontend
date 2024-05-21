import React from "react";
import UpcomingSlider from "./UpcomingSlider";
const UpcomingDesign = () => {
  return (
    <section className="gap-10 text-black bg-custom-bg-color">
      <h1 className="py-6 px-4 md:py-12 text-4xl md:text-5xl text-start sans-regular font-normal text">
        Upcoming Designs
      </h1>

      <UpcomingSlider />
    </section>
  );
};
export default UpcomingDesign;
