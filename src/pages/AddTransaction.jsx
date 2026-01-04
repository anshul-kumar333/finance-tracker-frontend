import { useState } from "react";
import { addTransaction } from "../services/api";
import BottomNav from "../components/BottomNav";
import { IoIosAdd } from "react-icons/io";

const incomeCategories = ["Salary", "Business", "Freelance", "Other"];
const expenseCategories = [
  "🍔Food",
  "🚗Transport",
  "🛍️Shopping",
  "🎬Entertainment",
  "📃Bills",
  "🏥Healthcare",
  "🏫Education",
];

export default function AddTransaction({  onAdded }) {
  const empty = {
    amount: "",
    type: "expense",
    category: "",
    fromTo: "",
    date: "",
    description: "",
  };

  const [form, setForm] = useState(empty);
  const [msg, setMsg] = useState("");

  function change(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function submit() {
    if (!form.amount || Number(form.amount) <= 0) {
      setMsg("Amount must be greater than 0 ❌");
      return;
    }

    await addTransaction(form);
    setForm(empty);
    onAdded();
    setMsg("Transaction added successfully ✅");

    setTimeout(() => setMsg(""), 2000);
  }

  const categories =
    form.type === "income" ? incomeCategories : expenseCategories;

  return (
    <div className="pb-24 bg-slate-100 min-h-screen">
      <div className="bg-white px-6 py-4 font-semibold shadow  flex items-center">
        Add Transaction{" "}
        <IoIosAdd size={22} className="text-indigo-600 font-bold" />
      </div>

      <div className="m-6 bg-white p-6 rounded-xl shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            className="input bg-gray-50 p-3 rounded mb-2"
            name="amount"
            placeholder="Amount ₹"
            value={form.amount}
            onChange={change}
          />

          <select
            className="input bg-gray-50 p-3 rounded mb-2"
            name="type"
            value={form.type}
            onChange={change}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="borrow">Borrow</option>
            <option value="lend">Lend</option>
          </select>

          <select
            className="input bg-gray-50 p-3 rounded mb-2"
            name="category"
            value={form.category}
            onChange={change}
          >
            <option value="">Select category</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <input
            className="input bg-gray-50 p-3 rounded mb-2"
            name="fromTo"
            placeholder="From / To"
            value={form.fromTo}
            onChange={change}
          />

          <input
            className="input bg-gray-50 p-3 rounded mb-2"
            type="date"
            name="date"
            value={form.date}
            onChange={change}
          />

          <textarea
            className="input col-span-full bg-gray-50 p-3 rounded mb-2 resize-none"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={change}
          />
        </div>

        <button
          onClick={submit}
          className="mt-4 w-full bg-black text-white py-2 rounded"
        >
          Add Transaction
        </button>

        {msg && (
          <div className="mt-3 text-center text-sm bg-green-100 text-green-700 p-2 rounded">
            {msg}
          </div>
        )}
      </div>

      <BottomNav active="add" />
    </div>
  );
}
