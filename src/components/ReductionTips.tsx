import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Compass, Utensils, ShoppingBag, Smartphone, Lightbulb, Car, Leaf, Recycle, Plug } from 'lucide-react';

const categories = [
  { id: 'home', label: 'Home', icon: <Home size={20} /> },
  { id: 'travel', label: 'Travel', icon: <Compass size={20} /> },
  { id: 'food', label: 'Food', icon: <Utensils size={20} /> },
  { id: 'shopping', label: 'Shopping', icon: <ShoppingBag size={20} /> },
  { id: 'technology', label: 'Technology', icon: <Smartphone size={20} /> },
];

const tipsData: Record<string, { title: string, icon: any, desc: string }[]> = {
  home: [
    { title: 'Switch to LED bulbs', icon: <Lightbulb />, desc: 'LEDs use up to 90% less energy and last 25 times longer than traditional incandescent bulbs.' },
    { title: 'Use renewable energy', icon: <Plug />, desc: 'Switch your electricity provider to one that sources 100% renewable energy like wind or solar.' },
    { title: 'Smart thermostats', icon: <Home />, desc: 'Automate your heating and cooling to significantly reduce wasted energy while you sleep or are away.' }
  ],
  travel: [
    { title: 'Use public transport', icon: <Car />, desc: 'Trains and buses drastically reduce the per-passenger carbon emissions compared to driving alone.' },
    { title: 'Combine errands', icon: <Compass />, desc: 'Planning your trips reduces total mileage and prevents cold engine starts which emit more pollution.' }
  ],
  food: [
    { title: 'Eat more plant-based meals', icon: <Leaf />, desc: 'Meat, especially beef, requires massive amounts of land, water, and feed, producing significant methane.' },
    { title: 'Reduce food waste', icon: <Recycle />, desc: 'Food rotting in landfills releases methane. Only buy what you need and compost the scraps.' }
  ],
  shopping: [
    { title: 'Buy second-hand', icon: <ShoppingBag />, desc: 'Extending the life of clothes and electronics cuts down on the massive emissions of manufacturing.' },
    { title: 'Bring reusable bags', icon: <Recycle />, desc: 'Cut down on single-use plastics which are manufactured from fossil fuels.' }
  ],
  technology: [
    { title: 'Unplug idle devices', icon: <Plug />, desc: 'Phantom power from chargers and appliances plugged in but turned off accounts for 10% of home energy.' },
    { title: 'Keep devices longer', icon: <Smartphone />, desc: '80% of a smartphone\'s carbon footprint is generated during manufacturing. Use them for an extra year.' }
  ]
};

export default function ReductionTips() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <section id="reduction-tips" className="py-24 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: "'Instrument Serif', serif" }} 
            className="text-4xl sm:text-5xl font-medium text-white mb-4"
          >
            Tips to Reduce Your Footprint
          </motion.h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Small, consistent actions across different areas of your life compound into massive positive environmental change.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`glass px-6 py-3 flex items-center gap-2 rounded-full font-medium transition-all duration-300 ${activeTab === cat.id ? 'bg-white/20 border-white/50 text-white' : 'text-white/60 hover:text-white'}`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {tipsData[activeTab].map((tip, idx) => (
                <div key={idx} className="glass p-8 flex flex-col gap-4 glass-hover cursor-default">
                  <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-white">
                    {tip.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white">{tip.title}</h3>
                  <p className="text-white/70 leading-relaxed text-sm">
                    {tip.desc}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
