import React, { useState, useContext } from "react";
import icon from "../assets/i.png";
import Background from "../background";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { AuthContext } from "./ContextProvider/AuthContext";
const LoginPage = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  // const { logindata, setLoginData } = useContext(AuthContext);
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
  const userLogin = async (e) => {
    e.preventDefault();
    const { email, password } = inputValue;
    if (email === "" || password === "") {
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
        const res = await axios.post(
          "https://atombackend.vercel.app/api/user/login",
          {
            email,
            password,
          }
        );
        console.log(res.data);
        const storageToken = res.data.token;
        localStorage.setItem("token", storageToken);
        const expirationTime = Date.now() + 3 * 24 * 60 * 60 * 1000;
        console.log(res);
        navigate("/");
        window.location.reload();

        // setLoginData(res.data);
        toast.success("Logged In successfully!", {
          position: "top-center",
          autoClose: 3000,
        });

        // setTimeout(() => {
        //   navigate("/");
        // }, 2000);
      } catch (error) {
        console.log(error);
        toast.error("Incorrect email or password", {
          position: "top-center",
          autoClose: 3000,
        });
      }
      setInputValue({ ...inputValue, email: "", password: "" });
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
        <h2 className="text-3xl font-bold mb-6 text-center">Welcome Back</h2>
        <form className="w-full">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              onChange={setValue}
              name="email"
              value={inputValue.email}
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium mb-2"
            >
              Password
            </label>
            <input
              onChange={setValue}
              name="password"
              value={inputValue.password}
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="rememberMe" className="text-gray-700 font-medium">
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Forgot Password?
            </a>
          </div>
          <button
            onClick={userLogin}
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign in
          </button>
        </form>
        {/* Sign in with Google button */}
        <div className="mt-6 text-center">
          <button className="bg-red-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-600 transition duration-300">
            Sign in with Google
          </button>
        </div>
        {/* Sign up link */}
        <p className="mt-8 text-center text-gray-700 font-medium">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
