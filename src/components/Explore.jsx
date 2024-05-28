import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "./Productcard";
import axios from "axios";
import CollectionSlider from "./Home/FeaturedCollection/CollectionSlider";
import { FaSearch } from "react-icons/fa";

let products = [
  {
    id: 1,
    name: "Black T-Shirt",
    category: "tshirt",
    price: 1999,
    image:
      "https://www.barbanerastyle.com/wp-content/uploads/2020/08/barbanera-plain-black-raw-cotton-t-shirt1.jpg",
  },
  {
    id: 2,
    name: "Blue T-Shirt",
    category: "tshirt",
    price: 1599,
    image:
      "https://i5.walmartimages.com/asr/3c92c819-468f-4edd-8098-551a16ea9f1c.a8809b55a1038c8f51139443cd9e92db.jpeg",
  },
  {
    id: 3,
    name: "Printed T-Shirt",
    category: "tshirt",
    price: 2499,
    image:
      "https://simpleteeshops.com/wp-content/uploads/2020/02/Graphic-Printed-T-Shirt-for-Men-USA-Flag-T-Shirt.jpg",
  },
  {
    id: 4,
    name: "red T-Shirt",
    category: "jeans",
    price: 2999,
    image:
      "https://fullsourcemedia.s3.amazonaws.com/images/items/b/raw/5000_Red_1_A.jpg",
  },
];

const ExploreSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/products"
        );

        // console.log(response.data);
        products = response.data;
        setItems(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() !== "") {
      const filteredSuggestions = items.filter((product) => {
        return product.title.toLowerCase().includes(term.toLowerCase());
      });
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    const filteredResults = items.filter((product) => {
      return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setSearchResults(filteredResults);
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.title);
    setSuggestions([]);
    handleSearch();
  };

  return (
    <div className="bg-gray-100 min-h-screen py-12 bg-[#fbf9f1]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold font-heading text-center mb-8"
        >
          Explore Our Products
        </motion.h1>
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search products..."
              className="w-full rounded-full px-4 py-2 border border-grey-300 font-base focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {suggestions.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-md"
              >
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion._id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    {suggestion.title}
                  </li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        </div>
        <div className="w-full flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSearch}
            className="px-10 py-2 text-black text-2xl font-base bg-[#e5e2da] rounded-full hover:scale-[1.05] transition duration-300 animate-slide-up flex items-center"
          >
            Search
          </motion.button>
        </div>
        {searchResults.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {searchResults.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                product={product}
              />
            ))}
          </motion.div>
        ) : searchTerm ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center font-base py-8 text-gray-600 text-xl"
          >
            No products found.
          </motion.p>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center font-base text-gray-600 py-8 text-xl"
          >
            Start exploring by searching for a product.
          </motion.p>
        )}
      </div>
      <CollectionSlider />
    </div>
  );
};

export default ExploreSection;
