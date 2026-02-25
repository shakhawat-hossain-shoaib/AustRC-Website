import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Quote } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/config/firebase";

const testimonials = [
  {
    name: "Alex Thompson",
    role: "Alumni, Software Engineer at Tesla",
    content:
      "AUSRC gave me the foundation I needed to pursue my dreams in robotics. The mentorship and hands-on projects were invaluable.",
    initials: "AT",
  },
  {
    name: "Priya Sharma",
    role: "Current Member, Research Assistant",
    content:
      "The research opportunities and collaborative environment at AUSRC have accelerated my learning beyond anything I imagined.",
    initials: "PS",
  },
  {
    name: "Marcus Johnson",
    role: "Alumni, Robotics Engineer",
    content:
      "Being part of AUSRC was transformative. I learned not just technical skills, but also how to work in teams and lead projects.",
    initials: "MJ",
  },
  {
    name: "Sophie Chen",
    role: "Current Member, Team Leader",
    content:
      "The community at AUSRC is amazing. Everyone is passionate, supportive, and driven to create innovative solutions.",
    initials: "SC",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselImages, setCarouselImages] = useState<string[]>([]);
  const [cachedImages, setCachedImages] = useState<{ [key: string]: string }>({});
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const lastClickTime = useRef(0);

  // clicking the carousel shouldn't advance it, just pause playback
  const handleCarouselClick = useCallback(() => {
    setIsPaused(true);
  }, []);

  // Fetch images from Firebase
  useEffect(() => {
    const fetchVoiceImages = async () => {
      try {
        const docRef = doc(db, "All_Data", "Voice_of_AUSTRC");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const imageUrls = [
            data.Voice_1,
            data.Voice_2,
            data.Voice_3,
            data.Voice_4,
          ].filter(Boolean);

          setCarouselImages(imageUrls);
        }
      } catch (error) {
        console.error("Error fetching Voice of AUSTRC images:", error);
      }
    };

    fetchVoiceImages();
  }, []);

  // Cache images
  useEffect(() => {
    const cacheImages = async () => {
      const cached: { [key: string]: string } = {};

      for (let i = 0; i < carouselImages.length; i++) {
        const imageUrl = carouselImages[i];
        if (imageUrl) {
          try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onload = () => {
              cached[`voice_${i}`] = reader.result as string;
              if (Object.keys(cached).length === carouselImages.length) {
                setCachedImages(cached);
              }
            };
            reader.readAsDataURL(blob);
          } catch (error) {
            cached[`voice_${i}`] = imageUrl; // fallback to original URL
          }
        }
      }

      if (carouselImages.length === 0) {
        setCachedImages({});
      }
    };

    if (carouselImages.length > 0) {
      cacheImages();
    }
  }, [carouselImages]);

  // Carousel interval
  useEffect(() => {
    if (carouselImages.length === 0) return;

    const interval = setInterval(() => {
      if (!isPaused) {
        setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [carouselImages.length, isPaused]);

  // Resume when clicking/touching outside the carousel
  useEffect(() => {
    const handleDocumentInteraction = (e: MouseEvent | TouchEvent) => {
      if (carouselRef.current && !carouselRef.current.contains(e.target as Node)) {
        setIsPaused(false);
      }
    };

    document.addEventListener("click", handleDocumentInteraction);
    document.addEventListener("touchstart", handleDocumentInteraction);

    return () => {
      document.removeEventListener("click", handleDocumentInteraction);
      document.removeEventListener("touchstart", handleDocumentInteraction);
    };
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-[#2ECC71] rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="text-center mb-8 sm:mb-12 px-4"
        >
          <h2 className="tracking-tight text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            VOICE OF AUSTRC
          </h2>
        </motion.div>

        {/* Carousel */}
        <div className="flex justify-center w-full px-4 sm:px-6 md:px-0 max-w-3xl mx-auto">
          {/* Single Carousel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35 }}
            style={{ perspective: "1000px" }}
            className="mx-auto w-full max-w-md"
          >
            <div
              ref={carouselRef}
              className="relative aspect-square w-full overflow-hidden rounded-2xl border border-[rgba(46,204,113,0.3)] shadow-[0_0_50px_0_rgba(46,204,113,0.4)] cursor-pointer max-w-full"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              onClick={handleCarouselClick}
            >
              <AnimatePresence mode="wait">
                {carouselImages.length > 0 && (
                  <motion.img
                    key={carouselIndex}
                    src={cachedImages[`voice_${carouselIndex}`] || carouselImages[carouselIndex]}
                    alt={`Voice of AUSTRC - Image ${carouselIndex + 1}`}
                    className="w-full h-full object-cover"
                    initial={{
                      opacity: 0,
                      x: 40
                    }}
                    animate={{
                      opacity: 1,
                      x: 0
                    }}
                    exit={{
                      opacity: 0,
                      x: -40
                    }}
                    transition={{
                      duration: 0.5,
                      ease: "easeOut"
                    }}
                  />
                )}
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6">
                <h3 className="text-white mb-1 sm:mb-2 text-sm sm:text-base">
                  Community Voice
                </h3>
                <p className="text-gray-300 text-xs sm:text-sm">
                  Stories and experiences from AUSTRC members
                </p>
              </div>
              {/* Dots Indicator */}
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex gap-1.5 sm:gap-2">
                {carouselImages.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all ${index === carouselIndex
                      ? "bg-[#2ECC71] w-4 sm:w-6 shadow-[0_0_10px_0_rgba(46,204,113,0.8)]"
                      : "bg-gray-500"
                      }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}