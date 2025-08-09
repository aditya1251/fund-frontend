import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import NavigationHeader from "@/components/Navbar";
import TDSReturnFilingLanding from "@/components/Tds";
import React from "react";

function tds() {
  return (
    <div>
      <NavigationHeader />
      <TDSReturnFilingLanding />
      <ContactForm />
      <Footer />
    </div>
  );
}

export default tds;
