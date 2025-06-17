import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function UserLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

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
          setMessage("Admin cannot login from User Login page. Please use the Admin Login page.");
          setForm({ username: "", password: "" });
          return;
        }
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("isAdmin", "false");
        localStorage.setItem("isLoggedIn", "true");
        setMessage("User login successful!");
        setForm({ username: "", password: "" });
        navigate("/stations");
        window.location.reload();
      }
    } catch (err) {
      setMessage(
        err.response?.data?.message || "User login failed. Please check your credentials."
      );
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col justify-center items-center bg-cover bg-center"
      style={{ backgroundImage: "url('/Register.png')" }}
    >
      <div className="absolute inset-0 bg-blue-900/50"></div>

      <div className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-md p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-6">
          Welcome Back
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          {message && (
            <div className="text-center text-sm text-red-600">{message}</div>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <div className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            className="text-blue-700 hover:underline font-medium"
            onClick={() => navigate("/register")}
          >
            Register Here
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
