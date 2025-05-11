import React from 'react'
import { NavLink } from 'react-router-dom'

function Lognav() {
  return (
     <div className='fixed flex justify-between items-center top-0 left-0 w-full  text-white p-4 bg-gray-800 z-10'>
     <h1 className='text-2xl font-bold'>Nav<span className='text-blue-500'>bar</span></h1>
      <ul>
        <li className='inline-block mr-4 px-3 py-1 rounded-md font-semibold'>
          <NavLink to='/' className={({isActive}) => isActive?"text-red-600":""}>Login</NavLink>
        </li>
        <li className='inline-block mr-4 px-3 py-1 rounded-md font-semibold'>
          <NavLink to='/signup' className={({isActive}) => isActive?"text-red-600":""}>Signup</NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Lognav