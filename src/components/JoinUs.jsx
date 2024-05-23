import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaInstagram, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const JoinUs = () => {
  return (
    <div className="min-h-screen bg-custom-bg-color text-black py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold text-left mb-8"
        >
          Join Our Community
        </motion.h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-custom-dark rounded-lg p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-semibold mb-4">Stay Connected</h2>
            <p className="text-black sans-regular mb-4">
              Join our vibrant community of fashion enthusiasts and be the first to know about new arrivals, exclusive promotions, and insider tips. By signing up for our newsletter, you'll gain access to a world of style inspiration and special perks.
            </p>
            <form className="mt-6">
              <div className="flex flex-col md:flex-row items-center">
                <div className="flex items-center w-full mb-4 md:mb-0 md:w-auto">
                  <FaEnvelope className="text-black mr-2" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-custom-bg-color rounded-lg py-2 px-4 text-black focus:outline-none focus:ring-2 focus:ring-black flex-grow"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-black text-white rounded-lg py-2 px-4 mt-2 md:mt-0 md:ml-2 hover:bg-[#FBF9F1] hover:text-black focus:outline-none sans-regular focus:ring-2 focus:ring-black w-full md:w-auto"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-custom-dark rounded-lg p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-semibold mb-4">Follow Us</h2>
            <p className="text-black sans-regular mb-4">
              Stay up to date with the latest fashion trends, behind-the-scenes glimpses, and exclusive content by following us on social media. Join our growing community and let's inspire each other!
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://www.instagram.com/atomcreations.co?igsh=MWZvZHk4aXlodWUybw=="
                target="_blank"
                rel="noopener noreferrer"
                className="text-black sans-regular hover:text-[#FBF9F1]"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/company/atomcreations/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black sans-regular hover:text-white"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-12 text-center"
        >
          <h2 className="text-2xl font-semibold mb-4">Become an Insider</h2>
          <p className="text-black sans-regular mx-auto max-w-2xl mb-6">
            Ready to take your fashion game to the next level? Join our exclusive insider community and unlock a world of privileges, including early access to new collections, invitations to special events, and personalized style advice from our experts.
          </p>
          <a
            href="#"
            className="bg-black text-white rounded-lg py-2 px-4 sans-regular hover:bg-[#E5E1DA] hover:text-black focus:outline-none focus:ring-2 focus:ring-black"
          >
            Join Now
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default JoinUs;