import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <div className="w-full h-96 bg-gray-300 rounded-lg shadow-lg animate-pulse"></div>
        </div>
        <div className="md:w-1/2 md:pl-8">
          <div className="w-48 h-8 bg-gray-300 rounded-full animate-pulse mb-4"></div>
          <div className="w-32 h-4 bg-gray-300 rounded-full animate-pulse mb-4"></div>
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="w-4 h-4 bg-gray-300 rounded-full mr-1 animate-pulse"></div>
            ))}
            <div className="w-20 h-4 bg-gray-300 rounded-full animate-pulse ml-2"></div>
          </div>
          <div className="w-32 h-8 bg-gray-300 rounded-full animate-pulse mb-6"></div>
          <div className="mb-6">
            <div className="w-20 h-4 bg-gray-300 rounded-full animate-pulse mb-2"></div>
            <div className="flex flex-wrap">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="w-16 h-8 bg-gray-300 rounded-full mr-2 mb-2 animate-pulse"></div>
              ))}
            </div>
          </div>
          <div className="mb-8">
            <div className="w-20 h-4 bg-gray-300 rounded-full animate-pulse mb-2"></div>
            <div className="flex items-center">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="w-8 h-8 bg-gray-300 rounded-full mr-2 animate-pulse"></div>
              ))}
            </div>
          </div>
          <div className="w-40 h-12 bg-gray-300 rounded-lg animate-pulse mb-8"></div>
          <div>
            <div className="w-32 h-6 bg-gray-300 rounded-full animate-pulse mb-2"></div>
            <div className="w-48 h-4 bg-gray-300 rounded-full animate-pulse mb-2"></div>
            <div className="w-48 h-4 bg-gray-300 rounded-full animate-pulse mb-2"></div>
            <div className="w-48 h-4 bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default LoadingSpinner;