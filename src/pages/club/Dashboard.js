import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/club/Sidebar";
import DataTable from "react-data-table-component";
const Dashboard = () => {
  const navigate = useNavigate();
  // Data for the table
  const initialData = [
    {
      id: 1,
      image: "/common/club.png",
      name: "Club 1",
      title: "Post Title 1",
      description: "Description for Post Title 1.",
      date: "Jan 10, 2025",
      status: "Open",
    },
    {
      id: 2,
      image: "/common/club.png",
      name: "Club 2",
      title: "Post Title 2",
      description: "Description for Post Title 2.",
      date: "Jan 9, 2025",
      status: "Close",
    },
    {
      id: 3,
      image: "/common/club.png",
      name: "Club 3",
      title: "Post Title 3",
      description: "Description for Post Title 3.",
      date: "Jan 8, 2025",
      status: "Archived",
    },
    {
      id: 4,
      image: "/common/club.png",
      name: "Club 4",
      title: "Another Post",
      description: "Description for Another Post.",
      date: "Jan 7, 2025",
      status: "Open",
    },
  ];

  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");

  const columns = [
    {
      name: "Club",
      selector: (row) => (
        <img
          src={row.image}
          alt="club"
          className="w-10 h-10 rounded-full border border-gray-300"
        />
      ),
      sortable: true,
    },
    {
      name: "Club Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div className="font-semibold text-gray-700">{row.name}</div>
      ),
    },
    {
      name: "Job Title",
      selector: (row) => 
      row.title,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      cell: (row) => (
        <div className="text-sm text-gray-600">{row.description}</div>
      ),
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      cell: (row) => <div className="text-gray-500">{row.date}</div>,
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            row.status === "Open"
              ? "bg-green-100 text-green-700"
              : row.status === "Close"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition shadow"
          onClick={() => navigate(`/club/post/${row.id}`)}
        >
          Apply
        </button>
      ),
    },
  ];

  const customStyles = {
    header: {
      style: {
        backgroundColor: "#f9fafb",
        padding: "16px",
        fontWeight: "bold",
        fontSize: "16px",
        color: "#374151",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#e5e7eb",
        fontWeight: "bold",
        fontSize: "14px",
        color: "#4b5563",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
        color: "#374151",
        backgroundColor: "#fff",
        marginTop: "10px",
        marginBottom: "10px",
        paddingTop: "10px",
        paddingBottom: "10px",
        "&:hover": {
          backgroundColor: "#f3f4f6",
          borderRadius: "10px",
        },
      },
    },
    pagination: {
      style: {
        backgroundColor: "#f9fafb",
        padding: "8px",
      },
      pageButtonsStyle: {
        color: "#3b82f6",
        fill: "#3b82f6",
        "&:hover": {
          backgroundColor: "#e5e7eb",
        },
      },
    },
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = initialData.filter((item) =>
      item.title.toLowerCase().includes(value)
    );
    setData(filtered);
  };

  return (
    <div className="bg-gray-100">
      {/* Wrapper for Sidebar and Main Content */}
      <div className="flex flex-col lg:flex-row">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Dashboard Header */}
          <header className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          </header>
          {/* Cards Section */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Total Applied Posts", count: 120, color: "blue" },
              { title: "Active Subscriptions", count: 8, color: "green" },
              { title: "Job Reply Messages", count: 3, color: "red" },
            ].map((card, index) => (
              <div
                key={index}
                className={`bg-white p-6 rounded-lg shadow-md text-center border-t-4 border-${card.color}-500`}
              >
                <h3 className="text-lg font-medium text-gray-700 mb-2">
                  {card.title}
                </h3>
                <p className={`text-4xl font-bold text-${card.color}-600`}>
                  {card.count}
                </p>
              </div>
            ))}
          </section>
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-gray-800 mb-4">
              Recent Applied Posts
            </h2>
            <DataTable
              columns={columns}
              data={data}
              pagination
              highlightOnHover
              striped
              responsive
              customStyles={customStyles}
            />
          </div>
          {/* Active Subscription */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-medium text-gray-800 mb-4">
              Active Subscription
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between">
              <p className="text-gray-700">
                You are currently subscribed to the <strong>Pro Plan</strong>,
                renewing on <strong>Feb 10, 2025</strong>.
              </p>
              <Link
                to="/club/subscriptions" // Add the route to user subscription page
                className="mt-4 sm:mt-0 py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Manage Subscription
              </Link>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
