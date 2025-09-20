import { Link } from 'react-router-dom';

const AI_TYPES = [
  { key: 'hackathon', name: 'Hackathon AI', color: 'from-blue-500 to-indigo-600' },
  { key: 'wedding', name: 'Wedding AI', color: 'from-pink-500 to-rose-600' },
  { key: 'birthday', name: 'Birthday AI', color: 'from-yellow-400 to-orange-500' },
  { key: 'corporate', name: 'Corporate AI', color: 'from-gray-500 to-blue-700' },
  { key: 'concert', name: 'Concert AI', color: 'from-purple-500 to-fuchsia-600' },
  { key: 'festival', name: 'Fest AI', color: 'from-green-500 to-teal-600' },
  { key: 'sports', name: 'Sports AI', color: 'from-red-500 to-orange-600' },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-8 text-center">AI Hub</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AI_TYPES.map(card => (
            <Link key={card.key} to={`/avatar/${card.key}`} className={`p-6 rounded-2xl text-left text-white bg-gradient-to-br ${card.color} shadow-lg hover:scale-[1.02] transition`}>
              <div className="text-2xl font-bold mb-2">{card.name}</div>
              <div className="opacity-90 text-sm">Specialized planning prompts for {card.name.replace(' AI','').toLowerCase()}s</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
