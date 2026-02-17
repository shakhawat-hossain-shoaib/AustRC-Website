import { motion, AnimatePresence } from 'motion/react';
import { Download, IdCard, ArrowRight, Smartphone, AlertCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';

const steps = [
  {
    step: 1,
    title: 'Open the Menu',
    description: 'Open the App and go to the ≡ icon.',
    image: 'https://ik.imagekit.io/mekt2pafz/Web%20site%20team/ScreenShot_20260218040616.jpeg',
  },
  {
    step: 2,
    title: 'Find AUSTRC ID Option',
    description: 'Click on the option Find AUSTRC ID.',
    image: 'https://ik.imagekit.io/mekt2pafz/Web%20site%20team/ScreenShot_20260218040641.jpeg',
  },
  {
    step: 3,
    title: 'Enter Your Details',
    description: 'Provide your AUST ID and Institutional Mail.',
    image: 'https://ik.imagekit.io/mekt2pafz/Web%20site%20team/ScreenShot_20260218040710.jpeg',
  },
];

export function FindAustrcIdPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);

    const userAgent = navigator.userAgent.toLowerCase();
    setIsAndroid(/android/i.test(userAgent));

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDownload = () => {
    if (isAndroid) {
      const link = document.createElement('a');
      link.href = 'https://drive.google.com/uc?export=download&id=1EYbPcPy--fzPNJwF__y3Ay1_3f1qaD72';
      link.download = 'AUSTRC-App.apk';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      setShowModal(true);
    }
  };

  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Background — same as Homepage Hero */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        {!isMobile ? (
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[rgba(46,204,113,0.15)] via-transparent to-[rgba(46,204,113,0.15)]"
            style={{ filter: 'blur(64px)' }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        ) : (
          <div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[rgba(46,204,113,0.1)] via-transparent to-[rgba(46,204,113,0.1)] opacity-30"
            style={{ filter: 'blur(40px)' }}
          />
        )}

        {/* Neon orbs — desktop */}
        <div className="hidden lg:block absolute inset-0 opacity-30 overflow-hidden">
          <motion.div
            className="absolute top-20 -left-20 w-96 h-96 bg-[#2ECC71] rounded-full"
            style={{ filter: 'blur(100px)', transform: 'translateZ(0)' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-[#27AE60] rounded-full"
            style={{ filter: 'blur(100px)', transform: 'translateZ(0)' }}
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>

        {/* Static orbs — mobile */}
        <div className="lg:hidden absolute inset-0 opacity-20 overflow-hidden">
          <div className="absolute top-20 -left-20 w-64 h-64 bg-[#2ECC71] rounded-full" style={{ filter: 'blur(60px)' }} />
          <div className="absolute bottom-20 -right-20 w-72 h-72 bg-[#27AE60] rounded-full" style={{ filter: 'blur(60px)' }} />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[rgba(46,204,113,0.1)] rounded-full border border-[rgba(46,204,113,0.3)] mb-5">
              <IdCard className="w-4 h-4 text-[#2ECC71]" />
              <span className="text-[#2ECC71] text-sm font-medium">Member Guide</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
              How to Find Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2ECC71] to-[#27AE60]">
                AUSTRC ID
              </span>
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
              Follow these 3 simple steps in the AUSTRC mobile app to locate your unique member ID.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-20">
            {steps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] rounded-xl text-white font-bold text-lg mb-5 shadow-[0_0_20px_rgba(46,204,113,0.4)]">
                  {item.step}
                </div>

                {/* Screenshot */}
                <div className="relative mb-5">
                  <div className="rounded-2xl overflow-hidden border border-[rgba(46,204,113,0.2)] shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-[180px] sm:w-[200px] h-auto"
                      loading={index === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                </div>

                {/* Text */}
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-[220px]">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Download CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#2ECC71]/10 to-[#27AE60]/10 rounded-2xl blur-xl" />
            <div className="relative bg-gray-900/60 backdrop-blur-sm border border-[rgba(46,204,113,0.2)] rounded-2xl p-8 sm:p-10 text-center">
              <Smartphone className="w-10 h-10 text-[#2ECC71] mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                Don't have the app yet?
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Download the official AUST Robotics Club app to access your AUSTRC ID, events, and more.
              </p>
              <motion.button
                onClick={handleDownload}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white font-semibold rounded-xl shadow-[0_0_30px_rgba(46,204,113,0.4)] hover:shadow-[0_0_50px_rgba(46,204,113,0.6)] transition-shadow duration-300"
              >
                <Download className="w-5 h-5" />
                Download for Android
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modal for non-Android devices */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, rotateX: -30 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateX: 30 }}
              transition={{ type: 'spring', damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-gradient-to-b from-gray-900 to-black p-8 sm:p-10 rounded-3xl border border-gray-800 max-w-md w-full shadow-[0_0_100px_0_rgba(46,204,113,0.2)]"
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gray-800/80 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </motion.button>

              <div className="text-center">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="relative w-24 h-24 mx-auto mb-6"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                    className="absolute inset-0 border-2 border-dashed border-amber-500/30 rounded-full"
                  />
                  <div className="absolute inset-2 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full flex items-center justify-center border border-amber-500/30">
                    <AlertCircle className="w-10 h-10 text-amber-400" />
                  </div>
                </motion.div>

                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-2xl sm:text-3xl font-bold text-white mb-3"
                >
                  Android Only
                </motion.h3>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-400 mb-8 leading-relaxed"
                >
                  This app is currently available only for{' '}
                  <span className="text-[#2ECC71] font-semibold">Android devices</span>.
                  Please open this page on your Android phone to download the app.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex flex-col gap-3"
                >
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full py-4 border border-gray-700 hover:border-gray-600 text-gray-300 hover:text-white rounded-xl transition-all duration-300 font-medium"
                  >
                    I Understand
                  </button>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-gray-600 text-sm mt-6 flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  Use an Android device to download
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
