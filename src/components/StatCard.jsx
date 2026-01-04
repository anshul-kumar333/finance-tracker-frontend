export default function StatCard({ icon, label, amount, color }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow">
      <div className={`flex items-center gap-2 ${color}`}>
        {icon}
        <span className="font-medium">{label}</span>
      </div>
      <p className="text-xl font-bold mt-2">₹{amount}</p>
    </div>
  );
}
