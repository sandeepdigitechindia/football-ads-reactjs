import { useState } from "react";
import { Link } from "react-router-dom";
const ScoutingOrganizationForm = () => {
  const [formData, setFormData] = useState({});
  // const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Perform form validation and submission logic here
    setLoading(false);
  };

  return (
    <div className="bg-gray-100">
      {/* Wrapper for Sidebar and Main Content */}
      <div className="flex flex-col lg:flex-row">
       

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Scouting Organization Form
            </h1>
            <form onSubmit={handleSubmit}>
             
              {/* General Information */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Club Name
                </label>
                <input
                  type="text"
                  name="clubName"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Full Address
                </label>
                <textarea
                  name="fullAddress"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Scouting Manager Name & Contact
                </label>
                <input
                  type="text"
                  name="scoutingManager"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Scouting Details */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Preferred Positions or Player Profiles
                </label>
                <input
                  type="text"
                  name="preferredPositions"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Scouting Category
                </label>
                <input
                  type="text"
                  name="scoutingCategory"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Expected Number of Players
                </label>
                <input
                  type="number"
                  name="playerCount"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Scouting Level
                </label>
                <input
                  type="text"
                  name="scoutingLevel"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Match Format
                </label>
                <input
                  type="text"
                  name="matchFormat"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Facilities Availability
                </label>
                <input
                  type="text"
                  name="facilities"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Logistics */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Logistics & Security Needs
                </label>
                <input
                  type="text"
                  name="logistics"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Video Services Needed?
                </label>
                <input
                  type="checkbox"
                  name="videoServices"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      videoServices: e.target.checked,
                    })
                  }
                />
              </div>

              {/* Administrative Aspects */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Final Registration Deadline
                </label>
                <input
                  type="date"
                  name="registrationDeadline"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Verification Requirements for Players
                </label>
                <input
                  type="text"
                  name="verificationRequirements"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Event Communication Needs
                </label>
                <input
                  type="text"
                  name="eventCommunication"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Additional Options */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Supervision Staff Needed?
                </label>
                <input
                  type="checkbox"
                  name="supervisionStaff"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      supervisionStaff: e.target.checked,
                    })
                  }
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ScoutingOrganizationForm;
