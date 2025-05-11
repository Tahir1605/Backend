import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Lognav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='fixed top-0 left-0 w-full bg-gray-800 text-white z-50 shadow-md'>
      <div className='max-w-7xl mx-auto flex justify-between items-center px-6 py-4'>

        {/* Left: Heading */}
        <h1 className='text-2xl font-bold tracking-wide'>
          Nav<span className='text-red-500'>bar</span>
        </h1>

        {/* Right: Desktop Menu */}
        <ul className='hidden lg:flex space-x-6 items-center'>
          <li>
            <NavLink
              to='/'
              className={({ isActive }) =>
                `px-4 py-2 rounded-md font-medium transition duration-200 ${isActive ? 'text-red-500 bg-gray-700' : 'hover:text-blue-400'}`
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/signup'
              className={({ isActive }) =>
                `px-4 py-2 rounded-md font-medium transition duration-200 ${isActive ? 'text-red-500 bg-gray-700' : 'hover:text-blue-400'}`
              }
            >
              Signup
            </NavLink>
          </li>
        </ul>

        {/* Hamburger Button (Mobile only) */}
        <button
          className='lg:hidden focus:outline-none'
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className='w-7 h-7'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            {isMenuOpen ? (
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            ) : (
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='lg:hidden bg-gray-900 px-6 pb-4 pt-2 shadow-md rounded-b-lg'>
          <ul className='space-y-4'>
            <li>
              <NavLink
                to='/'
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md font-medium transition duration-200 ${isActive ? 'text-red-500 bg-gray-700' : 'hover:text-blue-400 hover:bg-gray-800'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/signup'
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md font-medium transition duration-200 ${isActive ? 'text-red-500 bg-gray-700' : 'hover:text-blue-400 hover:bg-gray-800'}`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Signup
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Lognav;
