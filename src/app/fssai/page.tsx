import React from 'react'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import FSSAIRegistrationLanding from '@/components/Fssai'
import NavigationHeader from '@/components/Navbar'
function fssaiPage() {
  return (
    <>
      <NavigationHeader />
      <FSSAIRegistrationLanding />
      <ContactForm />
      <Footer />
    </>
  )
}

export default fssaiPage