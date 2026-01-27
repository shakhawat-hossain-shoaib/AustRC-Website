import { motion, useScroll, useTransform, useSpring, useInView } from 'motion/react';
import { Code2, Users, Sparkles, ChevronLeft, Zap, Heart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';

// Mobile detection hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return isMobile;
};

// Import social icons from assets
import FacebookIcon from '@/assets/icons/facebook.png';
import LinkedinIcon from '@/assets/icons/linkedin.png';
import GithubIcon from '@/assets/icons/github.png';
import EmailIcon from '@/assets/icons/email.png';

// Developer images from ImageKit
const AhnafAmer = "https://ik.imagekit.io/mekt2pafz/Web%20site%20team/Ahnaf%20Amer.jpg";
const SaobiaIslam = "https://ik.imagekit.io/mekt2pafz/Web%20site%20team/Saobia%20Islam%20-%20Saobia%20Islam%20(Tinni).png";
const ShajedulKabir = "https://ik.imagekit.io/mekt2pafz/Web%20site%20team/Shajedul%20Kabir%20Rafi.jpg";
const SamantaIslam = "https://ik.imagekit.io/mekt2pafz/Web%20site%20team/Samanta%20Islam%20-%20Samanta%20Islam.jpg";
const AranyHasan = "https://ik.imagekit.io/mekt2pafz/Web%20site%20team/Arany%20-%20Arany%20Hasan.jpeg";
const RehnumaTarannum = "https://ik.imagekit.io/mekt2pafz/Web%20site%20team/10000697971%20-%20Rehnuma%20Tarannum%20Ramisha.jpg";
const ShakhawatHossain = "https://ik.imagekit.io/mekt2pafz/Web%20site%20team/out.-01%20-%20Shakhawat%20Hossain%20(Shoaib).jpeg";
const AsifLimon = "https://ik.imagekit.io/mekt2pafz/Web%20site%20team/Screenshot_20250330-204933.Photos%20-%20Asif%20Limon.png";
const SaidulIslam = "https://ik.imagekit.io/mekt2pafz/Web%20site%20team/shehab.jpg";

const FahmidSiddique = "https://ik.imagekit.io/mekt2pafz/Web%20site%20team/Fahmid_Siddique_CSE_1.1%20-%20Fahmid%20Siddique%20Ahmed.jpg";
const FarhanaRahman = "https://ik.imagekit.io/mekt2pafz/Web%20site%20team/IMG-20251231-WA0058%20-%20Farhana%20Rahman.jpg";
const ObaidulEkram = "https://ik.imagekit.io/mekt2pafz/Web%20site%20team/WhatsApp%20Image%202025-01-17%20at%2015.48.50%20-%20Mohammad%20Obaidul%20Ekram%20Riad.jpeg";

interface Developer {
  name: string;
  role: string;
  designation: string;
  image: string;
  facebook?: string;
  linkedin?: string;
  github?: string;
  email?: string;
  isModerator?: boolean;
}

const moderator: Developer = {
  name: "Ahnaf Amer",
  role: "Director",
  designation: "Web Development Team, Fall 2024",
  image: AhnafAmer,
  facebook: "https://www.facebook.com/ahnaf.amer.96",
  linkedin: "https://www.linkedin.com/in/ahnaf-amer-085211244/",
  github: "https://github.com/Ahnaf152020",
  email: "ahnafamer15@gmail.com",
  isModerator: true
};

