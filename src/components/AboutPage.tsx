import { motion, useInView } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { 
  Lightbulb, 
  GraduationCap, 
  MessageSquare, 
  Users, 
  FileText, 
  Cpu, 
  Target, 
  Eye,
  Mail,
  Facebook,
  Linkedin,
  Instagram,
  Trophy,
  Rocket,
  BookOpen,
  Sparkles,
  Zap,
  Star,
  Heart,
  ChevronRight,
  MapPin,
  Phone,
  Code2,
  Github
} from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '@/assets/logo.png';

// Floating Particles Component
const FloatingParticles = () => {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-[#2ECC71]"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
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

// Animated Grid Lines
const GridLines = () => {
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
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
};

// Animated Counter Component
const AnimatedCounter = ({ value, suffix = '' }: { value: string; suffix?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const numericValue = parseInt(value.replace(/\D/g, '')) || 0;

  useEffect(() => {
    if (isInView && numericValue > 0) {
      let start = 0;
      const duration = 2000;
      const increment = numericValue / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= numericValue) {
          setCount(numericValue);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <span ref={ref}>
      {numericValue > 0 ? count : value}{suffix}
    </span>
  );
};

// Section Divider Component
const SectionDivider = ({ title, icon: Icon }: { title: string; icon: React.ElementType }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      className="flex items-center justify-center gap-4 mb-12"
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
        whileHover={{ scale: 1.05, borderColor: "rgba(46,204,113,0.6)" }}
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

// Dark Footer Component (Inline)
const DarkFooter = () => {
  const footerLinks = {
    quickLinks: [
      { name: 'About', href: '/about' },
      { name: 'Events', href: '/activities/events' },
    ],
    resources: [
      { name: 'Research & Projects', href: '/research-projects' },
      { name: 'Educational Programs', href: '/activities/educational-activities' },
      { name: 'Contact', href: '#contact' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/AustRoboticsClub', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/aust_robotics_club', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/aust-robotics-club/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/webdevaustrc-2025/AustRC-Website', label: 'GitHub' },
  ];

  return (
    <footer className="relative bg-black mt-20">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-[#2ECC71] rounded-full blur-[150px] opacity-10"
          animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-[#27AE60] rounded-full blur-[120px] opacity-10"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.08, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="border-t border-[rgba(46,204,113,0.2)]">
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* About Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <img 
                  src={logo} 
                  alt="AUSTRC Logo" 
                  className="w-10 h-10 object-contain"
                />
                <span className="tracking-tight font-semibold text-white">
                  Aust Robotics Club
                </span>
              </div>
              <p className="text-sm mb-4 text-gray-400">
                Making robotics accessible through innovation. Built with passion on cutting-edge technology.
              </p>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="w-10 h-10 bg-[rgba(46,204,113,0.1)] text-gray-400 hover:bg-[#2ECC71] border border-[rgba(46,204,113,0.3)] rounded-lg flex items-center justify-center transition-all hover:shadow-[0_0_20px_0_rgba(46,204,113,0.6)] hover:text-white"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="mb-4 font-semibold tracking-tight text-white">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {footerLinks.quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-[#2ECC71] transition-colors text-sm flex items-center gap-2 group"
                    >
                      <span className="w-0 h-0.5 bg-[#2ECC71] group-hover:w-4 transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="mb-4 font-semibold tracking-tight text-white">
                Resources
              </h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    {link.href.startsWith('/') ? (
                      <Link
                        to={link.href}
                        className="text-gray-400 hover:text-[#2ECC71] transition-colors text-sm flex items-center gap-2 group"
                      >
                        <span className="w-0 h-0.5 bg-[#2ECC71] group-hover:w-4 transition-all duration-300" />
                        {link.name}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-[#2ECC71] transition-colors text-sm flex items-center gap-2 group"
                      >
                        <span className="w-0 h-0.5 bg-[#2ECC71] group-hover:w-4 transition-all duration-300" />
                        {link.name}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="mb-4 font-semibold tracking-tight text-white">
                Contact Us
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-gray-400">
                  <MapPin className="w-5 h-5 text-[#2ECC71] shrink-0 mt-0.5" />
                  <span>AUST Campus, Dhaka, Bangladesh</span>
                </li>
                <li>
                  <a 
                    href="mailto:contact@ausrc.edu"
                    className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#2ECC71] transition-colors"
                  >
                    <Mail className="w-5 h-5 text-[#2ECC71] shrink-0" />
                    <span>contact@ausrc.edu</span>
                  </a>
                </li>
                <li>
                  <a 
                    href="tel:+8801234567890"
                    className="flex items-center gap-3 text-sm text-gray-400 hover:text-[#2ECC71] transition-colors"
                  >
                    <Phone className="w-5 h-5 text-[#2ECC71] shrink-0" />
                    <span>+880 123 456 7890</span>
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-8 border-t border-[rgba(46,204,113,0.2)]"
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-400">
                © 2025 Aust Robotics Club. All rights reserved.
              </p>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <p className="text-[#2ECC71] text-sm">
                  Developed by AUSTRC Web Development Team
                </p>
                <Link to="/developers">
                  <motion.button
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-[rgba(46,204,113,0.1)] to-[rgba(39,174,96,0.1)] hover:from-[#2ECC71] hover:to-[#27AE60] border border-[rgba(46,204,113,0.4)] hover:border-[#2ECC71] text-[#2ECC71] hover:text-black px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(46,204,113,0.4)]"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Code2 className="w-4 h-4" />
                    Meet our Developers
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export function AboutPage() {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = 'AUST Robotics Club';

  useEffect(() => {
    let currentIndex = 0;
    
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  const objectives = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovative Development',
      description: 'Fostering creativity and innovation in robotics through hands-on projects and cutting-edge technology.'
    },
    {
      icon: <GraduationCap className="w-8 h-8" />,
      title: 'Knowledge Enhancement',
      description: 'Organizing workshops, trainings, and competitions to enhance technical skills and expertise.'
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: 'Educational Outreach',
      description: 'Conducting seminars, discussions, and knowledge-sharing sessions for continuous learning.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Social Development',
      description: 'Building strong collaborations and networks within and beyond AUST community.'
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Information Sharing',
      description: 'Publishing newsletters, magazines, and updates to keep members informed and engaged.'
    },
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'Robotics Excellence',
      description: 'Driving excellence in robotics through research, development, and practical applications.'
    }
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-6 h-6" />,
      url: 'https://www.facebook.com/austrc',
      color: '#1877F2'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-6 h-6" />,
      url: 'https://www.linkedin.com/company/austrc',
      color: '#0A66C2'
    },
    {
      name: 'Instagram',
      icon: <Instagram className="w-6 h-6" />,
      url: 'https://www.instagram.com/austrc',
      color: '#E4405F'
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background - Fixed position so it stays while scrolling */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <motion.div
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[rgba(46,204,113,0.1)] via-transparent to-[rgba(46,204,113,0.1)] blur-3xl"
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Large gradient orbs */}
        <motion.div
          className="absolute top-20 -left-40 w-[500px] h-[500px] bg-[#2ECC71] rounded-full blur-[150px] opacity-20"
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 -right-40 w-[600px] h-[600px] bg-[#27AE60] rounded-full blur-[150px] opacity-20"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.15, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-full blur-[120px] opacity-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Additional Animated Elements */}
      <FloatingParticles />
      <GridLines />

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative py-32 px-6 overflow-hidden">
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Badge */}
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
                  <Rocket className="w-4 h-4 text-[#2ECC71]" />
                </motion.div>
                <span className="text-[#2ECC71] text-sm font-medium">Pioneering the Future of Robotics</span>
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Sparkles className="w-4 h-4 text-[#2ECC71]" />
                </motion.div>
              </motion.div>

              {/* Logo */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex justify-center mb-8"
              >
                <motion.img 
                  src={logo}
                  alt="AUSTRC Logo"
                  className="w-40 h-40 object-contain"
                  animate={{ 
                    y: [0, -10, 0],
                    filter: ["drop-shadow(0 0 10px rgba(46,204,113,0.3))", "drop-shadow(0 0 25px rgba(46,204,113,0.6))", "drop-shadow(0 0 10px rgba(46,204,113,0.3))"] 
                  }}
                  transition={{ 
                    y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                    filter: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                  }}
                />
              </motion.div>

              {/* Typing Title */}
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-[#2ECC71] via-[#27AE60] to-[#2ECC71] bg-clip-text text-transparent">
                  {typedText}
                </span>
                <span className={`text-[#2ECC71] ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
              </h1>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-2xl md:text-3xl mb-4 text-gray-300 italic"
              >
                "Robotics for Building a Safer Future"
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl text-gray-400"
              >
                Where innovation meets aspiration
              </motion.p>

              {/* Decorative line */}
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
                  <Zap className="w-6 h-6 text-[#2ECC71]" />
                </motion.div>
                <motion.div
                  className="h-1 bg-gradient-to-r from-transparent via-[#2ECC71] to-transparent rounded-full"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 80, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <SectionDivider title="About AUSTRC" icon={BookOpen} />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              {/* Glow effect */}
              <motion.div
                className="absolute -inset-1 bg-gradient-to-r from-[#2ECC71] via-[#27AE60] to-[#2ECC71] rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"
              />
              
              <div className="relative bg-[rgba(46,204,113,0.05)] backdrop-blur-xl border border-[rgba(46,204,113,0.3)] rounded-3xl p-12 hover:border-[rgba(46,204,113,0.5)] transition-all duration-500">
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-20 h-20 border-t-2 border-l-2 border-[#2ECC71] rounded-tl-3xl opacity-50" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b-2 border-r-2 border-[#2ECC71] rounded-br-3xl opacity-50" />
                
                <p className="text-xl text-gray-300 leading-relaxed text-center">
                  AUSTRC is a leading student robotics club at Ahsanullah University of Science and Technology, 
                  established in <span className="text-[#2ECC71] font-semibold">Fall 2021</span>. With an active student-community, the club encourages developing and 
                  materializing innovative robotics ideas — from microcontroller-based bots to large-scale projects 
                  like <span className="text-[#2ECC71] font-semibold">Mars Rover</span> & <span className="text-[#2ECC71] font-semibold">autonomous quadcopters</span>.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-20 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <SectionDivider title="Mission & Vision" icon={Target} />

            <div className="grid md:grid-cols-2 gap-8">
              {/* Mission */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative group"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                />
                
                <div className="relative bg-[rgba(46,204,113,0.05)] backdrop-blur-xl border border-[rgba(46,204,113,0.3)] rounded-3xl p-10 h-full hover:border-[rgba(46,204,113,0.5)] transition-all duration-500 overflow-hidden">
                  {/* Animated scan line */}
                  <motion.div
                    className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#2ECC71] to-transparent opacity-50"
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div 
                      className="bg-gradient-to-br from-[#2ECC71] to-[#27AE60] p-4 rounded-2xl shadow-[0_0_30px_rgba(46,204,113,0.5)]"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Target className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-[#2ECC71]">Our Mission</h3>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    To enrich knowledge in robotics and foster sustainable projects through comprehensive 
                    educational programs, interactive workshops, specialized training sessions, and competitive 
                    events. We aim to empower students with practical skills and theoretical knowledge to excel 
                    in the field of robotics and automation.
                  </p>
                </div>
              </motion.div>

              {/* Vision */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative group"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-[#27AE60] to-[#2ECC71] rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                />
                
                <div className="relative bg-[rgba(46,204,113,0.05)] backdrop-blur-xl border border-[rgba(46,204,113,0.3)] rounded-3xl p-10 h-full hover:border-[rgba(46,204,113,0.5)] transition-all duration-500 overflow-hidden">
                  {/* Animated scan line */}
                  <motion.div
                    className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#2ECC71] to-transparent opacity-50"
                    animate={{ top: ["100%", "0%"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  />
                  
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div 
                      className="bg-gradient-to-br from-[#2ECC71] to-[#27AE60] p-4 rounded-2xl shadow-[0_0_30px_rgba(46,204,113,0.5)]"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      <Eye className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-[#2ECC71]">Our Vision</h3>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed">
                    To build strong bonds across clubs and groups inside and outside AUST, combining technological 
                    growth with social development. We envision a collaborative ecosystem where innovation thrives, 
                    knowledge is shared freely, and robotics enthusiasts from diverse backgrounds unite to create 
                    impactful solutions for tomorrow's challenges.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Objectives Section */}
        <section className="py-20 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <SectionDivider title="What We Do" icon={Zap} />

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {objectives.map((objective, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  />
                  
                  <div className="relative bg-[rgba(46,204,113,0.05)] backdrop-blur-xl border border-[rgba(46,204,113,0.2)] rounded-2xl p-8 h-full hover:border-[rgba(46,204,113,0.5)] transition-all duration-500 hover:-translate-y-2">
                    {/* Floating particles on hover */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-[#2ECC71] rounded-full"
                          initial={{ x: Math.random() * 200, y: 200 }}
                          animate={{ y: -20, opacity: [0, 1, 0] }}
                          transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                        />
                      ))}
                    </div>
                    
                    <motion.div 
                      className="bg-gradient-to-br from-[#2ECC71] to-[#27AE60] p-4 rounded-xl inline-block mb-6 shadow-[0_0_30px_rgba(46,204,113,0.4)] group-hover:shadow-[0_0_40px_rgba(46,204,113,0.6)] transition-all text-white"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      {objective.icon}
                    </motion.div>
                    <h3 className="text-2xl font-semibold mb-4 text-white group-hover:text-[#2ECC71] transition-colors">
                      {objective.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {objective.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Membership & Leadership Section */}
        <section className="py-20 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <SectionDivider title="Membership & Leadership" icon={Users} />

            <div className="grid md:grid-cols-2 gap-8">
              {/* Membership */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative group"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                />
                
                <div className="relative bg-[rgba(46,204,113,0.05)] backdrop-blur-xl border border-[rgba(46,204,113,0.3)] rounded-3xl p-10 h-full hover:border-[rgba(46,204,113,0.5)] transition-all duration-500">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div 
                      className="bg-gradient-to-br from-[#2ECC71] to-[#27AE60] p-4 rounded-2xl shadow-[0_0_30px_rgba(46,204,113,0.5)]"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Users className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-[#2ECC71]">Who Can Join</h3>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    AUSTRC welcomes all students from Ahsanullah University of Science and Technology who are 
                    passionate about robotics, technology, and innovation.
                  </p>
                  <div className="bg-[rgba(46,204,113,0.1)] border-l-4 border-[#2ECC71] p-6 rounded-lg">
                    <p className="text-gray-300">
                      A one-time registration fee grants you full club rights and privileges, including access to 
                      workshops, equipment, mentorship, and all club activities.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Leadership */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative group"
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-[#27AE60] to-[#2ECC71] rounded-3xl blur-lg opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                />
                
                <div className="relative bg-[rgba(46,204,113,0.05)] backdrop-blur-xl border border-[rgba(46,204,113,0.3)] rounded-3xl p-10 h-full hover:border-[rgba(46,204,113,0.5)] transition-all duration-500">
                  <div className="flex items-center gap-4 mb-6">
                    <motion.div 
                      className="bg-gradient-to-br from-[#2ECC71] to-[#27AE60] p-4 rounded-2xl shadow-[0_0_30px_rgba(46,204,113,0.5)]"
                      whileHover={{ scale: 1.1 }}
                    >
                      <Trophy className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-[#2ECC71]">Leadership Structure</h3>
                  </div>
                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    Our club is governed by a dedicated Executive Committee that ensures smooth operations and 
                    continuous growth.
                  </p>
                  <div className="space-y-3 mb-6">
                    {['President', 'Vice President', 'Treasurer', 'General Secretary', 'Organizing Secretary', 'Directors & Panels'].map((role, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-3 bg-[rgba(46,204,113,0.1)] p-3 rounded-lg border border-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.5)] transition-all group/item"
                      >
                        <motion.div 
                          className="w-2 h-2 bg-[#2ECC71] rounded-full shadow-[0_0_10px_rgba(46,204,113,0.8)]"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                        />
                        <span className="text-gray-300 group-hover/item:text-[#2ECC71] transition-colors">{role}</span>
                      </motion.div>
                    ))}
                  </div>
                  <Link
                    to="/governing-panel/hall-of-fame"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-lg text-white font-medium hover:shadow-[0_0_30px_rgba(46,204,113,0.6)] transition-all hover:scale-105 group/btn"
                  >
                    View Governing Panel
                    <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <SectionDivider title="Our Achievements" icon={Star} />
            
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { number: '2021', label: 'Established', suffix: '' },
                { number: '500', label: 'Active Members', suffix: '+' },
                { number: '50', label: 'Projects Completed', suffix: '+' },
                { number: '100', label: 'Events Organized', suffix: '+' }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, type: "spring" }}
                  className="relative group"
                >
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-2xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  />
                  
                  <div className="relative bg-[rgba(46,204,113,0.05)] backdrop-blur-xl border border-[rgba(46,204,113,0.3)] rounded-2xl p-8 text-center hover:border-[rgba(46,204,113,0.5)] transition-all duration-500 hover:-translate-y-2">
                    {/* Animated ring */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-[rgba(46,204,113,0.2)]"
                      animate={{ opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                    />
                    
                    <div className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] bg-clip-text text-transparent">
                      <AnimatedCounter value={stat.number} suffix={stat.suffix} />
                    </div>
                    <div className="text-gray-400">{stat.label}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 px-6 relative">
          <div className="max-w-5xl mx-auto">
            <SectionDivider title="Connect With Us" icon={Mail} />
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <motion.div
                className="absolute -inset-2 bg-gradient-to-r from-[#2ECC71] via-[#27AE60] to-[#2ECC71] rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
              />
              
              <div className="relative bg-[rgba(46,204,113,0.05)] backdrop-blur-xl border border-[rgba(46,204,113,0.3)] rounded-3xl p-12 hover:border-[rgba(46,204,113,0.5)] transition-all duration-500">
                {/* Email */}
                <div className="flex flex-col items-center mb-12">
                  <motion.div 
                    className="bg-gradient-to-br from-[#2ECC71] to-[#27AE60] p-6 rounded-2xl mb-6 shadow-[0_0_40px_rgba(46,204,113,0.5)]"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Mail className="w-12 h-12 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-4 text-white">Email Us</h3>
                  <motion.a
                    href="mailto:austrc@aust.edu"
                    className="text-xl text-[#2ECC71] hover:text-[#27AE60] transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    austrc@aust.edu
                  </motion.a>
                </div>

                {/* Social Links */}
                <div className="border-t border-[rgba(46,204,113,0.3)] pt-12">
                  <h3 className="text-2xl font-semibold mb-8 text-center text-white">Follow Us On Social Media</h3>
                  <div className="flex justify-center gap-6">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        className="relative group/social"
                      >
                        <motion.div
                          className="absolute -inset-2 rounded-2xl blur-xl opacity-0 group-hover/social:opacity-60 transition-all"
                          style={{ backgroundColor: social.color }}
                        />
                        <div
                          className="relative p-5 rounded-2xl border-2 transition-all bg-[rgba(0,0,0,0.5)] backdrop-blur-xl"
                          style={{ borderColor: social.color }}
                        >
                          <div style={{ color: social.color }}>
                            {social.icon}
                          </div>
                        </div>
                      </motion.a>
                    ))}
                    
                    {/* Mail Icon */}
                    <motion.a
                      href="mailto:austrc@aust.edu"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: socialLinks.length * 0.1 }}
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      className="relative group/social"
                    >
                      <motion.div
                        className="absolute -inset-2 rounded-2xl blur-xl opacity-0 group-hover/social:opacity-60 transition-all bg-[#2ECC71]"
                      />
                      <div className="relative p-5 rounded-2xl border-2 border-[#2ECC71] transition-all bg-[rgba(0,0,0,0.5)] backdrop-blur-xl">
                        <Mail className="w-6 h-6 text-[#2ECC71]" />
                      </div>
                    </motion.a>
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-12 text-center">
                  <p className="text-xl text-gray-300 mb-6">
                    Join us in building the future of robotics!
                  </p>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-lg text-white text-lg font-medium hover:shadow-[0_0_40px_rgba(46,204,113,0.6)] transition-all hover:scale-105"
                  >
                    <Rocket className="w-5 h-5" />
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Built with Love Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="py-12 text-center"
        >
          <motion.div
            className="relative inline-flex items-center gap-3 bg-[rgba(46,204,113,0.05)] border border-[rgba(46,204,113,0.2)] rounded-2xl px-8 py-5 overflow-hidden"
            whileHover={{ scale: 1.02, borderColor: "rgba(46,204,113,0.4)" }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-[rgba(46,204,113,0.1)] to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-[#2ECC71]" />
            </motion.div>
            <p className="text-gray-400 relative z-10">
              AUSTRC — Where Innovation Meets Excellence
              <motion.span 
                className="text-[#2ECC71] inline-block ml-2"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                ♥
              </motion.span>
            </p>
          </motion.div>
        </motion.div>

        {/* Footer - Now inside the dark container */}
        <DarkFooter />
      </div>
    </div>
  );
}