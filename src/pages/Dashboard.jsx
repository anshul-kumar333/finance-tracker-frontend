import BottomNav from "../components/BottomNav";
import { SlWallet } from "react-icons/sl";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiCornerUpLeft,
  FiCornerUpRight,
  FiUser,
  FiLogOut,
} from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Dashboard({ transactions = [] }) {
  function formatDate(dateStr) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  let income = 0,
    expense = 0,
    borrowed = 0,
    lent = 0;

  transactions.forEach((t) => {
    if (t.type === "income") income += t.amount;
    if (t.type === "expense") expense += t.amount;
    if (t.type === "borrow") borrowed += t.amount;
    if (t.type === "lend") lent += t.amount;
  });

  const balance = income + borrowed - expense - lent;

  function handleLogout() {
    logout();
    navigate("/"); // 🔁 back to login
  }

  return (
    <div className="pb-24 bg-slate-100 min-h-screen">
      {/* Header */}
      <div className="bg-white px-6 py-4 font-bold shadow text-lg flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-extrabold">Fin Tracker</span>
          <SlWallet className="text-indigo-600" />
        </div>

        {/* 👤 USER + LOGOUT */}
        <div className="flex items-center gap-3">
          <FiUser />
          <span className="font-medium text-sm">{user?.name || "User"}</span>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-red-500 text-sm"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </div>

      <div className="p-16 space-y-6">
        {/* Total Balance */}
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-500">Total Balance</p>
          <p
            className={`text-3xl font-bold ${
              balance < 0 ? "text-red-500" : "text-green-600"
            }`}
          >
            ₹{balance.toFixed(2)}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Stat
            icon={<FiTrendingUp />}
            label="Monthly Income"
            value={income}
            color="text-green-600"
          />
          <Stat
            icon={<FiTrendingDown />}
            label="Monthly Expense"
            value={expense}
            color="text-red-500"
          />
          <Stat
            icon={<FiCornerUpLeft />}
            label="Borrowed"
            value={borrowed}
            color="text-orange-500"
          />
          <Stat
            icon={<FiCornerUpRight />}
            label="Lent"
            value={lent}
            color="text-blue-500"
          />
        </div>

        {/* Recent Transactions */}
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="font-semibold">Recent Transactions</p>
          <p className="text-xs text-gray-400 mb-3">Last 10 transactions</p>

          {transactions.slice(0, 10).map((t, i) => (
            <div
              key={i}
              className="flex justify-between items-center bg-gray-50 p-3 rounded mb-2"
            >
              <div>
                <p className="font-medium capitalize">{t.type}</p>
                <p className="text-xs text-gray-400">
                  {formatDate(t.createdAt)} ·{" "}
                  <span className="text-indigo-600 font-medium">
                    {t.fromTo || "—"}
                  </span>
                </p>
                {t.description && (
                  <p className="text-xs text-gray-500">{t.description}</p>
                )}
              </div>

              <p
                className={`font-semibold ${
                  t.type === "expense" ? "text-red-500" : "text-green-600"
                }`}
              >
                {t.type === "expense" ? "-" : "+"}₹{t.amount}
              </p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav active="home" />
    </div>
  );
}

function Stat({ icon, label, value, color }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className={`flex items-center gap-2 text-sm ${color}`}>
        {icon}
        {label}
      </div>
      <p className="text-lg font-bold mt-1">₹{value.toFixed(2)}</p>
    </div>
  );
}
