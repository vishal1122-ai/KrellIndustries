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
    try {
      setAuthing(true);
      const response = await signInWithPopup(auth, new GoogleAuthProvider());
      const user = response.user;

      if (firstName || lastName) {
        await updateProfile(user, {
          displayName: `${firstName} ${lastName}`,
        });
      }

      navigate("/dashboard/home");
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setAuthing(false);
    }
  };

  const signUpWithEmail = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setAuthing(true);
      setError("");

      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(response.user, {
        displayName: `${firstName} ${lastName}`,
      });

      navigate("/dashboard/home");
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setAuthing(false);
    }
  };

  return (
    <div className="w-full h-screen flex">
      {/* Left background */}
      <div className="w-1/2 h-full flex flex-col bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] items-center justify-center">
        <img
          src={krellLogo}
          alt="Krell Logo"
          className="absolute left-0 top-0 transform -translate-x-1/2 -translate-y-1/2 max-w-[100%] max-h-[80%] opacity-10 animate-zoom-slow"
        />
      </div>

      {/* Right form */}
      <div className="w-1/2 h-full bg-[#1a1a1a] flex flex-col p-20 justify-center">
        <div className="w-full flex flex-col max-w-[450px] mx-auto">
          <div className="w-full flex flex-col mb-10 text-white">
            <h3 className="text-4xl font-bold mb-2">Sign Up</h3>
            <p className="text-lg mb-4">
              Welcome! Please enter your information below to begin.
            </p>
          </div>

          <div className="w-full flex flex-col mb-6">
            <input
              type="text"
              placeholder="First Name"
              className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Re-Enter Password"
              className="w-full text-white py-2 mb-4 bg-transparent border-b border-gray-500 focus:outline-none focus:border-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && <div className="text-red-500 mb-4">{error}</div>}

          <div className="w-full flex flex-col mb-4">
            <button
              onClick={signUpWithEmail}
              disabled={authing}
              className="btn-primary w-full my-2 flex items-center justify-center"
            >
              Sign Up With Email and Password
            </button>
          </div>

          <div className="w-full flex items-center justify-center relative py-4">
            <div className="w-full h-[1px] bg-gray-500"></div>
            <p className="text-lg absolute text-gray-500 bg-[#1a1a1a] px-2">
              OR
            </p>
          </div>

          <button
            onClick={signUpWithGoogle}
            disabled={authing}
            className="btn-google w-full mt-7 flex items-center justify-center"
          >
            Sign Up With Google
          </button>
        </div>

        <div className="w-full flex items-center justify-center mt-10">
          <p className="text-sm font-normal text-gray-400">
            Already have an account?{" "}
            <span className="font-semibold text-white cursor-pointer underline">
              <a href="/login">Log In</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
