import React from "react";
import CollectionSlider from "./CollectionSlider";
const Collections = () => {
  return (
    <section className="gap-10 text-black bg-custom-bg-color">
      <h1 className="py-6 px-4 md:p-12 text-4xl md:text-5xl text-start sans-regular text">Featured Collection</h1>
      <CollectionSlider/>

    
    </section>
  );
};

export default Collections;

