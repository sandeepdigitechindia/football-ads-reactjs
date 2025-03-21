import React from "react";
import { motion } from "framer-motion";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const ClubsSection = ({ clubs }) => {
  if (!clubs || clubs.length === 0) return <div>No Clubs Available</div>;
  return (
    <motion.section
      className="py-12 md:py-16 bg-gray-50 px-4 sm:px-6 lg:px-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Recent Clubs
        </motion.h2>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {clubs.map((club, index) => (
            <a href={"clubs/" + club._id}>
              <motion.div
                key={index}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                <img
                  src={BASE_URL + club.club_logo}
                  alt={club.club_name}
                  className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-full border border-gray-300"
                />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {club.club_name}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {club.club_desc}
                  </p>
                </div>
              </motion.div>
            </a>
          ))}
        </div>

        {/* "See All Clubs" Button Animation */}
        <motion.div
          className="mt-6 md:mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <a
            href="/clubs"
            className="inline-block px-5 py-2 md:px-6 md:py-3 text-base md:text-lg font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300"
          >
            See All Clubs
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ClubsSection;
