// src/routes/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const accessToken = localStorage.getItem("access");

  console.log("Access token trong PrivateRoute:", accessToken);
  if (!accessToken) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};

export default PrivateRoute;
