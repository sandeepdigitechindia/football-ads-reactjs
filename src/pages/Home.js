import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import MainBanner from "../components/MainBanner";
import AdsSection from "../components/AdsSection";
import ClubsSection from "../components/ClubsSection";
// import SubscriptionsSection from "../components/SubscriptionsSection";
import AdditionalServicesSection from "../components/AdditionalServicesSection";
import TestimonialsSection from "../components/TestimonialsSection";
import SecondaryCTASection from "../components/SecondaryCTASection";
import WhyChooseUs from "../components/WhyChooseUs";
import API from "../api";
import Loader from "../components/Loader";
// const subscriptionLink = { link: "/club/payment" };
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role === "player") {
      navigate("/");
    } else if (token && role === "club") {
      navigate("/club/dashboard");
    } else {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await API.get("/api/");
        setHomeData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching home data:", error);
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);
  if (loading) {
    return <Loader />;
  }

  if (!homeData) {
    return (
      <div className="text-center text-lg font-bold text-red-500">
        Error loading data.
      </div>
    );
  }
  return (
    <div className="home">
      {/* Main Banner Section (No animation, already full width) */}

      <MainBanner mainBanner={homeData.main_banner} />

      {/* Ads Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <AdsSection ads={homeData.posts} />
      </motion.div>

      {/* Clubs Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <ClubsSection clubs={homeData.clubs} />
      </motion.div>

      {/* Subscriptions Section */}
      {/* <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <SubscriptionsSection
          subscriptions={homeData.subscriptions}
          subscriptionLink={subscriptionLink}
        />
      </motion.div> */}

      {/* Additional Services Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <AdditionalServicesSection services={homeData.services} />
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
        <TestimonialsSection testimonials={homeData.testimonials} />
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
