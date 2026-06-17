import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Car, Bike, Plane, Train, Utensils, Leaf, ShoppingBag, Recycle } from 'lucide-react';

const comparisonData = {
  transport_local: {
    title: "Commuting (per 10km)",
    desc: "Driving a standard fossil-fuel car versus riding a bicycle.",
    icons: [<Car size={24} />, <Bike size={24} />],
    data: [
      { name: 'Car', value: 2.2, color: '#ef4444' }, // Red-400
      { name: 'Bicycle', value: 0.05, color: '#4ade80' } // Green-400
    ],
    unit: 'kg CO₂e'
  },
  transport_long: {
    title: "Long Distance (per 500km)",
    desc: "Taking a short-haul flight versus riding a high-speed electric train.",
    icons: [<Plane size={24} />, <Train size={24} />],
    data: [
      { name: 'Airplane', value: 125, color: '#ef4444' },
      { name: 'Train', value: 15, color: '#4ade80' }
    ],
    unit: 'kg CO₂e'
  },
  diet: {
    title: "Diet (Annual)",
    desc: "A heavy meat-based diet compared to a purely plant-based vegan diet.",
    icons: [<Utensils size={24} />, <Leaf size={24} />],
    data: [
      { name: 'Meat-Based', value: 3300, color: '#ef4444' },
      { name: 'Plant-Based', value: 1500, color: '#4ade80' }
    ],
    unit: 'kg CO₂e'
  },
  shopping: {
    title: "Bags (per 100 uses)",
    desc: "Using 100 single-use plastic bags versus using 1 durable reusable bag 100 times.",
    icons: [<ShoppingBag size={24} />, <Recycle size={24} />],
    data: [
      { name: 'Plastic Bags', value: 1.5, color: '#ef4444' },
      { name: 'Reusable Bag', value: 0.2, color: '#4ade80' }
    ],
    unit: 'kg CO₂e'
  }
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-4 rounded-xl border border-white/20">
        <p className="text-white font-semibold mb-1">{label}</p>
        <p className="text-white/80 font-mono">
          {payload[0].value} {payload[0].payload.unit}
        </p>
      </div>
    );
  }
  return null;
};

export default function ComparisonPage() {
  const [activeTab, setActiveTab] = useState<keyof typeof comparisonData>('transport_local');
  const activeData = comparisonData[activeTab];

  return (
    <div className="min-h-screen w-full pt-32 pb-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: "'Instrument Serif', serif" }} 
            className="text-5xl sm:text-7xl font-medium text-white mb-6"
          >
            The Power of Choice
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Compare the carbon impact of everyday decisions. The data reveals that small lifestyle shifts can result in massive environmental benefits.
          </motion.p>
        </div>

        {/* Interactive Comparison Dashboard */}
        <div className="glass p-8 md:p-12 rounded-[32px] border border-white/10 flex flex-col lg:flex-row gap-12">
          
          {/* Controls Sidebar */}
          <div className="w-full lg:w-1/3 flex flex-col gap-4">
            <h3 className="text-white/50 text-sm font-semibold tracking-widest uppercase mb-2">Scenarios</h3>
            {Object.entries(comparisonData).map(([key, data]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as keyof typeof comparisonData)}
                className={`glass p-4 rounded-2xl flex items-center gap-4 text-left transition-all duration-300 ${activeTab === key ? 'bg-white/20 border-white/50 scale-[1.02]' : 'hover:bg-white/10'}`}
              >
                <div className="flex -space-x-2 text-white">
                  {data.icons.map((icon, i) => (
                    <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center border-2 border-black/50 ${i===0 ? 'bg-red-400/20 text-red-400' : 'bg-green-400/20 text-green-400'}`}>
                      {React.cloneElement(icon as React.ReactElement<any>, { size: 16 })}
                    </div>
                  ))}
                </div>
                <span className="text-white font-medium">{data.title}</span>
              </button>
            ))}
          </div>

          {/* Visualization Area */}
          <div className="w-full lg:w-2/3 flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full"
              >
                <div className="mb-8">
                  <h2 className="text-3xl font-semibold text-white mb-3">{activeData.title}</h2>
                  <p className="text-white/70 leading-relaxed">{activeData.desc}</p>
                </div>

                <div className="flex-1 min-h-[300px] w-full bg-white/5 rounded-3xl p-6 border border-white/10 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={activeData.data.map(d => ({ ...d, unit: activeData.unit }))}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      barSize={80}
                    >
                      <XAxis 
                        dataKey="name" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 14 }}
                        dy={10}
                      />
                      <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomTooltip />} />
                      <Bar dataKey="value" radius={[12, 12, 12, 12]}>
                        {activeData.data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </div>
  );
}
