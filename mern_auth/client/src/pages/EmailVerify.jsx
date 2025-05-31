import React, { useState, useRef, useContext, useEffect } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AppContent } from '../context/AppContext';
import { toast } from 'react-toastify';

const EmailVerify = () => {
  axios.defaults.withCredentials = true;
  const {backendUrl,isLoggedin,userData,getUserData} = useContext(AppContent)
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const inputsRef = useRef([]);
  const navigate = useNavigate();

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
    if (e.key === 'Backspace') {
      if (otp[index] === '') {
        if (index > 0) {
          inputsRef.current[index - 1].focus();
        }
      }
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

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const otpArray = inputsRef.current.map(e => e.value)
      const otp = otpArray.join('')

      const {data} = await axios.post(backendUrl+'/api/auth/verify-account',{otp})
      if(data.success){
        toast.success(data.message)
        getUserData()
        navigate('/')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
       toast.error(error.message)
    }
  }

  useEffect(()=>{
    isLoggedin && userData && userData.isAccountVerified && navigate('/')
  },[isLoggedin,userData])

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-200 via-purple-300 to-purple-400 relative">
      <img
        onClick={() => navigate('/')}
        src={assets.logo}
        alt=""
        className="absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer"
      />

      <form
       onSubmit={onSubmitHandler}
       className="bg-[#14131A] p-8 rounded-xl shadow-xl w-full max-w-sm text-center">
        <h2 className="text-white text-xl font-semibold mb-2">Email Verify OTP</h2>
        <p className="text-gray-300 mb-6 text-sm">Enter the 6-digit code sent to your email id.</p>

        <div className="flex justify-between mb-6">
          {otp.map((data, index) => (
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

        <button className="w-full py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold rounded-lg hover:opacity-90 transition">
          Verify email
        </button>
      </form>
    </div>
  );
};

export default EmailVerify;
