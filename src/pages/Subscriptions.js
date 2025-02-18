import React, { useEffect, useState } from "react";
import SubscriptionsSection from "../components/SubscriptionsSection";
import API from "../api";
const Subscription = () => {
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const response = await API.get("/api/subscriptions");
        setSubscriptionData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subscriptions data:", error);
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, []);
  if (loading) {
    return <div className="text-center text-lg font-bold">Loading...</div>;
  }

  if (!subscriptionData) {
    return (
      <div className="text-center text-lg font-bold text-red-500">
        Error loading data.
      </div>
    );
  }
  return (
    <div className="home">
      {/* Ads Section */}
      <SubscriptionsSection subscriptions={subscriptionData.subscriptions} />
    </div>
  );
};
export default Subscription;
