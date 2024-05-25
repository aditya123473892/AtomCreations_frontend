import React from "react";
import { Link } from "react-router-dom";
import Collections from "./FeaturedCollection/Collections";
import Categories from "./CategoriesSection/Categories";
import Testimonials from "./TestimonialsSection/Testimonials";
import FeaturedProducts from "./FeaturedProducts";
import Offer from "./Offer";
import UpcomingDesign from "./FeaturedCollection/UpcomingDesign"
import bgimage from "../../assets/hero121.jpg"; // Import your background image
import { FaArrowRight } from "react-icons/fa";
import Typography from "./TypographySection/Typography";

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
        </div>
        
      </section>
      
      <Collections />
      <FeaturedProducts />
      <Typography/>
      <Offer />
      <UpcomingDesign />
      
    </>
  );
};