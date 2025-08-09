import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import HealthInsuranceLanding from "@/components/HealthInsurance";
import NavigationHeader from "@/components/Navbar";
import React from "react";

function healthInsurancePage() {
  return (
    <div>
      <NavigationHeader />
      <HealthInsuranceLanding />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default healthInsurancePage;
