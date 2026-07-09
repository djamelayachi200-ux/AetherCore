"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import type { TargetAndTransition, Transition } from "framer-motion";
import Button from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageProvider";

type Phase = "idle" | "exploding" | "imploding" | "revealed";

const assets = [
  { src: "/Ball.png", alt: "Ball", idx: -220, idy: -190, rot: -6, size: 72, delay: 0 },
  { src: "/Gun.png", alt: "Gun", idx: 240, idy: -170, rot: 8, size: 60, delay: 0.5 },
  { src: "/controler.png", alt: "Controller", idx: -210, idy: 210, rot: 10, size: 64, delay: 1.0 },
  { src: "/MainCraft.png", alt: "MainCraft", idx: 230, idy: 200, rot: -4, size: 80, delay: 0.2 },
  { src: "/Smart.png", alt: "Smart", idx: 40, idy: -30, rot: 3, size: 52, delay: 0.8 },
];

const particles = Array.from({ length: 20 }, (_, i) => ({
  angle: (i / 20) * 360,
  dist: 40 + Math.random() * 80,
  size: 2 + Math.random() * 4,
  delay: Math.random() * 0.2,
}));

export default function Hero() {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<Phase>("idle");
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [contentVisible, setContentVisible] = useState(true);
  const [titleRevealed, setTitleRevealed] = useState(false);
  const [restRevealed, setRestRevealed] = useState(false);
  const implodeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showContentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const clearTimers = () => {
    if (implodeTimerRef.current) clearTimeout(implodeTimerRef.current);
    if (revealTimerRef.current) clearTimeout(revealTimerRef.current);
    if (showContentTimerRef.current) clearTimeout(showContentTimerRef.current);
    implodeTimerRef.current = null;
    revealTimerRef.current = null;
    showContentTimerRef.current = null;
  };

  const resetToIdle = () => {
    clearTimers();
    setPhase("idle");
    setContentVisible(true);
  };

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) resetToIdle();
      },
      { threshold: 0.3 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (phase !== "idle") setContentVisible(false);
    if (phase === "revealed") {
      showContentTimerRef.current = setTimeout(() => setContentVisible(true), 1200);
    }
  }, [phase]);

  useEffect(() => {
    const t1 = setTimeout(() => setTitleRevealed(true), 150);
    const t2 = setTimeout(() => setRestRevealed(true), 900);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useEffect(() => {
    return clearTimers;
  }, []);

  const handleHoverIn = () => {
    if (phase !== "idle") return;
    setPhase("exploding");
    implodeTimerRef.current = setTimeout(() => setPhase("imploding"), 250);
    revealTimerRef.current = setTimeout(() => setPhase("revealed"), 750);
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0A0B10]" />

      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #B8BFCB 1px, transparent 0)", backgroundSize: "50px 50px" }} />

      <motion.div className="absolute top-1/4 -left-20 w-72 h-72 rounded-full bg-accent-platinum/5 blur-3xl" animate={{ x: [0, 40, -20, 30, 0], y: [0, -30, 20, -10, 0], scale: [1, 1.1, 0.9, 1.05, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} style={{ x: (mousePos.x - 0.5) * -30, y: (mousePos.y - 0.5) * -30 }} />
      <motion.div className="absolute bottom-1/3 -right-16 w-96 h-96 rounded-full bg-accent-navy/5 blur-3xl" animate={{ x: [0, -50, 30, -20, 0], y: [0, 40, -30, 20, 0], scale: [1, 0.9, 1.15, 0.95, 1] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }} style={{ x: (mousePos.x - 0.5) * 20, y: (mousePos.y - 0.5) * 20 }} />
      <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent-mauve/3 blur-3xl" animate={{ scale: [1, 1.2, 0.85, 1.1, 1], rotate: [0, 30, -20, 10, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }} />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div className="absolute w-px h-32 bg-gradient-to-b from-transparent via-accent-platinum/10 to-transparent" animate={{ top: ["-10%", "110%"] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }} style={{ left: "15%" }} />
        <motion.div className="absolute w-px h-24 bg-gradient-to-b from-transparent via-accent-navy/8 to-transparent" animate={{ top: ["-10%", "110%"] }} transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 2 }} style={{ left: "45%" }} />
        <motion.div className="absolute w-px h-40 bg-gradient-to-b from-transparent via-accent-platinum/8 to-transparent" animate={{ top: ["-10%", "110%"] }} transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 4 }} style={{ left: "75%" }} />
      </div>

      {assets.map((asset, i) => {
        const idleX = asset.idx + (mousePos.x - 0.5) * 20;
        const idleY = asset.idy + (mousePos.y - 0.5) * 20;
        const explodeX = asset.idx * 2.2 + (Math.random() - 0.5) * 60;
        const explodeY = asset.idy * 2.2 + (Math.random() - 0.5) * 60;

        let target: TargetAndTransition;
        let trans: Transition;

        const rotMult = Math.abs(asset.rot) + 6;

        if (phase === "idle") {
          target = {
            left: `calc(50% + ${idleX}px)`,
            top: `calc(50% + ${idleY}px)`,
            x: "-50%",
            y: ["0px", "-24px", "12px", "-16px", "0px"],
            rotate: [0, rotMult * 4, rotMult * -3, rotMult * 5, rotMult * -2, 0],
            scale: 1,
            opacity: 1,
          };
          trans = {
            left: { type: "spring", stiffness: 25, damping: 14 },
            top: { type: "spring", stiffness: 25, damping: 14 },
            y: { duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: asset.delay },
            rotate: { duration: 5 + i * 0.3, repeat: Infinity, ease: "easeInOut", delay: asset.delay },
            scale: { duration: 0.4 },
            opacity: { duration: 0.3 },
          };
        } else if (phase === "exploding") {
          target = {
            left: `calc(50% + ${explodeX}px)`,
            top: `calc(50% + ${explodeY}px)`,
            x: "-50%",
            y: "-50%",
            rotate: 360 * 2 + asset.rot * 20,
            scale: 2.0,
            opacity: 1,
          };
          trans = {
            left: { duration: 0.3, ease: "easeOut" },
            top: { duration: 0.3, ease: "easeOut" },
            x: { duration: 0.3 },
            rotate: { duration: 0.35, ease: "easeOut" },
            scale: { duration: 0.25, ease: "easeOut" },
            opacity: { duration: 0.15 },
          };
        } else if (phase === "imploding") {
          target = {
            left: "50%",
            top: "33%",
            x: "-50%",
            y: "-50%",
            rotate: 360 * 3,
            scale: 0.25,
            opacity: i === 4 ? 1 : 0.25,
          };
          trans = {
            left: { duration: 0.5, ease: [0.12, 0.8, 0.24, 1], delay: i * 0.04 },
            top: { duration: 0.5, ease: [0.12, 0.8, 0.24, 1], delay: i * 0.04 },
            x: { duration: 0.3 },
            y: { duration: 0.3 },
            rotate: { duration: 0.5, ease: "easeIn", delay: i * 0.03 },
            scale: { duration: 0.4, ease: [0.34, 1.56, 0.64, 1], delay: i * 0.03 },
            opacity: { duration: 0.3, delay: i * 0.03 },
          };
        } else {
          target = {
            left: "50%",
            top: "33%",
            x: "-50%",
            y: "-50%",
            rotate: 720,
            scale: 0.1,
            opacity: 0,
          };
          trans = { duration: 0.3, ease: "easeOut" };
        }

        return (
          <motion.img
            key={asset.alt}
            src={asset.src}
            alt={asset.alt}
            className="absolute pointer-events-none select-none"
            style={{ width: asset.size, height: asset.size, objectFit: "contain", zIndex: phase === "revealed" ? 1 : 15 }}
            initial={false}
            animate={target}
            transition={trans}
          />
        );
      })}

      <AnimatePresence>
        {(phase === "imploding" || phase === "revealed") && (
          <motion.div
            key="shockwave"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent-platinum/30 pointer-events-none"
            initial={{ width: 0, height: 0, opacity: 0.8 }}
            animate={{ width: [0, 700, 1400], height: [0, 700, 1400], opacity: [0.8, 0.3, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{ zIndex: 10 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {(phase === "exploding" || phase === "imploding") && (
          <motion.div
            key="vortex"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
            initial={{ width: 0, height: 0, opacity: 0 }}
            animate={{
              width: [0, 300, 600],
              height: [0, 300, 600],
              opacity: [0, 0.15, 0],
              boxShadow: ["0 0 0px rgba(184,191,203,0)", "0 0 60px rgba(184,191,203,0.15)", "0 0 0px rgba(184,191,203,0)"],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{ zIndex: 8 }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "imploding" && (
          <>
            {particles.map((p, i) => (
              <motion.div
                key={`p-${i}`}
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: p.size,
                  height: p.size,
                  background: i % 3 === 0 ? "#B8BFCB" : i % 3 === 1 ? "#3A4A6B" : "#6B5A6B",
                  zIndex: 9,
                  left: "50%",
                  top: "50%",
                }}
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: [0, Math.cos((p.angle * Math.PI) / 180) * p.dist * 4, Math.cos((p.angle * Math.PI) / 180) * p.dist * 7],
                  y: [0, Math.sin((p.angle * Math.PI) / 180) * p.dist * 4, Math.sin((p.angle * Math.PI) / 180) * p.dist * 7],
                  opacity: [1, 0.6, 0],
                  scale: [1, 0.5, 0],
                }}
                transition={{ duration: 0.8, ease: "easeOut", delay: p.delay }}
              />
            ))}
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "revealed" && (
          <>
            <motion.div
              key="ambient-glow"
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{ zIndex: 3 }}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: [0, 0.35, 0.25], scale: [0.3, 1.2, 1] }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <div className="w-[800px] h-[800px] rounded-full" style={{ background: "radial-gradient(circle, rgba(184,191,203,0.12) 0%, rgba(58,74,107,0.06) 30%, transparent 60%)" }} />
            </motion.div>

            <motion.div
              key="flash-vignette"
              className="absolute inset-0 pointer-events-none"
              style={{ zIndex: 4 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.15, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, rgba(184,191,203,0.18) 0%, transparent 60%)" }} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div
        className="relative z-20 w-full flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-[12vh] sm:pt-[15vh]"
        onMouseEnter={handleHoverIn}
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: contentVisible ? 1 : 0,
            y: contentVisible ? 0 : -40,
            scale: contentVisible ? 1 : 0.8,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="mb-6 sm:mb-8"
        >
          <motion.span
            data-sfx-hover
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-platinum/30 bg-dark-900/60 backdrop-blur-sm text-accent-platinum/80 text-xs sm:text-sm font-medium tracking-wider uppercase"
            whileHover={{ scale: 1.05 }}
            animate={{ borderColor: ["rgba(184,191,203,0.3)", "rgba(58,74,107,0.5)", "rgba(184,191,203,0.3)"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-3.5 h-3.5 animate-breathe" />
            {t("hero.subtitle")}
          </motion.span>
        </motion.div>

        {/* Main Title — dramatic entrance */}
        <motion.h1
          initial={{ opacity: 0, scale: 2.5, filter: "blur(32px)", letterSpacing: "0.5em" }}
          animate={{
            opacity: contentVisible ? (titleRevealed ? 1 : 0) : 0,
            scale: contentVisible ? 1 : 1.4,
            y: contentVisible ? 0 : -50,
            filter: contentVisible ? "blur(0px)" : "blur(12px)",
            letterSpacing: contentVisible ? "0.02em" : "0.08em",
            textShadow: contentVisible
              ? (phase === "revealed"
                ? ["0 0 0px rgba(184,191,203,0)", "0 0 100px rgba(184,191,203,0.5)", "0 0 60px rgba(184,191,203,0.25)"]
                : "0 0 40px rgba(184,191,203,0.12), 0 0 80px rgba(58,74,107,0.08)")
              : "0 0 0px rgba(184,191,203,0)",
          }}
          transition={{
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
            scale: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] },
            filter: { duration: 0.6 },
            letterSpacing: { duration: 0.8, ease: "easeOut" },
            textShadow: { duration: 0.5, ease: "easeOut" },
          }}
          className="font-orbitron text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-wider text-accent-platinum/70 mb-6 sm:mb-8"
        >
          AETHRECORE
        </motion.h1>

        {/* Slogan 1 */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: contentVisible ? (restRevealed ? 1 : 0) : 0,
            y: contentVisible ? (restRevealed ? 0 : 20) : -50,
            scale: contentVisible ? 1 : 0.7,
          }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="text-lg sm:text-xl md:text-2xl text-text-secondary font-light tracking-wide mb-4 sm:mb-5 max-w-2xl"
        >
          <motion.span data-sfx-hover className="text-accent-navy font-semibold inline-block" whileHover={{ scale: 1.1, y: -2 }} transition={{ type: "spring", stiffness: 300 }}>{t("hero.slogan1")}</motion.span>{" "}
          <motion.span data-sfx-hover className="text-accent-platinum font-semibold inline-block" whileHover={{ scale: 1.1, y: -2 }} transition={{ type: "spring", stiffness: 300 }}>{t("hero.slogan2")}</motion.span>{" "}
          <motion.span data-sfx-hover className="text-accent-mauve font-semibold inline-block" whileHover={{ scale: 1.1, y: -2 }} transition={{ type: "spring", stiffness: 300 }}>{t("hero.slogan3")}</motion.span>
        </motion.p>

        {/* Slogan 2 */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: contentVisible ? (restRevealed ? 1 : 0) : 0,
            y: contentVisible ? (restRevealed ? 0 : 20) : -55,
            scale: contentVisible ? 1 : 0.7,
          }}
          transition={{ duration: 0.35, delay: 0.08, ease: "easeOut" }}
          className="text-sm sm:text-base text-text-muted font-light tracking-[0.25em] uppercase mb-10 sm:mb-12"
        >
          {t("hero.desc")}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: contentVisible ? (restRevealed ? 1 : 0) : 0,
            y: contentVisible ? (restRevealed ? 0 : 20) : -60,
            scale: contentVisible ? 1 : 0.7,
          }}
          transition={{ duration: 0.35, delay: 0.15, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <Button href="https://discord.gg/5t3hUFVcS" target="_blank" rel="noopener noreferrer" variant="primary">
            {t("hero.joinBtn")}
            <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </Button>
          <Button href="#tournaments" variant="secondary">
            {t("hero.exploreBtn")}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>

      <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <div className="w-6 h-10 rounded-full border-2 border-dark-500 flex items-start justify-center p-1.5">
          <motion.div animate={{ y: [0, 12, 0], opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} className="w-1.5 h-1.5 rounded-full bg-accent-platinum" />
        </div>
      </motion.div>
    </section>
  );
}
