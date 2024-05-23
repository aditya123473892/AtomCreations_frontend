import React from 'react';
// import bg from './assets/login.webp';
// import { images } from "./constants/bg_signup";
import { images } from './components/constants/imagesData';
const Background = () => {
  return (
    <div
      className="fixed inset-0 bg-cover bg-center z-[-1]"
      style={{ backgroundImage: `url(${images.bg_signup})`}}
    ></div>
  );
};

export default Background; 