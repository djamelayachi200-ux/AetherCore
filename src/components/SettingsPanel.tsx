"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, Volume2, VolumeX } from "lucide-react";
import { useSoundCtx } from "@/components/SoundProvider";

export default function SettingsPanel() {
  const [open, setOpen] = useState(false);
  const [volume, setVolumeState] = useState(0.5);
  const [muted, setMuted] = useState(true);
  const sfx = useSoundCtx();
  const sliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMuted(sfx.isMuted());
    setVolumeState(sfx.getVolume());
  }, [sfx]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    setVolumeState(v);
    sfx.setVolume(v);
  }, [sfx]);

  const handleToggleMute = useCallback(() => {
    sfx.toggleMute();
    setMuted((p) => !p);
  }, [sfx]);

  return (
    <>
      <motion.button
        onClick={() => setOpen((p) => !p)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1.7 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-20 z-50 w-11 h-11 rounded-full bg-dark-800/80 backdrop-blur-md border border-dark-500/40 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-accent-platinum/40 transition-all duration-300 shadow-lg"
        aria-label="Settings"
      >
        <Settings className="w-4 h-4" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed bottom-24 right-6 z-50 w-64 rounded-xl bg-dark-800/90 backdrop-blur-xl border border-dark-500/40 shadow-2xl p-5"
            >
              <h3 className="text-text-primary font-orbitron text-sm font-semibold tracking-wider mb-4 uppercase">
                Sound Settings
              </h3>

              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={handleToggleMute}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                  aria-label={muted ? "Unmute" : "Mute"}
                >
                  {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>

                <div className="flex-1 flex items-center gap-2">
                  <span className="text-xs text-text-muted w-8 text-right">0%</span>
                  <input
                    ref={sliderRef}
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="flex-1 h-1.5 appearance-none bg-dark-600 rounded-full cursor-pointer accent-accent-platinum [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent-platinum [&::-webkit-slider-thumb]:shadow-md"
                  />
                  <span className="text-xs text-text-muted w-8">100%</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-text-muted">
                <span>SFX Volume</span>
                <span className="text-accent-platinum font-medium">{Math.round(volume * 100)}%</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
