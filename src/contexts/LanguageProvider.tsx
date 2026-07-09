"use client";

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { translations, type Lang, type TranslationKeys } from "@/translations";

type LanguageContextType = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (path: string) => string;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

function getValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split(".");
  let current: unknown = obj;
  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      return path;
    }
  }
  return typeof current === "string" ? current : path;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("lang") as Lang | null;
    if (stored === "ar" || stored === "en") {
      setLangState(stored);
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", lang === "ar" ? "rtl" : "ltr");
    localStorage.setItem("lang", lang);
  }, [lang, mounted]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const t = useCallback((path: string): string => {
    return getValue(translations[lang] as unknown as Record<string, unknown>, path);
  }, [lang]);

  if (!mounted) return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    const fallbackT = (path: string): string => getValue(translations.en as unknown as Record<string, unknown>, path);
    return { lang: "en" as Lang, setLang: () => {}, t: fallbackT };
  }
  return ctx;
}
