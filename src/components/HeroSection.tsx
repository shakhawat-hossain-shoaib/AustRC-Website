import { motion } from "motion/react";
import { useState, useEffect } from "react";

export function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black w-full max-w-full">

      {/* Background (unchanged) */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
      </div>

      <div className="container mx-auto px-4 py-24 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Smaller Top Text */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-white">
              Welcome to
            </h2>

            {/* Main Gradient Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] via-[#3DED97] to-[#27AE60]">
              AUST Robotics Club
            </h1>

            <motion.div
              className="w-40 h-1 bg-gradient-to-r from-[#2ECC71] via-[#3DED97] to-[#27AE60] rounded-full mx-auto"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            />

            {/* Updated Description */}
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed pt-4">
              Join a community of innovators mastering quadcopters, AI, and next-gen robotics.
            </p>

          </motion.div>

        </div>
      </div>
    </section>
  );
}