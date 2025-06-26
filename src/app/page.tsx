import Image from "next/image";
import Footer from "@/components/footer";
import Journey from "@/components/journey";
import NavigationHeader from "@/components/navbar";
import Hero from "@/components/hero-section";
export default function Home() {
  return (
    <>
      <NavigationHeader />
      <Hero />
      <Journey />
      <Footer />
    </>
  );
}
