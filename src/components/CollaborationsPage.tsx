import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "motion/react";
import { ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";

interface Collab {
  id: string;
  clubName: string;
  eventName: string;
  logoUrl: string;
}

// --- SUB-COMPONENT: 3D Bubble Background ---
const BubbleBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
    {[...Array(6)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-gradient-to-br from-[#2ECC71]/15 to-transparent blur-3xl"
        style={{
          width: Math.random() * 250 + 150,
          height: Math.random() * 250 + 150,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
        }}
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15 + i * 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// --- SUB-COMPONENT: Expandable Card ---
const CollabCard = ({ collab, idx }: { collab: Collab; idx: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.05 }}
      // Standardized height and padding for a professional grid look
      className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 pb-6 flex flex-col items-center text-center transition-all duration-500 hover:border-[#2ECC71]/40 hover:bg-[#111] shadow-2xl h-full min-h-[300px]"
    >
      {/* Logo Container with White Background for visibility */}
      <div className="w-full aspect-square bg-white rounded-xl flex items-center justify-center p-4 mb-4 overflow-hidden shadow-inner shrink-0">
        <img
          src={collab.logoUrl}
          alt={collab.clubName}
          className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110 duration-700"
        />
      </div>

      <div className="w-full flex flex-col items-center flex-grow">
        <h3 className="text-white font-bold text-sm leading-tight uppercase tracking-tight mb-2">
          {collab.clubName}
        </h3>

        {/* Updated wrapper to flex-col and flex-grow to handle button alignment */}
        <div className="relative w-full flex flex-col flex-grow">
          <p
            className={`text-zinc-500 text-[11px] leading-relaxed transition-all duration-300 ${isExpanded ? "" : "line-clamp-3"}`}
          >
            {collab.eventName}
          </p>

          {/* Fixed Threshold: Added mt-auto to align buttons across cards */}
          {collab.eventName.length > 50 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="mt-auto pt-3 flex items-center gap-1 text-[#2ECC71] text-[9px] font-black uppercase tracking-widest hover:text-white transition-colors mx-auto relative z-10"
            >
              {isExpanded ? (
                <>
                  See Less <ChevronUp size={12} />
                </>
              ) : (
                <>
                  See More <ChevronDown size={12} />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export function CollaborationsPage() {
  const [collabs, setCollabs] = useState<Collab[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollabs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "collaborations"));
        const data = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() }) as Collab,
        );
        setCollabs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCollabs();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#2ECC71]/30 overflow-x-hidden">
      <BubbleBackground />

      <main className="relative z-10 max-w-7xl mx-auto pt-24 pb-20 px-6">
        {/* Navigation & Header Section */}
        <div className="relative mb-8">
          {/* Back Button (Green Icon as per screenshot) */}
          <Link
            to="/"
            className="absolute left-0 top-2 text-[#2ECC71] hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>

          {/* Centered Title */}
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-center text-[#2ECC71]">
            Event Collaborations
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-2 border-[#2ECC71] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          /* Grid: Removed items-start to allow cards to match height within the row */
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {collabs.map((c, idx) => (
              <CollabCard key={c.id} collab={c} idx={idx} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
