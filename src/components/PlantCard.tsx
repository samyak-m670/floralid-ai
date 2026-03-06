import { motion } from 'motion/react';
import { Droplets, Sun, Thermometer, Wind, Sprout, Info } from 'lucide-react';
import type { PlantInfo } from '../services/gemini';

interface PlantCardProps {
  info: PlantInfo;
}

export function PlantCard({ info }: PlantCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto mt-12 bg-white dark:bg-sage-900 rounded-[2.5rem] shadow-2xl shadow-sage-900/5 dark:shadow-black/20 overflow-hidden border border-sage-100 dark:border-sage-800 transition-colors duration-300"
    >
      <div className="p-8 md:p-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs font-bold uppercase tracking-[0.2em] text-sage-500 dark:text-sage-400 mb-2 block transition-colors duration-300"
            >
              {info.family}
            </motion.span>
            <h2 className="text-5xl md:text-6xl font-serif text-sage-900 dark:text-sage-50 leading-tight transition-colors duration-300">
              {info.name}
            </h2>
            <p className="text-xl italic text-sage-600 dark:text-sage-400 font-serif mt-2 transition-colors duration-300">
              {info.scientificName}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest text-sage-400 dark:text-sage-500 mb-4 flex items-center gap-2 transition-colors duration-300">
                <Info className="w-4 h-4" /> About this plant
              </h3>
              <p className="text-lg text-sage-700 dark:text-sage-300 leading-relaxed transition-colors duration-300">
                {info.description}
              </p>
            </section>

            <section className="bg-sage-50 dark:bg-sage-800/50 rounded-3xl p-8 border border-sage-100 dark:border-sage-800 transition-colors duration-300">
              <h3 className="text-sm font-bold uppercase tracking-widest text-sage-500 dark:text-sage-400 mb-6 flex items-center gap-2 transition-colors duration-300">
                <Sprout className="w-4 h-4" /> Did you know?
              </h3>
              <p className="text-sage-800 dark:text-sage-200 italic text-lg leading-relaxed transition-colors duration-300">
                "{info.funFact}"
              </p>
            </section>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-sage-400 dark:text-sage-500 mb-2 transition-colors duration-300">Care Guide</h3>
            
            <CareItem 
              icon={<Droplets className="w-5 h-5" />} 
              label="Watering" 
              value={info.careTips.watering} 
              delay={0.1}
            />
            <CareItem 
              icon={<Sun className="w-5 h-5" />} 
              label="Sunlight" 
              value={info.careTips.sunlight} 
              delay={0.2}
            />
            <CareItem 
              icon={<Sprout className="w-5 h-5" />} 
              label="Soil" 
              value={info.careTips.soil} 
              delay={0.3}
            />
            <CareItem 
              icon={<Thermometer className="w-5 h-5" />} 
              label="Temperature" 
              value={info.careTips.temperature} 
              delay={0.4}
            />
            <CareItem 
              icon={<Wind className="w-5 h-5" />} 
              label="Humidity" 
              value={info.careTips.humidity} 
              delay={0.5}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function CareItem({ icon, label, value, delay }: { icon: React.ReactNode, label: string, value: string, delay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="flex gap-4 items-start p-4 rounded-2xl hover:bg-sage-50 dark:hover:bg-sage-800/50 transition-colors group"
    >
      <div className="mt-1 w-10 h-10 rounded-xl bg-white dark:bg-sage-950 border border-sage-200 dark:border-sage-700 flex items-center justify-center text-sage-600 dark:text-sage-400 group-hover:text-sage-800 dark:group-hover:text-sage-200 group-hover:border-sage-300 dark:group-hover:border-sage-600 transition-all shadow-sm">
        {icon}
      </div>
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-sage-400 dark:text-sage-500 block mb-1 transition-colors duration-300">{label}</span>
        <p className="text-sage-800 dark:text-sage-200 text-sm leading-snug transition-colors duration-300">{value}</p>
      </div>
    </motion.div>
  );
}
