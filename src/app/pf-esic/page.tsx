import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import NavigationHeader from '@/components/Navbar'
import PFESICRegistrationLanding from '@/components/Pf'
import React from 'react'

function pfPage() {
  return (
    <>
      <NavigationHeader />
      <PFESICRegistrationLanding />
      <ContactForm />
      <Footer />
    </>
  )
}

export default pfPage