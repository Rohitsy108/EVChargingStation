import { useState } from "react";
import StationCard from "../components/StationCard";

const initialStations = [
  {
    id: 1,
    name: "Connaught Place EV Central",
    location: "Connaught Place",
    image: "/StationCard1.jpg",
    lat: 28.6315,
    lng: 77.2167,
    status: "available",
    powerOutput: "22",
    connectorType: "Type2",
  },
  {
    id: 2,
    name: "Saket Power Hub",
    location: "Saket",
    image: "/StationCard2.jpg",
    lat: 28.5245,
    lng: 77.2066,
    status: "occupied",
    powerOutput: "50",
    connectorType: "CCS",
  },
  {
    id: 3,
    name: "Dwarka ChargePoint",
    location: "Dwarka",
    image: "/StationCard3.jpg",
    lat: 28.5921,
    lng: 77.046,
    status: "available",
    powerOutput: "150",
    connectorType: "CHAdeMO",
  },
  {
    id: 4,
    name: "Karol Bagh EV Plaza",
    location: "Karol Bagh",
    image: "/StationCard4.jpg",
    lat: 28.6512,
    lng: 77.1906,
    status: "offline",
    powerOutput: "22",
    connectorType: "Type2",
  },
  {
    id: 5,
    name: "Lajpat Nagar Green Plug",
    location: "Lajpat Nagar",
    image: "/StationCard5.jpg",
    lat: 28.5672,
    lng: 77.2436,
    status: "available",
    powerOutput: "50",
    connectorType: "CCS",
  },
  {
    id: 6,
    name: "Vasant Kunj FastCharge",
    location: "Vasant Kunj",
    image: "/StationCard6.jpg",
    lat: 28.5204,
    lng: 77.1557,
    status: "occupied",
    powerOutput: "150",
    connectorType: "CHAdeMO",
  },
  {
    id: 7,
    name: "Rohini E-Station",
    location: "Rohini",
    image: "/StationCard7.jpg",
    lat: 28.7499,
    lng: 77.0565,
    status: "available",
    powerOutput: "22",
    connectorType: "Type2",
  },
  {
    id: 8,
    name: "Nehru Place Volt",
    location: "Nehru Place",
    image: "/StationCard8.jpg",
    lat: 28.5494,
    lng: 77.2513,
    status: "offline",
    powerOutput: "50",
    connectorType: "CCS",
  },
];

export default function Stations() {
  const [stations, setStations] = useState(initialStations);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterConnector, setFilterConnector] = useState("");
  const [filterPower, setFilterPower] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editStation, setEditStation] = useState(null);

  const [form, setForm] = useState({
    name: "",
    location: "",
    image: "",
    status: "available",
    powerOutput: "22",
    connectorType: "Type2",
  });

  const openModal = (station = null) => {
    setEditStation(station);
    setForm(
      station
        ? { ...station }
        : {
            name: "",
            location: "",
            image: "",
            status: "available",
            powerOutput: "22",
            connectorType: "Type2",
          }
    );
    setShowModal(true);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editStation) {
      setStations((prev) =>
        prev.map((s) => (s.id === editStation.id ? { ...form, id: editStation.id } : s))
      );
    } else {
      setStations((prev) => [
        ...prev,
        { ...form, id: Date.now(), image: form.image || "/StationCard1.jpg" },
      ]);
    }

    setShowModal(false);
    setEditStation(null);
    setForm({
      name: "",
      location: "",
      image: "",
      status: "available",
      powerOutput: "22",
      connectorType: "Type2",
    });
  };

  const handleDelete = (id) => {
    setStations((prev) => prev.filter((s) => s.id !== id));
  };

  const filteredStations = stations.filter((station) => {
    const statusMatch = !filterStatus || station.status === filterStatus;
    const connectorMatch = !filterConnector || station.connectorType === filterConnector;
    const powerMatch = !filterPower || station.powerOutput === filterPower;
    return statusMatch && connectorMatch && powerMatch;
  });

  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <div
      className="relative min-h-[80vh] flex flex-col items-center font-sans"
      style={{
        backgroundImage: "url('/Stations.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white text-center drop-shadow-lg mt-6 mb-12">
          Delhi EV Charging Stations
        </h2>

        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="p-2 rounded border"
          >
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="occupied">Occupied</option>
            <option value="offline">Offline</option>
          </select>

          <select
            value={filterConnector}
            onChange={(e) => setFilterConnector(e.target.value)}
            className="p-2 rounded border"
          >
            <option value="">All Connectors</option>
            <option value="Type2">Type 2</option>
            <option value="CCS">CCS</option>
            <option value="CHAdeMO">CHAdeMO</option>
          </select>

          <select
            value={filterPower}
            onChange={(e) => setFilterPower(e.target.value)}
            className="p-2 rounded border"
          >
            <option value="">All Power</option>
            <option value="22">22kW</option>
            <option value="50">50kW</option>
            <option value="150">150kW</option>
          </select>

          {isAdmin && (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded font-semibold"
              onClick={() => openModal()}
            >
              + Add Charger
            </button>
          )}
        </div>

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {filteredStations.map((station) => (
            <StationCard
              key={station.id}
              charger={station}
              isAdmin={isAdmin}
              name={station.name}
              location={station.location}
              image={station.image}
              onDelete={isAdmin ? handleDelete : undefined}
              onEdit={isAdmin ? () => openModal(station) : undefined}
            />
          ))}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl p-8 shadow-lg w-full max-w-md space-y-4"
          >
            <h3 className="text-xl font-bold mb-2">
              {editStation ? "Edit Charger" : "Add Charger"}
            </h3>

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Station Name"
              className="w-full p-2 border rounded"
              required
            />

            <input
              name="location"
              value={form.location}
              onChange={handleChange}
              placeholder="Location"
              className="w-full p-2 border rounded"
              required
            />

            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full p-2 border rounded"
            />

            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
              <option value="offline">Offline</option>
            </select>

            <select
              name="powerOutput"
              value={form.powerOutput}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="22">22kW</option>
              <option value="50">50kW</option>
              <option value="150">150kW</option>
            </select>

            <select
              name="connectorType"
              value={form.connectorType}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            >
              <option value="Type2">Type 2</option>
              <option value="CCS">CCS</option>
              <option value="CHAdeMO">CHAdeMO</option>
            </select>

            <div className="flex gap-4 justify-end">
              <button
                type="button"
                className="px-4 py-2 rounded bg-gray-300"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded bg-green-600 text-white font-semibold"
              >
                {editStation ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
