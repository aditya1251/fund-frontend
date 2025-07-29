import Image from "next/image";
import Footer from "@/components/Footer";
import Journey from "@/components/Journey";
import NavigationHeader from "@/components/Navbar";
import Hero from "@/components/Hero-section";
import StatsSection from "@/components/Square";
import Mobile from "@/components/Mobile";
import Price from "@/components/Plan";
import Testimonials from "@/components/Testimonial";
import ContactForm from "@/components/ContactForm";
import Fund from "@/components/Fundraize";
import GovernmentSchemes from "@/components/GovernmentSchemes";
import Tieup from "@/components/TieUp";
import EmiCalculator from "@/components/EmiCalculator";
import TrustedPartners from "@/components/Partner";
export default function Home() {
  return (
    <div className="mt-10">
      <NavigationHeader />
      <Hero />
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
      <ContactForm />
      <Footer />
    </div>
  );
}
