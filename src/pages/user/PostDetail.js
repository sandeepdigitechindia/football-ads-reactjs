import React from "react";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();

  // Mock data; replace with actual API call if needed
  const job = {
    id: 1,
    title: "Post Title 1",
    description: "Detailed description for Post Title 1.",
    date: "Jan 10, 2025",
    status: "Published",
  };

  return (
    <div className="p-6 bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800">{job.title}</h1>
        <p className="text-gray-600">{job.description}</p>
        <p className="text-gray-500">Published on: {job.date}</p>
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
    </div>
  );
};

export default PostDetail;
