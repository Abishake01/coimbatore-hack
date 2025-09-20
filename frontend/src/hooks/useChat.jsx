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
  const [language, setLanguage] = useState(
    localStorage.getItem('ai_language') || 'en'
  );

  useEffect(() => {
    localStorage.setItem('ai_language', language);
  }, [language]);

  const chat = async (message) => {
    setLoading(true);
    
    try {
      const data = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, language }),
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

  // Resolve API base from env or from backendUrl
  const apiBase = import.meta.env.VITE_API_BASE || (backendUrl.replace(/\/chat$/, ""));

  // Helper to build plan request
  const askPlan = async (eventType, answers) => {
    try {
      const resp = await fetch(`${apiBase}/api/event-plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event_type: eventType, answers, language })
      });
      const data = await resp.json();
      const inbound = Array.isArray(data?.response?.messages) ? data.response.messages : [];
      setMessages(prev => [...prev, ...inbound]);
    } catch (e) {
      console.error('askPlan error', e);
    }
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
    // Add artificial 2s delay before showing in history (loading effect)
    const msgCopy = message ? { ...message } : null;
    setTimeout(() => {
      setHistory(prev => (msgCopy ? [...prev, msgCopy] : prev));
    }, 2000);
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
        language,
        setLanguage,
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
