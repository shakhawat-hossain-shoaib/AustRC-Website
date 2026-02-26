import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { HeroSection } from "./HeroSection";
import { EventsSection } from "./EventsSection";
import { EducationalProgramsSection } from "./EducationalProgramsSection";
import { ResearchProjectsHomepageSection } from "./ResearchProjectsHomepageSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { CollaborationsSection } from "./CollaborationsSection";
import { SponsorsSection } from "./SponsorsSection";

// Animated background particles
import {NoticesBoardHomepageSection} from "./NoticesBoardHomePageSection";
// Animated background particles - reduced for mobile performance
function AnimatedBackground() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const particleCount = isMobile ? 3 : 8;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-[#2ECC71] rounded-full opacity-10"
          style={{
            left: `${(i * 100) / particleCount}%`,
            top: `${(i * 50) % 100}%`,
            transform: "translateZ(0)",
          }}
          animate={{
            y: [0, 30, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// Section divider
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

// Scroll progress
function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      setScrollProgress(scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
    <main className="relative min-h-screen bg-black w-full overflow-x-hidden">
      <AnimatedBackground />
      <ScrollProgress />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <HeroSection />
      </motion.div>
<AnimatedDivider />

<NoticesBoardHomepageSection />
      <AnimatedDivider />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <EventsSection />
      </motion.div>

      

      <AnimatedDivider />
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <EducationalProgramsSection />
      </motion.div>

      <AnimatedDivider />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <ResearchProjectsHomepageSection />
      </motion.div>

      <AnimatedDivider />

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <TestimonialsSection />
      </motion.div>

      <AnimatedDivider />

      {/* --- COLLABORATIONS SECTION WITH SOLID BUTTON --- */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center"
      >
        <CollaborationsSection />
        <Link
          to="/collaborations"
          className="mt-10 group flex items-center gap-3 px-10 py-4 bg-[#2ECC71] text-black font-black rounded-2xl hover:shadow-[0_0_30px_rgba(46,204,113,0.4)] transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-widest text-sm"
        >
          <span>Explore All Collaborations</span>
          <ArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </motion.div>

      <AnimatedDivider />

      {/* --- SPONSORS SECTION WITH SOLID BUTTON --- */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col items-center pb-20"
      >
        <SponsorsSection />
        <Link
          to="/sponsors"
          className="mt-10 group flex items-center gap-3 px-10 py-4 bg-[#2ECC71] text-black font-black rounded-2xl hover:shadow-[0_0_30px_rgba(46,204,113,0.4)] transition-all duration-300 transform hover:-translate-y-1 uppercase tracking-widest text-sm"
        >
          <span>Meet Our Full Sponsor Network</span>
          <ArrowRight
            size={20}
            className="group-hover:translate-x-1 transition-transform"
          />
        </Link>
      </motion.div>

      <div className="hidden lg:block fixed bottom-10 right-10 w-32 h-32 bg-[#2ECC71]/20 rounded-full blur-3xl pointer-events-none z-0" />
    </main>
  );
}
