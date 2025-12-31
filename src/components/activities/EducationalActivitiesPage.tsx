import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, getDocs, query, doc, getDoc } from 'firebase/firestore'; // Removed 'limit'
import { db } from '@/config/firebase';
import { ArrowRight, Sparkles, Layers, Wrench, Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- Types ---
interface ActivityItem {
  id: string;
  Name: string;
  Image: string;
  Description: string;
  Status?: string; 
}

// --- 1. MENTORSHIP & WORKSHOP COMPONENT (Grid View) ---
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
        
        // ✅ FIX: Removed limit(3). Now fetching ALL items.
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
        const ref = collection(db, 'All_Data', 'Research_Projects', 'research_projects');
        const snapshot = await getDocs(query(ref));
        
        const allSlides: ActivityItem[] = [];

        snapshot.docs.forEach(doc => {
          const data = doc.data() as Record<string, any>;
          let foundMultiImages = false;
          for (let i = 1; i <= 10; i++) {
            const imgKey = `Image_${i}`;
            if (data[imgKey]) {
              foundMultiImages = true;
              allSlides.push({
                id: `${doc.id}_${i}`, 
                Name: data.Name || data.name || 'Research Project',
                Image: data[imgKey],
                Description: data.Description || 'Exploring new frontiers in robotics.',
                Status: 'Research'
              });
            }
          }
          if (!foundMultiImages) {
             const standardImg = data.Image || data.imgUrl || '';
             if (standardImg) {
               allSlides.push({
                 id: doc.id,
                 Name: data.Name || data.name || 'Untitled Research',
                 Image: standardImg,
                 Description: data.Description || 'Innovative research initiative.',
                 Status: 'Research'
               });
             }
          }
        });
        setSlides(allSlides);

        const parentDocRef = doc(db, 'All_Data', 'Research_Projects');
        const parentDocSnap = await getDoc(parentDocRef);
        if (parentDocSnap.exists()) {
          setSectionDescription(parentDocSnap.data().Description || "");
        }

      } catch (err) {
        console.error("Research fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchResearch();
  }, []);

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
            <div className="relative w-full max-w-4xl h-[500px] mb-12"> 
              <AnimatePresence mode='popLayout'>
                <motion.div
                  key={slides[currentIndex].id}
                  initial={{ opacity: 0, scale: 0.9, x: 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -50 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <div className="relative w-full h-full rounded-3xl overflow-hidden bg-[#0a1810] border border-[#2ECC71]/30 shadow-[0_0_40px_rgba(46,204,113,0.2)] group">
                    <img 
                      src={slides[currentIndex].Image} 
                      alt={slides[currentIndex].Name} 
                      className="w-full h-full object-cover transition-transform duration-[5s] ease-linear group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 pb-12">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-[#2ECC71] rounded-full text-black">
                          <Sparkles size={16} fill="currentColor" />
                        </div>
                        <span className="text-[#2ECC71] text-xs font-bold uppercase tracking-widest">
                          Research Project
                        </span>
                      </div>
                      <h3 className="text-white text-3xl font-bold leading-tight mb-2 drop-shadow-md">
                        {slides[currentIndex].Name}
                      </h3>
                      <p className="text-gray-300 text-base opacity-90 line-clamp-2 max-w-2xl">
                        {slides[currentIndex].Description}
                      </p>
                    </div>
                    <div className="absolute bottom-6 right-6 flex gap-2 z-20">
                      {slides.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentIndex(idx)}
                          className={`h-2 rounded-full transition-all duration-300 ${
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

            {sectionDescription && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="max-w-4xl text-center px-4"
              >
                <div className="w-16 h-1 bg-[#2ECC71] mx-auto mb-6 rounded-full" />
                <p className="text-[#2ECC71] text-lg md:text-xl font-medium italic leading-relaxed whitespace-pre-line tracking-wide drop-shadow-[0_0_10px_rgba(46,204,113,0.3)]">
                  "{sectionDescription}"
                </p>
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
    <div className="min-h-screen bg-black text-white pt-24 pb-20 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#2ECC71]/5 to-transparent pointer-events-none" />

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

      {/* 2. WORKSHOPS - Updated Path to match your Firebase */}
      <ActivitySection 
        title="Workshops & Seminar" 
        categoryBadge="Training"
        categorySlug="workshops" 
        icon={Wrench}
        collectionPath={['All_Data', 'Educational,Workshops & Seminar', 'educational,Workshops & Seminar']} 
        delay={0.2}
      />

      {/* 3. RESEARCH SLIDESHOW */}
      <ResearchSlider />

    </div>
  );
}