import React, { useState } from "react";
import { Link } from "react-router-dom";
import { links } from "./Mylinks";

const NavLinks = () => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");
  return (
    <>
      {links.map((link) => (
        <div>
          <div className="px-3 py-5 text-left md:cursor-pointer group">
            <div className="flex justify-between items-center md:pr-0 pr-5 group hover:text-white font-semibold text-base/loose md:text-base relative">
              <Link to={link.path}>{link.name}</Link>
              {link.sublinks && (
                <span className="text-xl md:hidden inline">
                  <ion-icon
                    name={`${
                      heading === link.name ? "chevron-up" : "chevron-down"
                    }`}
                  ></ion-icon>
                </span>
              )}
              <div
                className="absolute bottom-0 left-0 w-full h-[2px] bg-transparent group-hover:bg-white"
                onClick={() => {
                  heading !== link.name ? setHeading(link.name) : setHeading("");
                  setSubHeading("");
                }}
              ></div>
            </div>
            {link.submenu && (
              <div>
                <div className="absolute top-10 inset-x-0 hidden group-hover:md:block hover:md:block z-50">
                  <div className="py-3">
                    <div
                      className="w-4 h-4 absolute 
                    mt-1 bg-black rotate-45"
                    ></div>
                  </div>
                  <div className="bg-black p-5 lg:px-60 xl:px-100 px-40 grid grid-cols-2 gap-10">
                    {link.sublinks?.map((mysublinks) => (
                      <div>
                        <h1 className="text-lg  font-semibold">
                          {mysublinks.Head}
                        </h1>
                        {mysublinks.sublink.map((slink) => (
                          <li className="text-sm text-white font-light my-4">
                            <Link
                              to={slink.link}
                              className="hover:text-amber-700"
                            >
                              {slink.name}
                            </Link>
                          </li>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Mobile menus */}
          <div
            className={`
            ${heading === link.name ? "md:hidden" : "hidden"}
          `}
          >
            {/* sublinks */}
            {link.sublinks?.map((slinks) => (
              <div>
                <div>
                  <h1
                    onClick={() =>
                      subHeading !== slinks.Head
                        ? setSubHeading(slinks.Head)
                        : setSubHeading("")
                    }
                    className="py-4 pl-7 font-semibold md:pr-0 pr-5 flex justify-between items-center "
                  >
                    {slinks.Head}

                    <span className="text-xl md:mt-1 md:ml-2 inline">
                      <ion-icon
                        name={`${
                          subHeading === slinks.Head
                            ? "chevron-up"
                            : "chevron-down"
                        }`}
                      ></ion-icon>
                    </span>
                  </h1>
                  <div
                    className={`${
                      subHeading === slinks.Head ? "md:hidden" : "hidden"
                    }`}
                  >
                    {slinks.sublink.map((slink) => (
                      <li className="py-3 pl-14 text-white font-light">
                        <Link className="hover:text-amber-700" to={slink.link}>
                          {slink.name}
                        </Link>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default NavLinks;