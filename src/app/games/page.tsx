"use client";
import Navbar from "@/components/Navbar";
import GamesGrid from "@/components/GamesGrid";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageProvider";

export default function GamesPage() {
  const { t } = useLanguage();
  return (
    <>
      <Navbar />
      <div className="pt-20">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <h1 className="font-orbitron text-4xl sm:text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-accent-platinum to-accent-navy bg-clip-text text-transparent">
            {t("games.allGames")}
          </h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            {t("games.allDesc")}
          </p>
        </section>
        <GamesGrid />
      </div>
      <Footer />
    </>
  );
}
