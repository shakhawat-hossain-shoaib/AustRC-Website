import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, Sparkles, User, CheckCircle } from 'lucide-react';

// --- Configuration ---
const COLLECTION_PATHS: Record<string, string[]> = {
  'mentorship': ['All_Data', 'Educational, Mentorship & Training Programs', 'educational, mentorship & training programs'],
  'educational-activities': ['All_Data', 'Educational, Mentorship & Training Programs', 'educational, mentorship & training programs'],
  'workshops': ['All_Data', 'Educational,Workshops & Seminar', 'educational,Workshops & Seminar'],
  'research': ['All_Data', 'Research_Projects', 'research_projects']
};

interface ActivityDetail {
  id: string;
  Name: string;
  Image: string;
  Description: string;
  Status: string;
  Date?: string;
  Facilitator?: string;
}

// --- Typing Effect Component ---
const TypewriterText = ({ text }: { text: string }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    setDisplayedText(""); 
    let i = 0;
    
    if (!text) return;

    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text.slice(i, i + 2)); 
      i += 2;
      if (i >= text.length) {
        clearInterval(intervalId);
        setDisplayedText(text);
      }
    }, 10);

    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line font-light">
      {displayedText}
      <span className="inline-block w-1.5 h-5 ml-1 bg-[#2ECC71] animate-pulse align-middle" />
    </p>
  );
};

// --- Main Page Component ---
export function ActivityDetailPage() {
  const { category, id } = useParams();
  const navigate = useNavigate(); 
  const [data, setData] = useState<ActivityDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!category || !id || !COLLECTION_PATHS[category]) {
        console.error("Invalid parameters");
        setLoading(false);
        return;
      }

      try {
        const pathSegments = COLLECTION_PATHS[category];
        // @ts-ignore
        const docRef = doc(db, ...pathSegments, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const raw = docSnap.data();
          
          // Image Logic
          let displayImage = raw.Image || raw.imgUrl || raw.Image_1 || raw.image_1 || '';
          if (!displayImage) {
             for(let i=1; i<=10; i++) {
                if(raw[`Image_${i}`]) {
                   displayImage = raw[`Image_${i}`];
                   break;
                }
             }
          }

          setData({
            id: docSnap.id,
            Name: raw.Name || raw.name || raw.Title || raw.title || 'Untitled',
            Image: displayImage,
            Description: raw.Description || raw.description || 'No description available.',
            Status: raw.Status || 'Active',
            Date: raw.Date || raw.date,
            Facilitator: raw.Facilitator || raw.facilitator
          });
        }
      } catch (error) {
        console.error("Error fetching detail:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [category, id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#2ECC71] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white pt-32">
        <h2 className="text-2xl font-bold mb-4 text-[#2ECC71]">Content Not Found</h2>
        <button 
          onClick={() => navigate(-1)}
          className="px-6 py-2 border border-[#2ECC71] text-[#2ECC71] rounded-full hover:bg-[#2ECC71] hover:text-black transition-all"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-[#2ECC71]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ✅ FIX 1: Dedicated Spacer Div to push content below navbar */}
      <div className="h-32 md:h-40 w-full" />

      {/* Main Container */}
      <div className="container mx-auto px-6 max-w-5xl relative z-10 pb-32">
        
        {/* ✅ FIX 2: Back Button Container - High Z-Index & bright colors */}
        <div className="w-full flex justify-start mb-8 relative z-50">
          <button 
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 border border-[#2ECC71]/30 rounded-full text-[#2ECC71] hover:bg-[#2ECC71] hover:text-black transition-all duration-300 cursor-pointer shadow-lg backdrop-blur-md"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-bold tracking-wide">Back</span>
          </button>
        </div>

        {/* Content Wrapper */}
        <div className="flex flex-col items-center">
          
          {/* 1. TITLE */}
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-center text-white mb-8 leading-tight drop-shadow-[0_0_15px_rgba(46,204,113,0.3)]"
          >
            {data.Name}
          </motion.h1>

          {/* 2. METADATA */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-4 mb-10"
          >
            <span className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#2ECC71]/30 bg-[#2ECC71]/10 text-[#2ECC71] text-sm font-medium">
              <CheckCircle className="w-4 h-4" /> {data.Status}
            </span>
            
            {data.Date && (
              <span className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm">
                <Calendar className="w-4 h-4 text-[#2ECC71]" /> {data.Date}
              </span>
            )}
            
            {data.Facilitator && (
              <span className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-gray-300 text-sm">
                <User className="w-4 h-4 text-[#2ECC71]" /> {data.Facilitator}
              </span>
            )}
          </motion.div>

          {/* 3. IMAGE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border border-[#2ECC71]/30 bg-[#0a1810] shadow-[0_0_50px_rgba(46,204,113,0.15)] mb-12 relative group"
          >
            {data.Image ? (
              <img src={data.Image} alt={data.Name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Sparkles className="w-20 h-20 text-[#2ECC71]/20" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          </motion.div>

          {/* 4. DESCRIPTION */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-4xl bg-[#0a1810]/50 border border-white/5 p-8 md:p-10 rounded-2xl backdrop-blur-sm mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-1 bg-[#2ECC71] rounded-full" />
              <h3 className="text-xl font-bold text-white uppercase tracking-wider">About This Program</h3>
            </div>
            
            <TypewriterText text={data.Description} />
          </motion.div>

        </div>
      </div>
    </div>
  );
}