import React from 'react';
import { motion } from 'framer-motion';

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-left mb-8"
        >
          Terms and Conditions
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-900 rounded-lg p-8 shadow-2xl"
        >
          <h2 className="text-2xl font-semibold mb-4">
            Agreement to Terms
          </h2>
          <p className="text-gray-400 mb-4">
            By accessing and using our e-commerce website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our website.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            Intellectual Property
          </h3>
          <p className="text-gray-400 mb-4">
            All content on our website, including text, graphics, logos, images, and software, is the property of our company and is protected by intellectual property laws. You may not modify, reproduce, distribute, or create derivative works based on our content without our prior written consent.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            Product Information
          </h3>
          <p className="text-gray-400 mb-4">
            We strive to provide accurate and up-to-date information about our products. However, we do not warrant that product descriptions, colors, or other content on our website is accurate, complete, reliable, current, or error-free.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            Pricing and Payment
          </h3>
          <p className="text-gray-400 mb-4">
            All prices displayed on our website are in the specified currency and are subject to change without notice. We reserve the right to refuse or cancel any order placed at an incorrect price. Payment must be made at the time of purchase using one of our accepted payment methods.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            Shipping and Delivery
          </h3>
          <p className="text-gray-400 mb-4">
            We strive to process and ship orders promptly. However, we are not responsible for delays caused by circumstances beyond our control, such as natural disasters, inclement weather, or carrier-related issues. Shipping fees and estimated delivery times will be provided at checkout.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            Returns and Refunds
          </h3>
          <p className="text-gray-400 mb-4">
            We have a specific Return and Refund Policy that outlines the conditions and procedures for returning products and receiving refunds. Please refer to our Return and Refund Policy for detailed information.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            Limitation of Liability
          </h3>
          <p className="text-gray-400">
            In no event shall our company be liable for any direct, indirect, incidental, consequential, or punitive damages arising out of or in connection with your use of our website or the products purchased through our website.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TermsAndConditions;