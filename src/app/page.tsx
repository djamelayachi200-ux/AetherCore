import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Tournaments from "@/components/Tournaments";
import GamesGrid from "@/components/GamesGrid";
import Team from "@/components/Team";
import News from "@/components/News";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Tournaments />
      <GamesGrid limit={4} showMore />
      <Team />
      <News />
      <Footer />
    </>
  );
}
