import React from 'react';
import { motion } from 'framer-motion';

const RefundAndCancellation = () => {
  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-left mb-8"
        >
          Refund and Cancellation Policy
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-900 rounded-lg p-8 shadow-2xl"
        >
          <h2 className="text-2xl font-semibold mb-4">No Refunds</h2>
          <p className="text-gray-400 mb-6">
            Please note that once an item is purchased through our e-commerce website, we do not offer any refunds. All sales are final, and we cannot accept returns or provide refunds for the products sold.
          </p>
          <h3 className="text-xl font-semibold mb-2">Reasons for No Refunds</h3>
          <ul className="list-disc list-inside text-gray-400 mb-6">
            <li>We carefully inspect and ensure the quality of each product before shipping.</li>
            <li>Our products are designed to meet the highest standards of craftsmanship and durability.</li>
            <li>We provide detailed product descriptions and images to help you make informed purchasing decisions.</li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">Cancellations</h3>
          <p className="text-gray-400 mb-6">
            If you wish to cancel your order, please contact our customer support team immediately. We will do our best to accommodate your cancellation request if the order has not yet been processed or shipped. However, once the order has been shipped, cancellations are no longer possible.
          </p>
          <h3 className="text-xl font-semibold mb-2">Exceptional Cases</h3>
          <p className="text-gray-400">
            In the rare event that you receive a damaged or defective product, please contact our customer support within 48 hours of delivery. We will work with you to resolve the issue and provide a suitable solution, such as a replacement or store credit, on a case-by-case basis.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default RefundAndCancellation;