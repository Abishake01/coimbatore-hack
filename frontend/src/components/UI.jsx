import React, { useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { FaMicrophone } from "react-icons/fa";
import { IoSend } from "react-icons/io5";

const AI_TYPES = [
  { key: 'hackathon', name: 'Hackathon AI', color: 'from-blue-500 to-indigo-600' },
  { key: 'wedding', name: 'Wedding AI', color: 'from-pink-500 to-rose-600' },
  { key: 'birthday', name: 'Birthday AI', color: 'from-yellow-400 to-orange-500' },
  { key: 'corporate', name: 'Corporate AI', color: 'from-gray-500 to-blue-700' },
  { key: 'concert', name: 'Concert AI', color: 'from-purple-500 to-fuchsia-600' },
  { key: 'festival', name: 'Fest AI', color: 'from-green-500 to-teal-600' },
  { key: 'sports', name: 'Sports AI', color: 'from-red-500 to-orange-600' },
];

export const UI = ({ hidden, initialStage, initialAI, ...props }) => {
  const input = useRef();
  const [isListening, setIsListening] = useState(false);
  const { chat, askPlan, loading, cameraZoomed, setCameraZoomed, message, history, language, setLanguage } = useChat();

  // Stages: landing -> dashboard -> qna -> chat
  const [stage, setStage] = useState(initialStage || 'landing');
  const [selectedAI, setSelectedAI] = useState(initialAI || null);
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({ date: '', venue: '', people: '', time: '', budget: '' });

  React.useEffect(() => {
    if (initialStage) setStage(initialStage);
    if (initialAI) setSelectedAI(initialAI);
  }, [initialStage, initialAI]);

  const sendMessage = (text) => {
    if (!loading && !message && text && text.trim()) {
      chat(text);
      if (input.current) {
        input.current.value = "";
      }
    }
  };

  const proceedQna = async () => {
    if (step < 5) {
      setStep(step + 1);
      return;
    }
    setStage('chat');
    await askPlan(selectedAI || 'event', answers);
  };

  const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (transcript && transcript.trim()) {
          if (input.current) {
            input.current.value = transcript;
          }
          // Wait 2 seconds before sending
          setTimeout(() => {
            sendMessage(transcript);
          }, 2000);
        }
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } else {
      alert('Speech recognition is not supported in this browser.');
    }
  };

  if (hidden) {
    return null;
  }

  return (
    <div className="overflow-hidden min-h-screen">
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        {/* Stage header */}
        <div className="self-start backdrop-blur-md bg-white bg-opacity-50 p-3 sm:p-4 rounded-lg max-w-full sm:max-w-2xl">
          {stage === 'landing' && (
            <>
              <h1 className="font-bold text-xl lg:text-2xl text-purple-800">Event Management</h1>
              <p className="text-xs sm:text-sm lg:text-base">Plan events with AI assistance and a 3D avatar.</p>
            </>
          )}
          {stage === 'dashboard' && (
            <>
              <h1 className="font-bold text-xl lg:text-2xl text-purple-800">AI Hub</h1>
              <p className="text-xs sm:text-sm lg:text-base">Choose an AI specialized for your event.</p>
            </>
          )}
          {stage === 'qna' && (
            <>
              <h1 className="font-bold text-xl lg:text-2xl text-purple-800">{selectedAI?.toUpperCase()} Planner</h1>
              <p className="text-xs sm:text-sm lg:text-base">Step {step} of 5</p>
            </>
          )}
          {stage === 'chat' && (
            <>
              <h1 className="font-bold text-xl lg:text-2xl text-purple-800">{selectedAI?.toUpperCase()} Assistant</h1>
              <p className="text-xs sm:text-sm lg:text-base">Chat and refine your plan. The avatar will speak the plan.</p>
            </>
          )}
          {/* Language selector */}
          <div className="mt-2">
            <label className="text-xs mr-2">Language</label>
            <select
              value={language}
              onChange={(e)=>setLanguage(e.target.value)}
              className="pointer-events-auto text-xs border rounded px-2 py-1 bg-white/80"
            >
              <option value="en">English</option>
              <option value="ta">Tamil</option>
              <option value="te">Telugu</option>
              <option value="ml">Malayalam</option>
              <option value="hi">Hindi</option>
            </select>
          </div>
        </div>
        <div className="w-full flex flex-col sm:flex-row items-end justify-center gap-4" style={{ display: 'grid', justifyItems: 'start', alignContent: 'stretch', justifyContent: 'end' }}>
          <button
            onClick={() => setCameraZoomed(!cameraZoomed)}
            className="pointer-events-auto bg-blue-200 hover:bg-blue-400 text-white p-3 sm:p-4 transition duration-200 group"
            id="btn"
          >
            {cameraZoomed ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#333333"
                className="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200 group-hover:stroke-white svg-path"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM13.5 10.5h-6"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#333333"
                className="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200 group-hover:stroke-white svg-path"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            )}
          </button>
          <button
            onClick={() => {
              const body = document.querySelector("body");
              body.classList.toggle("greenScreen");
            }}
            className="pointer-events-auto bg-purple-200 hover:bg-purple-400 text-white p-3 sm:p-4 rounded-xl transition duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 sm:w-6 sm:h-6"
            >
              <path
                strokeLinecap="round"
                d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25-2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </button>
          <button
            onClick={() => window.location.reload()}
            className="pointer-events-auto bg-blue-200 hover:bg-blue-400 text-white p-3 sm:p-4 transition duration-200 group"
            id="btn"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200 group-hover:stroke-white"
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                className="svg-path"
                stroke="#333333"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              >
                <path d="M19.933 13.041a8 8 0 1 1-9.925-8.788c3.899-1 7.935 1.007 9.425 4.747" />
                <path d="M20 4v5h-5" />
              </g>
            </svg>
          </button>
          <style jsx>{`
            #btn:hover .svg-path {
              stroke: white;
            }
          `}</style>
        </div>
        {message && message.text && (
          <div className="self-center bg-gray-100 bg-opacity-75 p-3 sm:p-4 rounded-lg mt-10 sm:mt-20 inline-block w-fit">
            <p className="text-xs sm:text-sm lg:text-base text-gray-900">{message.text}</p>
          </div>
        )}
        {/* Bottom input bar */}
        <div className="flex items-center gap-2 pointer-events-auto max-w-screen-sm w-full mx-auto mt-4">
          <input
            className="w-full placeholder:text-gray-800 placeholder:italic p-3 sm:p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md text-xs sm:text-sm"
            placeholder="Type a message..."
            ref={input}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage(e.target.value);
              }
            }}
          />
          <button
            onClick={() => startVoiceInput()}
            className={`bg-red-200 hover:bg-red-400 text-gray-800 hover:text-white p-2 sm:p-4 rounded-md transition duration-200 ${
              isListening ? "animate-pulse" : ""
            }`}
          >
            <FaMicrophone className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          <button
            disabled={loading || message}
            onClick={() => sendMessage(input.current.value)}
            className={`bg-blue-200 hover:bg-blue-400 text-gray-800 hover:text-white p-2 sm:p-4 font-semibold uppercase rounded-md transition duration-200 flex items-center gap-2 ${
              loading || message ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <IoSend className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stage content sections */}
      {stage === 'landing' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="backdrop-blur-md bg-white/40 border border-white/60 rounded-2xl p-8 max-w-2xl text-center pointer-events-auto">
            <h1 className="text-3xl font-extrabold text-purple-800 mb-2">Event Management</h1>
            <p className="text-gray-800 mb-6">Plan Hackathons, Weddings, Birthdays, Corporate events, Concerts, Festivals, and Sports with AI. Your 3D assistant will speak the plan.</p>
            <button onClick={() => setStage('dashboard')} className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold shadow">
              Get Started
            </button>
          </div>
        </div>
      )}

      {stage === 'dashboard' && (
        <div className="absolute inset-0 z-10 flex items-start justify-center pt-24 pointer-events-none">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl pointer-events-auto">
            {AI_TYPES.map(card => (
              <button key={card.key} onClick={() => { setSelectedAI(card.key); setStage('qna'); setStep(1); }} className={`p-6 rounded-2xl text-left text-white bg-gradient-to-br ${card.color} shadow-lg hover:scale-[1.02] transition`}>
                <div className="text-2xl font-bold mb-2">{card.name}</div>
                <div className="opacity-90 text-sm">Specialized planning prompts for {card.name.replace(' AI','').toLowerCase()}s</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {stage === 'qna' && (
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="backdrop-blur-md bg-white/50 border border-white/60 rounded-2xl p-6 w-full max-w-xl pointer-events-auto">
            <h2 className="text-xl font-bold mb-4 text-purple-800">Provide event details</h2>
            {step === 1 && (
              <div className="space-y-3">
                <label className="block text-sm font-medium">Date</label>
                <input type="text" value={answers.date} onChange={e=>setAnswers({...answers,date:e.target.value})} placeholder="e.g., 20 Oct 2025" className="w-full p-3 rounded-md border" />
              </div>
            )}
            {step === 2 && (
              <div className="space-y-3">
                <label className="block text-sm font-medium">Venue</label>
                <input type="text" value={answers.venue} onChange={e=>setAnswers({...answers,venue:e.target.value})} placeholder="e.g., Convention Center" className="w-full p-3 rounded-md border" />
              </div>
            )}
            {step === 3 && (
              <div className="space-y-3">
                <label className="block text-sm font-medium">People</label>
                <input type="text" value={answers.people} onChange={e=>setAnswers({...answers,people:e.target.value})} placeholder="e.g., 300 attendees" className="w-full p-3 rounded-md border" />
              </div>
            )}
            {step === 4 && (
              <div className="space-y-3">
                <label className="block text-sm font-medium">Time / Duration</label>
                <input type="text" value={answers.time} onChange={e=>setAnswers({...answers,time:e.target.value})} placeholder="e.g., 2 days" className="w-full p-3 rounded-md border" />
              </div>
            )}
            {step === 5 && (
              <div className="space-y-3">
                <label className="block text-sm font-medium">Budget</label>
                <input type="text" value={answers.budget} onChange={e=>setAnswers({...answers,budget:e.target.value})} placeholder="e.g., $50,000" className="w-full p-3 rounded-md border" />
              </div>
            )}
            <div className="flex justify-between mt-6">
              <button onClick={() => setStage('dashboard')} className="px-4 py-2 rounded-md border">Back</button>
              <button onClick={proceedQna} className="px-6 py-2 rounded-md bg-purple-600 text-white">{step < 5 ? 'Next' : 'Generate Plan'}</button>
            </div>
          </div>
        </div>
      )}

      {stage === 'chat' && (
        <div className="absolute left-4 top-24 z-10 w-80 max-w-[85vw] pointer-events-none">
          <div className="pointer-events-auto bg-white/80 rounded-xl shadow border p-3">
            <div className="font-semibold text-purple-800 mb-2">AI Responses</div>
            <div className="max-h-80 overflow-y-auto space-y-2">
              {history.slice(-12).map((m, idx) => {
                const t = m.text || '';
                let isJson = false;
                let pretty = '';
                try {
                  const trimmed = t.trim();
                  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
                    pretty = JSON.stringify(JSON.parse(trimmed), null, 2);
                    isJson = true;
                  }
                } catch (e) {}
                return (
                  <div key={idx} className="bg-purple-100 rounded p-2 text-sm text-gray-800 whitespace-pre-wrap">
                    {isJson ? <pre className="text-xs overflow-x-auto">{pretty}</pre> : t}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
