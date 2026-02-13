import { motion, AnimatePresence } from "motion/react";
import { Facebook, Linkedin, Github, Mail, X } from "lucide-react";
import { Card } from "./ui/card";
import { useParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/config/firebase";
import { createPortal } from "react-dom";

// ✅ Typewriter component for creative text reveal
const TypewriterText = ({ 
  text, 
  delay = 0, 
  speed = 0.03,
  className = "" 
}: { 
  text: string; 
  delay?: number; 
  speed?: number;
  className?: string;
}) => {
  const letters = text.split("");
  
  return (
    <span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.1,
            delay: delay + index * speed,
            ease: "easeOut"
          }}
          style={{ display: "inline-block", whiteSpace: letter === " " ? "pre" : "normal" }}
        >
          {letter}
        </motion.span>
      ))}
      <motion.span
        className="inline-block w-[3px] h-[1em] bg-[#2ECC71] ml-1 align-middle"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 0.8,
          repeat: 3,
          delay: delay + letters.length * speed,
          ease: "linear"
        }}
      />
    </span>
  );
};

// ✅ Glowing line reveal animation
const GlowingDivider = ({ delay = 0 }: { delay?: number }) => (
  <motion.div
    className="h-[2px] bg-gradient-to-r from-transparent via-[#2ECC71] to-transparent my-4"
    initial={{ scaleX: 0, opacity: 0 }}
    animate={{ scaleX: 1, opacity: 1 }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
  />
);

interface Person {
  id: string;
  name: string;
  title: string;
  image: string;
  facebook?: string;
  linkedin?: string;
  github?: string;
  email?: string;
  order?: number;
  category?: string;
  [key: string]: any;
}

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400";
// Static Hall of Fame members
const STATIC_HALL_OF_FAME_MEMBERS: Person[] = [
  {
    id: "monjure-mowla",
    name: "Monjure Mowla",
    title: "Former VP, AUSTRC",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    order: 1,
    category: "Hall of Fame",
    Description: "As the founding Vice President of the AUST Robotics Club, I had the opportunity to help lead the club's activities for a year. During this time, I worked alongside an amazing team to organize various events, including a national-level competition that brought together passionate minds. It was a rewarding experience, and I'm grateful to have contributed to promoting robotics within our university.",
    Designation: "Embedded Software Engineer (Level - 3), Neural Semiconductor Limited",
  },
  {
    id: "farhat-nahian",
    name: "Farhat Nahian",
    title: "Former VP, AUSTRC",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400",
    order: 2,
    category: "Hall of Fame",
    Description: "Started this journey as a sub-executive member of the founding panel of the AUST Robotics Club, I was fortunate enough to have ended my journey as one of the leaders of the club. The more my responsibilities grew, the more my skills grew and looking back, I realize that it's the experience and learning that shaped the person I am today. I'm genuinely grateful for the love, respect, and platform the club has offered me. Lastly- no matter your starting point, regardless of your skill level or experience, get involved with dedication and self-belief, you will eventually grow into the person you're meant to be.",
    Designation: "System Engineer, Huawei Technologies (Bangladesh) ltd",
  },
  {
    id: "abdul-quader",
    name: "Abdul Quader",
    title: "Former VP, AUSTRC",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400",
    order: 3,
    category: "Hall of Fame",
    Description: "Being a part of the AUST Robotics Club (ARC) was a dream come true. All the enthusiastic people around, creative minds doing things that never happened before. From seminar to national competitions, I have enjoyed it all and learned so many things. I will feel guilty if I do not mention the networking opportunities I had at ARC. Last but not the least, being able to work with the executives was another milestone for me and my self development. Ending my ARC journey being the Vice President was the best experience. All the best to AUSTRC for its future endeavours.",
    Designation: "Graduate Trainee Engineer - Atlas Copco Bangladesh Ltd.",
  },
];
// helper (keeps your “remove Unknown” logic readable)
function isUnknown(memberName: string) {
  return memberName === "Unknown";
}

export function GoverningPanelPage() {
  const { panelId } = useParams<{ panelId: string }>();

  const getDisplayText = (slug: string) => {
    if (slug === "hall-of-fame") return "Hall of Fame";
    return slug
      ?.split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getCollectionName = (slug: string) => {
    return slug
      ?.split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const [members, setMembers] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  // ✅ lock background scroll when modal open
  useEffect(() => {
    if (!selectedPerson) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [selectedPerson]);

  // ✅ close on ESC
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPerson(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!panelId) return;

      setLoading(true);
      try {
        const fetchedMembers: Person[] = [];

        if (panelId === "hall-of-fame") {
          // Add static Hall of Fame members first
          fetchedMembers.push(...STATIC_HALL_OF_FAME_MEMBERS);

          // Then fetch from Firebase and merge
          try {
            const membersCollection = collection(
              db,
              "All_Data",
              "Governing_Panel",
              "Hall_of_Fame"
            );
            const q = query(membersCollection);
            const snapshot = await getDocs(q);

            snapshot.forEach((doc) => {
              const data = doc.data();
              fetchedMembers.push({
                id: doc.id,
                name: data.Name || data.name || "Unknown",
                title: data.Title || data.title || data.Designation || "",
                image: data.Image || data.image || data.Photo || DEFAULT_IMAGE,
                facebook: data.Facebook || data.facebook,
                linkedin: data.Linkedin || data.linkedin,
                github: data.Github || data.github,
                email: data.Email || data.email,
                order: data.Order || 999,
                category: "Hall of Fame",
                ...data,
              });
            });
          } catch (firebaseError) {
            console.error("Error fetching Hall of Fame from Firebase:", firebaseError);
            // Static data is already added, so we can continue
          }
        } else {
          const collectionName = getCollectionName(panelId);

          const subcollections = [
            { id: "Advisory_Panel", title: "Advisory Panel" },
            { id: "Executive_Panel", title: "Executive Panel" },
            { id: "Deputy_Executive_Panel", title: "Deputy Executive Panel" },
            {
              id: "Senior_Sub_Executive_Panel",
              title: "Senior Sub-Executive Panel",
            },
            { id: "Sub_Executive_Panel", title: "Sub-Executive Panel" },
            {
              id: "Junior_Sub_Executive_Panel",
              title: "Junior Sub-Executive Panel",
            },
            { id: "Working_Committee", title: "Working Committee" },
            { id: "General_Members", title: "General Members" },
          ];

          await Promise.all(
            subcollections.map(async (sub) => {
              try {
                const membersRef = collection(
                  db,
                  "All_Data",
                  "Governing_Panel",
                  "Semesters",
                  collectionName,
                  sub.id
                );

                const q = query(membersRef);
                const snapshot = await getDocs(q);

                snapshot.forEach((doc) => {
                  const data = doc.data();
                  const keys = Object.keys(data);
                  const imageKeys = keys.filter((k) => k.startsWith("Image_"));

                  // ✅ non-standard structure (single doc with Image_1, Image_2, ...)
                  if (imageKeys.length > 0 && !data.Name && !data.name) {
                    imageKeys.forEach((imgKey) => {
                      const index = imgKey.split("_")[1];
                      if (!index) return;

                      const name =
                        data[`Name_${index}`] ||
                        data[`name_${index}`] ||
                        `${sub.title} Member`;

                      // you can keep/remove these “generic” entries as you wish
                      fetchedMembers.push({
                        id: `${doc.id}_${index}`,
                        name,
                        title:
                          data[`Title_${index}`] ||
                          data[`Designation_${index}`] ||
                          sub.title,
                        image: data[imgKey] || DEFAULT_IMAGE,
                        facebook: data[`Facebook_${index}`],
                        linkedin: data[`Linkedin_${index}`],
                        github: data[`Github_${index}`],
                        email: data[`Email_${index}`],
                        order: parseInt(index, 10) || 999,
                        category: sub.title,
                        isGeneric: !data[`Name_${index}`],
                      });
                    });
                    return;
                  }

                  // ✅ standard structure
                  const memberName = data.Name || data.name || "Unknown";
                  if (isUnknown(memberName)) return;

                  fetchedMembers.push({
                    id: doc.id,
                    name: memberName,
                    title: data.Title || data.title || data.Designation || "",
                    image: data.Image || data.image || data.Photo || DEFAULT_IMAGE,
                    facebook: data.Facebook || data.facebook,
                    linkedin: data.Linkedin || data.linkedin,
                    github: data.Github || data.github,
                    email: data.Email || data.email,
                    order: data.Order || 999,
                    category: sub.title,
                    ...data,
                  });
                });
              } catch (err) {
                console.warn(`Failed to fetch subcollection ${sub.id}:`, err);
              }
            })
          );
        }

        // ✅ sorting
        const categoryOrder: Record<string, number> = {
          "Advisory Panel": 0,
          "Executive Panel": 1,
          "Deputy Executive Panel": 2,
          "Senior Sub-Executive Panel": 3,
          "Sub-Executive Panel": 4,
          "Junior Sub-Executive Panel": 5,
          "Working Committee": 6,
          "General Members": 7,
          "Hall of Fame": 8,
        };

        fetchedMembers.sort((a, b) => {
          const catA = categoryOrder[a.category || ""] ?? 99;
          const catB = categoryOrder[b.category || ""] ?? 99;
          if (catA !== catB) return catA - catB;
          return (a.order ?? 999) - (b.order ?? 999);
        });

        setMembers(fetchedMembers);
      } catch (error) {
        console.error("Error fetching governing panel:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [panelId]);

  const SocialIcon = ({
    href,
    icon: Icon,
    label,
    forceMailto,
  }: {
    href?: string;
    icon: any;
    label: string;
    forceMailto?: boolean;
  }) => {
    if (!href) return null;

    const finalHref =
      forceMailto && !href.startsWith("mailto:") ? `mailto:${href}` : href;

    return (
      <motion.a
        href={finalHref}
        target={finalHref.startsWith("mailto:") ? undefined : "_blank"}
        rel={finalHref.startsWith("mailto:") ? undefined : "noopener noreferrer"}
        className="p-2 rounded-lg bg-[#2ECC71]/10 hover:bg-[#2ECC71]/20 text-[#2ECC71] hover:text-white transition-all border border-[#2ECC71]/20 hover:border-[#2ECC71]/50 hover:shadow-[0_0_20px_0_rgba(46,204,113,0.4)]"
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.95 }}
        aria-label={label}
        onClick={(e) => e.stopPropagation()}
      >
        <Icon className="w-4 h-4" />
      </motion.a>
    );
  };

  // ✅ group members for UI
  const grouped = useMemo(() => {
    const groupedMembers = members.reduce((acc, member) => {
      const cat = member.category || "Other";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(member);
      return acc;
    }, {} as Record<string, Person[]>);

    const sectionOrder = [
      "Advisory Panel",
      "Executive Panel",
      "Deputy Executive Panel",
      "Senior Sub-Executive Panel",
      "Sub-Executive Panel",
      "Junior Sub-Executive Panel",
      "Working Committee",
      "General Members",
      "Hall of Fame",
    ];

    const present = Object.keys(groupedMembers);
    const sortedCategories = [
      ...sectionOrder.filter((c) => present.includes(c)),
      ...present.filter((c) => !sectionOrder.includes(c)),
    ];

    return { groupedMembers, sortedCategories };
  }, [members]);

  return (
    <>
      <div className="min-h-screen relative overflow-hidden bg-black pt-32 pb-20">
        {/* Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
          <motion.div
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-[rgba(46,204,113,0.15)] via-transparent to-[rgba(46,204,113,0.15)]"
            style={{ filter: "blur(64px)" }}
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        {/* Orbs */}
        <div className="hidden lg:block absolute inset-0 opacity-30 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 -left-20 w-96 h-96 bg-[#2ECC71] rounded-full"
            style={{ filter: "blur(100px)", transform: "translateZ(0)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-[#27AE60] rounded-full"
            style={{ filter: "blur(100px)", transform: "translateZ(0)" }}
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <motion.div
            key={panelId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block mb-4"
            >
              <span className="px-6 py-2 rounded-full bg-gradient-to-r from-[#2ECC71]/20 to-[#27AE60]/20 border border-[#2ECC71]/30 text-[#2ECC71] backdrop-blur-sm shadow-[0_0_30px_0_rgba(46,204,113,0.3)]">
                {panelId === "hall-of-fame" ? "Legends" : "Leadership"}
              </span>
            </motion.div>

            <h1 className="text-6xl mb-6 bg-gradient-to-r from-white via-[#2ECC71] to-white bg-clip-text text-transparent">
              {getDisplayText(panelId || "")}
            </h1>

            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              {panelId === "hall-of-fame"
                ? "Honoring the exceptional leaders who shaped the legacy of Aust Robotics Club"
                : "Meet the dedicated panel members leading the way"}
            </p>
          </motion.div>

          {/* Members */}
          {loading ? (
            <div className="text-center py-12">
              <p className="text-gray-400">Loading panel members...</p>
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-400">
                No members found for this section yet.
              </p>
            </div>
          ) : (
            grouped.sortedCategories.map((category) => (
              <div key={category} className="mb-16 last:mb-0">
                {category !== "Hall of Fame" &&
                  (grouped.sortedCategories.length > 1 || category !== "Other") && (
                    <motion.h2
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-3xl font-bold mb-8 text-white border-l-4 border-[#2ECC71] pl-4"
                    >
                      {category}
                    </motion.h2>
                  )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {grouped.groupedMembers[category].map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      onClick={() => setSelectedPerson(member)}
                    >
                      {/* ✅ min height to keep cards uniform */}
                      <Card className="relative group overflow-hidden bg-gradient-to-br from-black/90 via-[#0a1810]/90 to-black/90 border-[#2ECC71]/20 hover:border-[#2ECC71]/50 backdrop-blur-xl transition-all duration-500 hover:shadow-[0_0_60px_0_rgba(46,204,113,0.3)] cursor-pointer min-h-[560px] h-full flex flex-col">
                        {/* Glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#2ECC71]/5 via-transparent to-[#27AE60]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* ✅ FULL IMAGE SHOWING (no cropping) */}
                        <div className="relative w-full aspect-[3/4] bg-black overflow-hidden">
                          <motion.img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-contain object-center"
                            whileHover={{ scale: 1.03 }}
                            transition={{ duration: 0.5 }}
                            loading="lazy"
                          />
                          {/* optional overlay for style */}
                        </div>

                        {/* Content */}
                        <div className="relative p-6 space-y-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h3 className="text-2xl text-white mb-2">
                              {member.name}
                            </h3>
                            <p className="text-[#2ECC71]">{member.title}</p>
                          </div>

                          {/* Social */}
                          <div className="flex gap-3 pt-4 border-t border-[#2ECC71]/20">
                            <SocialIcon
                              href={member.facebook}
                              icon={Facebook}
                              label="Facebook"
                            />
                            <SocialIcon
                              href={member.linkedin}
                              icon={Linkedin}
                              label="LinkedIn"
                            />
                            <SocialIcon
                              href={member.github}
                              icon={Github}
                              label="GitHub"
                            />
                            <SocialIcon
                              href={member.email}
                              icon={Mail}
                              label="Email"
                              forceMailto
                            />
                          </div>
                        </div>

                        {/* Hover Border */}
                        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                          <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_30px_0_rgba(46,204,113,0.2)]" />
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ✅ MODAL (always on top) */}
      {createPortal(
        <AnimatePresence>
          {selectedPerson && (
            <div
              className="fixed inset-0"
              style={{ zIndex: 2147483647 }}
              role="dialog"
              aria-modal="true"
            >
              {/* Backdrop */}
              <motion.div
                key="modal-backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/90 backdrop-blur-md"
                onClick={() => setSelectedPerson(null)}
              />

              {/* Content wrapper */}
              <motion.div
                key="modal-content"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="absolute inset-0 flex items-center justify-center p-4"
                onClick={() => setSelectedPerson(null)}
              >
                <div
                  className="bg-[#0a1810] border border-[#2ECC71]/30 rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-[0_0_50px_0_rgba(46,204,113,0.3)] relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => setSelectedPerson(null)}
                    className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-[#2ECC71]/20 rounded-full text-white hover:text-[#2ECC71] transition-all z-10"
                    aria-label="Close"
                  >
                    <X size={24} />
                  </button>

                  {/* Image */}
                  <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-black overflow-hidden">
                    <motion.img
                      src={selectedPerson.image}
                      alt={selectedPerson.name}
                      className="w-full h-full object-contain object-center"
                      initial={{ scale: 1.2, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-[#0a1810] via-transparent to-transparent md:bg-gradient-to-r"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                    {/* Scan line effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-b from-[#2ECC71]/20 via-transparent to-transparent h-[50%]"
                      initial={{ y: "-100%" }}
                      animate={{ y: "300%" }}
                      transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
                    />
                  </div>

                  {/* Details */}
                  <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-black/40 overflow-hidden">
                    {/* Category Badge */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="mb-4"
                    >
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-[#2ECC71]/20 text-[#2ECC71] border border-[#2ECC71]/30">
                        {selectedPerson.category || "Member"}
                      </span>
                    </motion.div>

                    {/* Name with Typewriter */}
                    <h2 className="text-4xl text-white font-bold mb-2">
                      <TypewriterText 
                        text={selectedPerson.name} 
                        delay={0.4} 
                        speed={0.04}
                      />
                    </h2>
                    
                    {/* Title with Typewriter */}
                    <h3 className="text-xl text-[#2ECC71] mb-2">
                      <TypewriterText 
                        text={selectedPerson.title} 
                        delay={0.4 + selectedPerson.name.length * 0.04 + 0.3} 
                        speed={0.03}
                      />
                    </h3>

                    <GlowingDivider delay={0.4 + (selectedPerson.name.length + selectedPerson.title.length) * 0.035 + 0.5} />

                    {/* Additional Info with staggered reveal */}
                    <motion.div 
                      className="space-y-3 text-gray-300 mb-6"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            delayChildren: 1.2,
                            staggerChildren: 0.15
                          }
                        }
                      }}
                    >
                      {selectedPerson.Description && (
                        <motion.p
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 }
                          }}
                          className="text-sm leading-relaxed"
                        >
                          {selectedPerson.Description}
                        </motion.p>
                      )}
                      {selectedPerson.Department && (
                        <motion.p
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 }
                          }}
                          className="flex items-center gap-2"
                        >
                          <span className="w-2 h-2 rounded-full bg-[#2ECC71]" />
                          <span className="text-[#2ECC71]/70">Department:</span>{" "}
                          {selectedPerson.Department}
                        </motion.p>
                      )}
                      {selectedPerson.Session && (
                        <motion.p
                          variants={{
                            hidden: { opacity: 0, x: -20 },
                            visible: { opacity: 1, x: 0 }
                          }}
                          className="flex items-center gap-2"
                        >
                          <span className="w-2 h-2 rounded-full bg-[#2ECC71]" />
                          <span className="text-[#2ECC71]/70">Session:</span>{" "}
                          {selectedPerson.Session}
                        </motion.p>
                      )}
                    </motion.div>

                    {/* Social Icons with pop animation */}
                    <motion.div 
                      className="flex gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.5, duration: 0.5 }}
                    >
                      {[
                        { href: selectedPerson.facebook, icon: Facebook, label: "Facebook" },
                        { href: selectedPerson.linkedin, icon: Linkedin, label: "LinkedIn" },
                        { href: selectedPerson.github, icon: Github, label: "GitHub" },
                        { href: selectedPerson.email, icon: Mail, label: "Email", forceMailto: true }
                      ].filter(social => social.href).map((social) => (
                            <SocialIcon
                              key={social.label}
                              href={social.href}
                              icon={social.icon}
                              label={social.label}
                              forceMailto={social.forceMailto}
                            />
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
