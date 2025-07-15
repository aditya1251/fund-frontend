"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Loader2,
} from "lucide-react";
import axios from "axios";

export default function ContactForm() {
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // Form validation state
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  }>({});

  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  // Validate form
  const validateForm = () => {
    const newErrors: {
      name?: string;
      email?: string;
      phone?: string;
      message?: string;
    } = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10,}$/i.test(formData.phone.replace(/[\s-()]/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send form data to backend
      await axios.post("http://localhost:5000/api/users/application", formData);
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error: any) {
      setErrors({
        ...errors,
        message: error?.response?.data?.message || "Failed to submit. Try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-4 py-10 md:py-0 mt-6 mb-6">
      <div className="w-full max-w-7xl">
        <div className="bg-[#FFF0C3] rounded-3xl md:rounded-[55px] border-[3px] border-[#F7C430] p-6 md:p-10 lg:p-20 flex flex-col md:flex-row gap-8 md:gap-10 lg:gap-14 items-center justify-around md:h-[620px]">
          {/* Left side - Contact Information */}
          <div className="space-y-4 md:space-y-6 flex flex-col justify-center">
            <div>
              <h1 className="text-3xl md:text-5xl lg:text-7xl font-semibold leading-tight">
                We Are <span className="text-[#F7C430]">Here</span> To
                <br className="hidden md:block" />
                Assist <span className="text-[#F7C430]">You</span>.
              </h1>
            </div>
            <p className="text-base md:text-xl mt-2 md:mt-5">
              Ready to transform your space? Contact us for a free consultation
              <br className="hidden md:block" />
              and quote.
            </p>
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center gap-2 md:gap-4 text-sm md:text-base">
                <Phone className="w-5 h-5 md:w-6 md:h-6" />
                <span>+91 7098 66230</span>
              </div>
              <div className="flex items-center gap-2 md:gap-4 text-sm md:text-base">
                <Mail className="w-5 h-5 md:w-6 md:h-6" />
                <span>info@fundsraize.com</span>
              </div>
              <div className="flex items-center gap-2 md:gap-4 text-sm md:text-base">
                <MapPin className="w-5 h-5 md:w-6 md:h-6" />
                <span>Harital village, Uttam Nagar, New Delhi</span>
              </div>
            </div>
            <div className="flex gap-4 mt-4 md:mt-6">
              <div className="hover:text-[#F7C430] cursor-pointer transition-colors">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="hover:text-[#F7C430] cursor-pointer transition-colors">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="hover:text-[#F7C430] cursor-pointer transition-colors">
                <Linkedin className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg border-2 border-[#F7C430] p-5 flex flex-col justify-center w-full md:w-auto">
            {submitSuccess ? (
              <div className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-green-800 mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-gray-600">
                  Thank you for contacting us. We'll get back to you soon.
                </p>
                <Button
                  onClick={() => setSubmitSuccess(false)}
                  className="mt-4 bg-[#F7C430] hover:bg-[#E76F51]"
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label htmlFor="name" className="font-medium text-sm">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Your name"
                      className={`bg-black/10 ${
                        errors.name ? "border-red-500" : ""
                      }`}
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email" className="font-medium text-sm">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Your email"
                      className={`bg-black/10 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="phone" className="font-medium text-sm">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    placeholder="Your phone number"
                    className={`bg-black/10 ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>
                <div className="space-y-1">
                  <Label htmlFor="message" className="font-medium text-sm">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your project"
                    rows={3}
                    className={`bg-black/10 resize-none ${
                      errors.message ? "border-red-500" : ""
                    }`}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[#F7C430] hover:bg-[#E76F51] text-white font-semibold py-4 rounded-lg transition-colors text-lg flex items-center justify-center cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    "Get Your Home Threater Setup"
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
