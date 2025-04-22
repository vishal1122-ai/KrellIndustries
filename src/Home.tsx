import { useNavigate } from "react-router-dom";
import { useQuotes } from "./QuoteContext";

const Home = () => {
  const navigate = useNavigate();
  const { requests } = useQuotes();

  return (
    <div className="space-y-10">
      {/* Banner Section */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#2d2d2d] rounded-xl p-6 shadow-lg border border-[#2c2c2c]">
        <h1 className="text-4xl font-bold text-white mb-2">
          Welcome to Krell Dealer Portal
        </h1>
        <p className="text-gray-400 text-sm">
          Your personalized hub for product exploration, quotation requests, and
          account management.
        </p>
      </div>

      {/* Section Title */}
      <h2 className="text-2xl font-bold text-white">🚀 Quick Actions</h2>

      {/* Navigation Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          onClick={() => navigate("/dashboard/catalog")}
          className="bg-[#1c1c1c] p-6 rounded-xl shadow-sm border border-[#2d2d2d] transition duration-300 hover:shadow-lg hover:scale-[1.01] cursor-pointer"
        >
          <h2 className="text-xl font-semibold text-white mb-1">
            🔍 Browse Products
          </h2>
          <p className="text-gray-400 text-sm">
            Explore Krell’s premium offerings and request quotes.
          </p>
        </div>

        <div
          onClick={() => navigate("/dashboard/requests")}
          className="bg-[#1c1c1c] p-6 rounded-xl shadow-sm border border-[#2d2d2d] transition duration-300 hover:shadow-lg hover:scale-[1.01] cursor-pointer"
        >
          <h2 className="text-xl font-semibold text-white mb-1">
            📋 My Requests
          </h2>
          <p className="text-gray-400 text-sm">
            View all your submitted quotation requests and statuses.
          </p>
        </div>

        <div
          onClick={() => navigate("/dashboard/profile")}
          className="bg-[#1c1c1c] p-6 rounded-xl shadow-sm border border-[#2d2d2d] transition duration-300 hover:shadow-lg hover:scale-[1.01] cursor-pointer"
        >
          <h2 className="text-xl font-semibold text-white mb-1">👤 Profile</h2>
          <p className="text-gray-400 text-sm">
            Manage your dealer account and contact details.
          </p>
        </div>
      </div>

      {/* Section Title */}
      <h2 className="text-2xl font-bold text-white">
        📢 Updates & Smart Features
      </h2>

      {/* AI Assistant + News */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1c1c1c] p-6 rounded-xl shadow-sm border border-[#2d2d2d]">
          <h3 className="text-lg font-semibold text-white mb-2">
            🤖 AI Assistant Coming Soon
          </h3>
          <p className="text-gray-400 text-sm">
            Soon you’ll be able to chat with our smart assistant to answer
            product-related queries instantly.
          </p>
        </div>

        <div className="bg-[#1c1c1c] p-6 rounded-xl shadow-sm border border-[#2d2d2d]">
          <h3 className="text-lg font-semibold text-white mb-2">
            🗞️ Latest Announcements
          </h3>
          <ul className="text-sm text-gray-400 list-disc pl-5 space-y-1">
            <li>📦 New amplifier models arriving this fall.</li>
            <li>🛠️ Platform maintenance scheduled on Oct 25.</li>
            <li>💬 Live chat support launching soon.</li>
          </ul>
        </div>
      </div>

      {/* Request Summary */}
      <div className="bg-[#1c1c1c] p-6 rounded-xl shadow-sm border border-[#2d2d2d] text-center">
        <h3 className="text-2xl font-semibold text-white mb-2">
          📊 You’ve submitted {requests.length} request
          {requests.length !== 1 ? "s" : ""}
        </h3>
        <p className="text-gray-400 text-sm">
          Track your status under the “My Requests” tab.
        </p>
      </div>
    </div>
  );
};

export default Home;
