import React, { useEffect, useState } from "react";
import AboutUs from "../components/AboutUs";
import API from "../api";
import Loader from "../components/Loader";
const About = () => {
  const [aboutUsData, setAboutUsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        const response = await API.get("/api/about");
        setAboutUsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching about data:", error);
        setLoading(false);
      }
    };

    fetchAboutUsData();
  }, []);
  if (loading) {
    return <Loader />;
  }

  if (!aboutUsData) {
    return (
      <div className="text-center text-lg font-bold text-red-500">
        Error loading data.
      </div>
    );
  }
  return (
    <div className="home">
      {/* Ads Section */}
      <AboutUs about={aboutUsData} />
    </div>
  );
};
export default About;
