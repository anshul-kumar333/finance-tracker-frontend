import { ImStatsDots } from "react-icons/im";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiCornerUpLeft,
  FiCornerUpRight,
} from "react-icons/fi";
import BottomNav from "../components/BottomNav";

export default function Reports({ transactions = [] }) {
  let income = 0,
    expense = 0,
    borrowed = 0,
    lent = 0;

  const incomeCat = {};
  const expenseCat = {};
  const borrowList = [];
  const lendList = [];

  transactions.forEach((t) => {
    if (t.type === "income") {
      income += t.amount;
      incomeCat[t.category] = (incomeCat[t.category] || 0) + t.amount;
    }

    if (t.type === "expense") {
      expense += t.amount;
      expenseCat[t.category] = (expenseCat[t.category] || 0) + t.amount;
    }

    if (t.type === "borrow") {
      borrowed += t.amount;
      borrowList.push(t);
    }

    if (t.type === "lend") {
      lent += t.amount;
      lendList.push(t);
    }
  });

  const maxExpense = Math.max(...Object.values(expenseCat), 1);
  const maxIncome = Math.max(...Object.values(incomeCat), 1);

  return (
    <div className="pb-24 bg-slate-100 min-h-screen">
      {/* Header */}
      <div className="bg-white px-6 py-4 font-semibold shadow flex items-center gap-2">
        Reports <ImStatsDots className="text-indigo-600" />
      </div>

      <div className="p-6 space-y-6">
        {/* Monthly Overview */}
        <div className="bg-white p-5 rounded-xl shadow space-y-1">
          <p className="font-semibold">Monthly Overview</p>
          <p className="text-green-600">Income: ₹{income}</p>
          <p className="text-red-500">Expense: ₹{expense}</p>
          <p className="text-orange-500">Borrowed: ₹{borrowed}</p>
          <p className="text-blue-500">Lent: ₹{lent}</p>
          <p className="font-bold mt-2">
            Net Balance: ₹{income + borrowed - expense - lent}
          </p>
        </div>

        {/* Income by Category */}
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="font-semibold mb-3 flex items-center gap-2">
            <FiTrendingUp className="text-green-600" /> Income by Category
          </p>
          {Object.keys(incomeCat).map((cat) => (
            <Bar
              key={cat}
              label={cat}
              value={incomeCat[cat]}
              max={maxIncome}
              color="bg-green-500"
            />
          ))}
        </div>

        {/* Expense by Category */}
        <div className="bg-white p-5 rounded-xl shadow">
          <p className="font-semibold mb-3 flex items-center gap-2">
            <FiTrendingDown className="text-red-500" /> Expense by Category
          </p>
          {Object.keys(expenseCat).map((cat) => (
            <Bar
              key={cat}
              label={cat}
              value={expenseCat[cat]}
              max={maxExpense}
              color="bg-indigo-500"
            />
          ))}
        </div>

        {/* Borrow Reminders */}
        {borrowList.length > 0 && (
          <div className="bg-white p-5 rounded-xl shadow">
            <p className="font-semibold mb-3 flex items-center gap-2 text-orange-500">
              <FiCornerUpLeft /> Borrowed (To Return)
            </p>
            {borrowList.map((b, i) => (
              <p key={i} className="text-sm text-gray-600">
                ₹{b.amount} taken from{" "}
                <span className="font-medium text-indigo-600">{b.fromTo}</span>
              </p>
            ))}
          </div>
        )}

        {/* Lent Reminders */}
        {lendList.length > 0 && (
          <div className="bg-white p-5 rounded-xl shadow">
            <p className="font-semibold mb-3 flex items-center gap-2 text-blue-500">
              <FiCornerUpRight /> Lent (To Receive)
            </p>
            {lendList.map((l, i) => (
              <p key={i} className="text-sm text-gray-600">
                ₹{l.amount} given to{" "}
                <span className="font-medium text-indigo-600">{l.fromTo}</span>
              </p>
            ))}
          </div>
        )}
      </div>

      <BottomNav active="reports" />
    </div>
  );
}

function Bar({ label, value, max, color }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span>{label}</span>
        <span>₹{value}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded">
        <div
          className={`h-2 rounded ${color}`}
          style={{ width: `${(value / max) * 100}%` }}
        />
      </div>
    </div>
  );
}
