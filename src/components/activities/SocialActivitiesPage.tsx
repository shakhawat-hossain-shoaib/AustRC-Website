import { motion } from 'motion/react';

export function SocialActivitiesPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#2ECC71] text-sm font-medium tracking-wider uppercase mb-2 block">Community & Fun</span>
          <h1 className="text-5xl font-bold mb-6">Social Activities</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Beyond robotics, we build bonds through networking, cultural nights, and team building.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-6">
             <div className="bg-[#0a1810] border border-[#2ECC71]/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-[#2ECC71] mb-2">Monthly Club Meetup</h3>
                <p className="text-gray-400 text-sm">Casual gathering for members to network and share ideas.</p>
             </div>
             <div className="bg-[#0a1810] border border-[#2ECC71]/20 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-[#2ECC71] mb-2">Annual Picnic</h3>
                <p className="text-gray-400 text-sm">A day out for relaxation and team bonding.</p>
             </div>
        </div>
      </div>
    </div>
  );
}