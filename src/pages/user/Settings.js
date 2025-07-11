import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../components/user/Sidebar";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../../api";
import { AuthContext } from "../../context/AuthContext";
import { CountryContext } from "../../context/CountryContext";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
    country: "",
    password: "",
    confirmPassword: "",
    currentPassword: "",
    profilePicture: null, //
    upload_cv: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { countries } = useContext(CountryContext);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?._id) return;

      try {
        const response = await API.get(`/api/user/${user._id}`);
        const getData = response.data;

        setFormData({
          first_name: getData.first_name || "",
          last_name: getData.last_name || "",
          email: getData.email || "",
          phone: getData.phone || "",
          country: getData.country || "",
          dob: getData.dob || "",
          profilePicture: getData.profile ? BASE_URL + getData.profile : null,
          upload_cv: getData.upload_cv ? BASE_URL + getData.upload_cv : null,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [user]);

  const handleTabChange = (tab) => setActiveTab(tab);

  const validate = () => {
    const newErrors = {};

    // Validation similar to the registration form, adjust based on whether it's password change or profile update
    if (activeTab === "profile") {
      if (!formData.first_name.trim()) {
        newErrors.first_name = "First Name is required.";
      }
      if (!formData.last_name.trim()) {
        newErrors.last_name = "Last Name is required.";
      }
      if (!formData.email.trim()) {
        newErrors.email = "Email is required.";
      }
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required.";
      }
      if (!formData.dob.trim()) {
        newErrors.dob = "DOB number is required.";
      }
      if (!formData.country) {
        newErrors.country = "Please select a country.";
      }
      if (!formData.upload_cv) newErrors.upload_cv = "Upload CV is required.";
    }
    if (activeTab === "password") {
      if (!formData.currentPassword) {
        newErrors.currentPassword = "Current password is required.";
      }
      if (!formData.password) {
        newErrors.password = "New password is required.";
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

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleChange = (e) => {
    if (e.target.name === "profilePicture") {
      const file = e.target.files[0];
      setFormData({ ...formData, profilePicture: file });
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const formDataToSend = new FormData();
      if (activeTab === "profile") {
        // Append text fields
        formDataToSend.append("first_name", formData.first_name);
        formDataToSend.append("last_name", formData.last_name);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("phone", formData.phone);
        formDataToSend.append("country", formData.country);

        // Append file only if it's selected
        if (formData.profilePicture instanceof File) {
          formDataToSend.append("profile", formData.profilePicture);
        }

        // Append file only if it's selected
        if (formData.upload_cv instanceof File) {
          formDataToSend.append("upload_cv", formData.upload_cv);
        }

        await API.put(`${BASE_URL}/api/user/${user._id}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("User Updated Successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
      }
      if (activeTab === "password") {
        // Only include password if it's not empty
        if (formData.password.trim() !== "") {
          formDataToSend.append("password", formData.password);
        }

        await API.put(`${BASE_URL}/api/user/${user._id}`, formDataToSend, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Password Changed Successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setFormData({
          password: "",
          confirmPassword: "",
          currentPassword: "",
        });
      }

      setErrors({});
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update failed. Try again.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      setLoading(false);
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

          {/* Tab Navigation */}
          <div className="mt-4">
            <div className="flex border-b border-gray-300">
              <button
                className={`py-2 px-4 ${
                  activeTab === "profile"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => handleTabChange("profile")}
              >
                Profile
              </button>
              <button
                className={`py-2 px-4 ${
                  activeTab === "password"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
                onClick={() => handleTabChange("password")}
              >
                Change Password
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white shadow-lg rounded-lg p-6 mt-4 max-w-3xl mx-auto w-full">
            {activeTab === "profile" && (
              <form onSubmit={handleSubmit} noValidate>
                {/* Profile Picture */}
                <div className="mb-6 flex flex-col items-center">
                  <div className="relative w-32 h-32">
                    <label htmlFor="profilePicture" className="cursor-pointer">
                      <img
                        src={
                          preview ||
                          formData.profilePicture ||
                          "/common/man.png"
                        }
                        alt="Profile Preview"
                        className="w-32 h-32 rounded-full object-cover border shadow-md"
                      />
                      <span className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md">
                        <i className="fas fa-camera"></i>
                      </span>
                    </label>
                    <input
                      type="file"
                      id="profilePicture"
                      name="profilePicture"
                      accept="image/*"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </div>
                  <p className="text-gray-500 text-sm mt-2">
                    Click to upload a profile picture
                  </p>
                </div>

                {/* Name Fields (First Name and Last Name) */}
                <div className="flex space-x-4 mb-4">
                  {/* First Name Field */}
                  <div className="w-1/2">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={formData.first_name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg ${
                        errors.first_name ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring focus:ring-blue-300`}
                      placeholder="Enter your first name"
                    />
                    {errors.first_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.first_name}
                      </p>
                    )}
                  </div>

                  {/* Last Name Field */}
                  <div className="w-1/2">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={formData.last_name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg ${
                        errors.last_name ? "border-red-500" : "border-gray-300"
                      } focus:outline-none focus:ring focus:ring-blue-300`}
                      placeholder="Enter your last name"
                    />
                    {errors.last_name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.last_name}
                      </p>
                    )}
                  </div>
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
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
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
                    placeholder="+33 9876543210"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* dob Field */}
                <div className="mb-4">
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    DOB <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.dob ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter your dob number"
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
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

                {/* Upload Cv */}
                <div className="mb-4">
                  <label className="block text-gray-700 font-medium mb-2">
                    Upload Cv <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    // accept="image/*"
                    name="upload_cv"
                    onChange={handleFileChange}
                    className={`w-full p-3 border ${
                      errors.upload_cv ? "border-red-500" : "border-gray-300"
                    } rounded-lg`}
                  />
                  {errors.upload_cv && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.upload_cv}
                    </p>
                  )}
                  {user.upload_cv?.endsWith(".pdf") ? (
                    <iframe
                      src={formData.upload_cv}
                      className="w-full h-96 mx-auto my-4 border"
                      title="CV Preview"
                    />
                  ) : (
                    <img
                      src={formData.upload_cv}
                      alt={`${formData.first_name}`}
                      className="w-48 h-24 rounded-full mx-auto my-4"
                    />
                  )}
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Save Changes..." : "Save Changes"}
                </button>
              </form>
            )}

            {activeTab === "password" && (
              <form onSubmit={handleSubmit} noValidate>
                {/* Current Password */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg ${
                      errors.password ? "border-red-500" : "border-gray-300"
                    } focus:outline-none focus:ring focus:ring-blue-300`}
                    placeholder="Enter your current password"
                  />
                  {errors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.currentPassword}
                    </p>
                  )}
                </div>

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

                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg"
                  disabled={loading}
                >
                  {loading ? "Change Password..." : "Update"}
                </button>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
