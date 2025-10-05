import Navbar from "../assets/Component/Navbar/Navbar";
import Footer from "../assets/Component/Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div
      className="d-flex flex-column min-vh-100" 
      style={{ fontFamily: "Tajawal" }}
    >
      <Navbar />
      <main className="flex-fill py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
