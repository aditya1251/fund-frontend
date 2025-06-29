import Image from "next/image";
import Footer from "@/components/footer";
import Journey from "@/components/journey";
import NavigationHeader from "@/components/navbar";
import Hero from "@/components/hero-section";
import StatsSection from "@/components/square";
import Mobile from "@/components/mobile";
import Price from "@/components/plan";
import Testimonials from "@/components/testimonial";
import ContactForm from "@/components/ContactForm";
export default function Home() {
  return (
    <>
      <NavigationHeader />
      <Hero />
      <StatsSection />
      <Mobile />
      <Price />
      <Testimonials />
      <Journey />
      <ContactForm/>
      <Footer />
    </>
  );
}
