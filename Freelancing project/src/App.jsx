// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './Layout/Layout';
// import Home from './Component/HomePage/Home';
// import AllProducts from './Component/AllProducts/AllProducts';
// import Dashboard from './Component/Dashboard/Dashboard';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path="products" element={<AllProducts />} />
//         </Route>
//         <Route path="/dashboard/*" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './Layout/Layout';
// import Home from './Component/HomePage/Home';
// import AllProducts from './Component/AllProducts/AllProducts';
// import Dashboard from './Component/Dashboard/Dashboard';
// import NotFound from './Component/NotFound/NotFound'; // 👈 هنضيف صفحة 404

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path="products" element={<AllProducts />} />
//           {/* أي مسار غير معروف داخل Layout */}
//           <Route path="*" element={<NotFound />} />
//         </Route>

//         <Route path="/dashboard/*" element={<Dashboard />} />

//         {/* أي مسار غير معروف خارج Layout */}
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './Layout/Layout';
// import Home from './Component/HomePage/Home';
// import AllProducts from './Component/AllProducts/AllProducts';
// import Dashboard from './Component/Dashboard/Dashboard';
// import NotFound from './Component/NotFound/NotFound';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Layout />}>
//           <Route index element={<Home />} />
//           <Route path="products" element={<AllProducts />} />
//           <Route path="*" element={<NotFound />} />
//         </Route>
//         <Route path="/dashboard/*" element={<Dashboard />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Layout from "./Layout/Layout";
// import Home from "./Component/HomePage/Home";
// import AllProducts from "./Component/AllProducts/AllProducts";
// import Dashboard from "./Component/Dashboard/Dashboard";
// import ErrorPage from "./Component/NotFound/ErrorPage";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     errorElement: <ErrorPage />, // 👈 هنا السحر
//     children: [
//       {
//         index: true,
//         element: <Home />,
//       },
//       {
//         path: "products",
//         element: <AllProducts />,
//       },
//       {
//         path: "*",
//         errorElement: <ErrorPage />,
//       },
//     ],
//   },
//   {
//     path: "/dashboard/*",
//     element: <Dashboard />,
//     errorElement: <ErrorPage />,
//   },
//   {
//     path: "*",
//     errorElement: <ErrorPage />,
//   },
// ]);

// function App() {
//   return <RouterProvider router={router} />;
// }

// export default App;
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./Component/HomePage/Home";
import AllProducts from "./Component/AllProducts/AllProducts";
import Dashboard from "./Component/Dashboard/Dashboard";
import ErrorPage from "./Component/NotFound/ErrorPage";
import Layout from "./Layout/Layout";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, // الصفحة الافتراضية للمسار "/"
        element: <Home />,
      },
      {
        path: "products",
        element: <AllProducts />,
        errorElement: <ErrorPage />, // اختياري: يمكنك إضافته هنا إذا أردت معالجة أخطاء خاصة بـ "products"
      },
    ],
  },
  {
    path: "/dashboard", // إزالة "/*" إذا لم تكن هناك مسارات فرعية
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*", // معالجة جميع المسارات غير الموجودة
    element: <ErrorPage />, // يمكن استخدام element بدلاً من errorElement لأن هذا المسار مخصص للأخطاء
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;