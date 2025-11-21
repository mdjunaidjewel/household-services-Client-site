import React, { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../AuthContext/AuthProvider";
import Swal from "sweetalert2";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // Optionally Loading spinner
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (!user) {
    Swal.fire({
      icon: "info",
      title: "Access Denied",
      text: "You must be logged in to access this page.",
      timer: 2000,
      showConfirmButton: false,
    });
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
