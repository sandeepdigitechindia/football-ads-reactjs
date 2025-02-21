import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // If user is not logged in, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If user's role is not allowed, redirect to dashboard
  if (!allowedRoles.includes(userRole)) {
    if (userRole === "player") {
        return <Navigate to={`/user/dashboard`} replace />;
      } else {
        return <Navigate to={`/club/dashboard`} replace />; 
      }
    
  }

  return <Outlet />;
};

export default PrivateRoute;
