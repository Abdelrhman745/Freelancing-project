import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.jpeg";

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary px-3">
        <div className="container-fluid">
          <div className="d-flex align-items-center me-auto">
            <img
              src={logo}
              alt="Logo"
              width="40"
              height="40"
              className="me-2"
              style={{ objectFit: "contain" }}
            />
            <span className="navbar-brand mb-0 h1">BOBOS</span>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active fw-bold text-primary" : ""}`
                  }
                >
                  الرئيسية
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/all"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active fw-bold text-primary" : ""}`
                  }
                >
                  كل المنتجات
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active fw-bold text-primary" : ""}`
                  }
                >
                  اتصل بنا
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `nav-link ${isActive ? "active fw-bold text-primary" : ""}`
                  }
                >
                  لوحة التحكم
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
