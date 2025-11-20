
import React from 'react';
import { HashRouter as Router, Routes, Route, Outlet } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { LiveView } from './pages/LiveView';
import { Playback } from './pages/Playback';
import { Settings } from './pages/Settings';
import { FamilyMembers } from './pages/FamilyMembers';
import { Privacy } from './pages/Privacy';
import { Alerts } from './pages/Alerts';
import { Devices } from './pages/Devices';
import { Analytics } from './pages/Analytics';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';

const Layout = () => (
  <div className="h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans overflow-hidden relative transition-colors duration-300">
    <Navigation />
    {/* Main Scrollable Content Area */}
    <div className="h-full overflow-y-auto md:ml-20 scroll-smooth">
        <Outlet />
    </div>
  </div>
);

const AppContent = () => (
  <Router>
    <Routes>
      {/* Routes with Navigation Bar */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/playback" element={<Playback />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/family" element={<FamilyMembers />} />
        <Route path="/privacy" element={<Privacy />} />
      </Route>
      
      {/* Fullscreen Routes (No Nav) */}
      <Route path="/live/:id" element={<LiveView />} />
    </Routes>
  </Router>
);

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;
