import React from "react";
const Dashboard = () => {
  return (
    <div className="home">
      <div className="space-y-4">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-medium">Welcome to your dashboard</h2>
          <p className="text-gray-700">
            Here you can manage all your activities.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
