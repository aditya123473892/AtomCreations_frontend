import React from "react";
import SolidsSlider from "./SolidsSlider";
// import CollectionSlider from "./CollectionSlider";
const Solids = () => {
  return (
    <section className="gap-10 text-black">
      <h1 className="py-12 text-5xl md:text-6xl text-center font-Roboto text">
        Solids Collection
      </h1>
      <SolidsSlider/>
      <h1 className="py-12 text-5xl md:text-8xl text-center font-base">Explore your passion</h1>

    </section>
  );
};

export default Solids;
