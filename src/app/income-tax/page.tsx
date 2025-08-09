import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import ITRServicesLanding from '@/components/Itr'
import NavigationHeader from '@/components/Navbar'
import React from 'react'

function ITR() {
  return (
    <>
    <NavigationHeader />
    <ITRServicesLanding />
    <ContactForm />
    <Footer />
    </>
  )
}

export default ITR