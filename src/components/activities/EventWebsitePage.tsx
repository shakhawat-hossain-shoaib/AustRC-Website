import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';

export function EventWebsitePage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-12 px-6 flex items-center justify-center">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-[#0a1810] border border-[#2ECC71]/30 p-12 rounded-3xl relative overflow-hidden"
        >
           {/* Background Glow */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#2ECC71]/20 rounded-full blur-[80px]" />
           
           <div className="relative z-10">
              <h1 className="text-5xl font-bold mb-6 text-white">Our Event Website</h1>
              <p className="text-gray-400 text-lg mb-8">
                Visit our dedicated portal for major hackathons, ticketing, and live updates.
              </p>
              
              <a 
                href="https://events.austrc.edu" // Replace with actual URL
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#2ECC71] text-black font-bold rounded-full hover:bg-white transition-all duration-300 shadow-[0_0_20px_rgba(46,204,113,0.5)]"
              >
                Visit Event Site <ExternalLink size={20} />
              </a>
           </div>
        </motion.div>
      </div>
    </div>
  );
}