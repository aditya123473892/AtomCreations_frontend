import React from 'react';
// import bg from './assets/login.webp';
// import { images } from "./constants/bg_signup";
import { images } from './components/constants/bg_signup';
const Background = () => {
  return (
    <div
      className="fixed inset-0 bg-cover bg-center z-[-1]"
      style={{ backgroundImage: `url(${images.bg_signup})` ,  backgroundSize: '150%',}}
    ></div>
  );
};

export default Background; 