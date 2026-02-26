import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  Calendar,
  X,
  FileText,
  Clock,
  Search,
  Filter,
  ChevronDown,
  ChevronLeft,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { Button } from '@/components/ui/button';
import { format, isThisYear, isThisMonth, isThisWeek } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface Notice {
  id: string;
  Title: string;
  Date: any;
  Short_Description: string;
  Long_Description?: string;
}

type FilterType = 'all' | 'thisWeek' | 'thisMonth' | 'thisYear';

// Notice Detail Modal (same as homepage)
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-md"
        style={{ zIndex: 99999 }}
        onClick={onClose}
      />

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
            <motion.div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#2ECC71] to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            />

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

            <div className="p-6 sm:p-8 lg:p-10 space-y-6">
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

// Notice Card for Full Page
const FullNoticeCard = ({
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

  const formatFullDate = (date: any) => {
    if (!date) return '';
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    return format(dateObj, 'MMMM dd, yyyy');
  };

  const isNew = (date: any) => {
    if (!date) return false;
    const dateObj = date.toDate ? date.toDate() : new Date(date);
    const daysDiff = Math.floor((Date.now() - dateObj.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff <= 7;
  };

  const dateInfo = formatDateForBadge(notice.Date);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex-shrink-0 w-[280px] sm:w-[320px] lg:w-[360px]"
    >
      <motion.div
        className="relative cursor-pointer group"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        onClick={onClick}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute -inset-0.5 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-xl opacity-0 blur-lg"
          animate={{ opacity: isHovered ? 0.4 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <div className="relative h-[320px] sm:h-[340px] bg-gradient-to-br from-gray-900/90 via-black/95 to-gray-900/90 rounded-xl border border-[rgba(46,204,113,0.2)] p-6 sm:p-8 backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 rounded-xl overflow-hidden">
            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(46,204,113,0.2), transparent)',
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            />
          </div>

          <div className="relative h-full flex flex-col">
            {/* Header with Calendar Date Badge and NEW Badge */}
            <div className="flex items-start justify-between gap-4 mb-5">
              {/* Calendar Date Badge */}
              <div className="flex-shrink-0">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 border border-[#2ECC71]/40 overflow-hidden flex flex-col shadow-lg">
                  {/* Calendar Top Bar */}
                  <div className="bg-gradient-to-r from-[#2ECC71] to-[#27AE60] px-1.5 py-1 flex items-center justify-center">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                  </div>
                  {/* Date Content */}
                  <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-black px-1">
                    <span className="text-[#2ECC71] text-[8px] sm:text-[9px] font-bold tracking-wider">
                      {dateInfo.month}
                    </span>
                    <span className="text-white text-m sm:text-m font-bold leading-none ">
                      {dateInfo.day}
                    </span>
                    <span className="text-gray-500 text-[8px] sm:text-[9px] font-medium ">
                      {dateInfo.year}
                    </span>
                  </div>
                </div>
              </div>

              {isNew(notice.Date) && (
                <span className="px-3 py-1 bg-[#2ECC71] text-black text-xs font-bold rounded-full">
                  NEW
                </span>
              )}
            </div>

            {/* Title */}
            <motion.h3
              className="text-xl font-bold text-white mb-3 line-clamp-2"
              animate={{ color: isHovered ? '#2ECC71' : '#ffffff' }}
              transition={{ duration: 0.3 }}
            >
              {notice.Title}
            </motion.h3>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 mb-5 flex-1">
              {notice.Short_Description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between pt-5 border-t border-[#2ECC71]/10 mt-auto">
              <div className="flex items-center gap-2 text-gray-500 text-xs">
                <Clock className="w-4 h-4" />
                <span>{formatFullDate(notice.Date)}</span>
              </div>

              <motion.div
                className="flex items-center gap-1 text-[#2ECC71] text-sm font-semibold"
                animate={{ x: isHovered ? 3 : 0 }}
                transition={{ duration: 0.3 }}
              >
                Read More
                <ChevronDown className="w-4 h-4 -rotate-90" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Notices Page Component
export default function NoticesPage() {
  const navigate = useNavigate();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [filteredNotices, setFilteredNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNotice, setSelectedNotice] = useState<Notice | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const noticesCollection = collection(db, 'All_Data', 'Notice_Board', 'notices');
        const q = query(noticesCollection, orderBy('Date', 'desc'));
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
        setFilteredNotices(fetchedNotices);
      } catch (error) {
        console.error('Error fetching notices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // Filter and Search Logic
  useEffect(() => {
    let filtered = [...notices];

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (notice) =>
          notice.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          notice.Short_Description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply date filter
    if (filterType !== 'all') {
      filtered = filtered.filter((notice) => {
        if (!notice.Date) return false;
        const dateObj = notice.Date.toDate ? notice.Date.toDate() : new Date(notice.Date);

        switch (filterType) {
          case 'thisWeek':
            return isThisWeek(dateObj);
          case 'thisMonth':
            return isThisMonth(dateObj);
          case 'thisYear':
            return isThisYear(dateObj);
          default:
            return true;
        }
      });
    }

    setFilteredNotices(filtered);
  }, [searchQuery, filterType, notices]);

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

  const filterOptions: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All Time' },
    { value: 'thisWeek', label: 'This Week' },
    { value: 'thisMonth', label: 'This Month' },
    { value: 'thisYear', label: 'This Year' },
  ];

  return (
    <>
      <div className="min-h-screen bg-black">
        {/* Hero Section */}
        <section className="relative z-50 pt-24 pb-12 sm:pt-32 sm:pb-16 overflow-visible isolate">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(46,204,113,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(46,204,113,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
          <div className="absolute -top-48 -left-48 w-96 h-96 bg-[#2ECC71]/10 rounded-full blur-[120px]" />
          <div className="absolute -bottom-48 -right-48 w-96 h-96 bg-[#2ECC71]/10 rounded-full blur-[120px]" />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -4 }}
              onClick={() => navigate('/')}
              className="mb-8 inline-flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-[#2ECC71]/20 rounded-lg text-white hover:border-[#2ECC71]/50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[rgba(46,204,113,0.15)] to-[rgba(46,204,113,0.1)] rounded-full border border-[rgba(46,204,113,0.3)] mb-6"
              >
                <Bell className="w-4 h-4 text-[#2ECC71]" />
                <span className="text-[#2ECC71] text-sm font-medium">Official Announcements</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              >
                <span className="text-white">Notice </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] to-[#27AE60]">
                  Board
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-lg mb-8"
              >
                Stay informed with all our announcements and important updates
              </motion.p>

              {/* Search and Filter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
              >
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search notices..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-4 py-3 bg-gray-900/50 border border-[#2ECC71]/20 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-[#2ECC71]/50 transition-colors"
                    style={{ paddingLeft: '3rem' }}
                  />
                </div>

                {/* Filter Dropdown */}
                <div className="relative z-[9999]">
                  <button
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className="w-full sm:w-auto px-6 py-3 bg-gray-900/50 border border-[#2ECC71]/20 rounded-xl text-white flex items-center justify-center gap-2 hover:border-[#2ECC71]/50 transition-colors"
                  >
                    <Filter className="w-5 h-5" />
                    <span>{filterOptions.find((f) => f.value === filterType)?.label}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  <AnimatePresence>
                    {showFilterDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-2 right-0 w-48 bg-gray-900 border border-[#2ECC71]/20 rounded-xl overflow-hidden shadow-2xl z-[10000]"
                      >
                        {filterOptions.map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setFilterType(option.value);
                              setShowFilterDropdown(false);
                            }}
                            className={`w-full px-4 py-3 text-left transition-colors ${
                              filterType === option.value
                                ? 'bg-[#2ECC71]/20 text-[#2ECC71]'
                                : 'text-gray-300 hover:bg-gray-800'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Results Count */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-gray-500 text-sm mt-4"
              >
                Showing {filteredNotices.length} of {notices.length} notices
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Notices Grid Section */}
        <section className="relative py-12 sm:py-16 pb-24 sm:pb-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative max-w-4xl">
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-48 bg-gray-900/50 rounded-xl animate-pulse border border-[rgba(46,204,113,0.1)]"
                  />
                ))}
              </div>
            ) : filteredNotices.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[rgba(46,204,113,0.1)] flex items-center justify-center">
                  <Bell className="w-10 h-10 text-[#2ECC71]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">No Notices Found</h3>
                <p className="text-gray-400">
                  {searchQuery
                    ? 'Try adjusting your search or filter'
                    : 'No notices available at the moment'}
                </p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {filteredNotices.map((notice, index) => (
                  <div key={notice.id}>
                    <FullNoticeCard
                      notice={notice}
                      index={index}
                      onClick={() => setSelectedNotice(notice)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Modal */}
      <AnimatePresence mode="wait">
        {selectedNotice && (
          <NoticeDetailModal notice={selectedNotice} onClose={() => setSelectedNotice(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
