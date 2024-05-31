import React from "react";
import seamlessImage from "../../assets/feature13.jpg";
import imprintsImage from "../../assets/passion_1.jpg";
import frenchTerryImage from "../../assets/p2.jpg";

const FeaturedProducts = () => {
  return (
    <section className="flex items-center justify-center w-full overflow-hidden p-2">
      <div className="flex flex-col md:flex-row w-full">
        {/* Show imprints image */}
        <div className="relative w-full h-64 md:h-[80vh] flex items-end justify-end mr-1 mb-2 md:mb-0">
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-center rounded-[20px]"
            style={{ backgroundImage: `url(${imprintsImage})` }}
          />
          <h2 className="absolute inset-0 flex font-bold items-center justify-center font-heading text-4xl md:text-7xl text-[#fbf9f1]">
            Imprints
          </h2>
        </div>

        {/* Show French Terry image */}
        <div className="relative w-full h-64 md:h-[80vh] flex items-end justify-end ml-1">
          <div
            className="absolute top-0 right-0 w-full h-full bg-cover bg-center rounded-[20px]"
            style={{ backgroundImage: `url(${frenchTerryImage})` }}
          />
          <h2 className="absolute inset-0 flex font-bold items-center justify-center font-heading text-4xl md:text-7xl text-[#fbf9f1]">
            French Terry
          </h2>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
