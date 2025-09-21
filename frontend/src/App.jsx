import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import AvatarPage from './pages/AvatarPage';
import Landing from './pages/Landing';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/avatar/:type" element={<AvatarPage />} />
        <Route path="/events/:type" element={<AvatarPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
