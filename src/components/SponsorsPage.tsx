import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "motion/react";
import { ArrowLeft, User, Phone } from "lucide-react";
import { Link } from "react-router-dom";

interface Sponsor {
  id: string;
  name: string;
  service: string;
  logoUrl: string;
  priority?: number;
  contactPerson?: string;
  contactNumber?: string;
}

// --- SUB-COMPONENT: 3D Bubble Background (Exactly like Collaborations) ---
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

// --- SUB-COMPONENT: Sponsor Card ---
const SponsorCard = ({ sponsor, idx }: { sponsor: Sponsor; idx: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.05 }}
      className="group relative bg-[#0a0a0a] border border-white/5 rounded-2xl p-4 pb-6 flex flex-col items-center text-center transition-all duration-500 hover:border-[#2ECC71]/40 hover:bg-[#111] shadow-2xl h-full min-h-[280px]"
    >
      {/* Logo Container */}
      <div className="w-full aspect-square bg-white rounded-xl flex items-center justify-center p-4 mb-4 overflow-hidden shadow-inner">
        <img
          src={sponsor.logoUrl}
          alt={sponsor.name}
          className="max-h-full max-w-full object-contain transition-transform group-hover:scale-110 duration-700"
        />
      </div>

      <div className="w-full flex flex-col items-center flex-grow">
        <h3 className="text-white font-bold text-sm leading-tight uppercase tracking-tight mb-1">
          {sponsor.name}
        </h3>

        <p className="text-[#2ECC71] text-[10px] font-black uppercase tracking-widest mb-3">
          {sponsor.service}
        </p>

        {/* Optional Contact Info that appears on hover */}
        {(sponsor.contactPerson || sponsor.contactNumber) && (
          <div className="mt-auto pt-2 flex flex-col items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {sponsor.contactPerson && (
              <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                <User size={10} /> {sponsor.contactPerson}
              </span>
            )}
            {sponsor.contactNumber && (
              <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                <Phone size={10} /> {sponsor.contactNumber}
              </span>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export function SponsorsPage() {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "sponsors"));
        const data = querySnapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() }) as Sponsor,
        );
        const sortedData = data.sort(
          (a, b) => (a.priority || 99) - (b.priority || 99),
        );
        setSponsors(sortedData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSponsors();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white selection:bg-[#2ECC71]/30 overflow-x-hidden">
      <BubbleBackground />

      <main className="relative z-10 max-w-7xl mx-auto pt-24 pb-20 px-6">
        {/* Navigation & Header Section (Identical to Collaborations) */}
        <div className="relative mb-4">
          {/* Back Button */}
          <Link
            to="/"
            className="absolute left-0 top-2 text-[#2ECC71] hover:text-white transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>

          {/* Centered Title */}
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight text-center text-[#2ECC71]">
            Our Sponsors
          </h1>
        </div>

        

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-12 h-12 border-2 border-[#2ECC71] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          /* Professional 6-column grid */
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 items-start">
            {sponsors.map((s, idx) => (
              <SponsorCard key={s.id} sponsor={s} idx={idx} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
