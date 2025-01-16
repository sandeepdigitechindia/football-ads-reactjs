import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Ads from './pages/Ads';
import Subscriptions from './pages/Subscriptions';
import ServicesForClubs from './pages/ServicesForClubs';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgetPassword';
import Layout from './components/Layout';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQ from './pages/FAQ';
import Dashboard from './pages/user/Dashboard';
import Settings from './pages/user/Settings';
import UserSubscriptions from './pages/user/Subscriptions';
import UserPosts from './pages/user/Posts';
import UserLogout from './pages/user/Logout';

const App = () => {
  return (
    <Router>
      <Header />
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ads" element={<Ads />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/services" element={<ServicesForClubs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/faqs" element={<FAQ />} />
        <Route path="/user/dashboard" element={<Dashboard />} />
        <Route path="/user/settings" element={<Settings />} />
        <Route path="/user/subscriptions" element={<UserSubscriptions />} />
        <Route path="/user/posts" element={<UserPosts />} />
        <Route path="/user/logout" element={<UserLogout />} />
      </Routes>
      </Layout>
      <Footer />
    </Router>
  );
};

export default App;
