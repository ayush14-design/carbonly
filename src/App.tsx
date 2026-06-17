import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe } from 'lucide-react';
import Hls from 'hls.js';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

import OnboardingWizard from './components/OnboardingWizard';
import CarbonCalculator from './components/CarbonCalculator';
import SourcesOfEmissions from './components/SourcesOfEmissions';
import ReductionTips from './components/ReductionTips';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import ComparisonPage from './pages/ComparisonPage';
import DataDashboardPage from './pages/DataDashboardPage';
import DashboardPage from './pages/DashboardPage';
import KnowledgeHubPage from './pages/KnowledgeHubPage';
import { AuthProvider, useAuth } from './context/AuthContext';

function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const src = "https://stream.mux.com/kimF2ha9zLrX64H00UgLGPflCzNtl1T0215MlAmeOztv8.m3u8";

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    } else if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    }
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-100 grayscale"
      />
    </div>
  );
}

function Navbar({ onStart }: { onStart: () => void }) {
  const { user, logout, isAuthenticated } = useAuth();
  
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="relative z-20 px-6 py-6 w-full"
    >
      <div className="glass rounded-full px-6 py-3 flex items-center justify-between max-w-5xl mx-auto">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <Globe className="w-6 h-6 text-white" />
            <span className="text-white font-semibold text-lg">Carbonly</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-white/80 text-sm font-medium">
            <Link to="/calculator" className="hover:text-white transition-colors duration-300">Calculator</Link>
            <Link to="/compare" className="hover:text-white transition-colors duration-300">Compare</Link>
            <Link to="/global-data" className="hover:text-white transition-colors duration-300">Data</Link>
            <Link to="/knowledge" className="hover:text-white transition-colors duration-300">Learn</Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard" className="flex items-center gap-2 hover:bg-white/10 p-2 rounded-full transition-colors">
                <div className="w-8 h-8 rounded-full glass flex items-center justify-center text-white font-bold text-sm">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-white/90 text-sm hidden sm:block">{user?.name}</span>
              </Link>
              <button 
                onClick={logout}
                className="text-white/60 hover:text-white transition-colors text-sm font-medium cursor-pointer bg-transparent border-none"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <>
              <Link 
                to="/auth"
                className="text-white hover:text-white/80 transition-colors text-sm font-medium cursor-pointer"
              >
                Sign In
              </Link>
              <button 
                onClick={onStart}
                className="glass px-6 py-2 text-sm font-medium"
              >
                Start For Free
              </button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const navigate = useNavigate();

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    navigate('/calculator');
  };

  return (
    <AuthProvider>
      <main className="relative bg-black min-h-screen w-screen flex flex-col selection:bg-white selection:text-black">
        <BackgroundVideo />
        
        {/* Scrollable Content Wrapper */}
        <div className="relative z-10 flex flex-col min-h-screen w-full">
          <Navbar onStart={() => setShowOnboarding(true)} />
          
          {/* Router Outlet */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<LandingPage onStart={() => setShowOnboarding(true)} />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/calculator" element={<CarbonCalculator />} />
                <Route path="/sources" element={<SourcesOfEmissions />} />
                <Route path="/tips" element={<ReductionTips />} />
                <Route path="/compare" element={<ComparisonPage />} />
                <Route path="/global-data" element={<DataDashboardPage />} />
                <Route path="/knowledge" element={<KnowledgeHubPage />} />
              </Routes>
            </AnimatePresence>
          </div>
        </div>

        {/* Overlays */}
        {showOnboarding && <OnboardingWizard onClose={() => setShowOnboarding(false)} onComplete={handleOnboardingComplete} />}
      </main>
    </AuthProvider>
  );
}
