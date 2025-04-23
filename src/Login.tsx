import { useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import krellLogo from "./assets/KrellLogo.jpeg";

const Login = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signInWithGoogle = async () => {
    setAuthing(true);
    signInWithPopup(auth, new GoogleAuthProvider())
      .then(() => navigate("/dashboard/home"))
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  const signInWithEmail = async () => {
    setAuthing(true);
    setError("");

    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/dashboard/home"))
      .catch((error) => {
        console.log(error);
        setError(error.message);
        setAuthing(false);
      });
  };

  return (
    <div className=" w-full min-h-screen flex lg:flex-row flex-col">
      {/* Background Logo for Mobile */}
      <img
        src={krellLogo}
        alt="Krell Logo"
        className="absolute object-contain opacity-10 w-1/2 h-full lg:hidden lg:flex"
      />

      {/* Left Panel (Desktop Only) */}
      <div className="lg:w-1/2 hidden lg:flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a]">
        <img
          src={krellLogo}
          alt="Krell Logo"
          className="w-[60%] opacity-10 object-contain"
        />
      </div>

      {/* Right/Form Section */}
      <div className="lg:w-1/2 w-full bg-[#0a0a0a] relative z-10 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md text-white">
          <h3 className="text-4xl font-bold mb-4">Login</h3>
          <p className="text-lg mb-6">Welcome! Please enter your details.</p>

          {/* Input Fields */}
          <div className="space-y-4 mb-4">
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
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <button
            className="btn-primary w-full my-2 flex items-center justify-center"
            onClick={signInWithEmail}
            disabled={authing}
          >
            Log In With Email and Password
          </button>

          {/* OR Divider */}
          <div className="w-full flex items-center justify-center relative py-4">
            <div className="w-full h-[1px] bg-gray-500"></div>
            <p className="text-lg absolute text-gray-500 bg-[#0a0a0a] px-2">
              OR
            </p>
          </div>

          {/* Google Login */}
          <button
            className="btn-google w-full mt-4 flex items-center justify-center"
            onClick={signInWithGoogle}
            disabled={authing}
          >
            Log In With Google
          </button>

          {/* Link to Signup */}
          <p className="text-sm text-gray-400 text-center mt-8">
            Don&apos;t have an account?{" "}
            <span className="font-semibold text-white underline">
              <a href="/signup">Sign Up</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
