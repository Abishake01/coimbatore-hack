import React from 'react';
import { useNavigate } from 'react-router-dom';
import PixelBlast from '../components/PixelBlast'; // Correct path
import SplitText from '../components/SplitText';

const handleAnimationComplete = () => {
  console.log('Animation complete!');
};


// Import the local video files
import bandPlayingMusic from '../assets/images/concert.mp4';
import christmasTree from '../assets/images/chirtmas.mp4';
import problemSolving from '../assets/images/corprate.mp4';
import teacherAndStudents from '../assets/images/school.mp4';
import businessMeeting from '../assets/images/hackathon.mp4';
import runningKids from '../assets/images/sports.mp4';
import manPlayingGuitar from '../assets/images/wedding.mp4';
import birthdayParty from '../assets/images/festivel.mp4';
import birthdayCake from '../assets/images/birthday.mp4';

const AI_TYPES = [
  {
    key: 'hackathon',
    name: 'Hackathon Event',
    color: 'from-blue-500 to-indigo-600',
    media: businessMeeting,
    description: 'Specialized planning prompts for hackathons'
  },
  {
    key: 'wedding',
    name: 'Wedding Event',
    color: 'from-pink-500 to-rose-600',
    media: manPlayingGuitar,
    description: 'Specialized planning prompts for weddings'
  },
  {
    key: 'birthday',
    name: 'Birthday Event',
    color: 'from-yellow-400 to-orange-500',
    media: birthdayCake,
    description: 'Specialized planning prompts for birthdays'
  },
  {
    key: 'corporate',
    name: 'Corporate Event',
    color: 'from-gray-500 to-blue-700',
    media: problemSolving,
    description: 'Specialized planning prompts for corporate events'
  },
  {
    key: 'concert',
    name: 'Concert Event',
    color: 'from-purple-500 to-fuchsia-600',
    media: bandPlayingMusic,
    description: 'Specialized planning prompts for concerts'
  },
  {
    key: 'festival',
    name: 'Fest Event',
    color: 'from-green-500 to-teal-600',
    media: birthdayParty,
    description: 'Specialized planning prompts for festivals'
  },
  {
    key: 'sports',
    name: 'Sports Event',
    color: 'from-red-500 to-orange-600',
    media: runningKids,
    description: 'Specialized planning prompts for sports events'
  },
  {
    key: 'school',
    name: 'School Event',
    color: 'from-green-500 to-teal-600',
    media: teacherAndStudents,
    description: 'Specialized planning prompts for school events'
  },
  {
    key: 'christmas',
    name: 'Christmas Event',
    color: 'from-red-500 to-orange-600',
    media: christmasTree,
    description: 'Specialized planning prompts for Christmas events'
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const handleCardClick = (aiType) => {
    // Navigate to a route based on aiType.key, e.g. /events/:type
    navigate(`/events/${aiType.key}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-4 md:p-8 relative">
      {/* PixelBlast as the main background */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          opacity: 0.3
        }}
      >
        <PixelBlast
         variant="circle"
          pixelSize={6}
          color="#B19EEF"
          patternScale={3}
          patternDensity={1.2}
          pixelSizeJitter={0.5}
          enableRipples
          rippleSpeed={0.4}
          rippleThickness={0.12}
          rippleIntensityScale={1.5}
          liquid
          liquidStrength={0.12}
          liquidRadius={1.2}
          liquidWobbleSpeed={5}
          speed={0.6}
          edgeFade={0.25}
          transparent
        />
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
           <div className="text-center mb-16">
          <SplitText
            text="    AI Hub"
            className="text-5xl md:text-7xl font-bold mb-6 p-4 text-yellow-400 drop-shadow-2xl"
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
        </div>
        <div>
          <SplitText
            text="  Choose your specialized AI assistant for seamless event planning."
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed"
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        
{AI_TYPES.map((card, index) => (
  <div
    key={card.key}
    onClick={() => handleCardClick(card)}
    className={"group cursor-pointer relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-500 to-blue-700 p-0 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:-rotate-1 border border-white/10 flex flex-col"}
  style={{ animationDelay: `${index * 100}ms`, height: '380px', minHeight: '260px' }}
  >
    {/* Video section - 80% */}
    <div className="flex items-center justify-center h-[80%] w-full bg-white/10">
      <video
        src={card.media}
        alt={card.name}
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover rounded-t-3xl"
        style={{ maxHeight: '100%', maxWidth: '100%' }}
      />
    </div>
    {/* Info section - 20% */}
    <div className="flex flex-col justify-center items-center h-[20%] px-4 py-2 bg-black/40 rounded-b-3xl">
      <h3 className="text-lg md:text-xl font-bold mb-1 text-center group-hover:text-white transition-colors duration-300">
        {card.name}
      </h3>
      <p className="text-xs md:text-sm opacity-90 text-center leading-relaxed group-hover:opacity-100 transition-opacity duration-300 ">
        {card.description}
      </p>
    </div>
    {/* Arrow icon */}
    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
    <div className="absolute inset-0 -top-2 -left-2 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
  </div>
))}

        </div>

        <div className="text-center mt-16">
          <p className="text-gray-400 text-sm">
            Click on any AI type to get started with specialized event planning
          </p>
        </div>
      </div>
    </div>
  );
}