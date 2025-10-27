import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (isAdmin !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container mt-5">
      <h2>👋 أهلاً بك في لوحة التحكم</h2>
      <p>هذه الصفحة خاصة بالمشرف فقط.</p>

      <button
        className="btn btn-danger mt-3"
        onClick={() => {
          localStorage.removeItem("isAdmin");
          navigate("/login");
        }}
      >
        تسجيل الخروج
      </button>
    </div>
  );
}
