"use client";

import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { SendHorizontal, Mails, PhoneCall, MapPinned } from "lucide-react";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import { sendWhatsappMessage } from "../services/whatsapp/whatsappService";

import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import 'react-phone-number-input/style.css';
import icon from "../assets/CF.jpg";
import { useTranslations } from "next-intl";

const service_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const template_ID = process.env.NEXT_PUBLIC_EMAILJS_ENQ_TEMPLATE_ID!;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const adminPhones = process.env.NEXT_PUBLIC_ADMIN_PHONES?.split(',').map((p) => p.trim()) || [];


const Contact: React.FC = () => {
 
  const t = useTranslations('Contact')

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

        if (!response.ok) return t('Form.EmailError');

      const result = await response.json();
      return result.isValid ? '' : t('Form.EmailError');
    } catch (err) {
      console.error('Email validation error:', err);
      return t('Messages.ValidationUnavailable');
    }
  };

  const handleEmailChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value.trim();
    setEmail(emailInput);
    const error = await validateEmail(emailInput);
    setEmailError(error);
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
      setPhoneError(t('Form.PhoneError'));
      return;
    } else {
      setPhoneError('');
    }

    const formData = {
      name: (formCurrent['Name'] as HTMLInputElement)?.value || '',
      company: formCurrent['company']?.value || '',
      email,
      number: phone,
      product: formCurrent['product']?.value || '',
      location: formCurrent['location']?.value || '',
      queries: formCurrent['queries']?.value || '',
    };

    setLoading(true);

    try {
      await emailjs.send(service_ID, template_ID, formData, publicKey);
      alert(t('Messages.Success'));
      formCurrent.reset();
      setEmail('');
      setPhone('');
    } catch (error) {
      console.error('Email sending failed:', error);
      alert(t('Messages.Failure'));
    } finally {
      setLoading(false);
    }

    const phoneWithoutPlus = phone.replace(/^\+/, '');
 
    try {
      await sendWhatsappMessage(
        'enquiry_ace_ppap',
        {
          fullName: formData.name,
          companyName: formData.company,
          businessEmail: formData.email,
          mobileNumber: phoneWithoutPlus,
          location: formData.location,
          message: formData.queries,
        },
        adminPhones,
      );

      await sendWhatsappMessage(
        'customer_greetings',
        {
          fullName: formData.name,
          product: formData.product,
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
    <div id="contact" className="mt-5 md:px-2">
      <div className="flex flex-col md:flex-row p-4 py-10 rounded-lg md:py-10 max-w-6xl mx-auto sm:mt-20 mb-20 justify-center">

        <div className="md:w-7/12 border p-5 md:p-10 rounded md:rounded-none md:border-[#155E95]">
          <h2 className="text-xl md:text-3xl font-semibold text-[#102E50] mb-6">
            {t('Title')} <strong className="text-orange-600">{t('highlight')}</strong>
          </h2>
          <form ref={form} onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="lg:text-lg font-medium">{t('Form.Name')} :</label>
                <input type="text" name="Name" required placeholder={`${t('Form.Name')} *`} className="text-sm md:text-[16px] border p-2 mt-1 rounded w-full" />
              </div>
              <div className="flex flex-col">
                <label className="lg:text-lg font-medium">{t('Form.Company')} :</label>
                <input type="text" name="company" required placeholder={`${t('Form.Company')} *`} className="text-sm md:text-[16px] border p-2 mt-1 rounded w-full" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="lg:text-lg font-medium">{t('Form.Email')} :</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  required
                  placeholder={`${t('Form.Email')} *`}
                  onChange={handleEmailChange}
                  className="text-sm md:text-[16px] border p-2 mt-1 rounded w-full"
                />
                {emailError && (
                  <p className="text-red-500 text-sm mt-1">{emailError}</p>
                )}
              </div>

              <div className="flex flex-col">
                <label className="lg:text-lg font-medium">{t('Form.Phone')} :</label>
                <PhoneInput
                  international
                  defaultCountry="IN"
                  value={phone}
                  onChange={setPhone}
                  required
                  className=" !shadow-none rounded !bg-transparent border mt-1 p-2 [&>input]:border-none [&>input]:outline-none [&>input]:bg-transparent"
                />
                {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="lg:text-lg font-medium">{t('Form.Location')} :</label>
              <input type="text" name="location" placeholder={`${t('Form.Location')} *`} required className="text-sm md:text-[16px] border p-2 mt-1 rounded w-full" />
            </div>

            <div className="flex gap-2">
              <label className="lg:text-lg font-medium flex flex-nowrap">{t('Form.Product')} :</label>
              <input type="text" name="product" defaultValue="ACE PPAP" readOnly className=" w-1/2 lg:text-lg font-semibold" />
            </div>

            <div className="flex flex-col">
              <label className="lg:text-lg font-medium">{t('Form.Queries')} :</label>
              <textarea name="queries" required placeholder={`${t('Form.Queries')} *`} className="text-sm md:text-[16px] border p-2 mt-1 rounded w-full h-24" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#155E95] text-white py-2 px-4 rounded hover:bg-green-500 flex items-center gap-2 md:text-lg"
            >
              {loading ? t('Form.Submitting') : t('Form.Submit')}
              <SendHorizontal className="w-4 h-4" />
            </button>
          </form>
        </div>

        <div className="mt-20 md:mt-0 md:w-5/12 bg-[#155E95] border border-e-[#155E95] border-y-[#155E95] border-l-[#155E95] md:border-l-0 text-white rounded md:rounded-r-sm md:rounded-l-none">
          <div className="h-48 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-50 bg-opacity-20 flex flex-col items-center justify-center">
              <Image fill src={icon} alt="bg" className="object-cover object-center opacity-50" />
              <div className="z-40 text-center">
                <h1 className="text-black font-bold">ACE PPAP</h1>
                <h3 className="text-2xl font-bold text-black">{t('ContactInfo.Title')}</h3>
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-8 space-y-8 md:mt-3">
            <div className="flex items-start space-x-4">
              <div className="bg-red-400 rounded-full p-3">
                <Mails className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">{t('ContactInfo.EmailUs')}</h4>
                <p className="mt-1 text-sm">sales@acesoft.in</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-500 rounded-full p-3">
                <PhoneCall className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">{t('ContactInfo.CallUs')}</h4>
                <p className="mt-1 text-sm">+91 9840137210</p>
                <p className="opacity-90 text-sm">{t('ContactInfo.Hours')}</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-violet-400 rounded-full p-3">
                <MapPinned className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">{t('ContactInfo.VisitUs')}</h4>
                <p className="mt-1 text-sm">
                {t('ContactInfo.Address')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
