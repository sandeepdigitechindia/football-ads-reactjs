import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API from "../api";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const fadeInVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const SecondaryCTASection = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formDataToSend = {
        email: formData.email,
      };

      await API.post(`${BASE_URL}/api/subscribe`, formDataToSend, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      toast.success("Newsletter Form Submitted Successfully!", {
        position: "top-right",
        autoClose: 3000,
      });
      setFormData({
        email: "",
      });
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

  return (
    <motion.section
      className="bg-gray-800 text-white py-16 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto text-center">
        {/* Title */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-6"
          variants={fadeInVariant}
        >
          Stay Connected!
        </motion.h2>

        <motion.div
          className="flex flex-col lg:flex-row w-full items-center"
          variants={staggerContainer}
        >
          {/* Left Side - Newsletter & Socials */}
          <motion.div className="w-full lg:w-1/2" variants={fadeInVariant}>
            {/* Newsletter Subscription */}
            <motion.div className="mb-8" variants={fadeInVariant}>
              <p className="text-xl mb-4">
                Subscribe to our newsletter for updates and exclusive
                promotions!
              </p>
              <motion.form
                onSubmit={handleSubmit}
                className="flex justify-center"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="px-4 py-2 text-black rounded-l-lg w-1/2"
                  required
                />
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-500 text-white rounded-r-lg"
                  disabled={loading}
                >
                  {loading ? "Subscribe..." : "Subscribe"}
                </button>
              </motion.form>
            </motion.div>

            {/* Social Media Links */}
            <motion.div
              className="flex justify-center gap-6"
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {[
                {
                  src: "/social/facebook.png",
                  link: "https://www.facebook.com",
                  color: "hover:scale-110",
                },
                {
                  src: "/social/twitter.png",
                  link: "https://twitter.com",
                  color: "hover:scale-110",
                },
                {
                  src: "/social/instagram.png",
                  link: "https://www.instagram.com",
                  color: "hover:scale-110",
                },
                {
                  src: "/social/linkedin.png",
                  link: "https://www.linkedin.com",
                  color: "hover:scale-110",
                },
              ].map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  <img
                    src={item.src}
                    alt="Social Icon"
                    className="w-8 h-8 transition-transform"
                  />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src="/about/login.jpg"
              alt="Login Illustration"
              className="mt-4 rounded-lg w-full object-cover"
            />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default SecondaryCTASection;
