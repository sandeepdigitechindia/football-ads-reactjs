import React from "react";
import { motion } from "framer-motion";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const ClubDetailSection = ({ club }) => {

  if (!club) return <div>No Club Available</div>;
  return (
    <motion.section
      className="py-12 md:py-16 bg-gray-50 px-4 sm:px-6 lg:px-8 flex justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-3xl  p-6 sm:p-8 text-center">
        <motion.img
          src={BASE_URL+club.club_logo}
          alt={club.club_name}
          className="w-24 h-24 md:w-32 md:h-32 object-cover mx-auto rounded-full border border-gray-300 mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
          {club.club_name}
        </h2>
        
        <div className="border-t border-gray-300 my-4"></div>
        <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
          {club.club_desc}
        </p>
      </div>
    </motion.section>
  );
};

export default ClubDetailSection;
