import { useState } from "react";
import { Link } from "react-router-dom";

const CustomerServicesForms = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
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
              Registrations for Professional Tournaments
            </h1>
            <form onSubmit={handleSubmit}>
              {/* General Information */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Name of the club
                </label>
                <input
                  type="text"
                  name="club_name"
                  value={formData.club_name}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.club_name ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.club_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.club_name}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Full address
                </label>
                <input
                  type="text"
                  name="full_address"
                  value={formData.full_address}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.full_address ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.full_address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.full_address}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Name and contact of the manager (telephone and e-mail)
                </label>
                <input
                  type="text"
                  name="manager_contact"
                  value={formData.manager_contact}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.manager_contact
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.manager_contact && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.manager_contact}
                  </p>
                )}
              </div>

              {/* Tournament Details */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  What type of tournament do you wish to register your club for?
                </label>
                <input
                  type="text"
                  name="tournament_type"
                  value={formData.tournament_type}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.tournament_type
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.tournament_type && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.tournament_type}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  What are the objectives of your participation?
                </label>
                <input
                  type="text"
                  name="objectives"
                  value={formData.objectives}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.objectives ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.objectives && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.objectives}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  What age groups or levels are concerned by the registration?
                </label>
                <input
                  type="text"
                  name="age_levels"
                  value={formData.age_levels}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.age_levels ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.age_levels && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.age_levels}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Do you have specific tournaments in mind? If yes, please list
                  them.
                </label>
                <textarea
                  name="specific_tournaments"
                  value={formData.specific_tournaments}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.specific_tournaments
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  rows="4"
                ></textarea>
                {errors.specific_tournaments && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.specific_tournaments}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Are you prepared to respect the conditions of the
                  specifications of the organizers? (Yes / No)
                </label>
                <input
                  type="text"
                  name="conditions_agreement"
                  value={formData.conditions_agreement}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.conditions_agreement
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.conditions_agreement && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.conditions_agreement}
                  </p>
                )}
              </div>

              {/* Logistical Aspects */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Do you have the necessary documents for registration?
                </label>
                <input
                  type="text"
                  name="necessary_documents"
                  value={formData.necessary_documents}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.necessary_documents
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.necessary_documents && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.necessary_documents}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Would you like assistance with administrative or logistical
                  management?
                </label>
                <input
                  type="text"
                  name="logistical_assistance"
                  value={formData.logistical_assistance}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.logistical_assistance
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.logistical_assistance && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.logistical_assistance}
                  </p>
                )}
              </div>

              {/* Budget */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  What is your approximate budget for participation?
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`w-full p-3 border ${
                    errors.budget ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.budget && (
                  <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
                )}
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

          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Form for Organizing Meetings with Professional Teams
            </h1>
            <form onSubmit={handleSubmit}>
              {/* General Information */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Name of the club:
                </label>
                <input
                  type="text"
                  name="clubName"
                  value={formData.clubName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Full address:
                </label>
                <input
                  type="text"
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Name and contact of the person in charge (telephone and
                  email):
                </label>
                <input
                  type="text"
                  name="managerName"
                  value={formData.managerName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Meeting Details */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Would you like to organize a friendly meeting or a training
                  session?
                </label>
                <input
                  type="text"
                  name="meetingType"
                  value={formData.meetingType}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  What is the objective of the meeting (competition, learning,
                  experience, other)?
                </label>
                <input
                  type="text"
                  name="meetingObjective"
                  value={formData.meetingObjective}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  What age groups or levels of players are concerned?
                </label>
                <input
                  type="text"
                  name="ageGroups"
                  value={formData.ageGroups}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Is there a specific professional team that you would like to
                  meet?
                </label>
                <input
                  type="text"
                  name="specificTeam"
                  value={formData.specificTeam}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Logistical Aspects */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Do you have a field and the necessary facilities to host the
                  professional team in case the professional team agrees to
                  travel?
                </label>
                <input
                  type="text"
                  name="hasField"
                  value={formData.hasField}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Would you like assistance in organizing the event (booking,
                  equipment, coordination)?
                </label>
                <input
                  type="text"
                  name="assistanceNeeded"
                  value={formData.assistanceNeeded}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              {/* Budget */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  What is your planned budget for this meeting?
                </label>
                <input
                  type="text"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-medium">
                  Are you willing to bear the costs of the invited professional
                  team? (Yes / No)
                </label>
                <input
                  type="text"
                  name="coverCosts"
                  value={formData.coverCosts}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg"
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
          
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Form for the Ad Hoc Dispatch of an Employee for Urgent Needs
            </h1>
            <form onSubmit={handleSubmit}>
              {/* Club Name */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Club Name
                </label>
                <input
                  type="text"
                  name="clubName"
                  value={formData.clubName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Full Address */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Full Address
                </label>
                <input
                  type="text"
                  name="fullAddress"
                  value={formData.fullAddress}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Manager Name & Contact */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Manager's Name and Contact Information (Phone and Email)
                </label>
                <input
                  type="text"
                  name="managerName"
                  value={formData.managerName}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Urgent Need */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  What is the urgent need for which you are requesting an
                  employee?
                </label>
                <input
                  type="text"
                  name="urgentNeed"
                  value={formData.urgentNeed}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Required Skills */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  What skills or qualifications are required to meet this need?
                </label>
                <input
                  type="text"
                  name="requiredSkills"
                  value={formData.requiredSkills}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Timeframe */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  What is the timeframe or period for which you require
                  assistance?
                </label>
                <input
                  type="text"
                  name="timeframe"
                  value={formData.timeframe}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Assistance Type */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Do you require on-site presence or remote assistance?
                </label>
                <input
                  type="text"
                  name="assistanceType"
                  value={formData.assistanceType}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Employee Preferences */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Do you have any specific preferences regarding the employee's
                  profile?
                </label>
                <input
                  type="text"
                  name="employeePreferences"
                  value={formData.employeePreferences}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Flexibility */}
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-2">
                  Are you flexible?
                </label>
                <input
                  type="text"
                  name="flexibility"
                  value={formData.flexibility}
                  onChange={handleChange}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default CustomerServicesForms;
