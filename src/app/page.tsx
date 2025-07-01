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
import Fund from "@/components/fundraize";
import GovernmentSchemes from "@/components/GovernmentSchemes";
import Tieup from "@/components/tieUp";
import EmiCalculator from "@/components/EmiCalculator";
import TrustedPartners from "@/components/Partner";
export default function Home() {
  return (
    <>
      <NavigationHeader />
      <Hero />
      <StatsSection />
      <Mobile />
      <Price />
      <StatsSection />
      <Mobile />
      <Price />
      <GovernmentSchemes />
      <TrustedPartners />
      <Tieup />
      <EmiCalculator />
      <Fund />
      <Testimonials />
      <Journey />
      <ContactForm/>
      <Footer />
    </>
  );
}
