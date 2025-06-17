import { useState } from "react";
import axios from "axios";
import { FaUserShield } from "react-icons/fa";

function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("http://localhost:5000/api/login", form);
      if (res.data && res.data.token) {
        if (res.data.isAdmin === true) {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("isAdmin", "true");
          setMessage("Admin login successful!");
          setForm({ username: "", password: "" });
          window.location.href = "/stations";
        } else {
          setMessage("You are not an admin. Please use the User Login page.");
        }
      } else {
        setMessage("Not an admin user.");
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/Login.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-green-900/40"></div>
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="max-w-md w-full bg-white/90 p-8 rounded-xl shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-center mb-4">
            <FaUserShield className="text-green-700 text-3xl mr-2" />
            <h2 className="text-2xl font-bold text-green-700 text-center">Admin Log In</h2>
          </div>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <button className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 w-full font-semibold transition">
              Log In as Admin
            </button>
            {message && (
              <div className="text-center text-red-600 mt-2">{message}</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;



