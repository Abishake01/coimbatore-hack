import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "#" },
    { name: "Workflow", href: "#workflow" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 ">
      <div className="max-w-full mx-auto flex items-center  justify-between px-6 py-4 bg-white/95 backdrop-blur-md  shadow-xl border border-gray-200 ">
        
        {/* Logo */}
        <a
          href="#"
          className="text-xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent"
        >
          AI Organizer
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 font-semibold text-gray-800">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="relative group transition duration-300 hover:text-purple-600"
                >
                  {link.name}
                  <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-gradient-to-r from-blue-600 to-purple-600 transition-all group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
          
          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold  shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Sign Up
            </button>
            <button className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold  shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Login
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-800 hover:text-purple-600 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg p-6">
          <ul className="flex flex-col gap-4 mb-6">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="block py-2 text-gray-800 hover:text-purple-600 transition font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          
          {/* Mobile Auth Buttons */}
          <div className="flex flex-col gap-3">
            <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Sign Up
            </button>
            <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;