import { useNavigate } from "react-router-dom";

const NavigationButtons = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 justify-center py-8 overflow-auto">
      <button
        onClick={() => navigate("/tournament/create")}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
      >
        Create Tournament
      </button>
      <button
        onClick={() => navigate("/scouting-organization-form/create")}
        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
      >
        Scouting Organization Form
      </button>
      <button
        onClick={() => navigate("/customer-services/create")}
        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
      >
        Customer Services Form
      </button>
    </div>
  );
};

export default NavigationButtons;
