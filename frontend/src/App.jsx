import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Stations from "./pages/Stations";
import Login from "./pages/UserLogin";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import 'leaflet/dist/leaflet.css';
import MapView from "./pages/MapView";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <Router>
      <Navbar />
      <main className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stations" element={<Stations />} />
          <Route path="/UserLogin" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
