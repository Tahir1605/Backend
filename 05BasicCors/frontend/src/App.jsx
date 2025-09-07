import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Signup from './components/Signup'
import Login from './components/Login'
import Logout from './components/Logout'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './components/ProtectedRoute'
const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element:
        <div>
          <ProtectedRoute>
            <Navbar />
            <Home />
          </ProtectedRoute>
        </div>
    },
    {
      path: '/signup',
      element:
        <div>
          <Navbar />
          <Signup />
        </div>
    },
    {
      path: '/login',
      element:
        <div>
          <Navbar />
          <Login />
        </div>
    },
    {
      path: '/logout',
      element:
        <div>
          <ProtectedRoute>
            <Logout />
          </ProtectedRoute>
        </div>
    }
  ])
  return (
    <div>
      <RouterProvider router={router} />
      <ToastContainer position='top-left' autoClose={3000} />
    </div>
  )
}
export default App