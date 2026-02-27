import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { ArrowRight, BookOpen, Users, Clock, GraduationCap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { useNavigate } from 'react-router-dom';

interface EducationalProgram {
  id: string;
  Name: string;
  Image_1: string;
  Order: number;
  Description: string;
}

export function EducationalProgramsSection() {
  const navigate = useNavigate();
  const [programs, setPrograms] = useState<EducationalProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [cachedImages, setCachedImages] = useState<{ [key: string]: string }>({});
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [stats, setStats] = useState([
    { icon: Users, value: '0', label: 'Students Enrolled' },
    { icon: BookOpen, value: '0', label: 'Programs Available' },
    { icon: Clock, value: '0', label: 'Hours of Content' }
  ]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const programsCollection = collection(db, 'All_Data', 'Educational, Mentorship & Training Programs', 'educational, mentorship & training programs');
        const q = query(programsCollection, orderBy('Order', 'asc'));
        const querySnapshot = await getDocs(q);

        const fetchedPrograms: EducationalProgram[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          fetchedPrograms.push({
            id: doc.id,
            Name: data.Name || '',
            Image_1: data.Image_1 || data.image_1 || '',
            Description: data.Description || '',
            Order: data.Order || 0,
          });
        });

        const topPrograms = fetchedPrograms
          .sort((a, b) => a.Order - b.Order)
          .slice(0, 2);

        setPrograms(topPrograms);

        let totalStudents = 0;
        let totalHours = 0;
        let validStudentsCount = 0;
        let validHoursCount = 0;
        
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const students = Number(data.Students_Enrolled || data.StudentsEnrolled || data.students || data.Students || data.Enrolled || 0);
          const hours = Number(data.Hours_of_Content || data.HoursOfContent || data.hours || data.Hours || 0);
          
          if (students > 0) validStudentsCount++;
          if (hours > 0) validHoursCount++;
          
          totalStudents += isNaN(students) ? 0 : students;
          totalHours += isNaN(hours) ? 0 : hours;
        });

        const newStats = [
          { icon: Users, value: validStudentsCount > 0 ? `${totalStudents}+` : `${fetchedPrograms.length * 20}+`, label: 'Students Enrolled' },
          { icon: BookOpen, value: `${fetchedPrograms.length}+`, label: 'Programs Available' },
          { icon: Clock, value: validHoursCount > 0 ? `${totalHours}+` : `${fetchedPrograms.length * 10}+`, label: 'Hours of Content' }
        ];
        
        setStats(newStats);

      } catch (error) {
        console.error('Error fetching educational programs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  useEffect(() => {
    const cacheImages = async () => {
      const cached: { [key: string]: string } = {};
      for (const program of programs) {
        if (program.Image_1) {
          try {
            const response = await fetch(program.Image_1);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onload = () => {
              cached[program.id] = reader.result as string;
              if (Object.keys(cached).length === programs.length) {
                setCachedImages(cached);
              }
            };
            reader.readAsDataURL(blob);
          } catch (error) {
            cached[program.id] = program.Image_1;
          }
        }
      }
    };
    if (programs.length > 0) {
      cacheImages();
    }
  }, [programs]);



  return (
    <section id="programs" className="py-24 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(46,204,113,0.1)] via-transparent to-[rgba(46,204,113,0.1)] blur-3xl" />
      </div>

      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#2ECC71]/20 rounded-full"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-20"
        >

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="mb-6 tracking-tight text-white text-4xl md:text-5xl lg:text-6xl font-bold"
          >
            Educational{' '}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] to-[#27AE60]">
                Programs
              </span>
              <motion.span
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#2ECC71] to-transparent rounded-full"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.15 }}
              />
            </span>
          </motion.h2>

        </motion.div>

        {/* Programs Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <motion.div
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="w-12 h-12 border-4 border-[rgba(46,204,113,0.3)] border-t-[#2ECC71] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-gray-400 text-sm">Loading programs...</p>
            </motion.div>
          </div>
        ) : programs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <BookOpen className="w-16 h-16 text-[rgba(46,204,113,0.3)] mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No educational programs found</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.07 }}
                className="h-full"
                onMouseEnter={() => setHoveredCard(program.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card className="group cursor-pointer bg-gradient-to-br from-[rgba(46,204,113,0.08)] via-[rgba(46,204,113,0.02)] to-transparent border-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.6)] transition-all duration-500 hover:shadow-[0_0_60px_0_rgba(46,204,113,0.25)] overflow-hidden backdrop-blur-sm flex flex-col h-full relative">
                  {/* Animated border glow */}
                  <motion.div
                    className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(90deg, transparent, rgba(46,204,113,0.1), transparent)',
                    }}
                    animate={hoveredCard === program.id ? {
                      x: ['-100%', '100%'],
                    } : {}}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />

                  {/* Image Section */}
                  <div className="relative overflow-hidden h-64">
                    {program.Image_1 ? (
                      <>
                        <motion.img
                          src={cachedImages[program.id] || program.Image_1}
                          alt={program.Name}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(46,204,113,0.1)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2ECC71]/20 to-[#27AE60]/5">
                        <GraduationCap className="w-20 h-20 text-[#2ECC71]/50" />
                      </div>
                    )}


                  </div>

                  {/* Content Section */}
                  <CardContent className="p-6 space-y-5 bg-gradient-to-b from-black/60 to-black/80 backdrop-blur-sm flex-1 flex flex-col relative">
                    <div className="space-y-3">
                      <motion.h3
                        className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-[#2ECC71] transition-colors duration-300"
                        layout
                      >
                        {program.Name}
                      </motion.h3>


                    </div>

                    <p
                      className="text-gray-400 text-sm leading-relaxed flex-1"
                      style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      {program.Description}
                    </p>

                    <motion.button
                      onClick={() => navigate(`/activity/educational-activities/${program.id}`)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full relative overflow-hidden bg-transparent group-hover:bg-[#2ECC71] border border-[rgba(46,204,113,0.4)] group-hover:border-[#2ECC71] text-[#2ECC71] group-hover:text-white transition-all duration-300 px-5 py-3 rounded-xl font-semibold text-sm inline-flex items-center justify-center gap-2 hover:shadow-[0_0_30px_0_rgba(46,204,113,0.4)] mt-4"
                    >
                      <span className="relative z-10">Explore Program</span>
                      <motion.span
                        className="relative z-10"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.span>
                    </motion.button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Explore All Programs Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="flex justify-center mt-6"
        >
          <motion.button
            onClick={() => navigate('/activities/educational-activities')}
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="relative px-10 py-4 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-full text-white font-bold text-base transition-all duration-300 shadow-[0_0_30px_0_rgba(46,204,113,0.3)] hover:shadow-[0_0_50px_0_rgba(46,204,113,0.5)] overflow-hidden group"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              initial={{ x: "-150%" }}
              whileHover={{ x: "150%" }}
              transition={{ duration: 0.8 }}
            />

            <span className="relative inline-flex items-center gap-3">
              <GraduationCap className="w-5 h-5" />
              Explore All Programs
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </span>
          </motion.button>
        </motion.div>


        {/* Bottom decorative element */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center mt-12"
        >
          <div className="flex items-center gap-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-1.5 bg-[rgba(46,204,113,0.4)] rounded-full"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [1, 1.3, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}