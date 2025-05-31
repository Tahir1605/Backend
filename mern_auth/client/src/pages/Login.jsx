import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';


function Login() {

    const navigate = useNavigate()

    const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContent)

    const [state, setState] = useState('Sign Up');

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            axios.defaults.withCredentials = true

            if (state === 'Sign Up') {
                const { data } = await axios.post(backendUrl + '/api/auth/register', { name, email, password })

                if (data.success) {
                    setIsLoggedin(true)
                    getUserData()
                    navigate('/')
                }
                else {
                    toast.error(data.message)
                }
            } else {
                const { data } = await axios.post(backendUrl + '/api/auth/login', { email, password })

                if (data.success) {
                    setIsLoggedin(true)
                    getUserData()
                    navigate('/')
                }
                else {
                    toast.error(data.message)
                }

            }

        } catch (error) {
            toast.error(error.message)

        }
    }


    return (
        <div className='flex flex-col items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400 relative'>
            <img
                onClick={() => navigate('/')}
                src={assets.logo}
                alt="Logo"
                className='absolute left-5 sm:left-20 top-5 sm:w-32 w-20 cursor-pointer'
            />
            <div className='bg-white shadow-lg rounded-xl p-8 sm:w-[400px] w-full'>
                <h2 className='text-2xl font-bold text-center text-gray-800 mb-1'>
                    {state === 'Sign Up' ? 'Create Account' : 'Login'}
                </h2>
                <p className='text-center text-sm text-gray-600 mb-6'>
                    {state === 'Sign Up' ? 'Create your account to get started' : 'Login to your account'}
                </p>

                <form onSubmit={handleSubmit} className='space-y-4'>
                    {state === 'Sign Up' && (
                        <div className='flex items-center gap-3 w-full px-5 py-3 rounded-full bg-gray-100'>
                            <img src={assets.person_icon} alt="" className="w-5 h-5" />
                            <input
                                type="text"
                                name="name"
                                placeholder="Full Name"
                                required
                                value={name}
                                onChange={e => setName(e.target.value)}
                                className="bg-transparent outline-none w-full text-sm"

                            />
                        </div>
                    )}
                    <div className='flex items-center gap-3 w-full px-5 py-3 rounded-full bg-gray-100'>
                        <img src={assets.mail_icon} alt="" className="w-5 h-5" />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="bg-transparent outline-none w-full text-sm"
                        />
                    </div>
                    <div className='flex items-center gap-3 w-full px-5 py-3 rounded-full bg-gray-100'>
                        <img src={assets.lock_icon} alt="" className="w-5 h-5" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="bg-transparent outline-none w-full text-sm"
                        />
                    </div>

                    {/* Forgot Password */}
                    {state === 'Login' && (
                        <div className='text-right text-sm'>
                            <button
                                type="button"
                                onClick={() => navigate('/reset-password')}
                                className='text-blue-600 hover:underline font-medium'
                            >
                                Forgot Password?
                            </button>
                        </div>
                    )}

                    <button
                        type="submit"
                        className='w-full py-3 text-white bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300'
                    >
                        {state === 'Sign Up' ? 'Sign Up' : 'Login'}
                    </button>
                </form>

                <p className='text-sm text-center mt-6'>
                    {state === 'Sign Up' ? 'Already have an account?' : 'Don\'t have an account?'}{' '}
                    <span
                        className='text-blue-600 cursor-pointer font-medium'
                        onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
                    >
                        {state === 'Sign Up' ? 'Login here' : 'Sign Up'}
                    </span>
                </p>
            </div>
        </div>
    );
}

export default Login;
