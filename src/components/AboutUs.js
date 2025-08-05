import React from "react";
import { motion } from "framer-motion";
const BASE_URL = process.env.REACT_APP_BASE_URL;
// Variants for animations
const fadeInVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const imageVariant = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const textVariant = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 1 } },
};

const AboutUs = ({about}) => {
  if (!about || about.length === 0)
    return <div>No Ads Available</div>;
  return (
    <motion.section
      className="py-16 px-4 bg-gray-50"
      id="about-us"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="container mx-auto">
        {/* Heading */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-center mb-8"
          variants={fadeInVariant}
        >
          About Us
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
          {/* Image Section */}
          <motion.div variants={imageVariant}>
            <img
              src={BASE_URL + about.about_page_banner}
              alt="About Us"
              className="w-full rounded-lg shadow-lg"
            />
          </motion.div>

          {/* Content Section */}
          <motion.div variants={textVariant}>
            <p className="text-lg text-gray-700 mb-6">
              {about.about_page_content}
            </p>
         
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutUs;
