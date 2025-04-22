import { createContext, useContext, useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export const QuoteContext = createContext<any>(null);

export const QuoteProvider = ({ children }) => {
  const [requests, setRequests] = useState([]);

  const addRequest = async (request) => {
    const newRequest = {
      ...request,
      id: Date.now(),
      status: "Pending",
      submittedAt: new Date().toLocaleString(),
    };

    // Add to local state
    setRequests((prev) => [...prev, newRequest]);

    // Save to Firestore
    try {
      await addDoc(collection(db, "dealerRequests"), newRequest);
      console.log("Request saved to Firestore ✅");
    } catch (error) {
      console.error("Error saving to Firestore:", error);
    }
  };

  return (
    <QuoteContext.Provider value={{ requests, addRequest }}>
      {children}
    </QuoteContext.Provider>
  );
};

export const useQuotes = () => useContext(QuoteContext);
