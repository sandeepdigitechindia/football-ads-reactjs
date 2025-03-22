import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClubDetailSection from "../components/ClubDetailSection";
import API from "../api";
import AdsSection from "../components/AdsSection";
import Loader from "../components/Loader";

const ClubDetail = () => {
  const { id } = useParams();
  const [clubData, setClubData] = useState(null);
  const [adsData, setAdsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clubResponse, adsResponse] = await Promise.all([
          API.get(`/api/clubs/${id}`),
          API.get(`/api/posts?userId=${id}`),
        ]);

        setClubData(clubResponse.data);
        setAdsData(adsResponse.data.posts || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!clubData) {
    return (
      <div className="text-center text-lg font-bold text-red-500">
        Error loading data.
      </div>
    );
  }

  return (
    <div className="home">
      {/* Ads Section */}
      <AdsSection ads={adsData} />
      {/* Club Detail Section */}
      <ClubDetailSection club={clubData} />
    </div>
  );
};

export default ClubDetail;
