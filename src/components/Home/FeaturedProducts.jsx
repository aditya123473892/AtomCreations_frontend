// FeaturedProducts.jsx
import React from 'react';
import seamlessImage from '../../assets/feature13.jpg';
import imprintsImage from '../../assets/passion_1.jpg';
import frenchTerryImage from '../../assets/p2.jpg';

const FeaturedProducts = () => {
  return (
    <section className="flex items-center justify-center w-full overflow-hidden">

<div className="flex flex-col md:flex-row w-full">
  {/* Show imprints image */}
  <div className="relative w-full md:w-6/12 h-full md:h-[80vh] flex items-end justify-end">
    <div
      className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
      style={{ backgroundImage: `url(${imprintsImage})` }}
    />
    <h2 className="absolute inset-0 flex items-center justify-center font-heading text-4xl md:text-7xl text-white">
      Imprints
    </h2>
  </div>

  {/* Show French Terry image */}
  <div className="relative w-full md:w-6/12 h-full md:h-[80vh] flex items-end justify-end">
    <div
      className="absolute top-0 right-0 w-full h-full bg-cover bg-center"
      style={{ backgroundImage: `url(${frenchTerryImage})` }}
    />
    <h2 className="absolute inset-0 flex items-center justify-center font-heading text-4xl md:text-7xl text-white">
      French Terry
    </h2>
  </div>
</div>

    </section>
  );
};

export default FeaturedProducts;