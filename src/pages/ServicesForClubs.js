import React, { useEffect, useState } from "react";
import AdditionalServicesSection from '../components/AdditionalServicesSection';
import API from "../api";
import Loader from "../components/Loader";
const ServicesForClubs = () => {

  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await API.get("/api/services");
        setServiceData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subscriptions data:", error);
        setLoading(false);
      }
    };

    fetchServiceData();
  }, []);
  if (loading) {
    return <Loader />;
  }

  if (!serviceData) {
    return (
      <div className="text-center text-lg font-bold text-red-500">
        Error loading data.
      </div>
    );
  }
    return (
      <div className="home">
        {/* Ads Section */}
        <AdditionalServicesSection services={serviceData.services} />
      </div>
    );
  };
export default ServicesForClubs;
