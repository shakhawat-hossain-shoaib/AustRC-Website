import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { ArrowRight, X, Sparkles, Users, Calendar, ExternalLink, ChevronRight } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { slugify } from '@/utils/slugify';

interface ResearchProject {
  id: string;
  Title: string;
  Cover_Picture: string;
  Introduction: string;
  Order?: number;
  Owner_1_Name?: string;
  Owner_1_Designation_Department?: string;
  Owner_2_Name?: string;
  Owner_2_Designation_Department?: string;
  Owner_3_Name?: string;
  Owner_3_Designation_Department?: string;
  Owner_4_Name?: string;
  Owner_4_Designation_Department?: string;
  [key: string]: string | number | undefined;
}

// Floating Particles Component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#2ECC71] rounded-full opacity-30"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * 600,
          }}
          animate={{
            y: [null, -100],
            opacity: [0.3, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}
    </div>
  );
};

// Animated Grid Background
const GridBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(46,204,113,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(46,204,113,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(46,204,113,0.15) 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  );
};

// Simple Card Wrapper Component (removed 3D tilt effect)
const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

// Project Card Component
const ProjectCard = ({
  project,
  index,
  onClick,
  cachedImage,
}: {
  project: ResearchProject;
  index: number;
  onClick: () => void;
  cachedImage?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.35,
        delay: index * 0.07,
        type: 'spring',
        stiffness: 200,
      }}
      className="h-full"
    >
      <TiltCard className="h-full perspective-1000">
        <motion.div
          className="relative h-full cursor-pointer group"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          onClick={onClick}
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3 }}
        >
          {/* Glow Effect */}
          <motion.div
            className="absolute -inset-0.5 bg-gradient-to-r from-[#2ECC71] via-[#27AE60] to-[#2ECC71] rounded-2xl opacity-0 blur-lg transition-opacity duration-500"
            animate={{ opacity: isHovered ? 0.4 : 0 }}
          />

          {/* Card Container */}
          <div className="relative h-full bg-gradient-to-br from-gray-900/90 via-black to-gray-900/90 rounded-2xl border border-[rgba(46,204,113,0.2)] overflow-hidden backdrop-blur-xl">
            {/* Animated Border */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(46,204,113,0.3), transparent)',
                }}
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2,
                }}
              />
            </div>

            {/* Image Section */}
            <div className="relative aspect-video max-h-48 overflow-hidden">
              {project.Cover_Picture ? (
                <motion.img
                  src={cachedImage || project.Cover_Picture}
                  alt={project.Title}
                  className="w-full h-full object-cover"
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#2ECC71]/20 to-[#27AE60]/5 flex items-center justify-center">
                  <Sparkles className="w-12 h-12 text-[#2ECC71]/50" />
                </div>
              )}

              {/* Status Indicator */}
              <motion.div
                className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-[rgba(46,204,113,0.3)]"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2ECC71] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2ECC71]" />
                </span>
                <span className="text-[10px] sm:text-xs text-gray-300 font-medium">Active</span>
              </motion.div>

              {/* Project Number */}
              <div className="absolute top-4 right-4">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-[#2ECC71] to-[#27AE60] flex items-center justify-center text-white font-bold text-sm sm:text-base shadow-lg shadow-[#2ECC71]/30">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Hover Overlay */}
              <motion.div
                className="absolute inset-0 bg-[#2ECC71]/20 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30"
                  initial={{ scale: 0 }}
                  animate={{ scale: isHovered ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <ExternalLink className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </motion.div>
              </motion.div>
            </div>

            {/* Content Section */}
            <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
              {/* Title */}
              <motion.h3
                className="text-lg sm:text-xl font-bold text-white line-clamp-2 leading-tight"
                animate={{
                  color: isHovered ? '#2ECC71' : '#ffffff',
                }}
                transition={{ duration: 0.3 }}
              >
                {project.Title}
              </motion.h3>

              {/* Description */}
              <p className="text-gray-400 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                {project.Introduction}
              </p>

              {/* Team Preview */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[...Array(Math.min(3, 4))].map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-[#2ECC71]/30 to-[#27AE60]/30 border-2 border-gray-900 flex items-center justify-center"
                      >
                        <Users className="w-3 h-3 text-[#2ECC71]" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] sm:text-xs text-gray-500">Team</span>
                </div>

                {/* Arrow Button */}
                <motion.div
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[rgba(46,204,113,0.1)] border border-[rgba(46,204,113,0.3)] flex items-center justify-center"
                  animate={{
                    backgroundColor: isHovered ? '#2ECC71' : 'rgba(46,204,113,0.1)',
                    borderColor: isHovered ? '#2ECC71' : 'rgba(46,204,113,0.3)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    animate={{ x: isHovered ? 3 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ArrowRight
                      className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-300 ${
                        isHovered ? 'text-white' : 'text-[#2ECC71]'
                      }`}
                    />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </TiltCard>
    </motion.div>
  );
};

// Main Component
export function ResearchProjectsHomepageSection() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ResearchProject | null>(null);
  const [cachedImages, setCachedImages] = useState<{ [key: string]: string }>({});
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsCollection = collection(
          db,
          'All_Data',
          'Research_Projects',
          'research_projects'
        );
        const q = query(projectsCollection);
        const querySnapshot = await getDocs(q);

        const fetchedProjects: ResearchProject[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedProjects.push({
            id: doc.id,
            Title: data.Title || doc.id || '',
            Cover_Picture: data.Cover_Picture || '',
            Introduction: data.Introduction || '',
            Order: data.Order || 0,
            ...data,
          });
        });

        const topProjects = fetchedProjects
          .sort((a, b) => (a.Order || 0) - (b.Order || 0))
          .slice(0, 4);

        setProjects(topProjects);
      } catch (error) {
        console.error('Error fetching research projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Lock body scroll when modal is open - prevents jitter on mobile
  useEffect(() => {
    if (selectedProject) {
      const scrollY = window.scrollY;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.paddingRight = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    };
  }, [selectedProject]);

  useEffect(() => {
    const cacheImages = async () => {
      const cached: { [key: string]: string } = {};
      for (const project of projects) {
        if (project.Cover_Picture) {
          try {
            const response = await fetch(project.Cover_Picture);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onload = () => {
              cached[project.id] = reader.result as string;
              if (Object.keys(cached).length === projects.length) {
                setCachedImages(cached);
              }
            };
            reader.readAsDataURL(blob);
          } catch (error) {
            cached[project.id] = project.Cover_Picture;
          }
        }
      }
    };
    if (projects.length > 0) {
      cacheImages();
    }
  }, [projects]);

  const getOwners = (project: ResearchProject) => {
    const owners = [];
    for (let i = 1; i <= 4; i++) {
      const nameKey = `Owner_${i}_Name`;
      const designationKey = `Owner_${i}_Designation_Department`;
      const name = project[nameKey];
      const designation = project[designationKey];
      if (name) {
        owners.push({
          name,
          designation: designation || '',
        });
      }
    }
    return owners;
  };

  return (
    <>
      <section
        id="research-projects-home"
        className="relative py-16 sm:py-20 lg:py-28 bg-black overflow-hidden"
      >
        {/* Background Effects */}
        <GridBackground />
        <FloatingParticles />

        {/* Decorative Elements */}
        <div className="absolute -top-48 -left-48 w-96 h-96 bg-[#2ECC71]/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-[#2ECC71]/10 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center mb-12 sm:mb-16 lg:mb-20"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[rgba(46,204,113,0.15)] via-[rgba(46,204,113,0.1)] to-[rgba(46,204,113,0.15)] rounded-full border border-[rgba(46,204,113,0.3)] mb-6"
            >
              <Sparkles className="w-4 h-4 text-[#2ECC71]" />
              <span className="text-[#2ECC71] text-xs sm:text-sm font-medium tracking-wide">
                Innovation & Discovery
              </span>
              <Sparkles className="w-4 h-4 text-[#2ECC71]" />
            </motion.div>

            {/* Title */}
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.1 }}
            >
              <span className="text-white">Research &</span>{' '}
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] to-[#27AE60]">
                  Projects
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                />
              </span>
            </motion.h2>

            {/* Description */}
            <motion.p
              className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.12 }}
            >
              Explore our cutting-edge research initiatives and innovative projects that are
              shaping the future of robotics and automation technology.
            </motion.p>

            {/* Stats Row */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-8 sm:mt-10"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.15 }}
            >
              {[
                { value: '15+', label: 'Active Projects' },
                { value: '50+', label: 'Researchers' },
                { value: '100+', label: 'Publications' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2ECC71]">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Projects Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-80 sm:h-96 bg-gray-900/50 rounded-2xl animate-pulse border border-[rgba(46,204,113,0.1)]"
                />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[rgba(46,204,113,0.1)] flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-[#2ECC71]" />
              </div>
              <p className="text-gray-400 text-lg">No research projects found</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                  onClick={() => setSelectedProject(project)}
                  cachedImage={cachedImages[project.id]}
                />
              ))}
            </div>
          )}

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.15 }}
            className="flex justify-center mt-12 sm:mt-16"
          >
            <motion.button
              onClick={() => navigate('/research-projects')}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="relative px-10 py-4 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-full text-white font-bold text-base transition-all duration-300 shadow-[0_0_30px_0_rgba(46,204,113,0.3)] hover:shadow-[0_0_50px_0_rgba(46,204,113,0.5)] overflow-hidden group"
            >
              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                initial={{ x: '-150%' }}
                whileHover={{ x: '150%' }}
                transition={{ duration: 0.8 }}
              />

              <span className="relative inline-flex items-center gap-3">
                <ChevronRight className="w-5 h-5" />
                Explore All Projects
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed inset-0 bg-black/90 backdrop-blur-md sm:backdrop-blur-xl"
              style={{
                zIndex: 99999,
                willChange: 'opacity',
                WebkitBackfaceVisibility: 'hidden',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
              }}
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Scroll Container */}
            <motion.div
              key="modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed inset-0 flex items-center justify-center overflow-y-auto py-6 sm:py-10 lg:py-16 px-4 sm:px-6 lg:px-8"
              style={{
                zIndex: 100000,
                WebkitOverflowScrolling: 'touch',
                scrollBehavior: 'smooth',
                overscrollBehavior: 'contain',
              }}
              onClick={() => setSelectedProject(null)}
            >
              {/* Modal Content Card */}
              <motion.div
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.97 }}
                transition={{
                  type: 'spring',
                  damping: 30,
                  stiffness: 300,
                  mass: 0.8,
                }}
                className="relative w-full max-w-4xl my-auto"
                style={{
                  willChange: 'transform, opacity',
                  WebkitBackfaceVisibility: 'hidden',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-black rounded-2xl lg:rounded-3xl border border-[#2ECC71]/20 shadow-2xl shadow-black/50 overflow-hidden">
                  {/* Animated Top Accent */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#2ECC71] to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  />

                  {/* Close Button */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/60 backdrop-blur-md border border-[#2ECC71]/40 flex items-center justify-center text-white hover:bg-[#2ECC71] hover:border-[#2ECC71] hover:text-black transition-all duration-300"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.button>

                  {/* Hero Image */}
                  <div className="relative h-48 sm:h-64 lg:h-80 overflow-hidden">
                    <motion.img
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      src={cachedImages[selectedProject.id] || selectedProject.Cover_Picture}
                      alt={selectedProject.Title}
                      className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#2ECC71]/10 to-transparent" />

                    {/* Title Section */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-10">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-[#2ECC71] rounded-full mb-3 sm:mb-5"
                      >
                        <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
                        <span className="text-black text-[11px] sm:text-xs font-bold tracking-wider uppercase">
                          Research Project
                        </span>
                      </motion.div>

                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight mb-3"
                      >
                        {selectedProject.Title}
                      </motion.h2>

                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="w-12 sm:w-20 h-1 sm:h-1.5 bg-gradient-to-r from-[#2ECC71] to-[#3DED97] rounded-full origin-left"
                      />
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-6 sm:p-10 lg:p-12 space-y-7 sm:space-y-10">
                    {/* About Section */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-0.5 bg-gradient-to-r from-[#2ECC71] to-transparent rounded-full" />
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                          About This Project
                        </h3>
                      </div>
                      <div className="bg-white/[0.03] rounded-xl sm:rounded-2xl p-6 sm:p-7 lg:p-8 border border-[#2ECC71]/10 backdrop-blur-sm">
                        <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-[1.8] whitespace-pre-wrap">
                          {selectedProject.Introduction}
                        </p>
                      </div>
                    </motion.div>

                    {/* Team Section */}
                    {getOwners(selectedProject).length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-10 h-0.5 bg-gradient-to-r from-[#2ECC71] to-transparent rounded-full" />
                          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                            Project Team
                          </h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          {getOwners(selectedProject).map((owner, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.7 + index * 0.1 }}
                              className="group bg-white/[0.03] rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-[#2ECC71]/10 hover:border-[#2ECC71]/30 transition-all duration-300"
                            >
                              <div className="flex items-center gap-3 sm:gap-4">
                                <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-[#2ECC71]/20 to-[#27AE60]/5 flex items-center justify-center border border-[#2ECC71]/20 flex-shrink-0 group-hover:border-[#2ECC71]/40 transition-colors duration-300">
                                  <Users className="w-5 h-5 sm:w-6 sm:h-6 text-[#2ECC71]" />
                                </div>
                                <div className="min-w-0 flex-1">
                                  <h4 className="text-white font-semibold text-sm sm:text-base truncate">
                                    {owner.name}
                                  </h4>
                                  <p className="text-gray-400 text-xs sm:text-sm truncate mt-0.5">
                                    {owner.designation}
                                  </p>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Action Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      className="flex gap-3 pt-6 sm:pt-8 mt-2 border-t border-[#2ECC71]/10"
                    >
                      <Button
                        onClick={() => navigate(`/research-projects/${slugify(selectedProject.Title)}`)}
                        className="flex-1 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#2ECC71] text-black font-bold h-12 sm:h-14 rounded-xl text-sm sm:text-base shadow-lg shadow-[#2ECC71]/20 transition-all"
                      >
                        <span>View Full Project</span>
                      </Button>
                      <Button
                        onClick={() => setSelectedProject(null)}
                        className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold h-12 sm:h-14 rounded-xl text-sm sm:text-base transition-all"
                      >
                        <span>Close</span>
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}