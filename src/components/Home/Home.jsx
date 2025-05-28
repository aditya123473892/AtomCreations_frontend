import React from "react";
import { Link } from "react-router-dom";
import Collections from "./FeaturedCollection/Collections";
import Categories from "./CategoriesSection/Categories";
import Testimonials from "./TestimonialsSection/Testimonials";
import FeaturedProducts from "./FeaturedProducts";
import Offer from "./Offer";
import UpcomingDesign from "./FeaturedCollection/UpcomingDesign";
import bgimage from "../../assets/hero121.jpg"; // Import your background image
import { FaArrowRight } from "react-icons/fa";
import Typography from "./TypographySection/Typography";
import Solids from "./SolidsSection/Solids";

export const Home = () => {
  return (
    <>
      <section
        className="flex flex-col relative px-2 py-3 bg-custom-bg-color"
      >
        <img src={bgimage} alt="background"
          className="h-full w-full rounded-[20px]"
        />
      </section>

      
      <Solids/>
      <FeaturedProducts />
      <Typography />
      <Offer />
      {/* <UpcomingDesign /> */}
      <Collections />
    </>
  );
};
