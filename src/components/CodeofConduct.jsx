import React from 'react';
import { motion } from 'framer-motion';

const CodeOfConduct = () => {
  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-left mb-8"
        >
          Code of Conduct
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-900 rounded-lg p-8 shadow-2xl"
        >
          <h2 className="text-2xl font-semibold mb-4">
            Our Commitment to Ethical Conduct
          </h2>
          <p className="text-gray-400 mb-4">
            At our e-commerce website, we are committed to conducting our business with integrity, honesty, and respect for our customers, employees, and partners. This Code of Conduct outlines the principles and standards that guide our actions and decisions.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            Respect and Non-Discrimination
          </h3>
          <p className="text-gray-400 mb-4">
            We value diversity and treat all individuals with respect and dignity, regardless of their race, color, religion, gender, sexual orientation, age, disability, or any other characteristic protected by law. We do not tolerate any form of discrimination, harassment, or bullying.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            Ethical Business Practices
          </h3>
          <p className="text-gray-400 mb-4">
            We conduct our business with integrity and comply with all applicable laws and regulations. We do not engage in any form of bribery, corruption, or unfair business practices. We maintain accurate and transparent financial records and protect the confidentiality of our customers' and partners' information.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            Responsible Sourcing
          </h3>
          <p className="text-gray-400 mb-4">
            We are committed to sourcing our products responsibly and ethically. We work with suppliers who share our values and adhere to fair labor practices, safe working conditions, and environmental sustainability. We regularly monitor and assess our supply chain to ensure compliance with our standards.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            Customer Service and Satisfaction
          </h3>
          <p className="text-gray-400 mb-4">
            We strive to provide exceptional customer service and prioritize customer satisfaction. We handle customer inquiries, complaints, and feedback with professionalism, empathy, and a commitment to finding fair resolutions. We respect our customers' privacy and protect their personal information.
          </p>
          <h3 className="text-xl font-semibold mb-2">
            Continuous Improvement
          </h3>
          <p className="text-gray-400">
            We are committed to continuous improvement and learning from our experiences. We regularly review and update our Code of Conduct to ensure it remains relevant and effective. We encourage open communication and provide channels for employees and stakeholders to report any concerns or violations without fear of retaliation.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CodeOfConduct;