import { useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const isDarkBg = ["/", "/stations", "/login", "/register", "/admin-login"].includes(location.pathname);

  return (
    <footer
      className={`w-full text-center p-6 font-sans text-sm transition ${
        isDarkBg
          ? "bg-white/20 backdrop-blur-md text-gray-900 shadow-md"
          : "bg-white text-gray-600 border-t border-gray-200"
      }`}
      style={{
        fontFamily: "'Poppins', sans-serif",
        letterSpacing: "0.02em",
      }}
    >
      <p>
        © {new Date().getFullYear()}{" "}
        <span className={`${isDarkBg ? "text-green-700 font-semibold" : "text-green-600 font-semibold"}`}>
          Rohit Singh Yadav
        </span>{" "}
        — All rights reserved
      </p>
    </footer>
  );
}

export default Footer;
