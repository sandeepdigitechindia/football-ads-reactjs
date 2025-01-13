import React from "react";
import { Link } from "react-router-dom";

const SubscriptionPlans = () => {
  const plans = [
    {
      title: "3-Month Plan",
      description: "Access basic features for 3 months.",
      price: "$19.99",
      features: [
        { title: "View ads", status: true },
        { title: "Unlimited contact access", status: true },
        { title: "Priority support", status: false },
        { title: "Ad analytics", status: false },
        { title: "Dedicated account manager", status: false },
      ],
      link: "/subscriptions/3-month",
    },
    {
      title: "6-Month Plan",
      description: "Unlock additional features for 6 months.",
      price: "$34.99",
      features: [
        { title: "View ads", status: true },
        { title: "Unlimited contact access", status: true },
        { title: "Priority support", status: true },
        { title: "Ad analytics", status: false },
        { title: "Dedicated account manager", status: false },
      ],
      link: "/subscriptions/6-month",
    },
    {
      title: "9-Month Plan",
      description: "Premium access for 9 months.",
      price: "$49.99",
      features: [
        { title: "View ads", status: true },
        { title: "Unlimited contact access", status: true },
        { title: "Priority support", status: true },
        { title: "Ad analytics", status: true },
        { title: "Dedicated account manager", status: false },
      ],
      link: "/subscriptions/9-month",
    },
    {
      title: "1-Year Plan",
      description: "Get full access to all features for a year.",
      price: "$59.99",
      features: [
        { title: "View ads", status: true },
        { title: "Unlimited contact access", status: true },
        { title: "Priority support", status: true },
        { title: "Ad analytics", status: true },
        { title: "Dedicated account manager", status: true },
      ],
      link: "/subscriptions/1-year",
    },
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">
          Our Subscription Plans
        </h2>

        {/* Subscription Plans */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg overflow-hidden p-6 border"
            >
              <h3 className="text-xl text-blue-600 font-semibold mb-4">{plan.title}</h3>
              <p className="text-gray-700 mb-4">{plan.description}</p>
              <ul className="text-gray-600 text-left mb-4">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-2"
                  >
                    <span
                      className={`${
                        feature.status ? "text-green-500" : "text-red-500"
                      } font-bold`}
                    >
                      {feature.status ? "✔" : "✘"}
                    </span>
                    {feature.title}
                  </li>
                ))}
              </ul>
              <div className="text-lg font-bold mb-4">{plan.price}</div>
              <Link
                to={plan.link}
                className="block bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700"
              >
                Buy Now
              </Link>
            </div>
          ))}
        </div>

        {/* Full Access Link */}
        <div className="mt-8">
          <Link
            to="/subscriptions"
            className="text-lg font-semibold text-green-600 hover:underline"
          >
            See All Plans - Subscribe Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionPlans;
