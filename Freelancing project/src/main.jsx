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
import AllProducts from "./Component/AllProducts/AllProducts.jsx";
import ContactUs from "./Component/HomePage/ContactUs/ContactUs.jsx";
import ProductDetails from "./Component/ProductDetails/ProductDetails.jsx";



const Routs = createBrowserRouter([
  {
    path:"",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      {path:"all" , element:<AllProducts /> },
      {path:"product/:id/:category" , element:<ProductDetails />},
      {path:"contact" , element:<ContactUs />}
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={Routs}/> 

  
  </>
);
