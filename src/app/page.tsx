import Image from "next/image";
import Footer from "@/components/footer";
import Journey from "@/components/journey";
import NavigationHeader from "@/components/navbar";
import Hero from "@/components/hero-section";
import StatsSection from "@/components/square";
export default function Home() {
  return (
    <>
      <NavigationHeader />
      <Hero />
      <StatsSection />
      <Journey />
      <Footer />
    </>
  );
}
