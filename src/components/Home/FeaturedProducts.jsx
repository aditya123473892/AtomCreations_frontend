// FeaturedProducts.jsx
import React from 'react';
import seamlessImage from '../../assets/feature13.jpg';
import imprintsImage from '../../assets/passion_1.jpg';
import frenchTerryImage from '../../assets/p2.jpg';
import { images } from '../constants/imagesData';
const FeaturedProducts = () => {
  return (
    <section className="flex items-center justify-center w-full overflow-hidden">

<div className="flex flex-col gap-1 px-2 md:flex-row w-full">
  {/* Show imprints image */}
  <div className="relative w-full md:w-6/12 h-[50vh] sm:h-[60vh] md:h-[80vh] flex items-end justify-end">
    <div
      className="absolute top-0 left-0 rounded-2xl w-full h-full bg-cover bg-center"
      style={{ backgroundImage: `url(${ images.imprints_image})` }}
    />
    <h2 className="absolute inset-0 flex items-center justify-center font-heading text-4xl md:text-7xl text-white">
      Imprints
    </h2>
  </div>

  {/* Show French Terry image */}
  <div className="relative w-full md:w-6/12 h-[50vh] sm:h-[60vh] md:h-[80vh] flex items-end justify-end">
    <div
      className="absolute top-0 rounded-2xl right-0 w-full h-full bg-cover bg-center"
      style={{ backgroundImage: `url(${images.french_terry})` }}
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