import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Trophy, ChevronLeft, ChevronRight } from 'lucide-react';
import { slugify } from '@/utils/slugify';

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

interface Achievement {
  id: string;
  Name?: string;          // Title of the achievement (mandatory)
  Description?: string;   // Description text (mandatory)
  Image_1?: string;       // Primary image URL (mandatory)
  Image_2?: string;       // Secondary image URL (optional)
  Order?: number;         // Sort order (lower numbers appear first)
  [key: string]: any;     // Allow any additional fields
}

// Achievement Card Component with Carousel
function AchievementCard({ achievement, index, onClick }: { achievement: Achievement; index: number; onClick: () => void }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Get all image URLs from the achievement
  const getImageUrls = (): string[] => {
    const images: string[] = [];
    // Check for Image_1, Image_2, Image_3, etc.
    for (let i = 1; i <= 10; i++) {
      const imageKey = `Image_${i}`;
      if (achievement[imageKey]) {
        images.push(achievement[imageKey]);
      }
    }
    return images;
  };

  const images = getImageUrls();
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Auto-play carousel when there are multiple images
  useEffect(() => {
    if (!hasMultipleImages) return;

    const interval = setInterval(() => {
      nextImage();
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [currentImageIndex, hasMultipleImages]);

  const getTitle = () => achievement.Name || achievement.id || 'Untitled Achievement';
  const getDescription = () => achievement.Description || 'No description available';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      className="group bg-gradient-to-br from-[#0a1810] to-black border border-[#2ECC71]/20 rounded-2xl overflow-hidden hover:border-[#2ECC71]/50 hover:shadow-[0_0_40px_0_rgba(46,204,113,0.2)] transition-all duration-300 cursor-pointer"
    >
      {/* Image Carousel Section */}
      {images.length > 0 && (
        <div className="relative h-64 bg-black overflow-hidden">
          <img
            src={images[currentImageIndex]}
            alt={`${getTitle()} - Image ${currentImageIndex + 1}`}
            className="w-full h-full object-contain"
          />

          {/* Navigation Buttons - Only show if multiple images */}
          {hasMultipleImages && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all z-10"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm z-10">
                {currentImageIndex + 1} / {images.length}
              </div>

              {/* Dot Indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex
                      ? 'bg-[#2ECC71] w-6'
                      : 'bg-white/50 hover:bg-white/80'
                      }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="p-6">
        {/* Trophy Icon */}
        <div className="w-12 h-12 bg-[#2ECC71]/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-[#2ECC71]/20 transition-colors">
          <Trophy className="w-6 h-6 text-[#2ECC71]" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#2ECC71] transition-colors">
          {getTitle()}
        </h3>

        {/* Description */}
        <p className="text-gray-400 text-sm line-clamp-3">
          {getDescription()}
        </p>
      </div>
    </motion.div>
  );
}

export function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAchievementClick = (achievement: Achievement) => {
    const achievementSlug = slugify(achievement.Name || achievement.id);
    navigate(`/activities/achievements/${achievementSlug}`);
  };

  useEffect(() => {
    // Reference to the achievements subcollection
    // Path: All_Data (collection) -> Achievement (document) -> achievement (subcollection)
    const achievementsRef = collection(db, 'All_Data', 'Achievement', 'achievement');

    // Create a query with ordering by Order field (ascending - lower numbers first)
    const q = query(achievementsRef, orderBy('Order', 'asc'));

    // Set up real-time listener using onSnapshot
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        console.log('📊 Firestore snapshot received, document count:', snapshot.size);
        const fetchedAchievements: Achievement[] = [];

        snapshot.forEach((doc) => {
          console.log('📄 Achievement document:', doc.id, doc.data());
          fetchedAchievements.push({
            id: doc.id,
            ...doc.data() as Omit<Achievement, 'id'>
          });
        });

        console.log('✅ Total achievements fetched:', fetchedAchievements.length);
        setAchievements(fetchedAchievements);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error('Error fetching achievements:', err);
        setError('Failed to load achievements. Please try again later.');
        setLoading(false);
      }
    );

    // Cleanup function - unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden w-full max-w-[100vw]">
      <HeroBackground />
      <ScrollProgress />
      
      <div className="text-white pt-24 pb-12 px-6">
        <div className="container mx-auto relative z-10">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-[#2ECC71] text-sm font-medium tracking-wider uppercase mb-2 block">
              Hall of Excellence
            </span>
            <h1 className="text-5xl font-bold mb-6">Our Achievements</h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Celebrating the milestones, awards, and recognition our members have brought to the club.
            </p>
          </motion.div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-[#2ECC71]/20 border-t-[#2ECC71] rounded-full animate-spin"></div>
                <Trophy className="w-6 h-6 text-[#2ECC71] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-8 text-center">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && achievements.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0a1810] border border-[#2ECC71]/20 rounded-2xl p-12 text-center"
            >
              <Trophy className="w-16 h-16 text-[#2ECC71]/50 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">No Achievements Yet</h3>
              <p className="text-gray-400">Check back soon for our latest accomplishments!</p>
            </motion.div>
          )}

          {/* Achievements Grid */}
          {!loading && !error && achievements.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {achievements.map((achievement, index) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  index={index}
                  onClick={() => handleAchievementClick(achievement)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Glow effect - hidden on mobile for performance */}
      <div className="hidden lg:block fixed bottom-10 right-10 w-32 h-32 bg-[#2ECC71]/20 rounded-full blur-3xl pointer-events-none z-0" />
    </main>
  );
}

