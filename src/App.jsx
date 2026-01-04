import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddTransaction from "./pages/AddTransaction";
import Reports from "./pages/Reports";
import AI from "./pages/AI";
import { getTransactions } from "./services/api";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const [transactions, setTransactions] = useState([]);

  async function loadTransactions() {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (err) {
      console.error("Failed to load transactions", err);
    }
  }

useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    loadTransactions();
  }
}, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard transactions={transactions} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <AddTransaction onAdded={loadTransactions} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports transactions={transactions} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ai"
          element={
            <ProtectedRoute>
              <AI transactions={transactions} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
