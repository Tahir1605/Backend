import React, { useEffect } from 'react'
import {jwtDecode} from 'jwt-decode'

function Home() {
  const [username, setUsername] = React.useState('')
  useEffect(() => {
     const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = jwtDecode(token);
        setUsername(user.username);
      } catch (err) {
        console.error('Invalid token');
      }
    }
  },[])
  return (
    <div className='flex justify-center mt-20 h-screen'>
       <h1 className='text-3xl text-white font-bold'>
        {username ? `Welcome, ${username} !` : 'Home Page'}
       </h1>  
    </div>
  )
}

export default Home