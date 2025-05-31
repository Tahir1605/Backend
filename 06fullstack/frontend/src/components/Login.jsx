import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Login() {
  const [user, setUser] = React.useState({
    username: '',
    password: ''
  });
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous error

    // Client-side validation
    if (!user.username || !user.password) {
      setError('Please enter both username and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Login failed. Please check your credentials.');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/home');

    } catch (err) {
      if (err.name === 'TypeError') {
        setError('Network error. Please check your internet connection.');
      } else {
        setError(err.message || 'Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 px-4 pt-24 flex items-start justify-center">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-gray-700 rounded-xl shadow-2xl p-8 text-white mb-5">
        <h1 className="text-4xl font-bold text-center mb-2">Login</h1>

        {/* Error message */}
        {error && (
          <div className="flex items-center bg-red-500 text-white text-sm p-3 mb-4 rounded-md shadow-md">
            <svg className="w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.63-1.14 1.06-2.06L13.06 4.94c-.57-.92-1.55-.92-2.12 0L3.022 16.94c-.57.92.006 2.06 1.06 2.06z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit} method='post'>
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              autoComplete="off"
              value={user.username}
              onChange={handleInput}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              autoComplete="off"
              value={user.password}
              onChange={handleInput}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-red-600 hover:bg-red-700 transition duration-200 text-white py-2 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm font-semibold text-gray-400 mt-6">
          Don't have an account?{' '}
          <NavLink to="/signup" className="text-red-400 hover:underline font-bold text-sm">
            Signup
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Login;
