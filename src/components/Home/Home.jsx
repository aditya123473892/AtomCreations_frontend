import React from "react";
import { Link } from "react-router-dom";
import Collections from "./FeaturedCollection/Collections";
import Categories from "./CategoriesSection/Categories";
import Testimonials from "./TestimonialsSection/Testimonials";
import FeaturedProducts from "./FeaturedProducts";
import Offer from "./Offer";
import UpcomingDesign from "./FeaturedCollection/UpcomingDesign"
import bgimage from "../../assets/home62.jpg"; // Import your background image
import { FaArrowRight } from "react-icons/fa";

export const Home = () => {
  return (
    <>
      <section
        className="flex flex-col relative"
        style={{
          backgroundImage: `url(${bgimage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "75vh",
        }}
      >
        <div className="absolute text-center flex justify-center items-center h-full w-full">
          <h1 className="mb-[25vh] text-4xl md:text-[80px] font-heading tracking-widest text-white mb-8 animate-fade-in">
            Let's Atomize Fashion
          </h1>
        </div>
        <div className="absolute flex float-end h-full w-full justify-end items-end">
          <Link to="/explore">
            <button className="pl-8 mr-8 mb-8 text-white text-5xl font-base bg-black rounded-full hover:scale-[1.05] transition duration-300 animate-slide-up flex items-center">
              Explore
              <div className="h-20 w-20 bg-white text-black m-2 rounded-full flex justify-center items-center rotate-[-45deg] hover:rotate-0 transition duratuion-75">
                <FaArrowRight className="text-4xl" />
              </div>
            </button>
          </Link>
        </div>
      </section>
      <FeaturedProducts />
      <Collections />
      <Offer />
      <UpcomingDesign />
      
    </>
  );
};