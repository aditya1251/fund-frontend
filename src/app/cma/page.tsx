import CMAProjectReportLanding from '@/components/Cma'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import NavigationHeader from '@/components/Navbar'
import React from 'react'

function cmaPage() {
  return (
    <>
    <NavigationHeader />
      <CMAProjectReportLanding />
        <ContactForm />
        <Footer />
    </>
  )
}

export default cmaPage