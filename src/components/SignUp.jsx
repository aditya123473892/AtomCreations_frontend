import React from "react";
import icon from "../assets/i.png";
import Background from "../background";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { FaArrowRight } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { images } from "./constants/imagesData";
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
          "https://localhost:8080/api/user/send-otp",
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
    <div className="flex flex-row-reverse bg-cover m-1 mb-0"  style={{ backgroundImage: `url(${images.bg_signup})`}}>
      <ToastContainer />
      {/* <Background /> */}
      {/* Signup form container */}
      <div className="bg-custom-bg-color p-2 py-4 px-10 font-base shadow-lg rounded-xl max-w-md w-full mx-8 m-2">
        <div className="flex justify-center mb-6">
          <img src={images.logo_signup} alt="Company Icon" className="w-30 h-20" />
        </div>
        <h2 className="text-3xl font-medium sans-bold mb-6 text-center">
          {/* Create an Account */}
          Sign up
        </h2>
        <form className="w-full">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block sans-regular font-bold text-gray-700 mb-2"
            >
              Full Name
            </label>
            <input
              onChange={setValue}
              type="text"
              name="name"
              value={inputValue.name}
              id="name"
              className="w-full rounded-lg font-sans px-8 py-2 border bg-custom-dark border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              
            />
          </div>
          <div className="mb-4 ">
            <label
              htmlFor="email"
              className="block sans-regular font-bold text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              onChange={setValue}
              name="email"
              value={inputValue.email}
              type="email"
              id="email"
              className="w-full font-sans px-8 bg-custom-dark rounded-lg py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
             
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-bold sans-regular text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              onChange={setValue}
              name="password"
              value={inputValue.password}
              type="password"
              id="password"
              className="w-full font-sans bg-custom-dark rounded-lg px-8 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
             
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
          <div className="w-full py-2 flex justify-center">
            <button
              onClick={addUser}
              type="submit"
              className="px-8 py-2 sans-regular bg-custom-dark text-black text-xl font-base bg-black rounded-full flex items-center hover:bg-black hover:text-white "
            >
              Sign up
              {/* <div className="h-12 w-12 ml-4 bg-white text-black m-1 rounded-full flex justify-center items-center rotate-[-45deg] hover:rotate-0 transition duratuion-75">
                <FaArrowRight className="text-2xl" />
              </div> */}
            </button>
          </div>
        </form>
        {/* Sign in link */}
        <p className="mt-4 text-xl text-center sans-bold text-black ">
          Already have an account ?{" "}
          <Link
            to="/login"
            className="text-black hover:text-gray-500 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
