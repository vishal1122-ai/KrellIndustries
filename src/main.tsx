import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Login from "./Login.tsx";
import Signup from "./Signup.tsx";
import "./index.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { initializeApp } from "firebase/app";
import AuthRoute from "./AuthRoute.tsx";
import Dashboard from "./Dashboard.tsx";
import Home from "./Home.tsx";
import Catalog from "./Catalog.tsx";
import Requests from "./Requests.tsx";
import Profile from "./Profile.tsx";
import { QuoteProvider } from "./QuoteContext";

const firebaseConfig = {
  apiKey: "AIzaSyBk4fgb33tKfey6p5YK-P4d2wb06kktLig",
  authDomain: "krellportal.firebaseapp.com",
  projectId: "krellportal",
  storageBucket: "krellportal.firebasestorage.app",
  messagingSenderId: "796875366262",
  appId: "1:796875366262:web:1f23617ebb4679d157a457",
  measurementId: "G-W97JF9T5GH",
};

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QuoteProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <AuthRoute>
                <App />
              </AuthRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            }
          >
            <Route path="home" element={<Home />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="requests" element={<Requests />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </QuoteProvider>
  </React.StrictMode>
);
