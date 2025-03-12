import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SettingContext } from "../../context/SettingContext";
const Footer = () => {
  const { settingData, loading } = useContext(SettingContext);
  if (loading) {
    return <div>Loading settings...</div>;
  }

  if (!settingData) {
    return <div>No settings available.</div>;
  }

  return (
    <footer className="bg-blue-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <ul className="space-y-2">
                <li>
                  <Link to="/terms-of-service" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/faqs" className="hover:underline">
                    FAQ
                  </Link>
                </li>
              </ul>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <p>
              Email:{" "}
              <a
                href={`mailto:${settingData.official_mail}`}
                className="hover:underline"
              >
                {settingData.official_mail}
              </a>
            </p>
            <p>
              Phone:{" "}
              <a
                href={`tel:${settingData.official_number}`}
                className="hover:underline"
              >
                {settingData.official_number}
              </a>
            </p>
            <p>Address: {settingData.official_address}</p>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p>
              &copy; {new Date().getFullYear()} {settingData.site_name}. All
              rights reserved.
            </p>
            <p className="text-sm">
              Built with passion for football enthusiasts.
            </p>

            {/* Social Media Links */}
            <div className="flex justify-center md:justify-end mt-5 gap-6">
              <Link
                to={settingData.facebook_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/social/facebook.png"
                  alt="Facebook"
                  className="w-8 h-8 hover:text-blue-600 transition-colors"
                />
              </Link>
              <Link
                to={settingData.twitter_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/social/twitter.png"
                  alt="Twitter"
                  className="w-8 h-8 hover:text-blue-400 transition-colors"
                />
              </Link>
              <Link
                to={settingData.instagram_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/social/instagram.png"
                  alt="Instagram"
                  className="w-8 h-8 hover:text-pink-600 transition-colors"
                />
              </Link>
              <Link
                to={settingData.linkedin_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/social/linkedin.png"
                  alt="LinkedIn"
                  className="w-8 h-8 hover:text-blue-700 transition-colors"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
