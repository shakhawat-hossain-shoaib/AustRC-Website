import { motion, AnimatePresence } from 'motion/react';
import { Bell, Calendar, ChevronRight, X, FileText, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

interface Notice {
  id: string;
  Title: string;
  Date: any;
  Short_Description: string;
  Long_Description?: string;
}

// Floating Particles Component
const FloatingParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#2ECC71] rounded-full opacity-20"
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * 400,
          }}
          animate={{
            y: [null, -80],
            opacity: [0.2, 0],
          }}
          transition={{
            duration: Math.random() * 4 + 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
};

// Notice Card Component
const NoticeCard = ({
  notice,
  index,
  onClick,
}: {
  notice: Notice;
  index: number;
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const formatDateForBadge = (date: any) => {
    if (!date) return { month: '', day: '', year: '' };
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return {
      month: format(dateObj, 'MMM').toUpperCase(),
      day: format(dateObj, 'dd'),
      year: format(dateObj, 'yyyy')
    };
  };

  const formatDate = (date: any) => {
    if (!date) return '';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return format(dateObj, 'MMM dd, yyyy');
  };

  const dateInfo = formatDateForBadge(notice.Date);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className="flex-shrink-0 w-full"
    >
      <motion.div
        className="relative cursor-pointer group"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onClick}
        whileHover={{ x: 4 }}
        transition={{ duration: 0.3 }}
      >
        {/* Glow Effect */}
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-xl opacity-0 blur-lg"
          animate={{ opacity: isHovered ? 0.3 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Card Container */}
        <div className="relative bg-gradient-to-br from-gray-900/90 via-black/95 to-gray-900/90 rounded-xl border border-[rgba(46,204,113,0.2)] p-4 sm:p-5 backdrop-blur-sm overflow-hidden">
          {/* Animated Border Effect */}
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(46,204,113,0.2), transparent)',
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

          <div className="relative flex gap-3 sm:gap-4">
            {/* Date Badge - Calendar Style */}
            <div className="flex-shrink-0">
              <div className="w-14 h-16 sm:w-16 sm:h-20 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-[#2ECC71]/40 overflow-hidden flex flex-col shadow-lg">
                {/* Calendar Top Bar */}
                <div className="bg-gradient-to-r from-[#2ECC71] to-[#27AE60] px-1.5 py-0.5 flex items-center justify-center">
                  <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black" />
                </div>
                {/* Date Content */}
                <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black px-1">
                  <span className="text-[#2ECC71] text-[8px] sm:text-[9px] font-bold tracking-wider">
                    {dateInfo.month}
                  </span>
                  <span className="text-white text-m sm:text-m font-bold leading-none">
                    {dateInfo.day}
                  </span>
                  <span className="text-gray-500 text-[7px] sm:text-[8px] font-medium mt-0.5">
                    {dateInfo.year}
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <motion.h3
                  className="text-base sm:text-lg font-bold text-white line-clamp-1"
                  animate={{
                    color: isHovered ? '#2ECC71' : '#ffffff',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {notice.Title}
                </motion.h3>

                {/* New Badge for recent notices (within 7 days) */}
                {notice.Date && (() => {
                  const noticeDate = notice.Date.toDate ? notice.Date.toDate() : new Date(notice.Date);
                  const daysDiff = Math.floor((Date.now() - noticeDate.getTime()) / (1000 * 60 * 60 * 24));
                  return daysDiff <= 7 ? (
                    <span className="flex-shrink-0 px-2 py-0.5 bg-[#2ECC71] text-black text-[10px] font-bold rounded-full">
                      NEW
                    </span>
                  ) : null;
                })()}
              </div>

              <p className="text-gray-400 text-xs sm:text-sm line-clamp-2 mb-3 leading-relaxed">
                {notice.Short_Description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{formatDate(notice.Date)}</span>
                </div>

                <motion.div
                  className="flex items-center gap-1 text-[#2ECC71] text-xs font-semibold"
                  animate={{
                    x: isHovered ? 3 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  Read More
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Notice Detail Modal
const NoticeDetailModal = ({
  notice,
  onClose,
}: {
  notice: Notice;
  onClose: () => void;
}) => {
  const formatDate = (date: any) => {
    if (!date) return '';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return format(dateObj, 'MMMM dd, yyyy');
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-md"
        style={{ zIndex: 99999 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center overflow-y-auto py-6 px-4"
        style={{ zIndex: 100000 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.97 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-3xl my-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-black rounded-2xl border border-[#2ECC71]/20 shadow-2xl overflow-hidden">
            {/* Top Accent */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#2ECC71] to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            />

            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-[#2ECC71]/40 flex items-center justify-center text-white hover:bg-[#2ECC71] hover:text-black transition-all"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {/* Content */}
            <div className="p-6 sm:p-8 lg:p-10 space-y-6">
              {/* Header */}
              <div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-[#2ECC71] rounded-full mb-4"
                >
                  <Bell className="w-4 h-4 text-black" />
                  <span className="text-black text-xs font-bold uppercase tracking-wider">
                    Notice
                  </span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl sm:text-3xl font-bold text-white leading-tight mb-3"
                >
                  {notice.Title}
                </motion.h2>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center gap-2 text-gray-400 text-sm"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(notice.Date)}</span>
                </motion.div>

                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="w-20 h-1 bg-gradient-to-r from-[#2ECC71] to-[#3DED97] rounded-full mt-4 origin-left"
                />
              </div>

              {/* Short Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white/[0.03] rounded-xl p-5 border border-[#2ECC71]/10"
              >
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  {notice.Short_Description}
                </p>
              </motion.div>

              {/* Long Description */}
              {notice.Long_Description && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <FileText className="w-5 h-5 text-[#2ECC71]" />
                    <h3 className="text-lg font-bold text-white">Details</h3>
                  </div>
                  <div className="bg-white/[0.03] rounded-xl p-5 border border-[#2ECC71]/10">
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                      {notice.Long_Description}
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Close Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="pt-4 border-t border-[#2ECC71]/10"
              >
                <Button
                  onClick={onClose}
                  className="w-full bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#2ECC71] text-black font-bold h-12 rounded-xl transition-all shadow-lg shadow-[#2ECC71]/20"
                >
                  Close
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

// Main Component
export function NoticesBoardHomepageSection() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const noticesCollection = collection(db, 'All_Data', 'Notice_Board', 'notices');
        const q = query(noticesCollection, orderBy('Date', 'desc'), limit(3));
        const querySnapshot = await getDocs(q);

        const fetchedNotices: Notice[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedNotices.push({
            id: doc.id,
            Title: data.Title || '',
            Date: data.Date,
            Short_Description: data.Short_Description || '',
            Long_Description: data.Long_Description || '',
          });
        });

        setNotices(fetchedNotices);
      } catch (error) {
        console.error('Error fetching notices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedNotice) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [selectedNotice]);

  return (
    <>
      <section className="relative py-16 sm:py-20 bg-black overflow-hidden pb-32 sm:pb-48">
        {/* Background Effects */}
        <FloatingParticles />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(46,204,113,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(46,204,113,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[rgba(46,204,113,0.15)] to-[rgba(46,204,113,0.1)] rounded-full border border-[rgba(46,204,113,0.3)] mb-4"
            >
              <Bell className="w-4 h-4 text-[#2ECC71]" />
              <span className="text-[#2ECC71] text-xs sm:text-sm font-medium tracking-wide">
                Latest Updates
              </span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <span className="text-white">Notice </span>
              <span className="relative">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] to-[#27AE60]">
                  Board
                </span>
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-full"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                />
              </span>
            </motion.h2>

            <motion.p
              className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
            >
              Stay updated with our latest announcements and important information
            </motion.p>
          </motion.div>

          {/* Notices Container */}
          {loading ? (
            <div className="space-y-4 max-w-4xl mx-auto">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 bg-gray-900/50 rounded-xl animate-pulse border border-[rgba(46,204,113,0.1)]"
                />
              ))}
            </div>
          ) : notices.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[rgba(46,204,113,0.1)] flex items-center justify-center">
                <Bell className="w-8 h-8 text-[#2ECC71]" />
              </div>
              <p className="text-gray-400 text-base">No notices available</p>
            </motion.div>
          ) : (
            <div className="max-w-4xl mx-auto">
              {/* Scrollable Container with Custom Scrollbar */}
              <div className="relative">
                <div 
                  className="max-h-[200px] overflow-y-auto pr-2"
                  style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: 'rgba(46, 204, 113, 0.5) rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <style>{`
                    .notice-scroll-container::-webkit-scrollbar {
                      width: 8px;
                    }
                    .notice-scroll-container::-webkit-scrollbar-track {
                      background: rgba(0, 0, 0, 0.2);
                      border-radius: 10px;
                    }
                    .notice-scroll-container::-webkit-scrollbar-thumb {
                      background: rgba(46, 204, 113, 0.5);
                      border-radius: 10px;
                      transition: all 0.3s ease;
                    }
                    .notice-scroll-container::-webkit-scrollbar-thumb:hover {
                      background: rgba(46, 204, 113, 0.8);
                    }
                  `}</style>
                  <div className="notice-scroll-container space-y-3 sm:space-y-4">
                    {notices.map((notice, index) => (
                      <NoticeCard
                        key={notice.id}
                        notice={notice}
                        index={index}
                        onClick={() => setSelectedNotice(notice)}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Scroll Indicator */}
                {notices.length > 1 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none flex items-end justify-center pb-2"
                  >
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="text-[#2ECC71] text-xs flex items-center gap-1"
                    >
                      <span>Scroll for more</span>
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                        <path d="M6 8L2 4h8L6 8z" />
                      </svg>
                    </motion.div>
                  </motion.div>
                )}
              </div>


              {/* View All Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex justify-center mt-8"
              >
                <motion.button
                  onClick={() => navigate('/notices')}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-full text-black font-bold text-sm transition-all shadow-lg shadow-[#2ECC71]/20 hover:shadow-[#2ECC71]/40"
                >
                  <span className="inline-flex items-center gap-2">
                    View All Notices
                    <ChevronRight className="w-4 h-4" />
                  </span>
                </motion.button>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence mode="wait">
        {selectedNotice && (
          <NoticeDetailModal
            notice={selectedNotice}
            onClose={() => setSelectedNotice(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}