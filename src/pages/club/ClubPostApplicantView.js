import React, { useState, useEffect } from "react";
import Sidebar from "../../components/club/Sidebar";
import { useParams } from "react-router-dom";

import API from "../../api";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const ClubPostApplicantView = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
    country: "",
    upload_cv: null,
    profilePic: null,

    title: "",
    description: "",
    salary: "",
    position: "",
    image: null,
    location:""
  });
  // Fetch user data from API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get(`/api/club/posts/applicants/${id}`);
        const postData = response.data;
        setFormData({
          profilePic: BASE_URL + postData.userId.profile || null,
          upload_cv: BASE_URL + postData.userId.upload_cv || null,
          first_name: postData.userId.first_name || "",
          last_name: postData.userId.last_name || "",
          email: postData.userId.email || "",
          phone: postData.userId.phone || "",
          dob: postData.userId.dob || "",
          country: postData.userId.country || "",
          title: postData.postId.title || "",
          description: postData.postId.description || "",
          salary: postData.postId.salary || "",
          position: postData.postId.position || "",
          location: postData.postId.location || "",
          image: BASE_URL + postData.postId.image || null,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (id) fetchUser();
  }, [id]);
  // Static data to replace `selectedRow`
  const selectedRow = {
    profilePic: "/common/man.png",
    first_name: formData.first_name,
    last_name: formData.last_name,
    email: formData.email,
    phone: formData.phone,
    dob: formData.dob,
    country: formData.country,
    cv: formData.upload_cv,

    title: formData.title,
    description: formData.description,
    salary: formData.salary,
    position: formData.position,
    location: formData.location,
    image: formData.image,
  };

  return (
    <div className="flex bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            User and Post Details
          </h1>
        </header>
        <div className="max-w-7xl mx-auto bg-white p-8 rounded-lg shadow">
          <div className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* User Card */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="bg-gray-100 p-4 flex items-center gap-4">
                  <img
                    src={selectedRow.profilePic}
                    alt="User"
                    className="w-16 h-16 rounded-full border border-gray-300 shadow-sm"
                  />
                  <h4 className="text-xl font-bold text-gray-800">
                    User Profile
                  </h4>
                </div>
                <div className="p-4">
                  <table className="w-full text-left text-gray-700">
                    <tbody>
                      <tr>
                        <td className="font-semibold py-2">First Name:</td>
                        <td>{selectedRow.first_name}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-2">Last Name:</td>
                        <td>{selectedRow.last_name}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-2">Email:</td>
                        <td>{selectedRow.email}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-2">Phone:</td>
                        <td>{selectedRow.phone}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-2">Date of Birth:</td>
                        <td>{selectedRow.dob}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-2">Country:</td>
                        <td>{selectedRow.country}</td>
                      </tr>
                      {selectedRow.cv && (
                        <tr>
                          <td className="font-semibold py-2">CV:</td>
                          <td>
                            <a
                              href={selectedRow.cv}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 underline"
                            >
                              View CV
                            </a>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Post Card */}
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="bg-gray-100 p-4 flex items-center gap-4">
                  <img
                    src={selectedRow.image}
                    alt="Post"
                    className="w-16 h-16 rounded-full border border-gray-300 shadow-sm"
                  />
                  <h4 className="text-xl font-bold text-gray-800">
                    Post Details
                  </h4>
                </div>
                <div className="p-4">
                  <table className="w-full text-left text-gray-700">
                    <tbody>
                      <tr>
                        <td className="font-semibold py-2">Title:</td>
                        <td>{selectedRow.title}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-2">Description:</td>
                        <td>{selectedRow.description}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-2">Salary:</td>
                        <td>{selectedRow.salary}</td>
                      </tr>
                      <tr>
                        <td className="font-semibold py-2">Position:</td>
                        <td>{selectedRow.position}</td>
                      </tr>
                      
                      <tr>
                        <td className="font-semibold py-2">Location:</td>
                        <td>{selectedRow.location}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubPostApplicantView;
