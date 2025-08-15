import React from 'react'
import NavigationHeader from '@/components/Navbar'
import DigitalMarketingLanding from '@/components/DigitalMarketing'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'


function digitalMarketingPage() {
  return (
   <>
   <NavigationHeader />
   <DigitalMarketingLanding />
   <ContactForm />
   <Footer />
   </>
  )
}

export default digitalMarketingPage