import { createContext, useContext, useEffect, useState, useRef } from "react";

// Configurable backend URL (defaults to local)
const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/chat";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraZoomed, setCameraZoomed] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const processingRef = useRef(false);
  const [history, setHistory] = useState([]);

  const chat = async (message) => {
    setLoading(true);
    
    try {
      const data = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });
  
      const resp = await data.json();
      // Support both {response:{messages:[]}} and direct array
      const inbound = Array.isArray(resp)
        ? resp
        : Array.isArray(resp?.response?.messages)
          ? resp.response.messages
          : [];
      setMessages(prev => [...prev, ...inbound]);
    } catch (error) {
      console.error("Chat error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to build plan request
  const askPlan = async (eventType, answers) => {
    const { date, venue, people, time, budget } = answers;
    const planPrompt = `You are an expert ${eventType} event planner. Using the following inputs, generate a detailed, structured event management plan with sections: Overview, Timeline/Schedule, Venue & Layout, Logistics (AV, seating, registration), Staffing & Roles, Budget Breakdown, Vendor Recommendations, Risk & Contingency, and Next Steps. Keep it practical and actionable.\n\nInputs:\n- Date: ${date}\n- Venue: ${venue}\n- People: ${people}\n- Time/Duration: ${time}\n- Budget: ${budget}\n`;
    await chat(planPrompt);
  };

  // Process messages queue
  useEffect(() => {
    if (!isPlaying && messages.length > 0 && !processingRef.current) {
      processingRef.current = true;
      const nextMessage = messages[0];
      setMessage(nextMessage);
      setIsPlaying(true);
    }
  }, [messages, isPlaying]);

  const onMessagePlayed = () => {
    setIsPlaying(false);
    processingRef.current = false;
    setMessages(prev => prev.slice(1));
    setHistory(prev => (message ? [...prev, message] : prev));
    setMessage(null);
  };

  return (
    <ChatContext.Provider
      value={{
        chat,
        askPlan,
        message,
        onMessagePlayed,
        loading,
        cameraZoomed,
        setCameraZoomed,
        history,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};
