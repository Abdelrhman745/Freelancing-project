export default function Footer() {
  return (
    <footer
      className="bg-dark text-light text-center py-3 mt-auto"
      style={{
        fontFamily: "Tajawal",
        fontSize: "14px",
      }}
    >
      © {new Date().getFullYear()} <span className="fw-bold">BOBOS</span> — جميع الحقوق محفوظة
    </footer>
  );
}
