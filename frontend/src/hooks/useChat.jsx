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

  // Hydrate last response from localStorage on mount
  useEffect(() => {
    try {
      const last = localStorage.getItem('ai_last_response');
      if (last) {
        const parsed = JSON.parse(last);
        if (parsed && parsed.text) {
          setHistory([parsed]);
        }
      }
    } catch {}
  }, []);

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
      // If plan_json exists, enqueue a JSON message first so the left panel shows it (Avatar will skip speaking it)
      const jsonMsg = data?.response?.plan_json ? [{ text: JSON.stringify(data.response.plan_json) }] : [];
      setMessages(prev => [...prev, ...jsonMsg, ...inbound]);
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
      if (msgCopy) {
        const isJsonText = (t) => {
          if (!t || typeof t !== 'string') return false;
          const s = t.trim();
          if (!(s.startsWith('{') || s.startsWith('['))) return false;
          try { JSON.parse(s); return true; } catch { return false; }
        };
        const currentStored = (() => { try { return JSON.parse(localStorage.getItem('ai_last_response') || 'null'); } catch { return null; }})();
        const currentIsJson = currentStored && isJsonText(currentStored.text);
        const incomingIsJson = isJsonText(msgCopy.text);

        // If incoming is JSON, persist and show it.
        if (incomingIsJson) {
          try { localStorage.setItem('ai_last_response', JSON.stringify(msgCopy)); } catch {}
          setHistory([msgCopy]);
        } else {
          // If we already have a JSON response stored, keep it visible; otherwise store this text.
          if (!currentIsJson) {
            try { localStorage.setItem('ai_last_response', JSON.stringify(msgCopy)); } catch {}
            setHistory([msgCopy]);
          }
        }
      }
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
