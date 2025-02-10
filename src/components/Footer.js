import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Animation Variants
const fadeInVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between each child animation
    },
  },
};

const Footer = () => {
  return (
    <motion.footer
      className="bg-blue-900 text-white py-[100px]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      <div className="container mx-auto px-4">
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={staggerContainer}>
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
              <a href="mailto:info@footballads.com" className="hover:underline">
                info@footballads.com
              </a>
            </p>
            <p>
              Phone:{" "}
              <a href="tel:+1234567890" className="hover:underline">
                +1 234 567 890
              </a>
            </p>
            <p>Address: 123 Football Lane, Soccer City, SC 12345</p>
          </motion.div>

          {/* Copyright & Social Links */}
          <motion.div className="text-center md:text-right" variants={fadeInVariant}>
            <p>&copy; {new Date().getFullYear()} Football Ads. All rights reserved.</p>
            <p className="text-sm">Built with passion for football enthusiasts.</p>

            {/* Social Media Links */}
            <div className="flex justify-center mt-5 gap-6">
              {[
                { name: "Facebook", url: "https://www.facebook.com", icon: "/social/facebook.png" },
                { name: "Twitter", url: "https://twitter.com", icon: "/social/twitter.png" },
                { name: "Instagram", url: "https://www.instagram.com", icon: "/social/instagram.png" },
                { name: "LinkedIn", url: "https://www.linkedin.com", icon: "/social/linkedin.png" },
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
