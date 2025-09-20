import React from "react";
import Orb from "./Orb";
import SplitText from "./SplitText";
import Galaxy from "./Galaxy";

const HeroSection = () => {
  const handleAnimationComplete = () => {
    console.log('Heading animation complete!');
  };
  
  const handleGetStarted = () => {
    // Navigate to dashboard page
    console.log('Navigating to dashboard...');
    // In a real app, you'd use React Router or Next.js router
    // Example: navigate('/dashboard') or router.push('/dashboard')
  };

  const handleTryDemo = () => {
    // Navigate to demo page
    console.log('Navigating to demo...');
    // In a real app, you'd use React Router or Next.js router
    // Example: navigate('/demo') or router.push('/demo')
  };

  return (
    
    <section className="relative overflow-hidden min-h-screen w-full flex items-center justify-center bg-gray-800 ">
      {/* Your Orb Component - Fullscreen */}
      <div className="absolute inset-0 z-1 ">
           <Galaxy 
                  mouseRepulsion={true}
          mouseInteraction={true}
          density={1.5}
          glowIntensity={0.5}
          saturation={0.8}
          hueShift={240}
              />
               {/* <div className="absolute inset-0 z-0 w-30 h-10"><Orb hoverIntensity={2.0} rotateOnHover={true} hue={260} forceHoverState={false} /></div> */}
           
      </div>
      

      {/* Hero Content */}
      <div className="relative z-10 text-white text-center max-w-4xl px-6">
        <SplitText
          text="AI Event Co-Organizer"
          className="text-5xl md:text-7xl font-bold mb-6 p-4 text-orange-200 "
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
          text="Plan events in minutes, not weeks. Our AI turns simple event details
          into full action plans, deadlines, and real-time team collaboration."
          className="text-xl md:text-1xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed "
          delay={20}
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
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        
       <button 
            onClick={handleGetStarted}
            className="relative bg-purple-600 text-white font-semibold py-4 px-8  transition-all duration-300 transform hover:scale-105 active:scale-95"
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

          {/* Glass Morphism 3D Button */}
          <button 
            onClick={handleTryDemo}
            className="relative bg-white/40 backdrop-blur-lg border border-white/30 text-slate-800 font-semibold py-4 px-8  transition-all duration-300 transform hover:scale-105 active:scale-95"
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

export default HeroSection;


