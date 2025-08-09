import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import GSTServicesLanding from '@/components/Gst'
import NavigationHeader from '@/components/Navbar'
import React from 'react'

function gstPage() {
  return (
    <>
    <NavigationHeader />
    <GSTServicesLanding />
    <ContactForm />
    <Footer />
    </>
  )
}

export default gstPage