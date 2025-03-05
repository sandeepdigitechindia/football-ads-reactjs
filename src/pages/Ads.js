import React, { useEffect, useState } from "react";
import AdsSection from "../components/AdsSection";
import API from "../api";
import Loader from "../components/Loader";
const Ads = () => {
  const [adsData, setAdsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdsData = async () => {
      try {
        const response = await API.get("/api/posts");
        setAdsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ads data:", error);
        setLoading(false);
      }
    };

    fetchAdsData();
  }, []);
  if (loading) {
    return <Loader />;
  }

  if (!adsData) {
    return (
      <div className="text-center text-lg font-bold text-red-500">
        Error loading data.
      </div>
    );
  }
  return (
    <div className="home">
      {/* Ads Section */}
      <AdsSection ads={adsData.posts} />
    </div>
  );
};
export default Ads;
