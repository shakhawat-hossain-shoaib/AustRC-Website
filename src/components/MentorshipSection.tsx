import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { CheckCircle } from "lucide-react";

const mentors = [
  {
    name: "Dr. Sarah Johnson",
    expertise: "AI & Machine Learning",
    initials: "SJ",
  },
  {
    name: "Prof. Michael Chen",
    expertise: "Robotics Hardware",
    initials: "MC",
  },
  {
    name: "Dr. Emily Rodriguez",
    expertise: "Computer Vision",
    initials: "ER",
  },
  {
    name: "Dr. James Wilson",
    expertise: "Control Systems",
    initials: "JW",
  },
  {
    name: "Dr. Lisa Anderson",
    expertise: "Embedded Systems",
    initials: "LA",
  },
  {
    name: "Prof. David Kumar",
    expertise: "Mechatronics",
    initials: "DK",
  },
];

const features = [
  {
    title: "Session Management",
    description:
      "Efficiently schedule and manage one-on-one mentorship sessions with integrated calendar tools.",
  },
  {
    title: "Transaction Monitoring",
    description:
      "Track your learning progress and milestones in real-time with detailed analytics.",
  },
  {
    title: "Credential Management",
    description:
      "Securely manage certificates, achievements, and skill badges earned through programs.",
  },
];

export function MentorshipSection() {
  return (
    <section className="py-20 bg-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(46,204,113,0.05)] via-transparent to-[rgba(46,204,113,0.05)]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-[rgba(46,204,113,0.1)] to-[rgba(46,204,113,0.05)] rounded-full border border-[rgba(46,204,113,0.3)] mb-4">
            <span className="text-[#2ECC71] text-sm">
              Expert Guidance
            </span>
          </div>
          <h2 className="mb-4 tracking-tight text-white text-5xl">
            Built for Performance
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We've built a top-class mentoring platform, offering
            fast, reliable training with advanced tools like
            real-time tracking.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className="bg-gradient-to-br from-[rgba(46,204,113,0.08)] to-transparent border-[rgba(46,204,113,0.2)] hover:border-[rgba(46,204,113,0.5)] transition-all hover:shadow-[0_0_40px_0_rgba(46,204,113,0.3)] h-full backdrop-blur-sm">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#2ECC71] to-[#27AE60] rounded-2xl flex items-center justify-center mx-auto shadow-[0_0_30px_0_rgba(46,204,113,0.6)]">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="tracking-tight text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mentors Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
        >
          <h3 className="text-center mb-8 tracking-tight text-white text-3xl">
            Meet Our Expert Mentors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {mentors.map((mentor, index) => (
              <motion.div
                key={mentor.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.05,
                }}
                className="text-center group"
              >
                <div className="relative inline-block mb-3">
                  <Avatar className="bg-gradient-to-br from-[#2ECC71] to-[#27AE60] w-20 h-20 text-white group-hover:scale-110 transition-transform cursor-pointer shadow-[0_0_30px_0_rgba(46,204,113,0.6)] border-2 border-[rgba(46,204,113,0.3)]">
                    <AvatarFallback className="bg-transparent text-white">
                      {mentor.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#2ECC71] rounded-full border-2 border-black shadow-[0_0_15px_0_rgba(46,204,113,0.8)]" />
                </div>
                <div className="text-sm text-white mb-1">
                  {mentor.name}
                </div>
                <Badge className="text-xs bg-[#2ECC71]/10 text-[#2ECC71] border border-[rgba(46,204,113,0.3)]">
                  {mentor.expertise}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}