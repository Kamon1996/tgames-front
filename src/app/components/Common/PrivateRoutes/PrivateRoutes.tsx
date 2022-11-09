import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = ({ permission }) => {
  return permission ? <Outlet /> : <Navigate to="/404" />;
};
