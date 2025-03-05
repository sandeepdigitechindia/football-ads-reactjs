import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/user/Sidebar";
import API from "../../api";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const PostDetail = () => {
  const { id } = useParams();
  const [showMore, setShowMore] = React.useState(false);

  const [formData, setFormData] = useState({
    title: "",
    image: null,
    description: "",
    position: "",
    salary: "",
    location: "",
    date: "",
    status: "",
    club_name: "",
    club_logo: "",
  });
  // Fetch user data from API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get(`/api/user/posts/${id}`);
        const postData = response.data;
        setFormData({
          title: postData.title || "",
          description: postData.description || "",
          position: postData.position || "",
          salary: postData.salary || "",
          location: postData.location || "",
          image: postData.image || null,
          date: postData.createdAt,
          status: postData.status === "true" ? "Open" : "Close",
          club_name: postData.userId?.club_name || "",
          club_logo: postData.userId?.club_logo || "",
        });
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    if (id) fetchUser();
  }, [id]);

  // Mock data; replace with actual API call if needed
  const job = {
    id: id,
    title: formData.title,
    image: BASE_URL + formData.image || "/post/post.jpg",
    description: formData.description,
    position: formData.position,
    salary: formData.salary,
    location: formData.location,
    date: formData.date,
    status: formData.status,
    company: {
      name: formData.club_name,
      logo: BASE_URL + formData.club_logo,
      location: "San Francisco, CA, USA",
      subDescription:
        "Tech Innovators Inc. is a leading tech company that builds innovative solutions to solve real-world problems.",
      fullDescription:
        "Company ABC was founded in 2000 and has been at the forefront of the technology industry, providing cutting-edge solutions to clients across the globe. We specialize in AI, machine learning, and enterprise software solutions. With over 500 employees and a network of partners worldwide, we continue to push the boundaries of innovation and impact the future of technology.",
    },
  };

  // Mock data; replace with actual API call if needed

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="flex flex-col lg:flex-row">
        <Sidebar />

        <main className="flex-1 p-8 space-y-8">
          {/* Header */}
          <header className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-4xl font-extrabold text-gray-900">
              Job Details
            </h1>
            {/* <button
              onClick={() => alert(`You applied for ${job.title}`)}
              className="py-2 px-6 bg-blue-600 text-white text-lg rounded hover:bg-blue-700 transition shadow-lg"
            >
              Apply Now
            </button> */}
          </header>

          {/* Job Details Section */}
          <section className="bg-white p-8 rounded-xl shadow-lg space-y-8">
            {/* Job Title and Image */}
            <div className="flex flex-col md:flex-row gap-8">
              <img
                src={job.image}
                alt="Job"
                className="w-full md:w-1/3 h-60 object-cover rounded-xl shadow-md"
              />
              <div className="flex-1 space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">
                  {job.title}
                </h1>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {job.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <p className="text-gray-800 font-medium">
                    <strong className="font-bold">Position:</strong>{" "}
                    {job.position}
                  </p>
                  <p className="text-gray-800 font-medium">
                    <strong className="font-bold">Salary:</strong> {job.salary}
                  </p>
                  <p className="text-gray-800 font-medium">
                    <strong className="font-bold">Location:</strong>{" "}
                    {job.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Job Status and Date */}
            <div className="flex flex-wrap justify-between items-center">
              <p className="text-gray-600 text-sm">
                <strong className="font-semibold">Posted on:</strong> {job.date}
              </p>
              <p
                className={`font-semibold text-lg ${
                  job.status === "Published"
                    ? "text-green-600"
                    : job.status === "Draft"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                Status: {job.status}
              </p>
            </div>
          </section>

          {/* Company Details Section */}
          <section className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Company Details
            </h2>
            <div className="flex items-center gap-6">
              <img
                src={job.company.logo}
                alt="Company Logo"
                className="w-24 h-24 rounded-lg shadow-md border"
              />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  {job.company.name}
                </h3>
                <p className="text-gray-600">{job.company.location}</p>

                {/* Show the short description initially */}
                <p className="text-gray-700 text-sm leading-relaxed">
                  {showMore
                    ? job.company.fullDescription
                    : job.company.subDescription.length > 100
                    ? `${job.company.subDescription.slice(0, 100)}...`
                    : job.company.subDescription}
                </p>

                {/* Expanded Content */}
                {showMore && (
                  <div>
                    <p className="text-gray-700 text-sm leading-relaxed mt-2">
                      {job.company.fullDescription}
                    </p>
                    <button
                      onClick={() => setShowMore(false)}
                      className="text-blue-500 font-medium hover:underline focus:outline-none mt-2"
                    >
                      Read Less
                    </button>
                  </div>
                )}

                {/* Read More Button */}
                {!showMore && job.company.subDescription.length > 100 && (
                  <button
                    onClick={() => setShowMore(true)}
                    className="text-blue-500 font-medium hover:underline focus:outline-none mt-2"
                  >
                    Read More
                  </button>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PostDetail;
