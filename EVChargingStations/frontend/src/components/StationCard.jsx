import { FaMapMarkerAlt, FaPlug, FaBolt, FaPowerOff } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function StationCard({
  charger,
  onDelete,
  onEdit,
  name,
  location,
  image,
  isAdmin,
}) {
  const navigate = useNavigate();

  const handleChargeClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/UserLogin");
    } else {
      alert("Charging process started! 🚗⚡");
    }
  };

  if (charger) {
    return (
      <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-sm transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
        <img
          src={charger.image}
          alt={charger.name}
          className="w-full h-44 object-cover"
        />
        <div className="p-5 space-y-2">
          <h2 className="text-xl font-semibold text-gray-800">{charger.name}</h2>
          <p className="text-gray-600 flex items-center">
            <FaMapMarkerAlt className="mr-2 text-green-500" />
            {charger.location}
          </p>
          <div className="text-sm text-gray-700 space-y-1">
            <p className="flex items-center">
              <FaPowerOff className="mr-2 text-blue-500" />
              Status:{" "}
              <span
                className={`ml-1 font-medium ${
                  charger.status === "available"
                    ? "text-green-600"
                    : charger.status === "occupied"
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
              >
                {charger.status}
              </span>
            </p>
            <p className="flex items-center">
              <FaBolt className="mr-2 text-purple-500" />
              Power Output: {charger.powerOutput}kW
            </p>
            <p className="flex items-center">
              <FaPlug className="mr-2 text-indigo-500" />
              Connector: {charger.connectorType}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {isAdmin ? (
              <>
                <button
                  onClick={onEdit}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-medium"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(charger.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition font-medium"
                >
                  Delete
                </button>
              </>
            ) : (
              <button
                onClick={handleChargeClick}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition font-semibold w-full"
              >
                Charge Your Vehicle
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Fallback: static card
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 w-full max-w-sm flex flex-col items-center transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <img
        src={image}
        alt={name}
        className="w-full h-40 object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
      <p className="text-gray-600 flex items-center">
        <FaMapMarkerAlt className="mr-2 text-green-500" /> {location}
      </p>
    </div>
  );
}
