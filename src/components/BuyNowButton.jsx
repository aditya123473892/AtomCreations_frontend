// BuyNowButton.js
import React, { useState } from "react";
import BuyNowForm from "../components/BuyNowForm";

const BuyNowButton = ({ item }) => {
  const [showForm, setShowForm] = useState(false);

  const handleBuyNowClick = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <>
      <button
        className="px-6 py-2 text-white text-lg font-semibold bg-transparent border border-white rounded-full hover:bg-white hover:text-black transition duration-75"
        onClick={handleBuyNowClick}
      >
        Buy Now
      </button>
      {showForm && <BuyNowForm item={item} onClose={handleFormClose} />}
    </>
  );
};

export default BuyNowButton;