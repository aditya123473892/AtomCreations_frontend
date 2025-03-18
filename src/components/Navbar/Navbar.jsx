import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useCycle } from "framer-motion";
import icon from "../../assets/logo_black.png";
import {
  FaUser,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import { AuthContext } from "../ContextProvider/AuthContext";
import { Avatar } from "@mui/material";
import axios from "axios";
import { ShoppingCart } from "lucide-react";
import { Search } from "lucide-react";
import { User } from "lucide-react";
import { Menu } from "lucide-react";
import { LogOut } from "lucide-react";

const links = [
  { name: "About Us", to: "/aboutus" },
  { name: "Privacy Policy", to: "/privacypolicy" },
  { name: "Join Us", to: "/joinus" },
];

const itemVariants = {
  closed: { opacity: 0, x: 20 },
  open: { opacity: 1, x: 0 },
};

// const sideVariants = {
//   closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
//   open: { transition: { staggerChildren: 0.07, staggerDirection: 1 } },
// };
const sideVariants = {
  closed: { x: 0 },
  open: { x: 0 },
  transition: { duration: 3 },
};
const Navbar = () => {
  const [open, cycleOpen] = useCycle(false, true);
  const [isOpen, setIsOpen] = useState(false);
  const { logindata, setLoginData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setLoginData("");

    navigate("/");
  };

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  // useEffect(() => {
  //   console.log("Login data updated:", logindata);
  // }, [logindata]);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-custom-bg-color flex justify-between items-center px-8 sticky top-0 z-50 py-2 md:py-4 border-b-2 border-[#e5e1da]"
    >
      <div className="flex items-center justify-start flex-grow">
        <Link to="/">
          <img src={icon} alt="Company Icon" className="h-8 w-auto" />
        </Link>
        <a
  href="https://wa.me/919971665564?text=Hi%20I%20want%20to%20order!"
  target="_blank"
  rel="noopener noreferrer"
>
  Want to order in bulk
</a>

      </div>
      <div className="flex items-center text-white space-x-2">
        <div className="hidden md:flex items-center space-x-2">
          {!logindata ? (
            <Link to="/login" className="relative button-link">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-custom-bg-color  text-black"
              >
                <User size={26} strokeWidth={1.7} />
                {/* <FaUser className="text-xl" /> */}
              </motion.div>
            </Link>
          ) : (
            <Link to="/profile" className="relative button-link">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center w-12 h-12 rounded-full bg-[#e5e1da] text-black"
              >
                {logindata.name && (
                  <Avatar
                    style={{
                      background: "#e5e1da",
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      color: "black",
                    }}
                  >
                    {logindata.name[0]}
                  </Avatar>
                )}
              </motion.div>
            </Link>
          )}
          {logindata ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogOut}
              className="text-black font-semibold p-2 rounded-full duration-75 hover:bg-[#e5e1da] hover:text-black"
            >
              <LogOut size={26} strokeWidth={1.7} />
            </motion.button>
          ) : null}
          <Link to="/explore" className="relative button-link">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-10 h-10 bg-custom-bg-color  rounded-full  text-black"
            >
              {/* <FaSearch className="text-xl" /> */}
              <Search size={26} strokeWidth={1.7} />
            </motion.div>
          </Link>
          <Link to="/cart" className="relative button-link">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-10 h-10 bg-custom-bg-color  rounded-full  text-black"
            >
              <ShoppingCart size={26} strokeWidth={1.7} />
              {/* <FaShoppingCart className="text-xl" /> */}
            </motion.div>
          </Link>
        </div>

        <div className="md:hidden">
          <motion.div
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="text-3xl cursor-pointer md:text-2xl flex items-center justify-center w-10 h-10 bg-custom-bg-color text-black"
            onClick={cycleOpen}
            // whileHover={{ scale: 1.1 }}
            // whileTap={{ scale: 0.9 }}
          >
            <Menu size={28} strokeWidth={1.7} />
          </motion.div>
        </div>
      </div>
      <motion.ul
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sideVariants}
        className={`bg-slate-50 text-black fixed w-full md:w-72 top-14 md:top-16 right-0 overflow-y-auto bottom-0 py-6 px-6 pr-12 text-left md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {!logindata ? (
          <motion.li
            variants={itemVariants}
            className="my-3"
            onClick={cycleOpen}
            // whileHover={{ x: 10 }}
          >
            <Link to="/login" className="md:hidden text-xl uppercase">
              Login
            </Link>
          </motion.li>
        ) : (
          <>
            <motion.li
              variants={itemVariants}
              className="my-3"
              onClick={cycleOpen}
              // whileHover={{ x: 10 }}
            >
              <Link
                to="/profile"
                className="text-xl uppercase text-black bg-white"
              >
                Profile
              </Link>
            </motion.li>
            <motion.li
              variants={itemVariants}
              className="my-3"
              onClick={handleLogOut}
              // whileHover={{ x: 10 }}
            >
              <button className="text-xl uppercase">Log Out</button>
            </motion.li>
          </>
        )}
        <motion.li
          variants={itemVariants}
          className="my-3"
          onClick={cycleOpen}
          // whileHover={{ x: 10 }}
        >
          <Link to="/cart" className="md:hidden  text-xl uppercase">
            Cart
          </Link>
        </motion.li>
        {links.map(({ name, to }) => (
          <motion.li
            key={name}
            variants={itemVariants}
            className="my-3"
            onClick={cycleOpen}
            // whileHover={{ x: 10 }}
          >
            <Link to={to} className="text-xl uppercase">
              {name}
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </motion.nav>
  );
};

export default Navbar;
