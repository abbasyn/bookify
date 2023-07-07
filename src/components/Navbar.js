import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4  lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <p className="text-white font-bold text-xl">Logo</p>
          </div>
          <div>
            <div className="ml-10 flex items-baseline space-x-4">
              <p className="text-gray-300 hover:text-white cursor-pointer px-3 py-2 rounded-md text-sm font-medium">
                <NavLink to="/"> Home </NavLink>
              </p>
              <p className="text-gray-300 hover:text-white cursor-pointer px-3 py-2 rounded-md text-sm font-medium">
                <NavLink to="/books/listing"> Add Listing </NavLink>
              </p>
              <p className="text-gray-300 hover:text-white cursor-pointer px-3 py-2 rounded-md text-sm font-medium">
                <NavLink to="/books/orders"> Order </NavLink>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        {/* <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a
            href="#"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Home
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            About
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Services
          </a>
          <a
            href="#"
            className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Contact
          </a>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
