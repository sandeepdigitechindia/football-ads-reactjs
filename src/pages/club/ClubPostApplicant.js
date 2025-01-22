import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Dummy data for applicants (Replace with actual data from API or state)
const initialApplicants = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    phone: "+1 234 567 890",
    email: "johndoe@example.com",
    profilePic: "/common/johndoe.jpg",
    cv: "/common/johndoe-cv.pdf",
    status: "Open", // Can be Open, Close, Archived
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    phone: "+1 234 567 891",
    email: "janesmith@example.com",
    profilePic: "/common/janesmith.jpg",
    cv: "/common/janesmith-cv.pdf",
    status: "Close", // Can be Open, Close, Archived
  },
  {
    id: 3,
    firstName: "Mark",
    lastName: "Johnson",
    phone: "+1 234 567 892",
    email: "markjohnson@example.com",
    profilePic: "/common/markjohnson.jpg",
    cv: "/common/markjohnson-cv.pdf",
    status: "Archived", // Can be Open, Close, Archived
  },
];

const ClubPostApplicant = () => {
  const { postId } = useParams(); // Get post ID from URL
  const navigate = useNavigate();
  const [applicants, setApplicants] = useState(initialApplicants);

  // Handle status change
  const handleStatusChange = (applicantId, newStatus) => {
    setApplicants((prevApplicants) =>
      prevApplicants.map((applicant) =>
        applicant.id === applicantId
          ? { ...applicant, status: newStatus }
          : applicant
      )
    );
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Applicants for Post</h1>
          <button
            onClick={() => navigate(`/club/post`)}
            className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Back to Posts
          </button>
        </header>

        {/* Applicants List */}
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 text-left">Profile</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Phone</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">CV</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {applicants.map((applicant) => (
                <tr key={applicant.id} className="border-b">
                  <td className="px-4 py-2">
                    <img
                      src={applicant.profilePic}
                      alt={`${applicant.firstName} ${applicant.lastName}`}
                      className="w-12 h-12 rounded-full"
                    />
                  </td>
                  <td className="px-4 py-2">{`${applicant.firstName} ${applicant.lastName}`}</td>
                  <td className="px-4 py-2">{applicant.phone}</td>
                  <td className="px-4 py-2">{applicant.email}</td>
                  <td className="px-4 py-2">
                    <a
                      href={applicant.cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      View CV
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        applicant.status === "Open"
                          ? "bg-green-100 text-green-700"
                          : applicant.status === "Close"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {applicant.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <select
                      value={applicant.status}
                      onChange={(e) =>
                        handleStatusChange(applicant.id, e.target.value)
                      }
                      className="px-3 py-1 border rounded-md"
                    >
                      <option value="Open">Open</option>
                      <option value="Close">Close</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClubPostApplicant;
