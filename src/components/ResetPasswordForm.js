import React, { useState } from "react";
import { Link,useNavigate,useParams, useLocation } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const ResetPasswordForm = () => {
  const [formData, setFormData] = useState({
    password: "",
  });

  const location = useLocation();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
 
  const validate = () => {
    const newErrors = {};

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

  const { token } = useParams(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/reset-password/${token}`, formData);

      navigate("/login");
      toast.success("Reset password link send successful!", {
        position: "top-right",
        autoClose: 3000,
      });
      setFormData({ password: ""});
      setErrors({});
    } catch (error) {
      toast.error(error.response?.data?.message || "Reset Password failed. Try again.", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-16">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Side - Image and Text */}
        <div className="w-full lg:w-1/2 bg-blue-600 text-white p-8 flex flex-col justify-center">
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-lg mb-6">
            Reset Password in to your account to access exclusive content and
            manage your settings.
          </p>
          <img
            src="/about/login.jpg" // Replace with your image path
            alt="Login Illustration"
            className="mt-4 rounded-lg w-full object-cover"
          />
        </div>

        {/* Right Side - Reset Password Form */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-2xl text-blue-600 font-bold text-center mb-6">
            Reset Password
          </h2>
          <form onSubmit={handleSubmit} noValidate>
            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password <span className="text-red-500">*</span>
              </label>
              <div className="flex relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg ${
                    errors.password ? "border-red-500" : "border-gray-300"
                  } focus:outline-none focus:ring focus:ring-blue-300`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700 absolute right-4 top-2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}
                  ></i>
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Accept Terms Checkbox */}
            <div className="mb-6">
              <Link to="/login" className="text-blue-600">
                Back to Login
              </Link>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordForm;
