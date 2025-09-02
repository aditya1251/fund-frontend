"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Loader2,
  ArrowRight,
  MessageCircle,
  Users,
  Award,
} from "lucide-react";
import { useAddApplicationMutation } from "@/redux/services/applicationApi";
import { applicationSchema, Application } from "@/lib/validation/applicationSchema";
import Link from "next/link";

const ContactPage = () => {
  const [addApplication, { isLoading }] = useAddApplicationMutation();
  
  // Form state
  const [formData, setFormData] = useState<Application>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Form validation state
  const [errors, setErrors] = useState<Partial<Record<keyof Application, string>>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [snackbar, setSnackbar] = useState<{ 
    open: boolean; 
    message: string; 
    severity: "success" | "error" 
  }>({ 
    open: false, 
    message: "", 
    severity: "success" 
  });

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear error when field is being edited
    if (errors[id as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [id]: null,
      }));
    }
  };

  // Validate form using Zod
  const validateForm = () => {
    try {
      applicationSchema.parse(formData);
      setErrors({});
      return true;
    } catch (err: any) {
      if (err.errors) {
        const zodErrors: Partial<Record<keyof Application, string>> = {};
        err.errors.forEach((e: any) => {
          if (e.path && e.path[0]) {
            zodErrors[e.path[0] as keyof Application] = e.message;
          }
        });
        setErrors(zodErrors);
      }
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      await addApplication(formData).unwrap();
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setSubmitSuccess(true);
      setSnackbar({ 
        open: true, 
        message: "Message sent successfully! We'll get back to you soon.", 
        severity: "success" 
      });
    } catch (error: any) {
      setErrors({
        ...errors,
        message: error?.response?.data?.message || "Failed to submit. Try again later.",
      });
      setSnackbar({ 
        open: true, 
        message: error?.response?.data?.message || "Failed to submit. Try again later.", 
        severity: "error" 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Get In <span className="text-[#FFD439]">Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Ready to transform your financial future? Our team of experts is here to help you 
            navigate your funding journey with personalized solutions.
          </p>
        </div>
      </div>

      {/* Contact Methods */}
      <div className="bg-white py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center p-8 bg-yellow-50 rounded-2xl border-2 border-black shadow-[6px_6px_0_0_#000] transition-all duration-300">
              <div className="bg-[#FFD439] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Phone className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-neutral-900">Call Us</h3>
              <p className="text-gray-600 mb-1">Monday - Friday</p>
              <p className="text-gray-700 font-medium mb-3">9:00 AM - 6:00 PM</p>
              <a href="tel:+917098662830" className="text-yellow-600 font-semibold hover:underline">
                +91 7098 66230
              </a>
            </div>

            <div className="text-center p-8 bg-yellow-50 rounded-2xl border-2 border-black shadow-[6px_6px_0_0_#000] transition-all duration-300">
              <div className="bg-[#FFD439] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Mail className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-neutral-900">Email Us</h3>
              <p className="text-gray-600 mb-3">We'll respond within 24hrs</p>
              <a href="mailto:info@Navi Mudra.com" className="text-yellow-600 font-semibold hover:underline">
                info@Navi Mudra.com
              </a>
            </div>

            <div className="text-center p-8 bg-yellow-50 rounded-2xl border-2 border-black shadow-[6px_6px_0_0_#000] transition-all duration-300">
              <div className="bg-[#FFD439] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <MapPin className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-neutral-900">Visit Us</h3>
              <p className="text-gray-600 mb-3">Our headquarters</p>
              <p className="text-gray-700 font-medium">
                Harital village, Uttam Nagar, New Delhi
              </p>
            </div>

            <div className="text-center p-8 bg-yellow-50 rounded-2xl border-2 border-black shadow-[6px_6px_0_0_#000] transition-all duration-300">
              <div className="bg-[#FFD439] p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="w-8 h-8 text-black" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-neutral-900">Business Hours</h3>
              <p className="text-gray-600 mb-1">Monday - Friday</p>
              <p className="text-gray-700 font-medium">9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Contact Form Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Contact Form */}
            <div className="bg-yellow-50 rounded-3xl border-4 border-black shadow-[8px_8px_0_0_#000] p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Send Us a <span className="text-[#FFD439]">Message</span>
                </h2>
                <p className="text-gray-600">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              {submitSuccess ? (
                <div className="text-center py-12">
                  <div className="bg-green-100 p-4 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-4">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting us. We'll get back to you within 24 hours.
                  </p>
                  <Button
                    onClick={() => setSubmitSuccess(false)}
                    className="bg-[#FFD439] hover:bg-yellow-500 text-black font-semibold shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] transition-all"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="font-semibold text-gray-800">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        placeholder="Your full name"
                        className={`border border-gray-300 bg-transparent px-2 py-1 rounded flex-1 text-sm hover:ring-1 ring-black focus:outline-none focus:ring-black focus:ring-2 ${
                          errors.name ? "border-red-500" : ""
                        }`}
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                      {errors.name && (
                        <p className="text-sm text-red-500">{errors.name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="font-semibold text-gray-800">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your.email@example.com"
                        className={`border border-gray-300 bg-transparent px-2 py-1 rounded flex-1 text-sm hover:ring-1 ring-black focus:outline-none focus:ring-black focus:ring-2 ${
                          errors.email ? "border-red-500" : ""
                        }`}
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isLoading}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-semibold text-gray-800">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      placeholder="+91 XXXXX XXXXX"
                      className={`border border-gray-300 bg-transparent px-2 py-1 rounded flex-1 text-sm hover:ring-1 ring-black focus:outline-none focus:ring-black focus:ring-2 ${
                        errors.phone ? "border-red-500" : ""
                      }`}
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="font-semibold text-gray-800">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your project, funding requirements, or any questions you have..."
                      rows={5}
                      className={`border border-gray-300 bg-transparent px-2 py-1 rounded flex-1 text-black hover:ring-1 ring-black focus:outline-none focus:ring-black focus:ring-2 resize-none ${
                        errors.message ? "border-red-500" : ""
                      }`}
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500">{errors.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#FFD439] hover:bg-yellow-500 text-black font-bold py-4 text-lg shadow-[4px_4px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] transition-all flex items-center justify-center gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>

            {/* Right Side - Why Choose Us & Additional Info */}
            <div className="space-y-8">
              {/* Why Choose Us */}
              <div className="bg-yellow-50 rounded-3xl border-4 border-black shadow-[8px_8px_0_0_#000] p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Why Choose <span className="text-[#FFD439]">Navi Mudra</span>?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-[#FFD439] p-2 rounded-full flex-shrink-0">
                      <Users className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Expert Team</h4>
                      <p className="text-gray-600 text-sm">
                        Our experienced professionals provide personalized financial solutions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-[#FFD439] p-2 rounded-full flex-shrink-0">
                      <Award className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Proven Track Record</h4>
                      <p className="text-gray-600 text-sm">
                        Successfully funded thousands of projects across various sectors.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-[#FFD439] p-2 rounded-full flex-shrink-0">
                      <MessageCircle className="w-5 h-5 text-black" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">24/7 Support</h4>
                      <p className="text-gray-600 text-sm">
                        Round-the-clock assistance for all your funding needs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-yellow-50 rounded-3xl border-4 border-black shadow-[8px_8px_0_0_#000] p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Quick <span className="text-[#FFD439]">Actions</span>
                </h3>
                <div className="space-y-4">
                  <Link href="/login" className="flex items-center justify-between p-4 rounded-xl hover:bg-yellow-500 bg-[#FFD439] text-black transition-colors group">
                    <span className="font-semibold">Apply for Funding</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link href="/about" className="flex items-center justify-between p-4 rounded-xl hover:bg-yellow-500 bg-[#FFD439] text-black transition-colors group">
                    <span className="font-semibold">Learn About Us</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-yellow-500 text-black transition-colors group">
                    <span className="font-semibold">Follow Us</span>
                    <div className="flex gap-3">
                      <Facebook className="w-5 h-5 text-black cursor-pointer transition-all hover:scale-125" />
                      <Instagram className="w-5 h-5 text-black cursor-pointer transition-all hover:scale-125" />
                      <Linkedin className="w-5 h-5 text-black cursor-pointer transition-all hover:scale-125" />
                      <Twitter className="w-5 h-5 text-black cursor-pointer transition-all hover:scale-125" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-[#FFD439]">Questions</span>
            </h2>
            <p className="text-gray-600">
              Quick answers to common questions about our services.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-500">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">How quickly can I get funding?</h3>
              <p className="text-gray-600">
                Depending on your application and documentation, funding can be approved within 2-7 business days.
              </p>
            </div>
            
            <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-500">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">What types of loans do you offer?</h3>
              <p className="text-gray-600">
                We offer personal loans, business loans, home loans, vehicle loans, and specialized funding solutions.
              </p>
            </div>
            
            <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-500">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">What documents do I need?</h3>
              <p className="text-gray-600">
                Basic requirements include ID proof, address proof, income documents, and bank statements.
              </p>
            </div>
            
            <div className="bg-yellow-50 rounded-2xl p-6 border-2 border-yellow-500">
              <h3 className="font-bold text-lg mb-3 text-neutral-800">Is my information secure?</h3>
              <p className="text-gray-600">
                Yes, we use bank-level encryption and follow strict data privacy protocols to protect your information.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Snackbar */}
      {snackbar.open && (
        <div
          className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-xl shadow-xl text-white font-semibold transition-all duration-300 cursor-pointer ${
            snackbar.severity === "success" ? "bg-green-600" : "bg-red-600"
          }`}
          onClick={() => setSnackbar({ ...snackbar, open: false })}
          style={{ minWidth: 300, textAlign: "center" }}
        >
          {snackbar.message}
        </div>
      )}
    </div>
  );
};

export default ContactPage;
