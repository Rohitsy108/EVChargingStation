import { Link, useLocation } from "react-router-dom";
import { FaBolt, FaMapMarkerAlt, FaUsers } from "react-icons/fa";

function Home() {
  const location = useLocation();

  return (
    <div
      className="relative min-h-screen flex items-center justify-center font-sans"
      style={{
        backgroundImage: "url('/Home.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/20 to-white/10 backdrop-blur-sm"></div>

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center py-24 px-6">
        <div className="max-w-3xl w-full bg-white/40 backdrop-blur-lg rounded-2xl shadow-2xl p-10 mx-auto animate-fade-in border border-white/30">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 drop-shadow-md text-center">
            Welcome to <span className="text-green-600">EVCharge</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-800 mb-10 max-w-2xl mx-auto text-center leading-relaxed">
            Find, book, and manage electric vehicle charging stations easily. Join our
            community to make EV charging simple and accessible for everyone.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            <Link
              to="/stations"
              className="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-green-700 transition text-lg"
            >
              Find Stations
            </Link>
            <Link
              to="/register"
              className="bg-white border border-green-600 text-green-700 px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-green-100 transition text-lg"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="bg-gray-100 border border-gray-400 text-gray-800 px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-gray-200 transition text-lg"
            >
              Log In
            </Link>
            <Link
              to="/admin-login"
              className={`px-8 py-3 rounded-xl font-semibold border transition shadow-md ${
                location.pathname === "/admin-login"
                  ? "bg-green-700 text-white"
                  : "bg-white text-green-800 border-green-600 hover:bg-green-100"
              }`}
            >
              Admin
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
          {[
            {
              icon: <FaBolt className="text-green-500 text-3xl mb-3" />,
              title: "Easy Booking",
              desc: "Reserve your charging slot in advance and avoid waiting in line.",
            },
            {
              icon: <FaMapMarkerAlt className="text-green-500 text-3xl mb-3" />,
              title: "Real-time Availability",
              desc: "See live station status and choose the best option for your needs.",
            },
            {
              icon: <FaUsers className="text-green-500 text-3xl mb-3" />,
              title: "Community Reviews",
              desc: "Read and share experiences to help others find the best stations.",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white/60 rounded-xl shadow-lg p-8 flex flex-col items-center text-center backdrop-blur-md border border-white/30"
            >
              {item.icon}
              <h2 className="text-xl font-semibold text-green-800 mb-2">{item.title}</h2>
              <p className="text-gray-700">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
