import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/club/Sidebar";
import { Link } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();

  // Mock data; replace with actual API call if needed
  const job = { 
    id: id,
    title: "Software Engineer",
    image: "/post/post.jpg",
    description:
      "We are looking for a talented Software Engineer to join our team. You will be responsible for developing and maintaining high-quality software applications.",
    position: "Full-Time",
    salary: "$80,000 - $100,000 per year",
    location: "San Francisco, CA, USA",
    date: "Jan 15, 2025",
    status: "Published",
    company: {
      name: "Tech Innovators Inc.",
      logo: "/common/club.png",
      location: "San Francisco, CA, USA",
      subDescription:
        "Tech Innovators Inc. is a leading tech company that builds innovative solutions to solve real-world problems.",
    },
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-col lg:flex-row">
        <Sidebar />

        <main className="flex-1 p-6 space-y-6">
          {/* Header */}
          <header className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Job Details</h1>
            <Link
              to={"/club/posts"}
              className="py-2 px-6 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
            >
              &#8592; Back
            </Link>
          </header>

          {/* Job Details Section */}
          <section className="bg-white p-6 rounded-lg shadow-md space-y-6">
            {/* Job Title and Image */}
            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={job.image}
                alt="Job"
                className="w-full md:w-1/3 h-60 object-cover rounded-lg shadow"
              />
              <div className="flex-1 space-y-4">
                <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
                <p className="text-gray-600">{job.description}</p>
                <div className="flex flex-wrap gap-4">
                  <p className="text-gray-700 font-medium">
                    <strong>Position:</strong> {job.position}
                  </p>
                  <p className="text-gray-700 font-medium">
                    <strong>Salary:</strong> {job.salary}
                  </p>
                  <p className="text-gray-700 font-medium">
                    <strong>Location:</strong> {job.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Job Status and Date */}
            <div className="flex flex-wrap justify-between items-center">
              <p className="text-gray-500">
                <strong>Posted on:</strong> {job.date}
              </p>
              <p
                className={`font-semibold ${
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
          <section className="bg-white p-6 rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">Company Details</h2>
            <div className="flex items-center gap-6">
              <img
                src={job.company.logo}
                alt="Company Logo"
                className="w-20 h-20 rounded-lg shadow-md border"
              />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-700">
                  {job.company.name}
                </h3>
                <p className="text-gray-500">{job.company.location}</p>
                <p className="text-gray-600">{job.company.subDescription}</p>
              </div>
            </div>
          </section>

          {/* Apply Now Button */}
          <section className="text-center">
            <button
              onClick={() => alert(`You applied for ${job.title}`)}
              className="py-3 px-8 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 transition shadow-md"
            >
              Apply Now
            </button>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PostDetail;
