import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // or wherever you store auth

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
