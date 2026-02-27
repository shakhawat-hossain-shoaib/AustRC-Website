import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import {
  ArrowRight,
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Share2,
  Eye,
  Zap,
  Star,
  ArrowUpRight,
  GraduationCap  
} from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState, useRef, useCallback } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useNavigate } from 'react-router-dom';
import { slugify } from '@/utils/slugify';

interface Headline {
  heading: string;
  description: string;
  images: string[];
}

interface Event {
  id: string;
  Event_Name: string;
  Cover_Picture: string;
  Introduction: string;
  Order: number;
  headlines: Headline[];
}

// Premium Animated Background
const PremiumBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Base Grid Pattern */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(46,204,113,0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(46,204,113,0.5) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }}
    />

    {/* Radial Gradient Overlay */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

    {/* Animated Gradient Orbs */}
    <motion.div
      className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(46,204,113,0.08) 0%, transparent 70%)',
      }}
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
    <motion.div
      className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full"
      style={{
        background: 'radial-gradient(circle, rgba(39,174,96,0.06) 0%, transparent 70%)',
      }}
      animate={{
        scale: [1.2, 1, 1.2],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />

    {/* Floating Particles */}
    {[...Array(20)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-1 h-1 bg-[#2ECC71]/30 rounded-full"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [-20, 20, -20],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 3 + Math.random() * 4,
          repeat: Infinity,
          delay: Math.random() * 2,
          ease: 'easeInOut',
        }}
      />
    ))}
  </div>
);

// Section Header Component
// Section Header Component
const SectionHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    className="text-center mb-10 sm:mb-14 lg:mb-20"
  >
    {/* Title */}
    <motion.h2
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: 0.1 }}
    >
      <span className="text-white">Recent Events</span>
      <br className="sm:hidden" />
      <span className="text-white"> of </span>
      <span className="relative">
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] via-[#3DED97] to-[#27AE60]">
          AUSTRC
        </span>
        <motion.svg
          className="absolute -bottom-2 sm:-bottom-3 left-0 w-full"
          viewBox="0 0 200 12"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.path
            d="M2 8C50 2 150 2 198 8"
            stroke="url(#underline-gradient)"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <defs>
            <linearGradient id="underline-gradient" x1="0" y1="0" x2="200" y2="0">
              <stop stopColor="#2ECC71" />
              <stop offset="0.5" stopColor="#3DED97" />
              <stop offset="1" stopColor="#27AE60" />
            </linearGradient>
          </defs>
        </motion.svg>
      </span>
    </motion.h2>
  </motion.div>
);

