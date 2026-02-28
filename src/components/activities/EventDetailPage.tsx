import { motion } from 'motion/react';
import { Zap, ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/config/firebase';
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

export function EventDetailPage() {
  const { eventSlug } = useParams<{ eventSlug: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventsCollection = collection(db, 'All_Data', 'Event_Page', 'All_Events_of_RC');
        const q = query(eventsCollection, orderBy('Order', 'asc'));
        const querySnapshot = await getDocs(q);

        let foundEvent: Event | null = null;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (slugify(data.Event_Name) === eventSlug) {
            // Extract headlines
            const headlines: Headline[] = [];
            for (let i = 1; i <= 10; i++) {
              const headingKey = `Headline_${i}`;
              const descriptionKey = `Headline_${i}_description`;
              const heading = data[headingKey];

              if (heading) {
                const images: string[] = [];
                for (let j = 1; j <= 10; j++) {
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

                  let found = false;
                  for (const imageKey of imageKeyPatterns) {
                    if (data[imageKey]) {
                      images.push(data[imageKey]);
                      found = true;
                      break;
                    }
                  }

                  if (!found) {
                    const lowerImagePatterns = imageKeyPatterns.map((p) => p.toLowerCase());
                    const dataKeys = Object.keys(data);
                    const matchingKey = dataKeys.find((key) => {
                      const lowerKey = key.toLowerCase();
                      return lowerImagePatterns.some((pattern) => lowerKey === pattern);
                    });
                    if (matchingKey && data[matchingKey]) {
                      images.push(data[matchingKey]);
                    }
                  }
                }

                headlines.push({
                  heading,
                  description: data[descriptionKey] || '',
                  images,
                });
              }
            }

            // Fallback: standalone images
            if (headlines.length === 0) {
              const imagePatterns = ['image', 'img', 'picture', 'photo', 'url', 'src', 'cover', 'banner', 'thumbnail'];
              const excludeFields = ['cover_picture', 'coverpicture', 'heroimage', 'hero_image'];
              const allImages: string[] = [];
              for (const key of Object.keys(data)) {
                const value = data[key];
                if (typeof value === 'string' && value.length > 10) {
                  const lowerKey = key.toLowerCase();
                  const lowerValue = value.toLowerCase();
                  if (excludeFields.includes(lowerKey)) continue;
                  const isImageKey = imagePatterns.some((p) => lowerKey.includes(p));
                  const isImageUrl = lowerValue.includes('http') || lowerValue.includes('firebase');
                  if (isImageKey && isImageUrl && !allImages.includes(value)) {
                    allImages.push(value);
                  }
                }
              }
              if (allImages.length > 0) {
                headlines.push({ heading: 'Gallery', description: '', images: allImages });
              }
            }

            foundEvent = {
              id: doc.id,
              Event_Name: data.Event_Name,
              Cover_Picture: data.Cover_Picture,
              Introduction: data.Introduction,
              Order: data.Order,
              headlines,
            };
          }
        });

        if (foundEvent) {
          setEvent(foundEvent);
        } else {
          setError('Event not found');
        }
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Failed to load event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <HeroBackground />
        <div className="relative">
          <div className="w-16 h-16 border-4 border-[#2ECC71]/20 border-t-[#2ECC71] rounded-full animate-spin" />
          <Zap className="w-6 h-6 text-[#2ECC71] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <HeroBackground />
        <div className="text-center z-10">
          <h1 className="text-3xl font-bold text-white mb-4">Event Not Found</h1>
          <p className="text-gray-400 mb-8">{error || 'The event you are looking for does not exist.'}</p>
          <button
            onClick={() => navigate('/activities/events')}
            className="px-6 py-3 bg-[#2ECC71] text-black font-bold rounded-xl hover:bg-[#27AE60] transition-colors"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <HeroBackground />

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 
           px-4 py-2 text-[#2ECC71] hover:text-white 
           bg-black/50 hover:bg-black/80 
           rounded-lg backdrop-blur-md 
           transition-all border border-[#2ECC71]/30 hover:border-[#2ECC71]"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden sm:inline text-sm font-medium">Back</span>
      </button>

      <div className="relative z-10 container mx-auto px-4 pt-32 md:pt-40 pb-24 max-w-5xl">
        {/* Cover Image */}
        {event.Cover_Picture && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-10 sm:mb-12 flex justify-center"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-[0_0_60px_0_rgba(46,204,113,0.3)] w-full max-w-2xl">
              <div className="relative h-[300px]">
                <img
                  src={event.Cover_Picture}
                  alt={event.Event_Name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-10 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[rgba(46,204,113,0.15)] to-[rgba(46,204,113,0.05)] rounded-full border border-[rgba(46,204,113,0.3)] mb-5">
            <Zap className="w-4 h-4 text-[#2ECC71]" />
            <span className="text-[#2ECC71] text-xs sm:text-sm font-bold tracking-wider uppercase">Event</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
            {event.Event_Name}
          </h1>
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-full mt-5" />
        </motion.div>

        {/* Content */}
        <div className="space-y-8 sm:space-y-10">
        {/* Introduction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-0.5 bg-gradient-to-r from-[#2ECC71] to-transparent rounded-full" />
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">Introduction</h2>
          </div>
          <div className="bg-white/[0.03] rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-7 border border-[#2ECC71]/10 backdrop-blur-sm">
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed whitespace-pre-wrap">
              {event.Introduction}
            </p>
          </div>
        </motion.div>

        {/* Headlines / Sections */}
        {event.headlines && event.headlines.length > 0 && (
          <div className="space-y-8 sm:space-y-10">
            {event.headlines.map((headline, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * idx }}
                className="bg-white/[0.02] rounded-xl sm:rounded-2xl p-6 sm:p-7 lg:p-8 border border-[#2ECC71]/10 backdrop-blur-sm overflow-hidden"
              >
                {/* Headline Title */}
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#2ECC71] mb-4 sm:mb-5 flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                    className="w-2 h-2 sm:w-3 sm:h-3 bg-[#2ECC71] rounded-full"
                  />
                  {headline.heading}
                </h3>

                {/* Images */}
                {headline.images && headline.images.length > 0 && (
                  <div className="mb-6 sm:mb-7">
                    {headline.images.length === 1 ? (
                      <div className="relative h-56 sm:h-72 lg:h-96 rounded-lg overflow-hidden bg-gradient-to-br from-[#2ECC71]/20 to-[#27AE60]/10">
                        <img
                          src={headline.images[0]}
                          alt={headline.heading}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 gap-4 w-full">
                        {headline.images.map((img, imgIdx) => (
                          <div
                            key={imgIdx}
                            className="relative h-48 sm:h-56 lg:h-64 rounded-lg overflow-hidden bg-gradient-to-br from-[#2ECC71]/20 to-[#27AE60]/10"
                          >
                            <img
                              src={img}
                              alt={`${headline.heading} ${imgIdx + 1}`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Description */}
                {headline.description && (
                  <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed whitespace-pre-wrap">
                    {headline.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}
