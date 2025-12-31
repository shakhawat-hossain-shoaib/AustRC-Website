import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { ChevronDown } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activitiesOpen, setActivitiesOpen] = useState(false);
  const [governingPanelOpen, setGoverningPanelOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'ARC 2.0', path: 'https://arc.austrc.com/', section: null, external: true },
    { name: 'Robomania 2.0', path: 'https://robomania.austrc.com/', section: null, external: true },
    { name: 'Governing Panel', path: '/', section: 'governing-panel' },
    { name: 'Activities', path: '/activities', section: null },
    { name: 'Research and project', path: '/research-projects', section: null },
    { name: 'Enthusiast Acquisition', path: '/enthusiast-acquisition', section: null },
    { name: 'About us', path: '/about', section: null },
  ];

  const activitiesDropdownItems = [
    { name: 'Events', path: '/activities/events' },
    { name: 'Achievements', path: '/activities/achievements' },
    { name: 'Social Activities', path: '/activities/social-activities' },
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
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-transparent backdrop-blur-none' : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-md'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full px-6 py-5 flex items-center justify-between">
        {/* Fixed Logo - Left */}
        <div className="fixed left-6 top-5 z-50">
          <Link to="/">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative group cursor-pointer">
                <div className="relative w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
                  <img src="/src/assets/logo.png" alt="AUSTRC Logo" className="w-full h-full object-cover rounded-xl" />
                </div>
              </div>
              <div>
                <span className="tracking-tight text-white block">Aust Robotics Club</span>
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Scrollable Nav Items - Middle */}
        <div className="hidden lg:flex items-center gap-8 bg-black/10 backdrop-blur-md px-6 py-3 rounded-full border border-[rgba(46,204,113,0.2)] mx-auto">
          {navItems.map((item) => (
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
                      // FIXED: Using bg-white/95 to match the Governing Panel style
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
                          // FIXED: Text colors updated to gray and green hover (matching 2nd image)
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
          ))}
        </div>

      </div>
    </motion.nav>
  );
}