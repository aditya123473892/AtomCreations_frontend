import React from 'react';
import { motion } from 'framer-motion';
import { FaQuestionCircle, FaPhone, FaEnvelope } from 'react-icons/fa';

const HelpAndSupport = () => {
  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-left mb-8"
        >
          Help and Support
        </motion.h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-900 rounded-lg p-8 shadow-2xl"
          >
            <FaQuestionCircle className="text-indigo-600 w-12 h-12 mb-4" />
            <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
            <p className="text-gray-400 mb-4">
              Find answers to frequently asked questions about our products, shipping, returns, and more.
            </p>
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-400 font-semibold"
            >
              Visit FAQs
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-900 rounded-lg p-8 shadow-2xl"
          >
            <FaPhone className="text-indigo-600 w-12 h-12 mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-400 mb-4">
              Get in touch with our friendly customer support team for assistance with your orders or any inquiries.
            </p>
            <a
              href="#"
              className="text-indigo-600 hover:text-indigo-400 font-semibold"
            >
              Contact Support
            </a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-900 rounded-lg p-8 shadow-2xl"
          >
            <FaEnvelope className="text-indigo-600 w-12 h-12 mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Email Us</h2>
            <p className="text-gray-400 mb-4">
              Send us an email with your questions or concerns, and we'll get back to you as soon as possible.
            </p>
            <a
              href="mailto:support@example.com"
              className="text-indigo-600 hover:text-indigo-400 font-semibold"
            >
              Send Email
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HelpAndSupport;