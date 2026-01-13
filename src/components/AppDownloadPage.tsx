import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useInView } from 'motion/react';
import { 
  Download, 
  Smartphone, 
  Shield, 
  Zap, 
  Users, 
  AlertCircle, 
  CheckCircle, 
  X, 
  ChevronDown,
  Star,
  Sparkles,
  Bell,
  Calendar,
  MessageSquare,
  Trophy,
  Copy,
  Check,
  Play,
  Heart,
  Share2,
  ArrowRight,
  Rocket,
  Gift,
  Clock,
  MapPin
} from 'lucide-react';
import { Button } from './ui/button';

// Floating Particle Component
const FloatingParticle = ({ delay, duration, size, left, top }: { 
  delay: number; 
  duration: number; 
  size: number; 
  left: string; 
  top: string; 
}) => (
  <motion.div
    className="absolute rounded-full bg-[#2ECC71]"
    style={{ width: size, height: size, left, top }}
    animate={{
      y: [-20, 20, -20],
      x: [-10, 10, -10],
      opacity: [0.2, 0.5, 0.2],
      scale: [1, 1.3, 1],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Glowing Orb Component
const GlowingOrb = ({ className, delay = 0 }: { className: string; delay?: number }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl ${className}`}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
    }}
    transition={{
      duration: 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  
  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [value, isInView]);
  
  return <span ref={ref}>{count}{suffix}</span>;
};

// Notification Popup Component
const NotificationPopup = ({ 
  icon: Icon, 
  title, 
  message, 
  delay, 
  position 
}: { 
  icon: any; 
  title: string; 
  message: string; 
  delay: number;
  position: { top?: string; bottom?: string; left?: string; right?: string };
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8, x: position.right ? 50 : -50 }}
    animate={{ opacity: 1, scale: 1, x: 0 }}
    transition={{ delay, duration: 0.5, type: "spring" }}
    className="absolute bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 shadow-2xl w-56 z-30"
    style={position}
  >
    <motion.div
      animate={{ scale: [1, 1.02, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="flex items-start gap-3"
    >
      <div className="w-10 h-10 bg-[#2ECC71]/20 rounded-xl flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-[#2ECC71]" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-white text-sm font-semibold truncate">{title}</h4>
        <p className="text-gray-400 text-xs mt-0.5 line-clamp-2">{message}</p>
      </div>
    </motion.div>
  </motion.div>
);

// Feature Pill Component
const FeaturePill = ({ 
  icon: Icon, 
  text, 
  delay, 
  position 
}: { 
  icon: any; 
  text: string; 
  delay: number;
  position: { top?: string; bottom?: string; left?: string; right?: string };
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="absolute z-30"
    style={position}
  >
    <motion.div
      animate={{ y: [-5, 5, -5] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="bg-black/80 backdrop-blur-xl border border-[#2ECC71]/30 rounded-full px-4 py-2 flex items-center gap-2 shadow-lg"
    >
      <Icon className="w-4 h-4 text-[#2ECC71]" />
      <span className="text-white text-sm font-medium">{text}</span>
    </motion.div>
  </motion.div>
);

export function AppDownloadPage() {
  const [isAndroid, setIsAndroid] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  
  // Refs for scroll tracking
  const heroRef = useRef<HTMLDivElement>(null);
  const mockupContainerRef = useRef<HTMLDivElement>(null);
  
  // Scroll progress for hero section
  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  // Transform values based on scroll
  const mockupY = useTransform(heroScrollProgress, [0, 1], [0, 200]);
  const mockupScale = useTransform(heroScrollProgress, [0, 0.5, 1], [1, 1.05, 0.8]);
  const mockupRotateX = useTransform(heroScrollProgress, [0, 1], [0, 15]);
  const mockupOpacity = useTransform(heroScrollProgress, [0, 0.8, 1], [1, 1, 0]);
  const contentY = useTransform(heroScrollProgress, [0, 1], [0, 100]);
  const contentOpacity = useTransform(heroScrollProgress, [0, 0.5], [1, 0]);
  
  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 30, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]), springConfig);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    setIsAndroid(/android/i.test(userAgent));
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!mockupContainerRef.current) return;
      const rect = mockupContainerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Auto-rotate features
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleDownload = async () => {
    if (isAndroid) {
      setIsDownloading(true);
      setDownloadProgress(0);
      
      const interval = setInterval(() => {
        setDownloadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setIsDownloading(false);
              const link = document.createElement('a');
              link.href = '/src/assets/APK/app-release.apk';
              link.download = 'AUSTRC-App.apk';
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }, 500);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);
    } else {
      setShowModal(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Optimized for blazing fast performance on all Android devices",
      color: "from-yellow-500 to-orange-500",
      bgColor: "from-yellow-500/20 to-orange-500/20"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Stay Connected",
      description: "Real-time updates about events, workshops, and activities",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Private",
      description: "Industry-standard encryption protects your data",
      color: "from-green-500 to-emerald-500",
      bgColor: "from-green-500/20 to-emerald-500/20"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Native Experience",
      description: "Built specifically for Android with native features",
      color: "from-purple-500 to-pink-500",
      bgColor: "from-purple-500/20 to-pink-500/20"
    }
  ];

  const stats = [
    { value: 500, suffix: '+', label: 'Downloads', icon: Download },
    { value: 4.8, suffix: '', label: 'Rating', icon: Star },
    { value: 67, suffix: 'MB', label: 'Size', icon: Smartphone },
    { value: 100, suffix: '%', label: 'Free', icon: Gift }
  ];

  const appFeatures = [
    { icon: Bell, title: "Smart Notifications", description: "Get instant alerts for events and updates" },
    { icon: Calendar, title: "Event Calendar", description: "Never miss a workshop or competition" },
    { icon: MessageSquare, title: "Community Hub", description: "Connect with fellow members" },
    { icon: Trophy, title: "Achievements", description: "Track progress and earn badges" },
    { icon: MapPin, title: "Event Locations", description: "Find venues with integrated maps" },
    { icon: Clock, title: "Reminders", description: "Set custom reminders for activities" }
  ];

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Animated Background - Fixed */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <GlowingOrb className="w-[800px] h-[800px] bg-[#2ECC71]/20 top-[-200px] left-[-200px]" />
        <GlowingOrb className="w-[600px] h-[600px] bg-[#27AE60]/15 bottom-[-100px] right-[-100px]" delay={1} />
        <GlowingOrb className="w-[400px] h-[400px] bg-[#2ECC71]/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" delay={2} />
        
        {[...Array(20)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.2}
            duration={4 + Math.random() * 4}
            size={3 + Math.random() * 6}
            left={`${Math.random() * 100}%`}
            top={`${Math.random() * 100}%`}
          />
        ))}
        
        <div className="absolute inset-0 bg-[linear-gradient(rgba(46,204,113,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(46,204,113,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,black_70%)]" />
      </div>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[150vh] pt-24"
      >
        {/* Sticky Container for Hero Content */}
        <div className="sticky top-0 min-h-screen flex items-center overflow-hidden">
          <div className="container mx-auto px-4 sm:px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
              {/* Left Content */}
              <motion.div 
                style={{ y: contentY, opacity: contentOpacity }}
                className="flex-1 text-center lg:text-left max-w-xl order-2 lg:order-1"
              >
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#2ECC71]/20 to-[#27AE60]/10 border border-[#2ECC71]/30 rounded-full px-5 py-2.5 mb-6"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="w-4 h-4 text-[#2ECC71]" />
                  </motion.div>
                  <span className="text-[#2ECC71] text-sm font-medium">Version 2.0 Now Available</span>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-2 h-2 bg-[#2ECC71] rounded-full"
                  />
                </motion.div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]"
                >
                  Your Club,
                  <br />
                  <span className="relative inline-block mt-2">
                    <motion.span 
                      className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] via-[#58D68D] to-[#27AE60]"
                      style={{ backgroundSize: '200% 200%' }}
                    >
                      In Your Pocket
                    </motion.span>
                    <motion.div
                      className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-full"
                      initial={{ scaleX: 0, originX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.8 }}
                    />
                  </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-gray-400 text-lg sm:text-xl mb-8 leading-relaxed"
                >
                  Experience AUST Robotics Club like never before. Get instant updates, 
                  connect with members, and access exclusive content — all in one powerful app.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex flex-col sm:flex-row items-center gap-4 mb-10"
                >
                  <Button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="group relative w-full sm:w-auto px-8 py-7 text-lg font-semibold bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#2ECC71] text-white rounded-2xl shadow-[0_0_50px_0_rgba(46,204,113,0.4)] hover:shadow-[0_0_80px_0_rgba(46,204,113,0.6)] transition-all duration-500 overflow-hidden"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                      initial={{ x: '-200%' }}
                      animate={{ x: '200%' }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    />
                    
                    {isDownloading ? (
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>Downloading... {Math.min(Math.round(downloadProgress), 100)}%</span>
                      </div>
                    ) : (
                      <>
                        <Download className="w-6 h-10 mr-3 group-hover:animate-bounce" />
                        <span>Download for Android</span>
                      </>
                    )}
                    
                    {/* <motion.span 
                      className="absolute -top-2 -right-2 bg-white text-[#2ECC71] text-xs font-bold px-3 py-1 rounded-full shadow-lg"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      FREE
                    </motion.span> */}
                  </Button>
                  
                  {/* <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                  >
                    <span className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center group-hover:bg-[#2ECC71]/20 transition-colors">
                      <Play className="w-5 h-5 ml-0.5" />
                    </span>
                    <span className="font-medium">Watch Demo</span>
                  </motion.button> */}
                </motion.div>

                {/* Stats Row */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4"
                >
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-2xl p-4 text-center hover:border-[#2ECC71]/30 transition-all duration-300"
                    >
                      <stat.icon className="w-5 h-5 text-[#2ECC71] mx-auto mb-2" />
                      <div className="text-2xl font-bold text-white">
                        <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-gray-500 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

              {/* Right Content - Mockup with Scroll Animation */}
              <motion.div
                ref={mockupContainerRef}
                style={{ 
                  y: mockupY,
                  scale: mockupScale,
                  rotateX: mockupRotateX,
                  opacity: mockupOpacity,
                  perspective: 1000
                }}
                className="relative order-1 lg:order-2 flex-shrink-0"
              >
                {/* Glow Behind Mockup */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.4, 0.6, 0.4]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-br from-[#2ECC71]/40 to-[#27AE60]/30 blur-[100px] rounded-full scale-75"
                />
                
                {/* Rotating Rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-50px] border border-[#2ECC71]/20 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-100px] border border-dashed border-[#2ECC71]/10 rounded-full"
                />
                
                {/* Notification Popups */}
                <NotificationPopup
                  icon={Calendar}
                  title="New Event!"
                  message="Robotics Workshop starts in 2 hours"
                  delay={1.5}
                  position={{ top: '5%', right: '-60%' }}
                />
                <NotificationPopup
                  icon={Trophy}
                  title="Achievement Unlocked!"
                  message="You've earned the Early Bird badge"
                  delay={2}
                  position={{ bottom: '15%', left: '-65%' }}
                />
                
                {/* Feature Pills */}
                <FeaturePill
                  icon={Zap}
                  text="Fast & Smooth"
                  delay={2.5}
                  position={{ top: '25%', left: '-50%' }}
                />
                <FeaturePill
                  icon={Shield}
                  text="100% Secure"
                  delay={2.8}
                  position={{ bottom: '30%', right: '-45%' }}
                />
                
                {/* Main Mockup with 3D Mouse Effect */}
                <motion.div
                  style={{ rotateX, rotateY }}
                  className="relative z-10"
                >
                  {/* Floating Animation */}
                  <motion.div
                    animate={{ y: [-15, 15, -15] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    {/* Reflection */}
                    <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[80%] h-40 bg-gradient-to-t from-[#2ECC71]/20 to-transparent blur-3xl rounded-full" />
                    
                    {/* Mockup Container */}
                    <div className="relative">
                      {/* Shine Overlay */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-[3rem] z-20 pointer-events-none"
                        animate={{ opacity: [0, 0.5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                      />
                      
                      {/* The Mockup Image */}
                      <motion.img
                        src="/src/assets/mockup.png"
                        alt="AUSTRC Mobile App"
                        className="relative z-10 w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px] h-auto drop-shadow-[0_0_80px_rgba(46,204,113,0.3)]"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      />
                      
                      {/* Rocket Decoration */}
                      <motion.div
                        animate={{ 
                          rotate: 360,
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ 
                          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] rounded-2xl flex items-center justify-center shadow-lg z-20"
                      >
                        <Rocket className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      {/* Floating Icons */}
                      {[Bell, Heart, Star, Share2].map((Icon, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-10 h-10 bg-gray-900/90 backdrop-blur border border-gray-700/50 rounded-xl flex items-center justify-center shadow-lg z-20"
                          style={{
                            top: `${15 + i * 22}%`,
                            [i % 2 === 0 ? 'left' : 'right']: '-20%'
                          }}
                          animate={{ 
                            y: [-8, 8, -8],
                            rotate: [-5, 5, -5]
                          }}
                          transition={{ 
                            duration: 3 + i * 0.5, 
                            repeat: Infinity, 
                            ease: "easeInOut",
                            delay: i * 0.3
                          }}
                        >
                          <Icon className="w-5 h-5 text-[#2ECC71]" />
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-[calc(50vh-80px)] left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-gray-500 cursor-pointer hover:text-[#2ECC71] transition-colors"
          >
            <span className="text-sm font-medium">Scroll to Explore</span>
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.span 
              className="inline-block text-[#2ECC71] text-sm font-semibold tracking-wider uppercase mb-4 px-4 py-2 bg-[#2ECC71]/10 rounded-full border border-[#2ECC71]/20"
              whileHover={{ scale: 1.05 }}
            >
              ✨ Features
            </motion.span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-4">
              Everything You Need,
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] to-[#27AE60]">
                Nothing You Don't
              </span>
            </h2>
            <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
              Packed with powerful features designed to enhance your club experience
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setActiveFeature(index)}
                className={`group relative cursor-pointer ${activeFeature === index ? 'z-10' : ''}`}
              >
                <AnimatePresence>
                  {activeFeature === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} rounded-3xl blur-xl`}
                    />
                  )}
                </AnimatePresence>
                
                <div className={`relative bg-gradient-to-b from-gray-900/90 to-black/90 backdrop-blur-xl p-8 rounded-3xl border transition-all duration-500 h-full ${
                  activeFeature === index ? 'border-[#2ECC71]/50 shadow-[0_0_40px_0_rgba(46,204,113,0.2)]' : 'border-gray-800/50 hover:border-gray-700'
                }`}>
                  <motion.div
                    animate={activeFeature === index ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-white font-bold text-xl mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                  
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: activeFeature === index ? 1 : 0, x: activeFeature === index ? 0 : -10 }}
                    className="mt-4 flex items-center gap-2 text-[#2ECC71]"
                  >
                    <span className="text-sm font-medium">Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Showcase Section */}
      <motion.section 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative py-32 z-10 overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left - Mockup with Neon Glow */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative h-[600px] flex items-center justify-center"
              >
                {/* Neon Glow Effect - Outer */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[300px] h-[500px] sm:w-[350px] sm:h-[580px] bg-[#2ECC71] rounded-[3rem] opacity-20 blur-[80px]" />
                </div>
                
                {/* Neon Glow Effect - Middle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[280px] h-[480px] sm:w-[320px] sm:h-[550px] bg-[#2ECC71] rounded-[3rem] opacity-30 blur-[50px]" />
                </div>
                
                {/* Neon Glow Effect - Inner */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[260px] h-[460px] sm:w-[300px] sm:h-[520px] bg-[#27AE60] rounded-[3rem] opacity-25 blur-[30px]" />
                </div>
                
                {/* Mockup Image */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="relative z-20"
                >
                  <img
                    src="/src/assets/mockup.png"
                    alt="AUSTRC App"
                    className="w-[240px] sm:w-[280px] relative z-10"
                    style={{
                      filter: 'drop-shadow(0 0 15px rgba(46, 204, 113, 0.5)) drop-shadow(0 0 30px rgba(46, 204, 113, 0.3)) drop-shadow(0 0 45px rgba(46, 204, 113, 0.2))'
                    }}
                  />
                  
                  {/* Subtle Neon Border Ring */}
                  <motion.div
                    className="absolute inset-[-15px] border-2 border-[#2ECC71]/40 rounded-[3rem] z-0"
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.div>
                
                {/* Decorative Dots */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-30">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                      className={`w-3 h-3 rounded-full ${i === 1 ? 'bg-[#2ECC71]' : 'bg-gray-600'}`}
                    />
                  ))}
                </div>
              </motion.div>

              {/* Right - Content */}
              <div>
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mb-10"
                >
                  <span className="text-[#2ECC71] text-sm font-semibold tracking-wider uppercase">App Features</span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
                    Designed for
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] to-[#27AE60]"> Members</span>
                  </h2>
                  <p className="text-gray-400 mt-4 text-lg leading-relaxed">
                    Every feature is crafted with our community in mind, making it easier than ever to stay connected.
                  </p>
                </motion.div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {appFeatures.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="group flex items-start gap-4 p-4 rounded-2xl bg-gray-900/30 border border-gray-800/50 hover:border-[#2ECC71]/30 hover:bg-gray-900/50 transition-all duration-300"
                    >
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-12 h-12 bg-[#2ECC71]/10 border border-[#2ECC71]/30 rounded-xl flex items-center justify-center text-[#2ECC71] flex-shrink-0 group-hover:bg-[#2ECC71]/20 transition-colors duration-300"
                      >
                        <feature.icon className="w-5 h-5" />
                      </motion.div>
                      <div>
                        <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Installation Guide Section */}
      <section className="relative py-32 z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-[#2ECC71] text-sm font-semibold tracking-wider uppercase">Installation</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mt-3">
                Get Started in
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] to-[#27AE60]"> 4 Easy Steps</span>
              </h2>
            </motion.div>

            <div className="relative">
              {/* Connection Line */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="absolute left-8 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#2ECC71] via-[#2ECC71]/50 to-transparent origin-top hidden sm:block"
              />

              <div className="space-y-8 lg:space-y-12">
                {[
                  { step: 1, title: "Download the APK", description: "Click the download button to get the latest version", icon: Download },
                  { step: 2, title: "Enable Unknown Sources", description: "Settings → Security → Enable 'Unknown Sources'", icon: Shield },
                  { step: 3, title: "Open the APK File", description: "Find the file in Downloads and tap to open", icon: Smartphone },
                  { step: 4, title: "Install & Enjoy", description: "Tap 'Install' and start exploring!", icon: Sparkles }
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className={`relative flex items-center gap-6 lg:gap-12 ${
                      index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="relative z-10 w-16 h-16 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-[0_0_40px_0_rgba(46,204,113,0.4)] flex-shrink-0"
                    >
                      {item.step}
                    </motion.div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className={`flex-1 bg-gradient-to-r ${
                        index % 2 === 0 ? 'from-gray-900/80 to-black/40' : 'from-black/40 to-gray-900/80'
                      } backdrop-blur-sm p-6 rounded-2xl border border-gray-800/50 hover:border-[#2ECC71]/30 transition-all duration-300 lg:max-w-md ${
                        index % 2 === 0 ? '' : 'lg:ml-auto'
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 bg-[#2ECC71]/20 rounded-xl flex items-center justify-center">
                          <item.icon className="w-5 h-5 text-[#2ECC71]" />
                        </div>
                        <h3 className="text-white font-bold text-lg">{item.title}</h3>
                      </div>
                      <p className="text-gray-400 leading-relaxed">{item.description}</p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Security Notice */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-16 p-6 bg-gradient-to-r from-[#2ECC71]/10 via-[#2ECC71]/5 to-[#27AE60]/10 border border-[#2ECC71]/20 rounded-2xl"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <motion.div 
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-14 h-14 bg-[#2ECC71]/20 rounded-2xl flex items-center justify-center flex-shrink-0"
                >
                  <Shield className="w-7 h-7 text-[#2ECC71]" />
                </motion.div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">🔒 100% Safe & Verified</h3>
                  <p className="text-gray-400 leading-relaxed">
                    This app is developed by the official AUST Robotics Club team. 
                    It's completely safe and doesn't contain any malware.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-32 z-10">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative max-w-5xl mx-auto"
          >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2ECC71]/30 via-transparent to-[#27AE60]/30 rounded-[3rem] blur-[100px]" />
            
            {/* Animated Border */}
            <motion.div 
              className="absolute inset-0 rounded-[3rem] p-[2px] overflow-hidden"
              style={{
                background: 'linear-gradient(90deg, #2ECC71, #27AE60, #2ECC71)',
                backgroundSize: '200% 100%'
              }}
              animate={{ backgroundPosition: ['0% 0%', '200% 0%'] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full bg-black rounded-[3rem]" />
            </motion.div>
            
            <div className="relative bg-gradient-to-b from-gray-900/90 to-black/95 backdrop-blur-xl p-10 sm:p-16 rounded-[3rem] text-center overflow-hidden">
              {/* Decorative Elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-32 -right-32 w-64 h-64 border border-[#2ECC71]/20 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-32 -left-32 w-80 h-80 border border-dashed border-[#2ECC71]/10 rounded-full"
              />
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4"
              >
                Ready to Experience
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] to-[#27AE60]">
                  The Future?
                </span>
              </motion.h2>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-gray-400 text-lg max-w-2xl mx-auto mb-10"
              >
                Join hundreds of club members who are already enjoying our app. 
                Download now and never miss an update!
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  onClick={handleDownload}
                  className="group relative px-10 py-7 text-lg font-semibold bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#2ECC71] text-white rounded-2xl shadow-[0_0_50px_0_rgba(46,204,113,0.5)] hover:shadow-[0_0_80px_0_rgba(46,204,113,0.7)] transition-all duration-500"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-2xl"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                  <Download className="w-6 h-6 mr-3 group-hover:animate-bounce" />
                  Download Now — It's Free
                </Button>
                
                {/* <Button
                  onClick={handleCopyLink}
                  variant="outline"
                  className="px-10 py-7 text-lg font-semibold border-2 border-gray-700 hover:border-[#2ECC71] text-white hover:bg-[#2ECC71]/10 rounded-2xl transition-all duration-300"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5 mr-2 text-[#2ECC71]" />
                      Link Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5 mr-2" />
                      Share with Friends
                    </>
                  )}
                </Button> */}
              </motion.div>

              {/* <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-10 flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm"
              >
                <div className="flex items-center gap-2">
                  <Smartphone className="w-4 h-4" />
                  <span>Android 7.0+</span>
                </div>
                <div className="w-1 h-1 bg-gray-600 rounded-full" />
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span>67 MB</span>
                </div>
                <div className="w-1 h-1 bg-gray-600 rounded-full" />
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  <span>100% Secure</span>
                </div>
              </motion.div> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal for non-Android devices */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateX: -30 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateX: 30 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gradient-to-b from-gray-900 to-black p-8 sm:p-10 rounded-3xl border border-gray-800 max-w-md w-full shadow-[0_0_100px_0_rgba(46,204,113,0.2)]"
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="relative w-24 h-24 mx-auto mb-6"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 border-2 border-dashed border-amber-500/30 rounded-full"
                  />
                  <div className="absolute inset-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-amber-500/30">
                    <AlertCircle className="w-10 h-10 text-amber-400" />
                  </div>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl sm:text-3xl font-bold text-white mb-3"
                >
                  Android Only
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-400 mb-8 leading-relaxed"
                >
                  This app is currently available only for{' '}
                  <span className="text-[#2ECC71] font-semibold">Android devices</span>. 
                  Open this page on your Android phone to download.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mb-8"
                >
                  <motion.img
                    src="/src/assets/mockup.png"
                    alt="AUSTRC App Preview"
                    className="w-24 mx-auto opacity-50"
                    animate={{ y: [-5, 5, -5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col gap-3"
                >
                  <Button
                    onClick={() => {
                      handleCopyLink();
                      setTimeout(() => setShowModal(false), 1000);
                    }}
                    className="w-full py-6 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#2ECC71] text-white font-semibold rounded-xl transition-all duration-300"
                  >
                    {copied ? (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Copied to Clipboard!
                      </>
                    ) : (
                      <>
                        <Copy className="w-5 h-5 mr-2" />
                        Copy Link to Share
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => setShowModal(false)}
                    variant="outline"
                    className="w-full py-6 border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white rounded-xl transition-all duration-300"
                  >
                    I Understand
                  </Button>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-gray-600 text-sm mt-6 flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  Send the link to your Android device
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}