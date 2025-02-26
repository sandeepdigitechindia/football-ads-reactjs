import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdsDetailSection from "../components/AdsDetailSection";
import API from "../api";
const Ads = () => {
  const { slug } = useParams();
  const [adsData, setAdsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdsData = async () => {
      try {
        const response = await API.get(`/api/posts/${slug}`);
        setAdsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ads data:", error);
        setLoading(false);
      }
    };

    if (slug) fetchAdsData();
  }, [slug]);
  if (loading) {
    return <div className="text-center text-lg font-bold">Loading...</div>;
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
      <AdsDetailSection ads={adsData} />
    </div>
  );
};
export default Ads;
