import React from 'react'
import NavigationHeader from "@/components/Navbar";
import PersonalLoanLanding from "@/components/PersonalLoan";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

function personalLoan() {
  return (
    <>
      <NavigationHeader />
      <PersonalLoanLanding />
      <ContactForm />
      <Footer />
    </>
  )
}

export default personalLoan