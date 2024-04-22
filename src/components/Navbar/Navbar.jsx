import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useCycle } from "framer-motion";
import icon from "../../assets/new_logo.png";
import { FaUser, FaShoppingCart, FaBars, FaTimes, FaSearch } from "react-icons/fa";
import { AuthContext } from "../ContextProvider/AuthContext";
import { Avatar } from "@mui/material";
import axios from "axios";
const links = [
  { name: "About Us", to: "/aboutus" },
  { name: "Privacy Policy", to: "/privacypolicy" },
  { name: "Join Us", to: "/joinus" },
];

const itemVariants = {
  closed: { opacity: 0, y: -20 },
  open: { opacity: 1, y: 0 },
};

const sideVariants = {
  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  open: { transition: { staggerChildren: 0.07, staggerDirection: 1 } },
};

const Navbar = () => {
  const [open, cycleOpen] = useCycle(false, true);
  const [isOpen, setIsOpen] = useState(false);
  const { logindata, setLoginData } = useContext(AuthContext);
  const navigate = useNavigate()
  const handleLogOut = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    setLoginData("");
    console.log(logindata);
    navigate("/")
    // window.location.reload();
    
  };
  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    console.log("Login data updated:", logindata);
  }, [logindata]);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-black flex justify-between items-center px-8 sticky top-0 z-50 py-2 md:py-3"
    >
      <div className="flex items-center justify-start flex-grow">
        <Link to="/">
          <img src={icon} alt="Company Icon" className="h-8 w-auto" />
        </Link>
      </div>
      <div className="flex items-center text-white space-x-4">
        {!logindata ? (
          <Link to="/login" className="relative button-link">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black"
            >
              <FaUser className="text-xl" />
            </motion.div>
          </Link>
        ) : (
          <Link to="/profile" className="relative button-link">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-white text-black"
            >
              {logindata.name && (
                <Avatar
                  style={{
                    background: "white",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    color: "black",
                  }}
                >
                  {logindata.name[0]}
                </Avatar>
              )}
            </motion.div>

            {/* <p className="text-white">{logindata.name}</p> */}
          </Link>
        )}
        {logindata ? (
          <>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLogOut}
              className="flex items-center justify-center w-22 h-10 px-2 rounded bg-white text-black"
            >
              <button className="font-bold">Log Out</button>
            </motion.div>
          </>
        ) : null}

        <Link to="/cart" className="relative button-link">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black"
          >
            <FaShoppingCart className="text-xl" />
          </motion.div>
        </Link>
        <Link to="/explore" className="relative button-link">
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black"
          >
            <FaSearch className="text-xl" />
          </motion.div>
        </Link>
        <div>
          <motion.div
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="text-3xl cursor-pointer md:text-2xl flex items-center justify-center w-10 h-10 rounded-full bg-white text-black"
            onClick={cycleOpen}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.div>
        </div>
      </div>
      <motion.ul
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sideVariants}
        className={`bg-black text-white fixed w-96 top-16 right-0 overflow-y-auto bottom-0 py-6 px-8 text-right ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {links.map(({ name, to }) => (
          <motion.li
            key={name}
            variants={itemVariants}
            className="my-3"
            onClick={cycleOpen}
            whileHover={{ x: 10 }}
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
