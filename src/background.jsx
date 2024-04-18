import React from 'react';
import bg from './assets/login.jpg';

const Background = () => {
  return (
    <div
      className="fixed inset-0 bg-cover bg-center z-[-1]"
      style={{ backgroundImage: `url(${bg})` }}
    ></div>
  );
};

export default Background;