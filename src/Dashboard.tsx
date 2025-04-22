import { Outlet, NavLink } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate("/login");
    });
  };

  return (
    <div className="flex h-screen bg-[#0a0a0a] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1a1a] p-6 flex flex-col justify-between shadow-md">
        <div>
          <h2 className="text-2xl font-bold mb-10 tracking-wider">KRELL</h2>
          <nav className="flex flex-col gap-4">
            <NavLink to="/dashboard/home" className="hover:text-gray-300">
              🏠 Home
            </NavLink>
            <NavLink to="/dashboard/catalog" className="hover:text-gray-300">
              📦 Catalog
            </NavLink>
            <NavLink to="/dashboard/requests" className="hover:text-gray-300">
              📋 My Requests
            </NavLink>
            <NavLink to="/dashboard/profile" className="hover:text-gray-300">
              👤 Profile
            </NavLink>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="text-red-400 hover:text-red-300 font-medium"
        >
          🚪 Logout
        </button>
      </aside>

      {/* Dynamic Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
