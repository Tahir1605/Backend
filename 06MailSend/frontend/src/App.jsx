import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const App = () => {
  const [name , setName] = useState('');
  const [email , setEmail] = useState('');
  const [message , setMessage] = useState('')

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  console.log(backendUrl);
  

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      const response = await axios.post(backendUrl + "/api/email/sendEmail",{name,email,message})
      if(response.data.success){
        toast.success("Email Send SuccessFully")
        setName("")
        setEmail("")
        setMessage("")
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      toast.error(error.message)
      
    }
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Contact Us
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            />
          </div>

          {/* Message Field */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows="4"
              placeholder="Write your message..."
              className="w-full rounded-lg border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
      <ToastContainer position='top-left' autoClose={3000} />
    </div>
  );
};

export default App;
