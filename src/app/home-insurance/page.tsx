import HomeInsuranceLanding from '@/components/HomeInsurance'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import NavigationHeader from '@/components/Navbar'
import React from 'react'

function homeLoan() {
  return (
    <>
   <NavigationHeader />
   <HomeInsuranceLanding />
    <ContactForm />
    <Footer />
    </>
  )
}

export default homeLoan