// FeaturedProducts.jsx
import React, { useState, useEffect } from 'react';
import seamlessImage1 from "../../assets/feature1.webp";
import seamlessImage2 from "../../assets/feature1.webp";
import seamlessImage3 from "../../assets/feature13.jpg";
import imprintsImage1 from "../../assets/feature.webp";
import imprintsImage2 from "../../assets/feature21.webp";
import imprintsImage3 from "../../assets/feature22.webp";
import frenchTerryImage1 from "../../assets/feature3.webp";
import frenchTerryImage2 from "../../assets/feature31.webp";
import frenchTerryImage3 from "../../assets/feature6.webp";
import frenchTerryImage4 from "../../assets/feature33.jpg";
import frenchTerryImage5 from "../../assets/feature34.webp";
import { FaArrowRight } from "react-icons/fa";

const FeaturedProducts = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 5);
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const seamlessImages = [seamlessImage1, seamlessImage1, seamlessImage2,seamlessImage3,seamlessImage3];
  const imprintsImages = [imprintsImage1, imprintsImage2, imprintsImage3,imprintsImage3,imprintsImage2];
  const frenchTerryImages = [frenchTerryImage1, frenchTerryImage2, frenchTerryImage3, frenchTerryImage4,frenchTerryImage5];

  return (
    <section className="flex items-center justify-center w-full overflow-hidden">
      <div className="flex flex-col md:flex-row w-full">
        <div className="w-full md:w-6/12 m-0 p-0">
          {/* Show seamless images */}
          <div className="relative h-[50vh] md:h-[60vh] w-full flex items-end justify-end">
            {seamlessImages.map((image, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ backgroundImage: `url(${image})` }}
              />
            ))}
            {/* 
<button className="pl-8 mr-8 mb-8 z-10 text-black text-xl md:text-3xl font-base bg-white rounded-full hover:scale-[1.05] transition duration-300 animate-slide-up flex items-center">
  Know more
  <div className="h-8 w-8 md:h-10 md:w-10 bg-black text-white m-1 ml-4 md:ml-6 rounded-full flex justify-center items-center rotate-[-45deg] hover:rotate-0 transition duration-75">
    <FaArrowRight className="text-lg md:text-2xl" />
  </div>
</button> 
*/}

            <h2 className=" absolute h-full w-full flex items-center justify-center font-heading text-4xl md:text-7xl text-white">
              Seamless
            </h2>
          </div>

          {/* Show imprints images */}
          <div className="relative h-[50vh] md:h-[80vh] w-full flex items-end justify-end">
            {imprintsImages.map((image, index) => (
              <div
                key={index}
                className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ backgroundImage: `url(${image})` }}
              />
            ))}
            {/* 
<button className="pl-8 mr-8 mb-8 z-10 text-black text-xl md:text-3xl font-base bg-white rounded-full hover:scale-[1.05] transition duration-300 animate-slide-up flex items-center">
  Know more
  <div className="h-8 w-8 md:h-10 md:w-10 bg-black text-white m-1 ml-4 md:ml-6 rounded-full flex justify-center items-center rotate-[-45deg] hover:rotate-0 transition duration-75">
    <FaArrowRight className="text-lg md:text-2xl" />
  </div>
</button> 
*/}

            <h2 className=" absolute h-full w-full flex items-center justify-center font-heading text-4xl md:text-7xl text-white">
              Imprints
            </h2>
          </div>
        </div>

        {/* Show French Terry images */}
        <div className="relative w-full md:w-6/12 h-[50vh] md:h-auto flex items-end justify-end">
          {frenchTerryImages.map((image, index) => (
            <div
              key={index}
              className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
        {/* 
<button className="pl-8 mr-8 mb-8 z-10 text-black text-xl md:text-3xl font-base bg-white rounded-full hover:scale-[1.05] transition duration-300 animate-slide-up flex items-center">
  Know more
  <div className="h-8 w-8 md:h-10 md:w-10 bg-black text-white m-1 ml-4 md:ml-6 rounded-full flex justify-center items-center rotate-[-45deg] hover:rotate-0 transition duration-75">
    <FaArrowRight className="text-lg md:text-2xl" />
  </div>
</button> 
*/}

          <h2 className=" absolute h-full w-full flex items-center justify-center font-heading text-4xl md:text-7xl text-white">
            French Terry
          </h2>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;