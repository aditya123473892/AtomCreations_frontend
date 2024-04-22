import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaLock, FaMapMarkerAlt, FaHeart, FaSignOutAlt } from "react-icons/fa";

const MyAccount = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
  });

  const handleLogout = () => {
    // Perform logout logic here
    console.log("Logout clicked");
  };

  return (
    <div className="min-h-screen bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gray-900 shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-8">My Account</h2>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 mb-8 md:mb-0">
              <div className="flex items-center mb-4">
                <FaUser className="text-4xl text-blue-500 mr-4" />
                <div>
                  <h3 className="text-xl font-bold">{user.name}</h3>
                  <p className="text-gray-400">{user.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center text-red-500 hover:text-red-700"
              >
                <FaSignOutAlt className="mr-2" />
                Logout
              </button>
            </div>

            <div className="md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Link
                  to="/change-password"
                  className="flex items-center bg-blue-500 text-white rounded-lg p-4 hover:bg-blue-600 transition duration-300"
                >
                  <FaLock className="text-2xl mr-4" />
                  <span className="text-lg font-bold">Change Password</span>
                </Link>
                <Link
                  to="/addresses"
                  className="flex items-center bg-green-500 text-white rounded-lg p-4 hover:bg-green-600 transition duration-300"
                >
                  <FaMapMarkerAlt className="text-2xl mr-4" />
                  <span class="text-lg font-bold">Manage Addresses</span>
                </Link>

                <Link
                  to="/orders"
                  className="flex items-center bg-yellow-500 text-white rounded-lg p-4 hover:bg-yellow-600 transition duration-300"
                >
                  <FaHeart className="text-2xl mr-4" />
                  <span class="text-lg font-bold">Order History</span>
                </Link>
                <Link
                  to="/wishlist"
                  className="flex items-center bg-red-500 text-white rounded-lg p-4 hover:bg-red-600 transition duration-300"
                >
                  <FaHeart className="text-2xl mr-4" />
                  <span class="text-lg font-bold">Wishlist</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
