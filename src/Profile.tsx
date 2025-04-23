import { getAuth, User } from "firebase/auth";

const Profile = () => {
  const auth = getAuth();
  const user: User | null = auth.currentUser;

  if (!user) {
    return <p className="text-gray-400">User not found</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>

      <div className="bg-[#1a1a1a] p-6 rounded shadow-md overflow-x-auto">
        {/* Profile Picture */}
        {user.photoURL && (
          <div className="mb-4 flex justify-center">
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          </div>
        )}

        <div className="space-y-2 text-gray-300 break-words">
          <p>
            <strong>👤 Name:</strong>{" "}
            <span className="break-all">{user.displayName || "N/A"}</span>
          </p>
          <p>
            <strong>📧 Email:</strong>{" "}
            <span className="break-all">{user.email || "N/A"}</span>
          </p>
          <p>
            <strong>🆔 UID:</strong>{" "}
            <span className="break-all">{user.uid}</span>
          </p>
          <p>
            <strong>📅 Joined:</strong> {user.metadata?.creationTime || "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
