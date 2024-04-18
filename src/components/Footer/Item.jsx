import React from "react";
import { Link } from "react-router-dom";
const Item = ({ Links, title }) => {
  return (
    <ul className="text-center sm:text-justify lg:text-justify" >
      <h1 className="mb-2 font-semibold">{title}</h1>
      {Links.map((link) => (
        <li className="py-1" key={link.name}>
          <Link to={link.url}
            className="text-gray-200 hover:text-amber-700 duration-300
          text-sm cursor-pointer leading-6"
            href={link.link}
          >
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Item;