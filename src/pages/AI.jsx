import { BsRobot } from "react-icons/bs";
import { useEffect, useState } from "react";
import BottomNav from "../components/BottomNav";

export default function AI({ transactions = [], setPage }) {
  const [popup, setPopup] = useState("");

  let income = 0,
    expense = 0,
    borrowed = 0,
    lent = 0;

  const category = {};
  const now = new Date();

  transactions.forEach((t) => {
    if (t.type === "income") income += t.amount;
    if (t.type === "expense") {
      expense += t.amount;
      category[t.category] = (category[t.category] || 0) + t.amount;
    }
    if (t.type === "borrow") borrowed += t.amount;
    if (t.type === "lend") lent += t.amount;
  });

  /* =======================
     🧠 MAIN AI MESSAGE
  ======================= */

  let message = "";

  if (transactions.length === 0) {
    message =
      "Abhi koi transaction nahi hai. Apni income aur expenses add karo taaki main aapko better guidance de saku.";
  } else if (expense > income) {
    message =
      "Is month aapke expenses income se zyada ho gaye hain. Iska matlab saving negative ho rahi hai. Thoda unnecessary kharch kam karo.";
  } else if (income - expense > income * 0.4) {
    message =
      "Excellent! Aap apni income ka kaafi achha hissa save kar rahe ho. Aise hi disciplined rehna future ke liye best hai.";
  } else if (income === expense) {
    message =
      "Is month aapne jitna kamaya utna hi kharch kar diya. Zero saving risk hota hai. Thoda sa bhi saving add karo.";
  } else {
    message =
      "Aap sahi track par ho. Income expense se zyada hai, bas consistency maintain rakho.";
  }

  /* =======================
     📊 CATEGORY INSIGHTS
  ======================= */

  if (category["Shopping"] > income * 0.3) {
    message +=
      " Shopping par kaafi zyada kharcha ho raha hai. Impulse buying avoid karo.";
  }

  if (category["Food"] > income * 0.25) {
    message +=
      " Food expenses thode high lag rahe hain. Ghar ka khana zyada prefer karo.";
  }

  if (category["Entertainment"] > income * 0.2) {
    message +=
      " Entertainment expense limit cross kar raha hai. Balance maintain karo.";
  }

  if (category["Education"]) {
    message +=
      " Education par kharcha future ke liye investment hota hai. Good choice 👍";
  }

  /* =======================
     🤝 BORROW / LENT LOGIC
  ======================= */

  if (borrowed > income) {
    message +=
      " Aapka borrowed amount income se zyada ho gaya hai. Ye financial stress ka sign ho sakta hai.";
  }

  if (lent > income * 0.5) {
    message +=
      " Aapne kaafi zyada paisa lend kar rakha hai. Ensure karo ki repayment timely ho.";
  }

  /* =======================
     ⏰ DATE BASED POPUPS
  ======================= */

  useEffect(() => {
    const oldBorrow = transactions.find((t) => {
      if (t.type !== "borrow") return false;
      const days = (now - new Date(t.date)) / (1000 * 60 * 60 * 24);
      return days > 7;
    });

    const oldLent = transactions.find((t) => {
      if (t.type !== "lend") return false;
      const days = (now - new Date(t.date)) / (1000 * 60 * 60 * 24);
      return days > 7;
    });

    if (oldBorrow) {
      setPopup(
        `Reminder ⚠️: Aapne ${oldBorrow.fromTo} se ₹${oldBorrow.amount} borrow kiya tha. Wapas karna ya plan banana zaroori hai.`
      );
    } else if (oldLent) {
      setPopup(
        `Reminder ⏰: Aapne ${oldLent.fromTo} ko ₹${oldLent.amount} diya tha. Follow-up karna chahiye.`
      );
    }

    if (popup) {
      setTimeout(() => setPopup(""), 6000);
    }
  }, [transactions]);

  /* =======================
     🎯 EXTRA SMART ADVICE
  ======================= */

  const extraTips = [
    "Emergency fund kam se kam 3 months ki income ke barabar hona chahiye.",
    "Har month budget banana stress kam karta hai.",
    "Small savings daily habit banao.",
    "Expense likhne se awareness badhti hai.",
    "Financial discipline mental peace deta hai.",
  ];

  message += " " + extraTips[Math.floor(Math.random() * extraTips.length)];

  return (
    <div className="pb-24 bg-slate-100 min-h-screen">
      {/* Header */}
      <div className="bg-white px-6 py-4 font-semibold shadow flex items-center gap-2">
        AI Financial Assistant <BsRobot className="text-indigo-600" />
      </div>

      {/* Popup */}
      {popup && (
        <div className="m-4 bg-yellow-100 text-yellow-800 p-4 rounded-xl shadow text-sm">
          {popup}
        </div>
      )}

      {/* Main AI Message */}
      <div className="m-6 bg-white p-6 rounded-xl shadow text-gray-700 leading-relaxed">
        {message}
      </div>

      <BottomNav active="ai" setPage={setPage} />
    </div>
  );
}
