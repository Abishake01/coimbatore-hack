import React from "react";
import SplitText from "./SplitText";
import Galaxy from "./Galaxy";
import {
  PlusSquare,
  Cpu,
} from "lucide-react";

// Animated CSS Icons Components
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

export default function WorkflowSection() {
  const handleAnimationComplete = () => {
    console.log('Heading animation complete!');
  };
  
  return (
    <section className="relative py-20 px-6 overflow-hidden min-h-screenrelative overflow-hidden min-h-screen w-full flex items-center justify-center bg-gray-800">
      {/* Galaxy Background */}
      <div className="absolute inset-0 ">
          <Galaxy 
                  mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.5}
          saturation={0.8}
          hueShift={240}
              />
      </div>
      
      {/* Gradient Overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/30 via-transparent to-purple-900/20"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <SplitText
            text=" WORKFLOW — HOW THE AI CO-ORGANIZER WORKS"
            className="text-5xl md:text-7xl font-bold mb-6 p-4 text-white drop-shadow-2xl"
            delay={150}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />
          
          <SplitText
            text="  From signup to a finished event plan — everything in one workspace.
              We use OpenAI for smart planning and a rule-based fallback for
              reliability."
            className="text-1xl md:text-3xl mb-6 p-4 text-blue-100 drop-shadow-lg"
            delay={43}
            duration={0.8}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-50px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-purple-400 to-cyan-400 rounded-full shadow-lg hidden md:block"></div>

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`relative flex items-center ${
                  step.side === "left"
                    ? "md:justify-start"
                    : "md:justify-end"
                } justify-center`}
              >
                {/* Timeline Node */}
                <div className="absolute left-1/2 transform -translate-x-1/2 z-20 hidden md:block">
                  <div className="relative">
                    <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg animate-pulse"></div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full animate-ping"></div>
                  </div>
                </div>

                {/* Step Card */}
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
                    {/* Step Number */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {step.id}
                    </div>

                    {/* Content */}
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

                    {/* Decorative */}
                    <div className="absolute -top-1 -right-1 w-20 h-20 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-xl"></div>
                    <div className="absolute -bottom-1 -left-1 w-16 h-16 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-lg"></div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500"></div>
                  </div>

                  {/* Connection Line */}
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

        {/* CTA Buttons */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6">
          <a
            href="/signup"
            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 font-semibold backdrop-blur-sm"
          >
            <img src="https://via.placeholder.com/20x20/ffffff/6366f1?text=👤" alt="User" className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
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

        {/* Bottom Tagline */}
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

      {/* Float Animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}