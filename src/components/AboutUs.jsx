import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-left mb-8"
        >
          About Us
        </motion.h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-900 rounded-lg p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
            <p className="text-gray-400 mb-4">
              We are a passionate team of students who believe that fashion should be accessible, innovative, and expressive. Our journey began with a shared love for style and a desire to revolutionize the way people experience fashion.
            </p>
            <p className="text-gray-400 mb-4">
              As a student startup, we understand the importance of staying true to our roots while embracing the ever-evolving world of fashion. We are dedicated to curating a collection that reflects the latest trends, while also offering timeless pieces that allow individuals to express their unique personalities.
            </p>
            <p className="text-gray-400">
              Our motto, "Atomize Fashion," embodies our mission to break down barriers and empower people to embrace their individuality through fashion. We strive to provide a seamless and enjoyable shopping experience, ensuring that our customers can find the perfect pieces to express themselves with confidence.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-900 rounded-lg p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaQuoteLeft className="text-indigo-600 mr-2 mt-1" />
                <span className="text-gray-400">
                  Quality: We are committed to sourcing and delivering high-quality products that meet the expectations of our discerning customers.
                </span>
              </li>
              <li className="flex items-start">
                <FaQuoteLeft className="text-indigo-600 mr-2 mt-1" />
                <span className="text-gray-400">
                  Innovation: We constantly seek out new and innovative designs, fabrics, and styles to keep our collection fresh and exciting.
                </span>
              </li>
              <li className="flex items-start">
                <FaQuoteLeft className="text-indigo-600 mr-2 mt-1" />
                <span className="text-gray-400">
                  Customer Satisfaction: Your happiness is our top priority. We go above and beyond to ensure that every interaction with our brand is positive and memorable.
                </span>
              </li>
              <li className="flex items-start">
                <FaQuoteLeft className="text-indigo-600 mr-2 mt-1" />
                <span className="text-gray-400">
                  Sustainability: We are mindful of our impact on the environment and strive to adopt sustainable practices whenever possible.
                </span>
              </li>
            </ul>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-12 text-center"
        >
          <h2 className="text-2xl font-semibold mb-4">Our Promise</h2>
          <p className="text-gray-400 mx-auto max-w-2xl">
            <FaQuoteLeft className="inline-block text-indigo-600 mr-2" />
            We promise to always put our customers first, to curate a collection that inspires and delights, and to be a brand that you can trust and rely on for all your fashion needs. Thank you for being a part of our journey.
            <FaQuoteRight className="inline-block text-indigo-600 ml-2" />
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutUs;