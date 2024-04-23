import React, { useState } from "react";
import icon from "../assets/i.png";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useLocation } from "react-router-dom";
const ResetPassword = () => {
  //   const location = useLocation();
  //   const searchParams = new URLSearchParams(location.search);
  //   const token = searchParams.get("id");
  const { token } = useParams();

  console.log(token);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handlePassword = async (e) => {
    e.preventDefault();

    if (password === "") {
      toast.warning("Please enter the password!", {
        position: "top-center",
        autoClose: 2000,
      });
    } else {
      try {
        console.log(token)
        const res = await axios.put(
          `http://localhost:8080/api/user/reset-password/${token}`,
          {
            password,
          }
        );

        console.log(res.data);
        const storageToken = res.data.token;
        localStorage.setItem("token", storageToken);
        console.log(res);

        navigate("/login");
        // window.location.reload();

        toast.success("password changed successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
      } catch (error) {
        console.log(error);
        toast.error("Somethung went wrong", {
          position: "top-center",
          autoClose: 3000,
        });
      }

    //   setPassword("");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black">
      <ToastContainer />

      <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full m-8">
        <div className="flex justify-center mb-8">
          <img src={icon} alt="Company Icon" className="w-33 h-24" />
        </div>
        <h2 className="text-3xl font-bold mb-6 text-center">Reset Password</h2>
        <form className="w-full" >
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Enter password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="text"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="password"
            />
          </div>
          <button
            type="submit"
            onClick={handlePassword}
            className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Update password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
