import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/user/Sidebar";
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
      status: "Published",
    },
    {
      id: 2,
      image: "/common/club.png",
      name: "Club 2",
      title: "Post Title 2",
      description: "Description for Post Title 2.",
      date: "Jan 9, 2025",
      status: "Draft",
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
      status: "Published",
    },
  ];

  const [data, setData] = useState(initialData);
  const [searchTerm, setSearchTerm] = useState("");

  // Columns for DataTable
  const columns = [
    {
      name: "Club",
      selector: (row) => (
        <img src={row.image} alt="club" className="w-10 h-10" />
      ),
      sortable: true,
    },
    {
      name: "Club Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Job Title",
      selector: (row) => (
        <button
          className="text-blue-500 underline"
          onClick={() => navigate(`/user/post/${row.id}`)}
        >
          {row.title}
        </button>
      ),
      sortable: true,
    },
    {
      name: "Job Post Description",
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
    },
    {
      name: "Published",
      selector: (row) => (
        <span
          className={`font-semibold ${
            row.status === "Published"
              ? "text-green-600"
              : row.status === "Draft"
              ? "text-yellow-600"
              : "text-red-600"
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    {
      name: "Apply",
      cell: (row) => (
        <button
          onClick={() => alert(`Applied for ${row.title}`)}
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Apply
        </button>
      ),
    },
  ];

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
              { title: "New Messages", count: 3, color: "red" },
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
          {/* Search Input */}
          <div className="bg-white p-4 rounded-lg shadow-md mb-6">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* Recent Posts Table */}
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
                to="/user/subscriptions" // Add the route to user subscription page
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
