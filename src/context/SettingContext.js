import React, { createContext, useState, useEffect } from "react";
import API from "../api";
export const SettingContext = createContext();

export const SettingProvider = ({ children }) => {
  const [settingData, setSettingData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSettingData = async () => {
      try {
        const response = await API.get("/api/settings");
        setSettingData(response.data);
      } catch (error) {
        console.error("Error fetching setting data:", error.response?.data || error.message);
      }finally {
        setLoading(false); 
      }
    };

    fetchSettingData();
  }, []);

  return (
    <SettingContext.Provider value={{ settingData,loading }}>
      {children}
    </SettingContext.Provider>
  );
};
