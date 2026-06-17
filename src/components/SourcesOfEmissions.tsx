import { motion } from 'framer-motion';
import { Factory, Car, Zap, Utensils, Trash2 } from 'lucide-react';

const sources = [
  { name: 'Electricity & Heat', value: 30, icon: <Zap size={20} />, color: 'bg-yellow-400' },
  { name: 'Agriculture & Food', value: 24, icon: <Utensils size={20} />, color: 'bg-green-400' },
  { name: 'Industry & Mfg', value: 21, icon: <Factory size={20} />, color: 'bg-purple-400' },
  { name: 'Transportation', value: 15, icon: <Car size={20} />, color: 'bg-blue-400' },
  { name: 'Waste Management', value: 10, icon: <Trash2 size={20} />, color: 'bg-orange-400' },
];

export default function SourcesOfEmissions() {
  return (
    <section id="sources" className="py-24 relative z-10">
      <div className="max-w-5xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontFamily: "'Instrument Serif', serif" }} 
            className="text-4xl sm:text-5xl font-medium text-white mb-4"
          >
            Where Do Emissions Come From?
          </motion.h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Understanding the global breakdown of greenhouse gases helps us target the most critical areas for reduction.
          </p>
        </div>

        <div className="glass p-8 md:p-12">
          <div className="flex justify-between items-end mb-8 border-b border-white/10 pb-4">
            <h3 className="text-xl font-semibold text-white">Global Emissions by Sector</h3>
            <span className="text-white/50 text-sm font-mono">100% Total</span>
          </div>

          <div className="flex flex-col gap-8">
            {sources.map((source, index) => (
              <div key={source.name} className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                {/* Label & Icon */}
                <div className="w-full md:w-1/4 flex items-center gap-3 text-white">
                  <div className="glass w-10 h-10 rounded-full flex items-center justify-center">
                    {source.icon}
                  </div>
                  <span className="font-medium">{source.name}</span>
                </div>

                {/* Animated Bar Chart */}
                <div className="flex-1 flex items-center gap-4">
                  <div className="w-full h-4 glass rounded-full overflow-hidden relative">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${source.value}%` }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 1.2, delay: index * 0.1, ease: "easeOut" }}
                      className={`absolute top-0 bottom-0 left-0 ${source.color} opacity-80`}
                    />
                  </div>
                  <motion.span 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 + (index * 0.1) }}
                    className="w-12 text-right font-mono font-bold text-white"
                  >
                    {source.value}%
                  </motion.span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
