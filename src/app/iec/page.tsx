import ContactForm from '@/components/ContactForm'
import IECRegistrationLanding from '@/components/Iec'
import NavigationHeader from '@/components/Navbar'
import React from 'react'
import Footer from '@/components/Footer'

function iecPage() {
  return (
    <div>
    <NavigationHeader />
      <IECRegistrationLanding />
        <ContactForm />
        <Footer />
    </div>
  )
}

export default iecPage