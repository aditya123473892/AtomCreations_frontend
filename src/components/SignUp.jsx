import React from "react";
import icon from "../assets/i.png";
import Background from "../background";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaArrowRight } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
const SignupPage = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    password: "",
    // mobile: "",
  });
  const navigate = useNavigate();
  const setValue = (e) => {
    const { name, value } = e.target;

    setInputValue(() => {
      return {
        ...inputValue,
        [name]: value,
      };
    });
  };
  const addUser = async (e) => {
    e.preventDefault();

    const { name, email, password } = inputValue;
    if (name === "" || email === "" || password === "") {
      toast.warning("All fields are required!", {
        position: "top-center",
        autoClose: 2000,
      });
    } else if (!email.includes("@")) {
      toast.warning("email must include @", {
        position: "top-center",
      });
    } else {
      try {
        const response = await axios.post(
          "https://atom-creations-backend.vercel.app/api/user/send-otp",
          {
            name,
            email,
            password,
            // mobile,
          }
        );
       
        navigate(`/verify-otp?email=${email}`);

        // navigate("/verify-otp");
        // const storageToken = response.data.token;
        // localStorage.setItem("token", storageToken);
        // console.log(response);
        // navigate("/");
        // window.location.reload();
        // window.location.reload();
        // setTimeout(()=>{
        //     navigate("/")

        // },3000)
      } catch (error) {
        console.log(error);
      }
      setInputValue({
        ...inputValue,
        name: "",
        email: "",
        password: "",
        // mobile: "",
      });
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center">
      <ToastContainer />
      <Background />
      {/* Signup form container */}
      <div className="bg-white p-10 font-base shadow-lg max-w-md w-full m-8">
        <div className="flex justify-center mb-8">
          <img src={icon} alt="Company Icon" className="w-33 h-24" />
        </div>
        <h2 className="text-3xl font-heading font-bold mb-6 text-center">
          Create an Account
        </h2>
        <form className="w-full">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block font-bold text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              onChange={setValue}
              type="text"
              name="name"
              value={inputValue.name}
              id="name"
              className="w-full font-sans px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-bold text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              onChange={setValue}
              name="email"
              value={inputValue.email}
              type="email"
              id="email"
              className="w-full font-sans px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-bold text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              onChange={setValue}
              name="password"
              value={inputValue.password}
              type="password"
              id="password"
              className="w-full font-sans px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a password"
            />
          </div>
          {/* <div className="mb-4">
            <label
              htmlFor="mobile"
              className="block font-bold text-gray-700 mb-2"
            >
              Mobile No.
            </label>
            <input
              onChange={setValue}
              name="mobile"
              value={inputValue.mobile}
              type="number"
              id="mobile"
              className="w-full font-sans px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter contact number"
            />
          </div> */}
          {/* <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm your password"
            />
          </div> */}
          <div className="w-full py-4 flex justify-center">
            <button
              onClick={addUser}
              type="submit"
              className="pl-8 text-white text-2xl font-base bg-black rounded-full hover:scale-[1.05] transition duration-300 animate-slide-up flex items-center"
            >
              Sign Up
              <div className="h-12 w-12 ml-4 bg-white text-black m-1 rounded-full flex justify-center items-center rotate-[-45deg] hover:rotate-0 transition duratuion-75">
                <FaArrowRight className="text-2xl" />
              </div>
            </button>
          </div>
        </form>
        {/* Sign in link */}
        <p className="mt-8 text-center text-gray-700 font-medium">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
