import { ReactNode, createContext, useContext, useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

// Define the structure of a Quote request
export interface Quote {
  id: number;
  title: string;
  thumbnail: string;
  quantity: number;
  message: string;
  status: string;
  submittedAt: string;
}

interface QuoteContextType {
  requests: Quote[];
  addRequest: (request: Omit<Quote, "id" | "status" | "submittedAt">) => void;
}

// Create the context
export const QuoteContext = createContext<QuoteContextType | null>(null);

// Provider component
export const QuoteProvider = ({ children }: { children: ReactNode }) => {
  const [requests, setRequests] = useState<Quote[]>([]);

  const addRequest = async (
    request: Omit<Quote, "id" | "status" | "submittedAt">
  ) => {
    const newRequest: Quote = {
      ...request,
      id: Date.now(),
      status: "Pending",
      submittedAt: new Date().toLocaleString(),
    };

    setRequests((prev) => [...prev, newRequest]);

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

// Hook to use the context
export const useQuotes = () => {
  const context = useContext(QuoteContext);
  if (!context)
    throw new Error("useQuotes must be used within a QuoteProvider");
  return context;
};
