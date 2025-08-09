import CompanyRegistrationLanding from '@/components/CompanyRegistration'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import NavigationHeader from '@/components/Navbar'
import React from 'react'

function companyRegistration() {
  return (
    <>
    <NavigationHeader />
      <CompanyRegistrationLanding />
        <ContactForm />
        <Footer />
    </>
  )
}

export default companyRegistration