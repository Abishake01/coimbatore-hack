import React from "react";
import SplitText from "./SplitText";

// Animated Feature Icons
const AnimatedZapIcon = () => (
  <div className="w-12 h-12 relative flex items-center justify-center ">
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

export default function FeaturesSection() {
  const handleAnimationComplete = () => {
    console.log('Feature animation complete!');
  };

  return (
    <section className="relative py-16 px-6 bg-gray-50 overflow-hidden bg-gray-800">
      {/* Background Decoration */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>

      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
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
            threshold={0.1}
            rootMargin="-50px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />
          
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/90 backdrop-blur-sm p-6 rounded-2xl text-center shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-slate-200"
            >
              {/* Animated Icon */}
              <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>

              {/* Feature Title */}
              <SplitText
                text={feature.title}
                className="text-lg font-semibold mb-3 text-slate-800"
                delay={50}
                duration={0.6}
                ease="power2.out"
                splitType="chars"
                from={{ opacity: 0, y: 20 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-50px"
                textAlign="center"
                onLetterAnimationComplete={handleAnimationComplete}
              />

              {/* Feature Description */}
              <SplitText
                text={feature.desc}
                className="text-sm text-gray-600 leading-relaxed"
                delay={30}
                duration={0.5}
                ease="power2.out"
                splitType="words"
                from={{ opacity: 0, y: 15 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-50px"
                textAlign="center"
                onLetterAnimationComplete={handleAnimationComplete}
              />

              {/* Decorative Elements */}
              <div className="absolute -top-1 -right-1 w-16 h-16 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-full blur-xl"></div>
              <div className="absolute -bottom-1 -left-1 w-12 h-12 bg-gradient-to-r from-pink-500/5 to-blue-500/5 rounded-full blur-lg"></div>
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 to-cyan-500/0 group-hover:from-purple-500/5 group-hover:to-cyan-500/5 transition-all duration-500"></div>
            </div>
          ))}
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