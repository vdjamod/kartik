import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = ({ onLogin, role }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const isTeacher = role === 'teacher';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://sih-5.onrender.com/user/login', {
        email,
        password
      });

      console.log(res.data.user._id);

      if (res.data.token) {
        console.log('Login successful:', res.data);
        onLogin({ email, password });

        if (isTeacher) {
          navigate(`/teacher/${res.data.user._id}`);
        } else {
          navigate(`/student/${res.data.user._id}`);
        }
      } else {
        alert('Login failed. Invalid credentials.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        className={`max-w-md w-full p-8 rounded-lg shadow-lg ${isTeacher ? 'bg-teal-100' : 'bg-blue-100'}`}
      >
        <h2 className="text-3xl font-bold text-center mb-8">
          {isTeacher ? 'Teacher' : 'Student'} Login
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className={`text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full ${
              isTeacher ? 'bg-teal-500 hover:bg-teal-700' : 'bg-blue-500 hover:bg-blue-700'
            }`}
          >
            Login
          </button>
        </div>
        <div className="text-center mt-6">
          <a href="#" className="text-blue-500 hover:text-blue-700">
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
