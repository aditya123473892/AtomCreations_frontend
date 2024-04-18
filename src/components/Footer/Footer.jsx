import React from "react";
import ItemsContainer from "./ItemsContainer";
import feature1 from "../../assets/footerfeature1.svg";
import feature2 from "../../assets/footerfeature2.svg";
import feature3 from "../../assets/footerfeature3.svg";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 px-4 sm:px-8 md:px-12">
        <div className="flex flex-col items-center justify-center">
          <img src={feature1} alt="Feature 1" className="w-24 h-24 sm:w-32 sm:h-32 mb-4" />
          <h2 className="text-xl sm:text-2xl font-base text-center mb-2">
            Shipping within 48 hours
          </h2>
          <p className="text-sm sm:text-base text-center">
            Your order will be shipped within 48 hours from the time since order is placed
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img src={feature2} alt="Feature 2" className="w-24 h-24 sm:w-32 sm:h-32 mb-4" />
          <h2 className="text-xl sm:text-2xl font-base text-center mb-2">
            Free Delivery
          </h2>
          <p className="text-sm sm:text-base text-center">
            Free delivery on COD on orders above ₹ 1499
          </p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <img src={feature3} alt="Feature 3" className="w-24 h-24 sm:w-32 sm:h-32 mb-4" />
          <h2 className="text-xl sm:text-2xl font-base text-center mb-2">
            Shipping within 48 hours
          </h2>
          <p className="text-sm sm:text-base text-center">
            Your order will be shipped within 48 hours from the time since order is placed
          </p>
        </div>
      </div>
      <ItemsContainer />
      <div className="flex justify-center py-4 text-gray-400 text-sm">
        <span>© 2024 Appy. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;