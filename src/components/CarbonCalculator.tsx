import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Zap, Car, Plane, Utensils, Trash2, Leaf, AlertTriangle, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { calculateCarbonFootprint } from '../utils/carbonMath';

export default function CarbonCalculator() {
  const [electricity, setElectricity] = useState(300);
  const [vehicleKm, setVehicleKm] = useState(100);
  const [flights, setFlights] = useState(1);
  const [diet, setDiet] = useState('Mixed');
  const [waste, setWaste] = useState('Occasional');
  const [saved, setSaved] = useState(false);

  const { isAuthenticated, saveBaseline } = useAuth();

  const { total, breakdown, suggestion, safetyStatus } = useMemo(() => {
    return calculateCarbonFootprint(electricity, vehicleKm, flights, diet, waste);
  }, [electricity, vehicleKm, flights, diet, waste]);

  return (
    <section id="calculator" className="py-24 relative z-10">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: "'Instrument Serif', serif" }} 
            className="text-4xl sm:text-6xl font-medium text-white mb-4"
          >
            Carbon Footprint Calculator
          </motion.h2>
          <p className="text-white/70 text-lg">Fine-tune the variables below to see your real-time impact.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Controls Panel */}
          <div className="w-full lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Electricity */}
            <div className="glass p-6 rounded-[24px]">
              <div className="flex items-center gap-3 mb-4 text-white">
                <Zap size={20} className="text-yellow-400" />
                <h3 className="font-medium text-lg">Electricity</h3>
              </div>
              <p className="text-white/50 text-sm mb-4">Monthly usage (kWh)</p>
              <input 
                id="electricity-input"
                aria-label="Electricity usage in kWh"
                type="range" min="50" max="1500" step="10" 
                value={electricity} onChange={e => setElectricity(Number(e.target.value))}
                className="w-full accent-white"
              />
              <div className="text-right text-white font-bold font-mono mt-2">{electricity} kWh</div>
            </div>

            {/* Vehicle */}
            <div className="glass p-6 rounded-[24px]">
              <div className="flex items-center gap-3 mb-4 text-white">
                <Car size={20} className="text-blue-400" />
                <h3 className="font-medium text-lg">Driving</h3>
              </div>
              <p className="text-white/50 text-sm mb-4">Weekly travel (km)</p>
              <input 
                id="vehicle-input"
                aria-label="Driving distance in kilometers"
                type="range" min="0" max="1000" step="10" 
                value={vehicleKm} onChange={e => setVehicleKm(Number(e.target.value))}
                className="w-full accent-white"
              />
              <div className="text-right text-white font-bold font-mono mt-2">{vehicleKm} km</div>
            </div>

            {/* Flights */}
            <div className="glass p-6 rounded-[24px]">
              <div className="flex items-center gap-3 mb-4 text-white">
                <Plane size={20} className="text-sky-400" />
                <h3 className="font-medium text-lg">Flights</h3>
              </div>
              <p className="text-white/50 text-sm mb-4">Short-haul flights per year</p>
              <div className="flex items-center justify-between glass p-2 rounded-xl">
                <button aria-label="Decrease flights" onClick={() => setFlights(Math.max(0, flights - 1))} className="glass w-10 h-10 flex items-center justify-center font-bold text-white rounded-lg">-</button>
                <span className="font-mono text-xl font-bold text-white" aria-live="polite">{flights}</span>
                <button aria-label="Increase flights" onClick={() => setFlights(flights + 1)} className="glass w-10 h-10 flex items-center justify-center font-bold text-white rounded-lg">+</button>
              </div>
            </div>

            {/* Diet */}
            <div className="glass p-6 rounded-[24px]">
              <div className="flex items-center gap-3 mb-4 text-white">
                <Utensils size={20} className="text-green-400" />
                <h3 className="font-medium text-lg">Diet</h3>
              </div>
              <p className="text-white/50 text-sm mb-4">Primary dietary habit</p>
              <select 
                id="diet-input"
                aria-label="Primary dietary habit"
                value={diet} onChange={e => setDiet(e.target.value)}
                className="glass w-full p-4 rounded-xl text-white outline-none"
              >
                <option value="Vegan" className="text-black">Vegan</option>
                <option value="Vegetarian" className="text-black">Vegetarian</option>
                <option value="Mixed" className="text-black">Mixed (Average)</option>
                <option value="Meat-heavy" className="text-black">Meat-heavy</option>
              </select>
            </div>

            {/* Waste */}
            <div className="glass p-6 rounded-[24px] md:col-span-2">
              <div className="flex items-center gap-3 mb-4 text-white">
                <Trash2 size={20} className="text-orange-400" />
                <h3 className="font-medium text-lg">Recycling Habits</h3>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {['Rarely', 'Occasional', 'Frequent'].map((opt) => (
                  <button
                    key={opt}
                    onClick={() => setWaste(opt)}
                    className={`glass py-3 rounded-xl font-medium transition-all ${waste === opt ? 'border-2 border-white text-white' : 'text-white/60 hover:text-white border-2 border-transparent'}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Dashboard */}
          <div className="w-full lg:w-2/5 sticky top-24">
            <motion.div 
              className="glass p-8 rounded-[32px] border border-white/20 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Leaf size={120} />
              </div>
              
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-white/70 font-medium tracking-widest uppercase text-xs mb-2">Estimated Annual Footprint</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-7xl font-bold tracking-tighter text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>
                      {total.toFixed(1)}
                    </span>
                    <span className="text-white/60 font-medium">Tons CO₂e</span>
                  </div>
                </div>
                
                {/* Safety Status Badge */}
                <div className="flex flex-col items-end gap-2">
                  <div className={`px-4 py-2 rounded-full border text-sm font-semibold ${safetyStatus.color}`}>
                    {safetyStatus.label}
                  </div>
                  {isAuthenticated && (
                    <button 
                      onClick={() => { saveBaseline(total); setSaved(true); setTimeout(() => setSaved(false), 3000); }}
                      className="flex items-center gap-2 text-sm text-white/80 hover:text-white glass px-4 py-2 rounded-full transition-all"
                    >
                      <Save size={14} /> {saved ? 'Saved!' : 'Save Baseline'}
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Bar Visualizer */}
              <div className="w-full h-4 glass rounded-full overflow-hidden flex mb-8">
                {breakdown.map((item) => (
                  <motion.div 
                    key={item.label}
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / total) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${item.color} border-r border-black/20`}
                  />
                ))}
              </div>

              {/* Breakdown Legend */}
              <div className="flex flex-col gap-3 mb-10">
                {breakdown.map((item) => (
                  <div key={item.label} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                      <span className="text-white/80">{item.label}</span>
                    </div>
                    <span className="text-white font-mono font-bold">{item.value.toFixed(1)}t</span>
                  </div>
                ))}
              </div>

              {/* Comparison */}
              <div className="glass p-4 rounded-xl mb-6">
                <div className="flex justify-between items-center text-xs text-white/70 mb-2">
                  <span>Global Avg (4.7t)</span>
                  <span>US Avg (15t)</span>
                </div>
                <div className="w-full h-1 bg-white/10 rounded-full relative">
                  <div className="absolute top-[-4px] bottom-[-4px] w-1 bg-green-400 left-[31%]" title="Global Average"></div>
                  <div className="absolute top-[-4px] bottom-[-4px] w-1 bg-red-400 right-[0%]" title="US Average"></div>
                  <motion.div 
                    className="absolute top-[-6px] bottom-[-6px] w-3 bg-white rounded-full shadow-[0_0_10px_white]"
                    animate={{ left: `${Math.min(100, (total / 15) * 100)}%` }}
                    transition={{ type: "spring", stiffness: 100 }}
                  />
                </div>
              </div>

              {/* AI Nudge */}
              <div className="flex items-start gap-3 bg-white/5 p-4 rounded-xl border border-white/10">
                <AlertTriangle size={20} className="text-yellow-400 flex-shrink-0 mt-1" />
                <p className="text-sm text-white/90 leading-relaxed">
                  {suggestion}
                </p>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
