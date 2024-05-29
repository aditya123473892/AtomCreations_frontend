import React from 'react';
import leftImage from '../../../assets/passion_1.jpg';
import rightImage from '../../../assets/p2.jpg';

const ExploreYourPassion = () => {
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Explore Your Passion</h2>
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src={leftImage}
              alt="Left Image"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="w-full md:w-1/2 px-4 mb-8">
            <img
              src={rightImage}
              alt="Right Image"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreYourPassion;