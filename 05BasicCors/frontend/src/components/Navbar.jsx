
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const Navbar = () => {
    const navigate = useNavigate() 

    const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const protectHome = () => {
    const getToken = JSON.parse(localStorage.getItem("token"));
    if(!getToken){
        toast.error("Please Login !")
    }
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        {/* Logo / Brand */}
        <a href="/" className="flex items-center space-x-2">
          <span className="self-center text-2xl font-bold whitespace-nowrap text-blue-600">
            MyApp
          </span>
        </a>

        {/* Menu items */}
        <div className="flex space-x-6">
          <Link to='/'
            onClick={protectHome}
            className="text-gray-700 font-bold hover:text-blue-600 transition-colors"
          >
            Home
          </Link>
          <Link to='/login'
            
            className="text-gray-700 font-bold hover:text-blue-600 transition-colors"
          >
            Login
          </Link>
          <Link to='/signup'
            className="text-gray-700 font-bold hover:text-blue-600 transition-colors"
          >
            Signup
          </Link>
          <Link to='/logout'
            onClick={logout}
            className="text-gray-700 font-bold hover:text-blue-600 transition-colors"
          >
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
