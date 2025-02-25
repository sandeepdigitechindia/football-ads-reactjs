import React, { useState } from "react";
import { jwtDecode } from "jwt-decode";
import Sidebar from "../../components/club/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const PostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
    position: "",
    salary: "",
    location: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.image) newErrors.image = "Image is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.position.trim()) newErrors.position = "Position is required.";
    if (!formData.salary.trim()) newErrors.salary = "Salary is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    return newErrors;
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const token = localStorage.getItem("token");
  let userId = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userId = decodedToken.id;
    } catch (error) {
      console.error("Invalid token", error);
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      // Creating FormData to send files
      const data = new FormData();
      data.append("title", formData.title);
      data.append("image", formData.image);
      data.append("description", formData.description);
      data.append("position", formData.position);
      data.append("salary", formData.salary);
      data.append("location", formData.location);
      data.append("userId", userId);

      await API.post(`${BASE_URL}/api/club/posts`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/club/posts");
      toast.success("Post Created Successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setFormData({
        title: "",
        image: null,
        description: "",
        position: "",
        salary: "",
        location: "",
      });
      setErrors({});
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Post creation failed. Try again.",
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
          <header className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Posts</h1>
            <Link
              to={"/club/posts"}
              className="py-2 px-6 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              &#8592; Back
            </Link>
          </header>
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Create Job Post
            </h1>
            <form onSubmit={handleSubmit}>
              {/* Title */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Image */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className={`w-full p-3 border ${
                    errors.image ? "border-red-500" : "border-gray-300"
                  } rounded-lg`}
                />
                {errors.image && (
                  <p className="text-red-500 text-sm mt-1">{errors.image}</p>
                )}
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.description ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  rows="4"
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Position */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.position ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.position && (
                  <p className="text-red-500 text-sm mt-1">{errors.position}</p>
                )}
              </div>

              {/* Salary */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Salary
                </label>
                <input
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.salary ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.salary && (
                  <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
                )}
              </div>

              {/* Location */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.location ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
                disabled={loading}
              >
                {loading ? "Create Post Post..." : "Create Post Post"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PostForm;
