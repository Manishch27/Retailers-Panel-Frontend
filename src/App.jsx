import AdminPanel from "./layouts/Admin-panel.jsx";
import LoginForm from "./components/ui/login";
import Dashboard from "./pages/Dashboard.jsx";
import UpdateNumber from "./pages/updateNumber.jsx";
import { login } from "./actions/authActions.js";
import ProtectedRoutes from "./utils/protectedRoutes.jsx";
import RedirectIfAuthenticated from "./utils/redirectIfAuthenticated.jsx";
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/authActions';
import { useEffect } from 'react';
import Unauthorized from "./pages/unauthorized.jsx";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


{console.log(`your login status is`,login)}

const router = createBrowserRouter([
  {
    path: "dashboard",
    element: <ProtectedRoutes element = {<AdminPanel/>} requiredAdmin={true}/>,
    children: [
      {
        path: "home",
        element: <Dashboard/>
      },

      {
        path: "update-number",
        element: <UpdateNumber/>
      }
    ]
  },

    {
      path: "/",
      element: <RedirectIfAuthenticated element={<LoginForm />} />
    },

  {
    path: "/unauthorized",
    element:<Unauthorized/>
  }
]);

const App = () =>{
  const dispatch = useDispatch();


useEffect(() => {
  dispatch(loadUser());
}, [dispatch]);



  return (
    <div>
      <RouterProvider router={router}/>
        </div>
  )
}

export default App;