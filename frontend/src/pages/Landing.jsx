import React, { useState, useRef, useEffect } from "react";
import { Menu, X, PlusSquare, Cpu } from "lucide-react";
import Galaxy from "../components/Galaxy";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// Import Galaxy component (assuming it's in a separate file)
// import Galaxy from "./Galaxy";

// SplitText Component
const SplitText = ({ 
  text, 
  className = "", 
  delay = 50, 
  duration = 0.6, 
  ease = "power2.out", 
  splitType = "chars", 
  from = { opacity: 0, y: 20 }, 
  to = { opacity: 1, y: 0 },
  textAlign = "left",
  onLetterAnimationComplete = () => {}
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: "-50px" }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const splitText = splitType === "words" ? text.split(" ") : text.split("");

  return (
    <div ref={elementRef} className={`${className} ${textAlign === "center" ? "text-center" : ""}`}>
      {splitText.map((char, index) => (
        <span
          key={index}
          className={`inline-block transition-all ${duration === 0.8 ? "duration-800" : "duration-600"} ease-out`}
          style={{
            opacity: isVisible ? to.opacity : from.opacity,
            transform: `translateY(${isVisible ? to.y : from.y}px)`,
            transitionDelay: `${index * delay}ms`
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};

// Navbar Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Workflow", href: "#workflow" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-full mx-auto flex items-center justify-between px-6 py-4 bg-white/10 backdrop-blur-md shadow-xl border border-white/20">
        <a href="#" className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
          AI Organizer
        </a>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 font-semibold text-white">
            {links.map((link) => (
              <li key={link.name}>
                <a href={link.href} className="relative group transition duration-300 hover:text-purple-300">
                  {link.name}
                  <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400 transition-all group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button className="px-6 py-2 bg-purple-600/80 hover:bg-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm">
              Sign Up
            </button>
            <button className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/30">
              Login
            </button>
          </div>
        </div>

        <button 
          className="md:hidden text-white hover:text-purple-300 transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-md border-t border-white/20 shadow-lg p-6">
          <ul className="flex flex-col gap-4 mb-6">
            {links.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href} 
                  className="block py-2 text-white hover:text-purple-300 transition font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <button className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Sign Up
            </button>
            <button className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 backdrop-blur-sm border border-white/30">
              Login
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/dashboard');
  };

  function handleTryDemo() {
    navigate("/dashboard");
  }

  return (
    <section id="home" className="relative overflow-hidden min-h-screen w-full flex items-center justify-center">
      {/* Galaxy background will be imported */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
        <Galaxy 
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.5}
          saturation={0.8}
          hueShift={240}
          key="hero-galaxy"
        />
      </div>

      <div className="relative z-10 text-white text-center max-w-4xl px-6">
        <SplitText
          text="AI Event Organizer"
          className="text-5xl md:text-7xl font-bold mb-6 p-4 text-orange-200"
          delay={150}
          duration={0.8}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 50 }}
          to={{ opacity: 1, y: 0 }}
          textAlign="center"
        />
        <SplitText
          text="Plan events in minutes, not weeks. Our AI turns simple event details into full action plans, deadlines, and real-time team collaboration."
          className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          delay={20}
          duration={0.8}
          ease="power3.out"
          splitType="chars"
          from={{ opacity: 0, y: 50 }}
          to={{ opacity: 1, y: 0 }}
          textAlign="center"
        />
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={handleGetStarted}
            className="relative bg-purple-600 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(145deg, #9333ea, #7c3aed)',
              boxShadow: `
                inset -2px -2px 6px rgba(0,0,0,0.3),
                inset 2px 2px 6px rgba(255,255,255,0.1),
                8px 8px 16px rgba(124, 58, 237, 0.3),
                -8px -8px 16px rgba(147, 51, 234, 0.3)
              `
            }}
          >
            Get Started
          </button>

          <button 
            onClick={handleTryDemo}
            className="relative bg-white/40 backdrop-blur-lg border border-white/30 text-slate-800 font-semibold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
            style={{
              boxShadow: `
                0 8px 32px rgba(0,0,0,0.12),
                inset 0 1px 0 rgba(255,255,255,0.5),
                inset 0 -1px 0 rgba(0,0,0,0.1)
              `
            }}
          >
            Try Demo
          </button>
        </div>
      </div>
    </section>
  );
};

// Features Section
const FeaturesSection = () => {
  const sectionRef = useRef(null);
  const AnimatedZapIcon = () => (
    <div className="w-12 h-12 relative flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-pulse"></div>
      <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
        <div className="w-4 h-6 bg-gradient-to-b from-yellow-500 to-orange-500 transform rotate-12 animate-bounce"></div>
      </div>
      <div className="absolute -inset-2 bg-yellow-400 rounded-full blur opacity-40 animate-ping"></div>
    </div>
  );

  const AnimatedCheckIcon = () => (
    <div className="w-12 h-12 relative flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
      <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
        <div className="w-6 h-3 border-b-3 border-r-3 border-green-500 transform rotate-45 animate-bounce"></div>
      </div>
      <div className="absolute -inset-1 bg-green-400 rounded-full blur opacity-30 animate-pulse"></div>
    </div>
  );

  const AnimatedUsersIcon = () => (
    <div className="w-12 h-12 relative flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse"></div>
      <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center space-x-1">
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
      </div>
      <div className="absolute -inset-1 bg-blue-400 rounded-full blur opacity-30 animate-ping"></div>
    </div>
  );

  const AnimatedCalendarIcon = () => (
    <div className="w-12 h-12 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg animate-pulse"></div>
      <div className="absolute inset-1 bg-white rounded-md">
        <div className="grid grid-cols-3 gap-1 p-1 h-full">
          <div className="bg-purple-400 rounded animate-pulse"></div>
          <div className="bg-pink-400 rounded animate-pulse" style={{animationDelay: '0.3s'}}></div>
          <div className="bg-purple-300 rounded animate-pulse" style={{animationDelay: '0.6s'}}></div>
          <div className="bg-pink-300 rounded animate-pulse" style={{animationDelay: '0.9s'}}></div>
          <div className="bg-purple-400 rounded animate-pulse" style={{animationDelay: '1.2s'}}></div>
          <div className="bg-pink-400 rounded animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>
      </div>
      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-purple-500 rounded-t animate-bounce"></div>
    </div>
  );

  const features = [
    { 
      icon: <AnimatedZapIcon />, 
      title: "AI-Powered Planning", 
      desc: "Generate smart schedules & tasks instantly with advanced AI algorithms." 
    },
    { 
      icon: <AnimatedCheckIcon />, 
      title: "Smart Dashboard", 
      desc: "Track progress in a beautiful Kanban-style board with real-time updates." 
    },
    { 
      icon: <AnimatedUsersIcon />, 
      title: "Team Collaboration", 
      desc: "Assign tasks, add comments, and collaborate seamlessly with your team." 
    },
    { 
      icon: <AnimatedCalendarIcon />, 
      title: "Real-time Updates", 
      desc: "Stay notified with instant changes and synchronized data across devices." 
    },
  ];

  return (
    <section id="features" className="relative py-16 px-6 overflow-hidden">      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <SplitText
            text="Key Features"
            className="text-4xl md:text-5xl font-bold mb-6 text-orange-200"
            delay={100}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="center"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-lg p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-white/20"
            >
              <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              <SplitText
                text={feature.title}
                className="text-lg font-semibold mb-3 text-white"
                delay={50}
                duration={0.6}
                ease="power2.out"
                splitType="chars"
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
                textAlign="center"
              />

              <SplitText
                text={feature.desc}
                className="text-sm text-blue-100 leading-relaxed"
                delay={30}
                duration={0.5}
                ease="power2.out"
                splitType="words"
                from={{ opacity: 0, y: 15 }}
                to={{ opacity: 1, y: 0 }}
                textAlign="center"
              />

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/10 group-hover:to-cyan-500/10 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Workflow Section
const WorkflowSection = () => {
  const sectionRef = useRef(null);
  const AnimatedUserIcon = () => (
    <div className="w-10 h-10 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
      <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
        <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce"></div>
      </div>
      <div className="absolute top-0 left-0 w-3 h-3 bg-blue-400 rounded-full animate-ping opacity-30"></div>
    </div>
  );

  const AnimatedPlusIcon = () => (
    <div className="w-10 h-10 relative flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg animate-pulse"></div>
      <div className="relative z-10 text-white font-bold text-2xl animate-bounce">+</div>
      <div className="absolute inset-0 bg-purple-400 rounded-lg blur opacity-50 animate-ping"></div>
    </div>
  );

  const AnimatedAIIcon = () => (
    <div className="w-10 h-10 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-spin"></div>
      <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
        <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
        <div className="w-1 h-1 bg-blue-500 rounded-full animate-bounce ml-1"></div>
      </div>
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full blur opacity-40 animate-pulse"></div>
    </div>
  );

  const AnimatedBoardIcon = () => (
    <div className="w-10 h-10 relative">
      <div className="grid grid-cols-2 gap-1 p-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
        <div className="bg-white rounded animate-bounce" style={{animationDelay: '0s'}}></div>
        <div className="bg-white rounded animate-bounce" style={{animationDelay: '0.2s'}}></div>
        <div className="bg-white rounded animate-bounce" style={{animationDelay: '0.4s'}}></div>
        <div className="bg-white rounded animate-bounce" style={{animationDelay: '0.6s'}}></div>
      </div>
      <div className="absolute -inset-1 bg-green-400 rounded-lg blur opacity-30 animate-pulse"></div>
    </div>
  );

  const AnimatedWifiIcon = () => (
    <div className="w-10 h-10 relative flex items-center justify-center">
      <div className="absolute w-8 h-8 border-2 border-orange-500 rounded-full animate-ping"></div>
      <div className="absolute w-6 h-6 border-2 border-orange-400 rounded-full animate-ping" style={{animationDelay: '0.5s'}}></div>
      <div className="absolute w-4 h-4 border-2 border-orange-300 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
      <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
    </div>
  );

  const AnimatedChatIcon = () => (
    <div className="w-10 h-10 relative">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl animate-pulse"></div>
      <div className="absolute inset-1 bg-white rounded-xl flex flex-col justify-center pl-1">
        <div className="w-4 h-1 bg-pink-400 rounded animate-pulse mb-1"></div>
        <div className="w-3 h-1 bg-pink-300 rounded animate-pulse" style={{animationDelay: '0.5s'}}></div>
      </div>
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full animate-bounce"></div>
    </div>
  );

  const steps = [
    {
      id: 1,
      title: "Signup / Login",
      desc: "Create an account or login. Roles: organizer, mentor, participant.",
      icon: <AnimatedUserIcon />,
      side: "left",
    },
    {
      id: 2,
      title: "Create or Join Event",
      desc: "Create a new workspace (event) or join an existing one with invite code.",
      icon: <AnimatedPlusIcon />,
      side: "right",
    },
    {
      id: 3,
      title: "Generate Plan (OpenAI)",
      desc: "Type basic details → AI generates timelines, tasks & deadlines. Fallback: rule-based templates if API fails.",
      icon: <AnimatedAIIcon />,
      side: "left",
    },
    {
      id: 4,
      title: "Kanban Board",
      desc: "Auto-created tasks appear in a Kanban (To Do / In Progress / Done). Assign & edit tasks.",
      icon: <AnimatedBoardIcon />,
      side: "right",
    },
    {
      id: 5,
      title: "Real-time Updates (Socket.IO)",
      desc: "Task updates, assignments and notifications sync instantly across the team.",
      icon: <AnimatedWifiIcon />,
      side: "left",
    },
    {
      id: 6,
      title: "Global Chatbox",
      desc: "Event-wide chat & task comments to keep communication in one place.",
      icon: <AnimatedChatIcon />,
      side: "right",
    },
  ];

  return (
    <section id="workflow" className="relative py-20 px-6 overflow-hidden min-h-screen">      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <SplitText
            text="WORKFLOW — HOW THE AI CO-ORGANIZER WORKS"
            className="text-5xl md:text-7xl font-bold mb-6 p-4 text-white drop-shadow-2xl"
            delay={150}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="center"
          />
          
          <SplitText
            text="From signup to a finished event plan — everything in one workspace. We use OpenAI for smart planning and a rule-based fallback for reliability."
            className="text-xl md:text-2xl mb-6 p-4 text-blue-100 drop-shadow-lg"
            delay={43}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
            textAlign="center"
          />
        </div>

        <div className="relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-purple-400 to-cyan-400 rounded-full shadow-lg hidden md:block"></div>

          <div className="space-y-12">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`relative flex items-center ${
                  step.side === "left"
                    ? "md:justify-start"
                    : "md:justify-end"
                } justify-center`}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
                  <div className="relative">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg animate-pulse"></div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full animate-ping"></div>
                  </div>
                </div>

                <div
                  className={`relative w-full md:w-5/12 ${
                    step.side === "left"
                      ? "md:mr-auto md:pr-8"
                      : "md:ml-auto md:pl-8"
                  }`}
                >
                  <div
                    className="group bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-2xl hover:shadow-3xl hover:bg-white/15 transition-all duration-500 hover:-translate-y-2"
                    style={{
                      transform: `rotateX(5deg) rotateY(${
                        step.side === "left" ? "2deg" : "-2deg"
                      })`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {step.id}
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl text-blue-300 group-hover:text-purple-300 transition-colors duration-300">
                          {step.icon}
                        </div>
                        <h3 className="font-bold text-xl text-white group-hover:text-blue-300 transition-colors duration-300">
                          {step.title}
                        </h3>
                      </div>
                      <p className="text-blue-100 leading-relaxed ml-16">
                        {step.desc}
                      </p>
                    </div>

                    <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-1 -left-1 w-16 h-16 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-lg"></div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
                  </div>

                  <div
                    className={`hidden md:block absolute top-1/2 w-8 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 ${
                      step.side === "left" ? "right-0" : "left-0"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6">
          <a
            href="/signup"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 font-semibold backdrop-blur-sm"
          >
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
            </div>
            Signup / Login
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/50 to-purple-400/50 blur-lg group-hover:blur-xl transition-all duration-300"></div>
          </a>

          <a
            href="/events/create"
            className="group inline-flex items-center gap-3 border-2 border-blue-400/50 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full shadow-2xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:border-transparent transition-all duration-300 font-semibold"
          >
            <PlusSquare className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Create / Join Event
          </a>

          <a
            href="/demo"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 font-semibold backdrop-blur-sm"
          >
            <Cpu className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            Try Demo (AI Plan)
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/50 to-cyan-400/50 blur-lg group-hover:blur-xl transition-all duration-300"></div>
          </a>
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3">
            <Cpu className="w-5 h-5 text-blue-300" />
            <span className="text-white font-medium">
              Powered by AI for smarter event planning
            </span>
            <Cpu className="w-5 h-5 text-purple-300" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Main App Component
const Landing = () => {
  return (
    <div className="relative">
      {/* Full Page Galaxy Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900">
        <Galaxy 
          mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.5}
          saturation={0.8}
          hueShift={240}
        />
      </div>
      
      {/* All content with higher z-index */}
      <div className="relative z-10">
        <Navbar />
        <HeroSection />
        <FeaturesSection />
        <WorkflowSection />
      </div>
      
      {/* Additional CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .duration-800 {
          transition-duration: 800ms;
        }
      `}</style>
    </div>
  );
};

export default Landing;