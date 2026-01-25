import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { HeroSection } from './HeroSection';
import { EventsSection } from './EventsSection';
import { EducationalProgramsSection } from './EducationalProgramsSection';
import { ResearchProjectsHomepageSection } from './ResearchProjectsHomepageSection';
import { TestimonialsSection } from './TestimonialsSection';
import { CollaborationsSection } from './CollaborationsSection';
import { SponsorsSection } from './SponsorsSection';

// Animated background particles - reduced for mobile performance
function AnimatedBackground() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);
  
  // Reduce particles on mobile (3) vs desktop (8)
  const particleCount = isMobile ? 3 : 8;
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#2ECC71] rounded-full opacity-10"
          style={{ 
            left: `${(i * 100) / particleCount}%`,
            top: `${(i * 50) % 100}%`,
            transform: 'translateZ(0)' 
          }}
          animate={{
            y: [0, 30, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Section divider with animation
function AnimatedDivider() {
  return (
    <motion.div
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="h-px bg-gradient-to-r from-transparent via-[#2ECC71]/40 to-transparent my-20"
    />
  );
}

// Scroll progress indicator
function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setScrollProgress((scrolled / scrollHeight) * 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] origin-left z-50"
      style={{ scaleX: scrollProgress / 100 }}
    />
  );
}

export function HomePage() {
  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden w-full max-w-[100vw]">
      <AnimatedBackground />
      <ScrollProgress />
      
      {/* Hero Section with enhanced entrance animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeroSection />
      </motion.div>

      <AnimatedDivider />

      {/* Events Section with stagger animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <EventsSection />
      </motion.div>

      <AnimatedDivider />

      {/* Educational Programs with slide animation */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <EducationalProgramsSection />
      </motion.div>

      <AnimatedDivider />

      {/* Research Projects with scale animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <ResearchProjectsHomepageSection />
      </motion.div>

      <AnimatedDivider />

      {/* Testimonials with slide animation */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <TestimonialsSection />
      </motion.div>

      <AnimatedDivider />

      {/* Collaborations with fade animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <CollaborationsSection />
      </motion.div>

      <AnimatedDivider />

      {/* Sponsors with fade animation */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <SponsorsSection />
      </motion.div>

      {/* Glow effect - hidden on mobile for performance */}
      <div className="hidden lg:block fixed bottom-10 right-10 w-32 h-32 bg-[#2ECC71]/20 rounded-full blur-3xl pointer-events-none z-0" />
    </main>
  );
}