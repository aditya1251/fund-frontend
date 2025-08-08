import React from 'react'
import NavigationHeader from "@/components/Navbar";
import BusinessLoanLanding from "@/components/BusinessLoan";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

function BusinessLoan() {
  return (
    <>
      <NavigationHeader />
      <BusinessLoanLanding />
      <ContactForm />
      <Footer />
    </>
  )
}

export default BusinessLoan