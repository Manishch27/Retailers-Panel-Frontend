import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import ProtectedRoutes from "./utils/protectedRoutes";
import RoleBasedElement from "./utils/roleBasedElements";
 
// Admin Components
import AdminDashboard from "./pages/admin/Dashboard";
import AddRetailers from "./pages/admin/AddRetailers";

// Retailer Components
import RetailerDashboard from "./pages/retailer/Dashboard";
import UpdateNumber from "./pages/retailer/updateNumber";

// Other Components
import LoginForm from "./components/ui/login";
import Unauthorized from "./pages/unauthorized";
import { useEffect } from "react";
import { loadUser } from "./actions/authActions";
import { useDispatch } from "react-redux";

const router = createBrowserRouter([
  {
    path: "dashboard",
    element: <ProtectedRoutes />,
    children: [
      {
        path: "home",
        element: (
          <RoleBasedElement
            adminComponent={<AdminDashboard />}
            retailerComponent={<RetailerDashboard />}
          />
        ),
      },
      {
        path: "add-retailers",
        element: (
          <RoleBasedElement
            adminComponent={<AddRetailers />}
            retailerComponent={<Navigate to="/dashboard/home" />} // Redirect retailers away from this route
          />
        ),
      },
      {
        path: "update-numbers",
        element: (
          <RoleBasedElement
            adminComponent={<Navigate to="/dashboard/home" />} // Redirect admins away from this route
            retailerComponent={<UpdateNumber/>}
          />
        ),
      },
    ],
  },
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
]);

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;