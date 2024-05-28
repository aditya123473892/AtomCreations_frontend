import React, { useState } from "react";
import icon from "../assets/i.png";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useLocation } from "react-router-dom";
const Verification = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");

  const [otp, setOTP] = useState("");
  const navigate = useNavigate();

  const handleVerification = async (e) => {
    e.preventDefault();

    if (otp === "") {
      toast.warning("Please enter the OTP!", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      try {
        const res = await axios.post(
          "https://atom-creations-backend-git-main-adityas-projects-a14514f1.vercel.app/api/user/verify-otp",
          {
            email,
            otp,
          }
        );

        const storageToken = res.data.token;
        localStorage.setItem("token", storageToken);

        navigate("/");
        window.location.reload();

        toast.success("OTP verified successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
      } catch (error) {
        toast.error("Invalid OTP", {
          position: "top-center",
          autoClose: 3000,
        });
      }

      setOTP("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <ToastContainer />

      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full m-8">
        <div className="flex justify-center mb-8">
          <img src={icon} alt="Company Icon" className="w-33 h-24" />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center">
          OTP Verification
        </h2>
        <form className="w-full" onSubmit={handleVerification}>
          <div className="mb-6">
            <label
              htmlFor="otp"
              className="block text-gray-700 font-medium mb-2"
            >
              Enter OTP
            </label>
            <input
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              type="text"
              id="otp"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="OTP"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Verify OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default Verification;
