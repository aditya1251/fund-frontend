import CompanyAuditLanding from '@/components/CompanyAudit'
import ContactForm from '@/components/ContactForm'
import Footer from '@/components/Footer'
import NavigationHeader from '@/components/Navbar'
import React from 'react'

function comapanyAuditPage() {
  return (
    <>
    <NavigationHeader />
    <CompanyAuditLanding />
    <ContactForm />
    <Footer />
    </>
  )
}

export default comapanyAuditPage