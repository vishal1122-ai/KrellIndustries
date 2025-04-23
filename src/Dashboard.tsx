import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { Menu } from "lucide-react";

const Dashboard = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth).then(() => navigate("/login"));
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 ${
          isSidebarOpen ? "left-0" : "-left-full"
        } lg:static z-50 w-64 h-full bg-[#1a1a1a] p-6 flex flex-col justify-between transition-all duration-300`}
      >
        <div>
          <h2
            className={`text-2xl font-bold tracking-wider transition-all duration-300 ${
              isSidebarOpen ? "ml-12" : "ml-2"
            }`}
          >
            KRELL
          </h2>
          <nav className="flex flex-col gap-4">
            <NavLink to="/dashboard/home" onClick={() => setSidebarOpen(false)}>
              🏠 Home
            </NavLink>
            <NavLink
              to="/dashboard/catalog"
              onClick={() => setSidebarOpen(false)}
            >
              📦 Catalog
            </NavLink>
            <NavLink
              to="/dashboard/requests"
              onClick={() => setSidebarOpen(false)}
            >
              📋 My Requests
            </NavLink>
            <NavLink
              to="/dashboard/profile"
              onClick={() => setSidebarOpen(false)}
            >
              👤 Profile
            </NavLink>
          </nav>
        </div>

        <button
          className="text-red-400 hover:text-red-300 font-medium"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>
      </aside>

      {/* Hamburger Button (Mobile Only) */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 text-white"
        onClick={() => setSidebarOpen(!isSidebarOpen)}
      >
        <Menu size={28} />
      </button>

      {/* Main Content */}
      <main className="flex-1 p-4 mt-14 md:mt-0 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
