import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ExternalLink, X } from 'lucide-react';
import { Button } from './ui/button';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '@/config/firebase';

interface ProjectData {
  id: string;
  Title: string;
  Introduction: string;
  Cover_Picture: string;
  Order: number;
  Owner_1_Name?: string;
  Owner_1_Designation_Department?: string;
  Owner_2_Name?: string;
  Owner_2_Designation_Department?: string;
  Owner_3_Name?: string;
  Owner_3_Designation_Department?: string;
  Owner_4_Name?: string;
  Owner_4_Designation_Department?: string;
  [key: string]: string | number | undefined;
}

const statusColors: Record<string, string> = {
  'In Progress': 'bg-blue-500',
  'Completed': 'bg-[#2ECC71]',
  'Planning': 'bg-orange-500',
};

export function ResearchProjectsSection() {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [cachedImages, setCachedImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projectsCollection = collection(db, 'All_Data', 'Research_Page', 'All_Projects_of_RC');
        const q = query(projectsCollection, orderBy('Order', 'asc'));
        const querySnapshot = await getDocs(q);
        
        const fetchedProjects: ProjectData[] = [];
        querySnapshot.forEach((doc) => {
          if (fetchedProjects.length < 4) {
            fetchedProjects.push({
              id: doc.id,
              ...doc.data() as Omit<ProjectData, 'id'>,
            });
          }
        });
        
        setProjects(fetchedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  useEffect(() => {
    const cacheImages = async () => {
      const cached: { [key: string]: string } = {};
      for (const project of projects) {
        if (project.Cover_Picture) {
          try {
            const response = await fetch(project.Cover_Picture);
            const blob = await response.blob();
            const reader = new FileReader();
            reader.onload = () => {
              cached[project.id] = reader.result as string;
              if (Object.keys(cached).length === projects.length) {
                setCachedImages(cached);
              }
            };
            reader.readAsDataURL(blob);
          } catch (error) {
            cached[project.id] = project.Cover_Picture;
          }
        }
      }
    };
    if (projects.length > 0) {
      cacheImages();
    }
  }, [projects]);

  const getOwners = (project: ProjectData) => {
    const owners = [];
    for (let i = 1; i <= 4; i++) {
      const nameKey = `Owner_${i}_Name`;
      const designationKey = `Owner_${i}_Designation_Department`;
      const name = project[nameKey];
      const designation = project[designationKey];
      if (name) {
        owners.push({
          name,
          designation: designation || '',
        });
      }
    }
    return owners;
  };
  return (
    <>
      <section id="projects" className="py-20 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#2ECC71] rounded-full blur-[150px]" />
          <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#27AE60] rounded-full blur-[150px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block px-4 py-2 bg-gradient-to-r from-[rgba(46,204,113,0.1)] to-[rgba(46,204,113,0.05)] rounded-full border border-[rgba(46,204,113,0.3)] mb-4">
              <span className="text-[#2ECC71] text-sm">Research & Innovation</span>
            </div>
            <h2 className="mb-4 tracking-tight text-white text-5xl">Built for Performance</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We push the limits with state-of-the-art research. Fast, scalable, and innovative solutions.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {loading ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400">Loading projects...</p>
              </div>
            ) : projects.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-400">No projects found</p>
              </div>
            ) : (
              projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="h-full cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <Card className="group overflow-hidden bg-gradient-to-br from-[rgba(46,204,113,0.05)] to-transparent border-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.5)] transition-all duration-300 hover:shadow-[0_0_40px_0_rgba(46,204,113,0.3)] h-full backdrop-blur-sm pointer-events-none">
                    <div className="relative overflow-hidden aspect-video max-h-48">
                      <img
                        src={cachedImages[project.id] || project.Cover_Picture}
                        alt={project.Title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                        <div className="text-white flex items-center gap-2 bg-[#2ECC71] px-4 py-2 rounded-full shadow-[0_0_30px_0_rgba(46,204,113,0.8)]">
                          <span>View Details</span>
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className="w-3 h-3 bg-[#2ECC71] rounded-full shadow-[0_0_20px_0_rgba(46,204,113,0.8)]" />
                      </div>
                    </div>

                    <CardContent className="p-4 space-y-3 bg-black/40 backdrop-blur-sm">
                      <h3 className="tracking-tight group-hover:text-[#2ECC71] transition-colors text-white">
                        {project.Title}
                      </h3>

                      <p className="text-gray-400 text-sm line-clamp-2">
                        {project.Introduction}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Modal Portal - Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            style={{ zIndex: 99999 }}
            onClick={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>

      {/* Modal Portal - Content */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none p-3 sm:p-4 md:p-6 overflow-hidden"
            style={{ zIndex: 100000 }}
          >
            <div
              className="bg-gradient-to-br from-[rgba(46,204,113,0.1)] to-transparent border border-[rgba(46,204,113,0.3)] rounded-lg w-full max-w-2xl sm:max-w-4xl h-[95vh] sm:h-[90vh] md:h-[85vh] flex flex-col shadow-2xl pointer-events-auto overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 flex justify-end p-3 sm:p-4 bg-black/40 backdrop-blur-sm border-b border-[rgba(46,204,113,0.3)] z-10 flex-shrink-0">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-1.5 sm:p-2 hover:bg-[rgba(46,204,113,0.2)] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#2ECC71]" />
                </button>
              </div>

              <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-[#2ECC71]/50 scrollbar-track-transparent">
                <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                  {/* Cover Image */}
                  <div className="relative rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={selectedProject.Cover_Picture}
                      alt={selectedProject.Title}
                      className="w-full h-40 sm:h-48 md:h-56 object-cover"
                    />
                  </div>

                  {/* Title */}
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                      {selectedProject.Title}
                    </h2>
                    <div className="w-12 h-1 bg-[#2ECC71] rounded-full" />
                  </div>

                  {/* Introduction */}
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#2ECC71] mb-3">
                      About This Project
                    </h3>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap">
                      {selectedProject.Introduction}
                    </p>
                  </div>

                  {/* Owners/Team Members */}
                  {getOwners(selectedProject).length > 0 && (
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-[#2ECC71] mb-3 sm:mb-4">
                        Project Team
                      </h3>
                      <div className="space-y-3 sm:space-y-4">
                        {getOwners(selectedProject).map((owner, index) => (
                          <div key={index} className="bg-[rgba(46,204,113,0.1)] border border-[rgba(46,204,113,0.3)] rounded-lg p-3 sm:p-4">
                            <h4 className="text-white font-semibold mb-1 text-sm sm:text-base">
                              {owner.name}
                            </h4>
                            <p className="text-gray-300 text-xs sm:text-sm">
                              {owner.designation}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button
                    onClick={() => setSelectedProject(null)}
                    className="w-full bg-[#2ECC71] text-white hover:bg-[#27AE60] transition-all mt-2 sm:mt-4"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
