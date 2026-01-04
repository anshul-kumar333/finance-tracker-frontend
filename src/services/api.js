const API_BASE = "https://main-finance-tracker.onrender.com/api";

// Helper function
async function request(url, options = {}) {
    const token = localStorage.getItem("token");

    const res = await fetch(API_BASE + url, {
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` })
        },
        ...options
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    return data;
}

// AUTH
export const loginUser = (data) =>
    request("/auth/login", {
        method: "POST",
        body: JSON.stringify(data)
    });

export const signupUser = (data) =>
    request("/auth/signup", {
        method: "POST",
        body: JSON.stringify(data)
    });

// TRANSACTIONS
export const getTransactions = () => request("/transactions");

export const addTransaction = (data) =>
    request("/transactions", {
        method: "POST",
        body: JSON.stringify(data)
    });
