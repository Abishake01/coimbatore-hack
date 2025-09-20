import { Link } from 'react-router-dom';

export default function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-6">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Event Management</h1>
        <p className="text-gray-300 mb-8 text-lg">Plan Hackathons, Weddings, Birthdays, Corporate events, Concerts, Festivals, and Sports with an AI-powered 3D avatar. Answer 5 quick questions and get a complete event plan with live voice.</p>
        <Link to="/dashboard" className="inline-block px-8 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 font-semibold shadow hover:scale-105 transition">
          Get Started
        </Link>
      </div>
    </div>
  );
}
