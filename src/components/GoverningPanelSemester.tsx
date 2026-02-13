import { motion } from 'motion/react';
import { Facebook, Linkedin, Github, Mail } from 'lucide-react';
import { Card } from './ui/card';
import { useState, useEffect } from 'react';

interface Person {
  id: number;
  name: string;
  title: string;
  image: string;
  facebook?: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

interface GoverningPanelSemesterProps {
  semester: string;
  year: string;
}

export function GoverningPanelSemester({ semester, year }: GoverningPanelSemesterProps) {
  // Mock data - organized by title
  const panelData: { [key: string]: Person[] } = {
    Advisor: [
      {
        id: 1,
        name: 'Dr. Robert Anderson',
        title: 'Advisor',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        facebook: 'https://facebook.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        email: 'robert.anderson@example.com'
      }
    ],
    President: [
      {
        id: 2,
        name: 'John Doe',
        title: 'President',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        facebook: 'https://facebook.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        email: 'john.doe@example.com'
      }
    ],
    'Vice President': [
      {
        id: 3,
        name: 'Jane Smith',
        title: 'Vice President',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        facebook: 'https://facebook.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        email: 'jane.smith@example.com'
      }
    ],
    'General Secretary': [
      {
        id: 4,
        name: 'Alex Johnson',
        title: 'General Secretary',
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
        facebook: 'https://facebook.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        email: 'alex.johnson@example.com'
      }
    ],
    'Joint Secretary': [
      {
        id: 5,
        name: 'Michael Chen',
        title: 'Joint Secretary',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
        facebook: 'https://facebook.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        email: 'michael.chen@example.com'
      }
    ],
    'Organizing Secretary': [
      {
        id: 6,
        name: 'Emily Rodriguez',
        title: 'Organizing Secretary',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        facebook: 'https://facebook.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        email: 'emily.rodriguez@example.com'
      }
    ],
    Treasurer: [
      {
        id: 7,
        name: 'Maria Garcia',
        title: 'Treasurer',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
        facebook: 'https://facebook.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        email: 'maria.garcia@example.com'
      }
    ],
    Director: [
      {
        id: 8,
        name: 'David Kim',
        title: 'Director',
        image: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400',
        facebook: 'https://facebook.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        email: 'david.kim@example.com'
      }
    ],
    'Assistant Director': [
      {
        id: 9,
        name: 'Lisa Wang',
        title: 'Assistant Director',
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
        facebook: 'https://facebook.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        email: 'lisa.wang@example.com'
      }
    ],
    'Deputy Executive Panel': [
      {
        id: 10,
        name: 'Tom Wilson',
        title: 'Deputy Executive Panel',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
        facebook: 'https://facebook.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        email: 'tom.wilson@example.com'
      },
      {
        id: 11,
        name: 'Sarah Lee',
        title: 'Deputy Executive Panel',
        image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
        facebook: 'https://facebook.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        email: 'sarah.lee@example.com'
      }
    ],
    'Sub Executive Panel': [
      {
        id: 12,
        name: 'Kevin Martinez',
        title: 'Sub Executive Panel',
        image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400',
        facebook: 'https://facebook.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        email: 'kevin.martinez@example.com'
      },
      {
        id: 13,
        name: 'Emma Davis',
        title: 'Sub Executive Panel',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
        facebook: 'https://facebook.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        email: 'emma.davis@example.com'
      },
      {
        id: 14,
        name: 'Ryan Patel',
        title: 'Sub Executive Panel',
        image: 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=400',
        facebook: 'https://facebook.com',
        linkedin: 'https://linkedin.com',
        github: 'https://github.com',
        email: 'ryan.patel@example.com'
      }
    ]
  };

  const SocialIcon = ({ href, icon: Icon, label }: { href?: string; icon: any; label: string }) => {
    if (!href) return null;
    return (
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="p-2 rounded-lg bg-[#2ECC71]/10 hover:bg-[#2ECC71]/20 text-[#2ECC71] hover:text-white transition-all border border-[#2ECC71]/20 hover:border-[#2ECC71]/50 hover:shadow-[0_0_20px_0_rgba(46,204,113,0.4)]"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label={label}
      >
        <Icon className="w-4 h-4" />
      </motion.a>
    );
  };

  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black pt-32 pb-20">
      {/* Animated Gradient Background - Same as HeroSection */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        {!isMobile ? (
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[rgba(46,204,113,0.15)] via-transparent to-[rgba(46,204,113,0.15)]"
            style={{ filter: 'blur(64px)' }}
            animate={{
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ) : (
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[rgba(46,204,113,0.1)] via-transparent to-[rgba(46,204,113,0.1)] opacity-30" style={{ filter: 'blur(40px)' }} />
        )}
      </div>

      {/* Neon Gradient Orbs - Hidden on mobile for performance */}
      <div className="hidden lg:block absolute inset-0 opacity-30 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 -left-20 w-96 h-96 bg-[#2ECC71] rounded-full"
          style={{ filter: 'blur(100px)', transform: 'translateZ(0)' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-[#27AE60] rounded-full"
          style={{ filter: 'blur(100px)', transform: 'translateZ(0)' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-4"
          >
            <span className="px-6 py-2 rounded-full bg-gradient-to-r from-[#2ECC71]/20 to-[#27AE60]/20 border border-[#2ECC71]/30 text-[#2ECC71] backdrop-blur-sm shadow-[0_0_30px_0_rgba(46,204,113,0.3)]">
              {semester} {year}
            </span>
          </motion.div>
          <h1 className="text-6xl mb-6 bg-gradient-to-r from-white via-[#2ECC71] to-white bg-clip-text text-transparent">
            Governing Panel
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Meet the leadership team driving innovation and excellence
          </p>
        </motion.div>

        {/* Panel Sections */}
        <div className="space-y-16">
          {Object.entries(panelData).map(([title, members], sectionIndex) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
            >
              {/* Section Title */}
              <div className="mb-8">
                <h2 className="text-4xl text-white mb-2 relative inline-block">
                  {title}
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#2ECC71] to-transparent rounded-full shadow-[0_0_20px_0_rgba(46,204,113,0.6)]" />
                </h2>
              </div>

              {/* Members Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {members.map((member, index) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: sectionIndex * 0.1 + index * 0.05 }}
                  >
                    <Card className="relative group overflow-hidden bg-gradient-to-br from-black/90 via-[#0a1810]/90 to-black/90 border-[#2ECC71]/20 hover:border-[#2ECC71]/50 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_0_60px_0_rgba(46,204,113,0.3)]">
                      {/* Glow Effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71]/5 via-transparent to-[#27AE60]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Profile Image */}
                      <div className="relative w-full overflow-hidden">
                        <motion.img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-auto object-contain"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>

                      {/* Content */}
                      <div className="relative p-6 space-y-4">
                        <div>
                          <h3 className="text-2xl text-white mb-2">{member.name}</h3>
                          <p className="text-[#2ECC71]">{member.title}</p>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-3 pt-4 border-t border-[#2ECC71]/20">
                          <SocialIcon href={member.facebook} icon={Facebook} label="Facebook" />
                          <SocialIcon href={member.linkedin} icon={Linkedin} label="LinkedIn" />
                          <SocialIcon href={member.github} icon={Github} label="GitHub" />
                          <SocialIcon href={member.email} icon={Mail} label="Email" />
                        </div>
                      </div>

                      {/* Hover Border Effect */}
                      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_30px_0_rgba(46,204,113,0.2)]" />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}