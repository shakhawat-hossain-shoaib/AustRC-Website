import { motion } from 'motion/react';

export function AchievementsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#2ECC71] text-sm font-medium tracking-wider uppercase mb-2 block">Hall of Excellence</span>
          <h1 className="text-5xl font-bold mb-6">Our Achievements</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Celebrating the milestones, awards, and recognition our members have brought to the club.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
           {/* Example Content */}
           <div className="bg-[#0a1810] border border-[#2ECC71]/20 rounded-2xl p-8 flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#2ECC71]/10 rounded-full flex items-center justify-center mb-4 text-[#2ECC71] text-2xl font-bold">1st</div>
              <h3 className="text-2xl font-bold text-white mb-2">National Hackathon 2024</h3>
              <p className="text-gray-400">Champion Category: IoT & Automation</p>
           </div>
        </div>
      </div>
    </div>
  );
}