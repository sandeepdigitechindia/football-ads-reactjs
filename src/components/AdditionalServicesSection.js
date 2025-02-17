import React from "react";
import { motion } from "framer-motion";


const AdditionalServicesSection = ({ services }) => {

  const serviceVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.2 } },
  };
  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  if (!services || services.length === 0) return <div>No Ads Available</div>;
  return (
    <motion.section
      className="py-16 px-4 bg-gray-50"
      variants={serviceVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto text-center">
        {/* Animated Section Title */}
        <motion.h2
          className="text-3xl sm:text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Our Additional Services
        </motion.h2>

        {/* Services Grid */}
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden p-6"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
            >
              <motion.h3
                className="text-xl font-semibold mb-4"
                whileHover={{ scale: 1.1 }}
              >
                {service.title}
              </motion.h3>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <div className="aspect-w-16 aspect-h-9 mb-4">
                <iframe
                  src={service.video_link}
                  title={service.title}
                  className="w-full h-full rounded-lg"
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div className="mt-8" whileHover={{ scale: 1.05 }}>
          <a href="/services" className="text-lg font-semibold text-blue-600 hover:underline">
            Learn More About Our Services
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default AdditionalServicesSection;
