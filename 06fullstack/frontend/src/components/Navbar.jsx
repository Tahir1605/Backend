import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className='fixed flex justify-between items-center top-0 left-0 w-full text-white p-4 bg-gray-800 z-10'>
      <h1 className='text-2xl font-bold'>Nav<span className='text-blue-500'>bar</span></h1>
      <ul>
        <li className='inline-block mr-4 px-3 py-1 rounded-md font-semibold'>
          <NavLink to='/home' className={({ isActive }) => isActive ? "text-red-600" : ""}>Home</NavLink>
        </li>
        <li className='inline-block mr-4 px-3 py-1 rounded-md font-semibold'>
          <NavLink to='/info' className={({ isActive }) => isActive ? "text-red-600" : ""}>InfoForm</NavLink>
        </li>
        <li className='inline-block mr-4 px-3 py-1 rounded-md font-semibold'>
          <button onClick={handleLogout} className="text-blue-500 cursor-pointer hover:text-red-700 font-semibold">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
