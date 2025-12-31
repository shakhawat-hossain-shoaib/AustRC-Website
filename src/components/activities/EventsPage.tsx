import { motion } from 'motion/react';

export function EventsPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[#2ECC71] text-sm font-medium tracking-wider uppercase mb-2 block">Mark Your Calendar</span>
          <h1 className="text-5xl font-bold mb-6">Upcoming & Past Events</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore the dynamic events organized by AUSTRC, ranging from tech talks to national competitions.
          </p>
        </motion.div>
        
        {/* Placeholder Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-[#0a1810] border border-[#2ECC71]/20 rounded-2xl p-6 hover:border-[#2ECC71]/50 transition-all">
              <div className="h-48 bg-gray-900 rounded-xl mb-4 flex items-center justify-center text-gray-600">Event Image Placeholder</div>
              <h3 className="text-xl font-bold text-[#2ECC71] mb-2">Robot Exhibition Day</h3>
              <p className="text-gray-400 text-sm">Join us for a showcase of student projects and research.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}