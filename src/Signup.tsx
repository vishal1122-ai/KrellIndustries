import { useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import krellLogo from "./assets/KrellLogo.jpeg";

const Signup = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const signUpWithGoogle = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (response) => {
        const user = response.user;
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        });
        navigate("/dashboard/home");
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  const signUpWithEmail = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setAuthing(true);
    setError("");

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const user = response.user;
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        });
        navigate("/dashboard/home");
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setAuthing(false);
      });
  };

  return (
    <div className="w-full min-h-screen flex lg:flex-row flex-col">
      {/* Mobile background logo */}
      <img
        src={krellLogo}
        alt="Krell Logo"
        className="absolute object-contain opacity-10 w-1/2 h-full lg:hidden lg:flex"
      />

      {/* Left Panel for desktop */}
      <div className="lg:w-1/2 hidden lg:flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
        <img
          src={krellLogo}
          alt="Krell Logo"
          className="w-[60%] opacity-10 object-contain"
        />
      </div>

      {/* Signup Form */}
      <div className="lg:w-1/2 w-full bg-[#1a1a1a] relative z-10 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md text-white">
          <h3 className="text-4xl font-bold mb-4">Sign Up</h3>
          <p className="text-lg mb-6">
            Welcome! Enter your details to continue.
          </p>

          {/* Input Fields */}
          <div className="space-y-4 mb-4">
            <input
              type="text"
              placeholder="First Name"
              className="w-full text-white py-2 bg-transparent border-b border-[#5c5c5c] focus:border-white focus:outline-none"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full text-white py-2 bg-transparent border-b border-[#5c5c5c] focus:border-white focus:outline-none"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full text-white py-2 bg-transparent border-b border-[#5c5c5c] focus:border-white focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full text-white py-2 bg-transparent border-b border-[#5c5c5c] focus:border-white focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Re-Enter Password"
              className="w-full text-white py-2 bg-transparent border-b border-[#5c5c5c] focus:border-white focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          {/* Signup Button */}
          <button
            onClick={signUpWithEmail}
            disabled={authing}
            className="btn-primary w-full my-2 flex items-center justify-center"
          >
            Sign Up With Email and Password
          </button>

          {/* OR Divider */}
          <div className="w-full flex items-center justify-center relative py-4">
            <div className="w-full h-[1px] bg-gray-500"></div>
            <p className="text-lg absolute text-gray-500 bg-[#1a1a1a] px-2">
              OR
            </p>
          </div>

          {/* Google Signup */}
          <button
            onClick={signUpWithGoogle}
            disabled={authing}
            className="btn-google w-full mt-4 flex items-center justify-center"
          >
            Sign Up With Google
          </button>

          {/* Link to Login */}
          <p className="text-sm text-gray-400 text-center mt-8">
            Already have an account?{" "}
            <span className="font-semibold text-white underline">
              <a href="/login">Log In</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
