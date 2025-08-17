import React from 'react'
import NavigationHeader from '@/components/Navbar'
import WhatsAppCampaignLanding from '@/components/WhatsApp'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'



function whatsappPage() {
  return (
  <>
  <NavigationHeader />
    <WhatsAppCampaignLanding />
    <ContactForm />
    <Footer />
  
  
  </>
  )
}

export default whatsappPage