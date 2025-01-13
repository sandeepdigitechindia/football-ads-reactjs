import React from 'react';
import MainBanner from '../components/MainBanner';  
import AdsSection from '../components/AdsSection';
import SubscriptionsSection from '../components/SubscriptionsSection';
import AdditionalServicesSection from '../components/AdditionalServicesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import SecondaryCTASection from '../components/SecondaryCTASection';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      {/* Main Banner Section */}
      <MainBanner />
      {/* Ads Section */}
      <AdsSection />
      {/* Subscriptions Section */}
      <SubscriptionsSection />
      {/* Additional Services Section */}
      <AdditionalServicesSection />
      {/* Testimonials Section */}
       <TestimonialsSection />
       {/* Secondary Calls to Action Section */}
      <SecondaryCTASection />
    </div>
  );
};

export default Home;
