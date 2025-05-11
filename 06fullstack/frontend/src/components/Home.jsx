import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function Home() {
  const [username, setUsername] = useState('');
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    image: null,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = jwtDecode(token);
        setUsername(user.username);
      } catch (err) {
        console.error('Invalid token');
      }
    }

    axios.get('http://localhost:3000/api/students')
      .then(res => setStudents(res.data))
      .catch(err => console.error('Error fetching students:', err));
  }, []);

  const handleUpdate = (id) => {
    const student = students.find(s => s._id === id);
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      mobile: student.mobile,
      image: null,
    });
    setError('');
    setSuccess('');
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:3000/api/students-delete/${id}`);
        setStudents(prev => prev.filter(s => s._id !== id));
      } catch (error) {
        console.error('Error deleting student:', error);
      }
    }
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData(prev => ({ ...prev, image: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedStudent) return;

    const updatedData = new FormData();
    updatedData.append('name', formData.name);
    updatedData.append('email', formData.email);
    updatedData.append('mobile', formData.mobile);
    if (formData.image) {
      updatedData.append('image', formData.image);
    }

    try {
      await axios.put(`http://localhost:3000/api/students-update/${selectedStudent._id}`, updatedData);
      const response = await axios.get('http://localhost:3000/api/students');
      setStudents(response.data);
      setError('');
      setSuccess('Student updated successfully!');
      setTimeout(() => {
        setShowModal(false);
        setSuccess('');
      }, 2000);
    } catch (error) {
      const msg = error.response?.data?.message || 'Something went wrong during update.';
      setError(msg);
      setSuccess('');
    }
  };

  return (
    <div className="mt-24 px-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl text-white font-bold text-center mb-4">
          {username ? `Welcome, ${username} !` : 'Home Page'}
        </h1>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="min-w-[600px] w-full bg-gray-900 text-white shadow-md rounded-lg overflow-hidden text-sm sm:text-base">
          <thead>
            <tr className="bg-gray-800 text-gray-300 uppercase text-xs leading-normal">
              <th className="py-3 px-2 sm:px-4 text-left">Image</th>
              <th className="py-3 px-2 sm:px-4 text-left">Name</th>
              <th className="py-3 px-2 sm:px-4 text-left">Email</th>
              <th className="py-3 px-2 sm:px-4 text-left">Mobile</th>
              <th className="py-3 px-2 sm:px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student._id} className="border-b border-gray-700 hover:bg-gray-800">
                <td className="py-3 px-2 sm:px-4">
                  <img
                    src={`http://localhost:3000/uploads/${student.image}`}
                    alt={student.name}
                    className="w-10 h-10 rounded-full object-cover border border-gray-600"
                  />
                </td>
                <td className="py-3 px-2 sm:px-4 font-semibold">{student.name}</td>
                <td className="py-3 px-2 sm:px-4">{student.email}</td>
                <td className="py-3 px-2 sm:px-4">{student.mobile}</td>
                <td className="py-3 px-2 sm:px-4 text-center">
                  <div className="flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => handleUpdate(student._id)}
                      className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-3 py-2 rounded text-xs"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(student._id)}
                      className="bg-red-600 hover:bg-red-700 cursor-pointer text-white px-3 py-2 rounded text-xs"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {students.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-5 text-gray-500">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 overflow-auto">
          <div className="bg-gray-900 text-white rounded-lg shadow-lg p-6 sm:p-8 w-full max-w-md">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">Update Student</h2>

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

            <form onSubmit={handleFormSubmit} encType="multipart/form-data">
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-semibold">Mobile</label>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none"
                  required
                />
              </div>
              <div className="mb-6">
                <label className="block mb-1 font-semibold">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleFormChange}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded text-gray-400"
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setError('');
                    setSuccess('');
                  }}
                  className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
