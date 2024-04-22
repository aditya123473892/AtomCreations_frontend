import React, { useState } from "react";
import { FaHeart, FaShoppingCart, FaTrash } from "react-icons/fa";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 19.99,
      image: "https://example.com/product1.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 29.99,
      image: "https://example.com/product2.jpg",
    },
    {
      id: 3,
      name: "Product 3",
      price: 39.99,
      image: "https://example.com/product3.jpg",
    },
  ]);

  const handleRemoveFromWishlist = (id) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleAddToCart = (item) => {
    // Logic to add the item to the cart
    console.log("Added to cart:", item);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-8">Wishlist</h2>
          {wishlistItems.length === 0 ? (
            <p className="text-gray-500">Your wishlist is empty.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md p-4"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="absolute top-2 right-2 bg-white rounded-full p-2 hover:bg-gray-100 transition duration-300"
                    >
                      <FaTrash className="text-red-500" />
                    </button>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-500 mb-4">${item.price.toFixed(2)}</p>
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex items-center bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 transition duration-300"
                    >
                      <FaShoppingCart className="mr-2" />
                      Add to Cart
                    </button>
                    <button className="text-red-500 hover:text-red-600 transition duration-300">
                      <FaHeart />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;