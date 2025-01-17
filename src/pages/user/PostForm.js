import React, { useState } from "react";

const PostForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
    position: "",
    salary: "",
    location: "",
    company: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.image) newErrors.image = "Image is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.position.trim()) newErrors.position = "Position is required.";
    if (!formData.salary.trim()) newErrors.salary = "Salary is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    if (!formData.company.trim()) newErrors.company = "Company is required.";
    return newErrors;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      console.log("Job Post Data:", formData);
      alert("Job post created successfully!");
      // Reset form
      setFormData({
        title: "",
        image: null,
        description: "",
        position: "",
        salary: "",
        location: "",
        company: "",
      });
      setErrors({});
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Job Post</h1>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
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
          <label className="block text-gray-700 font-medium mb-2">Image</label>
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
            onChange={handleInputChange}
            className={`w-full p-3 border ${
              errors.description ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
            rows="4"
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>

        {/* Position */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Position</label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
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
          <label className="block text-gray-700 font-medium mb-2">Salary</label>
          <input
            type="text"
            name="salary"
            value={formData.salary}
            onChange={handleInputChange}
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
          <label className="block text-gray-700 font-medium mb-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className={`w-full p-3 border ${
              errors.location ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>

        {/* Company */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            className={`w-full p-3 border ${
              errors.company ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.company && (
            <p className="text-red-500 text-sm mt-1">{errors.company}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
        >
          Create Job Post
        </button>
      </form>
    </div>
  );
};

export default PostForm;
