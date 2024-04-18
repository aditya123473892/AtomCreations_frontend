import React from "react";
import { categoriesData } from "../../constants/HomeCategoriesData";
import { Link } from "react-router-dom";
const CategoriesGrid = () => {
  return (
    <>
      <section className="grid sm:grid-cols-2 md:grid-cols-3 grid-cols-1 gap-4 gap-y-8 py-4">
        {categoriesData.map((item, index) => {
          return (
            <div className="text-white text-center" key={index}>
              <div className="h-96 cursor-pointer">
                <img
                  className="h-full w-full object-cover"
                  src={item.url}
                  alt="categories"
                />
              </div>

              <div className="font-semibold py-2 hover:text-amber-700 cursor-pointer">
                {item.title}
              </div>
              <div>
                <Link
                  className="border-b-2  text-amber-700 hover:text-white hover:border-amber-700 py-1"
                  to="/shop"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default CategoriesGrid;
