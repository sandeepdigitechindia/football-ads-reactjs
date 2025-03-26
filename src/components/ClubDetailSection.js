import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../context/AuthContext";
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
const ClubDetailSection = ({ club }) => {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const { user } = useContext(AuthContext);
  // Limit description to first 100 characters
  const shortDesc = club.club_desc.slice(0, 100) + "...";

  console.log(user);
  if (!club) return <div>No Club Available</div>;
  return (
    <motion.section
      className="py-12 md:py-16 bg-gray-50 px-4 sm:px-6 lg:px-8 flex justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-4xl w-full bg-white p-6 sm:p-8 rounded-lg shadow flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Left Side - Club Logo */}
        <motion.img
          src={BASE_URL + club.club_logo}
          alt={club.club_name}
          className="w-32 h-32 md:w-40 md:h-40 object-cover rounded-full border border-gray-300"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        />

        {/* Right Side - Club Details */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
            {club.club_name}
          </h2>
          <p className="text-gray-700 text-base sm:text-lg">
            <span className="font-semibold">Country:</span> {club.country}
          </p>
          <p className="text-gray-700 text-base sm:text-lg">
            <span className="font-semibold">Listed On:</span>{" "}
            {new Date(club.createdAt).toLocaleDateString()}
          </p>
          {user?.role === "player" && !user?.isSubscription ? (
            <>
              <p className="text-gray-700 text-base sm:text-lg">
                <span className="font-semibold">Phone:</span>{" "}
                {maskPhoneNumber(club.phone)}
              </p>
              <p className="text-gray-700 text-base sm:text-lg">
                <span className="font-semibold">Email:</span>{" "}
                {maskEmail(club.email)}
              </p>
              <p className="text-red-500 text-base sm:text-lg mt-2">
                🔒 Subscribe to view full contact details.
              </p>
            </>
          ) : user?.role === "player" && user?.isSubscription ? (
            <>
              <p className="text-gray-700 text-base sm:text-lg">
                <span className="font-semibold">Phone:</span> {club.phone}
              </p>
              <p className="text-gray-700 text-base sm:text-lg">
                <span className="font-semibold">Email:</span> {club.email}
              </p>
            </>
          ) : user?.role === "club" ? (
            <> </>
          ) : (
            <>
              <p className="text-gray-700 text-base sm:text-lg">
                <span className="font-semibold">Phone:</span>{" "}
                {maskPhoneNumber(club.phone)}
              </p>
              <p className="text-gray-700 text-base sm:text-lg">
                <span className="font-semibold">Email:</span>{" "}
                {maskEmail(club.email)}
              </p>
              <p className="text-red-500 text-base sm:text-lg mt-2">
                🔒 Subscribe to view full contact details.
              </p>
            </>
          )}{" "}
          {/* Clubs do not see anything */}
          <div className="border-t border-gray-300 my-4"></div>
          {/* Club Description with Read More / Read Less */}
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
            {showFullDesc ? club.club_desc : shortDesc}{" "}
            <button
              onClick={() => setShowFullDesc(!showFullDesc)}
              className="text-blue-600 hover:underline font-semibold"
            >
              {showFullDesc ? "Read Less" : "Read More"}
            </button>
          </p>
        </div>
      </div>
    </motion.section>
  );
};

export default ClubDetailSection;
