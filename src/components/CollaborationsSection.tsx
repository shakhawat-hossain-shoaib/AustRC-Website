import { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';

interface CollaboratedClub {
  name: string;
  imageUrl: string;
}

const COLLABORATIONS_CACHE_KEY = 'austrc_collaborations_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export function CollaborationsSection() {
  const [isPaused, setIsPaused] = useState(false);
  const [clubs, setClubs] = useState<CollaboratedClub[]>([]);
  const [loading, setLoading] = useState(true);
  const x = useMotionValue(0);
  const speed = -64; // pixels per second (1920px in 30s = 64px/s)

  // Fetch collaborated clubs from Firebase with caching
  useEffect(() => {
    const fetchClubs = async () => {
      try {
        // Check if data exists in cache
        const cachedData = localStorage.getItem(COLLABORATIONS_CACHE_KEY);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          // Check if cache is still valid
          if (Date.now() - timestamp < CACHE_DURATION) {
            setClubs(data);
            setLoading(false);
            console.log('Loaded collaborations from cache');
            return;
          }
        }

        // Fetch from Firebase if cache is empty or expired
        const clubsDocRef = doc(db, 'All_Data', 'Collaborated_Clubs');
        const clubsDoc = await getDoc(clubsDocRef);

        if (clubsDoc.exists()) {
          const data = clubsDoc.data();
          const fetchedClubs: CollaboratedClub[] = [];

          // Extract all image fields (Image_1, Image_2, etc.)
          for (const [key, value] of Object.entries(data)) {
            if (key.startsWith('Image_') && typeof value === 'string') {
              const imageNumber = key.replace('Image_', '');
              fetchedClubs.push({
                name: `Partner ${imageNumber}`,
                imageUrl: value,
              });
            }
          }

          // Sort by image number to maintain order
          fetchedClubs.sort((a, b) => {
            const numA = parseInt(a.name.split(' ')[1]);
            const numB = parseInt(b.name.split(' ')[1]);
            return numA - numB;
          });

          // Store in cache
          localStorage.setItem(COLLABORATIONS_CACHE_KEY, JSON.stringify({
            data: fetchedClubs,
            timestamp: Date.now(),
          }));

          setClubs(fetchedClubs);
          console.log('Loaded collaborations from Firebase and cached');
        }
      } catch (error) {
        console.error('Error fetching collaborated clubs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();
  }, []);

  useAnimationFrame((t, delta) => {
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
            <span className="text-[#2ECC71] text-sm">Partners & Sponsors</span>
          </div>
          <h2 className="mb-4 tracking-tight text-white text-5xl">Event Collaborations</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Proud to collaborate with leading institutions, industry partners, and innovation hubs.
          </p>
        </motion.div>

        <div 
          className="relative overflow-hidden mb-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {loading ? (
            <div className="flex items-center justify-center h-48 text-gray-400">
              Loading collaborators...
            </div>
          ) : clubs.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-400">
              No collaborators found
            </div>
          ) : (
            <motion.div
              className="flex gap-6"
              style={{ x }}
            >
              {/* First set of clubs */}
              {clubs.map((club, index) => (
                <div key={`first-${index}`} className="flex-shrink-0 w-64">
                  <Card className="group hover:shadow-[0_0_40px_0_rgba(46,204,113,0.3)] transition-all duration-300 bg-gradient-to-br from-[rgba(46,204,113,0.05)] to-transparent border-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.5)] cursor-pointer backdrop-blur-sm h-48">
                    <CardContent className="p-8 flex items-center justify-center h-full">
                      <img 
                        src={club.imageUrl} 
                        alt={club.name}
                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform"
                      />
                    </CardContent>
                  </Card>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {clubs.map((club, index) => (
                <div key={`second-${index}`} className="flex-shrink-0 w-64">
                  <Card className="group hover:shadow-[0_0_40px_0_rgba(46,204,113,0.3)] transition-all duration-300 bg-gradient-to-br from-[rgba(46,204,113,0.05)] to-transparent border-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.5)] cursor-pointer backdrop-blur-sm h-48">
                    <CardContent className="p-8 flex items-center justify-center h-full">
                      <img 
                        src={club.imageUrl} 
                        alt={club.name}
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
