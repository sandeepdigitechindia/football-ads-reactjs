import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Don't show breadcrumbs on the home page
  if (pathnames.length === 0) {
    return null;
  }

  return (
    <nav className="bg-gray-100 py-2 px-4 rounded-md text-sm">
      <div className="container py-5 mx-auto">
        <ol className="flex justify-center space-x-2 text-gray-600">
          <li>
            <Link to="/" className="text-blue-600 hover:underline">
              Home
            </Link>
            <span className="mx-1">/</span>
          </li>
          {pathnames.map((value, index) => {
            const isLast = index === pathnames.length - 1;
            const to = `/${pathnames.slice(0, index + 1).join('/')}`;

            return isLast ? (
              <li key={to} className="text-gray-800">
                {value.charAt(0).toUpperCase() + value.slice(1)}
              </li>
            ) : (
              <li key={to}>
                <Link to={to} className="text-blue-600 hover:underline">
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </Link>
                <span className="mx-1">/</span>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
