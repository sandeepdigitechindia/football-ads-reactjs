import React from "react";
import { motion } from "framer-motion";
import MainBanner from "../components/MainBanner";
import AdsSection from "../components/AdsSection";
import SubscriptionsSection from "../components/SubscriptionsSection";
import AdditionalServicesSection from "../components/AdditionalServicesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import SecondaryCTASection from "../components/SecondaryCTASection";
import WhyChooseUs from "../components/WhyChooseUs";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 }, // Start position
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }, // Animation effect
};

const Home = () => {
  return (
    <div className="home">
      {/* Main Banner Section (No animation, already full width) */}
      <MainBanner />

      {/* Ads Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <AdsSection />
      </motion.div>

      {/* Subscriptions Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SubscriptionsSection />
      </motion.div>

      {/* Additional Services Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <AdditionalServicesSection />
      </motion.div>

      {/* WhyChooseUs Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <WhyChooseUs />
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <TestimonialsSection />
      </motion.div>

      {/* Secondary Calls to Action Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SecondaryCTASection />
      </motion.div>
    </div>
  );
};

export default Home;
