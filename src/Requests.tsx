import { useQuotes } from "./QuoteContext";

const Requests = () => {
  const { requests } = useQuotes();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">My Requests</h1>
      {requests.length === 0 ? (
        <p className="text-gray-400">No requests submitted yet.</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req.id} className="bg-[#1a1a1a] p-4 rounded shadow-md">
              <div className="flex items-center gap-4 mb-2">
                <img
                  src={req.image}
                  alt={req.product}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h2 className="text-lg font-semibold">{req.product}</h2>
                  <p className="text-sm text-gray-400">Qty: {req.quantity}</p>
                  <p className="text-sm text-gray-400">Status: {req.status}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Requested on: {req.submittedAt}
                  </p>
                </div>
              </div>
              {req.message && (
                <p className="text-sm mt-2 text-gray-300">
                  <strong>Note:</strong> {req.message}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Requests;
