import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Layout from "./Layout/Layout.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "@fontsource/tajawal";
import "./index.css"
import "@fortawesome/fontawesome-free/css/all.min.css";
import Layout from "./Layout/Layout.jsx";
import Home from "./Component/HomePage/Home.jsx";



const Routs = createBrowserRouter([
  {
    path:"",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={Routs}/> 

  
  </>
);
