import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className='fixed top-0 left-0 w-full bg-gray-800 text-white z-10 shadow-lg'>
      <div className='flex justify-between items-center px-6 py-4'>
        <h1 className='text-2xl font-bold'>
          Nav<span className='text-red-500'>bar</span>
        </h1>

        {/* Hamburger Button for Mobile */}
        <button
          className='md:hidden text-white focus:outline-none'
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className='w-7 h-7'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            {isOpen ? (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            ) : (
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            )}
          </svg>
        </button>

        {/* Desktop Navigation */}
        <ul className='hidden md:flex space-x-6 items-center'>
          <li>
            <NavLink
              to='/home'
              className={({ isActive }) =>
                `px-4 py-2 rounded-md font-medium transition-colors duration-200 ${isActive ? 'text-red-500 bg-gray-700' : 'hover:text-blue-400'
                }`
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/info'
              className={({ isActive }) =>
                `px-4 py-2 rounded-md font-medium transition-colors duration-200 ${isActive ? 'text-red-500 bg-gray-700' : 'hover:text-blue-400'
                }`
              }
            >
              InfoForm
            </NavLink>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className='bg-red-600 cursor-pointer hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold transition duration-200 shadow-md'
            >
              Logout
            </button>
          </li>
        </ul>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <ul className='md:hidden bg-gray-900 px-4 pt-2 pb-4 rounded-b-lg shadow-lg space-y-3'>
          <li>
            <NavLink
              to='/home'
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md font-medium transition-all duration-200 ${isActive ? 'text-red-500 bg-gray-700' : 'hover:bg-gray-800 hover:text-blue-400'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to='/info'
              className={({ isActive }) =>
                `block px-4 py-2 rounded-md font-medium transition-all duration-200 ${isActive ? 'text-red-500 bg-gray-700' : 'hover:bg-gray-800 hover:text-blue-400'
                }`
              }
              onClick={() => setIsOpen(false)}
            >
              InfoForm
            </NavLink>
          </li>
          <li>
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className='block w-full text-left bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md font-semibold transition duration-200 shadow-md'
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default Navbar;
