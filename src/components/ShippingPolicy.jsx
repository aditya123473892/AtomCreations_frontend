import React from 'react';
import { motion } from 'framer-motion';

const ShippingPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl text-black font-extrabold text-left mb-8"
        >
          Shipping Policy
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-200 rounded-lg p-8 shadow-2xl"
        >
          <h2 className="text-2xl text-black font-semibold mb-4">Shipping Partner</h2>
          <p className="text-gray-900 mb-6">
            We have partnered with Shiprocket, a reliable and efficient delivery service, to ensure that your orders are shipped and delivered promptly. Shiprocket handles all our shipping needs, and we work closely with them to provide you with the best possible shipping experience.
          </p>
          <h3 className="text-xl text-black font-semibold mb-2">Shipping Timeframe</h3>
          <p className="text-gray-900 mb-6">
            Once your order is processed and ready for shipping, it typically takes between 1 to 3 business days for your package to be delivered. Please note that this timeframe is an estimate and may vary depending on your location and any unforeseen circumstances.
          </p>
          <h3 className="text-xl text-black font-semibold mb-2">Shipping Rates</h3>
          <p className="text-gray-900 mb-6">
            We strive to provide competitive shipping rates for our customers. The shipping cost will be calculated based on the weight and dimensions of your package, as well as your shipping destination. The applicable shipping fees will be clearly displayed during the checkout process before you complete your purchase.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ShippingPolicy;