import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { SettingContext } from "../context/SettingContext";
const Counter = ({ start, end, duration }) => {
  const [count, setCount] = useState(start);

  useEffect(() => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * (end - start) + start));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [start, end, duration]);

  return (
    <motion.span
      initial={{ scale: 0.8 }}
      animate={{ scale: 1.2 }}
      transition={{ type: "spring", stiffness: 120, damping: 8 }}
    >
      {count}
    </motion.span>
  );
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  hover: { scale: 1.05, transition: { duration: 0.3 } },
};

const WhyChooseUs = () => {
  const { settingData } = useContext(SettingContext);
  return (
    <motion.div
      className="bg-blue-900 py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-6 lg:px-20">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          {/* Left Section */}
          <motion.div
            className="lg:w-1/4 text-center lg:text-left mb-8 lg:mb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">STAT</h2>
            <p className="text-2xl font-semibold text-white">Why Choose Us</p>
          </motion.div>

          {/* Right Section */}
          <motion.div
            className="lg:w-3/4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            initial="hidden"
            whileInView="visible"
            transition={{ staggerChildren: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Happy Clients */}
            <motion.div
              className="p-6 bg-white rounded shadow-lg h-30"
              variants={cardVariants}
              whileHover="hover"
            >
              <h3 className="text-3xl font-bold text-gray-800">
                <Counter
                  start={0}
                  end={settingData.wcu_count1}
                  duration={2000}
                />
                +
              </h3>
              <p className="text-lg text-gray-600">{settingData.wcu_title1}</p>
            </motion.div>

            {/* Countries */}
            <motion.div
              className="p-6 bg-white rounded shadow-lg h-30"
              variants={cardVariants}
              whileHover="hover"
            >
              <h3 className="text-3xl font-bold text-gray-800">
                <Counter
                  start={0}
                  end={settingData.wcu_count2}
                  duration={2000}
                />
                +
              </h3>
              <p className="text-lg text-gray-600">{settingData.wcu_title2}</p>
            </motion.div>

            {/* Contracts */}
            <motion.div
              className="p-6 bg-white rounded shadow-lg h-30"
              variants={cardVariants}
              whileHover="hover"
            >
              <h3 className="text-3xl font-bold text-gray-800">
                <Counter
                  start={0}
                  end={settingData.wcu_count3}
                  duration={2000}
                />
                +
              </h3>
              <p className="text-lg text-gray-600">{settingData.wcu_title3}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default WhyChooseUs;
