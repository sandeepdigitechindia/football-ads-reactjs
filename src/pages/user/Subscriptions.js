import React, { useEffect, useState } from "react";
import Sidebar from "../../components/user/Sidebar";
import SubscriptionsSection from "../../components/SubscriptionsSection";
import API from "../../api";
const Subscriptions = () => {

  const [subscriptionData, setSubscriptionData] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const fetchSubscriptionData = async () => {
        try {
          const response = await API.get("/api/user/subscriptions");
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
  // Sample subscription data
  const subscriptions = [
    {
      plan: "Premium Plan",
      startDate: "Jan 10, 2025",
      endDate: "Jan 10, 2026",
      status: "Active",
      renewalStatus: "Auto Renew",
      benefits: ["Unlimited Access", "Premium Support", "Exclusive Content"],
      description:
        "The Premium Plan offers unlimited access to all features with priority support.",
    },
    {
      plan: "Standard Plan",
      startDate: "Nov 20, 2024",
      endDate: "Nov 20, 2025",
      status: "Expired",
      renewalStatus: "Manual Renewal",
      benefits: ["Limited Access", "Standard Support"],
      description:
        "The Standard Plan includes basic features with limited access and standard support.",
    },
    {
      plan: "Pro Plan",
      startDate: "Sept 12, 2024",
      endDate: "Sept 12, 2025",
      status: "Active",
      renewalStatus: "Auto Renew",
      benefits: [
        "Full Access",
        "Priority Support",
        "Exclusive Content",
        "Beta Features",
      ],
      description:
        "The Pro Plan is perfect for professionals who want to access all features and get priority support.",
    },
  ];

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

          <SubscriptionsSection subscriptions={subscriptionData} />

          {/* Active Subscriptions */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Active Subscription Card */}
            {subscriptions.map((sub, index) =>
              sub.status === "Active" ? (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg flex flex-col space-y-6 border border-gray-200 transform transition duration-300 hover:shadow-xl"
                >
                  {/* Plan Title */}
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-3 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold">{sub.plan}</h3>
                  </div>

                  {/* Subscription Details */}
                  <div className="flex flex-col space-y-2">
                    <p className="text-gray-600 flex items-center gap-2">
                      <i className="fas fa-calendar-alt text-blue-500"></i>
                      <span>
                        <strong>Start Date:</strong> {sub.startDate}
                      </span>
                    </p>
                    <p className="text-gray-600 flex items-center gap-2">
                      <i className="fas fa-calendar-check text-green-500"></i>
                      <span>
                        <strong>End Date:</strong> {sub.endDate}
                      </span>
                    </p>
                  </div>

                  {/* Status Badge */}
                  <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold self-start shadow-md">
                    {sub.status}
                  </span>

                  {/* Plan Benefits */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-2">
                      Plan Benefits
                    </h4>
                    <ul className="space-y-2">
                      {sub.benefits.map((benefit, idx) => (
                        <li
                          key={idx}
                          className="text-gray-600 flex items-center gap-2"
                        >
                          <i className="fas fa-check-circle text-green-500"></i>{" "}
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 italic">{sub.description}</p>

                  {/* Renewal Status */}
                  <div className="mt-4 text-gray-700 font-semibold flex items-center gap-2">
                    <i className="fas fa-sync-alt text-blue-500"></i>
                    <span>Renewal Status: {sub.renewalStatus}</span>
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
