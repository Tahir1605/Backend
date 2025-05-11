import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Notfound from './components/Notfound'
import Signup from './components/Signup'
import Login from './components/Login'
import Home from './components/Home'
import Lognav from './components/Lognav'
import ProtectedRoute from './components/ProtectedRoute'
import LoginProtected from './components/LoginProtected'
import InfoForm from './components/InfoForm'


function App() {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element:
        <LoginProtected>
           <div>
            <Lognav />
            <Login />
          </div>,
        </LoginProtected>,
         
      },
      {
        path: '/home',
        element:
          <ProtectedRoute>
            <div>
              <Navbar />
              <Home />
            </div>,
          </ProtectedRoute>,
      },
      {
        path: '/info',
        element:
        <ProtectedRoute>
          <div>
            <Navbar />
            <InfoForm />
          </div>,
        </ProtectedRoute>
      },
      {
        path: 'Signup',
        element:
        <LoginProtected>
          <div>
            <Lognav />
            <Signup />
          </div>,
        </LoginProtected>
      },
      {
        path: '*',
        element:
          <div>
            <Notfound />
          </div>,
      }
    ]
  )

  return (
    <div className='bg-gray-900 text-white h-screen'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App