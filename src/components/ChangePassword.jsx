import React, { useContext, useState } from "react";
import icon from "../assets/i.png";
import Background from "../background";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router";
import { AuthContext } from "./ContextProvider/AuthContext";

const ChangePassword = () => {
  const { logindata, setLoginData } = useContext(AuthContext);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (
      currentPassword === "" ||
      newPassword === "" ||
      confirmPassword === ""
    ) {
      toast.warning("All fields are required!", {
        position: "top-center",
        autoClose: 2000,
      });
    } else if (newPassword !== confirmPassword) {
      toast.warning("New password and confirm password do not match!", {
        position: "top-center",
      });
    } else {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.put(
          "https://atom-creations-backend.vercel.app/api/user/password",
          { currentPassword, newPassword },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log(response.data);
        localStorage.removeItem(token);
        setLoginData("");
        toast.success("Password changed successfully!", {
          position: "top-center",
          autoClose: 2000,
        });

        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        localStorage.removeItem("token");
        navigate("/login");
      } catch (error) {
        console.log(error);
        toast.error("Failed to change password. Please try again.", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center">
      <ToastContainer />
      <Background />

      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full m-8">
        <div className="flex justify-center mb-8">
          <img src={icon} alt="Company Icon" className="w-33 h-24" />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center">Change Password</h2>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label
              htmlFor="currentPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter current password"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="newPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 font-medium mb-2"
            >
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
