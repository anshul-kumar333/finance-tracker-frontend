import { FiLogOut, FiUser } from "react-icons/fi";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white shadow">
      <div className="flex items-center gap-2 font-bold text-xl">
        💰 <span className="font-extrabold">Fin Tracker</span>
      </div>

      <div className="flex items-center gap-3">
        <FiUser />
        <span className="font-medium">Ansh</span>
        <button className="flex items-center gap-1 text-red-500">
          <FiLogOut /> Logout
        </button>
      </div>
    </div>
  );
}
