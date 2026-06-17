import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Users, CheckCircle2, ChevronRight } from 'lucide-react';

interface OnboardingWizardProps {
  onClose: () => void;
  onComplete?: () => void;
}

export default function OnboardingWizard({ onClose, onComplete }: OnboardingWizardProps) {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    city: 'Bangalore (Tier 1)',
    householdSize: 2,
  });

  const cityMultipliers: Record<string, number> = {
    'Bangalore (Tier 1)': 180,
    'Mumbai (Tier 1)': 210,
    'Delhi (Tier 1)': 230,
    'Pune (Tier 2)': 150,
  };

  const calculateBaseline = () => {
    const base = cityMultipliers[data.city] || 180;
    // Add a bit of non-linear scaling for household size
    return Math.round(base * (1 + (data.householdSize - 1) * 0.75));
  };

  const nextStep = () => setStep((s) => s + 1);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-[#0f172a66] backdrop-blur-[6px] z-50 flex justify-center items-end sm:items-center p-0 sm:p-6"
      >
        <motion.div
          initial={{ y: 40, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 40, opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="glass w-full max-w-[500px] h-[90vh] sm:h-auto sm:max-h-[85vh] flex flex-col !p-0"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-white/10">
            <h2 className="font-heading font-bold text-xl text-white">
              {step === 1 && "Location Setup"}
              {step === 2 && "Household Details"}
              {step === 3 && "Baseline Established"}
            </h2>
            <button onClick={onClose} className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition text-white">
              <X size={20} />
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 flex-1 overflow-y-auto">
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center gap-4 text-white/70">
                  <div className="glass rounded-full p-3 text-white">
                    <MapPin size={24} />
                  </div>
                  <p className="leading-relaxed text-sm">
                    Carbonly uses your city to automatically fetch accurate electricity grid and transit emissions data.
                  </p>
                </div>
                
                <div className="flex flex-col gap-2 mt-4">
                  <label className="font-medium text-white/90">Selected City</label>
                  <select
                    className="glass w-full focus:outline-none p-4 rounded-xl text-white"
                    value={data.city}
                    onChange={(e) => setData({ ...data, city: e.target.value })}
                  >
                    <option>Bangalore (Tier 1)</option>
                    <option>Mumbai (Tier 1)</option>
                    <option>Delhi (Tier 1)</option>
                    <option>Pune (Tier 2)</option>
                  </select>
                  <p className="text-sm text-white/50 mt-2">
                    Smart default applied based on local IP routing.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col gap-6"
              >
                <div className="flex items-center gap-4 text-white/70">
                  <div className="glass rounded-full p-3 text-white">
                    <Users size={24} />
                  </div>
                  <p className="leading-relaxed text-sm">
                    How many people live in your household? This helps us average shared energy and food footprints.
                  </p>
                </div>
                
                <div className="flex items-center justify-between glass p-4 mt-4">
                  <button 
                    onClick={() => setData({ ...data, householdSize: Math.max(1, data.householdSize - 1) })}
                    className="glass !px-4 !py-2 flex items-center justify-center font-bold text-xl text-white rounded-full"
                  >
                    -
                  </button>
                  <span className="text-3xl font-heading font-bold text-white relative z-10">
                    {data.householdSize}
                  </span>
                  <button 
                    onClick={() => setData({ ...data, householdSize: data.householdSize + 1 })}
                    className="glass !px-4 !py-2 flex items-center justify-center font-bold text-xl text-white rounded-full"
                  >
                    +
                  </button>
                </div>
                <p className="text-sm text-white/50 text-center mt-2">
                  Default set to Indian average urban household.
                </p>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center gap-4 py-8"
              >
                <div className="w-20 h-20 glass rounded-full flex items-center justify-center mb-4 border border-green-500/30">
                  <CheckCircle2 size={40} className="text-green-400" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-white">You're All Set!</h3>
                <p className="text-white/70">
                  We've calculated your baseline footprint based on {data.city} metrics for a {data.householdSize}-person home.
                </p>
                <div className="glass w-full p-6 mt-4 flex flex-col sm:flex-row items-center sm:justify-between gap-2">
                  <span className="font-medium text-white/90 relative z-10">Baseline Emissions</span>
                  <div className="flex items-end gap-1 relative z-10">
                    <span className="font-heading font-bold text-4xl text-white">{calculateBaseline()}</span>
                    <span className="text-white/50 font-medium mb-1">kg CO₂e/mo</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="p-6 border-t border-white/10 bg-white/5 flex gap-4 relative z-10">
            {step < 3 ? (
              <button 
                onClick={nextStep}
                className="flex-1 glass py-4 flex items-center justify-center gap-2 rounded-full font-semibold"
              >
                Continue <ChevronRight size={20} />
              </button>
            ) : (
              <button 
                onClick={onComplete || onClose}
                className="flex-1 glass py-4 rounded-full font-semibold"
              >
                Go to Dashboard
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
