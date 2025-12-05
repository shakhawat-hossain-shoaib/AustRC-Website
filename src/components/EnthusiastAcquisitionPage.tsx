import { motion } from 'motion/react';
import { 
  Users, 
  Calendar, 
  Megaphone, 
  FlaskConical, 
  Globe, 
  Palette, 
  Video, 
  PenTool,
  CheckCircle,
  ArrowRight,
  Mail,
  Facebook,
  Linkedin,
  Instagram
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function EnthusiastAcquisitionPage() {
  const roles = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Administration',
      description: 'Manage club operations, coordinate activities, and ensure smooth functioning of all club initiatives.'
    },
    {
      icon: <Calendar className="w-8 h-8" />,
      title: 'Event Management',
      description: 'Plan, organize, and execute engaging events, workshops, and competitions for club members and participants.'
    },
    {
      icon: <Megaphone className="w-8 h-8" />,
      title: 'Public Relations',
      description: 'Build relationships, promote club activities, and manage external communications with stakeholders.'
    },
    {
      icon: <FlaskConical className="w-8 h-8" />,
      title: 'Research & Development',
      description: 'Explore cutting-edge robotics technologies, conduct research, and develop innovative projects.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Website Management',
      description: 'Maintain and enhance the club website, ensuring optimal user experience and functionality.'
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Graphics Design',
      description: 'Create stunning visual content, posters, banners, and branding materials for club activities.'
    },
    {
      icon: <Video className="w-8 h-8" />,
      title: 'Video Editing & Content Creation',
      description: 'Produce engaging video content, documentaries, and promotional materials for social media.'
    },
    {
      icon: <PenTool className="w-8 h-8" />,
      title: 'Content Writing',
      description: 'Write compelling articles, blog posts, and documentation to share club achievements and knowledge.'
    }
  ];

  const benefits = [
    'You are highly motivated with a results-driven mindset',
    'You have passion for robotics and believe in its future potential',
    'You are eager to learn, collaborate and grow in an inspiring environment',
    'You want to develop leadership and organizational skills',
    'You seek hands-on experience in your field of interest'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a1a2e] to-gray-900 text-white pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[600px] h-[600px] bg-[#2ECC71]/30 rounded-full blur-[150px] -top-48 -left-48 animate-pulse" />
          <div className="absolute w-[500px] h-[500px] bg-[#27AE60]/30 rounded-full blur-[150px] -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute w-[400px] h-[400px] bg-[#2ECC71]/20 rounded-full blur-[120px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(#2ECC71 1px, transparent 1px), linear-gradient(90deg, #2ECC71 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
        }} />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-block mb-6"
              >
                <div className="px-6 py-2 bg-gradient-to-r from-[#2ECC71]/20 to-transparent border border-[#2ECC71]/50 rounded-full backdrop-blur-sm">
                  <span className="text-[#2ECC71]">AUST Robotics Club Presents</span>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-4xl md:text-6xl mb-6 bg-gradient-to-r from-[#2ECC71] via-green-400 to-[#2ECC71] bg-clip-text text-transparent"
              >
                Enthusiast Acquisition Program
              </motion.h1>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-2xl md:text-3xl mb-8 text-gray-300"
              >
                Sub-Executive Recruitment
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-xl text-gray-400 mb-8 leading-relaxed"
              >
                Are you ready to be part of one of the leading clubs at AUST?
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg text-gray-300 mb-10 leading-relaxed"
              >
                Whether your passion lies in <span className="text-[#2ECC71]">robotics</span>, <span className="text-[#2ECC71]">event management</span>, <span className="text-[#2ECC71]">content creation</span>, or <span className="text-[#2ECC71]">public relations</span> — there's a place for you to shine.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <a
                  href="#apply"
                  className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-xl text-white text-lg hover:shadow-[0_0_40px_0_rgba(46,204,113,0.8)] transition-all hover:scale-105 group"
                >
                  Apply Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </motion.div>

            {/* Right Image - Leaflet */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71]/40 to-[#27AE60]/40 rounded-3xl blur-3xl group-hover:blur-[80px] transition-all" />
              <div className="relative aspect-square max-w-md mx-auto bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border-2 border-[#2ECC71]/60 rounded-3xl overflow-hidden shadow-[0_0_100px_0_rgba(46,204,113,0.5)] hover:shadow-[0_0_150px_0_rgba(46,204,113,0.8)] transition-all">
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageWithFallback 
                    src="https://images.unsplash.com/photo-1759395162739-84190996783c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGNsdWIlMjByZWNydWl0bWVudCUyMHBvc3RlcnxlbnwxfHx8fDE3NjQxNDE0Njd8MA&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="AUST Robotics Club Enthusiast Acquisition Program"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Roles & Responsibilities Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        {/* Background Effect */}
        <div className="absolute inset-0">
          <div className="absolute w-[700px] h-[700px] bg-[#2ECC71]/20 rounded-full blur-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-[#2ECC71] via-green-400 to-[#2ECC71] bg-clip-text text-transparent">
              Sub-Executive Team Roles
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Choose the team that matches your passion and skills. Each role offers unique opportunities for growth and impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71]/30 to-transparent rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative bg-gray-800/50 backdrop-blur-xl border border-[#2ECC71]/30 rounded-2xl p-6 h-full hover:border-[#2ECC71]/60 transition-all hover:shadow-[0_0_40px_0_rgba(46,204,113,0.4)] hover:-translate-y-1 duration-300">
                  <div className="bg-gradient-to-br from-[#2ECC71]/20 to-transparent p-4 rounded-xl inline-block mb-4 border border-[#2ECC71]/40 group-hover:shadow-[0_0_30px_0_rgba(46,204,113,0.5)] transition-all">
                    <div className="text-[#2ECC71]">
                      {role.icon}
                    </div>
                  </div>
                  <h3 className="text-xl mb-3 text-white group-hover:text-[#2ECC71] transition-colors">
                    {role.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {role.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Apply Section */}
      <section className="py-20 px-6 relative overflow-hidden">
        {/* Background Effect */}
        <div className="absolute inset-0">
          <div className="absolute w-[600px] h-[600px] bg-[#27AE60]/20 rounded-full blur-[180px] top-0 right-0 animate-pulse" />
          <div className="absolute w-[500px] h-[500px] bg-[#2ECC71]/20 rounded-full blur-[160px] bottom-0 left-0 animate-pulse" style={{ animationDelay: '1.5s' }} />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-[#2ECC71] via-green-400 to-[#2ECC71] bg-clip-text text-transparent">
              Why Should You Apply?
            </h2>
            <p className="text-xl text-gray-400">
              Join a community of passionate individuals driving innovation in robotics
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71]/20 to-transparent rounded-3xl blur-2xl" />
            <div className="relative bg-gray-800/50 backdrop-blur-xl border border-[#2ECC71]/40 rounded-3xl p-10 md:p-16 shadow-[0_0_80px_0_rgba(46,204,113,0.3)]">
              <div className="grid md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 group"
                  >
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] rounded-full flex items-center justify-center shadow-[0_0_20px_0_rgba(46,204,113,0.6)] group-hover:shadow-[0_0_30px_0_rgba(46,204,113,0.9)] transition-all">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <p className="text-gray-300 text-lg leading-relaxed group-hover:text-white transition-colors">
                      {benefit}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="apply" className="py-20 px-6 relative overflow-hidden">
        {/* Background Effect */}
        <div className="absolute inset-0">
          <div className="absolute w-[800px] h-[800px] bg-[#2ECC71]/30 rounded-full blur-[200px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71]/40 to-[#27AE60]/40 rounded-3xl blur-3xl" />
            <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl border-2 border-[#2ECC71]/60 rounded-3xl p-12 md:p-16 text-center shadow-[0_0_100px_0_rgba(46,204,113,0.6)]">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] rounded-full flex items-center justify-center shadow-[0_0_60px_0_rgba(46,204,113,0.8)]"
              >
                <Users className="w-12 h-12 text-white" />
              </motion.div>

              <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-[#2ECC71] via-green-400 to-[#2ECC71] bg-clip-text text-transparent">
                Ready to Join Us?
              </h2>

              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Take the first step towards an exciting journey with AUST Robotics Club. Apply now and become part of our innovative community!
              </p>

              <div className="space-y-6 mb-10">
                <div className="flex items-center justify-center gap-3 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-[#2ECC71]" />
                  <span>Open to all AUST students</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-[#2ECC71]" />
                  <span>No prior experience required</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-gray-400">
                  <CheckCircle className="w-5 h-5 text-[#2ECC71]" />
                  <span>Multiple team options available</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://forms.gle/your-application-form-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] rounded-xl text-white text-lg hover:shadow-[0_0_60px_0_rgba(46,204,113,1)] transition-all hover:scale-105 group"
                >
                  Apply Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="mailto:austrc@aust.edu"
                  className="inline-flex items-center justify-center gap-3 px-10 py-4 bg-gray-700/50 border border-[#2ECC71]/50 rounded-xl text-white text-lg hover:bg-gray-700/70 hover:border-[#2ECC71] hover:shadow-[0_0_40px_0_rgba(46,204,113,0.4)] transition-all group"
                >
                  <Mail className="w-5 h-5" />
                  Contact Us
                </a>
              </div>

              <p className="text-gray-500 mt-8 text-sm">
                Application deadline will be announced soon. Stay tuned!
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}