import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted:", formData);
      alert("Login successful!");
      setFormData({ email: "", password: "" });
      setErrors({});
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="flex flex-col lg:flex-row w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="w-full lg:w-1/2 bg-blue-600 text-white p-8 flex flex-col justify-center"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-lg mb-6">
            Log in to your account to access exclusive content and manage your
            settings.
          </p>
          <img
            src="/about/login.jpg"
            alt="Login Illustration"
            className="mt-4 rounded-lg w-full object-cover"
          />
        </motion.div>

        <motion.div
          className="w-full lg:w-1/2 p-8"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl text-blue-600 font-bold text-center mb-6">
            Login
          </h2>
          <form onSubmit={handleSubmit} noValidate>
            <motion.div
              className="mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring focus:ring-blue-300`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </motion.div>

            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } focus:outline-none focus:ring focus:ring-blue-300`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </motion.div>

            <motion.button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Login
            </motion.button>
          </form>
          <div className="mt-4 text-center">
            <p>Or login with:</p>
            <motion.div
              className="flex justify-center space-x-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Facebook Login Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center bg-blue-700 text-white py-1 px-2 rounded w-20 h-10 hover:bg-blue-800 transition duration-300"
              >
                <i className="fab fa-facebook-f text-xl"></i>
              </motion.button>

              {/* X (Twitter) Login Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center bg-black text-white py-1 px-2 rounded w-20 h-10 hover:bg-gray-900 transition duration-300"
              >
                <i className="fab fa-x-twitter text-xl"></i>
              </motion.button>

              {/* Instagram Login Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 text-white py-1 px-2 rounded w-20 h-10 hover:opacity-90 transition duration-300"
              >
                <i className="fab fa-instagram text-xl"></i>
              </motion.button>
            </motion.div>
          </div>

          <p className="text-center mt-2">
            Don't have an account? &nbsp;
            <Link to="/register" className="text-blue-600">
              Sign Up
            </Link>
          </p>
          <p className="text-center mt-2">
            Go to &nbsp;
            <Link to="/user/dashboard" className="text-blue-600">
              User Dashboard
            </Link>
          </p>
          <br />
          <p className="text-center mt-2">
            Go to &nbsp;
            <Link to="/club/dashboard" className="text-blue-600">
              Club Dashboard
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LoginForm;
