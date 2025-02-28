import React from "react";

import { motion } from "framer-motion";
const SubscriptionPlans = ({ subscriptions, subscriptionLink }) => {
  if (!subscriptions || subscriptions.length === 0)
    return <div>No Ads Available</div>;
  console.log(subscriptions);
  return (
    <motion.section
      className="py-16 px-4 bg-gray-50"
      variants={{
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.8, ease: "easeOut" },
        },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="max-w-5xl mx-auto text-center">
        {/* Animated Section Title */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 10 },
          }}
          viewport={{ once: true }}
        >
          Our Subscription Plans
        </motion.h2>

        {/* Subscription Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions.map((plan, index) => (
            <motion.div
              key={index}
              className={`relative bg-white shadow-lg rounded-lg overflow-hidden p-6 border transform transition duration-300 
          ${index === 1 ? "border-blue-600 scale-105" : "border-gray-300"} 
          hover:scale-105 hover:border-blue-600 group`}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: index * 0.2,
                    duration: 0.6,
                    ease: "easeOut",
                  },
                },
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
            >
              {/* Plan Title */}
              <motion.h3
                className={`text-lg sm:text-xl py-2 rounded-lg font-semibold mb-4 text-center transition duration-300 
            ${
              index === 1 ? "bg-blue-600 text-white" : "bg-gray-100 text-black"
            } 
            group-hover:bg-blue-600 group-hover:text-white`}
                whileHover={{ scale: 1.05 }}
              >
                {plan.title}
              </motion.h3>

              {/* Price */}
              <motion.div
                className={`text-xl sm:text-2xl font-bold mb-6 text-center transition duration-300 
            ${index === 1 ? "text-blue-600" : "text-gray-800"} 
            group-hover:text-blue-600`}
              >
                Є {plan.price}
                <span className="text-sm text-gray-500 ml-1">
                  /{plan.duration} month
                </span>
              </motion.div>

              <ul className="text-gray-600 text-sm sm:text-base text-left mb-6 space-y-2">
                {plan.features.map((feature, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-center gap-2"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: idx * 0.1 },
                    }}
                    viewport={{ once: true }}
                  >
                    <span
                      className={`font-bold ${
                        feature.status ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {feature.status ? "✔" : "✘"}
                    </span>
                    {feature.name}
                  </motion.li>
                ))}
              </ul>

              {/* Buy Now Button with Shake Effect */}
              <motion.a
                href={`${subscriptionLink.link}/${plan._id}`}
                className={`block text-center py-2 px-4 rounded-md text-white font-medium transition duration-300 
            ${index === 1 ? "bg-blue-600" : "bg-gray-600"} 
            group-hover:bg-blue-600`}
                whileHover={{
                  rotate: [0, -3, 3, 0],
                  transition: { duration: 0.3 },
                }}
              >
                Buy Now
              </motion.a>

              {/* Payment Image with Slide-In Effect */}
              <motion.img
                src="/about/payment.png"
                alt="Payment"
                className="mt-4 rounded-lg w-full sm:w-4/5 mx-auto object-cover"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.3, duration: 0.5 },
                }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SubscriptionPlans;
