import { motion } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { ArrowLeft, Calendar, Tag, ExternalLink, Github, FileText } from 'lucide-react';
import { Card } from './ui/card';

interface ProjectDetails {
  id: string;
  title: string;
  summary: string;
  fullDescription: string;
  image: string;
  author: string;
  authorRole: string;
  authorDepartment: string;
  category: string;
  date: string;
  technologies: string[];
  features: string[];
  links?: {
    github?: string;
    demo?: string;
    paper?: string;
  };
}

export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  // Mock data - in a real app, this would fetch based on projectId
  const projectsData: { [key: string]: ProjectDetails } = {
    'autonomous-navigation-robot': {
      id: 'autonomous-navigation-robot',
      title: 'Autonomous Navigation Robot with AI Vision',
      summary: 'Developed an intelligent robot capable of autonomous navigation using computer vision and machine learning algorithms for obstacle detection and path planning.',
      fullDescription: `This project presents a comprehensive autonomous navigation system that leverages cutting-edge artificial intelligence and computer vision technologies. The robot is equipped with multiple sensors including LiDAR, ultrasonic sensors, and a high-resolution camera system that work in tandem to create a detailed understanding of its environment.

The AI-powered vision system uses a custom-trained deep learning model based on YOLO (You Only Look Once) architecture for real-time object detection and classification. This allows the robot to identify and categorize obstacles, people, and navigable paths with high accuracy and minimal latency.

The navigation algorithm implements a hybrid approach combining traditional path planning methods like A* algorithm with modern reinforcement learning techniques. This allows the robot to not only find optimal paths but also learn from its experiences and improve its navigation strategies over time.

Key technical achievements include:
- Real-time processing at 30 FPS on edge computing hardware
- 95% accuracy in obstacle detection under various lighting conditions
- Dynamic path replanning with sub-second response times
- Energy-efficient operation extending battery life by 40% compared to traditional systems

The system has been successfully tested in various indoor and outdoor environments, demonstrating robust performance in complex scenarios including crowded spaces, varying terrain, and challenging weather conditions.`,
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200',
      author: 'Khalid Hasan Drobo',
      authorRole: 'Member of AUST Robotics Club',
      authorDepartment: 'Student of Department of Electrical & Electronic Engineering, AUST',
      category: 'Robotics',
      date: 'March 2024',
      technologies: ['Python', 'TensorFlow', 'OpenCV', 'ROS', 'Raspberry Pi', 'Arduino', 'LiDAR'],
      features: [
        'Real-time obstacle detection and avoidance',
        'Dynamic path planning and replanning',
        'Machine learning-based navigation',
        'Multi-sensor fusion for accurate positioning',
        'Remote monitoring and control via web interface',
        'Autonomous battery management and charging'
      ],
      links: {
        github: 'https://github.com/example/autonomous-robot',
        demo: 'https://youtube.com/example',
        paper: 'https://example.com/research-paper.pdf'
      }
    },
    'smart-home-automation': {
      id: 'smart-home-automation',
      title: 'IoT-Based Smart Home Automation System',
      summary: 'A comprehensive smart home solution integrating IoT devices for automated control of lighting, temperature, and security systems with mobile app integration.',
      fullDescription: `This innovative IoT-based smart home automation system represents a complete solution for modern home management. The project integrates multiple subsystems including lighting control, HVAC management, security monitoring, and energy optimization into a unified platform accessible through mobile and web applications.

The system architecture follows a distributed approach with local edge computing nodes for critical real-time operations and cloud integration for data analytics and remote access. This hybrid design ensures both low-latency control and advanced features like predictive automation and energy usage analytics.

The security subsystem includes multiple layers of protection with encrypted communication protocols, facial recognition for access control, and real-time intrusion detection. The system can automatically trigger alerts and execute predefined safety protocols in case of security breaches.

Energy efficiency is a core focus, with the system implementing smart algorithms that learn user behavior patterns and optimize device operation accordingly. Users have reported average energy savings of 30-35% after implementing the full system.

Notable features include:
- Voice control integration with major virtual assistants
- Geofencing-based automation triggers
- Machine learning-powered predictive automation
- Comprehensive energy monitoring and analytics
- Multi-user access control with role-based permissions
- Offline operation capability for critical functions`,
      image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=1200',
      author: 'Sarah Ahmed',
      authorRole: 'Research Lead, AUST Robotics Club',
      authorDepartment: 'Student of Department of Computer Science & Engineering, AUST',
      category: 'IoT',
      date: 'February 2024',
      technologies: ['ESP32', 'MQTT', 'Node.js', 'React Native', 'Firebase', 'AWS IoT', 'Python'],
      features: [
        'Centralized mobile app control',
        'Voice assistant integration',
        'Automated lighting and temperature control',
        'Security camera monitoring',
        'Energy consumption analytics',
        'Scheduled automation and scenes'
      ],
      links: {
        github: 'https://github.com/example/smart-home',
        demo: 'https://youtube.com/example'
      }
    },
    'drone-delivery-system': {
      id: 'drone-delivery-system',
      title: 'Autonomous Drone Delivery System',
      summary: 'Designed and implemented a GPS-guided drone system for package delivery with real-time tracking and automated landing capabilities.',
      fullDescription: `This project addresses the growing demand for efficient last-mile delivery solutions through an autonomous drone delivery system. The system combines advanced GPS navigation, computer vision, and automated flight control to enable safe and reliable package delivery.

The drone platform features a custom-designed hexacopter configuration optimized for payload capacity and flight stability. The flight controller implements advanced PID control algorithms with adaptive tuning capabilities that adjust to varying payload weights and weather conditions.

Navigation is achieved through a multi-layered approach combining GPS waypoint navigation for long-range travel and computer vision for precise landing operations. The vision system can recognize and evaluate landing zones, ensuring safe touchdown even in unfamiliar locations.

Safety is paramount in the design, with multiple redundant systems including:
- Dual GPS modules with automatic failover
- Return-to-home functionality in case of signal loss
- Real-time battery monitoring with automatic return triggers
- Collision avoidance using ultrasonic and optical sensors
- Parachute deployment system for emergency situations

The system has successfully completed over 100 test flights with a 98% success rate in autonomous delivery operations.`,
      image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=1200',
      author: 'Mohammed Rahman',
      authorRole: 'Technical Lead, AUST Robotics Club',
      authorDepartment: 'Student of Department of Mechanical & Production Engineering, AUST',
      category: 'Drones',
      date: 'January 2024',
      technologies: ['ArduPilot', 'Python', 'GPS', 'OpenCV', 'Raspberry Pi', 'Carbon Fiber', '4G LTE'],
      features: [
        'GPS-guided autonomous flight',
        'Real-time package tracking',
        'Automated takeoff and landing',
        'Weather-resistant design',
        'Up to 5kg payload capacity',
        '30-minute flight time'
      ],
      links: {
        github: 'https://github.com/example/drone-delivery',
        demo: 'https://youtube.com/example',
        paper: 'https://example.com/drone-research.pdf'
      }
    },
    'gesture-controlled-wheelchair': {
      id: 'gesture-controlled-wheelchair',
      title: 'Gesture-Controlled Wheelchair for Disabled Persons',
      summary: 'An innovative assistive technology using hand gesture recognition to control wheelchair movement, improving accessibility and independence.',
      fullDescription: `This assistive technology project aims to improve mobility and independence for individuals with limited motor control. The gesture-controlled wheelchair uses advanced computer vision and machine learning to interpret hand gestures and translate them into wheelchair movements.

The system employs a depth camera for robust gesture recognition that works reliably under varying lighting conditions. A custom-trained convolutional neural network recognizes seven distinct gestures for comprehensive movement control including forward, backward, left, right, stop, speed adjustment, and emergency brake.

User comfort and safety are prioritized through several innovative features:
- Adjustable sensitivity settings to accommodate different user capabilities
- Progressive acceleration and deceleration for smooth operation
- Automatic obstacle detection and stopping
- Fall detection with automatic alert system
- Battery level monitoring with voice notifications

The wheelchair has undergone extensive user testing with positive feedback highlighting improved independence and ease of use. The gesture recognition system achieves 96% accuracy in real-world conditions.`,
      image: 'https://images.unsplash.com/photo-1581594549595-35f6edc7b762?w=1200',
      author: 'Fatima Noor',
      authorRole: 'Member of AUST Robotics Club',
      authorDepartment: 'Student of Department of Electrical & Electronic Engineering, AUST',
      category: 'Assistive Tech',
      date: 'December 2023',
      technologies: ['Python', 'MediaPipe', 'Arduino', 'Intel RealSense', 'Motor Controllers', 'Li-ion Batteries'],
      features: [
        'Hand gesture recognition control',
        'Obstacle detection and avoidance',
        'Multiple speed modes',
        'Emergency stop functionality',
        'Battery status monitoring',
        'Customizable gesture mapping'
      ],
      links: {
        github: 'https://github.com/example/gesture-wheelchair',
        demo: 'https://youtube.com/example'
      }
    },
    'solar-tracking-system': {
      id: 'solar-tracking-system',
      title: 'Dual-Axis Solar Tracking System',
      summary: 'An automated solar panel tracking system that maximizes energy efficiency by following the sun\'s position throughout the day.',
      fullDescription: `This renewable energy project focuses on maximizing solar energy capture through an intelligent dual-axis tracking system. By continuously adjusting the solar panel orientation to face the sun directly, the system achieves significant improvements in energy generation compared to fixed installations.

The tracking mechanism uses a combination of astronomical algorithms and light sensors for optimal positioning. The astronomical calculations predict sun position based on date, time, and geographic location, while light sensors provide real-time feedback for fine-tuning alignment.

The mechanical design features a robust yet lightweight structure capable of supporting large solar panels while maintaining precise positioning. High-torque stepper motors with gear reduction provide smooth and accurate movement along both axes.

Energy efficiency extends to the tracking system itself, which consumes less than 2% of the generated power. During testing, the system demonstrated a 35-40% increase in energy generation compared to fixed-angle installations.

Advanced features include:
- Weather-responsive operation (automatic horizontal positioning during high winds)
- Cloud detection for energy-saving mode
- Remote monitoring and manual override capabilities
- Predictive maintenance alerts
- Integration with battery storage systems`,
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200',
      author: 'Rakib Hossain',
      authorRole: 'Member of AUST Robotics Club',
      authorDepartment: 'Student of Department of Electrical & Electronic Engineering, AUST',
      category: 'Renewable Energy',
      date: 'November 2023',
      technologies: ['Arduino', 'Stepper Motors', 'LDR Sensors', 'Solar Panels', 'MPPT Controller', 'C++'],
      features: [
        'Dual-axis sun tracking',
        '35-40% increased efficiency',
        'Weather-adaptive operation',
        'Low power consumption',
        'Remote monitoring capability',
        'Automatic calibration'
      ],
      links: {
        github: 'https://github.com/example/solar-tracker',
        paper: 'https://example.com/solar-research.pdf'
      }
    },
    'face-recognition-attendance': {
      id: 'face-recognition-attendance',
      title: 'AI-Powered Face Recognition Attendance System',
      summary: 'Implemented a real-time face recognition system for automated attendance tracking using deep learning and computer vision techniques.',
      fullDescription: `This AI-powered attendance system revolutionizes traditional attendance tracking through advanced face recognition technology. The system can simultaneously identify multiple individuals in real-time, making it ideal for classroom and workplace environments.

Built on state-of-the-art deep learning architectures, the face recognition model uses a combination of FaceNet for feature extraction and a custom classification layer trained on local datasets. The system achieves 99.2% accuracy in controlled environments and maintains over 95% accuracy even with variations in lighting, facial expressions, and partial occlusions.

The architecture implements a multi-stage pipeline:
1. Face detection using MTCNN (Multi-task Cascaded Convolutional Networks)
2. Face alignment and preprocessing
3. Feature extraction using deep neural networks
4. Face matching against enrolled database
5. Attendance logging with timestamp and confidence scores

Privacy and security considerations are built into the design with encrypted storage of biometric data, secure communication protocols, and compliance with data protection regulations. Users have full control over their data with options to opt-out and request data deletion.

The system includes a comprehensive web dashboard for administrators to view attendance reports, generate analytics, and manage user enrollments. Integration with existing student/employee management systems is supported through RESTful APIs.`,
      image: 'https://images.unsplash.com/photo-1555421689-d68471e189f2?w=1200',
      author: 'Tasnim Islam',
      authorRole: 'AI Research Member, AUST Robotics Club',
      authorDepartment: 'Student of Department of Computer Science & Engineering, AUST',
      category: 'AI & Machine Learning',
      date: 'October 2023',
      technologies: ['Python', 'TensorFlow', 'OpenCV', 'Flask', 'PostgreSQL', 'Docker', 'FaceNet'],
      features: [
        'Real-time face recognition',
        'Multiple face detection',
        'Automated attendance logging',
        'Web-based admin dashboard',
        'Analytics and reporting',
        'Anti-spoofing measures'
      ],
      links: {
        github: 'https://github.com/example/face-attendance',
        demo: 'https://youtube.com/example',
        paper: 'https://example.com/face-recognition-paper.pdf'
      }
    }
  };

  const project = projectId ? projectsData[projectId] : null;

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-[#0a1810] to-black pt-32 pb-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl text-white mb-4">Project Not Found</h1>
          <Button onClick={() => navigate('/research-projects')} className="bg-[#2ECC71] hover:bg-[#27AE60]">
            Back to Projects
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-[#0a1810] to-black pt-32 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button
            onClick={() => navigate('/research-projects')}
            variant="ghost"
            className="text-gray-400 hover:text-[#2ECC71] hover:bg-[#2ECC71]/10 border border-[#2ECC71]/20 hover:border-[#2ECC71]/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-[#2ECC71]/20 to-[#27AE60]/20 border border-[#2ECC71]/30 text-[#2ECC71] backdrop-blur-sm shadow-[0_0_30px_0_rgba(46,204,113,0.3)]">
              {project.category}
            </span>
          </div>
          <h1 className="text-5xl mb-4 bg-gradient-to-r from-white via-[#2ECC71] to-white bg-clip-text text-transparent">
            {project.title}
          </h1>
          <p className="text-xl text-gray-400 mb-6">{project.summary}</p>
          
          {/* Meta Info */}
          <div className="flex flex-wrap gap-4 text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#2ECC71]" />
              <span>{project.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-[#2ECC71]" />
              <span>{project.category}</span>
            </div>
          </div>
        </motion.div>

        {/* Main Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 rounded-xl overflow-hidden border border-[#2ECC71]/30 shadow-[0_0_60px_0_rgba(46,204,113,0.3)]"
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-[500px] object-cover"
          />
        </motion.div>

        {/* Author Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <Card className="bg-gradient-to-br from-black/90 via-[#0a1810]/90 to-black/90 border-[#2ECC71]/30 backdrop-blur-xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2ECC71] to-[#27AE60] flex items-center justify-center shadow-[0_0_30px_0_rgba(46,204,113,0.6)]">
                <span className="text-2xl text-white">{project.author.charAt(0)}</span>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">Written By</p>
                <h3 className="text-xl text-white mb-2">{project.author}</h3>
                <p className="text-[#2ECC71] text-sm mb-1">{project.authorRole}</p>
                <p className="text-gray-500 text-sm">{project.authorDepartment}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-3xl text-white mb-6 relative inline-block">
            Project Overview
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#2ECC71] to-transparent rounded-full shadow-[0_0_20px_0_rgba(46,204,113,0.6)]" />
          </h2>
          <div className="text-gray-400 leading-relaxed whitespace-pre-line">
            {project.fullDescription}
          </div>
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl text-white mb-6 relative inline-block">
            Technologies Used
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#2ECC71] to-transparent rounded-full shadow-[0_0_20px_0_rgba(46,204,113,0.6)]" />
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="px-4 py-2 rounded-lg bg-[#2ECC71]/10 border border-[#2ECC71]/30 text-[#2ECC71] hover:bg-[#2ECC71]/20 hover:border-[#2ECC71]/50 transition-all shadow-[0_0_20px_0_rgba(46,204,113,0.2)] hover:shadow-[0_0_30px_0_rgba(46,204,113,0.4)]"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Key Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl text-white mb-6 relative inline-block">
            Key Features
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#2ECC71] to-transparent rounded-full shadow-[0_0_20px_0_rgba(46,204,113,0.6)]" />
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className="flex items-start gap-3 p-4 rounded-lg bg-[#2ECC71]/5 border border-[#2ECC71]/20 hover:border-[#2ECC71]/40 transition-all"
              >
                <div className="w-2 h-2 rounded-full bg-[#2ECC71] mt-2 shadow-[0_0_10px_0_rgba(46,204,113,0.8)]" />
                <span className="text-gray-400">{feature}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Links */}
        {project.links && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <h2 className="text-3xl text-white mb-6 relative inline-block">
              Project Links
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#2ECC71] to-transparent rounded-full shadow-[0_0_20px_0_rgba(46,204,113,0.6)]" />
            </h2>
            <div className="flex flex-wrap gap-4">
              {project.links.github && (
                <Button
                  asChild
                  className="bg-gradient-to-r from-[#2ECC71] to-[#27AE60] hover:from-[#27AE60] hover:to-[#2ECC71] text-white shadow-[0_0_30px_0_rgba(46,204,113,0.6)] hover:shadow-[0_0_40px_0_rgba(46,204,113,0.9)]"
                >
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              )}
              {project.links.demo && (
                <Button
                  asChild
                  variant="outline"
                  className="border-[#2ECC71]/30 text-[#2ECC71] hover:bg-[#2ECC71]/10 hover:border-[#2ECC71]/50"
                >
                  <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Watch Demo
                  </a>
                </Button>
              )}
              {project.links.paper && (
                <Button
                  asChild
                  variant="outline"
                  className="border-[#2ECC71]/30 text-[#2ECC71] hover:bg-[#2ECC71]/10 hover:border-[#2ECC71]/50"
                >
                  <a href={project.links.paper} target="_blank" rel="noopener noreferrer">
                    <FileText className="w-4 h-4 mr-2" />
                    Research Paper
                  </a>
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
