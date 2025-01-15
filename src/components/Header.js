import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({
    ads: false,
    subscriptions: false,
    services: false,
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (key) => {
    setDropdownOpen((prevState) => {
      const newState = Object.keys(prevState).reduce((acc, curr) => {
        acc[curr] = curr === key ? !prevState[curr] : false; // Close others
        return acc;
      }, {});
      return newState;
    });
  };

  return (
    <header className="bg-blue-900 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img src="/logo.png" alt="Football Ads Logo" className="w-32 h-auto" />
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex space-x-8">
            <ul className="flex space-x-8 relative">
            <li><Link to="/" className="text-white hover:text-orange-500">Home</Link></li>
              <li className="relative group">
                <button
                  onClick={() => toggleDropdown('ads')}
                  className="flex items-center text-white hover:text-orange-500"
                >
                  Ads
                  <svg
                    className="w-4 h-4 ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <ul
                  className={`absolute left-0 text-nowrap mt-5 bg-white w-70 text-black rounded shadow-lg group-hover:block ${
                    dropdownOpen.ads ? 'block' : 'hidden'
                  }`}
                >
                  <li><Link to="/ads" className="block px-4 py-2 hover:bg-blue-900 hover:text-white">Advertisement for players</Link></li>
                  <li><Link to="/ads" className="block px-4 py-2 hover:bg-blue-900 hover:text-white">Advertisement for coaches</Link></li>
                  <li><Link to="/ads" className="block px-4 py-2 hover:bg-blue-900 hover:text-white">Advertisement for jobs in football</Link></li>
                </ul>
              </li>
              
              <li className="relative group">
                <button
                  onClick={() => toggleDropdown('subscriptions')}
                  className="flex items-center text-white hover:text-orange-500"
                >
                  Subscriptions
                  <svg
                    className="w-4 h-4 ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <ul
                  className={`absolute left-0 text-nowrap mt-5 bg-white w-70 text-black rounded shadow-lg group-hover:block ${
                    dropdownOpen.subscriptions ? 'block' : 'hidden'
                  }`}
                >
                  <li><Link to="/subscriptions" className="block px-4 py-2 hover:bg-blue-900 hover:text-white">3-Month Plan</Link></li>
                  <li><Link to="/subscriptions" className="block px-4 py-2 hover:bg-blue-900 hover:text-white">6-Month Plan</Link></li>
                  <li><Link to="/subscriptions" className="block px-4 py-2 hover:bg-blue-900 hover:text-white">9-Month Plan</Link></li>
                  <li><Link to="/subscriptions" className="block px-4 py-2 hover:bg-blue-900 hover:text-white">1-Year Plan</Link></li>
                </ul>
              </li>
              <li className="relative group">
                <button
                  onClick={() => toggleDropdown('services')}
                  className="flex items-center text-white hover:text-orange-500"
                >
                  Services for Clubs
                  <svg
                    className="w-4 h-4 ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                <ul
                  className={`absolute left-0 text-nowrap mt-5 bg-white w-70 text-black rounded shadow-lg group-hover:block ${
                    dropdownOpen.services ? 'block' : 'hidden'
                  }`}
                >
                  <li><Link to="/services" className="block px-4 py-2 hover:bg-blue-900 hover:text-white">Scouting Organization</Link></li>
                  <li><Link to="/services" className="block px-4 py-2 hover:bg-blue-900 hover:text-white">Tournament Organization</Link></li>
                  <li><Link to="/services" className="block px-4 py-2 hover:bg-blue-900 hover:text-white">Custom Services</Link></li>
                </ul>
              </li>
              <li><Link to="/about" className="text-white hover:text-orange-500">About</Link></li>
              <li><Link to="/contact" className="text-white hover:text-orange-500">Contact</Link></li>
            </ul>
          </nav>

          {/* Authentication Buttons */}
          <div className="hidden md:flex">
            <Link to="/login" className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition duration-300">Login</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Offcanvas Mobile Menu */}
      <div className={`fixed inset-0 bg-gray-900 bg-opacity-75 z-40 ${isMenuOpen ? 'block' : 'hidden'}`} onClick={toggleMenu}>
        <div className="p-4" onClick={(e) => e.stopPropagation()}>
          <div className="w-90 bg-gray-900 text-white p-6 space-y-6">
            <div>
              
            </div>
            <button onClick={toggleMenu} className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ul className="space-y-4">
            <li><Link to="/" className="text-white hover:text-orange-500">Home</Link></li>
              <li className="relative">
                <button
                  onClick={() => toggleDropdown('ads')}
                  className="flex items-center text-white hover:text-orange-500"
                >
                  Ads
                  <svg
                    className="w-4 h-4 ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {dropdownOpen.ads && (
                  <ul className="mt-2 bg-gray-800 text-white rounded shadow-lg">
                    <li><Link to="/ads" className="block px-4 py-2 hover:bg-gray-700">Advertisement for players</Link></li>
                    <li><Link to="/ads" className="block px-4 py-2 hover:bg-gray-700">Advertisement for coaches</Link></li>
                    <li><Link to="/ads" className="block px-4 py-2 hover:bg-gray-700">Advertisement for jobs in football</Link></li>
                  </ul>
                )}
              </li>
              
              <li className="relative">
                <button
                  onClick={() => toggleDropdown('subscriptions')}
                  className="flex items-center text-white hover:text-orange-500"
                >
                  Subscriptions
                  <svg
                    className="w-4 h-4 ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {dropdownOpen.subscriptions && (
                  <ul className="mt-2 bg-gray-800 text-white rounded shadow-lg">
                    <li><Link to="/subscriptions" className="block px-4 py-2 hover:bg-gray-700">3-Month Plan</Link></li>
                    <li><Link to="/subscriptions" className="block px-4 py-2 hover:bg-gray-700">6-Month Plan</Link></li>
                    <li><Link to="/subscriptions" className="block px-4 py-2 hover:bg-gray-700">9-Month Plan</Link></li>
                    <li><Link to="/subscriptions" className="block px-4 py-2 hover:bg-gray-700">1-Year Plan</Link></li>
                  </ul>
                )}
              </li>
              <li className="relative">
                <button
                  onClick={() => toggleDropdown('services')}
                  className="flex items-center text-white hover:text-orange-500"
                >
                  Services for Clubs
                  <svg
                    className="w-4 h-4 ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {dropdownOpen.services && (
                  <ul className="mt-2 bg-gray-800 text-white rounded shadow-lg">
                    <li><Link to="/services" className="block px-4 py-2 hover:bg-gray-700">Scouting Organization</Link></li>
                    <li><Link to="/services" className="block px-4 py-2 hover:bg-gray-700">Tournament Organization</Link></li>
                    <li><Link to="/services" className="block px-4 py-2 hover:bg-gray-700">Custom Services</Link></li>
                  </ul>
                )}
              </li>
              <li><Link to="/about" className="text-white hover:text-orange-500">About</Link></li>
              <li><Link to="/contact" className="text-white hover:text-orange-500">Contact</Link></li>
            </ul>
            <div>
              <Link to="/login" className="text-white hover:text-orange-500">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
