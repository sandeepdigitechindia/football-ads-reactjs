import React from "react";
import { motion } from "framer-motion";

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

const AboutUs = () => {
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
              src="/about/about-us.jpg"
              alt="About Us"
              className="w-full rounded-lg shadow-lg"
            />
          </motion.div>

          {/* Content Section */}
          <motion.div variants={textVariant}>
            <p className="text-lg text-gray-700 mb-6">
              Welcome to <span className="font-semibold">Football Ads</span>, the ultimate platform for football enthusiasts, clubs,
              and advertisers. We are dedicated to bridging the gap between fans, businesses, and
              the beautiful game of football. Our mission is to provide premium ad services, 
              subscription plans, and tools to promote your content effectively.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              With a focus on innovation and user satisfaction, we help clubs and advertisers
              reach their target audience while ensuring fans stay connected with their favorite sport.
            </p>
            <motion.a
              href="/about"
              className="inline-block text-white bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-md text-lg font-medium transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More About Us
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutUs;
