
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ element, requiredAdmin }) => {
    const { token, isAdmin, loading} = useSelector(state => state.auth);
    const location = useLocation();

    console.log("user is = ",loading);

    if (loading) {
        return <div>Loading...</div>; // Show a loading indicator while verifying the token
    }

    if (!token) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (requiredAdmin && !isAdmin) {
        return <Navigate to="/unauthorized" state={{ from: location }} replace />;
    }

    return element;
};

export default ProtectedRoutes;