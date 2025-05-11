import React from 'react'

function Notfound() {
  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gray-900 text-white'>
        <img src="https://cdn-icons-png.flaticon.com/512/149/149206.png" alt="404" className='w-28 h-24' />
        <h1 className='text-4xl text-center mt-20 font-bold'>404 Not Found</h1>
        <p className='text-center mt-4 font-semibold'>The page you are looking for does not exist.</p>
        <p className='text-center mt-2 font-semibold'>Please check the URL or return to the homepage.</p>
    </div>
  )
}

export default Notfound