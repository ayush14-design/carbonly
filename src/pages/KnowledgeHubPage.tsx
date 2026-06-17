import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, ThermometerSun, Wind, BatteryCharging, Globe, Target } from 'lucide-react';

const articles = [
  {
    title: "Understanding Global Warming",
    category: "Science",
    icon: <ThermometerSun size={24} />,
    color: "text-red-400",
    excerpt: "Learn how human activities are artificially increasing the Earth's average temperature, and what the 1.5°C threshold actually means for our future."
  },
  {
    title: "The Greenhouse Effect",
    category: "Science",
    icon: <Globe size={24} />,
    color: "text-blue-400",
    excerpt: "A deep dive into how CO₂, methane, and nitrous oxide trap heat in our atmosphere, and the difference between natural and anthropogenic emissions."
  },
  {
    title: "Transitioning to Renewable Energy",
    category: "Solutions",
    icon: <Wind size={24} />,
    color: "text-teal-400",
    excerpt: "Explore the rapid advancements in solar, wind, and geothermal technologies that are paving the way away from fossil fuels."
  },
  {
    title: "What is Net-Zero?",
    category: "Policy",
    icon: <Target size={24} />,
    color: "text-purple-400",
    excerpt: "Net-zero means cutting greenhouse gas emissions to as close to zero as possible, with any remaining emissions re-absorbed from the atmosphere."
  },
  {
    title: "Sustainable Living Guide",
    category: "Action",
    icon: <BatteryCharging size={24} />,
    color: "text-green-400",
    excerpt: "Practical, everyday changes you can make in your home, diet, and transportation habits to drastically reduce your personal carbon footprint."
  }
];

export default function KnowledgeHubPage() {
  return (
    <div className="min-h-screen w-full pt-32 pb-24 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: "'Instrument Serif', serif" }} 
            className="text-5xl sm:text-7xl font-medium text-white mb-6"
          >
            Climate Knowledge Hub
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Education is the first step toward action. Explore our curated library of articles to understand the science of climate change and how we can stop it.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-[32px] border border-white/10 glass-hover cursor-pointer group flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl glass flex items-center justify-center ${article.color}`}>
                  {article.icon}
                </div>
                <span className="text-xs font-semibold tracking-widest uppercase text-white/50 border border-white/10 px-3 py-1 rounded-full">
                  {article.category}
                </span>
              </div>
              
              <h3 className="text-2xl font-semibold text-white mb-4 group-hover:text-blue-200 transition-colors">
                {article.title}
              </h3>
              
              <p className="text-white/70 leading-relaxed mb-8 flex-1">
                {article.excerpt}
              </p>
              
              <div className="flex items-center gap-2 text-sm font-medium text-white/90 group-hover:text-white transition-colors mt-auto pt-6 border-t border-white/10">
                <BookOpen size={16} /> Read Article
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
