import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const isMap = location.pathname === "/map";
  const isDarkBg = ["/", "/stations", "/UserLogin", "/register", "/admin-login"].includes(location.pathname);

  // Check login status
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  window.addEventListener("storage", () => {
    setLoggedIn(!!localStorage.getItem("token"));
  });

  const handleAdminLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setLoggedIn(false);
    navigate("/");
  };

  const handleUserLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <nav
      className={`px-8 py-4 flex justify-between items-center font-sans shadow-lg transition-all duration-300
        ${
          isMap
            ? "text-black"
            : isDarkBg
            ? "bg-white/30 backdrop-blur-md absolute w-full top-0 left-0 z-20 text-gray-900 shadow-lg"
            : "bg-white shadow-md text-gray-700 sticky top-0 z-20 border-b border-gray-200"
        }
      `}
      style={{
        fontFamily: "'Poppins', 'Inter', ui-sans-serif, system-ui, sans-serif",
        letterSpacing: "0.02em",
        backgroundImage: isMap ? "url('/EVCharge.jpeg')" : undefined,
        backgroundSize: isMap ? "cover" : undefined,
        backgroundPosition: isMap ? "center" : undefined,
        minHeight: "80px",
        zIndex: 20,
      }}
    >
      {/* EVCharge word on the left */}
      <Link
        to="/"
        className="flex items-center"
      >
        <span
          className="text-3xl font-extrabold tracking-tight transition hover:scale-105"
          style={{
            background: "linear-gradient(90deg, #00C853 30%, #00B8D4 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textShadow: "0 2px 16px rgba(0,0,0,0.18), 0 1px 0 #fff",
            padding: "0.25em 0.75em",
            borderRadius: "0.75em",
            letterSpacing: "0.04em",
            display: "inline-block",
            filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.12))",
          }}
        >
          EVCharge
        </span>
      </Link>
      <div className="flex space-x-4 md:space-x-8 items-center">
        <Link
          to="/"
          className={`font-semibold transition rounded px-3 py-1 hover:bg-primary hover:text-white ${
            location.pathname === "/" ? "underline underline-offset-4 text-primary" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/stations"
          className={`font-semibold transition rounded px-3 py-1 hover:bg-primary hover:text-white ${
            location.pathname === "/stations" ? "underline underline-offset-4 text-primary" : ""
          }`}
        >
          Stations
        </Link>
        <Link
          to="/map"
          className={`font-semibold transition rounded px-3 py-1 hover:bg-accent hover:text-white ${
            location.pathname === "/map" ? "underline underline-offset-4 text-accent" : ""
          }`}
        >
          Map
        </Link>
        {!loggedIn && (
          <>
            <Link
              to="/UserLogin"
              className={`font-semibold transition rounded px-3 py-1 hover:bg-primary hover:text-white ${
                location.pathname === "/UserLogin" ? "underline underline-offset-4 text-primary" : ""
              }`}
            >
              User Login
            </Link>
            <Link
              to="/register"
              className={`font-semibold transition rounded px-3 py-1 hover:bg-accent hover:text-white ${
                location.pathname === "/register" ? "underline underline-offset-4 text-accent" : ""
              }`}
            >
              Register
            </Link>
            <Link
              to="/admin-login"
              className={`font-semibold transition rounded px-3 py-1 hover:bg-primary hover:text-white ${
                location.pathname === "/admin-login" ? "underline underline-offset-4 text-primary" : ""
              }`}
            >
              Admin
            </Link>
          </>
        )}
        {loggedIn && (
          <>
            {isAdmin ? (
              <button
                onClick={handleAdminLogout}
                className="font-semibold text-white bg-gradient-to-r from-primary to-accent px-4 py-2 rounded shadow hover:from-accent hover:to-primary transition"
              >
                Admin Logout
              </button>
            ) : (
              <button
                onClick={handleUserLogout}
                className="font-semibold text-white bg-gradient-to-r from-accent to-primary px-4 py-2 rounded shadow hover:from-primary hover:to-accent transition"
              >
                User Logout
              </button>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
