import React from 'react';
import { NavLink } from 'react-router-dom';
function InfoForm() {
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(null);
  const [info, setInfo] = React.useState({
    name: '',
    email: '',
    mobile: '',
    image: null,
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInfo({
      ...info,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    setInfo({
      ...info,
      image: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', info.name);
    formData.append('email', info.email);
    formData.append('mobile', info.mobile);
    formData.append('image', info.image);

    try {
      const response = await fetch('http://localhost:3000/api/student-register', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        // alert('Student registered successfully!');
        // console.log(data);
        setSuccess(data.message || 'User registered successfully!');
        setError(null);


        setInfo({
          name: '',
          email: '',
          mobile: '',
          image: null
        }); // Reset form

        setTimeout(() => setSuccess(null), 5000);
      } else {
        setError(data.message || 'Something went wrong');
        setSuccess(null);
      }
    } catch (err) {
      // console.error(err);
      // alert('Error submitting form');
      setError('An error occurred while trying to register.');
      setSuccess(null);
    }
  };


  return (
    <div className="min-h-screen bg-gray-900 px-4 pt-24 flex items-start justify-center z-0">
      <div className="w-full max-w-md bg-white/5 backdrop-blur-md border border-gray-700 rounded-xl shadow-2xl p-8 text-white mb-5">
        <h1 className="text-3xl font-bold text-center mb-3">Student Info</h1>

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

        <form className="space-y-5" onSubmit={handleSubmit} autoComplete="off" encType='multipart/form-data'>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              autoComplete="new-password" // trick to avoid autofill
              value={info.name}
              onChange={(e) => setInfo({ ...info, name: e.target.value })}
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
              value={info.email}
              onChange={handleInput}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
            />
          </div>

          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-300 mb-1">
              Mobile
            </label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              placeholder="Enter your mobile number"
              autoComplete="off"
              value={info.mobile}
              onChange={handleInput}
              className="w-full px-4 py-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Upload Image
            </label>

            <div className="relative flex items-center justify-between bg-gray-700 rounded-lg px-4 py-3 cursor-pointer hover:bg-gray-600 transition duration-200">
              <label
                htmlFor="image"
                className="text-white font-medium cursor-pointer"
              >
                Choose File
              </label>
              <span className="text-sm text-gray-400 truncate ml-4">
                {info.image ? info.image.name : "No file selected"}
              </span>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer bg-red-600 hover:bg-red-700 transition duration-200 text-white py-2 rounded-lg font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default InfoForm;
