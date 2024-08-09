import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import DashboardPanel from "../layouts/Admin-panel";

const ProtectedRoutes = () => {
  const { token, isAdmin, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while verifying the token
  }

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return (
    <DashboardPanel role={isAdmin ? "admin" : "retailer"}>
      <Outlet />
    </DashboardPanel>
  );
};

export default ProtectedRoutes;