const developers: Developer[] = [
  {
    name: "Saobia Islam Tinni",
    role: "Assistant Director",
    designation: "Web Development Team, Fall 2024",
    image: SaobiaIslam,
    facebook: "https://www.facebook.com/share/17ssRLbmag/",
    linkedin: "https://www.linkedin.com/in/saobia-islam-1b173b284/",
    github: "https://github.com/Saobia3i",
    email: "islamsaobia@gmail.com"
  },
  {
    name: "Shajedul Kabir Rafi",
    role: "Senior Sub Executive",
    designation: "Web Development Team, Fall 2024",
    image: ShajedulKabir,
    facebook: "https://www.facebook.com/shajidul.kabir.5",
    github: "https://github.com/Rafi12234",
    email: "shajidulkabir12345@gmail.com"
  },
  {
    name: "Samanta Islam",
    role: "Senior Sub Executive",
    designation: "Web Development Team, Fall 2024",
    image: SamantaIslam,
    facebook: "https://www.facebook.com/samanta.islam.750331",
    github: "https://github.com/Samanta503",
    email: "samsamanta357@gmail.com"
  },
  {
    name: "Arany Hasan",
    role: "Deputy Executive",
    designation: "Web Development Team, Fall 2024",
    image: AranyHasan,
    facebook: "https://www.facebook.com/arany.hasan",
    linkedin: "https://www.linkedin.com/in/arany-hasan-79b910338",
    github: "https://github.com/arany677",
    email: "aranyhasan677@gmail.com"
  },
  {
    name: "Rehnuma Tarannum Ramisha",
    role: "Deputy Executive",
    designation: "Web Development Team, Fall 2024",
    image: RehnumaTarannum,
    facebook: "https://www.facebook.com/share/14QhrzCak7g/",
    linkedin: "https://www.linkedin.com/in/rehnuma-tarannum-694993285",
    github: "https://github.com/rehnuma267",
    email: "rehnuma.cse.20220204063@aust.edu"
  },
  {
    name: "Shakhawat Hossain",
    role: "Sub Executive",
    designation: "Web Development Team, Fall 2024",
    image: ShakhawatHossain,
    facebook: "https://www.facebook.com/share/17yHbyM6hj/",
    linkedin: "https://www.linkedin.com/in/shakhawat--hossain--shoaib",
    github: "https://github.com/shakhawat-hossain-shoaib",
    email: "shakhawathossainshoaib@gmail.com"
  },
  {
    name: "Asif Iqbal Limon",
    role: "Senior Sub Executive",
    designation: "Web Development Team, Fall 2024",
    image: AsifLimon,
    facebook: "https://www.facebook.com/Asiflimon17/",
    github: "https://github.com/neoFlare19",
    email: "limonasif90@gmail.com"
  },
  {
    name: "Saidul Islam Shehab",
    role: "Sub Executive",
    designation: "Web Development Team, Fall 2024",
    image: SaidulIslam,
    facebook: "https://www.facebook.com/saidul.islam.shehab.me",
    github: "https://github.com/saidulislamshehab",
    email: "saidulislamshehab@gmail.com"
  },
  {
    name: "Fahmid Siddique Ahmed",
    role: "Sub Executive",
    designation: "Web Development Team, Fall 2024",
    image: FahmidSiddique,
    facebook: "http://facebook.com/patrick.hohenhiem",
    linkedin: "http://linkedin.com/in/fahmid-siddique-83201b231",
    github: "http://github.com/itsFahmid",
    email: "fahmid.cse.20230104046@aust.edu"
  },
  {
    name: "Farhana Rahman",
    role: "Sub Executive",
    designation: "Web Development Team, Fall 2024",
    image: FarhanaRahman,
    facebook: "https://www.facebook.com/share/1BvnuR2PdZ/",
    linkedin: "https://www.linkedin.com/in/farhana-rahman-9852a6268/",
    github: "https://github.com/Farhana7321",
    email: "farhanarahman736@gmail.com"
  },
  {
    name: "Mohammad Obaidul Ekram Riad",
    role: "Sub Executive",
    designation: "Web Development Team, Fall 2024",
    image: ObaidulEkram,
    facebook: "https://www.facebook.com/obaidul.ekram",
    linkedin: "https://www.linkedin.com/in/mohammad-obaidul-ekram-riad-4245b61b2/",
    github: "https://github.com/riadekram410",
    email: "riadekram410@gmail.com"
  }
];

