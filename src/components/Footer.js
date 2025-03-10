import React, { useContext } from "react";
import { SettingContext } from "../context/SettingContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeInVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, 
    },
  },
};

const Footer = () => {
  const { settingData,loading } = useContext(SettingContext);
  if (loading) {
    return <div>Loading settings...</div>; 
  }

  if (!settingData) {
    return <div>No settings available.</div>; 
  }
  return (
    <motion.footer
      className="bg-blue-900 text-white py-[100px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
        >
          {/* Quick Links */}
          <motion.div variants={fadeInVariant}>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms-of-service" className="hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:underline">
                  FAQ
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={fadeInVariant}>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p>
              Email:{" "}
              <a
                href={`mailto:${settingData.official_mail}`}
                className="hover:underline"
              >
                {settingData.official_mail}
              </a>
            </p>
            <p>
              Phone:{" "}
              <a
                href={`tel:${settingData.official_number}`}
                className="hover:underline"
              >
                {settingData.official_number}
              </a>
            </p>
            <p>Address: {settingData.official_address}</p>
          </motion.div>

          {/* Copyright & Social Links */}
          <motion.div
            className="text-center md:text-right"
            variants={fadeInVariant}
          >
            <p>
              &copy; {new Date().getFullYear()} {settingData.site_name}. All
              rights reserved.
            </p>
            <p className="text-sm">
              Built with passion for football enthusiasts.
            </p>

            {/* Social Media Links */}
            <div className="flex justify-center mt-5 gap-6">
              {[
                {
                  name: "Facebook",
                  url: `${settingData.facebook_link}`,
                  icon: "/social/facebook.png",
                },
                {
                  name: "Twitter",
                  url: `${settingData.twitter_link}`,
                  icon: "/social/twitter.png",
                },
                {
                  name: "Instagram",
                  url: `${settingData.instagram_link}`,
                  icon: "/social/instagram.png",
                },
                {
                  name: "LinkedIn",
                  url: `${settingData.linkedin_link}`,
                  icon: "/social/linkedin.png",
                },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <img
                    src={social.icon}
                    alt={social.name}
                    className="w-8 h-8 transition-transform"
                  />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
