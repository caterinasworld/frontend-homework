
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CountryList from './pages/CountryList';
import PopulationChart from './pages/PopulationChart';
import LanguageChart from './pages/LanguageChart';
import NotFound from './pages/NotFound';

const App = () => (
  <BrowserRouter>
    <Navbar />

    <main className="container py-4">
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/list" element={<CountryList />} />
        <Route path="/population" element={<PopulationChart />} />
        <Route path="/languages" element={<LanguageChart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
