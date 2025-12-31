export default function StatusBadge({ status }) {
  const map = {
    Open: "bg-green-100 text-green-800",
    Closed: "bg-red-100 text-red-800",
    OnHold: "bg-yellow-100 text-yellow-800",
  };
  const cls = map[status] || "bg-gray-100 text-gray-800";
  return <span className={`px-2 py-1 rounded text-sm ${cls}`}>{status}</span>;
}
