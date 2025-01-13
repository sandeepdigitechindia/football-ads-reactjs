import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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
            <ul className="flex space-x-8">
              <li><Link to="/" className="text-white hover:text-orange-500">Home</Link></li>
              <li><Link to="/ads" className="text-white hover:text-orange-500">Ads</Link></li>
              <li><Link to="/subscriptions" className="text-white hover:text-orange-500">Subscriptions</Link></li>
              <li><Link to="/services-for-clubs" className="text-white hover:text-orange-500">Services for Clubs</Link></li>
              <li><Link to="/about" className="text-white hover:text-orange-500">About</Link></li>
              <li><Link to="/contact" className="text-white hover:text-orange-500">Contact</Link></li>
            </ul>
          </nav>

          {/* Authentication Buttons */}
          <div className="hidden md:flex">
            <Link to="/login" className="px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition duration-300">Login / Register</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Offcanvas Mobile Menu */}
      <div className={`fixed inset-0 bg-gray-900 bg-opacity-75 z-40 ${isMenuOpen ? 'block' : 'hidden'}`} onClick={toggleMenu}>
        <div className="fixed inset-0 flex justify-end items-start p-4">
          <div className="w-64 bg-gray-900 text-white p-6 space-y-6">
            <button onClick={toggleMenu} className="text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            <ul className="space-y-4">
              <li><Link to="/" className="text-white hover:text-orange-500">Home</Link></li>
              <li><Link to="/ads" className="text-white hover:text-orange-500">Ads</Link></li>
              <li><Link to="/subscriptions" className="text-white hover:text-orange-500">Subscriptions</Link></li>
              <li><Link to="/services-for-clubs" className="text-white hover:text-orange-500">Services for Clubs</Link></li>
              <li><Link to="/about" className="text-white hover:text-orange-500">About</Link></li>
              <li><Link to="/contact" className="text-white hover:text-orange-500">Contact</Link></li>
            </ul>
            <div>
              <Link to="/login" className="text-white hover:text-orange-500">Login / Register</Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
