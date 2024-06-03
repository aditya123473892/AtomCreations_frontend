import React, { useState, useContext } from "react";
import icon from "../assets/i.png";
import Background from "../background";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaArrowRight } from "react-icons/fa";
import { images } from "./constants/imagesData";

// import { AuthContext } from "./ContextProvider/AuthContext";
const LoginPage = () => {
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  const [emailInput, setEmailInput] = useState(false);
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

  const sendPasswordMail = async (e) => {
    e.preventDefault();
    const { email } = inputValue;
    if (email === "") {
      toast.warning("Email is required!", {
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
          "https://atom-creations-backend.vercel.app/api/user/forgot-password-token",
          {
            email,
          }
        );
      } catch (error) {
        toast.warning("Something went wrong", {
          position: "top-center",
        });
      }
    }
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
          "https://atom-creations-backend.vercel.app/api/user/login",
          {
            email,
            password,
          }
        );

        const storageToken = res.data.token;
        localStorage.setItem("token", storageToken);
        const expirationTime = Date.now() + 3 * 24 * 60 * 60 * 1000;

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
        toast.error("Incorrect email or password", {
          position: "top-center",
          autoClose: 3000,
        });
      }
      setInputValue({ ...inputValue, email: "", password: "" });
    }
  };
  return (
    <div
      className="flex flex-row-reverse bg-cover m-1 mb-0"
      style={{ backgroundImage: `url(${images.bg_signup})` }}
    >
      <ToastContainer />

      {/* <Background /> */}
      <div className="bg-custom-bg-color p-2 py-4 px-10 font-base shadow-lg rounded-xl max-w-md w-full mx-8 m-2">
        <div className="flex justify-center mb-6">
          <img
            src={images.logo_signup}
            alt="Company Icon"
            className="w-30 h-20"
          />
        </div>
        <h2 className="text-3xl font-medium sans-bold mb-6 text-center">
          Sign in
        </h2>
        <form className="w-full">
          <div className="mb-4">
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
              className="w-full rounded-lg font-sans px-8 py-2 border bg-custom-dark border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {!emailInput ? (
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block sans-regular font-bold text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                onChange={setValue}
                name="password"
                value={inputValue.password}
                type="password"
                id="password"
                className="w-full rounded-lg font-sans px-8 py-2 border bg-custom-dark border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          ) : (
            <div className="mb-6">
              <button
                onClick={sendPasswordMail}
                className="w-full bg-custom-dark text-black sans-regular hover:bg-black hover:text-white py-2 px-4 rounded "
              >
                Send Password Reset Email
              </button>
            </div>
          )}

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2 rounded border-gray-300 text-black focus:ring-black"
              />
              <label
                htmlFor="rememberMe"
                className="text-gray-700 sans-regular font-bold"
              >
                Remember me
              </label>
            </div>
            <div
              onClick={() => setEmailInput(true)}
              className="text-gray-700 font-bold hover:text-gray-500 sans-regular cursor-pointer"
            >
              Forgot Password?
            </div>
          </div>
          <div className="w-full flex justify-center">
            <button
              onClick={userLogin}
              type="submit"
              className="px-8 py-2 sans-regular bg-custom-dark text-black text-xl font-base bg-black rounded-full flex items-center hover:bg-black hover:text-white "
            >
              Sign In
              {/* <div className="h-12 w-12 ml-4 bg-white text-black m-1 rounded-full flex justify-center items-center rotate-[-45deg] hover:rotate-0 transition duratuion-75">
                <FaArrowRight className="text-2xl" />
              </div> */}
            </button>
          </div>
        </form>
        {/* Sign in with Google button */}
        {/* <div className="w-full flex justify-center">
          <button className="pl-8 my-4 text-white text-2xl font-base bg-black rounded-full hover:scale-[1.05] transition duration-300 animate-slide-up flex items-center">
            Sign in with Google
            <div className="h-12 w-12 ml-4 bg-white text-black m-1 rounded-full flex justify-center items-center rotate-[-45deg] hover:rotate-0 transition duratuion-75">
              <FaArrowRight className="text-2xl" />
            </div>
          </button>
        </div> */}
        {/* Sign up link */}
        <p className="mt-8 text-xl text-center sans-bold text-black ">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-black hover:text-gray-500 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
