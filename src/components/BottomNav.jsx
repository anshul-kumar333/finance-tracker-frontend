import { NavLink } from "react-router-dom";
import { FiHome, FiPlusCircle } from "react-icons/fi";
import { BsRobot } from "react-icons/bs";
import { ImStatsDots } from "react-icons/im";

export default function BottomNav() {
  const base =
    "flex flex-col items-center justify-center flex-1 py-2 text-xs transition";

  const active = "bg-gray-200 text-indigo-600 font-semibold rounded-xl mx-2";

  const inactive = "text-gray-400";

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t flex">
      <NavLink
        to="/dashboard"
        className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
      >
        <FiHome size={20} />
        Home
      </NavLink>

      <NavLink
        to="/add"
        className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
      >
        <FiPlusCircle size={22} />
        Add
      </NavLink>

      <NavLink
        to="/reports"
        className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
      >
        <ImStatsDots size={20} />
        Reports
      </NavLink>

      <NavLink
        to="/ai"
        className={({ isActive }) => `${base} ${isActive ? active : inactive}`}
      >
        <BsRobot size={20} />
        AI
      </NavLink>
    </div>
  );
}
