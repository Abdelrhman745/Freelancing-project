
import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar/Navbar";
import Footer from "../Component/Footer/Footer";
import ContactUs from "../Component/HomePage/ContactUs/ContactUs";

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
      <ContactUs />
    <Footer />
    </div>
  );
}
