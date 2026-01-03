// ProjectData.ts - Complete type definitions and manual projects

// ============================================
// TYPE DEFINITIONS
// ============================================

export interface ProjectSection {
  heading: string;
  description: string;
  images: string[];
}

export interface TeamMember {
  name: string;
  designation: string;
  role?: string;
}

export interface ProjectData {
  id: string;
  title: string;
  coverImage: string;
  shortDescription: string;
  fullDescription: string;
  carouselImages: string[];
  teamMembers: TeamMember[];
  tags?: string[];
  order?: number;
  pdfLink?: string;
  pdfPreviewLink?: string;
  pdfDownloadLink?: string;
  sections?: ProjectSection[];
}

// ============================================
// MANUAL PROJECTS - Add projects here without Firebase
// ============================================

export const MANUAL_PROJECTS: ProjectData[] = [
  {
    id: "bluetooth-car-led-indicators",
    title: "Bluetooth Controlled Car with LED Indicators: A Research and Implementation Study",
    coverImage: "https://ik.imagekit.io/mekt2pafz/Research%20and%20Projects/Bluetooth/Screenshot%202025-12-22%20154232.png?w=800",
    shortDescription: "A microcontroller-based robotic project demonstrating wireless communication, motor control, and directional signaling using Arduino Uno, HC-05 Bluetooth module, and L298N motor driver with integrated LED indicators for real-time feedback.",
    fullDescription: `This research paper presents the design and implementation of a Bluetooth Controlled Car with LED Indicators. The system demonstrates wireless communication, motor control, and directional signaling using Arduino Uno, HC-05 Bluetooth module, and L298N motor driver. The addition of LED indicators provides real-time feedback, making it an educational and practical project for robotics learning. This paper outlines the system overview, setup, working principle, tools, and future scope.

The Bluetooth Controlled Car with LED Indicators is a microcontroller-based robotic project designed to demonstrate wireless communication, motor control, and directional signaling. The system uses an Arduino Uno (or Nano), HC-05 Bluetooth module, and L298N motor driver for mobility, while directional LEDs are integrated to provide visual feedback during movement. This makes the project a complete package for robotics learning, research, and prototyping. In addition, the project introduces students to embedded systems, sensor-actuator integration, and real-time control. It also helps in understanding how wireless communication can be applied in robotics. In future extensions, the same concept can be scaled up to Bluetooth-controlled drones or multifunctional robots for advanced applications.

Essential Components: Arduino Uno (or any compatible Arduino board), DC Motors (4 motors for movement control), Motor Driver (L298N or L293D), LEDs (5 LEDs: 2 for Forward, 2 for Backward, and 1 for Blinking), Resistors (for LEDs and other components as needed), Jumper Wires (for connections), Power Supply (for motors, Arduino, and other components), Breadboard (for prototyping connections), Bluetooth Module (HC-05 or HC-06 for remote control).

How the System Works: A smartphone app is used to send directional commands (forward, backward, left, right) through Bluetooth. The HC-05 Bluetooth module receives these commands and transfers them to the Arduino via serial communication. The Arduino processes and interprets the received commands. Based on the instructions, Arduino sends appropriate signals to the L298N motor driver to control the DC motors. At the same time, the Arduino activates the corresponding directional LEDs (front, back, left, or right) for visual feedback. The DC motors then drive the car in the desired direction, while LEDs provide real-time indication of movement. The system ensures smooth coordination between command input and physical response, reducing delays. Directional LEDs make the system more user-friendly and safer, as movement can be tracked visually. This setup reflects real-world vehicle signaling concepts and helps learners understand embedded system integration.

Features: Wireless Bluetooth Control, LED Indicators for Each Movement (Forward, Backward, Left, Right), Efficient and Low Power Consumption, Rechargeable and Portable, Educational Value – Demonstrates robotics + embedded system integration, Future Expandable – Drone and Robot.

The Bluetooth Controlled Car with LED Indicators is an educational yet practical robotics project. It combines wireless communication, motor driving, and LED-based feedback system in a simple but effective way. The integration of LEDs enhances user interaction by visually representing the car's movement direction. Its modular nature allows future upgrades, such as developing a Bluetooth-controlled drone or a multi-functional robot, making it a foundation for more advanced research in robotics and IoT.`,
    pdfLink: "https://drive.google.com/file/d/1lWIrFQzeWRUzD2NSWl_iNVaJ0L3FtDIU/preview",
    carouselImages: [
      "https://ik.imagekit.io/mekt2pafz/Research%20and%20Projects/Bluetooth/Screenshot%202025-12-22%20154232.png?w=800",
      "https://ik.imagekit.io/mekt2pafz/Research%20and%20Projects/Bluetooth/Screenshot%202025-12-22%20154301.png?w=800",
      "https://ik.imagekit.io/mekt2pafz/Research%20and%20Projects/Bluetooth/image.png?w=800",
      "https://ik.imagekit.io/mekt2pafz/Research%20and%20Projects/Bluetooth/image.png?w=800",
    ],
    teamMembers: [
      {
        name: "Istiak Ahmed Riad",
        designation: "Dept. of EEE, AUST Robotics Club",
        role: "Project Lead"
      },
    ],
    tags: ["Robotics", "Arduino", "Bluetooth", "Embedded Systems", "LED Indicators", "Motor Control", "IoT"],
    order: 1
  },

  // ========== TEMPLATE FOR ADDING NEW MANUAL PROJECTS ==========
  // {
  //   id: 'line-follower-robot',
  //   title: 'Line Follower Robot',
  //   coverImage: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800',
  //   shortDescription: 'An autonomous robot that follows lines using IR sensors.',
  //   fullDescription: `This line follower robot is designed to autonomously navigate along a predefined path...
  //
  // Key Features:
  // - Dual IR sensor array for precise line detection
  // - PID control algorithm for smooth navigation
  // - Adjustable speed settings`,
  //   carouselImages: [
  //     'https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=800',
  //     'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800',
  //   ],
  //   teamMembers: [
  //     {
  //       name: 'Rafiul Islam',
  //       designation: 'Department of EEE, AUST',
  //       role: 'Project Lead'
  //     },
  //   ],
  //   tags: ['Robotics', 'Sensors', 'Automation'],
  //   order: 100,
  //   pdfLink: 'https://drive.google.com/file/d/YOUR_FILE_ID/preview',
  //   sections: [
  //     {
  //       heading: 'Introduction',
  //       description: 'This section introduces the project...',
  //       images: ['https://example.com/intro1.jpg']
  //     },
  //     {
  //       heading: 'Methodology',
  //       description: 'Our approach includes...',
  //       images: ['https://example.com/method1.jpg', 'https://example.com/method2.jpg']
  //     },
  //     {
  //       heading: 'Results',
  //       description: 'The results show...',
  //       images: []
  //     }
  //   ]
  // },
];