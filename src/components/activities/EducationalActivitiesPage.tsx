import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, getDocs, query, doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { ArrowRight, Sparkles, Eye } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

// Hero Section Background - matching EventsPage
const HeroBackground = () => (
  <>
    {/* Base Gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

    {/* Neon Gradient Orbs */}
    <div className="hidden lg:block absolute inset-0 opacity-30 overflow-hidden">
      <motion.div
        className="absolute top-20 -left-20 w-96 h-96 bg-[#2ECC71] rounded-full"
        style={{ filter: 'blur(100px)', transform: 'translateZ(0)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-[#27AE60] rounded-full"
        style={{ filter: 'blur(100px)', transform: 'translateZ(0)' }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-full"
        style={{ filter: 'blur(80px)', transform: 'translateZ(0)' }}
        animate={{ rotate: [0, 360], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
    </div>

    {/* Static gradient for mobile */}
    <div className="lg:hidden absolute inset-0 opacity-20 overflow-hidden">
      <div className="absolute top-20 -left-20 w-64 h-64 bg-[#2ECC71] rounded-full" style={{ filter: 'blur(60px)' }} />
      <div className="absolute bottom-20 -right-20 w-72 h-72 bg-[#27AE60] rounded-full" style={{ filter: 'blur(60px)' }} />
    </div>

    {/* Grid Pattern Overlay */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `linear-gradient(rgba(46,204,113,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(46,204,113,0.5) 1px, transparent 1px)`,
        backgroundSize: "50px 50px",
      }}
    />
  </>
);

// Page Header - matching EventsPage style
const PageHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="text-center mb-12 sm:mb-16 lg:mb-20"
  >
    <motion.h1
      className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <span className="text-white">Educational </span>
      <span className="relative">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] via-[#3DED97] to-[#27AE60]">
          Programs
        </span>
        <motion.svg
          className="absolute -bottom-3 left-0 w-full"
          viewBox="0 0 200 12"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.path
            d="M2 8C50 2 150 2 198 8"
            stroke="url(#underline-gradient-edu)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="underline-gradient-edu" x1="0" y1="0" x2="200" y2="0">
              <stop stopColor="#2ECC71" />
              <stop offset="0.5" stopColor="#3DED97" />
              <stop offset="1" stopColor="#27AE60" />
            </linearGradient>
          </defs>
        </motion.svg>
      </span>
    </motion.h1>

    <motion.p
      className="mt-6 text-gray-400 text-base sm:text-lg max-w-3xl mx-auto px-4 leading-relaxed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      Simple steps to mastery. No technical background required. Explore mentorship programs, training sessions, and research opportunities.
    </motion.p>
  </motion.div>
);

// --- Types ---
interface ActivityItem {
  id: string;
  Name: string;
  Image: string;
  Description: string;
  Status?: string; 
}

// --- Activity Card Component (matching EventCard style) ---
const ActivityCard = ({
  item,
  index,
  categorySlug,
}: {
  item: ActivityItem;
  index: number;
  categorySlug: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/activity/${categorySlug}/${item.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{
        duration: 0.35,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <motion.div
        className="relative h-full cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        whileTap={{ scale: 0.98 }}
      >
        {/* Neon Glow Effect on Hover */}
        <motion.div
          className="absolute -inset-[1px] rounded-2xl sm:rounded-3xl"
          style={{
            background: 'linear-gradient(135deg, rgba(46,204,113,0.3), rgba(61,237,151,0.2), rgba(39,174,96,0.3))',
            backgroundSize: '300% 300%',
          }}
          animate={{
            opacity: isHovered ? 1 : 0.6,
            backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
          }}
          transition={{ duration: 0.4 }}
        />
        <motion.div
          className="absolute -inset-[2px] rounded-2xl sm:rounded-3xl blur-md"
          style={{
            background: 'linear-gradient(135deg, #2ECC71, #3DED97, #27AE60)',
          }}
          animate={{ opacity: isHovered ? 0.6 : 0.2 }}
          transition={{ duration: 0.4 }}
        />

        {/* Main Card */}
        <div className="relative h-full flex flex-col bg-gradient-to-br from-[#2ECC71]/10 via-black/60 to-[#27AE60]/10 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-[#2ECC71]/30 overflow-hidden transition-all duration-300">
          {/* Neon Border Glow */}
          <motion.div
            className="absolute inset-0 rounded-2xl sm:rounded-3xl pointer-events-none"
            style={{
              boxShadow: isHovered
                ? '0 0 30px rgba(46,204,113,0.4), inset 0 0 30px rgba(46,204,113,0.15)'
                : '0 0 15px rgba(46,204,113,0.15), inset 0 0 10px rgba(46,204,113,0.05)',
            }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Corner Accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#2ECC71]/50 rounded-tl-2xl sm:rounded-tl-3xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#2ECC71]/50 rounded-br-2xl sm:rounded-br-3xl" />

          {/* Image Section */}
          <div className="relative h-48 sm:h-56 lg:h-60 overflow-hidden">
            {item.Image ? (
              <motion.img
                src={item.Image}
                alt={item.Name}
                className="w-full h-full object-cover"
                animate={{ scale: isHovered ? 1.08 : 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#2ECC71]/20 to-[#27AE60]/10 flex items-center justify-center">
                <Sparkles className="w-16 h-16 text-[#2ECC71]/30" />
              </div>
            )}

            {/* Neon Green Overlay on Hover */}
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(46,204,113,0.2), transparent)',
              }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Shine Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2ECC71]/20 to-transparent -skew-x-12"
              initial={{ x: '-150%' }}
              animate={{ x: isHovered ? '150%' : '-150%' }}
              transition={{ duration: 0.7 }}
            />
          </div>

          {/* Content Section */}
          <div className="p-4 sm:p-6 flex flex-col flex-1 bg-gradient-to-t from-[#2ECC71]/5 to-transparent">
            {/* Title */}
            <motion.h3
              className="text-lg sm:text-xl lg:text-2xl font-bold text-white line-clamp-2 leading-snug transition-all duration-300 mb-3 sm:mb-4"
              animate={{
                color: isHovered ? '#2ECC71' : '#ffffff',
                textShadow: isHovered ? '0 0 20px rgba(46,204,113,0.5)' : '0 0 0px rgba(46,204,113,0)',
              }}
            >
              {item.Name}
            </motion.h3>

            {/* Description */}
            <p className="text-gray-400 text-xs sm:text-sm line-clamp-3 leading-relaxed flex-1">
              {item.Description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-end pt-6 sm:pt-8 mt-auto border-t border-[#2ECC71]/20">
              {/* See Details Button */}
              <motion.button
                className="relative px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-semibold text-sm sm:text-base overflow-hidden group"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#2ECC71] via-[#3DED97] to-[#27AE60] rounded-lg sm:rounded-xl" />

                {/* Hover Glow */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-lg sm:rounded-xl blur-md opacity-0"
                  animate={{ opacity: isHovered ? 0.8 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ filter: 'blur(8px)' }}
                />

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: isHovered ? ['100%', '-100%'] : '-100%' }}
                  transition={{ duration: 0.8 }}
                />

                {/* Content */}
                <div className="relative flex items-center gap-2 text-white font-bold">
                  <span>See Details</span>
                  <motion.div
                    animate={{ x: isHovered ? 4 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                </div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Loading Skeleton - matching EventsPage
const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.1 }}
        className="bg-gray-900/50 rounded-3xl overflow-hidden border border-white/5"
      >
        <div className="h-56 bg-gradient-to-br from-gray-800/50 to-gray-900/50 animate-pulse" />
        <div className="p-6 space-y-4">
          <div className="h-6 bg-gray-800/50 rounded animate-pulse" />
          <div className="h-4 bg-gray-800/50 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-800/50 rounded animate-pulse" />
        </div>
      </motion.div>
    ))}
  </div>
);

// Empty State
const EmptyState = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="text-center py-24"
  >
    <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-[#2ECC71]/10 flex items-center justify-center">
      <Sparkles className="w-12 h-12 text-[#2ECC71]/40" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-2">No Programs Found</h3>
    <p className="text-gray-400 max-w-md mx-auto">
      We're preparing amazing programs for you. Check back soon!
    </p>
  </motion.div>
);

// --- 1. ACTIVITY SECTION (Grid View - EventsPage style) ---
const ActivitySection = ({
  title,
  categorySlug,
  collectionPath,
  delay,
}: {
  title: string;
  categorySlug: string;
  collectionPath: string[];
  delay: number;
}) => {
  const [items, setItems] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // @ts-ignore
        const ref = collection(db, ...collectionPath);
        const q = query(ref);
        const snapshot = await getDocs(q);

        const fetchedData: ActivityItem[] = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            Name: data.Name || data.name || data.Title || data.title || 'Untitled Project',
            Image: data.Image_1 || data.image_1 || data.Image || data.imgUrl || '',
            Description: data.Description || data.description || 'No description provided.',
            Status: data.Status || 'Active'
          };
        });
        setItems(fetchedData);
      } catch (error) {
        console.error(`Error fetching data for ${title}:`, error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [collectionPath, title]);

  return (
    <div className="mb-24 relative z-10">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#2ECC71]/50 to-transparent mx-auto rounded-full" />
      </motion.div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <LoadingSkeleton />
        ) : items.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {items.map((item, index) => (
              <ActivityCard
                key={item.id}
                item={item}
                index={index}
                categorySlug={categorySlug}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- 2. RESEARCH SLIDER COMPONENT ---
const ResearchSlider = () => {
  const [slides, setSlides] = useState<ActivityItem[]>([]);
  const [sectionDescription, setSectionDescription] = useState(""); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const gatheredSlides: ActivityItem[] = [];

        // 1. Fetch from Parent Document (All_Data/Research_Projects)
        // This matches your screenshot exactly
        const parentDocRef = doc(db, 'All_Data', 'Research_Projects');
        try {
          const parentSnap = await getDoc(parentDocRef);
          if (parentSnap.exists()) {
            const data = parentSnap.data();
            setSectionDescription(data.Description || data.description || "");

            // Loop through all keys to find "Image_1", "Image_2", etc.
            Object.keys(data).forEach((key) => {
              if (key.startsWith('Image_')) {
                const val = data[key];
                if (typeof val === 'string' && val.length > 5) {
                  gatheredSlides.push({
                    id: `parent_${key}`,
                    Name: 'Research Project', // Or add a specific title field in FB
                    Image: val,
                    Description: data.Description || '',
                    Status: 'Research'
                  });
                }
              }
            });
          }
        } catch (e) {
          console.warn("Parent doc fetch warning:", e);
        }

        // 2. Fetch from Sub-Collection (Fallback/Extra)
        const subColRef = collection(db, 'All_Data', 'Research_Projects', 'research_projects');
        try {
          const subSnap = await getDocs(query(subColRef));
          subSnap.docs.forEach(doc => {
            const data = doc.data();
            // Check for single image
            const singleImg = data.Image || data.imgUrl || data.image || '';
            if (singleImg && singleImg.length > 5) {
              gatheredSlides.push({
                id: doc.id,
                Name: data.Name || data.Title || 'Project',
                Image: singleImg,
                Description: data.Description || '',
                Status: 'Research'
              });
            }
          });
        } catch (e) {
          // Ignore sub-collection error if empty
        }

        setSlides(gatheredSlides);

      } catch (err) {
        console.error("Research fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResearch();
  }, []);

  // Auto-Play
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 4000); 
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="mt-24 pt-12 mb-32 relative z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2ECC71]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        {/* <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 border border-[#2ECC71]/30 rounded-full bg-[#2ECC71]/5 backdrop-blur-sm">
           <Microscope className="w-4 h-4 text-[#2ECC71]" />
           <span className="text-[#2ECC71] text-xs font-bold tracking-widest uppercase">
             Innovation
           </span>
        </div> */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Research & Projects Highlights</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#2ECC71]/50 to-transparent mx-auto rounded-full" />
      </motion.div>

      {/* Slider Container */}
      <div className="container mx-auto px-4 relative z-10">
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-2 border-[#2ECC71] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : slides.length === 0 ? (
          <div className="text-center py-12 border border-dashed border-[#2ECC71]/20 rounded-2xl bg-[#0a1810]/50">
            <p className="text-gray-400">No research images found.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            
            {/* ✅ FIXED: Added min-h and forced Aspect Ratio */}
            <div className="relative w-full max-w-4xl h-[450px] md:h-[550px] mb-12 flex justify-center"> 
              <AnimatePresence mode='popLayout'>
                <motion.div
                  key={slides[currentIndex].id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#0a1810] border border-[#2ECC71]/30 shadow-[0_0_30px_rgba(46,204,113,0.15)] group">
                    
                    {/* Image */}
                    <img 
                      src={slides[currentIndex].Image} 
                      alt={slides[currentIndex].Name} 
                      className="w-full h-full object-cover transition-transform duration-[5s] ease-linear group-hover:scale-105"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-1.5 bg-[#2ECC71] rounded-full text-black">
                          <Sparkles size={14} fill="currentColor" />
                        </div>
                        <span className="text-[#2ECC71] text-xs font-bold uppercase tracking-widest">
                          Research Highlight
                        </span>
                      </div>
                      <h3 className="text-white text-2xl font-bold leading-tight mb-2 drop-shadow-md">
                        {slides[currentIndex].Name}
                      </h3>
                    </div>

                    {/* Navigation Dots */}
                    <div className="absolute bottom-6 right-6 flex gap-2 z-20">
                      {slides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentIndex(idx)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === currentIndex 
                              ? 'w-6 bg-[#2ECC71] shadow-[0_0_10px_#2ECC71]' 
                              : 'w-2 bg-gray-500/50 hover:bg-gray-400'
                          }`}
                        />
                      ))}
                    </div>

                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Description & Button */}
            {sectionDescription && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-4xl text-center px-4"
              >
                <div className="w-16 h-1 bg-[#2ECC71] mx-auto mb-6 rounded-full" />
                <p className="text-[#2ECC71] text-lg md:text-xl font-medium italic leading-relaxed whitespace-pre-line tracking-wide drop-shadow-[0_0_10px_rgba(46,204,113,0.3)] mb-8">
                  "{sectionDescription}"
                </p>
                <Link 
                  to="/research-projects" 
                  className="inline-flex items-center gap-2 px-8 py-3 bg-[#2ECC71]/10 border border-[#2ECC71] rounded-full text-[#2ECC71] font-bold uppercase tracking-wider hover:bg-[#2ECC71] hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(46,204,113,0.2)] hover:shadow-[0_0_40px_rgba(46,204,113,0.6)] hover:scale-105"
                >
                  Explore Research
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <div className="mt-20" />
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
export function EducationalActivitiesPage() {
  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-32 relative overflow-hidden">
      {/* Background */}
      <HeroBackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Page Header */}
        <PageHeader />

        {/* 1. MENTORSHIP */}
        <ActivitySection
          title="Mentorship & Skill Development"
          categorySlug="mentorship"
          collectionPath={['All_Data', 'Educational, Mentorship & Training Programs', 'educational, mentorship & training programs']}
          delay={0.1}
        />

        {/* 2. RESEARCH SLIDESHOW */}
        <ResearchSlider />
      </div>

      {/* Glow effect - hidden on mobile for performance */}
      <div className="hidden lg:block fixed bottom-10 right-10 w-32 h-32 bg-[#2ECC71]/20 rounded-full blur-3xl pointer-events-none z-0" />
    </div>
  );
}