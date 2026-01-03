import { motion } from 'motion/react';
import { ArrowLeft, ChevronLeft, ChevronRight, Users, FileText } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useState } from 'react';
import { ProjectData, ProjectSection } from './ProjectData';

interface ProjectDetailPageProps {
  project: ProjectData;
  onBack: () => void;
}

export function ProjectDetailPage({ project, onBack }: ProjectDetailPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPdfViewer, setShowPdfViewer] = useState(false);

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.carouselImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.carouselImages.length - 1 : prev - 1
    );
  };

  const pdfPreviewUrl = project.pdfLink;

  return (
    <main className="min-h-screen bg-black relative overflow-x-hidden">
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

      {/* Fixed Back Button (top) */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-20 left-6 z-50"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[rgba(46,204,113,0.15)] to-[rgba(46,204,113,0.05)] rounded-lg border border-[rgba(46,204,113,0.4)] hover:border-[rgba(46,204,113,0.7)] text-[#2ECC71] transition-all hover:shadow-[0_0_20px_0_rgba(46,204,113,0.4)]"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="hidden sm:inline">Back to Projects</span>
        </button>
      </motion.div>

      <div className="container mx-auto px-4 pt-20 pb-24 max-w-6xl">
        {/* Image Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-[0_0_60px_0_rgba(46,204,113,0.3)]">
            <div className="aspect-video relative">
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
                      <div className="space-y-6 text-justify mb-8">
                        {section.description.split('\n\n').map((paragraph, idx) => (
                          <p
                            key={idx}
                            className="text-gray-300 leading-relaxed text-base md:text-lg"
                          >
                            {paragraph.trim()}
                          </p>
                        ))}
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
                              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
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

      {/* Floating Back Button (bottom) */}
       <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        onClick={onBack}
        className="fixed right-6 bottom-6 md:right-8 md:bottom-8 z-50 px-6 py-3 bg-[#2ECC71] hover:bg-[#27AE60] text-white rounded-full shadow-[0_0_30px_0_rgba(46,204,113,0.5)] hover:shadow-[0_0_40px_0_rgba(46,204,113,0.7)] transition-all font-semibold flex items-center gap-2"
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </motion.button>
    </main>
  );
}