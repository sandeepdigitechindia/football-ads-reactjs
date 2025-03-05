import React, { useEffect, useState } from "react";
import Sidebar from "../../components/club/Sidebar";
import SubscriptionsSection from "../../components/SubscriptionsSection";
import API from "../../api";
import Loader from "../../components/Loader";
const subscriptionLink = {"link":"/club/payment"};
const Subscriptions = () => {
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [subscriptionPurchaseData, setSubscriptionPurchaseData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const response = await API.get("/api/club/subscriptions");
        setSubscriptionData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subscriptions data:", error);
        setLoading(false);
      }
    };

    fetchSubscriptionData();
  }, []);

  useEffect(() => {
    const fetchSubscriptionPurchaseData = async () => {
      try {
        const response = await API.get("/api/club/subscriptions/purchase");
        setSubscriptionPurchaseData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subscriptions data:", error);
        setLoading(false);
      }
    };

    fetchSubscriptionPurchaseData();
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
    <div className="bg-gray-100">
      {/* Wrapper for Sidebar and Main Content */}
      <div className="flex flex-col lg:flex-row">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Subscriptions Header */}
          {/* <header className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Subscriptions</h1>
            
          </header> */}

          <SubscriptionsSection subscriptions={subscriptionData} subscriptionLink={subscriptionLink} />

          {/* Active Subscriptions */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Active Subscription Card */}
            {subscriptionPurchaseData.map((sub, index) =>
              sub.paymentStatus === "succeeded" ? (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg flex flex-col space-y-6 border border-gray-200 transform transition duration-300 hover:shadow-xl"
                >
                  {/* Plan Title */}
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-3 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">
                      {sub.subscriptionId?.title}
                    </h3>
                  </div>

                  {/* Subscription Details */}
                  <div className="flex flex-col space-y-2">
                    <p className="text-gray-600 flex items-center gap-2">
                      <i className="fas fa-calendar-alt text-blue-500"></i>
                      <span>
                        <strong>Start Date:</strong>{" "}
                        {new Date(sub.startDate).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <i className="fas fa-calendar-check text-green-500"></i>
                      <span>
                        <strong>End Date:</strong>{" "}
                        {new Date(sub.endDate).toLocaleDateString()}
                      </span>
                    </p>
                  </div>

                  {/* Status Badge */}
                  <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold self-start shadow-md">
                    {sub.paymentStatus}
                  </span>

                  {/* Plan Features */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">
                      Plan Features
                    </h4>
                    <ul className="space-y-2">
                      {sub.subscriptionId?.features?.map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-gray-600 flex items-center gap-2"
                        >
                          <i
                            className={`fas fa-${
                              feature.status ? "check" : "times"
                            }-circle ${
                              feature.status ? "text-green-500" : "text-red-500"
                            }`}
                          ></i>{" "}
                          {feature.name}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price & Duration */}
                  <p className="text-gray-600">
                    <strong>Price:</strong> Є{sub.price} |{" "}
                    <strong>Duration:</strong> {sub.duration}
                  </p>

                  {/* Renewal Status */}
                  <div className="mt-4 text-gray-700 font-semibold flex items-center gap-2">
                    <i className="fas fa-sync-alt text-blue-500"></i>
                    <span>Renewal Status: {sub.renewalStatus || "N/A"}</span>
                  </div>
                </div>
              ) : null
            )}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Subscriptions;
