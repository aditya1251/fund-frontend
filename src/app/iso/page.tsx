import NavigationHeader from "@/components/Navbar";
import React from "react";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import ISORegistrationLanding from "@/components/Iso";

function isoPage() {
  return (
    <>
      <NavigationHeader />
      <ISORegistrationLanding />
      <ContactForm />
      <Footer />
    </>
  );
}

export default isoPage;
