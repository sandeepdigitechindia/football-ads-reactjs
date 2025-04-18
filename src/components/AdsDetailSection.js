import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import API from "../api";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const maskPhoneNumber = (phone) => {
  if (!phone) return "";
  return phone.slice(0, 2) + "****" + phone.slice(-2);
};

const maskEmail = (email) => {
  if (!email) return "";
  const [localPart, domain] = email.split("@");
  return localPart.slice(0, 3) + "****@" + domain;
};

const AdsDetailSection = ({ ads }) => {
  const [formData, setFormData] = useState({
    upload_cv: null,
    isSubscription: "",
  });
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [applied, setApplied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const { user, updateUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?._id) return;

      try {
        const response = await API.get(`/api/user/${user._id}`);
        const getData = response.data;
        setFormData({
          upload_cv: getData.upload_cv ? BASE_URL + getData.upload_cv : null,
          isSubscription: getData.isSubscription || "",
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
        try {
          const res = await API.get(`/api/user/posts/has-applied/${ads._id}`);
          setApplied(res.data.applied);
        } catch (err) {
          console.error("Error checking applied:", err);
        }
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
        postId: ads._id,
        clubId: ads.userId._id,
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

      setApplied(true);
      setShowModal(false);
      await updateUser();
      navigate("/user/posts");
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
  const openModal = () => {
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
  };

  // Limit description to first 100 characters
  const shortDesc = ads.userId.club_desc.slice(0, 100) + "...";

  // Animation Variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  if (!ads) return <div>No Ads Available</div>;
  return (
    <motion.section
      className="py-12 md:py-16 bg-gray-50 px-4 sm:px-6 lg:px-8"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section: Title & Description */}
        <div className="md:col-span-2">
          <div className="flex justify-center mb-4">
            <motion.img
              src={BASE_URL + ads.image}
              alt={ads.title}
              className="object-cover h-36 sm:h-40 md:h-48 lg:h-56 w-full rounded-md"
              whileHover={{ scale: 1.1 }}
            />
          </div>
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-gray-800 mb-4"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {ads.title}
          </motion.h2>
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
            {ads.description}
          </p>

          <div dangerouslySetInnerHTML={{ __html: ads.long_description }} />
        </div>

        {/* Right Section: Job Details Cards */}
        <motion.div
          className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 sticky top-4 self-start"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-3xl  p-6 sm:p-8 text-center">
            <motion.img
              src={BASE_URL + ads.userId.club_logo}
              alt={ads.userId.club_name}
              className="w-24 h-24 md:w-32 md:h-32 object-cover mx-auto rounded-full border border-gray-300 mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              {ads.userId.club_name}
            </h2>

            <p className="text-gray-700 text-base sm:text-lg">
              <span className="font-semibold">Country:</span>{" "}
              {ads.userId.country}
            </p>
            <p className="text-gray-700 text-base sm:text-lg">
              <span className="font-semibold">Listed On:</span>{" "}
              {new Date(ads.userId.createdAt).toLocaleDateString()}
            </p>
            {!isLoggedIn ||
            (user?.role === "player" && !user?.isSubscription) ? (
              <>
                <p className="text-gray-700 text-base sm:text-lg">
                  <span className="font-semibold">Phone:</span>{" "}
                  {maskPhoneNumber(ads.userId.phone)}
                </p>
                <p className="text-gray-700 text-base sm:text-lg">
                  <span className="font-semibold">Email:</span>{" "}
                  {maskEmail(ads.userId.email)}
                </p>
                <p className="text-red-500 text-base sm:text-lg mt-2">
                  🔒 Subscribe to view full contact details.
                </p>
              </>
            ) : user?.role === "player" && user?.isSubscription ? (
              <>
                <p className="text-gray-700 text-base sm:text-lg">
                  <span className="font-semibold">Phone:</span>{" "}
                  {ads.userId.phone}
                </p>
                <p className="text-gray-700 text-base sm:text-lg">
                  <span className="font-semibold">Email:</span>{" "}
                  {ads.userId.email}
                </p>
              </>
            ) : null}

            <div className="border-t border-gray-300 my-4"></div>
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              {showFullDesc ? ads.userId.club_desc : shortDesc}{" "}
              <button
                onClick={() => setShowFullDesc(!showFullDesc)}
                className="text-blue-600 hover:underline font-semibold"
              >
                {showFullDesc ? "Read Less" : "Read More"}
              </button>
            </p>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Job Details
          </h3>

          <div className="grid grid-cols-2 gap-4">
            {/* Position Card */}
            <motion.div
              className="bg-gray-100 p-3 rounded-lg shadow-sm text-center"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-gray-600 text-sm font-semibold">Position</p>
              <p className="text-gray-800 text-base font-bold">
                {ads.position}
              </p>
            </motion.div>

            {/* Salary Card */}
            <motion.div
              className="bg-gray-100 p-3 rounded-lg shadow-sm text-center"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-gray-600 text-sm font-semibold">Salary</p>
              <p className="text-gray-800 text-base font-bold">{ads.salary}</p>
            </motion.div>

            {/* Location Card */}
            <motion.div
              className="bg-gray-100 p-3 rounded-lg shadow-sm text-center"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-gray-600 text-sm font-semibold">Location</p>
              <p className="text-gray-800 text-base font-bold">
                {ads.location}
              </p>
            </motion.div>

            {/* Published On Card */}
            <motion.div
              className="bg-gray-100 p-3 rounded-lg shadow-sm text-center"
              whileHover={{ scale: 1.05 }}
            >
              <p className="text-gray-600 text-sm font-semibold">
                Published On
              </p>
              <p className="text-gray-800 text-base font-bold">
                {new Date(ads.createdAt).toLocaleDateString()}
              </p>
            </motion.div>
          </div>

          {/* Bottom Section: Share Icons */}
          <div className="max-w-7xl mx-auto mt-8 flex justify-center gap-4">
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12a10 10 0 1 0-11 9.95V15h-2v-3h2v-2.2c0-2 1.2-3.2 3-3.2.86 0 1.8.15 1.8.15v2h-1c-1 0-1.3.62-1.3 1.26V12h2.2l-.35 3H14v6.95A10 10 0 0 0 22 12z" />
              </svg>
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-gray-700 transition"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M19.636 3H23L14.54 12.33 24 21h-4.478l-6.926-6.44L5.818 21H2.046l9.273-9.726L2 3h4.636l6.162 5.885L19.636 3Zm-1.319 15.557h1.683L7.054 5.22H5.243l13.074 13.337Z" />
              </svg>
            </a>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 transition"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 21h-4v-6.5c0-1.6-.03-3.7-2.25-3.7s-2.6 1.75-2.6 3.57V21H8V9h4v1.7h.06A4.4 4.4 0 0 1 17 9c3.5 0 4.2 2.3 4.2 5.3V21zM5 7a2 2 0 1 1 .01-4 2 2 0 0 1-.01 4zM7 21H3V9h4v12z" />
              </svg>
            </a>
          </div>

          {/* Apply Now Button */}
          {isLoggedIn && user?.role === "player" ? (
            <>
              {user?.isSubscription === true ? (
                <button
                  onClick={openModal}
                  disabled={applied}
                  className={`mt-4 block text-center text-white text-sm px-4 py-2 rounded-lg transition w-full ${
                    applied
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {applied ? "Applied" : "Apply Now"}
                </button>
              ) : (
                <Link
                  to={`/user/subscriptions?redirect=${encodeURIComponent(
                    window.location.pathname
                  )}`}
                  className="mt-4 block text-center bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Apply Now
                </Link>
              )}
            </>
          ) : (
            <Link
              to={`/login?redirect=${encodeURIComponent(
                window.location.pathname
              )}`}
              className="mt-4 block text-center bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Register
            </Link>
          )}

          {showModal && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Apply for {ads.position}
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
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AdsDetailSection;
