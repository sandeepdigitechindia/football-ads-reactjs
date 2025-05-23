import React, { useState, useEffect } from "react";
import Sidebar from "../../components/user/Sidebar";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
import API from "../../api";
import Loader from "../../components/Loader";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Posts = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await API.get("/api/user/posts?limit=50&recent=true", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Ensure the response is an array
        if (!Array.isArray(response.data)) {
          throw new Error("Invalid response format");
        }

        const postsFromAPI = response.data.map((post) => ({
          id: post.postId._id || "",
          image: BASE_URL + post.clubId.club_logo || "/common/club.png",
          name: post.clubId.club_name || "N/A",
          title: post.postId.title || "N/A",
          description: post.postId.description || "N/A",
          applicantsCount: "5",
          date: new Date(post.createdAt).toLocaleDateString("en-GB") || "N/A",
          status: post.postId.status === "true" ? "Open" : "Close",
        }));

        setData(postsFromAPI);
        setOriginalData(postsFromAPI);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error.response?.data?.message || "Failed to fetch posts");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

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
      center: true,
    },
    {
      name: "Club Name",
      selector: (row) => row.name,
      sortable: true,
      cell: (row) => (
        <div className="font-semibold text-gray-700 text-center">
          {row.name}
        </div>
      ),
      center: true,
    },
    {
      name: "Job Title",
      selector: (row) => row.title,
      sortable: true,
      center: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: true,
      cell: (row) => (
        <div className="text-sm text-gray-600 text-center">
          {row.description}
        </div>
      ),
      center: true,
    },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      cell: (row) => (
        <div className="text-gray-500 text-center">{row.date}</div>
      ),
      center: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            row.status === "Open" || row.status === "Applied"
              ? "bg-green-100 text-green-700"
              : row.status === "Close"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          } text-center`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
      center: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="text-center">
          {/* <button
            className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition shadow disabled:bg-gray-400 disabled:cursor-not-allowed"
            onClick={() => navigate(`/user/post/${row.id}`)}
            disabled={row.status === "Applied"}
          >
            {row.status === "Applied" ? "Applied" : "Apply"}
          </button> */}

          {/* <br /> */}
          {/* <br /> */}

          <button
            className="py-2 px-5 bg-gray-500 text-white rounded hover:bg-blue-600 transition shadow"
            onClick={() => navigate(`/user/post/view/${row.id}`)}
          >
            View
          </button>
        </div>
      ),
      center: true,
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
        textAlign: "center",
      },
    },
    headRow: {
      style: {
        backgroundColor: "#e5e7eb",
        fontWeight: "bold",
        fontSize: "14px",
        color: "#4b5563",
        textAlign: "center",
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
        textAlign: "center", // Center-align the rows
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
    if (value === "") {
      setData(originalData);
    } else {
      const filtered = originalData.filter(
        (post) =>
          post.clubId.club_name.toLowerCase().includes(value) ||
          post.postId.title.toLowerCase().includes(value)
      );
      setData(filtered);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="bg-gray-100">
      {/* Wrapper for Sidebar and Main Content */}
      <div className="flex flex-col lg:flex-row">
        <Sidebar />

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Posts Header */}
          <header className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-gray-800">All Posts</h1>
            {/* <Link to={'/user/post/create'} className="py-2 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
              Add New &#43;
            </Link> */}
          </header>

          <div className="bg-white p-6 rounded shadow">
            {/* Header with Search Input */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-800">All Posts</h2>
              <div className="relative mt-2 sm:mt-0 w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full p-3 pl-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-4.35-4.35M16.5 10.5a6 6 0 11-12 0 6 6 0 0112 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Data Table */}
            {loading ? (
              <p>Loading clubs...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="overflow-x-auto">
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
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Posts;
