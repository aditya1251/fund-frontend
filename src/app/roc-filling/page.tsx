import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import NavigationHeader from "@/components/Navbar";
import ROCFilingLanding from "@/components/Roc";
import React from "react";

function rocPage() {
  return (
    <>
      <NavigationHeader />
      <ROCFilingLanding />
      <ContactForm />
      <Footer />
    </>
  );
}

export default rocPage;
