import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout.jsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import "@fontsource/tajawal";
import "./index.css"

const Routs = createBrowserRouter([
  {
    path:"",
    element: <Layout />,
    children: [
      // {path:"home" ,element:<Home/>},
      // {path:"allproducts" ,element:<Allproducts/>},
      { path: "welcome", element: <h1>Welcome</h1> },
      { path: "boda", element: <h1>bodaaa</h1> },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={Routs}/> 

  
  </>
);
