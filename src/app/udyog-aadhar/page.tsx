import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import NavigationHeader from '@/components/Navbar'
import UdyogRegistrationLanding from '@/components/Udyog'
import React from 'react'

function udyogPage() {
  return (
    <>
    <NavigationHeader />
        <UdyogRegistrationLanding />
        <ContactForm />
        <Footer />
    
    </>
  )
}

export default udyogPage