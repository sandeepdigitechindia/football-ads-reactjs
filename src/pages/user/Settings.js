import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../components/user/Sidebar";
// Sample countries and roles
const countries = [
  "United States",
  "India",
  "Canada",
  "Australia",
  "United Kingdom",
];
const roles = ["Player", "Coach", "Agent", "Club"];

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    role: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isPasswordChange, setIsPasswordChange] = useState(false); // Toggle for password change

  const validate = () => {
    const newErrors = {};

    // Validation similar to the registration form, adjust based on whether it's password change or profile update

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }
    if (!formData.country) {
      newErrors.country = "Please select a country.";
    }
    if (!formData.role) {
      newErrors.role = "Please select a role.";
    }

    if (isPasswordChange) {
      // Password change validation
      if (!formData.password) {
        newErrors.password = "Password is required.";
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          formData.password
        )
      ) {
        newErrors.password =
          "Password must be at least 8 characters, include uppercase, lowercase, number, and special character.";
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password.";
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = "Passwords do not match.";
      }
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
      alert("Changes saved!");
      // Reset or update the form
      setFormData({
    
        name: "",
        email: "",
        phone: "",
        country: "",
        role: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      });
      setErrors({});
    }
  };

  return (
    <div className="bg-gray-100">
      {/* Wrapper for Sidebar and Main Content */}
      <div className="flex flex-col lg:flex-row">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* User Profile Header */}
          <header className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
          </header>

          <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white shadow-lg rounded-lg overflow-hidden">
            {/* Right Side - Profile Update and Password Change Form */}
            <div className="w-full p-8">
              <h2 className="text-2xl font-bold text-blue-600 text-center mb-6">
                {isPasswordChange ? "Change Password" : "Update Profile"}
              </h2>
              <form onSubmit={handleSubmit} noValidate>
                {/* Profile Update Fields */}
                {!isPasswordChange && (
                  <>
          

                    {/* Name Field */}
                    <div className="mb-4">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg ${
                          errors.name ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring focus:ring-blue-300`}
                        placeholder="Enter your name"
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Email Field */}
                    <div className="mb-4">
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
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div className="mb-4">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring focus:ring-blue-300`}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Country Dropdown */}
                    <div className="mb-4">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Country <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg ${
                          errors.country ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring focus:ring-blue-300`}
                      >
                        <option value="">Select your country</option>
                        {countries.map((country, index) => (
                          <option key={index} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                      {errors.country && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.country}
                        </p>
                      )}
                    </div>

                    {/* Role Dropdown */}
                    <div className="mb-4">
                      <label
                        htmlFor="role"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Role <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg ${
                          errors.role ? "border-red-500" : "border-gray-300"
                        } focus:outline-none focus:ring focus:ring-blue-300`}
                      >
                        <option value="">Select your role</option>
                        {roles.map((role, index) => (
                          <option key={index} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                      {errors.role && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.role}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {/* Change Password Fields */}
                {isPasswordChange && (
                  <>
                    {/* Password Field */}
                    <div className="mb-4">
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        New Password <span className="text-red-500">*</span>
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
                        placeholder="Enter new password"
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-6">
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Confirm Password <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg ${
                          errors.confirmPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:outline-none focus:ring focus:ring-blue-300`}
                        placeholder="Confirm new password"
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>
                  </>
                )}

                <div className="mb-6">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
              <div className="text-center">
                <Link
                  onClick={() => setIsPasswordChange(!isPasswordChange)}
                  className="text-blue-600 font-medium cursor-pointer"
                >
                  {isPasswordChange ? "Update Profile" : "Change Password"}
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
