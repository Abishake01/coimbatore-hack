import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import AvatarPage from './pages/AvatarPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/avatar/:type" element={<AvatarPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
