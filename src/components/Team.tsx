"use client";

import { motion } from "framer-motion";
import { Shield, Crown, Star, Users } from "lucide-react";

const teamMembers = [
  {
    name: "Kuro",
    role: "Founder",
    icon: Crown,
    gradient: "from-amber-400 to-yellow-600",
    color: "#FBBF24",
  },
  {
    name: "Vex",
    role: "Admin",
    icon: Shield,
    gradient: "from-accent-platinum to-gray-400",
    color: "#B8BFCB",
  },
  {
    name: "Nova",
    role: "Admin",
    icon: Shield,
    gradient: "from-accent-platinum to-gray-400",
    color: "#B8BFCB",
  },
  {
    name: "Pixel",
    role: "Moderator",
    icon: Star,
    gradient: "from-accent-navy to-blue-700",
    color: "#3A4A6B",
  },
  {
    name: "Raven",
    role: "Moderator",
    icon: Star,
    gradient: "from-accent-navy to-blue-700",
    color: "#3A4A6B",
  },
  {
    name: "Blitz",
    role: "Moderator",
    icon: Star,
    gradient: "from-accent-navy to-blue-700",
    color: "#3A4A6B",
  },
  {
    name: "Ember",
    role: "Support",
    icon: Users,
    gradient: "from-accent-mauve to-purple-700",
    color: "#6B5A6B",
  },
  {
    name: "Frost",
    role: "Support",
    icon: Users,
    gradient: "from-accent-mauve to-purple-700",
    color: "#6B5A6B",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const memberVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function Team() {
  return (
    <section id="team" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800/40 to-dark-900" />

      <motion.div
        className="absolute top-10 left-10 w-40 h-40 rounded-full bg-accent-platinum/3 blur-3xl"
        animate={{ x: [0, 20, -10, 0], y: [0, -15, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-accent-navy/3 blur-3xl"
        animate={{ x: [0, -20, 15, 0], y: [0, 10, -15, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-accent-platinum to-accent-navy bg-clip-text text-transparent">
              THE CREW
            </span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            The team behind the scenes keeping the server running
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
        >
          {teamMembers.map((member) => {
            const Icon = member.icon;
            return (
              <motion.div
                key={member.name}
                variants={memberVariants}
                data-sfx-hover
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-lg bg-gradient-to-br from-dark-500/50 to-transparent" />

                <div className="relative bg-dark-700/80 border border-dark-500/50 rounded-2xl p-6 sm:p-8 text-center h-full flex flex-col items-center gap-4 transition-all duration-300 group-hover:border-dark-400/70 overflow-hidden">
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent -translate-x-full group-hover:animate-shimmer-sweep" />
                  </div>

                  <div className="relative">
                    <motion.div
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center border-2"
                      style={{
                        borderColor: `${member.color}60`,
                        boxShadow: `0 0 20px ${member.color}20`,
                      }}
                      whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100"
                        style={{
                          background: `conic-gradient(from 0deg, transparent, ${member.color}40, transparent, ${member.color}20, transparent)`,
                        }}
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                      />
                      <div
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center relative z-10 transition-all duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${member.color}20, ${member.color}05)`,
                        }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.15, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          <Icon
                            className="w-7 h-7 sm:w-8 sm:h-8"
                            style={{ color: member.color }}
                          />
                        </motion.div>
                      </div>
                    </motion.div>

                    <motion.div
                      className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center border-2 border-dark-900"
                      style={{ backgroundColor: `${member.color}40` }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: member.color }}
                      />
                    </motion.div>
                  </div>

                  <div>
                    <h3 className="font-orbitron text-lg font-bold text-text-primary mb-1">
                      {member.name}
                    </h3>
                    <motion.span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
                      style={{
                        background: `linear-gradient(135deg, ${member.color}20, ${member.color}05)`,
                        color: member.color,
                        border: `1px solid ${member.color}30`,
                      }}
                      whileHover={{ scale: 1.05, boxShadow: `0 0 15px ${member.color}30` }}
                    >
                      {member.role}
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
