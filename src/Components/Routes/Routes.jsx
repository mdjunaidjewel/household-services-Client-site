import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import NotFound from "../../Pages/NotFound/NotFound";
import Home from "../../Pages/Home/Home";
import Login from "../../Pages/Login/Login";
import Signup from "../../Pages/Signup/Signup";
import Profile from "../../Pages/Profile/Profile";
import ForgotPassword from "../../Pages/ForgotPassword/ForgotPassword";
import PrivateRoute from "./PrivateRoutes";
import Services from "../../Pages/Services/Services";
import AddService from "../../Pages/AddService/AddService";
import MyServices from "../../Pages/MyServices/MyServices";
import ServiceDetails from "../../Pages/Services/ServiceDetails";
import MyBookings from "../../Pages/MyBookings/MyBookings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Signup></Signup>,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "forgot-password",
        element: <ForgotPassword></ForgotPassword>,
      },
      {
        path: "services",
        element: <Services></Services>,
      },
      {
        path: "add-service",
        element: (
          <PrivateRoute>
            <AddService></AddService>
          </PrivateRoute>
        ),
      },
      {
        path: "my-services",
        element: (
          <PrivateRoute>
            <MyServices></MyServices>
          </PrivateRoute>
        ),
      },
      {
        path: "service-details/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/services/${params.id}`),
        element: (
          <PrivateRoute>
            <ServiceDetails></ServiceDetails>,
          </PrivateRoute>
        ),
      },
      {
        path: "my-bookings",
        element: <MyBookings></MyBookings>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);