// components/Navbar.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { 
  ChevronDown, 
  Smartphone, 
  Menu, 
  X, 
  ExternalLink,
  ChevronRight 
} from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activitiesOpen, setActivitiesOpen] = useState(false);
  const [governingPanelOpen, setGoverningPanelOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileActivitiesOpen, setMobileActivitiesOpen] = useState(false);
  const [mobileGoverningOpen, setMobileGoverningOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const location = useLocation();

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    // Check on mount
    checkMobile();
    
    // Check on resize
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileActivitiesOpen(false);
    setMobileGoverningOpen(false);
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { name: 'Governing Panel', path: '/', section: 'governing-panel' },
    { name: 'Activities', path: '/activities', section: null },
    { name: 'Research and project', path: '/research-projects', section: null },
    { name: 'Enthusiast Acquisition', path: '/enthusiast-acquisition', section: null },
    { name: 'About us', path: '/about', section: null },
  ];

  const activitiesDropdownItems = [
    { name: 'Events', path: '/activities/events' },
    { name: 'Achievements', path: '/activities/achievements' },
    { name: 'Educational Activities', path: '/activities/educational-activities' },
    { name: 'Our Event Website', path: '/activities/event-website' },
  ];

  const governingPanelDropdownItems = [
    { name: 'Hall of Fame', path: '/governing-panel/hall-of-fame' },
    { name: 'Fall 2024', path: '/governing-panel/fall-2024' },
    { name: 'Spring 2024', path: '/governing-panel/spring-2024' },
    { name: 'Fall 2023', path: '/governing-panel/fall-2023' },
    { name: 'Spring 2023', path: '/governing-panel/spring-2023' },
    { name: 'Fall 2022', path: '/governing-panel/fall-2022' },
    { name: 'Spring 2022', path: '/governing-panel/spring-2022' },
    { name: 'Fall 2021', path: '/governing-panel/fall-2021' },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.section && location.pathname === '/') {
      const element = document.getElementById(item.section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMobileMenuOpen(false);
  };

  const menuVariants = {
    closed: {
      x: '100%',
      transition: { type: 'spring' as const, stiffness: 400, damping: 40 },
    },
    open: {
      x: 0,
      transition: { type: 'spring' as const, stiffness: 400, damping: 40 },
    },
  };

  const menuItemVariants = {
    closed: { x: 50, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: { delay: i * 0.1, type: 'spring' as const, stiffness: 300, damping: 24 },
    }),
  };

  const dropdownVariants = {
    closed: { height: 0, opacity: 0, transition: { duration: 0.3 } },
    open: { height: 'auto', opacity: 1, transition: { duration: 0.3 } },
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-transparent backdrop-blur-none'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-md'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-full px-6 py-5 flex items-center justify-between">
          
          {/* LOGO */}
          <div className="fixed left-6 top-5 z-50">
            <Link to="/">
              <motion.div
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative group cursor-pointer">
                  <div className="relative w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
                    <img
                      src="https://ik.imagekit.io/mekt2pafz/Web%20site%20team/logo.png?updatedAt=1769056096931"
                      alt="AUSTRC Logo"
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                </div>
                <div>
                  <span className="tracking-tight text-white block">
                    Aust Robotics Club
                  </span>
                </div>
              </motion.div>
            </Link>
          </div>

          {/* ============================================ */}
          {/* DESKTOP NAVIGATION - Only shows when NOT mobile */}
          {/* ============================================ */}
          {!isMobile && (
            <div className="flex items-center gap-8 bg-black/10 backdrop-blur-md px-6 py-3 rounded-full border border-[rgba(46,204,113,0.2)] mx-auto">
              {navItems.map((item) =>
                item.name === 'Activities' ? (
                  <div
                    key={item.name}
                    className="relative text-gray-400 hover:text-[#2ECC71] transition-all group text-sm whitespace-nowrap"
                    onMouseEnter={() => setActivitiesOpen(true)}
                    onMouseLeave={() => setActivitiesOpen(false)}
                  >
                    <Link to={item.path} className="flex items-center">
                      {item.name}
                      <ChevronDown className="inline-block w-4 h-4 ml-1" />
                    </Link>
                    <AnimatePresence>
                      {activitiesOpen && (
                        <motion.div
                          className="absolute left-0 top-full mt-2 bg-white/95 backdrop-blur-xl shadow-[0_0_40px_0_rgba(46,204,113,0.2)] rounded-md w-56 overflow-hidden"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {activitiesDropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                              className="block px-4 py-3 text-gray-400 hover:text-[#2ECC71] transition-all text-sm font-medium"
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : item.name === 'Governing Panel' ? (
                  <div
                    key={item.name}
                    className="relative text-gray-400 hover:text-[#2ECC71] transition-all group text-sm whitespace-nowrap"
                    onMouseEnter={() => setGoverningPanelOpen(true)}
                    onMouseLeave={() => setGoverningPanelOpen(false)}
                  >
                    {item.name}
                    <ChevronDown className="inline-block w-4 h-4 ml-1" />
                    <AnimatePresence>
                      {governingPanelOpen && (
                        <motion.div
                          className="absolute left-0 top-full mt-2 bg-white/95 backdrop-blur-xl shadow-[0_0_40px_0_rgba(46,204,113,0.2)] rounded-md w-48 max-h-96 overflow-y-auto"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                        >
                          {governingPanelDropdownItems.map((dropdownItem) => (
                            <Link
                              key={dropdownItem.name}
                              to={dropdownItem.path}
                              className="block px-4 py-2 text-gray-400 hover:text-[#2ECC71] transition-all"
                            >
                              {dropdownItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : 'external' in item && item.external ? (
                  <a
                    key={item.name}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative text-gray-400 hover:text-[#2ECC71] transition-all group text-sm whitespace-nowrap"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] group-hover:w-full transition-all duration-300 shadow-[0_0_10px_0_rgba(46,204,113,0.8)]" />
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => handleNavClick(item)}
                    className="relative text-gray-400 hover:text-[#2ECC71] transition-all group text-sm whitespace-nowrap"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] group-hover:w-full transition-all duration-300 shadow-[0_0_10px_0_rgba(46,204,113,0.8)]" />
                  </Link>
                )
              )}

              <Link to="/get-app">
                <motion.button
                  className="relative group flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white text-sm font-semibold rounded-full shadow-[0_0_15px_0_rgba(46,204,113,0.4)] hover:shadow-[0_0_25px_0_rgba(46,204,113,0.6)] transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Smartphone className="w-4 h-4" />
                  Get App
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white rounded-full animate-ping" />
                  <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white rounded-full" />
                </motion.button>
              </Link>
            </div>
          )}

          {/* ============================================ */}
          {/* MOBILE HAMBURGER - Only shows when isMobile is true */}
          {/* ============================================ */}
          {isMobile && (
            <div className="fixed right-6 top-5 z-50">
              <motion.button
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-black/30 backdrop-blur-md border border-white/10 text-white"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Toggle mobile menu"
              >
                <AnimatePresence mode="wait">
                  {mobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          )}

        </div>
      </motion.nav>

      {/* ============================================ */}
      {/* MOBILE MENU DRAWER - Only when isMobile */}
      {/* ============================================ */}
      <AnimatePresence>
        {isMobile && mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-gradient-to-b from-gray-900 via-gray-900 to-black z-50 shadow-2xl border-l border-white/10"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl overflow-hidden">
                    <img
                      src="/src/assets/logo.png"
                      alt="AUSTRC Logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-white font-semibold text-sm">AUST</span>
                    <span className="text-[#2ECC71] font-semibold text-sm">RC</span>
                  </div>
                </div>
                <motion.button
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-white"
                  onClick={() => setMobileMenuOpen(false)}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Menu Items */}
              <div className="flex flex-col py-4 px-3 overflow-y-auto h-[calc(100%-180px)]">
                {navItems.map((item, index) =>
                  item.name === 'Activities' ? (
                    <motion.div
                      key={item.name}
                      custom={index}
                      variants={menuItemVariants}
                      initial="closed"
                      animate="open"
                      className="border-b border-white/5"
                    >
                      <button
                        className="w-full flex items-center justify-between py-4 px-3 text-gray-300 hover:text-[#2ECC71] transition-colors"
                        onClick={() => setMobileActivitiesOpen(!mobileActivitiesOpen)}
                      >
                        <span className="text-base font-medium">{item.name}</span>
                        <motion.div
                          animate={{ rotate: mobileActivitiesOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {mobileActivitiesOpen && (
                          <motion.div
                            variants={dropdownVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="overflow-hidden bg-white/5 rounded-xl mb-3 mx-2"
                          >
                            {activitiesDropdownItems.map((dropdownItem, dropIndex) => (
                              <motion.div
                                key={dropdownItem.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{
                                  opacity: 1,
                                  x: 0,
                                  transition: { delay: dropIndex * 0.05 },
                                }}
                              >
                                <Link
                                  to={dropdownItem.path}
                                  className="flex items-center gap-2 py-3 px-4 text-gray-400 hover:text-[#2ECC71] transition-colors text-sm"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <ChevronRight className="w-4 h-4 text-[#2ECC71]/50" />
                                  {dropdownItem.name}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ) : item.name === 'Governing Panel' ? (
                    <motion.div
                      key={item.name}
                      custom={index}
                      variants={menuItemVariants}
                      initial="closed"
                      animate="open"
                      className="border-b border-white/5"
                    >
                      <button
                        className="w-full flex items-center justify-between py-4 px-3 text-gray-300 hover:text-[#2ECC71] transition-colors"
                        onClick={() => setMobileGoverningOpen(!mobileGoverningOpen)}
                      >
                        <span className="text-base font-medium">{item.name}</span>
                        <motion.div
                          animate={{ rotate: mobileGoverningOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ChevronDown className="w-5 h-5" />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {mobileGoverningOpen && (
                          <motion.div
                            variants={dropdownVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                            className="overflow-hidden bg-white/5 rounded-xl mb-3 mx-2 max-h-60 overflow-y-auto"
                          >
                            {governingPanelDropdownItems.map((dropdownItem, dropIndex) => (
                              <motion.div
                                key={dropdownItem.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{
                                  opacity: 1,
                                  x: 0,
                                  transition: { delay: dropIndex * 0.03 },
                                }}
                              >
                                <Link
                                  to={dropdownItem.path}
                                  className="flex items-center gap-2 py-3 px-4 text-gray-400 hover:text-[#2ECC71] transition-colors text-sm"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <ChevronRight className="w-4 h-4 text-[#2ECC71]/50" />
                                  {dropdownItem.name}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ) : 'external' in item && item.external ? (
                    <motion.a
                      key={item.name}
                      custom={index}
                      variants={menuItemVariants}
                      initial="closed"
                      animate="open"
                      href={item.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-4 px-3 text-gray-300 hover:text-[#2ECC71] transition-colors border-b border-white/5"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="text-base font-medium">{item.name}</span>
                      <ExternalLink className="w-4 h-4 opacity-50" />
                    </motion.a>
                  ) : (
                    <motion.div
                      key={item.name}
                      custom={index}
                      variants={menuItemVariants}
                      initial="closed"
                      animate="open"
                    >
                      <Link
                        to={item.path}
                        className="flex items-center justify-between py-4 px-3 text-gray-300 hover:text-[#2ECC71] transition-colors border-b border-white/5"
                        onClick={() => handleNavClick(item)}
                      >
                        <span className="text-base font-medium">{item.name}</span>
                        <ChevronRight className="w-4 h-4 opacity-50" />
                      </Link>
                    </motion.div>
                  )
                )}
              </div>

              {/* Footer */}
              <div className="absolute bottom-0 left-0 right-0 px-6 py-5 border-t border-white/10 bg-gradient-to-t from-black via-gray-900/95 to-transparent">
                <Link to="/get-app" onClick={() => setMobileMenuOpen(false)}>
                  <motion.button
                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white font-semibold rounded-xl shadow-[0_0_20px_0_rgba(46,204,113,0.4)]"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Smartphone className="w-5 h-5" />
                    Download App
                  </motion.button>
                </Link>
                <p className="text-center text-gray-500 text-xs mt-4">
                  © 2024 AUST Robotics Club
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}