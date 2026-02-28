import { motion } from 'motion/react';
import { Trophy, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { slugify } from '@/utils/slugify';

interface Achievement {
  id: string;
  Name?: string;
  Description?: string;
  Image_1?: string;
  Image_2?: string;
  Order?: number;
  [key: string]: any;
}

// Hero Background (same as HomePage HeroSection)
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
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        {!isMobile ? (
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[rgba(46,204,113,0.15)] via-transparent to-[rgba(46,204,113,0.15)]"
            style={{ filter: 'blur(64px)' }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : (
          <div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[rgba(46,204,113,0.1)] via-transparent to-[rgba(46,204,113,0.1)] opacity-30"
            style={{ filter: 'blur(40px)' }}
          />
        )}
      </div>

      <div className="hidden lg:block absolute inset-0 opacity-30 overflow-hidden">
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 bg-[#2ECC71] rounded-full"
          style={{ filter: 'blur(100px)', transform: 'translateZ(0)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-[#27AE60] rounded-full"
          style={{ filter: 'blur(100px)', transform: 'translateZ(0)' }}
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-full"
          style={{ filter: 'blur(80px)', transform: 'translateZ(0)' }}
          animate={{ rotate: [0, 360], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      <div className="lg:hidden absolute inset-0 opacity-20 overflow-hidden">
        <div className="absolute top-20 -left-20 w-64 h-64 bg-[#2ECC71] rounded-full" style={{ filter: 'blur(60px)' }} />
        <div className="absolute bottom-20 -right-20 w-72 h-72 bg-[#27AE60] rounded-full" style={{ filter: 'blur(60px)' }} />
      </div>
    </div>
  );
}

export function AchievementDetailPage() {
  const { achievementSlug } = useParams<{ achievementSlug: string }>();
  const navigate = useNavigate();
  const [achievement, setAchievement] = useState<Achievement | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchAchievement = async () => {
      try {
        const achievementsRef = collection(db, 'All_Data', 'Achievement', 'achievement');
        const q = query(achievementsRef, orderBy('Order', 'asc'));
        const querySnapshot = await getDocs(q);

        let foundAchievement: Achievement | null = null;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const name = data.Name || doc.id;
          if (slugify(name) === achievementSlug) {
            foundAchievement = { id: doc.id, ...data } as Achievement;
          }
        });

        if (foundAchievement) {
          setAchievement(foundAchievement);
        } else {
          setError('Achievement not found');
        }
      } catch (err) {
        console.error('Error fetching achievement:', err);
        setError('Failed to load achievement details');
      } finally {
        setLoading(false);
      }
    };

    fetchAchievement();
  }, [achievementSlug]);

  // Get all image URLs
  const getImageUrls = (): string[] => {
    if (!achievement) return [];
    const images: string[] = [];
    for (let i = 1; i <= 10; i++) {
      const imageKey = `Image_${i}`;
      if (achievement[imageKey]) {
        images.push(achievement[imageKey]);
      }
    }
    return images;
  };

  const images = achievement ? getImageUrls() : [];
  const hasMultipleImages = images.length > 1;

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);

  // Auto-play carousel
  useEffect(() => {
    if (!hasMultipleImages) return;
    const interval = setInterval(nextImage, 3000);
    return () => clearInterval(interval);
  }, [currentImageIndex, hasMultipleImages]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <HeroBackground />
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#2ECC71]/20 border-t-[#2ECC71] rounded-full animate-spin" />
          <Trophy className="w-6 h-6 text-[#2ECC71] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    );
  }

  if (error || !achievement) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <HeroBackground />
        <div className="text-center z-10">
          <h1 className="text-3xl font-bold text-white mb-4">Achievement Not Found</h1>
          <p className="text-gray-400 mb-8">{error || 'The achievement you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/activities/achievements')}
            className="px-6 py-3 bg-[#2ECC71] text-black font-bold rounded-xl hover:bg-[#27AE60] transition-colors"
          >
            Back to Achievements
          </button>
        </div>
      </div>
    );
  }

  const title = achievement.Name || achievement.id || 'Untitled Achievement';

  return (
    <div className="min-h-screen bg-black text-white relative">
      <HeroBackground />

      {/* Spacer to push content below navbar */}
      <div className="h-32 md:h-40 w-full" />

      <div className="relative z-10 pb-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <div className="w-full flex justify-start mb-8 relative z-50">
          <button
            onClick={() => navigate('/activities/achievements')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-[#2ECC71]/30 rounded-full text-[#2ECC71] hover:bg-[#2ECC71] hover:text-black transition-all duration-300 cursor-pointer shadow-lg backdrop-blur-md"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold tracking-wide">Back</span>
          </button>
        </div>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#2ECC71] rounded-full mb-6">
            <Trophy className="w-4 h-4 text-black" />
            <span className="text-black text-xs sm:text-sm font-bold tracking-wider uppercase">Achievement</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {title}
          </h1>
        </motion.div>

        {/* Image Carousel */}
        {images.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative h-72 sm:h-96 lg:h-[28rem] bg-black rounded-2xl overflow-hidden mb-10 border border-[#2ECC71]/10"
          >
            <img
              src={images[currentImageIndex]}
              alt={`${title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-contain"
            />

            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white p-3 rounded-full transition-all z-10"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full text-white font-medium z-10">
                  {currentImageIndex + 1} / {images.length}
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {images.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        idx === currentImageIndex ? 'bg-[#2ECC71] w-8' : 'bg-white/50 hover:bg-white/80'
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-0.5 bg-gradient-to-r from-[#2ECC71] to-transparent rounded-full" />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Description</h2>
          </div>
          <div className="bg-white/[0.03] rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-7 border border-[#2ECC71]/10 backdrop-blur-sm">
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed whitespace-pre-wrap">
              {achievement.Description || 'No description available'}
            </p>
          </div>
        </motion.div>

        {/* Image Gallery Grid (all images below) */}
        {images.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-10"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-0.5 bg-gradient-to-r from-[#2ECC71] to-transparent rounded-full" />
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Gallery</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative h-48 sm:h-56 lg:h-64 rounded-lg overflow-hidden bg-gradient-to-br from-[#2ECC71]/20 to-[#27AE60]/10 border border-[#2ECC71]/10"
                >
                  <img
                    src={img}
                    alt={`${title} - Gallery ${idx + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
