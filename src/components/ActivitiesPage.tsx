import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export function ActivitiesPage() {
  const navigate = useNavigate();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const activities = [
    {
      id: 'achievements',
      title: 'Achievements',
      description: 'AUSTRC actively participates in national and international robotics competitions, providing members with the opportunity to showcase their skills on a larger stage. These competitions range from line-following robots and sumo robots to more complex challenges such as search and rescue missions.',
      buttonText: 'Explore',
      buttonAction: () => navigate('/activities/achievements'),
      image: 'https://res.cloudinary.com/dxyhzgrul/image/upload/v1766430688/achievements/fshxa5mdgl8wg8urhqfd.jpg',
      imagePosition: 'left'
    },
    {
      id: 'educational',
      title: 'Educational Programs',
      description: 'At AUST Robotics Club (AUSTRC), we organize a variety of workshops, seminars, and training sessions focused on key areas of robotics such as programming, electronics, mechanical design, and artificial intelligence. These programs are designed to equip students with the hands-on experience and theoretical understanding necessary to excel in the field of robotics.',
      buttonText: 'Learn More',
      buttonAction: () => navigate('/activities/educational-activities'),
      image: 'https://res.cloudinary.com/dxyhzgrul/image/upload/v1766086461/events/l611xtqk4mmgkjmnofh0.jpg',
      imagePosition: 'right'
    },
    {
      id: 'events',
      title: 'Events and Competitions',
      description: 'We organize a wide range of events throughout the year, including hackathons, coding contests, and robot-building competitions. These events are designed to challenge our members, foster a spirit of healthy competition, and encourage the development of technical skills.',
      buttonText: 'Explore',
      buttonAction: () => navigate('/activities/events'),
      image: 'https://res.cloudinary.com/dxyhzgrul/image/upload/v1761865403/events/hyb2tkp0gvt7liqg9rmn.jpg',
      imagePosition: 'left'
    },
    {
      id: 'research',
      title: 'Research and Projects',
      description: 'Innovation is at the heart of the AUST Robotics Club. We encourage our members to engage in exciting projects and research initiatives that push the boundaries of robotics technology. By working on these projects, students apply their classroom knowledge to real-world problems, fostering creativity and practical problem-solving skills.',
      buttonText: 'Know More',
      buttonAction: () => navigate('/research-projects'),
      image: 'https://res.cloudinary.com/dxyhzgrul/image/upload/v1767125977/educational_programs/qwfhfuromuct1azc1dyk.jpg',
      imagePosition: 'right'
    },
    {
      id: 'website',
      title: 'Our Event Website',
      description: 'Visit our dedicated event website to stay updated on all upcoming competitions, workshops, and activities. Get detailed information about registration, schedules, and achievements from our events.',
      buttonText: 'Visit Website',
      buttonAction: () => navigate('/activities/event-website'),
      image: 'https://ik.imagekit.io/mekt2pafz/event-website.jpg?updatedAt=1769056096931',
      imagePosition: 'left'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24 pb-24">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-6 mb-32"
      >
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            ACTIVITIES OF AUSTRC
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg leading-relaxed">
            From practical workshops and educational programs to research initiatives in robotics and national and international competitions, AUSTRC provides opportunities for students to develop their skills and showcase their talents. Explore the full range of AUSTRC's activities to see how students are advancing in robotics and technology.
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] mx-auto mt-8"></div>
        </div>
      </motion.div>

      {/* Activity Sections */}
      <div className="container mx-auto px-6 space-y-28">
        {activities.slice(0, -1).map((activity, index) => (
          <div key={activity.id}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              {/* Image on LEFT */}
              {activity.imagePosition === 'left' && (
                <>
                  <motion.div
                    className="relative overflow-hidden rounded-2xl"
                    onMouseEnter={() => setHoveredId(activity.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative h-80 md:h-96 overflow-hidden rounded-2xl">
                      <motion.img
                        src={activity.image}
                        alt={activity.title}
                        className="w-full h-full object-cover"
                        animate={{
                          scale: hoveredId === activity.id ? 1.1 : 1
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-1 w-8 bg-gradient-to-r from-[#2ECC71] to-[#27AE60]"></div>
                      <h2 className="text-3xl md:text-4xl font-bold text-[#2ECC71]">
                        {activity.title}
                      </h2>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-8 text-justify">
                      {activity.description}
                    </p>

                    <motion.button
                      onClick={activity.buttonAction}
                      className="w-full px-8 py-3 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 0 20px rgba(46, 204, 113, 0.5)'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {activity.buttonText}
                    </motion.button>
                  </motion.div>
                </>
              )}

              {/* Image on RIGHT */}
              {activity.imagePosition === 'right' && (
                <>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-1 w-8 bg-gradient-to-r from-[#2ECC71] to-[#27AE60]"></div>
                      <h2 className="text-3xl md:text-4xl font-bold text-[#2ECC71]">
                        {activity.title}
                      </h2>
                    </div>
                    <p className="text-gray-300 leading-relaxed mb-8 text-justify">
                      {activity.description}
                    </p>

                    <motion.button
                      onClick={activity.buttonAction}
                      className="w-full px-8 py-3 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
                      whileHover={{ 
                        scale: 1.05,
                        boxShadow: '0 0 20px rgba(46, 204, 113, 0.5)'
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {activity.buttonText}
                    </motion.button>
                  </motion.div>

                  <motion.div
                    className="relative overflow-hidden rounded-2xl"
                    onMouseEnter={() => setHoveredId(activity.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative h-80 md:h-96 overflow-hidden rounded-2xl">
                      <motion.img
                        src={activity.image}
                        alt={activity.title}
                        className="w-full h-full object-cover"
                        animate={{
                          scale: hoveredId === activity.id ? 1.1 : 1
                        }}
                        transition={{ duration: 0.3 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    </div>
                  </motion.div>
                </>
              )}
            </motion.div>

            {/* Divider */}
            {index !== activities.length - 2 && (
              <div className="h-px bg-gradient-to-r from-[#2ECC71]/0 via-[#2ECC71]/30 to-[#2ECC71]/0 mt-28"></div>
            )}
          </div>
        ))}

        {/* Our Event Website Section - Special Corner Design */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-end mt-32"
        >
          <motion.div
            className="w-full md:w-1/2 bg-gradient-to-br from-[#2ECC71]/10 to-[#27AE60]/5 backdrop-blur-md border border-[#2ECC71]/30 rounded-2xl p-8 md:p-12"
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 0 30px rgba(46, 204, 113, 0.2)'
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="h-1 w-8 bg-gradient-to-r from-[#2ECC71] to-[#27AE60]"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2ECC71]">
                Our Event Website
              </h2>
            </div>
            
            <p className="text-gray-300 leading-relaxed mb-8">
              {activities[4].description}
            </p>

            <motion.button
              onClick={activities[4].buttonAction}
              className="w-full px-8 py-3 bg-gradient-to-r from-[#2ECC71] to-[#27AE60] text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300"
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 20px rgba(46, 204, 113, 0.5)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              {activities[4].buttonText}
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}