import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <h2 className="text-2xl mt-4">Page Not Found</h2>
      <p className="mt-2">Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Go to Home</Link>
    </div>
  );
};

export default NotFoundPage;