// Floating Particles Component - Optimized for mobile
const FloatingParticles = ({ isMobile }: { isMobile: boolean }) => {
  // Reduce particles significantly on mobile
  const particleCount = isMobile ? 0 : 15;
  const particles = Array.from({ length: particleCount }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 15 + 12,
    delay: Math.random() * 5,
  }));

  if (isMobile) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ transform: 'translateZ(0)' }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#2ECC71]"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            transform: 'translateZ(0)',
          }}
          animate={{
            y: [0, -80, 0],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Animated Grid Lines - Desktop only
const GridLines = ({ isMobile }: { isMobile: boolean }) => {
  if (isMobile) return null;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
      <svg className="w-full h-full">
        <defs>
          <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#2ECC71" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-[#2ECC71] to-transparent opacity-20"
        style={{ height: '2px' }}
        animate={{ y: ['-100%', '100vh'] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

// Animated Code Lines
const CodeLines = () => {
  const codeSnippets = [
    "const team = await buildAmazing();",
    "function createMagic() { return ✨; }",
    "npm install creativity passion",
    "<Developer passion={∞} />",
    "git commit -m 'Made it awesome'",
    "while(true) { innovate(); }",
  ];

  return (
    <div className="absolute left-4 top-1/4 hidden xl:block pointer-events-none">
      {codeSnippets.map((code, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: [0, 0.3, 0], x: [-50, 0, 50] }}
          transition={{
            duration: 8,
            delay: index * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-[#2ECC71] font-mono text-xs mb-4 whitespace-nowrap"
        >
          {code}
        </motion.div>
      ))}
    </div>
  );
};

// Enhanced Social Link - Simplified for better performance
const SocialLink = ({ href, icon, label, isMobile = false }: { href?: string; icon: string; label: string; isMobile?: boolean }) => {
  if (!href) return null;
  
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="relative w-11 h-11 bg-[rgba(46,204,113,0.1)] border border-[rgba(46,204,113,0.3)] rounded-full flex items-center justify-center overflow-hidden group"
      whileHover={isMobile ? {} : { scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
    >
      {!isMobile && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      )}
      
      <img 
        src={icon} 
        alt={label} 
        className="w-5 h-5 object-contain relative z-10 group-hover:brightness-0 group-hover:invert transition-all duration-300" 
      />
    </motion.a>
  );
};

// Enhanced Developer Card - Optimized for mobile
const DeveloperCard = ({ developer, index, isMobile }: { developer: Developer; index: number; isMobile: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const springConfig = { stiffness: 150, damping: 15 };
  const rotateX = useSpring(mousePosition.y * -20, springConfig);
  const rotateY = useSpring(mousePosition.x * 20, springConfig);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.5, 
        delay: isMobile ? 0 : index * 0.08,
      }}
      className="group relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      style={{ transform: 'translateZ(0)' }}
    >
      <motion.div
        className="relative bg-gradient-to-br from-[rgba(46,204,113,0.08)] to-transparent border border-[rgba(46,204,113,0.2)] rounded-2xl p-6 overflow-hidden"
        style={isMobile ? {} : {
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
        whileHover={isMobile ? {} : { 
          borderColor: "rgba(46,204,113,0.6)",
          boxShadow: "0 15px 30px -10px rgba(46,204,113,0.2)",
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Decorative corners - Desktop only */}
        {!isMobile && (
          <>
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-[#2ECC71] rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-[#2ECC71] rounded-br-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          </>
        )}
        
        {/* Hover glow - Desktop only */}
        {!isMobile && isHovered && (
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#2ECC71] rounded-full opacity-20" style={{ filter: 'blur(60px)' }} />
        )}
        
        <div className="relative z-10">
          <div className="relative mx-auto w-28 aspect-square mb-4">
            {/* Rotating borders - Desktop only */}
            {!isMobile && (
              <>
                <motion.div
                  className="absolute inset-[-4px] rounded-full border border-[rgba(46,204,113,0.3)]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
              </>
            )}
            
            {/* Static glow on mobile, animated on desktop */}
            <div 
              className="absolute inset-0 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-full opacity-40"
              style={{ filter: 'blur(8px)' }}
            />
            
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-[rgba(46,204,113,0.5)] group-hover:border-[#2ECC71] transition-all duration-300">
              {developer.image ? (
                <img
                  src={developer.image}
                  alt={developer.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[rgba(46,204,113,0.3)] to-[rgba(39,174,96,0.3)] flex items-center justify-center">
                  <span className="text-3xl font-bold text-[#2ECC71]">
                    {developer.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              )}
            </div>

            <motion.div
              className="absolute bottom-1 right-1 w-4 h-4 bg-[#2ECC71] rounded-full border-2 border-black"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          <motion.div 
            className="text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.h3 
              className="text-lg font-semibold text-white mb-1 group-hover:text-[#2ECC71] transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
            >
              {developer.name}
            </motion.h3>
            <motion.div
              className="flex items-center justify-center gap-2 mb-1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Star className="w-3 h-3 text-[#2ECC71]" />
              <p className="text-[#2ECC71] text-sm font-medium">{developer.role}</p>
            </motion.div>
            <motion.p 
              className="text-gray-500 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {developer.designation}
            </motion.p>
          </motion.div>

          <motion.div 
            className="flex justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <SocialLink href={developer.facebook} icon={FacebookIcon} label="Facebook" isMobile={isMobile} />
            <SocialLink href={developer.linkedin} icon={LinkedinIcon} label="LinkedIn" isMobile={isMobile} />
            <SocialLink href={developer.github} icon={GithubIcon} label="GitHub" isMobile={isMobile} />
            {developer.email && (
              <SocialLink href={`mailto:${developer.email}`} icon={EmailIcon} label="Email" isMobile={isMobile} />
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Enhanced Moderator Card - Optimized for mobile
const ModeratorCard = ({ developer, isMobile }: { developer: Developer; isMobile: boolean }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="group relative max-w-xl mx-auto"
      style={{ transform: 'translateZ(0)' }}
    >
      {/* Background glow - Simplified on mobile */}
      <div 
        className="absolute -inset-1 bg-gradient-to-r from-[#2ECC71] via-[#27AE60] to-[#2ECC71] rounded-3xl opacity-30"
        style={{ filter: isMobile ? 'blur(10px)' : 'blur(16px)' }}
      />
      
      {/* Rotating border - Desktop only */}
      {!isMobile && (
        <motion.div
          className="absolute -inset-[2px] rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(90deg, #2ECC71, transparent, #2ECC71)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      )}
      
      <div className="relative bg-gradient-to-br from-[rgba(46,204,113,0.15)] via-[rgba(46,204,113,0.05)] to-[rgba(0,0,0,0.8)] border border-[rgba(46,204,113,0.4)] rounded-3xl p-8 overflow-hidden">
        {/* Static background gradient */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(46,204,113,0.3), transparent 50%), radial-gradient(circle at 70% 70%, rgba(39,174,96,0.3), transparent 50%)"
          }}
        />
        
        {/* Team Lead Badge */}
        <div className="absolute top-4 right-4 z-20">
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] px-4 py-2 rounded-full">
            <Sparkles className="w-4 h-4 text-black" />
            <span className="text-xs font-bold text-black tracking-wider">TEAM LEAD</span>
          </div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-center pt-4">
          <div className="relative mb-6">
            {/* Rotating border - Desktop only */}
            {!isMobile && (
              <motion.div
                className="absolute -inset-4 rounded-full"
                style={{
                  background: 'conic-gradient(from 0deg, #2ECC71, transparent, #2ECC71)',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
            )}
            
            {/* Static glow */}
            <div
              className="absolute -inset-3 rounded-full opacity-50"
              style={{
                background: 'linear-gradient(90deg, #2ECC71, #27AE60, #2ECC71)',
                filter: 'blur(12px)',
              }}
            />
            
            <div 
              className="relative rounded-full overflow-hidden border-[3px] border-[#2ECC71] shadow-[0_0_30px_rgba(46,204,113,0.4)]"
              style={{ width: '200px', height: '200px' }}
            >
              <img
                src={developer.image}
                alt={developer.name}
                className="w-full h-full object-cover"
                style={{ width: '200px', height: '200px' }}
                loading="lazy"
              />
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-[#2ECC71] transition-colors duration-300">
              {developer.name}
            </h3>
            <div className="flex items-center justify-center gap-2">
              <Code2 className="w-5 h-5 text-[#2ECC71]" />
              <p className="text-[#2ECC71] font-semibold text-lg">{developer.role}</p>
            </div>
            <p className="text-gray-400">{developer.designation}</p>
          </div>

          <div className="flex justify-center gap-3 mt-6">
            <SocialLink href={developer.facebook} icon={FacebookIcon} label="Facebook" isMobile={isMobile} />
            <SocialLink href={developer.linkedin} icon={LinkedinIcon} label="LinkedIn" isMobile={isMobile} />
            <SocialLink href={developer.github} icon={GithubIcon} label="GitHub" isMobile={isMobile} />
            {developer.email && (
              <SocialLink href={`mailto:${developer.email}`} icon={EmailIcon} label="Email" isMobile={isMobile} />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Section Divider Component
const SectionDivider = ({ title, icon: Icon }: { title: string; icon: React.ElementType }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-center gap-4 my-12"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="h-px bg-gradient-to-r from-transparent to-[#2ECC71] flex-1 max-w-[100px]"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ transformOrigin: "right" }}
      />
      <motion.div
        className="flex items-center gap-3 px-6 py-3 bg-[rgba(46,204,113,0.1)] border border-[rgba(46,204,113,0.3)] rounded-full"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
        whileHover={{ scale: 1.05 }}
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        >
          <Icon className="w-5 h-5 text-[#2ECC71]" />
        </motion.div>
        <span className="text-white font-semibold text-lg">{title}</span>
      </motion.div>
      <motion.div
        className="h-px bg-gradient-to-l from-transparent to-[#2ECC71] flex-1 max-w-[100px]"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ transformOrigin: "left" }}
      />
    </motion.div>
  );
};

export function DevelopersPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const isMobile = useIsMobile();
  
  const headerY = useTransform(smoothProgress, [0, 0.3], [0, -50]);
  const headerOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0.8]);

  return (
    <div ref={containerRef} className="min-h-screen bg-black relative overflow-hidden" style={{ position: 'relative' }}>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />
      
      {/* Animated Background - Optimized for mobile */}
      <div className="absolute inset-0" style={{ transform: 'translateZ(0)' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        
        {/* Large gradient orbs - None on mobile, animated on desktop */}
        {!isMobile && (
          <>
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[rgba(46,204,113,0.1)] via-transparent to-[rgba(46,204,113,0.1)]"
              style={{ filter: 'blur(64px)' }}
              animate={{ opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute top-20 -left-40 w-[500px] h-[500px] bg-[#2ECC71] rounded-full opacity-20"
              style={{ filter: 'blur(120px)' }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.2, 0.15] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-20 -right-40 w-[600px] h-[600px] bg-[#27AE60] rounded-full opacity-20"
              style={{ filter: 'blur(120px)' }}
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.15, 0.2] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
          </>
        )}
      </div>

      {/* Additional Animated Elements - Desktop only */}
      <FloatingParticles isMobile={isMobile} />
      <GridLines isMobile={isMobile} />
      {!isMobile && <CodeLines />}

      <div className="relative z-10 container mx-auto px-4 py-24">
        {/* Animated Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mb-8"
        >
          <Link
            to="/"
            className="group inline-flex items-center gap-2 text-gray-400 hover:text-[#2ECC71] transition-colors duration-300 relative"
          >
            <motion.div
              className="absolute -inset-2 bg-[rgba(46,204,113,0.1)] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
            />
            <motion.div
              whileHover={{ x: -5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ChevronLeft className="w-5 h-5 relative z-10" />
            </motion.div>
            <span className="relative z-10">Back to Home</span>
          </Link>
        </motion.div>

        {/* Enhanced Header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-[rgba(46,204,113,0.1)] border border-[rgba(46,204,113,0.3)] rounded-full px-5 py-2.5 mb-8"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: "spring" }}
            whileHover={{ scale: 1.05, borderColor: "rgba(46,204,113,0.6)" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-4 h-4 text-[#2ECC71]" />
            </motion.div>
            <span className="text-[#2ECC71] text-sm font-medium">The Team Behind The Magic</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="w-4 h-4 text-[#2ECC71]" />
            </motion.div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.span 
              className="text-white inline-block"
              whileHover={{ scale: 1.02 }}
            >
              Meet Our{" "}
            </motion.span>
            <motion.span 
              className="bg-gradient-to-r from-[#2ECC71] via-[#27AE60] to-[#2ECC71] bg-clip-text text-transparent inline-block"
              animate={{ 
                backgroundPosition: ["0%", "100%", "0%"],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: "200% 100%" }}
            >
              Developers
            </motion.span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
          >
            The talented individuals who brought this website to life with passion, creativity, and countless lines of code.
          </motion.p>

          {/* Animated decorative lines */}
          <div className="flex items-center justify-center gap-2 mt-8">
            <motion.div
              className="h-1 bg-gradient-to-r from-transparent via-[#2ECC71] to-transparent rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 80, opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <Heart className="w-6 h-6 text-[#2ECC71]" />
            </motion.div>
            <motion.div
              className="h-1 bg-gradient-to-r from-transparent via-[#2ECC71] to-transparent rounded-full"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 80, opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            />
          </div>
        </motion.div>

        {/* Moderator Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-20 mb-20"
        >
          <div className="mb-10 mt-8">
            <SectionDivider title="Team Lead" icon={Code2} />
          </div>
          <ModeratorCard developer={moderator} isMobile={isMobile} />
        </motion.div>

        {/* Developers Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="mt-8 mb-10">
            <SectionDivider title="Development Team" icon={Users} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {developers.map((developer, index) => (
              <DeveloperCard key={developer.name} developer={developer} index={index} isMobile={isMobile} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}