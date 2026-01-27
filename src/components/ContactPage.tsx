
import { motion } from 'motion/react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send,
  Linkedin,
  Facebook,
  Instagram,
  User,
  Briefcase,
  MessageCircle,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';

interface TeamMember {
  name: string;
  role: string;
  department: string;
  phone: string;
  email: string;
  image: string | null;
  order: number;
}

interface ContactCard {
  icon: React.ReactNode;
  title: string;
  info: string;
  link: string;
  linkText: string;
}

interface AddressInfo {
  clubName: string;
  universityName: string;
  address: string;
  mapUrl: string;
  facebook: string;
  linkedin: string;
  instagram: string;
}



const ContactPage = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [contactCards, setContactCards] = useState<ContactCard[]>([]);
  const [addressInfo, setAddressInfo] = useState<AddressInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllContactData = async () => {
      setLoading(true);
      try {
        // Fetch Contact Info (Email, Location, Messenger)
        const contactInfoDoc = await getDoc(doc(db, 'Contact Us', 'Contact_Info'));
        if (contactInfoDoc.exists()) {
          const data = contactInfoDoc.data();
          const cards: ContactCard[] = [
            {
              icon: <Mail className="w-6 h-6" />,
              title: data.Email_Title || "Email Us",
              info: data.Email || "austrc@aust.edu",
              link: `mailto:${data.Email || "austrc@aust.edu"}`,
              linkText: data.Email_LinkText || "Connect"
            },
            {
              icon: <MapPin className="w-6 h-6" />,
              title: data.Location_Title || "Find Us",
              info: data.Location || "Dhaka-1208, Bangladesh",
              link: data.Location_Link || "https://maps.google.com/maps?q=23.763639,90.406972",
              linkText: data.Location_LinkText || "Connect"
            },
            {
              icon: <MessageCircle className="w-6 h-6" />,
              title: data.Messenger_Title || "Message Us",
              info: data.Messenger_Info || "Facebook Messenger",
              link: data.Messenger_Link || "https://m.me/AustRoboticsClub",
              linkText: data.Messenger_LinkText || "Chat Now"
            }
          ];
          setContactCards(cards);
        } else {
          // Fallback to default values
          setContactCards([
            {
              icon: <Mail className="w-6 h-6" />,
              title: "Email Us",
              info: "austrc@aust.edu",
              link: "mailto:austrc@aust.edu",
              linkText: "Connect"
            },
            {
              icon: <MapPin className="w-6 h-6" />,
              title: "Find Us",
              info: "Dhaka-1208, Bangladesh",
              link: "https://maps.google.com/maps?q=23.763639,90.406972",
              linkText: "Connect"
            },
            {
              icon: <MessageCircle className="w-6 h-6" />,
              title: "Message Us",
              info: "Facebook Messenger",
              link: "https://m.me/AustRoboticsClub",
              linkText: "Chat Now"
            }
          ]);
        }

        // Fetch Address Info
        const addressDoc = await getDoc(doc(db, 'Contact Us', 'Address_Info'));
        if (addressDoc.exists()) {
          const data = addressDoc.data();
          setAddressInfo({
            clubName: data.Club_Name || "AUST Robotics Club",
            universityName: data.University_Name || "Ahsanullah University of Science and Technology",
            address: data.Address || "141 & 142, Love Road, Tejgaon Industrial Area, Dhaka-1208, Bangladesh",
            mapUrl: data.Map_URL || "https://maps.google.com/maps?q=23.763639,90.406972&hl=en&z=18&output=embed",
            facebook: data.Facebook || "https://www.facebook.com/AustRoboticsClub",
            linkedin: data.Linkedin || "https://linkedin.com/company/austrc",
            instagram: data.Instagram || "https://www.instagram.com/aust_robotics_club/"
          });
        } else {
          // Fallback to default values
          setAddressInfo({
            clubName: "AUST Robotics Club",
            universityName: "Ahsanullah University of Science and Technology",
            address: "141 & 142, Love Road, Tejgaon Industrial Area, Dhaka-1208, Bangladesh",
            mapUrl: "https://maps.google.com/maps?q=23.763639,90.406972&hl=en&z=18&output=embed",
            facebook: "https://www.facebook.com/AustRoboticsClub",
            linkedin: "https://linkedin.com/company/austrc",
            instagram: "https://www.instagram.com/aust_robotics_club/"
          });
        }



        // Fetch ALL Team Members dynamically from Contact Us collection
        const contactUsCollection = collection(db, 'Contact Us');
        const snapshot = await getDocs(contactUsCollection);
        
        const members: TeamMember[] = [];
        
        // Exclude system documents (Contact_Info, Address_Info)
        const excludedDocs = ['Contact_Info', 'Address_Info'];
        
        snapshot.forEach((docSnapshot) => {
          if (!excludedDocs.includes(docSnapshot.id)) {
            const data = docSnapshot.data();
            members.push({
              name: data.Name || data.name || 'TBA',
              role: data.Designation || data.designation || data.Role || data.role || docSnapshot.id.replace(/_/g, ' '),
              department: data.Department || data.department || '',
              phone: data.Contact_Number || data.Number || data.Phone || data.phone || data.number || '+880 1XXXXXXXXX',
              email: data.Edu_Mail || data.Email || data.email || 'contact@austrc.com',
              image: data.Image || data.Picture || data.image || data.picture || null,
              order: data.Order || data.order || 999
            });
          }
        });

        // Sort by order field from Firebase
        members.sort((a, b) => a.order - b.order);
        setTeamMembers(members);
      } catch (error) {
        console.error('Error fetching contact data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllContactData();
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden text-white pt-32 md:pt-24 pb-12 md:pb-20">
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        <motion.div
           className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#2ECC71] rounded-full blur-[150px] opacity-10"
           animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
           className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#27AE60] rounded-full blur-[150px] opacity-10"
           animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.15, 0.1] }}
           transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 max-w-6xl">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-20 relative"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#2ECC71]/30 bg-[#2ECC71]/10 text-[#2ECC71] text-sm font-medium mb-6">
            <Mail className="w-4 h-4" />
            <span>Get In Touch</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            <span className="text-[#2ECC71]">Contact</span> Us
          </h1>
          
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-2">
            We're here to listen to your feedback, answer your queries, and discuss potential collaborations regarding the <span className="text-white font-semibold">AUST Robotics Club Website</span> and our activities.
          </p>

          {/* Decorative line */}
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#2ECC71] to-transparent rounded-full opacity-50" />
          </div>
        </motion.div>

        {/* Contact Cards Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {contactCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative bg-[#1A1A1A] md:bg-[#111111] border border-white/20 rounded-2xl p-6 md:p-8 hover:border-[#2ECC71]/60 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(46,204,113,0.1)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-[#2ECC71]/10 rounded-xl flex items-center justify-center text-[#2ECC71] mb-6 group-hover:scale-110 transition-transform duration-300">
                  {card.icon}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{card.title}</h3>
                <p className="text-gray-400 text-sm mb-6">{card.info}</p>
                
                <a 
                  href={card.link}
                  className="inline-flex items-center gap-2 text-[#2ECC71] font-medium text-sm group/link hover:text-[#27AE60] transition-colors"
                >
                  {card.linkText}
                  <Send className="w-3 h-3 transform -rotate-45 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Address & Map Section */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="mt-12 md:mt-24 bg-[#1A1A1A] md:bg-[#111111] border border-white/20 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 mb-12 md:mb-24 overflow-hidden relative shadow-2xl"
        >
          {/* Subtle gradient glow */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#2ECC71] rounded-full blur-[150px] opacity-5 pointer-events-none" />

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-center">
             <div>
               <div className="flex items-center gap-3 mb-4 md:mb-6">
                 <div className="p-2 md:p-3 rounded-xl bg-[#2ECC71]/10 text-[#2ECC71]">
                   <Briefcase className="w-5 h-5 md:w-6 md:h-6" />
                 </div>
                 <h2 className="text-2xl md:text-3xl font-bold text-[#2ECC71]">Official Address</h2>
               </div>

               <div className="space-y-4 md:space-y-6">
                 <div>
                   <h3 className="text-lg md:text-xl font-bold text-white mb-2">{addressInfo?.clubName || "AUST Robotics Club"}</h3>
                   <p className="text-sm md:text-base text-gray-400">{addressInfo?.universityName || "Ahsanullah University of Science and Technology"}</p>
                 </div>

                 <div className="flex items-start gap-3 md:gap-4 text-gray-300">
                    <MapPin className="w-4 h-4 md:w-5 md:h-5 text-[#2ECC71] shrink-0 mt-1" />
                    <p className="text-sm md:text-base">{addressInfo?.address || "141 & 142, Love Road, Tejgaon Industrial Area, Dhaka-1208, Bangladesh"}</p>
                 </div>

                 <div className="flex gap-3 md:gap-4 pt-3 md:pt-4 justify-center lg:justify-start">
                    {addressInfo && [
                      { Icon: Facebook, link: addressInfo.facebook },
                      { Icon: Linkedin, link: addressInfo.linkedin },
                      { Icon: Instagram, link: addressInfo.instagram }
                    ].map((social, i) => (
                      <a 
                        key={i}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:bg-[#2ECC71] hover:text-white hover:border-[#2ECC71] hover:shadow-[0_0_15px_rgba(46,204,113,0.4)] transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
                      >
                        <social.Icon className="w-4 h-4 md:w-5 md:h-5" />
                      </a>
                    ))}
                 </div>
               </div>
             </div>

             <div className="relative h-[300px] md:h-[400px] lg:h-[450px] w-full rounded-xl md:rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
               <iframe 
                 src={addressInfo?.mapUrl || "https://maps.google.com/maps?q=23.763639,90.406972&hl=en&z=18&output=embed"} 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen={true} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 className="w-full h-full"
               ></iframe>
             </div>
          </div>
        </motion.div>
        {/* Team Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24 md:mb-48"
        >
          <div className="text-center mb-8 md:mb-16">
            <p className="text-gray-400 text-base md:text-lg px-4">
              Connect directly with our organizing and management team
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading team members...</p>
            </div>
          ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-[#1A1A1A] md:bg-[#111111] border border-white/20 rounded-2xl p-4 md:p-6 hover:border-[#2ECC71]/50 transition-all duration-300 shadow-lg hover:shadow-[0_0_20px_rgba(46,204,113,0.1)]"
              >
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6 items-start">
                   {/* Avatar/Image Placeholder */}
                   <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-64 md:h-64 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden mx-auto sm:mx-0">
                      {member.image ? (
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 text-gray-600" />
                      )}
                   </div>

                   <div className="flex-1 space-y-2 md:space-y-3 text-center sm:text-left w-full">
                      
                      <h3 className="text-xl md:text-2xl font-bold text-white">{member.name}</h3>
                      <p className="text-gray-400 text-xs md:text-sm font-medium">{member.role}</p>
                      {member.department && (
                        <p className="text-[#2ECC71]/80 text-xs font-medium italic">{member.department}</p>
                      )}

                      <div className="pt-3 md:pt-4 space-y-2">
                        <a href={`tel:${member.phone.replace(/\s/g, '')}`} className="flex items-center justify-center sm:justify-start gap-2 text-xs md:text-sm text-gray-400 hover:text-[#2ECC71] transition-colors break-all">
                           <Phone className="w-4 h-4 text-[#2ECC71] shrink-0" />
                           <span className="break-all">{member.phone}</span>
                        </a>
                        <a href={`mailto:${member.email}`} className="flex items-center justify-center sm:justify-start gap-2 text-xs md:text-sm text-gray-400 hover:text-[#2ECC71] transition-colors break-all">
                           <Mail className="w-4 h-4 text-[#2ECC71] shrink-0" />
                           <span className="break-all">{member.email}</span>
                        </a>
                      </div>
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
          )}
        </motion.div>



      </div>
      
      {/* Spacer div for extra bottom spacing */}
      <div className="h-32 w-full" />
    </div>
  );
};

export { ContactPage };
