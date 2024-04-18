import React from "react";
import CategoriesGrid from "./CategoriesGrid";

const Categories = () => {
  return (
    <section className="gap-10 py-4 px-8 text-white bg-black">
      <h1 className="p-8 text-4xl font-bold text-center">Shop By Categories</h1>
      <CategoriesGrid />
    </section>
  );
};

export default Categories;
