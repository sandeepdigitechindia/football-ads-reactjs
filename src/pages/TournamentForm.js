import { useState } from "react";
import { Link } from "react-router-dom";

const TournamentForm = () => {
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
            Tournament Form
            </h1>
            <form
              onSubmit={handleSubmit}
            >
              {/* Club Name */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Club Name
                </label>
                <input
                  type="text"
                  name="club_name"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              {/* Full Address */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Full Address
                </label>
                <input
                  type="text"
                  name="address"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              {/* Organizer Name and Contact */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Organizer Name & Contact
                </label>
                <input
                  type="text"
                  name="organizer_contact"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              {/* Tournament Objective and Date */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Tournament Objective & Date
                </label>
                <input
                  type="text"
                  name="objective_date"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              {/* Number of Teams & Category */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Number of Teams & Category
                </label>
                <input
                  type="text"
                  name="teams_category"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              {/* Specific Teams */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Specific Teams (Professional, Local, International)
                </label>
                <textarea
                  name="specific_teams"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  rows="3"
                ></textarea>
              </div>

              {/* Age Group or Level */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Age Group or Level
                </label>
                <input
                  type="text"
                  name="age_group"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              {/* Tournament Format */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Tournament Format (Group Stages, Knockout, etc.)
                </label>
                <input
                  type="text"
                  name="tournament_format"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              {/* Facilities */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Pitches/Facilities & Availability
                </label>
                <input
                  type="text"
                  name="facilities"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              {/* Budget */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Budget
                </label>
                <input
                  type="text"
                  name="budget"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              {/* Additional Services */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Additional Services (Security, Equipment, Staff)
                </label>
                <textarea
                  name="services"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  rows="3"
                ></textarea>
              </div>

              {/* Video Recording Options */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Video Recording/Match Reports
                </label>
                <input
                  type="text"
                  name="video_options"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              {/* Professional Teams */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Invite Professional Teams?
                </label>
                <input
                  type="text"
                  name="professional_teams"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              {/* Contacting Professional Teams */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Do you have existing contacts for professional teams?
                </label>
                <input
                  type="text"
                  name="pro_contacts"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              {/* Compliance with Pro Team Requirements */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Agree to comply with pro team requirements?
                </label>
                <input
                  type="text"
                  name="pro_requirements"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              {/* Accommodation & Transport */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Accommodation for External Teams
                </label>
                <textarea
                  name="accommodation"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                  rows="3"
                ></textarea>
              </div>

              {/* Transport Assistance */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Require Transport Assistance?
                </label>
                <input
                  type="text"
                  name="transport_assistance"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              {/* Reports and Quotes */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Final Report on Tournament Performance
                </label>
                <input
                  type="text"
                  name="final_report"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Receive a Detailed Quote Before Confirmation?
                </label>
                <input
                  type="text"
                  name="detailed_quote"
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg"
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

export default TournamentForm;
