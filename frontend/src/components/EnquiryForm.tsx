'use client';

import React, { useState, useRef, FormEvent } from 'react';
import {
  Send, User, Mail, MapPin, MessageSquare, Building2
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const service_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const template_ID = process.env.NEXT_PUBLIC_EMAILJS_ENQ_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const stromxToken = process.env.NEXT_PUBLIC_STROMX_TOKEN;
const adminPhones = process.env.NEXT_PUBLIC_ADMIN_PHONES?.split(',').map(p => p.trim());

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const gmailTypos = [
  'gamil.com', 'gnail.com', 'gmial.com', 'gmaill.com', 'gmail.con',
  'gmail.co', 'gmail.om', 'gmail.cim', 'gmail.cm', 'gmai.com',
  'gmail.comm', 'gmal.com', 'gmaul.com', 'gmail.xom', 'gmail.vom',
  'g.mail.com', 'gmaik.com', 'gmaio.com', 'gmali.com', 'gmali.con',
  'gmail.clm', 'gmail.coom', 'gmaiil.com', 'ggmail.com', 'gemail.com',
  'gmmail.com', 'gmiall.com', 'gmsil.com', 'gmale.com', 'gmall.com',
  'gmil.com', 'gmailc.om', 'gmailc.com', 'gmailm.com', 'gmali.cm',
  'gmalil.com', 'gmial.cm', 'gmaol.com', 'gmauk.com', 'gmaul.co',
  'gmail.ckm', 'gmail.kom', 'gmail.bom', 'gmail.dcom', 'gmaul.con', 'mail.com'
];

export default function EnquiryForm() {
  const form = useRef<HTMLFormElement | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phone, setPhone] = useState<string | undefined>();
  const [phoneError, setPhoneError] = useState('');
  const [loading, setLoading] = useState(false);

  
    const validateEmail = (email: string): string => {
    if (!emailPattern.test(email)) {
      return 'Please enter a valid email address.';
    }

    const domain = email.split('@')[1]?.toLowerCase();
    if (gmailTypos.includes(domain)) {
      return 'Did you mean "gmail.com"?';
    }
 return ''
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const sendWhatsAppNotification = async (formData: {
    name: string;
    company: string;
    email: string;
    number: string;
    location: string;
    queries: string;
    product: string;
  }) => {
    if (!stromxToken || !adminPhones?.length) return;
    const messagePayload = {
      type: 'template',
      template: {
        name: 'enquiry_ace_project',
        language: { policy: 'deterministic', code: 'en' },
        components: [{
          type: 'body',
          parameters: [
            { type: 'text', text: formData.name },
            { type: 'text', text: formData.company },
            { type: 'text', text: formData.email },
            { type: 'text', text: formData.number },
            { type: 'text', text: formData.location },
            { type: 'text', text: formData.queries }
          ]
        }]
      }
    };

    for (const phone of adminPhones) {
      try {
        const res = await fetch(
          `https://api.stromx.io/v1/message/send-message?token=${stromxToken}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...messagePayload, to: phone })
          }
        );
        const data = await res.json();
        if (!res.ok) console.error(`WhatsApp failed:`, data);
      } catch (error) {
        console.error('WhatsApp error:', error);
      }
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;

    const emailValidation = validateEmail(email);
    if (emailValidation) {
      setEmailError(emailValidation);
      alert('Please Enter a valid Email address.');
      return;
    }

    if (!phone || !isValidPhoneNumber(phone)) {
      setPhoneError('Please enter a valid phone number.');
      alert('Please enter a valid phone number.');
      return;
    }

    const elements = form.current.elements as typeof form.current.elements & {
      name: HTMLInputElement;
      company: HTMLInputElement;
      email: HTMLInputElement;
      location: HTMLInputElement;
      product: HTMLInputElement;
      queries: HTMLTextAreaElement;
    };

    const formData = {
      name: elements.name.value,
      company: elements.company.value,
      email: email,
      number: phone,
      location: elements.location.value,
      product: elements.product.value,
      queries: elements.queries.value
    };

    setLoading(true);
    try {
      await Promise.all([
        emailjs.send(service_ID!, template_ID!, formData, publicKey),
        sendWhatsAppNotification(formData)
      ]);
      alert('Your message has been sent successfully!');
      form.current.reset();
      setPhone(undefined);
      setEmail('');
      setEmailError('');  
      setPhoneError(''); 
    } catch (err) {
      console.error('Submission error:', err);
      alert('Something went wrong. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-4 relative z-20">
      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-lg bg-white/10 border border-gray-600 rounded-3xl">
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold text-white mb-2 bg-blue-600 rounded-t-3xl p-4">
              Book A <span>Demo</span>
            </h2>
          </div>
          <div className="p-6">
            <form ref={form} onSubmit={handleSubmit} className="space-y-4">
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
                <div className="absolute left-0 pl-4 top-4 pointer-events-none">
                  <User className="w-5 h-5 text-black" />
                </div>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
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
                  placeholder="Company Name"
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
                  onChange={handleEmailChange}
                  placeholder="Email Address"
                  required
                  className={`w-full pl-12 pr-4 py-4 bg-white/10 border ${
                    emailError ? 'border-red-600' : 'border-gray-600'
                  } rounded text-black placeholder-black`}
                />
              </div>
              {emailError && <p className="text-red-500 text-sm ml-1">{emailError}</p>}

              <PhoneInput
                international
                defaultCountry="IN"
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
                  placeholder="Your Query"
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
