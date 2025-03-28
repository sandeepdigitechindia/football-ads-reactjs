import React, { createContext, useState, useEffect } from "react";
import API from "../api";
export const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
  const [serviceData, setServiceData] = useState(null);
  const [loadservices, setLoading] = useState(true);
  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await API.get("/api/services");
        setServiceData(response.data);
      } catch (error) {
        console.error("Error fetching service data:", error.response?.data || error.message);
      }finally {
        setLoading(false); 
      }
    };

    fetchServiceData();
  }, []);

  return (
    <ServiceContext.Provider value={{ serviceData,loadservices }}>
      {children}
    </ServiceContext.Provider>
  );
};
