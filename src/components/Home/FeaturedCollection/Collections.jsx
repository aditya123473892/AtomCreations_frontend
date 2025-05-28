import React from "react";
import CollectionSlider from "./CollectionSlider";
const Collections = () => {
  return (
    <section className="gap-10 text-black">
      <h1 className="py-12 text-5xl md:text-6xl text-center font-Roboto text">Featured Designs</h1>
      <CollectionSlider/>
      {/* <h1 className="py-12 text-5xl md:text-8xl text-center font-base">Explore your passion</h1> */}
    
    </section>
  );
};

export default Collections;

