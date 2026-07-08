"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useSoundCtx } from "@/components/SoundProvider";

export default function SoundToggle() {
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);
  const sfx = useSoundCtx();

  useEffect(() => {
    setMuted(sfx.isMuted());
    setReady(true);
  }, [sfx]);

  const handleToggle = useCallback(() => {
    sfx.toggleMute();
    setMuted((p) => !p);
  }, [sfx]);

  if (!ready) return null;

  return (
    <motion.button
      onClick={handleToggle}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay: 1.5 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-dark-800/80 backdrop-blur-md border border-dark-500/40 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent-platinum/40 transition-all duration-300 shadow-lg"
      aria-label={muted ? "Enable sound" : "Mute sound"}
    >
      {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
    </motion.button>
  );
}
