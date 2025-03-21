import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const AdsSection = ({ ads }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [formData, setFormData] = useState({
    upload_cv: null,
  });

  const [showModal, setShowModal] = useState(false);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?._id) return;

      try {
        const response = await API.get(`/api/user/${user._id}`);
        const getData = response.data;
        setFormData({
          upload_cv: getData.upload_cv ? BASE_URL + getData.upload_cv : null,
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [user]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  // Submit the application
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formDataToSend = {
        userId: user._id,
        postId: post._id,
        clubId: post.userId,
      };

      // First API call: Apply for post
      await API.post(`${BASE_URL}/api/post-apply`, formDataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Check if a new CV file is selected
      if (formData.upload_cv && formData.upload_cv instanceof File) {
        const formDataToSendCv = new FormData();
        formDataToSendCv.append("upload_cv", formData.upload_cv);

        // Second API call: Upload CV (Only if file is selected)
        await API.put(`${BASE_URL}/api/user/${user._id}`, formDataToSendCv, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      toast.success("Post Applied Successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setShowModal(false);
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
  const openModal = (ad) => {
    setPost(ad);
    setShowModal(true);
  };
  // Close modal
  const closeModal = () => {
    setShowModal(false);
    setPost(null);
  };

  // Animation Variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.3 },
    },
  };

  if (!ads || ads.length === 0) return <div>No Ads Available</div>;

  return (
    <motion.section
      className="py-12 md:py-16 bg-gray-50 px-4 sm:px-6 lg:px-8"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Title Animation */}
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Recent Ads
        </motion.h2>
        {showModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Apply for {post.position}
              </h3>
              {formData.upload_cv && (
                <div className="mb-4">
                  <p className="text-gray-700">Previously Uploaded CV:</p>
                  <a
                    href={formData.upload_cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View CV
                  </a>
                </div>
              )}

              <div className="mb-4">
                <label className="block text-gray-700">
                  Upload New CV{" "}
                  {formData.upload_cv ? "(Optional)" : "(Required)"}
                </label>
                <input
                  type="file"
                  name="upload_cv"
                  onChange={handleFileChange}
                  className="mt-2"
                  required={!formData.upload_cv}
                />
              </div>

              <div className="flex justify-end gap-4">
                <button
                  onClick={closeModal}
                  className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  disabled={loading}
                >
                  {loading ? "Apply..." : "Apply"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ads Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {ads.map((ad, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex justify-center mb-4">
                <motion.img
                  src={BASE_URL + ad.image}
                  alt={ad.title}
                  className="object-cover h-36 sm:h-40 md:h-48 lg:h-56 w-full rounded-md"
                  whileHover={{ scale: 1.1 }}
                />
              </div>

              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                {ad.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base mb-3">
                {ad.description}
              </p>

              {/* Posted Date */}
              <p className="text-gray-500 text-xs sm:text-sm mb-3">
                Posted on: {new Date(ad.createdAt).toLocaleDateString()}
              </p>

              {/* Card Footer */}
              <div className="flex justify-between items-center mt-4">
                <a
                  href={"ads/" + ad.slug}
                  className="flex items-center gap-2 text-blue-600 border border-blue-600 px-3 py-1.5 text-xs sm:text-sm rounded-lg hover:bg-blue-600 hover:text-white transition"
                >
                  <span>See More</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
                {isLoggedIn ? (
                  <Link
                    onClick={() => openModal(ad)}
                    className="bg-blue-600 text-white text-xs sm:text-sm px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
                  >
                    Apply Now
                  </Link>
                ) : (
                  <Link
                    to={"/login"}
                    className="bg-blue-600 text-white text-xs sm:text-sm px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
                  >
                    Register
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* "See All Ads" Button Animation */}
        <motion.div
          className="mt-6 md:mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <a
            href="/ads"
            className="inline-block px-5 py-2 md:px-6 md:py-3 text-base md:text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300"
          >
            See All Ads
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AdsSection;
