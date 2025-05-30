'use client';

import React, { useState, useRef, ChangeEvent, FormEvent } from 'react';
import emailjs from '@emailjs/browser';
import {
  Send,
  User,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Building2
} from 'lucide-react';


const service_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const template_ID = process.env.NEXT_PUBLIC_EMAILJS_ENQ_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

interface FormData {
  name: string;
  company: string;
  email: string;
  number: string;
  location: string;
  queries: string;
}

export default function EnquiryForm() {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    setIsSubmitted(true);

    emailjs
      .sendForm(
        service_ID! ,
        template_ID!,
        formRef.current!,
        publicKey
      )
      .then(() => {
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
      })
      .catch(error => {
        console.error('EmailJS Error:', error);
        alert('An error occurred while sending your message. Please try again later.');
        setIsSubmitted(false);
      });
  };

  return (
    <div className="flex items-center justify-center md:p-4 relative z-20">
      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-lg bg-white/10 border border-gray-600 rounded md:rounded-3xl ">
          <div className="text-center mb-2">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-2 bg-[#155E95]  md:rounded-t-3xl p-4">
              Book A<span> Demo</span>
            </h2>
          </div>
     <div className='p-2 md:p-6'>
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
                className="w-full pl-12 pr-4 py-2 md:py-4 bg-white/10 border border-gray-600 rounded text-black placeholder-black"
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
                className="w-full pl-12 pr-4 py-2 md:py-4 bg-white/10 border border-gray-600 rounded text-black placeholder-black"
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
                className={`w-full pl-12 pr-4 py-2 md:py-4 bg-white/10 border ${
                  emailError ? 'border-gray-800' : 'border-gray-600'
                } rounded text-black placeholder-black`}
              />
            </div>
              {emailError && <p className="text-red-500 text-sm  ml-1">{emailError}</p>}


          
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
                className="w-full pl-12 pr-4 py-2 md:py-4 bg-white/10 border border-gray-600 rounded text-black placeholder-black"
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
                className="w-full pl-12 pr-4 py-2 md:py-4 bg-white/10 border border-gray-600 rounded text-black placeholder-black"
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
                className="w-full pl-12 pr-4 py-2 md:py-4 bg-white/10 border border-gray-600 rounded text-black placeholder-black resize-none"
              />
            </div>

           
            <button
              type="submit"
              disabled={isSubmitted}
              className="w-full bg-[#155E95] text-white font-semibold py-2 md:py-4 px-6 rounded hover:bg-green-600 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
