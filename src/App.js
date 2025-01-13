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
import Layout from './components/Layout';

const App = () => {
  return (
    <Router>
      <Header />
      <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ads" element={<Ads />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/services-for-clubs" element={<ServicesForClubs />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </Layout>
      <Footer />
    </Router>
  );
};

export default App;
