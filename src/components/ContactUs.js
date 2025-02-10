import React, { useState } from "react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

// Animation Variants
const fadeInVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Delay between elements
    },
  },
};

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <motion.section
      className="py-16 px-4 bg-gray-50"
      id="contact-us"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={staggerContainer}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Section */}
          <motion.div className="p-8" variants={fadeInVariant}>
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Contact Us</h2>
            <p className="text-center text-gray-600 mb-6">
              We’d love to hear from you! Get in touch with us using the form on the right or through the details below.
            </p>
            <div className="mb-6">
              <motion.img
                src="/contact/contact-us.jpg"
                alt="Contact Us"
                className="w-full rounded-lg shadow-lg"
                whileHover={{ scale: 1.05 }}
              />
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Our Contact Info</h3>
              <p className="text-gray-700">
                <strong>Email:</strong>{" "}
                <a href="mailto:contact@yourdomain.com" className="text-blue-600 hover:underline">
                  contact@yourdomain.com
                </a>
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong>{" "}
                <a href="tel:+123456789" className="text-blue-600 hover:underline">
                  +1 (234) 567-890
                </a>
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Follow Us</h3>
              <div className="flex space-x-4 justify-center">
                {[
                  { icon: <FaFacebookF />, url: "https://facebook.com", color: "text-blue-600" },
                  { icon: <FaTwitter />, url: "https://twitter.com", color: "text-blue-400" },
                  { icon: <FaLinkedinIn />, url: "https://linkedin.com", color: "text-blue-700" },
                  { icon: <FaInstagram />, url: "https://instagram.com", color: "text-pink-600" },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    className={`${social.color} hover:scale-110 transition-transform`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Section - Contact Form */}
          <motion.div variants={fadeInVariant}>
            <h3 className="text-3xl sm:text-4xl font-bold text-center mb-8">Get In Touch</h3>
            <motion.form
              onSubmit={handleSubmit}
              className="bg-white p-8 shadow-md rounded-lg"
              variants={staggerContainer}
            >
              {[
                { label: "Name", type: "text", name: "name" },
                { label: "Email", type: "email", name: "email" },
                { label: "Contact", type: "tel", name: "contact" },
                { label: "Subject", type: "text", name: "subject" },
              ].map((field, index) => (
                <motion.div className="mb-6" key={index} variants={fadeInVariant}>
                  <label htmlFor={field.name} className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    id={field.name}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </motion.div>
              ))}

              {/* Message Field */}
              <motion.div className="mb-6" variants={fadeInVariant}>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Enter your message"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  rows="5"
                  required
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div className="text-center" variants={fadeInVariant}>
                <motion.button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Submit
                </motion.button>
              </motion.div>
            </motion.form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default ContactUs;
