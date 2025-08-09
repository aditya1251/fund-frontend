import HomeLoanLanding from '@/components/HomeLoan'
import NavigationHeader from '@/components/Navbar'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import React from 'react'

function homeLoan() {
  return (
    <>
      <NavigationHeader />
      <HomeLoanLanding />
      <ContactForm />
      <Footer />
    </>
  )
}

export default homeLoan