// Premium Event Card
const EventCard = ({
  event,
  index,
  onClick,
  cachedImage,
}: {
  event: Event;
  index: number;
  onClick: () => void;
  cachedImage?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.4,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="h-full"
    >
      <motion.div
        className="relative h-full cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        whileTap={{ scale: 0.995 }}
        style={{
          WebkitTapHighlightColor: 'transparent',
          touchAction: 'manipulation',
        }}
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
            {event.Cover_Picture ? (
              <motion.img
                src={cachedImage || event.Cover_Picture}
                alt={event.Event_Name}
                className="w-full h-full object-cover"
                animate={{ scale: isHovered ? 1.08 : 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-[#2ECC71]/20 to-[#27AE60]/10 flex items-center justify-center">
                <Calendar className="w-16 h-16 text-[#2ECC71]/30" />
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
              className="text-lg sm:text-xl lg:text-2xl font-bold text-white line-clamp-2 leading-snug transition-all duration-300 mb-3 sm:mb-4 min-h-[3.5rem] sm:min-h-[4rem]"
              animate={{
                color: isHovered ? '#2ECC71' : '#ffffff',
                textShadow: isHovered ? '0 0 20px rgba(46,204,113,0.5)' : '0 0 0px rgba(46,204,113,0)',
              }}
            >
              {event.Event_Name}
            </motion.h3>

            {/* Description */}
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
              {event.Introduction}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-end pt-6 sm:pt-8 mt-4 border-t border-[#2ECC71]/20">
              {/* View Details Button */}
              <motion.button
                onClick={onClick}
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
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
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

// Loading Skeleton
const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
    {[...Array(3)].map((_, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.1 }}
        className="bg-gray-900/50 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5"
      >
        <div className="h-48 sm:h-56 lg:h-60 bg-gradient-to-br from-gray-800/50 to-gray-900/50 animate-pulse" />
        <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
          <div className="flex gap-2">
            <div className="h-3 w-16 bg-gray-800/50 rounded animate-pulse" />
            <div className="h-3 w-20 bg-gray-800/50 rounded animate-pulse" />
          </div>
          <div className="h-6 sm:h-7 bg-gray-800/50 rounded animate-pulse" />
          <div className="h-4 bg-gray-800/50 rounded animate-pulse" />
          <div className="h-4 w-3/4 bg-gray-800/50 rounded animate-pulse" />
          <div className="flex justify-between pt-3 border-t border-white/5">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-800/50 animate-pulse" />
              ))}
            </div>
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-800/50 animate-pulse" />
          </div>
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
    className="text-center py-16 sm:py-24"
  >
    <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 rounded-3xl bg-[#2ECC71]/10 flex items-center justify-center">
      <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-[#2ECC71]/40" />
    </div>
    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">No Events Yet</h3>
    <p className="text-gray-400 text-sm sm:text-base max-w-md mx-auto">
      We're preparing amazing events for you. Check back soon!
    </p>
  </motion.div>
);

// Event Modal Component with Full Details
const EventModal = ({
  event,
  cachedImage,
  onClose,
}: {
  event: Event;
  cachedImage?: string;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Handle click outside
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
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
        onClick={handleBackdropClick}
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto"
        style={{
          zIndex: 100000,
          WebkitOverflowScrolling: 'touch',
          scrollBehavior: 'smooth',
          overscrollBehavior: 'contain',
        }}
        onClick={handleBackdropClick}
      >
        {/* Modal Content */}
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{
            type: 'spring',
            damping: 30,
            stiffness: 300,
            mass: 0.8,
          }}
          className="relative w-full max-w-4xl overflow-hidden"
          style={{
            willChange: 'transform, opacity',
            WebkitBackfaceVisibility: 'hidden',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-black rounded-2xl lg:rounded-3xl border border-[#2ECC71]/20 shadow-2xl overflow-hidden">
            {/* Animated Top Border */}
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
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
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
                src={cachedImage || event.Cover_Picture}
                alt={event.Event_Name}
                className="w-full h-full object-cover"
              />

              {/* Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#2ECC71]/10 to-transparent" />

              {/* Title Section */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 lg:p-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#2ECC71] rounded-full mb-4 sm:mb-6"
                >
                  <Zap className="w-4 h-4 text-black" />
                  <span className="text-black text-xs sm:text-sm font-bold tracking-wider uppercase">
                    Featured Event
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 sm:mb-4"
                >
                  {event.Event_Name}
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
            <div className="p-6 sm:p-8 lg:p-10 space-y-8 sm:space-y-10">
              {/* Introduction Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-0.5 bg-gradient-to-r from-[#2ECC71] to-transparent rounded-full" />
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                    Introduction
                  </h3>
                </div>
                <div className="bg-white/[0.03] rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-7 border border-[#2ECC71]/10 backdrop-blur-sm">
                  <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed whitespace-pre-wrap">
                    {event.Introduction}
                  </p>
                </div>
              </motion.div>

              {/* Action Buttons at Bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-[#2ECC71]/10"
              >
                <button
                  onClick={() => {
                    onClose();
                    navigate(`/activities/events/${slugify(event.Event_Name)}`);
                  }}
                  className="flex-1 inline-flex items-center justify-center bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#2ECC71] text-black font-bold h-12 sm:h-13 rounded-xl text-sm sm:text-base shadow-lg shadow-[#2ECC71]/20 transition-all"
                >
                  <span>View Full Event</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 inline-flex items-center justify-center bg-white/5 border-2 border-[#2ECC71]/30 hover:bg-[#2ECC71]/10 text-white font-bold h-12 sm:h-13 rounded-xl text-sm sm:text-base transition-all"
                >
                  <span>Close</span>
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

// Main Component
export function EventsSection() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [cachedImages, setCachedImages] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  // Helper function to extract all images from event data
  const getAllImageURLs = (data: any): string[] => {
    const imageUrls: string[] = [];
    const dataKeys = Object.keys(data);

    // Fields to exclude (like Cover_Picture which is already used as hero image)
    const excludeFields = ['cover_picture', 'coverpicture', 'heroimage', 'hero_image'];

    // Patterns that indicate an image field
    const imagePatterns = [
      'image', 'img', 'picture', 'photo', 'url', 'src', 'cover',
      'banner', 'thumbnail', 'icon', 'graphic', 'visual', 'asset'
    ];

    for (const key of dataKeys) {
      const value = data[key];
      // Check if value is a string and looks like a URL (contains http or firebase storage)
      if (typeof value === 'string' && value.length > 10) {
        const lowerKey = key.toLowerCase();
        const lowerValue = value.toLowerCase();

        // Skip excluded fields
        if (excludeFields.includes(lowerKey)) {
          continue;
        }

        // Check if key matches image patterns
        const isImageKey = imagePatterns.some(pattern => lowerKey.includes(pattern));

        // Check if value looks like an image URL
        const isImageUrl = lowerValue.includes('http') ||
          lowerValue.includes('firebase') ||
          lowerValue.includes('blob:') ||
          lowerValue.includes('data:image');

        if (isImageKey && isImageUrl) {
          if (!imageUrls.includes(value)) {
            imageUrls.push(value);
          }
        }
      }
    }

    return imageUrls;
  };

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsCollection = collection(db, 'All_Data', 'Event_Page', 'All_Events_of_RC');
        const q = query(eventsCollection, orderBy('Order', 'asc'));
        const querySnapshot = await getDocs(q);

        const fetchedEvents: Event[] = [];
        querySnapshot.forEach((doc) => {
          if (fetchedEvents.length < 3) {
            const data = doc.data();
            console.log('Raw event data:', data);

            // Extract headlines with their images and descriptions
            const headlines: Headline[] = [];
            let headlineFound = false;

            for (let i = 1; i <= 10; i++) {
              const headingKey = `Headline_${i}`;
              const descriptionKey = `Headline_${i}_description`;
              const heading = data[headingKey];

              if (heading) {
                headlineFound = true;
                // Collect images for this headline - try multiple naming patterns
                const images: string[] = [];
                for (let j = 1; j <= 10; j++) {
                  // List of possible image key patterns to check
                  const imageKeyPatterns = [
                    `Headline_${i}_Image_${j}`,
                    `Headline_${i}_image_${j}`,
                    `Headline_${i}_IMG_${j}`,
                    `Headline_${i}_img_${j}`,
                    `headline_${i}_image_${j}`,
                    `headline_${i}_Image_${j}`,
                    `Headline${i}_Image${j}`,
                    `Headline${i}_image${j}`,
                  ];

                  // Try each pattern
                  let found = false;
                  for (const imageKey of imageKeyPatterns) {
                    if (data[imageKey]) {
                      images.push(data[imageKey]);
                      found = true;
                      break;
                    }
                  }

                  // If not found with exact patterns, try case-insensitive search
                  if (!found) {
                    const lowerImagePatterns = imageKeyPatterns.map(p => p.toLowerCase());
                    const dataKeys = Object.keys(data);
                    const matchingKey = dataKeys.find(key => {
                      const lowerKey = key.toLowerCase();
                      return lowerImagePatterns.some(pattern => lowerKey === pattern);
                    });
                    if (matchingKey && data[matchingKey]) {
                      images.push(data[matchingKey]);
                    }
                  }
                }

                console.log(`Event: ${data.Event_Name}, Headline ${i}: Found ${images.length} images`, images);
                if (images.length > 0 || heading) {
                  headlines.push({
                    heading,
                    description: data[descriptionKey] || '',
                    images,
                  });
                }
              }
            }

            // If no headlines found, look for standalone images in the document
            if (!headlineFound || headlines.length === 0) {
              const allImages = getAllImageURLs(data);
              console.log(`Event: ${data.Event_Name}, Found ${allImages.length} standalone images`, allImages);

              // Create a default headline with all found images (no description to avoid duplication)
              if (allImages.length > 0) {
                headlines.push({
                  heading: 'Gallery',
                  description: '',
                  images: allImages,
                });
              }
            }

            fetchedEvents.push({
              id: doc.id,
              Event_Name: data.Event_Name,
              Cover_Picture: data.Cover_Picture,
              Introduction: data.Introduction,
              Order: data.Order,
              headlines,
            });
          }
        });

        fetchedEvents.sort((a, b) => a.Order - b.Order);
        setEvents(fetchedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Lock body scroll when modal is open - prevents jitter on mobile
  useEffect(() => {
    if (selectedEvent) {
      // Store current scroll position
      const scrollY = window.scrollY;
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll position
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
  }, [selectedEvent]);

  // Cache images
  useEffect(() => {
    const cacheImages = async () => {
      const cached: { [key: string]: string } = {};
      for (const event of events) {
        if (event.Cover_Picture) {
          try {
            const response = await fetch(event.Cover_Picture);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onload = () => {
              cached[event.id] = reader.result as string;
              setCachedImages((prev) => ({ ...prev, [event.id]: reader.result as string }));
            };
            reader.readAsDataURL(blob);
          } catch {
            cached[event.id] = event.Cover_Picture;
          }
        }
      }
    };
    if (events.length > 0) {
      cacheImages();
    }
  }, [events]);

  const handleCloseModal = useCallback(() => {
    setSelectedEvent(null);
  }, []);

  return (
    <>
      <section
        id="events"
        className="relative py-16 sm:py-24 lg:py-32 bg-black overflow-hidden"
      >
        {/* Background */}
        <PremiumBackground />

        {/* Ambient Glow Effects */}
        <div className="absolute -top-64 -left-64 w-[500px] h-[500px] bg-[#2ECC71]/5 rounded-full blur-[150px]" />
        <div className="absolute -bottom-48 -right-48 w-[400px] h-[400px] bg-[#27AE60]/5 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <SectionHeader />

          {/* Events Grid */}
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <LoadingSkeleton />
            ) : events.length === 0 ? (
              <EmptyState />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                {events.map((event, index) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    index={index}
                    onClick={() => setSelectedEvent(event)}
                    cachedImage={cachedImages[event.id]}
                  />
                ))}
              </div>
            )}
          </div>

          {/* CTA Button */}
          {events.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex justify-center mt-12 sm:mt-16 lg:mt-20"
            >
              <motion.button
                onClick={() => navigate('/activities/events')}
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
  {/* Graduation Cap with Hover Animation */}
  <motion.div
    className="w-5 h-5"
    animate={{ rotate: [0, 15, -10, 0], scale: [1, 1.1, 1, 1.05] }}
    whileHover={{ scale: 1.2, rotate: 20 }}
    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
  >
    <GraduationCap className="w-5 h-5 text-white" />
  </motion.div>

  Explore All Events

  {/* Animated Arrow */}
  <motion.span
    animate={{ x: [0, 5, 0] }}
    transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
  >
    <ArrowRight className="w-5 h-5" />
  </motion.span>
</span>
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence mode="wait">
        {selectedEvent && (
          <EventModal
            key={selectedEvent.id}
            event={selectedEvent}
            cachedImage={cachedImages[selectedEvent.id]}
            onClose={handleCloseModal}
          />
        )}
      </AnimatePresence>
    </>
  );
}