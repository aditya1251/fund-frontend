import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import LifeInsuranceLanding from '@/components/LifeInsurance'
import NavigationHeader from '@/components/Navbar'
import React from 'react'

function lifeInsurance() {
  return (
    <>
    <NavigationHeader />
      <LifeInsuranceLanding />
      <ContactForm />
      <Footer />
    </>
  )
}

export default lifeInsurance