export default function TransactionCard({ title, date, amount, type }) {
  return (
    <div className="flex justify-between items-center py-3 border-b last:border-none">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-xs text-gray-400">{date}</p>
      </div>

      <p
        className={`font-semibold ${
          type === "expense" ? "text-red-500" : "text-green-600"
        }`}
      >
        {type === "expense" ? "-" : "+"}₹{amount}
      </p>
    </div>
  );
}
