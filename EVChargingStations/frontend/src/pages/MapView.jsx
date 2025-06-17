import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix default icon issue in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// 8 custom EV stations in Delhi with status and charging options
const stations = [
  {
    id: 1,
    name: "Connaught Place EV Central",
    location: "Connaught Place",
    image: "/StationCard1.jpg",
    lat: 28.6315,
    lng: 77.2167,
    status: "available",
    connectorType: "Type2",
    powerOutput: "22kW",
  },
  {
    id: 2,
    name: "Saket Power Hub",
    location: "Saket",
    image: "/StationCard2.jpg",
    lat: 28.5245,
    lng: 77.2066,
    status: "occupied",
    connectorType: "CCS",
    powerOutput: "50kW",
  },
  {
    id: 3,
    name: "Dwarka ChargePoint",
    location: "Dwarka",
    image: "/StationCard3.jpg",
    lat: 28.5921,
    lng: 77.0460,
    status: "offline",
    connectorType: "CHAdeMO",
    powerOutput: "150kW",
  },
  {
    id: 4,
    name: "Karol Bagh EV Plaza",
    location: "Karol Bagh",
    image: "/StationCard4.jpg",
    lat: 28.6512,
    lng: 77.1906,
    status: "available",
    connectorType: "Type2",
    powerOutput: "22kW",
  },
  {
    id: 5,
    name: "Lajpat Nagar Green Plug",
    location: "Lajpat Nagar",
    image: "/StationCard5.jpg",
    lat: 28.5672,
    lng: 77.2436,
    status: "occupied",
    connectorType: "CCS",
    powerOutput: "50kW",
  },
  {
    id: 6,
    name: "Vasant Kunj FastCharge",
    location: "Vasant Kunj",
    image: "/StationCard6.jpg",
    lat: 28.5204,
    lng: 77.1557,
    status: "available",
    connectorType: "CHAdeMO",
    powerOutput: "150kW",
  },
  {
    id: 7,
    name: "Rohini E-Station",
    location: "Rohini",
    image: "/StationCard7.jpg",
    lat: 28.7499,
    lng: 77.0565,
    status: "available",
    connectorType: "Type2",
    powerOutput: "22kW",
  },
  {
    id: 8,
    name: "Nehru Place Volt",
    location: "Nehru Place",
    image: "/StationCard8.jpg",
    lat: 28.5494,
    lng: 77.2513,
    status: "offline",
    connectorType: "CCS",
    powerOutput: "50kW",
  },
];

function getStatusColor(status) {
  if (status === "available") return "text-green-600";
  if (status === "occupied") return "text-yellow-600";
  return "text-red-600";
}

function getStatusLabel(status) {
  if (status === "available") return "Available";
  if (status === "occupied") return "Busy";
  return "Not Working";
}

export default function MapView() {
  const center = [28.6139, 77.2090];
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return (
    <div className="relative min-h-screen flex flex-col bg-transparent">
      <div className="flex-1 pt-20 bg-transparent">
        <MapContainer
          center={center}
          zoom={11}
          style={{ height: "80vh", width: "100%", background: "transparent", border: "none" }}
          className="bg-transparent"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {stations.map((station) => (
            <Marker key={station.id} position={[station.lat, station.lng]}>
              <Popup>
                <div className="text-center">
                  <img src={station.image} alt={station.name} className="w-32 h-20 object-cover rounded mb-2" />
                  <div className="font-bold">{station.name}</div>
                  <div className="text-sm mb-2">{station.location}</div>
                  <div className={`font-semibold mb-1 ${getStatusColor(station.status)}`}>
                    Status: {getStatusLabel(station.status)}
                  </div>
                  <div className="text-sm mb-1">
                    Connector: <span className="font-semibold">{station.connectorType}</span>
                  </div>
                  <div className="text-sm mb-3">
                    Power Output: <span className="font-semibold">{station.powerOutput}</span>
                  </div>
                  {isAdmin ? (
                    <div className="flex gap-2 justify-center">
                      <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
                        Delete
                      </button>
                    </div>
                  ) : (
                    <button
                      disabled={station.status !== "available"}
                      className={`px-4 py-2 rounded font-bold ${
                        station.status === "available"
                          ? "bg-green-600 text-white hover:bg-green-700"
                          : "bg-gray-400 text-white cursor-not-allowed"
                      }`}
                    >
                      {station.status === "available"
                        ? "Start Charging"
                        : station.status === "occupied"
                        ? "Busy"
                        : "Not Working"}
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
