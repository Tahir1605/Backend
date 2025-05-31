import React, { useContext, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import { AppContent } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function ResetPassword() {
  const { backendUrl } = useContext(AppContent);
  axios.defaults.withCredentials = true;

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [password, setPassword] = useState('');

  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  const inputsRef = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (!/^\d{6}$/.test(pasteData)) return;

    const newOtp = pasteData.split('');
    setOtp(newOtp);
    newOtp.forEach((char, idx) => {
      if (inputsRef.current[idx]) {
        inputsRef.current[idx].value = char;
      }
    });
    inputsRef.current[5].focus();
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
   try {
    const {data} = await axios.post(backendUrl+'/api/auth/send-reset-otp',{email})
    data.success ? toast.success(data.message):toast.error(data.message)
    data.success && setIsEmailSent(true)    
   } catch (error) {
      toast.error(error.message)
   }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpArray = inputsRef.current.map(e => e.value)
    setOtp(otpArray.join(''))
    setIsOtpSubmitted(true)
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(backendUrl+'/api/auth/reset-password',{email,otp,newPassword:password})
      data.success ? toast.success(data.message) : toast.error(data.message)
      data.success && navigate('/login')
    } catch (error) {
      toast.error(error.message)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-300 to-purple-400 relative px-4">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt="Logo"
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      {/* Step 1: Email Form */}
      {!isEmailSent && (
        <div className="bg-[#111827] p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-white text-2xl font-semibold mb-2 text-center">Reset password</h2>
          <p className="text-gray-400 text-sm text-center mb-6">Enter your registered email address</p>

          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center">
                <img src={assets.mail_icon} alt="Email Icon" className="w-5 h-5 opacity-60" />
              </span>
              <input
                type="email"
                placeholder="Email id"
                className="w-full pl-10 pr-4 py-2 rounded-full bg-[#1f2937] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:opacity-90 transition"
            >
              Submit
            </button>
          </form>
        </div>
      )}

      {/* Step 2: OTP Form */}
      {isEmailSent && !isOtpSubmitted && (
        <form onSubmit={handleOtpSubmit} className="bg-[#14131A] p-8 rounded-xl shadow-xl w-full max-w-sm text-center">
          <h2 className="text-white text-xl font-semibold mb-2">Reset Password OTP</h2>
          <p className="text-gray-300 mb-6 text-sm">Enter the 6-digit code sent to your email id.</p>

          <div className="flex justify-between mb-6">
            {otp.map((_, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength="1"
                value={otp[index]}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                className="w-10 h-12 text-center rounded-md bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition"
          >
            Submit
          </button>
        </form>
      )}

      {/* Step 3: New Password Form */}
      {isOtpSubmitted && (
        <div className="bg-[#111827] p-8 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-white text-2xl font-semibold mb-2 text-center">New password</h2>
          <p className="text-gray-400 text-sm text-center mb-6">Enter a new Password below</p>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center">
                <img src={assets.lock_icon} alt="Password Icon" className="w-5 h-5 opacity-60" />
              </span>
              <input
                type="password"
                placeholder="New Password"
                className="w-full pl-10 pr-4 py-2 rounded-full bg-[#1f2937] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:opacity-90 transition"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default ResetPassword;
