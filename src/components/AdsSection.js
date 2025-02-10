import React from "react";
import { motion } from "framer-motion";
const AdsSection = () => {
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
  const adsData = [
    {
      photo: "/ads/ads1.jpg",
      title: "Top Football Club Seeking New Players",
      description:
        "Our club is looking for talented football players for the upcoming season. Apply today!",
      link: "/ads/1",
    },
    {
      photo: "/ads/ads2.jpg",
      title: "Professional Coaches Available for Hire",
      description:
        "Experienced football coaches ready to take your game to the next level. Book now!",
      link: "/ads/2",
    },
    {
      photo: "/ads/ads3.jpg",
      title: "Join the Best Football Agency",
      description:
        "Get represented by one of the top football agencies. Make your mark in the industry.",
      link: "/ads/3",
    },
    {
      photo: "/ads/ads1.jpg",
      title: "Top Football Club Seeking New Players",
      description:
        "Our club is looking for talented football players for the upcoming season. Apply today!",
      link: "/ads/4",
    },
    {
      photo: "/ads/ads2.jpg",
      title: "Professional Coaches Available for Hire",
      description:
        "Experienced football coaches ready to take your game to the next level. Book now!",
      link: "/ads/5",
    },
    {
      photo: "/ads/ads3.jpg",
      title: "Join the Best Football Agency",
      description:
        "Get represented by one of the top football agencies. Make your mark in the industry.",
      link: "/ads/6",
    },
  ];

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

        {/* Ads Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {adsData.map((ad, index) => (
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
                  src={ad.photo}
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
              <a
                href={ad.link}
                className="text-blue-600 hover:underline text-sm"
              >
                See More
              </a>
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

        {/* Subscription Prompt Animation */}
        <motion.div
          className="mt-3 md:mt-4 text-sm text-gray-600"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <span>Want full access to all ads? </span>
          <a href="/subscribe" className="text-blue-600 hover:underline">
            Subscribe Now
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AdsSection;
