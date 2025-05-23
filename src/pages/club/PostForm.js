import React, {  useEffect, useState, useContext } from "react";
import Sidebar from "../../components/club/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import API from "../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../../context/AuthContext";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const PostForm = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
    long_description: "",
    position: "",
    salary: "",
    location: "",
    club_idcard: null,
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user?.club_idcard) {
      setShowModal(true);
    }
  }, [user]);

  // Submit the application
  const handleIDCardSubmit = async () => {
    setLoading(true);
    try {
      // Check if a new club idcard file is selected
      if (formData.club_idcard && formData.club_idcard instanceof File) {
        const formDataToSendClubID = new FormData();
        formDataToSendClubID.append("club_idcard", formData.club_idcard);
        // Second API call: Upload Club ID Card (Only if file is selected)
        await API.put(
          `${BASE_URL}/api/club/${user._id}`,
          formDataToSendClubID,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      toast.success("Club ID Card Updated Successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setShowModal(false);
      await updateUser();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Submit failed. Try again.",
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      setLoading(false);
    }
  };
  // Open modal
  // const openModal = () => {
  //   if (!user?.club_idcard) {
  //     setShowModal(true);
  //   } else {
  //     alert("You already have a club ID card!");
  //   }
  // };
  // // Close modal
  // const closeModal = () => {
  //   setShowModal(false);
  // };

  const validate = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required.";
    if (!formData.image) newErrors.image = "Image is required.";
    if (!formData.description.trim())
      newErrors.description = "Description is required.";
    if (!formData.long_description.trim())
      newErrors.long_description = "Long Description is required.";
    if (!formData.position.trim()) newErrors.position = "Position is required.";
    if (!formData.salary.trim()) newErrors.salary = "Salary is required.";
    if (!formData.location.trim()) newErrors.location = "Location is required.";
    return newErrors;
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
      data.append("long_description", formData.long_description);
      data.append("position", formData.position);
      data.append("salary", formData.salary);
      data.append("location", formData.location);
      data.append("userId", user._id);

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
        long_description: "",
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
          {showModal && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                 Please Upload Your Club ID Card
                </h3>
                {user.club_idcard && (
                  <div className="mb-4">
                    <p className="text-gray-700">Previously Uploaded Club ID Card:</p>
                    <a
                      href={BASE_URL + user.club_idcard}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Club ID Card
                    </a>
                  </div>
                )}

                <div className="mb-4">
                  <label className="block text-gray-700">
                    Upload New Club ID Card{" "}
                    {user.club_idcard ? "(Optional)" : "(Required)"}
                  </label>
                  <input
                    type="file"
                    name="club_idcard"
                    onChange={handleFileChange}
                    className="mt-2"
                    required={!user.club_idcard}
                  />
                </div>

                <div className="flex justify-end gap-4">
                  {/* <button
                    onClick={closeModal}
                    className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button> */}
                  <button
                    onClick={handleIDCardSubmit}
                    className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    disabled={loading}
                  >
                    {loading ? "Update..." : "Update"}
                  </button>
                </div>
              </div>
            </div>
          )}
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
                  name="image"
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

              {/* Long Description */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Long Description
                </label>
                {/* <CKEditor
                  editor={ClassicEditor}
                  data={formData.long_description}
                  config={ {
                    licenseKey: process.env.REACT_APP_CKEDITOR_LICENSE_KEY,
                 
                } }
                  onChange={(event, editor) => {
                    const content = editor.getData();
                    setFormData({ ...formData, long_description: content });
                  }}
                /> */}
                <textarea
                  name="long_description"
                  value={formData.long_description}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.long_description
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  rows="4"
                ></textarea>
                {errors.long_description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.long_description}
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
