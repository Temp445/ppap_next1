'use client';

import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import {
  Send,
  User,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Building2
} from 'lucide-react';
import emailjs from '@emailjs/browser';

const stromxToken = process.env.NEXT_PUBLIC_STROMX_TOKEN;
const adminPhone = process.env.NEXT_PUBLIC_ADMIN_PHONE;

const emailServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const emailTemplateId = process.env.NEXT_PUBLIC_EMAILJS_ENQ_TEMPLATE_ID!;
const emailPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

interface FormData {
  name: string;
  company: string;
  email: string;
  number: string;
  location: string;
  queries: string;
}

export default function WhatsApp() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    number: '',
    location: '',
    queries: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [emailError, setEmailError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'email') {
      setEmailError(validateEmail(value) ? '' : 'Please enter a valid email address.');
    }
  };

  const sendWhatsAppNotification = async () => {
    if (!stromxToken || !adminPhone) {
      console.warn("Missing Stromx token or admin phone number.");
      return;
    }

    const messagePayload = {
      to: adminPhone,
      type: "template",
      template: {
        name: "enquiry_ace_cms",
        language: {
          policy: "deterministic",
          code: "en"
        },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: formData.name },
              { type: "text", text: formData.company },
              { type: "text", text: formData.email },
              { type: "text", text: formData.number },
              { type: "text", text: formData.location },
              { type: "text", text: formData.queries }
            ]
          }
        ]
      }
    };

    try {
      const response = await fetch(
        `https://api.stromx.io/v1/message/send-message?token=${stromxToken}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(messagePayload)
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("WhatsApp message sent successfully:", data);
      } else {
        console.error("Failed to send WhatsApp message:", data);
      }
    } catch (error) {
      console.error("WhatsApp API Error:", error);
    }
  };

  const sendEmail = async () => {
    try {
      const result = await emailjs.send(
        emailServiceId,
        emailTemplateId,
        {
          name: formData.name,
          company: formData.company,
          email: formData.email,
          number: formData.number,
          location: formData.location,
          queries: formData.queries,
          product: 'ACE PPAP'
        },
        emailPublicKey
      );

      console.log('Email sent successfully:', result.text);
    } catch (error) {
      console.error(' EmailJS error:', error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setIsSubmitted(true);

    await Promise.all([
      sendWhatsAppNotification(),
      sendEmail()
    ]);

    alert('Thank you! Your enquiry has been submitted successfully.');

    setFormData({
      name: '',
      company: '',
      email: '',
      number: '',
      location: '',
      queries: ''
    });
    setIsSubmitted(false);
  };

  return (
    <div className="flex items-center justify-center p-4 relative z-20">
      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-lg bg-white/10 border border-gray-600 rounded-3xl">
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold text-white mb-2 bg-blue-600 rounded-t-3xl p-4">
              Book A<span> Demo</span>
            </h2>
          </div>
          <div className="p-6">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-wrap gap-2 w-full ml-1">
                <label className="text-base font-medium">Product Interested:</label>
                <input
                  type="text"
                  name="product"
                  defaultValue="ACE PPAP"
                  readOnly
                  className="font-semibold"
                  aria-label="Product Interested"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="w-5 h-5 text-black" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-gray-600 rounded text-black placeholder-black"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Building2 className="w-5 h-5 text-black" />
                </div>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company Name"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-gray-600 rounded text-black placeholder-black"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="w-5 h-5 text-black" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  required
                  className={`w-full pl-12 pr-4 py-4 bg-white/10 border ${
                    emailError ? 'border-gray-800' : 'border-gray-600'
                  } rounded text-black placeholder-black`}
                />
              </div>
              {emailError && <p className="text-red-500 text-sm ml-1">{emailError}</p>}

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="w-5 h-5 text-black" />
                </div>
                <input
                  type="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-gray-600 rounded text-black placeholder-black"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <MapPin className="w-5 h-5 text-black" />
                </div>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-gray-600 rounded text-black placeholder-black"
                />
              </div>

              <div className="relative">
                <div className="absolute top-4 left-4 pointer-events-none">
                  <MessageSquare className="w-5 h-5 text-black" />
                </div>
                <textarea
                  name="queries"
                  value={formData.queries}
                  onChange={handleChange}
                  placeholder="Your Query"
                  rows={4}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-gray-600 rounded text-black placeholder-black resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitted}
                className="w-full bg-blue-500 text-white font-semibold py-4 px-6 rounded hover:bg-green-600 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitted ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Enquiry
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
