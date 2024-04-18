import React from 'react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-left mb-8"
        >
          Privacy Policy
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-900 rounded-lg p-8 shadow-2xl"
        >
          <h2 className="text-2xl font-semibold mb-4">
            Our Commitment to Your Privacy
          </h2>
          <p className="text-gray-400 mb-4">
            At our e-commerce website, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect your personal information when you visit our website and make purchases.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            Information We Collect
          </h3>
          <p className="text-gray-400 mb-4">
            We collect various types of information when you interact with our website, including:
          </p>
          <ul className="list-disc list-inside text-gray-400 mb-4">
            <li>Personal information such as your name, email address, and shipping address when you create an account or place an order.</li>
            <li>Payment information when you make a purchase, which is securely processed by our trusted payment gateway.</li>
            <li>Browsing and usage data collected through cookies and similar technologies to improve your shopping experience and provide personalized recommendations.</li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">
            How We Use Your Information
          </h3>
          <p className="text-gray-400 mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc list-inside text-gray-400 mb-4">
            <li>Process and fulfill your orders.</li>
            <li>Communicate with you about your orders, account, and promotions.</li>
            <li>Improve our website, products, and services.</li>
            <li>Personalize your shopping experience and provide relevant product recommendations.</li>
          </ul>
          <h3 className="text-xl font-semibold mb-2">
            Sharing Your Information
          </h3>
          <p className="text-gray-400 mb-4">
            We do not sell, trade, or rent your personal information to third parties. However, we may share your information with trusted service providers who assist us in operating our website and conducting our business, subject to confidentiality obligations.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            Data Security
          </h3>
          <p className="text-gray-400 mb-4">
            We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please be aware that no method of transmission over the internet or electronic storage is 100% secure.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            Your Choices
          </h3>
          <p className="text-gray-400 mb-4">
            You have the right to access, update, or delete your personal information. You can manage your preferences and opt out of receiving promotional communications from us by following the instructions provided in those communications or contacting us directly.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            Changes to This Privacy Policy
          </h3>
          <p className="text-gray-400">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;