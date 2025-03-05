import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../components/club/Sidebar";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import API from "../../api";
import Loader from "../../components/Loader";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const Dashboard = () => {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [stats, setStats] = useState([]);
  
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await API.get("/api/club/dashboard");

        // Ensure the response is an array
        if (!Array.isArray(response.data)) {
          throw new Error("Invalid response format");
        }

        const postsFromAPI = response.data.map((data) => ({
          title: data.title || "N/A",
          count: data.count || "N/A",
          gradient: data.gradient || "N/A",
          shadow: data.shadow || "N/A",
          link: data.link || "N/A",
        }));

        setStats(postsFromAPI);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
        setError(error.response?.data?.message || "Failed to fetch dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await API.get("/api/club/posts?limit=50&recent=true", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Ensure the response is an array
        if (!Array.isArray(response.data)) {
          throw new Error("Invalid response format");
        }

        const postsFromAPI = response.data.map((post) => ({
          id: post._id || "",
          image: BASE_URL + post.userId.club_logo || "/common/club.png",
          name: post.userId.club_name || "N/A",
          title: post.title || "N/A",
          applicantsCount: post.applicantCount,
          date: new Date(post.createdAt).toLocaleDateString("en-GB") || "N/A",
          status: post.status === "true" ? "Open" : "Close",
        
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

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (value === "") {
      setData(originalData);
    } else {
      const filtered = originalData.filter(
        (post) =>
          post.club_name.toLowerCase().includes(value) ||
          post.title.toLowerCase().includes(value)
      );
      setData(filtered);
    }
  };

  // Handle Delete Post (e.g., delete from API or state)
  const handleDeletePost = async (postId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await API.delete(`/api/club/posts/permanent/${postId}`);
          setData((prevPosts) =>
            prevPosts.filter((post) => post.id !== postId)
          );
          Swal.fire("Deleted!", "Post has been deleted.", "success");
        } catch (error) {
          Swal.fire("Error!", "Failed to delete post. Try again.", "error");
        }
      }
    });
  };

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
            row.status === "Open"
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
      name: "Applicants with Counts",
      selector: (row) => row.applicantsCount,
      sortable: true,
      cell: (row) => (
        <div className="text-sm text-gray-600 text-center">
          <div
            className="inline-flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full cursor-pointer"
            onClick={() => navigate(`/club/post/applicants/${row.id}`)}
          >
            {row.applicantsCount}
          </div>{" "}
          Applicants
        </div>
      ),
      center: true,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="text-center relative">
          <select
            className="p-2 mx-4 border rounded shadow-sm outline-none"
            onChange={(e) => {
              const action = e.target.value;
              if (action === "view") {
                navigate(`/club/post/view/${row.id}`);
              } else if (action === "edit") {
                navigate(`/club/post/edit/${row.id}`);
              } else if (action === "delete") {
                handleDeletePost(row.id);
              }
              e.target.value = "";
            }}
          >
            <option value="" className="">
              Action
            </option>
            <option value="view">👁️ View</option>
            <option value="edit">✏️ Edit</option>
            <option value="delete">🗑️ Delete</option>
          </select>
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
        textAlign: "center",
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
          {/* Dashboard Header */}
          <header className="flex justify-between items-center flex-wrap gap-4">
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          </header>
          {/* Cards Section */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((card, index) => (
              <div
                key={index}
                className={`relative bg-gradient-to-r ${card.gradient} p-4 rounded-xl text-white transform transition duration-300 hover:-translate-y-2 hover:shadow-2xl ${card.shadow}`}
              >
                {/* Card Content */}
                <h3 className="text-md font-semibold mb-2">{card.title}</h3>
                <p className="text-3xl font-extrabold mb-3">{card.count}</p>

                {/* Align button to bottom-right */}
                <div className="absolute bottom-4 right-4">
                  <Link
                    to={card.link}
                    className="bg-white text-gray-800 py-1 px-2 text-sm rounded shadow hover:bg-gray-100 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </section>

          <div className="bg-white p-6 rounded shadow">
            {/* Header with Search Input */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
              <h2 className="text-xl font-medium text-gray-800">
                Recent Added Posts
              </h2>
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

export default Dashboard;
