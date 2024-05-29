import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
const ContactUs = () => {
  const [inputValue, setInputValue] = useState({
    senderName: "",
    email: "",
    message: "",
  });

  const setValue = (e) => {
    const { name, value } = e.target;

    setInputValue(() => {
      return {
        ...inputValue,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    const { senderName, email, message } = inputValue;

    e.preventDefault();
    try {
      const res = await axios.post(
        "https://atom-creations-backend-git-main-adityas-projects-a14514f1.vercel.app/api/appuser/contactus",
        {
          senderName,
          email,
          message,
        }
      );
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      senderName: "",
      email: "",
      message: "",
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-custom-bg-color text-white py-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold sans-bold text-black text-left mb-8"
        >
          Contact Us
        </motion.h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-black sans-regular">
              Get in Touch
            </h2>
            <p className="text-gray-400 mb-8"></p>
            <div className="mb-8">
              <h3 className="text-xl text-black sans-regular font-semibold mb-2">
                Contact Information
              </h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <FaEnvelope className="text-black mr-2" />
                  <a
                    href="mailto:support@example.com"
                    className="text-black sans-regular hover:text-gray-500"
                  >
                    info@atomcreations.co
                  </a>
                </li>
                <li className="flex items-center">
                  <FaMapMarkerAlt className="text-black mr-2" />
                  <span className="text-black sans-regular">
                    Mahagun Mascott crossing republik Ghaziabad, India
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-black sans-regular">
                    Pincode: 201001
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="text-black sans-regular">
                    phone no. 9971665564
                  </span>
                </li>
              </ul>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl text-black sans-bold font-semibold mb-4">
              Send Us a Message
            </h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-black sans-regular mb-2"
                >
                  Name
                </label>
                <input
                  value={inputValue.senderName}
                  type="text"
                  name="senderName"
                  onChange={setValue}
                  id="name"
                  className="w-full bg-custom-dark rounded-lg py-2 px-4 text-black focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block  text-black sans-regular mb-2"
                >
                  Email
                </label>
                <input
                  value={inputValue.email}
                  onChange={setValue}
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-custom-dark rounded-lg py-2 px-4 text-black focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-black sans-regular mb-2"
                >
                  Message
                </label>
                <textarea
                  onChange={setValue}
                  value={inputValue.message}
                  id="message"
                  name="message"
                  rows="5"
                  className="w-full bg-custom-dark rounded-lg py-2 px-4 text-black focus:outline-none focus:ring-2 focus:ring-black"
                  required
                ></textarea>
              </div>
              <motion.button
                type="submit"
                className="bg-black text-white sans-regular rounded-lg py-2 px-4 hover:bg-[#E5E1DA] hover:text-black focus:outline-none focus:ring-2 focus:ring-bg-custom-dark"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSubmit}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactUs;
