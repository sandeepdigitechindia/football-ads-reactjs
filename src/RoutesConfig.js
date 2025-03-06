import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Ads from "./pages/Ads";
import AdsDetail from "./pages/AdsDetail";
import Subscriptions from "./pages/Subscriptions";
import ServicesForClubs from "./pages/ServicesForClubs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import FAQ from "./pages/FAQ";
import ThankYou from "./pages/ThankYou";

import UserDashboard from "./pages/user/Dashboard";
import UserSettings from "./pages/user/Settings";
import UserSubscriptions from "./pages/user/Subscriptions";
import UserPosts from "./pages/user/Posts";
import UserPostForm from "./pages/user/PostForm";
import UserPostDetail from "./pages/user/PostDetail";
import UserPaymentForm from "./pages/user/PaymentForm";

import ClubDashboard from "./pages/club/Dashboard";
import ClubSettings from "./pages/club/Settings";
import ClubSubscriptions from "./pages/club/Subscriptions";
import ClubPosts from "./pages/club/Posts";
import ClubPostForm from "./pages/club/PostForm";
import ClubPostEditForm from "./pages/club/PostEditForm";
import ClubPostDetail from "./pages/club/PostDetail";
import ClubPostApplicant from "./pages/club/ClubPostApplicant";
import ClubPostApplicantView from "./pages/club/ClubPostApplicantView";
import ClubPaymentForm from "./pages/club/PaymentForm";

import PrivateRoute from "./components/PrivateRoute";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  "pk_test_51QxT60QDmVcJiVbdwEalNZCurhjzFN6hUff4SJk2wpKbvK5sCMY6GRjMPkWxrQ1MDjknr2pUZW7fNxT9XT0Ymh0L00PsSkhcM3"
);

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/ads" element={<Ads />} />
      <Route path="/ads/:slug" element={<AdsDetail />} />
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
      <Route path="/thank-you" element={<ThankYou />} />

      {/* User Routes */}
      <Route element={<PrivateRoute allowedRoles={["player"]} />}>
        <Route path="/user/dashboard" element={<UserDashboard />} />
        <Route path="/user/settings" element={<UserSettings />} />
        <Route path="/user/subscriptions" element={<UserSubscriptions />} />
        <Route path="/user/posts" element={<UserPosts />} />
        <Route path="/user/post/create" element={<UserPostForm />} />
        <Route path="/user/post/view/:id" element={<UserPostDetail />} />
        <Route
          path="/user/payment/:id"
          element={
            <Elements stripe={stripePromise}>
              <UserPaymentForm />
            </Elements>
          }
        />
      </Route>

      {/* Club Routes */}
      <Route element={<PrivateRoute allowedRoles={["club", "admin"]} />}>
        <Route path="/club/dashboard" element={<ClubDashboard />} />
        <Route path="/club/settings" element={<ClubSettings />} />
        <Route path="/club/subscriptions" element={<ClubSubscriptions />} />
        <Route path="/club/posts" element={<ClubPosts />} />
        <Route path="/club/post/create" element={<ClubPostForm />} />
        <Route path="/club/post/view/:id" element={<ClubPostDetail />} />
        <Route path="/club/post/edit/:id" element={<ClubPostEditForm />} />
        <Route path="/club/post/applicants/:id?" element={<ClubPostApplicant />} />
        <Route path="/club/post/applicant/view/:id" element={<ClubPostApplicantView />} />
        <Route
          path="/club/payment/:id"
          element={
            <Elements stripe={stripePromise}>
              <ClubPaymentForm />
            </Elements>
          }
        />
      </Route>
    </Routes>
  );
};

export default RoutesConfig;
