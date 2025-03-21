import React, { useEffect, useState } from "react";
import ClubsSection from "../components/ClubsSection";
import API from "../api";
import Loader from "../components/Loader";
const Clubs = () => {
  const [clubsData, setClbusData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClubsData = async () => {
      try {
        const response = await API.get("/api/clubs");
        setClbusData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching clubs data:", error);
        setLoading(false);
      }
    };

    fetchClubsData();
  }, []);
  
  if (loading) {
    return <Loader />;
  }

  if (!clubsData) {
    return (
      <div className="text-center text-lg font-bold text-red-500">
        Error loading data.
      </div>
    );
  }
  return (
    <div className="home">
      {/* clbus Section */}
      <ClubsSection clubs={clubsData.clubs} />
    </div>
  );
};
export default Clubs;
