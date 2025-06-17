import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/stationService";

function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const { username, password, phone } = form;
      await registerUser({ username, password, phone });

      setMessage("Registration successful!");
      setForm({
        username: "",
        password: "",
        confirmPassword: "",
        phone: "",
      });

      setTimeout(() => {
        navigate("/UserLogin");
      }, 1000); // brief pause to show success message

    } catch (err) {
      setMessage(
        err.response?.data?.message ||
        "Registration failed. Try a different username or phone number."
      );
    }
  };

  return (
    <div
      className="relative min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/Register.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="max-w-md w-full bg-white/90 p-8 rounded-xl shadow-2xl backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-6 text-green-700 text-center">Register</h2>
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
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              pattern="[0-9]{10}"
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
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 w-full font-semibold transition"
            >
              Register
            </button>

            {message && (
              <div className={`text-center mt-2 ${message.includes("successful") ? "text-green-600" : "text-red-600"}`}>
                {message}
              </div>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-gray-700">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/UserLogin")}
              className="text-green-700 font-semibold hover:underline"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
