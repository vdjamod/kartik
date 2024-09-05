import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Import Link for navigation

const SignupForm = ({ onSignup }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isTeacher = role === "teacher";
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mobileNumberPattern = /^\d{10}$/;
    if (!mobileNumberPattern.test(mobileNumber)) {
      alert("Mobile number must be exactly 10 digits.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post("https://sih-5.onrender.com/user/signup", {
        name,
        role,
        email,
        mobile: mobileNumber,
        password,
      });

      console.log(res);

      if (isTeacher) {
        navigate(`/login/teacher`);
      } else {
        navigate(`/login/student`);
      }
    } catch (err) {
      console.log(err);
    }

    onSignup({ email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-3xl font-bold text-center mb-8">Sign Up</h2>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="role"
        >
          Role
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="" disabled>
            Select your role
          </option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="name"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="email"
        >
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
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="mobile"
        >
          Mobile Number
        </label>
        <input
          type="text"
          id="mobile"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
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
      <div className="mb-6">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Sign Up
        </button>
      </div>
      <p className="text-center text-gray-600 mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Log In
        </Link>
      </p>
    </form>
  );
};

export default SignupForm;
