import { motion } from 'motion/react';
import { Facebook, Instagram, Linkedin, Youtube, Github, Mail, MapPin, Phone } from 'lucide-react';
import logo from '@/assets/logo.png';

interface FooterProps {
  theme?: 'dark' | 'light';
}

export function Footer({ theme = 'dark' }: FooterProps) {
  const links = {
    quickLinks: [
      { name: 'Home', href: '#home' },
      { name: 'About', href: '#about' },
      { name: 'Events', href: '#events' },
      { name: 'Programs', href: '#programs' },
    ],
    resources: [
      { name: 'Projects', href: '#projects' },
      { name: 'Research', href: '#research' },
      { name: 'Mentorship', href: '#mentorship' },
      { name: 'Contact', href: '#contact' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/AustRoboticsClub', label: 'Facebook' },
    { icon: Instagram, href: 'https://www.instagram.com/aust_robotics_club', label: 'Instagram' },
    { icon: Linkedin, href: 'https://www.linkedin.com/company/aust-robotics-club/', label: 'LinkedIn' },
    { icon: Github, href: 'https://github.com/webdevaustrc-2025/AustRC-Website', label: 'GitHub' },
  ];

  const isDark = theme === 'dark';

  return (
    <footer className={`${isDark ? 'bg-gradient-to-t from-[rgba(46,204,113,0.05)] to-transparent' : 'bg-gradient-to-t from-gray-50 to-white'} relative`}>
      <div className="border-t border-[rgba(46,204,113,0.2)]">
        <div className="container mx-auto px-4 py-16">
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
                <span className={`tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Aust Robotics Club</span>
              </div>
              <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Making robotics accessible through innovation. Built with passion on cutting-edge technology.
              </p>
              <div className="flex gap-3">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className={`w-10 h-10 ${isDark ? 'bg-[rgba(46,204,113,0.1)] text-gray-400' : 'bg-white text-gray-600'} hover:bg-[#2ECC71] border border-[rgba(46,204,113,0.3)] rounded-lg flex items-center justify-center transition-all hover:scale-110 hover:shadow-[0_0_20px_0_rgba(46,204,113,0.6)] hover:text-white`}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
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
              <h3 className={`mb-4 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Quick Links</h3>
              <ul className="space-y-2">
                {links.quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`${isDark ? 'text-gray-400' : 'text-gray-600'} hover:text-[#2ECC71] transition-colors text-sm flex items-center gap-2 group`}
                    >
                      <span className="w-0 h-0.5 bg-[#2ECC71] group-hover:w-4 transition-all" />
                      {link.name}
                    </a>
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
              <h3 className={`mb-4 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Resources</h3>
              <ul className="space-y-2">
                {links.resources.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`${isDark ? 'text-gray-400' : 'text-gray-600'} hover:text-[#2ECC71] transition-colors text-sm flex items-center gap-2 group`}
                    >
                      <span className="w-0 h-0.5 bg-[#2ECC71] group-hover:w-4 transition-all" />
                      {link.name}
                    </a>
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
              <h3 className={`mb-4 tracking-tight ${isDark ? 'text-white' : 'text-gray-900'}`}>Contact Us</h3>
              <ul className="space-y-3">
                <li className={`flex items-start gap-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <MapPin className="w-5 h-5 text-[#2ECC71] shrink-0 mt-0.5" />
                  <span>AUST Campus, Dhaka, Bangladesh</span>
                </li>
                <li className={`flex items-center gap-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Mail className="w-5 h-5 text-[#2ECC71] shrink-0" />
                  <span>contact@ausrc.edu</span>
                </li>
                <li className={`flex items-center gap-3 text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <Phone className="w-5 h-5 text-[#2ECC71] shrink-0" />
                  <span>+880 123 456 7890</span>
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
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                © 2025 Aust Robotics Club. All rights reserved.
              </p>
              <p className="text-[#2ECC71] text-sm">
                Developed by AUSTRC Web Development Team
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}