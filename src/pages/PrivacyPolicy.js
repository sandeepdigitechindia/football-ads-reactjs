import React, { useEffect, useState } from "react";
import API from "../api";
const PrivacyPolicy = () => {
  const [settingData, setSettingData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettingData = async () => {
      try {
        const response = await API.get("/api/settings");
        setSettingData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching home data:", error);
        setLoading(false);
      }
    };

    fetchSettingData();
  }, []);
  if (loading) {
    return <div className="text-center text-lg font-bold">Loading...</div>;
  }

  if (!settingData) {
    return (
      <div className="text-center text-lg font-bold text-red-500">
        Error loading data.
      </div>
    );
  }
  return (
    <div className="home">
      <div className="container py-16 px-4 mx-auto">
        <div className="prose prose-lg text-gray-700">
          {settingData.privacy_policy}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
