import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@admin.com" && password === "AAA111") {
      localStorage.setItem("isAdmin", "true");
      navigate("/dashboard");
    } else {
      setError("❌ البريد الإلكتروني أو كلمة المرور غير صحيحة");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">تسجيل الدخول</h3>

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">البريد الإلكتروني</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=""
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">كلمة المرور</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=""
            required
          />
        </div>

        {error && <p className="text-danger text-center">{error}</p>}

        <button type="submit" className="btn btn-primary w-100">
          تسجيل الدخول
        </button>
      </form>
    </div>
  );
}
