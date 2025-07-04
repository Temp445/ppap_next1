'use client';

import React, { useState, useRef, FormEvent } from 'react';
import {
  Send, User, Mail, MapPin, MessageSquare, Building2
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { sendWhatsappMessage } from "../services/whatsapp/whatsappService";
import { useTranslations } from 'next-intl';
import { CountryCode } from 'libphonenumber-js';

const service_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const template_ID = process.env.NEXT_PUBLIC_EMAILJS_ENQ_TEMPLATE_ID!;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const adminPhones = process.env.NEXT_PUBLIC_ADMIN_PHONES?.split(',').map((p) => p.trim()) || [];


export default function EnquiryForm() {
  const t = useTranslations('Contact');
    const countryCode = t('code') as CountryCode || 'IN';


  const form = useRef<HTMLFormElement | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string>("");
  const [phone, setPhone] = useState<string | undefined>();
  const [phoneError, setPhoneError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);


   const validateEmail = async (email: string): Promise<string> => {
    try {
      const response = await fetch('/api/proxy-validate-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) return 'Please enter a valid email address.';

      const result = await response.json();
      return result.isValid ? '' : 'Please enter a valid email address.';
    } catch (err) {
      console.error('Email validation error:', err);
      return 'Email validation service unavailable.';
    }
  };


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const formCurrent = form.current;
    if (!formCurrent) return;

    const emailValidationMessage = await validateEmail(email);
    if (emailValidationMessage) {
      setEmailError(emailValidationMessage);
      return;
    } else {
      setEmailError('');
    }

    if (!phone || !isValidPhoneNumber(phone)) {
      setPhoneError('Please enter a valid phone number.');
      return;
    } else {
      setPhoneError('');
    }

    const formData = {
      Full_Name: (formCurrent['Name'] as HTMLInputElement)?.value || '',
      Company_Name: formCurrent['company']?.value || '',
      Business_Email: email,
      Mobile_Number: phone,
      Location: formCurrent['location']?.value || '',
      Message: formCurrent['queries']?.value || '',
      Product_Interested: formCurrent['product']?.value || '',
    };

    setLoading(true);

    try {
      await emailjs.send(service_ID, template_ID, formData, publicKey);
      alert('Your message has been sent successfully!');
      formCurrent.reset();
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Email sending failed:', error);
      alert('There was an issue sending your message. Please try again later.');
    } finally {
      setLoading(false);
    }

    const phoneWithoutPlus = phone.replace(/^\+/, '');
 
    try {
      await sendWhatsappMessage(
        'enquiry_ace_ppap',
        {
          fullName: formData.Full_Name,
          companyName: formData.Company_Name,
          businessEmail: formData.Business_Email,
          mobileNumber: phoneWithoutPlus,
          location: formData.Location,
          message: formData.Message,
        },
        adminPhones,
      );

      await sendWhatsappMessage(
        'customer_greetings',
        {
          fullName: formData.Full_Name,
          product: formData.Product_Interested,
          siteUrl: 'https://acesoft.in',
          imageUrl:
            'https://res.cloudinary.com/dohyevc59/image/upload/v1749124753/Enquiry_Greetings_royzcm.jpg',
        },
        [phoneWithoutPlus],
      );
    } catch (error) {
      console.error('WhatsApp sending error:', error);
    }
  };


  return (
    <div className="flex items-center justify-center p-4 relative z-20">
      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-lg bg-white/10 border border-gray-600 rounded-3xl">
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold text-white mb-2 bg-[#155E95] rounded-t-3xl p-4">
              {t('BookDemo')}
            </h2>
          </div>
          <div className="p-6">
            <form ref={form} onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-wrap gap-2 w-full ml-1">
                <label className="text-base font-medium">{t('Form.Product')}:</label>
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
                <div className="absolute left-0 pl-4 top-4 pointer-events-none">
                  <User className="w-5 h-5 text-black" />
                </div>
                <input
                  type="text"
                  name="Name"
                  placeholder={`${t('Form.Name')}`}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-gray-600 rounded text-black placeholder-black"
                />
              </div>

              <div className="relative">
                <div className="absolute left-0 pl-4 top-4 pointer-events-none">
                  <Building2 className="w-5 h-5 text-black" />
                </div>
                <input
                  type="text"
                  name="company"
                  placeholder={`${t('Form.Company')}`}
                  required
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-gray-600 rounded text-black placeholder-black"
                />
              </div>

              <div className="relative">
                <div className="absolute left-0 pl-4 top-4 pointer-events-none">
                  <Mail className="w-5 h-5 text-black" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value.trim())}
                  placeholder={`${t('Form.Email')}`}
                  required
                  className={`w-full pl-12 pr-4 py-4 bg-white/10 border ${
                    emailError ? 'border-red-600' : 'border-gray-600'
                  } rounded text-black placeholder-black`}
                />
              </div>
              {emailError && <p className="text-red-500 text-sm ml-1">{emailError}</p>}

              <PhoneInput
                international
                defaultCountry={countryCode}
                value={phone}
                onChange={setPhone}
                className="mt-1 p-2 rounded border border-gray-600 bg-white/10  [&>input]:outline-none [&>input]:bg-transparent"
              />
              {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}

              <div className="relative">
                <div className="absolute left-0 pl-4 top-4 pointer-events-none">
                  <MapPin className="w-5 h-5 text-black" />
                </div>
                <input
                  type="text"
                  name="location"
                  placeholder={`${t('Form.Location')}`}
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
                  placeholder={`${t('Form.Queries')}`}
                  rows={4}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-gray-600 rounded text-black placeholder-black resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-white font-semibold py-4 px-6 rounded hover:bg-green-600 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    {t('Form.Submitting') }
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    {t('Form.Submit') }
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
