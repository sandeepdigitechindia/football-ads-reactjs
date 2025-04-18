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
  const [appliedMap, setAppliedMap] = useState({});
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useContext(AuthContext);

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

  useEffect(() => {
    const fetchAppliedStatus = async () => {
      const map = {};

      for (let ad of ads) {
        try {
          const res = await API.get(`/api/user/posts/has-applied/${ad._id}`);
          map[ad._id] = res.data.applied;
        } catch (err) {
          console.error("Error checking applied:", err);
        }
      }
      setAppliedMap(map);
    };

    if (user && user.role === "player") {
      fetchAppliedStatus();
    }
  }, [ads, user]);

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
  const openModal = (ad) => {
    setPost(ad);
    setShowModal(true);
  };
  // Close modal
  const closeModal = () => {
    if (
      window.confirm(
        "You haven't uploaded a CV. Are you sure you want to apply without one?"
      )
    ) {
      handleSubmit(); // Apply without CV
    }
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
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Recent Ads
        </motion.h2>

        {showModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Apply for {post.position}
              </h3>

              {user.upload_cv && (
                <div className="mb-4">
                  <p className="text-gray-700">Previously Uploaded CV:</p>
                  <a
                    href={BASE_URL + user.upload_cv}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View CV
                  </a>
                </div>
              )}

              <div className="mb-4 text-left">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {ads.map((ad, index) => (
            <motion.div
              key={index}
              className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center gap-4"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-1/3 flex-shrink-0">
                <motion.img
                  src={BASE_URL + ad.image}
                  alt={ad.title}
                  className="object-cover h-32 sm:h-40 w-full rounded-md"
                  whileHover={{ scale: 1.1 }}
                />
              </div>

              <div className="w-2/3 text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 truncate">
                  {ad.userId.club_name}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-2">
                  <b>Country:</b> {ad.userId.country}
                </p>
                <p className="text-gray-600 text-sm sm:text-base mb-3">
                  <b>Published On:</b>{" "}
                  {new Date(ad.createdAt).toLocaleDateString()}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {isLoggedIn ? (
                    user?.role === "player" &&
                    (user?.isSubscription ? (
                      <>
                        <Link
                          to={`/ads/${ad.slug}`}
                          className="text-blue-600 border border-blue-600 px-3 py-1.5 text-xs sm:text-sm rounded-lg hover:bg-blue-600 hover:text-white transition"
                        >
                          Read More
                        </Link>
                        <button
                          onClick={() => openModal(ad)}
                          disabled={appliedMap[ad._id]}
                          className={`text-white text-sm px-4 py-2 rounded-lg transition ${
                            appliedMap[ad._id]
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-blue-600 hover:bg-blue-700"
                          }`}
                        >
                          {appliedMap[ad._id] ? "Applied" : "Apply Now"}
                        </button>
                      </>
                    ) : (
                      <>
                        <Link
                          to={`/ads/${ad.slug}`}
                          className="text-blue-600 border border-blue-600 px-3 py-1.5 text-xs sm:text-sm rounded-lg hover:bg-blue-600 hover:text-white transition"
                        >
                          Read More
                        </Link>
                        <Link
                          to={`/user/subscriptions?redirect=${encodeURIComponent(
                            window.location.pathname
                          )}`}
                          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                          Apply Now
                        </Link>
                      </>
                    ))
                  ) : (
                    <>
                      <Link
                        to={`/ads/${ad.slug}`}
                        className="text-blue-600 border border-blue-600 px-3 py-1.5 text-xs sm:text-sm rounded-lg hover:bg-blue-600 hover:text-white transition"
                      >
                        Read More
                      </Link>
                      <Link
                        to={`/login?redirect=${encodeURIComponent(
                          window.location.pathname
                        )}`}
                        className="bg-blue-600 text-white text-xs sm:text-sm px-3 py-1.5 rounded-lg hover:bg-blue-700 transition"
                      >
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <a
            href="/ads"
            className="inline-block px-6 py-3 text-base md:text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300"
          >
            See All Ads
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AdsSection;
