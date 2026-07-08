"use client";

import { useCallback, useRef, useEffect } from "react";

type SoundType = "hover" | "click" | "inkSpread" | "uiSlide" | "notification";

const VOLUMES: Record<SoundType, number> = {
  hover: 0.04,
  click: 0.06,
  inkSpread: 0.08,
  uiSlide: 0.05,
  notification: 0.07,
};

const RATES: Record<SoundType, number> = {
  hover: 1.6,
  click: 1.0,
  inkSpread: 0.75,
  uiSlide: 1.2,
  notification: 0.9,
};

const SFX_SRC = "/bluearchive-click-sound.mp3";

const SFX_VOLUME_KEY = "sfx_volume";

export function useSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mutedRef = useRef(false);
  const volumeRef = useRef(0.5);

  useEffect(() => {
    const muted = typeof window !== "undefined" ? localStorage.getItem("sfx_muted") : null;
    if (muted === "true") mutedRef.current = true;
    const vol = typeof window !== "undefined" ? localStorage.getItem(SFX_VOLUME_KEY) : null;
    if (vol !== null) volumeRef.current = Math.max(0, Math.min(1, parseFloat(vol)));
  }, []);

  const getBase = useCallback(() => {
    if (!audioRef.current) audioRef.current = new Audio(SFX_SRC);
    return audioRef.current;
  }, []);

  const play = useCallback((type: SoundType) => {
    if (mutedRef.current) return;
    try {
      const base = getBase();
      const clone = base.cloneNode() as HTMLAudioElement;
      clone.volume = VOLUMES[type] * volumeRef.current;
      clone.playbackRate = RATES[type];
      clone.play().catch(() => {});
    } catch {}
  }, [getBase]);

  const playInkSpread = useCallback(() => {
    if (mutedRef.current) return;
    try {
      const base = getBase();
      for (let i = 0; i < 3; i++) {
        const clone = base.cloneNode() as HTMLAudioElement;
        clone.volume = (0.06 - i * 0.015) * volumeRef.current;
        clone.playbackRate = 0.7 + i * 0.15;
        setTimeout(() => clone.play().catch(() => {}), i * 60);
      }
    } catch {}
  }, [getBase]);

  const toggleMute = useCallback(() => {
    mutedRef.current = !mutedRef.current;
    localStorage.setItem("sfx_muted", String(mutedRef.current));
  }, []);

  const isMuted = useCallback(() => mutedRef.current, []);

  const setVolume = useCallback((v: number) => {
    volumeRef.current = Math.max(0, Math.min(1, v));
    localStorage.setItem(SFX_VOLUME_KEY, String(volumeRef.current));
  }, []);

  const getVolume = useCallback(() => volumeRef.current, []);

  return { play, playInkSpread, toggleMute, isMuted, setVolume, getVolume };
}

export type UseSoundReturn = ReturnType<typeof useSound>;
