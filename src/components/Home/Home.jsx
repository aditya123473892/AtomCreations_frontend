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
import { images } from "../constants/imagesData";
import ExploreYourPassion from "./FeaturedCollection/PassionDesign";
export const Home = () => {
  return (
    <>
      <section
        className="flex flex-col relative bg-center bg-cover min-h-[40vh] md:min-h-[70vh] lg:min-h-[90vh]  w-[100%]"
        style={{
          backgroundImage: `url(${images.bg_image_hero})`,
          // minHeight: "90vh",
          // width: "100%",
        }}
      >
        <div className="absolute text-center flex justify-center items-center h-full w-full"></div>
      </section>

      <Collections />

      <FeaturedProducts />

      <Typography />
      <Offer />
      <UpcomingDesign />
    </>
  );
};
