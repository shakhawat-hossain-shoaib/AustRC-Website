import { motion } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight, Users, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '@/config/firebase';
import { ProjectData, ProjectSection, MANUAL_PROJECTS } from './ProjectData';
import { slugify } from '@/utils/slugify';

interface ProjectDetailPageProps {
  project?: ProjectData;
  onBack?: () => void;
}

export function ProjectDetailPage({ project: propProject, onBack }: ProjectDetailPageProps) {
  const { projectSlug } = useParams<{ projectSlug?: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [expandedCodeSections, setExpandedCodeSections] = useState<{ [key: number]: boolean }>({});
  const [project, setProject] = useState<ProjectData | null>(propProject || null);
  const [loading, setLoading] = useState(!propProject && !!projectSlug);
  const [error, setError] = useState(false);

  // Convert Firebase data to ProjectData format
  const convertFirebaseToProjectData = (firebaseData: any): ProjectData => {
    const teamMembers = [];
    for (let i = 1; i <= 4; i++) {
      const nameKey = `Owner_${i}_Name`;
      const designationKey = `Owner_${i}_Designation_Department`;
      const name = firebaseData[nameKey];
      const designation = firebaseData[designationKey];
      if (name) {
        teamMembers.push({
          name,
          designation: designation || "",
          role: i === 1 ? "Project Lead" : "Team Member",
        });
      }
    }

    const carouselImages = [];
    if (firebaseData.Cover_Picture) {
      carouselImages.push(firebaseData.Cover_Picture);
    }

    const sections: ProjectSection[] = [];
    for (let i = 1; i <= 100; i++) {
      const sectionName = firebaseData[`Section_${i}_Name`];
      const sectionDescription = firebaseData[`Section_${i}_Description`];
      const sectionImages: string[] = [];
      
      for (let j = 1; j <= 50; j++) {
        const imgKey = `Section_${i}_Image_${j}`;
        if (firebaseData[imgKey]) {
          sectionImages.push(firebaseData[imgKey]);
        }
      }
      
      if (sectionName || sectionDescription || sectionImages.length > 0) {
        sections.push({
          heading: sectionName || "",
          description: sectionDescription || "",
          images: sectionImages,
        });
      }
    }

    const projectData: ProjectData = {
      id: firebaseData.id,
      title: firebaseData.Title || firebaseData.id || "",
      coverImage: firebaseData.Cover_Picture || "",
      shortDescription: firebaseData.Subtitle || firebaseData.Introduction || "",
      fullDescription: firebaseData.Introduction || "",
      carouselImages: carouselImages.length > 0 ? carouselImages : [firebaseData.Cover_Picture || ""],
      teamMembers: teamMembers,
      tags: firebaseData.Tags || [],
      order: firebaseData.Order || 0,
      pdfLink: firebaseData.PDF_Link || firebaseData.pdfLink || "",
      sections: sections,
    };

    return projectData;
  };

  // Fetch project from Firebase if accessed via URL param
  useEffect(() => {
    if (propProject) {
      // Project passed as prop (internal navigation)
      setProject(propProject);
      setLoading(false);
      return;
    }

    if (!projectSlug) {
      setLoading(false);
      setError(true);
      return;
    }

    // Check MANUAL_PROJECTS first by comparing slugified titles
    const manualProject = MANUAL_PROJECTS.find(p => slugify(p.title) === projectSlug);
    if (manualProject) {
      setProject(manualProject);
      setLoading(false);
      return;
    }

    // Fetch from Firebase
    const fetchProject = async () => {
      try {
        const projectsCollection = collection(
          db,
          "All_Data",
          "Research_Projects",
          "research_projects"
        );
        const q = query(projectsCollection);
        const querySnapshot = await getDocs(q);

        let foundProject: ProjectData | null = null;
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const projectTitle = data.Title || doc.id || "";
          // Compare slugified title with the URL slug
          if (slugify(projectTitle) === projectSlug) {
            foundProject = convertFirebaseToProjectData({ ...data, id: doc.id });
          }
        });

        if (foundProject) {
          setProject(foundProject);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching project:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectSlug, propProject]);

  const nextImage = () => {
    if (!project) return;
    setCurrentImageIndex((prev) =>
      prev === project.carouselImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!project) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.carouselImages.length - 1 : prev - 1
    );
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate('/research-projects');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-[#2ECC71] text-2xl">Loading project...</div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
        <div className="text-white text-2xl">Project not found</div>
        <button
          onClick={handleBack}
          className="px-6 py-3 bg-[#2ECC71] text-white rounded-lg font-semibold hover:bg-[#27AE60] transition-all"
        >
          Back to Projects
        </button>
      </main>
    );
  }

  const pdfPreviewUrl = project.pdfLink;

  return (
    <main className="min-h-screen bg-black relative overflow-x-hidden">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="fixed top-24 left-6 z-40 flex items-center gap-2 px-4 py-2 text-[#2ECC71] hover:text-white bg-black/50 hover:bg-black/80 rounded-lg backdrop-blur-md transition-all border border-[#2ECC71]/30 hover:border-[#2ECC71]"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden sm:inline">Back</span>
      </button>

      {/* Animated background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#2ECC71] rounded-full opacity-10"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            animate={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 pt-20 pb-24 max-w-6xl">
        {/* Image Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-[0_0_60px_0_rgba(46,204,113,0.3)]">
            <div className="relative bg-black/40 aspect-video max-h-48 sm:max-h-52">
              {project.carouselImages[currentImageIndex] ? (
                <img
                  src={project.carouselImages[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2ECC71]/30 to-[#27AE60]/10">
                  <span className="text-[#2ECC71] text-2xl text-center px-8">
                    {project.title}
                  </span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Carousel Controls */}
              {project.carouselImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* Dots Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {project.carouselImages.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          idx === currentImageIndex
                            ? 'bg-[#2ECC71] w-8'
                            : 'bg-white/50 hover:bg-white/80'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[rgba(46,204,113,0.1)] to-[rgba(46,204,113,0.05)] rounded-full border border-[rgba(46,204,113,0.3)] mb-6">
            <span className="text-[#2ECC71] text-sm">Research Project</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            {project.title}
          </h1>
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-[rgba(46,204,113,0.1)] border border-[rgba(46,204,113,0.3)] rounded-full text-[#2ECC71] text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="w-20 h-1.5 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-full mt-6" />
        </motion.div>

        {/* Team Members Card */}
        {project.teamMembers && project.teamMembers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-12"
          >
            <Card className="bg-gradient-to-br from-[rgba(46,204,113,0.05)] to-transparent border-[rgba(46,204,113,0.2)] overflow-hidden backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-[#2ECC71] mb-6 flex items-center gap-3">
                  <Users className="w-6 h-6" />
                  Project Team
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {project.teamMembers.map((member, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 + idx * 0.1 }}
                      className="bg-[rgba(46,204,113,0.08)] border border-[rgba(46,204,113,0.2)] rounded-lg p-4 hover:border-[rgba(46,204,113,0.4)] transition-all hover:shadow-[0_0_20px_0_rgba(46,204,113,0.2)]"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2ECC71] to-[#27AE60] flex items-center justify-center text-white font-bold flex-shrink-0">
                          {member.name.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-semibold mb-1 truncate">
                            {member.name}
                          </h4>
                          {member.role && (
                            <p className="text-[#2ECC71] text-sm mb-1">
                              {member.role}
                            </p>
                          )}
                          <p className="text-gray-400 text-xs">
                            {member.designation}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* PDF/Text Toggle - Only show if pdfLink exists */}
        {project.pdfLink && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 flex gap-4 justify-center flex-wrap"
          >
            <button
              type="button"
              onClick={() => setShowPdfViewer(false)}
              className={`px-6 py-3 rounded-xl font-semibold shadow-lg transition-all flex items-center gap-2 ring-2 ring-transparent hover:ring-[#2ECC71] ${
                !showPdfViewer
                  ? 'bg-[#2ECC71] text-white shadow-[0_0_25px_rgba(46,204,113,0.6)]'
                  : 'bg-white/10 backdrop-blur-sm text-[#2ECC71] border border-[#2ECC71]/50 hover:bg-white/20'
              }`}
            >
              📄 Content View
            </button>
            <button
              type="button"
              onClick={() => setShowPdfViewer(true)}
              className={`px-6 py-3 rounded-xl font-semibold shadow-lg transition-all flex items-center gap-2 ring-2 ring-transparent hover:ring-[#2ECC71] ${
                showPdfViewer
                  ? 'bg-[#2ECC71] text-white shadow-[0_0_25px_rgba(46,204,113,0.6)]'
                  : 'bg-white/10 backdrop-blur-sm text-[#2ECC71] border border-[#2ECC71]/50 hover:bg-white/20'
              }`}
            >
              <FileText className="w-5 h-5" />
              PDF View
            </button>
          </motion.div>
        )}

        {/* Content View - Main Description + Dynamic Sections */}
        {!showPdfViewer && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            key="content-view"
            className="space-y-12"
          >
            {/* Main Project Overview */}
            {project.fullDescription && (
              <Card className="bg-gradient-to-br from-[rgba(46,204,113,0.05)] to-transparent border-[rgba(46,204,113,0.2)] overflow-hidden backdrop-blur-sm">
                <CardContent className="p-8 md:p-12">
                  <h2 className="text-2xl font-bold text-[#2ECC71] mb-8 flex items-center gap-3">
                    <div className="w-2 h-8 bg-[#2ECC71] rounded-full" />
                    Project Overview
                  </h2>
                  <div className="space-y-6 text-justify">
                    {project.fullDescription.split('\n\n').map((paragraph, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                        className="text-gray-300 leading-relaxed text-base md:text-lg"
                      >
                        {paragraph.trim()}
                      </motion.p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Dynamic Sections from Firebase */}
            {project.sections && project.sections.length > 0 && project.sections.map((section, sectionIdx) => (
              <motion.div
                key={sectionIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + sectionIdx * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-[rgba(46,204,113,0.05)] to-transparent border-[rgba(46,204,113,0.2)] overflow-hidden backdrop-blur-sm">
                  <CardContent className="p-8 md:p-12">
                    {/* Section Name/Heading */}
                    {section.heading && (
                      <h2 className="text-2xl font-bold text-[#2ECC71] mb-8 flex items-center gap-3">
                        <div className="w-2 h-8 bg-[#2ECC71] rounded-full" />
                        {section.heading}
                      </h2>
                    )}

                    {/* Section Description */}
                    {section.description && (
                      <div className="space-y-6 mb-8">
                        {/* Check if this is a code section */}
                        {section.heading?.toLowerCase().includes('code') || 
                         section.heading?.toLowerCase().includes('arduino') ||
                         section.description.includes('void setup()') ||
                         section.description.includes('void loop()') ||
                         section.description.includes('#include') ? (
                          // Code section styling with collapse/expand
                          <div className="relative">
                            <div className="absolute top-4 right-4 px-3 py-1 bg-[#2ECC71]/20 border border-[#2ECC71]/40 rounded text-[#2ECC71] text-xs font-semibold z-10">
                              CODE
                            </div>
                            <div className={`relative transition-all duration-300 ${
                              expandedCodeSections[sectionIdx] ? '' : 'max-h-[200px] overflow-hidden'
                            }`}>
                              <pre className="bg-gradient-to-br from-gray-900 to-black border border-[#2ECC71]/30 rounded-xl p-6 overflow-x-auto shadow-lg">
                                <code className="text-white text-sm font-mono leading-loose whitespace-pre block">
                                  {section.description}
                                </code>
                              </pre>
                              {!expandedCodeSections[sectionIdx] && (
                                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black via-black/90 to-transparent pointer-events-none rounded-b-xl" />
                              )}
                            </div>
                            <button
                              onClick={() => setExpandedCodeSections(prev => ({
                                ...prev,
                                [sectionIdx]: !prev[sectionIdx]
                              }))}
                              className="mt-2 w-full px-4 py-3 bg-[#2ECC71]/10 hover:bg-[#2ECC71]/20 border border-[#2ECC71]/30 hover:border-[#2ECC71]/50 rounded-lg text-[#2ECC71] font-semibold transition-all flex items-center justify-center gap-2"
                            >
                              {expandedCodeSections[sectionIdx] ? (
                                <>
                                  <ChevronUp className="w-5 h-5" />
                                  Collapse Code
                                </>
                              ) : (
                                <>
                                  <ChevronDown className="w-5 h-5" />
                                  Expand Full Code
                                </>
                              )}
                            </button>
                          </div>
                        ) : (
                          // Regular text section
                          <div className="text-justify">
                            {section.description.split('\n\n').map((paragraph, idx) => (
                              <p
                                key={idx}
                                className="text-gray-300 leading-relaxed text-base md:text-lg mb-6"
                              >
                                {paragraph.trim()}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Section Images Grid */}
                    {section.images && section.images.length > 0 && (
                      <div className={`grid gap-4 ${
                        section.images.length === 1 ? 'grid-cols-1' :
                        section.images.length === 2 ? 'grid-cols-1 md:grid-cols-2' :
                        section.images.length === 3 ? 'grid-cols-1 md:grid-cols-3' :
                        'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                      }`}>
                        {section.images.map((image, imgIdx) => (
                          <motion.div
                            key={imgIdx}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: imgIdx * 0.1 }}
                            className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-[0_0_30px_0_rgba(46,204,113,0.4)] transition-all"
                          >
                            <img
                              src={image}
                              alt={`${section.heading || 'Section'} - Image ${imgIdx + 1}`}
                              className="w-full h-auto object-contain"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* PDF Viewer */}
        {showPdfViewer && pdfPreviewUrl && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            key="pdf-view"
          >
            <Card className="bg-gradient-to-br from-[rgba(46,204,113,0.08)] to-transparent border-[rgba(46,204,113,0.3)] overflow-hidden backdrop-blur-sm">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-[#2ECC71] mb-8 flex items-center gap-3">
                  <FileText className="w-6 h-6" />
                  Full Research Paper
                </h2>
                <iframe
                  src={pdfPreviewUrl}
                  className="w-full h-[600px] md:h-[80vh] rounded-2xl border-4 border-[#2ECC71]/20 shadow-2xl bg-white"
                  title="Research Paper PDF"
                  allowFullScreen
                />
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

    </main>
  );
}