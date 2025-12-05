import { motion } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/config/firebase';

interface EducationalProgram {
  id: string;
  Name: string;
  Image_1: string;
  Order: number;
  Description: string;
}

export function EducationalProgramsSection() {
  const [programs, setPrograms] = useState<EducationalProgram[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const programsCollection = collection(db, 'All_Data', 'Educational, Mentorship & Training Programs', 'educational, mentorship & training programs');
        const q = query(programsCollection, orderBy('Order', 'asc'));
        const querySnapshot = await getDocs(q);

        const fetchedPrograms: EducationalProgram[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          console.log('Program data:', data); // Debug log
          fetchedPrograms.push({
            id: doc.id,
            Name: data.Name || '',
            Image_1: data.Image_1 || data.image_1 || '',
            Description: data.Description || '',
            Order: data.Order || 0,
          });
        });

        // Sort by Order to ensure correct sequence and take only first 2
        const topPrograms = fetchedPrograms
          .sort((a, b) => a.Order - b.Order)
          .slice(0, 2);

        console.log('Fetched programs:', topPrograms); // Debug log
        setPrograms(topPrograms);
      } catch (error) {
        console.error('Error fetching educational programs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <section id="programs" className="py-20 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(46,204,113,0.1)] via-transparent to-[rgba(46,204,113,0.1)] blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[rgba(46,204,113,0.1)] to-[rgba(46,204,113,0.05)] rounded-full border border-[rgba(46,204,113,0.3)] mb-4">
            <span className="text-[#2ECC71] text-sm">Learn & Grow</span>
          </div>
          <h2 className="mb-4 tracking-tight text-white text-5xl">Educational Programs</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Simple steps to mastery. No technical background required.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading educational programs...</p>
          </div>
        ) : programs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400">No educational programs found</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="h-full"
              >
                <Card className="group cursor-pointer bg-gradient-to-br from-[rgba(46,204,113,0.05)] to-transparent border-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_0_rgba(46,204,113,0.3)] overflow-hidden backdrop-blur-sm flex flex-col h-full relative">
                  {/* Image Section with enhanced styling */}
                  <div className="relative overflow-hidden h-64">
                    {program.Image_1 ? (
                      <>
                        <img
                          src={program.Image_1}
                          alt={program.Name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2ECC71]/30 to-[#27AE60]/10">
                        <span className="text-[#2ECC71] text-center px-4">{program.Name}</span>
                      </div>
                    )}

                    {/* Order badge */}
                    <div className="absolute top-4 right-4 z-10">
                      <div className="w-3 h-3 bg-[#2ECC71] rounded-full shadow-[0_0_20px_0_rgba(46,204,113,0.8)]" />
                    </div>
                  </div>

                  {/* Content Section */}
                  <CardContent className="p-6 space-y-4 bg-black/40 backdrop-blur-sm flex-1 flex flex-col">
                    <h3 className="tracking-tight group-hover:text-[#2ECC71] transition-colors text-white">
                      {program.Name}
                    </h3>

                    <p className="text-gray-400 text-sm flex-1" style={{ display: '-webkit-box', WebkitLineClamp: 4, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {program.Description}
                    </p>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full group-hover:bg-[#2ECC71] group-hover:text-white transition-all text-[#2ECC71] border border-[rgba(46,204,113,0.3)] hover:shadow-[0_0_20px_0_rgba(46,204,113,0.5)] px-4 py-2 rounded-lg font-medium text-sm inline-flex items-center justify-center gap-2"
                    >
                      <span>View Details</span>
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
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
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative px-8 py-3 bg-gradient-to-r from-[rgba(46,204,113,0.15)] to-[rgba(46,204,113,0.05)] rounded-full border border-[rgba(46,204,113,0.4)] hover:border-[rgba(46,204,113,0.7)] text-[#2ECC71] font-semibold text-base transition-all duration-300 hover:shadow-[0_0_30px_0_rgba(46,204,113,0.4)] overflow-hidden group"
          >
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              whileHover={{ x: '100%' }}
              transition={{ duration: 0.6 }}
            />

            <span className="relative inline-flex items-center gap-2">
              Explore All Programs
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

