import React, { useEffect, useState } from "react";
import SubscriptionsSection from "../components/SubscriptionsSection";
import API from "../api";
import Loader from "../components/Loader";
const subscriptionLink = {"link":"/club/payment"};
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
    return <Loader />;
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
      <SubscriptionsSection subscriptions={subscriptionData.subscriptions}  subscriptionLink={subscriptionLink} />
    </div>
  );
};
export default Subscription;
