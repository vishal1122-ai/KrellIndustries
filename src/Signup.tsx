import { useState } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import krellLogo from "./assets/KrellLogo.jpeg";
import { updateProfile } from "firebase/auth";

const Signup = () => {
  // Initialize Firebase authentication and navigation
  const auth = getAuth();
  const navigate = useNavigate();

  // State variables for managing authentication state, email, password, confirm password, and error messages
  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // Function to handle sign-up with Google
  const signUpWithGoogle = async () => {
    setAuthing(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async (response) => {
        const user = response.user;

        // Set display name (you may not need this with Google if already set)
        await user.updateProfile({
          displayName: `${firstName} ${lastName}`,
        });

        navigate("/dashboard/home");
      })
      .catch((error) => {
        console.log(error);
        setAuthing(false);
      });
  };

  // Function to handle sign-up with email and password
  const signUpWithEmail = async () => {
    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setAuthing(true);
    setError("");

    // Use Firebase to create a new user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (response) => {
        const user = response.user;

        // Set display name
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
    <div className="w-full h-screen flex">
      {/* Left half of the screen - background styling */}
      <div className="w-1/2 h-full flex flex-col bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] items-center justify-center">
        <img
          src={krellLogo}
          alt="Krell Logo"
          className="absolute left 0 top 0 transform -translate-x-1/2 -translate-y-1/2 max-w-[100%] max-h-[80%] opacity-10 animate-zoom-slow"
        />
      </div>

      {/* Right half of the screen - signup form */}
      <div className="w-1/2 h-full bg-[#1a1a1a] flex flex-col p-20 justify-center">
        <div className="w-full flex flex-col max-w-[450px] mx-auto">
          {/* Header section with title and welcome message */}
          <div className="w-full flex flex-col mb-10 text-white">
            <h3 className="text-4xl font-bold mb-2">Sign Up</h3>
            <p className="text-lg mb-4">
              Welcome ! Please enter your information below to begin.
            </p>
          </div>

          {/* Input fields for email, password, and confirm password */}
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
              className="w-full text-white py-2 mb-4 bg-transparent border-b border-[#5c5c5c] focus:border-white focus:outline-none focus:border-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full text-white py-2 mb-4 bg-transparent border-b border-[#5c5c5c] focus:border-white focus:outline-none focus:border-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Re-Enter Password"
              className="w-full text-white py-2 mb-4 bg-transparent border-b border-[#5c5c5c] focus:border-white focus:outline-none focus:border-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {/* Display error message if there is one */}
          {error && <div className="text-red-500 mb-4">{error}</div>}

          {/* Button to sign up with email and password */}
          <div className="w-full flex flex-col mb-4">
            <button
              onClick={signUpWithEmail}
              disabled={authing}
              className="btn-primary w-full my-2 flex items-center justify-center"
            >
              Sign Up With Email and Password
            </button>
          </div>

          {/* Divider with 'OR' text */}
          <div className="w-full flex items-center justify-center relative py-4">
            <div className="w-full h-[1px] bg-gray-500"></div>
            <p className="text-lg absolute text-gray-500 bg-[#1a1a1a] px-2">
              OR
            </p>
          </div>

          {/* Button to sign up with Google */}
          <button
            onClick={signUpWithGoogle}
            disabled={authing}
            className="btn-google w-full mt-7 flex items-center justify-center"
          >
            Sign Up With Google
          </button>
        </div>

        {/* Link to login page */}
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
