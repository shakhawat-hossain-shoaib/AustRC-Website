import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, getDocs, query, doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { ArrowRight, Sparkles, Layers, Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';

// Hero Section Background - exact copy from landing page
function HeroBackground() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        {/* Only animate on desktop */}
        {!isMobile ? (
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[rgba(46,204,113,0.15)] via-transparent to-[rgba(46,204,113,0.15)]"
            style={{ filter: 'blur(64px)' }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[rgba(46,204,113,0.1)] via-transparent to-[rgba(46,204,113,0.1)] opacity-30" style={{ filter: 'blur(40px)' }} />
        )}
      </div>

      {/* Neon Gradient Orbs - Hidden on mobile for performance */}
      <div className="hidden lg:block absolute inset-0 opacity-30 overflow-hidden">
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 bg-[#2ECC71] rounded-full"
          style={{ filter: 'blur(100px)', transform: 'translateZ(0)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-[#27AE60] rounded-full"
          style={{ filter: 'blur(100px)', transform: 'translateZ(0)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-full"
          style={{ filter: 'blur(80px)', transform: 'translateZ(0)' }}
          animate={{
            rotate: [0, 360],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      
      {/* Static gradient for mobile */}
      <div className="lg:hidden absolute inset-0 opacity-20 overflow-hidden">
        <div className="absolute top-20 -left-20 w-64 h-64 bg-[#2ECC71] rounded-full" style={{ filter: 'blur(60px)' }} />
        <div className="absolute bottom-20 -right-20 w-72 h-72 bg-[#27AE60] rounded-full" style={{ filter: 'blur(60px)' }} />
      </div>
    </div>
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

// --- Types ---
interface ActivityItem {
  id: string;
  Name: string;
  Image: string;
  Description: string;
  Status?: string; 
}

// --- 1. MENTORSHIP COMPONENT (Grid View) ---
const ActivitySection = ({ 
  title, 
  categoryBadge, 
  categorySlug,
  icon: Icon,
  collectionPath, 
  delay 
}: { 
  title: string; 
  categoryBadge: string;
  categorySlug: string; 
  icon: any;
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
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 border border-[#2ECC71]/30 rounded-full bg-[#2ECC71]/5 backdrop-blur-sm">
           <Icon className="w-4 h-4 text-[#2ECC71]" />
           <span className="text-[#2ECC71] text-xs font-bold tracking-widest uppercase">
             {categoryBadge}
           </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#2ECC71]/50 to-transparent mx-auto rounded-full" />
      </motion.div>

      <div className="container mx-auto px-4 max-w-7xl">
        {loading ? (
          <div className="flex justify-center py-10">
            <div className="w-8 h-8 border-2 border-[#2ECC71] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-[#2ECC71]/20 rounded-2xl bg-[#0a1810]/50 backdrop-blur-sm mx-auto max-w-3xl">
             <p className="text-gray-400 text-lg">No content found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="w-full h-full max-w-sm"
              >
                <div className="group h-full flex flex-col bg-[#050505] border border-white/10 hover:border-[#2ECC71] transition-all duration-300 rounded-2xl overflow-hidden hover:shadow-[0_0_30px_0_rgba(46,204,113,0.15)] relative">
                  <div className="relative h-64 w-full overflow-hidden border-b border-white/5 bg-[#0a1810]">
                    <div className="absolute top-3 right-3 z-10 bg-black/80 backdrop-blur-sm border border-[#2ECC71]/50 px-3 py-1.5 rounded-full flex items-center gap-2">
                      <div className="w-2 h-2 bg-[#2ECC71] rounded-full animate-pulse shadow-[0_0_8px_#2ECC71]" />
                      <span className="text-[10px] font-bold text-[#2ECC71] uppercase tracking-wider">{item.Status}</span>
                    </div>
                    {item.Image ? (
                      <img src={item.Image} alt={item.Name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center"><Sparkles className="text-[#2ECC71]/20 w-12 h-12" /></div>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-white font-bold text-lg mb-3 line-clamp-1 group-hover:text-[#2ECC71] transition-colors">{item.Name}</h3>
                    <div className="w-full h-[1px] bg-[#2ECC71]/30 mb-4 shadow-[0_0_8px_rgba(46,204,113,0.4)]" />
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow h-[4.5em]">{item.Description}</p>
                    <Link to={`/activity/${categorySlug}/${item.id}`} className="w-full py-3 bg-[#2ECC71]/5 border border-[#2ECC71]/30 text-[#2ECC71] rounded-lg hover:bg-[#2ECC71] hover:text-black font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(46,204,113,0.2)] mt-auto">
                      Read More <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
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
            Object.keys(data).forEach((key, idx) => {
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
    <div className="mb-32 relative z-10 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2ECC71]/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 border border-[#2ECC71]/30 rounded-full bg-[#2ECC71]/5 backdrop-blur-sm">
           <Microscope className="w-4 h-4 text-[#2ECC71]" />
           <span className="text-[#2ECC71] text-xs font-bold tracking-widest uppercase">
             Innovation
           </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Research & Projects</h2>
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
    <main className="relative min-h-screen bg-black overflow-x-hidden w-full max-w-[100vw]">
      <HeroBackground />
      <ScrollProgress />
      
      <div className="text-white pt-24 pb-20 relative">
        <div className="container mx-auto px-6 mb-24 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="inline-block px-5 py-2 mb-6 border border-[#2ECC71]/30 rounded-full bg-[#0a1810]">
              <span className="text-[#2ECC71] text-sm font-medium tracking-wide">Learn & Grow</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">Educational Programs</h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Simple steps to mastery. No technical background required.
            </p>
          </motion.div>
        </div>

        {/* 1. MENTORSHIP */}
        <ActivitySection 
          title="Mentorship & Skill Development" 
          categoryBadge="Mentorship"
          categorySlug="mentorship" 
          icon={Layers}
          collectionPath={['All_Data', 'Educational, Mentorship & Training Programs', 'educational, mentorship & training programs']} 
          delay={0.1}
        />

        {/* 2. RESEARCH SLIDESHOW */}
        <ResearchSlider />
      </div>
      
      {/* Glow effect - hidden on mobile for performance */}
      <div className="hidden lg:block fixed bottom-10 right-10 w-32 h-32 bg-[#2ECC71]/20 rounded-full blur-3xl pointer-events-none z-0" />
    </main>
  );
}