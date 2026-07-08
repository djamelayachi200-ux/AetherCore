"use client";

import { motion } from "framer-motion";
import { Lock, Swords, Clock, Sparkles } from "lucide-react";

export default function Tournaments() {
  return (
    <section id="tournaments" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800/50 to-dark-900" />

      <motion.div
        className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full bg-accent-platinum/3 blur-2xl"
        animate={{ y: [0, -20, 10, 0], x: [0, 15, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-accent-navy/3 blur-2xl"
        animate={{ y: [0, 15, -10, 0], x: [0, -10, 20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 2px 2px, #B8BFCB 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
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
              TOURNAMENTS
            </span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Competitive gaming at its finest
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative group"
          data-sfx-hover
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-accent-platinum/20 via-accent-navy/20 to-accent-mauve/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative bg-dark-700/80 backdrop-blur-sm border border-dark-500/50 rounded-2xl p-8 sm:p-12 md:p-16 text-center overflow-hidden">
            <div className="relative z-10">
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-8 flex items-center justify-center">
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-accent-platinum/20"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full border border-accent-navy/20"
                  animate={{ rotate: [360, 0] }}
                  transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                />
                <motion.div
                  className="absolute w-full h-full rounded-full border-2 border-accent-platinum/10"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
                />
                <motion.div
                  className="absolute w-full h-full rounded-full border border-accent-navy/10"
                  animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0, 0.2] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                />
                <motion.div
                  animate={{
                    rotate: [0, -10, 10, -5, 0],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-accent-platinum" />
                </motion.div>
              </div>

              <h3 className="font-orbitron text-2xl sm:text-3xl font-bold text-text-primary mb-4">
                <span className="inline-block">
                  THE ARENA IS PREPARING
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }}
                  >...</motion.span>
                </span>
              </h3>

              <motion.p
                className="text-text-secondary text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                Stay tuned! Epic tournaments and massive prize pools are dropping soon.
              </motion.p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                <motion.div
                  className="flex items-center gap-2 text-text-muted text-sm"
                  whileHover={{ x: 3, color: "#B8BFCB" }}
                >
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <Swords className="w-4 h-4 text-accent-navy" />
                  </motion.div>
                  <span>Prize Pools Incoming</span>
                </motion.div>
                <motion.div
                  className="flex items-center gap-2 text-text-muted text-sm"
                  whileHover={{ x: 3, color: "#B8BFCB" }}
                >
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                  >
                    <Clock className="w-4 h-4 text-accent-mauve" />
                  </motion.div>
                  <span>Coming Soon</span>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
