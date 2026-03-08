import Header from "@/components/Header";
import Hero from "@/components/Hero";
import News from "@/components/News";
import Status from "@/components/Status";
import AIEmployees from "@/components/AIEmployees";
import Strengths from "@/components/Strengths";
import Quests from "@/components/Quests";
import Guilds from "@/components/Guilds";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <News />
        <Status />
        <AIEmployees />
        <Strengths />
        <Quests />
        <Guilds />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
