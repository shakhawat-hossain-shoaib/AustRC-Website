import { useState, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';

interface Sponsor {
  name: string;
  imageUrl: string;
}

const SPONSORS_CACHE_KEY = 'austrc_sponsors_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function SponsorsSection() {
  const [isPaused, setIsPaused] = useState(false);
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const x = useMotionValue(0);
  const speed = -64; // pixels per second

  // Fetch sponsors from Firebase with caching
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        // Check if data exists in cache
        const cachedData = localStorage.getItem(SPONSORS_CACHE_KEY);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          // Check if cache is still valid
          if (Date.now() - timestamp < CACHE_DURATION) {
            setSponsors(data);
            setLoading(false);
            console.log('Loaded sponsors from cache');
            return;
          }
        }

        // Fetch from Firebase if cache is empty or expired
        const sponsorsDocRef = doc(db, 'All_Data', 'Sponsor_Images');
        const sponsorsDoc = await getDoc(sponsorsDocRef);

        if (sponsorsDoc.exists()) {
          const data = sponsorsDoc.data();
          const fetchedSponsors: Sponsor[] = [];

          // Extract all image fields (Image_1, Image_2, etc.)
          for (const [key, value] of Object.entries(data)) {
            if (key.startsWith('Image_') && typeof value === 'string') {
              const imageNumber = key.replace('Image_', '');
              fetchedSponsors.push({
                name: `Sponsor ${imageNumber}`,
                imageUrl: value,
              });
            }
          }

          // Sort by image number to maintain order
          fetchedSponsors.sort((a, b) => {
            const numA = parseInt(a.name.split(' ')[1]);
            const numB = parseInt(b.name.split(' ')[1]);
            return numA - numB;
          });

          // Store in cache
          localStorage.setItem(SPONSORS_CACHE_KEY, JSON.stringify({
            data: fetchedSponsors,
            timestamp: Date.now(),
          }));

          setSponsors(fetchedSponsors);
          console.log('Loaded sponsors from Firebase and cached');
        }
      } catch (error) {
        console.error('Error fetching sponsors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  useAnimationFrame((_t, delta) => {
    if (!isPaused) {
      const newX = x.get() + (speed * delta) / 1000;
      // Reset to 0 when we've scrolled through one full set
      if (newX <= -1920) {
        x.set(0);
      } else {
        x.set(newX);
      }
    }
  });

  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(46,204,113,0.05)] via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[rgba(46,204,113,0.1)] to-[rgba(46,204,113,0.05)] rounded-full border border-[rgba(46,204,113,0.3)] mb-4">
            <span className="text-[#2ECC71] text-sm">Our Partners</span>
          </div>
          <h2 className="mb-4 tracking-tight text-white text-5xl">Our Collaborated Sponsors</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Grateful for the support of our valued sponsors who make our initiatives possible.
          </p>
        </motion.div>

        <div 
          className="relative overflow-hidden mb-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {loading ? (
            <div className="flex items-center justify-center h-48 text-gray-400">
              Loading sponsors...
            </div>
          ) : sponsors.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-400">
              No sponsors found
            </div>
          ) : (
            <motion.div
              className="flex gap-6"
              style={{ x }}
            >
              {/* First set of sponsors */}
              {sponsors.map((sponsor, index) => (
                <div key={`first-${index}`} className="flex-shrink-0 w-64">
                  <Card className="group hover:shadow-[0_0_40px_0_rgba(46,204,113,0.3)] transition-all duration-300 bg-gradient-to-br from-[rgba(46,204,113,0.05)] to-transparent border-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.5)] cursor-pointer backdrop-blur-sm h-48">
                    <CardContent className="p-8 flex items-center justify-center h-full">
                      <img 
                        src={sponsor.imageUrl} 
                        alt={sponsor.name}
                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform"
                      />
                    </CardContent>
                  </Card>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {sponsors.map((sponsor, index) => (
                <div key={`second-${index}`} className="flex-shrink-0 w-64">
                  <Card className="group hover:shadow-[0_0_40px_0_rgba(46,204,113,0.3)] transition-all duration-300 bg-gradient-to-br from-[rgba(46,204,113,0.05)] to-transparent border-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.5)] cursor-pointer backdrop-blur-sm h-48">
                    <CardContent className="p-8 flex items-center justify-center h-full">
                      <img 
                        src={sponsor.imageUrl} 
                        alt={sponsor.name}
                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform"
                      />
                    </CardContent>
                  </Card>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
