import React from "react";
import Index from "./views/Index.js";
import Profile from "./views/examples/Profile.js";
import Register from "./views/examples/Register.js";
import Login from "./views/examples/Login.js";
import ProtectedRoute from "./ProtectedRoute"; 

var routes = [
  {
    path: "/index",
    name: "Home Page",
    icon: "ni ni-tv-2 text-primary",
    component: <ProtectedRoute><Index /></ProtectedRoute>,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <ProtectedRoute><Profile /></ProtectedRoute>,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: <Register />,
    layout: "/auth",
  },
 
];

export default routes;
