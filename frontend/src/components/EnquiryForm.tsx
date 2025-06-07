'use client';

import React, { useState, useRef } from 'react';
import {
  Send, User, Mail, MapPin, MessageSquare, Building2
} from 'lucide-react';
import emailjs from '@emailjs/browser';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { sendWhatsappMessage } from "../services/whatsapp/whatsappService";


const service_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const template_ID = process.env.NEXT_PUBLIC_EMAILJS_ENQ_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

export default function EnquiryForm() {
  const form = useRef<HTMLFormElement | null>(null);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string>("");
  const [phone, setPhone] = useState<string | undefined>();
  const [phoneError, setPhoneError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);


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
    'gmail.ckm', 'gmail.kom', 'gmail.bom', 'gmail.dcom', 'gmaul.con',
    'mail.com', 'email.com', 'gmil.com', 'email.co'
  ];

  const validateEmail = (email: string): string => {
    if (!emailPattern.test(email)) {
      return 'Please enter a valid email address.';
    }

    const domain = email.split('@')[1]?.toLowerCase();
    if (gmailTypos.includes(domain)) {
      return 'Did you mean "gmail.com"?';
    }

    return '';
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value.trim();
    setEmail(emailInput);

    if (!emailPattern.test(emailInput)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    const domain = emailInput.split('@')[1]?.toLowerCase();

    if (gmailTypos.includes(domain)) {
      setEmailError('Did you mean "gmail.com"?');
      return;
    }

    setEmailError('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const formCurrent = form.current;
    if (!formCurrent) {
      console.error("Form reference is null.");
      return;
    }

    const emailValidationMessage = validateEmail(email);
    if (emailValidationMessage) {
      setEmailError(emailValidationMessage);
      return;
    } else {
      setEmailError("");
    }

    if (!phone || !isValidPhoneNumber(phone)) {
      setPhoneError("Please enter a valid phone number.");
      
      return;
    } else {
      setPhoneError("");
    }

    if (!formCurrent.checkValidity()) {

      return;
    }

   
    setLoading(true);

    const formData = {
      name: (formCurrent['Name'] as HTMLInputElement)?.value || '',
      company: (formCurrent['company'] as HTMLInputElement)?.value || '',
      email: email,
      number: phone,
      location: (formCurrent['location'] as HTMLInputElement)?.value || '',
      queries: (formCurrent['queries'] as HTMLTextAreaElement)?.value || '',
      product: (formCurrent['product'] as HTMLInputElement)?.value || '',
    };

    emailjs.send(service_ID!, template_ID!, formData, publicKey)
      .then(
        (response) => {
          console.log("Email sent successfully!", response);
          alert("Your message has been sent successfully!");
          formCurrent.reset();
          
          setEmail('');
          setPhone('');
        },
        (error) => {
          console.error("Email sending failed:", error);
          alert("There was an issue sending your message. Please try again later.");
        }
      )
      .finally(() => setLoading(false));

    const rawNumbers = process.env.NEXT_PUBLIC_ADMIN_PHONES;
    const phoneNumbers = rawNumbers?.split(',').map(num => num.trim()) ?? [];

    const phoneWithoutPlus = phone.replace(/^\+/, '');

    // Whatsapp message generation
    sendWhatsappMessage(
      "enquiry_ace_PPAP",
      {
        fullName: formData.name,
        companyName: formData.company,
        businessEmail: formData.email,
        mobileNumber: phoneWithoutPlus,
        location: formData.location,
        message: formData.queries,
      },
      phoneNumbers,
    ).then(() => {
      console.log("WhatsApp message sent successfully!");
    }).catch((error) => {
      console.error("Failed to send WhatsApp message:", error);
    });

    // Whatsapp greeting message
    if (!phoneWithoutPlus) {
      console.warn("Mobile number is required for WhatsApp greeting message.");
    } else {
      sendWhatsappMessage(
        "customer_greetings",
        {
          fullName: formData.name,
          product: formData.product,
          siteUrl: 'https://acesoft.in',
          imageUrl: 'https://res.cloudinary.com/dohyevc59/image/upload/v1749124753/Enquiry_Greetings_royzcm.jpg',
        },
        [phoneWithoutPlus]
      ).then(() => {
        console.log("WhatsApp greeting message sent successfully!");
      }).catch((error) => {
        console.error("Failed to send WhatsApp greeting message:", error);
      });
    };
  };


  return (
    <div className="flex items-center justify-center p-4 relative z-20">
      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-lg bg-white/10 border border-gray-600 rounded-3xl">
          <div className="text-center mb-2">
            <h2 className="text-2xl font-bold text-white mb-2 bg-[#155E95] rounded-t-3xl p-4">
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
                  name="Name"
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
