import React, { useEffect, useState } from "react";
import ContactUs from "../components/ContactUs";
import API from "../api";
import Loader from "../components/Loader";
const Contact = () => {
  const [contactUsData, setContactUsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContactUsData = async () => {
      try {
        const response = await API.get("/api/contact");
        setContactUsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contact data:", error);
        setLoading(false);
      }
    };

    fetchContactUsData();
  }, []);
  if (loading) {
    return <Loader />;
  }

  if (!contactUsData) {
    return (
      <div className="text-center text-lg font-bold text-red-500">
        Error loading data.
      </div>
    );
  }
    return (
      <div className="home">
        {/* Ads Section */}
        <ContactUs contact={contactUsData} />
      </div>
    );
  };
export default Contact;
