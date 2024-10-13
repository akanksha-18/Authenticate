import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false); 

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Movie Watchlist</h1>
        
       
        <button 
          className="text-white md:hidden"
          onClick={toggleMenu}
        >
          {isOpen ? '✖' : '☰'} 
        </button>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white transition duration-200">
            Search
          </Link>
          <Link to="/watchlist" className="text-gray-300 hover:text-white transition duration-200">
            Watchlist
          </Link>
        </div>

        
        {user ? (
          <div className="hidden md:flex items-center">
            <span className="text-white mr-4">Welcome, {user.email}!</span>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="hidden md:flex items-center">
            <Link to="/signup" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 mr-2">
              Sign Up
            </Link>
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
              Login
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-700 mt-2">
          <Link to="/" className="block text-gray-300 hover:text-white px-4 py-2 transition duration-200">
            Search
          </Link>
          <Link to="/watchlist" className="block text-gray-300 hover:text-white px-4 py-2 transition duration-200">
            Watchlist
          </Link>
          {user ? (
            <button
              onClick={logout}
              className="block w-full text-red-500 hover:text-white px-4 py-2 transition duration-200 text-left"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/signup" className="block bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200 mb-1">
                Sign Up
              </Link>
              <Link to="/login" className="block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
                Login
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
