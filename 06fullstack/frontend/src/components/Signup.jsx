import React from 'react';
import { NavLink } from 'react-router-dom';

function Signup() {
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);
  const [user, setUser] = React.useState({
    username: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message || 'User registered successfully!');
        setError(null);

        // Clear form
        setUser({
          username: '',
          email: '',
          phone: '',
          password: ''
        });

        // Remove success message after 5 seconds
        setTimeout(() => setSuccess(null), 5000);
      } else {
        setError(data.message || 'Something went wrong');
        setSuccess(null);
      }
    } catch (err) {
      setError('An error occurred while trying to register.');
      setSuccess(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 px-4 pt-24 flex items-start justify-center z-0">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-gray-700 rounded-xl shadow-2xl p-8 text-white mb-5">
        <h1 className="text-4xl font-bold text-center mb-2">Sign Up</h1>
        <p className="text-center text-gray-300 mb-6">
          Please fill in the form below to create your account.
        </p>

        {error && (
          <div className="bg-red-500 text-white text-sm p-3 mb-4 rounded-md text-center">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500 text-white text-sm p-3 mb-4 rounded-md text-center">
            {success}
          </div>
        )}

        <form className="space-y-5" onSubmit={handleSubmit}>
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
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="off"
              value={user.email}
              onChange={handleInput}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your phone number"
              autoComplete="off"
              value={user.phone}
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
            Create Account
          </button>
        </form>

        <p className="text-center text-sm font-semibold text-gray-400 mt-6">
          Already have an account?{' '}
          <NavLink to="/" className="text-red-400 hover:underline font-bold text-sm">
            Login
          </NavLink>
        </p>
      </div>
    </div>
  );
}

export default Signup;
