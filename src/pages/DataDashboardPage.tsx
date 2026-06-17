
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const trendsData = [
  { year: '1990', emissions: 22.6 },
  { year: '2000', emissions: 25.5 },
  { year: '2010', emissions: 33.1 },
  { year: '2020', emissions: 34.8 },
  { year: '2025', emissions: 36.8 }, // Projected/Current
];

const countryData = [
  { name: 'China', emissions: 11.4 },
  { name: 'USA', emissions: 5.0 },
  { name: 'India', emissions: 2.7 },
  { name: 'Russia', emissions: 1.7 },
  { name: 'Japan', emissions: 1.0 },
];

const sectorData = [
  { name: 'Electricity & Heat', value: 30, color: '#facc15' }, // Yellow-400
  { name: 'Agriculture', value: 24, color: '#4ade80' },       // Green-400
  { name: 'Industry', value: 21, color: '#c084fc' },          // Purple-400
  { name: 'Transportation', value: 15, color: '#60a5fa' },    // Blue-400
  { name: 'Waste', value: 10, color: '#fb923c' },             // Orange-400
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-4 rounded-xl border border-white/20">
        <p className="text-white font-semibold mb-1">{label}</p>
        <p className="text-white/80 font-mono">
          {payload[0].value} {payload[0].name === 'emissions' || payload[0].payload.name ? 'Billion Tons' : '%'}
        </p>
      </div>
    );
  }
  return null;
};

export default function DataDashboardPage() {
  return (
    <div className="min-h-screen w-full pt-32 pb-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontFamily: "'Instrument Serif', serif" }} 
            className="text-5xl sm:text-7xl font-medium text-white mb-6"
          >
            Global Emissions Dashboard
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Visualize the macroscopic data driving climate change.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Trends Over Time */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-[32px] border border-white/10 lg:col-span-2"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Emissions Trends Over Time</h2>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="year" stroke="rgba(255,255,255,0.5)" tickLine={false} dy={10} />
                  <YAxis stroke="rgba(255,255,255,0.5)" tickLine={false} dx={-10} tickFormatter={(val) => `${val}B`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="emissions" stroke="#ef4444" strokeWidth={4} dot={{ fill: '#ef4444', strokeWidth: 2, r: 6 }} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Top Emitters */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-[32px] border border-white/10"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Top Emitters by Country</h2>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={countryData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <XAxis type="number" stroke="rgba(255,255,255,0.5)" tickLine={false} />
                  <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.8)" tickLine={false} dx={-10} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                  <Bar dataKey="emissions" fill="#60a5fa" radius={[0, 8, 8, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Sector Pie Chart */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass p-8 rounded-[32px] border border-white/10"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">Emissions by Sector</h2>
            <div className="h-[300px] w-full flex items-center justify-center relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sectorData}
                    innerRadius={80}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {sectorData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend verticalAlign="bottom" height={36} wrapperStyle={{ opacity: 0.8 }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
