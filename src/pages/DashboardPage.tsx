import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Target, Award, Leaf, Bus, Zap, Plus, CheckCircle2 } from 'lucide-react';
import { Navigate } from 'react-router-dom';

const ACTION_DATABASE = [
  { id: 'vegan_meal', label: 'Ate a Plant-Based Meal', impact: 2, icon: <Leaf size={16} />, badge: 'eco_eater' },
  { id: 'public_transit', label: 'Took Public Transit', impact: 3, icon: <Bus size={16} />, badge: 'transit_hero' },
  { id: 'renewable_energy', label: 'Switched to Renewables', impact: 15, icon: <Zap size={16} />, badge: 'energy_saver' }
];

const AVAILABLE_BADGES = [
  { id: 'eco_eater', name: 'Eco Eater', desc: 'Logged a plant-based meal' },
  { id: 'transit_hero', name: 'Transit Hero', desc: 'Used public transportation' },
  { id: 'energy_saver', name: 'Energy Saver', desc: 'Switched to green energy' },
  { id: 'goal_crusher', name: 'Goal Crusher', desc: 'Hit a monthly reduction goal' }
];

export default function DashboardPage() {
  const { user, isAuthenticated, setGoal, logAction, unlockBadge } = useAuth();
  const [goalInput, setGoalInput] = useState('');
  const [showLogModal, setShowLogModal] = useState(false);
  const [recentAction, setRecentAction] = useState<string | null>(null);

  if (!isAuthenticated || !user) {
    return <Navigate to="/auth" />;
  }

  const baseline = user.baseline || 0;
  const goal = user.goal || 0;
  const progress = user.progress || 0;
  
  // Calculate remaining tons to hit goal
  const progressPercent = goal > 0 ? Math.min(100, (progress / goal) * 100) : 0;

  const handleSetGoal = () => {
    if (goalInput && !isNaN(Number(goalInput))) {
      setGoal(Number(goalInput));
      setGoalInput('');
    }
  };

  const handleLogAction = (_actionId: string, impact: number, badgeId: string) => {
    logAction(impact);
    unlockBadge(badgeId);
    setRecentAction(`Logged: saved ${impact}kg CO₂e!`);
    setShowLogModal(false);
    
    if (progress + impact >= goal && goal > 0) {
      unlockBadge('goal_crusher');
    }

    setTimeout(() => setRecentAction(null), 3000);
  };

  return (
    <div className="min-h-screen w-full pt-32 pb-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        
        <div className="mb-12 flex justify-between items-end">
          <div>
            <h1 className="text-4xl sm:text-6xl font-medium text-white mb-2" style={{ fontFamily: "'Instrument Serif', serif" }}>
              Welcome back, {user.name}
            </h1>
            <p className="text-white/70">Here is your personal impact dashboard.</p>
          </div>
          <button 
            onClick={() => setShowLogModal(true)}
            className="glass bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-medium flex items-center gap-2 transition-all"
          >
            <Plus size={18} /> Log Action
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Progress Card */}
          <div className="md:col-span-2 glass p-8 rounded-[32px] border border-white/20 relative overflow-hidden">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Target size={20} className="text-blue-400" /> Monthly Reduction Goal
            </h2>
            
            {goal > 0 ? (
              <div className="mb-8">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <div className="text-5xl font-bold text-white mb-1" style={{ fontFamily: "'Instrument Serif', serif" }}>
                      {progress} <span className="text-xl text-white/50 font-sans">/ {goal} kg</span>
                    </div>
                    <p className="text-white/60 text-sm">Reduced this month</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-400">{progressPercent.toFixed(0)}%</div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full h-4 glass rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-400 to-green-400"
                  />
                </div>
              </div>
            ) : (
              <div className="glass p-6 rounded-2xl flex items-center gap-4">
                <input 
                  type="number" 
                  placeholder="Target kg to reduce..."
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  className="flex-1 glass bg-white/5 py-3 px-4 rounded-xl text-white placeholder:text-white/40 outline-none focus:ring-2 focus:ring-white/30"
                />
                <button 
                  onClick={handleSetGoal}
                  className="glass bg-white/10 px-6 py-3 rounded-xl font-medium text-white hover:bg-white/20"
                >
                  Set Goal
                </button>
              </div>
            )}

            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="text-sm text-white/60 uppercase tracking-widest mb-2">Saved Baseline</div>
              <div className="text-2xl text-white font-mono">{baseline ? `${baseline.toFixed(1)} Tons/yr` : 'No baseline saved. Use the Calculator!'}</div>
            </div>
          </div>

          {/* Badges Cabinet */}
          <div className="glass p-8 rounded-[32px] border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
              <Award size={20} className="text-yellow-400" /> Achievements
            </h2>
            
            <div className="flex flex-col gap-4">
              {AVAILABLE_BADGES.map((badge) => {
                const isUnlocked = user.badges.includes(badge.id);
                return (
                  <div key={badge.id} className={`p-4 rounded-2xl border flex items-center gap-4 transition-all ${isUnlocked ? 'glass border-yellow-400/30' : 'border-white/5 opacity-50 grayscale'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isUnlocked ? 'bg-yellow-400/20 text-yellow-400' : 'bg-white/10 text-white/50'}`}>
                      <Award size={20} />
                    </div>
                    <div>
                      <h3 className={`font-semibold ${isUnlocked ? 'text-white' : 'text-white/70'}`}>{badge.name}</h3>
                      <p className="text-xs text-white/50">{badge.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Floating Success Toast */}
        <AnimatePresence>
          {recentAction && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-10 left-1/2 -translate-x-1/2 glass border border-green-400/50 px-6 py-3 rounded-full flex items-center gap-3 z-50"
            >
              <CheckCircle2 size={20} className="text-green-400" />
              <span className="text-white font-medium">{recentAction}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Log Action Modal Overlay */}
        <AnimatePresence>
          {showLogModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setShowLogModal(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                className="glass p-8 rounded-[32px] w-full max-w-md relative z-10 border border-white/20"
              >
                <h2 className="text-2xl font-semibold text-white mb-6">Log an Action</h2>
                <div className="flex flex-col gap-4">
                  {ACTION_DATABASE.map(action => (
                    <button
                      key={action.id}
                      onClick={() => handleLogAction(action.id, action.impact, action.badge)}
                      className="glass bg-white/5 hover:bg-white/10 p-4 rounded-xl flex items-center justify-between text-left transition-all"
                    >
                      <div className="flex items-center gap-3 text-white">
                        <div className="w-10 h-10 rounded-full glass flex items-center justify-center">
                          {action.icon}
                        </div>
                        <span className="font-medium">{action.label}</span>
                      </div>
                      <span className="text-green-400 font-mono font-bold">-{action.impact}kg</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
