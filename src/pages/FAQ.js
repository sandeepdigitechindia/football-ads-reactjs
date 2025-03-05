import React, { useEffect, useState } from 'react';
import API from "../api";
import Loader from "../components/Loader";
const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const [faqData, setFaqData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const response = await API.get("/api/faqs");
        setFaqData(response.data.faqs);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching faq data:", error);
        setLoading(false);
      }
    };

    fetchFaqData();
  }, []);
  if (loading) {
    return <Loader />;
  }

  if (!faqData) {
    return (
      <div className="text-center text-lg font-bold text-red-500">
        Error loading data.
      </div>
    );
  }

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="home">
    <section className="py-16 px-4 bg-gray-50" id="faq">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-12 text-blue-600">
          Frequently Asked Questions
        </h1>
        <div className="space-y-8">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-6"
            >
              <div
                onClick={() => toggleQuestion(index)}
                className="flex justify-between items-center cursor-pointer"
              >
                <h2 className="text-xl font-semibold text-gray-800">{faq.question}</h2>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`w-6 h-6 ${activeIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {activeIndex === index && (
                <p className="mt-4 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
    </div>
  );
};

export default FAQ;
