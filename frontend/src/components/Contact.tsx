"use client";

import React, { useRef, useState } from "react";
import { SendHorizontal, Mails, PhoneCall, MapPinned } from "lucide-react";
import emailjs from "@emailjs/browser";
import Image from "next/image";

import PhoneInput, {
  isValidPhoneNumber
} from "react-phone-number-input";
import 'react-phone-number-input/style.css';
import icon from "../assets/CF.jpg";


const service_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const template_ID = process.env.NEXT_PUBLIC_EMAILJS_ENQ_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const stromxToken = process.env.NEXT_PUBLIC_STROMX_TOKEN;
const adminPhones = process.env.NEXT_PUBLIC_ADMIN_PHONES?.split(",").map(p => p.trim());

const Form: React.FC = () => {
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
    'gmail.ckm', 'gmail.kom', 'gmail.bom', 'gmail.dcom', 'gmaul.con', 'mail.com'
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

  const sendWhatsAppNotification = async (formData: {
    name: string;
    company: string;
    email: string;
    number: string;
    location: string;
    queries: string;
    product: string;
  }) => {
    if (!stromxToken || !adminPhones?.length) {
      console.warn("Missing Stromx token or admin phone numbers.");
      return;
    }

    const messagePayload = {
      type: "template",
      template: {
        name: "enquiry_ace_project",
        language: { policy: "deterministic", code: "en" },
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

    for (const phone of adminPhones) {
      try {
        const response = await fetch(
          `https://api.stromx.io/v1/message/send-message?token=${stromxToken}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...messagePayload, to: phone })
          }
        );
        const data = await response.json();

        if (response.ok) {
          console.log(`WhatsApp sent to ${phone}:`, data);
        } else {
          console.error(`WhatsApp failed for ${phone}:`, data);
        }
      } catch (error) {
        console.error(`WhatsApp error for ${phone}:`, error);
      }
    }
  };

 const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (!form.current) return;

  const emailValidationMessage = validateEmail(email);
  if (emailValidationMessage) {
    setEmailError(emailValidationMessage);
    alert("Please enter a valid Email Address");
    return;
  } else {
    setEmailError('');
  }

  if (!phone || !isValidPhoneNumber(phone)) {
    setPhoneError("Please enter a valid phone number");
    alert("Please enter a valid phone number.");
    return;
  } else {
    setPhoneError("");
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
    email: elements.email.value,
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

    alert("Your message has been sent successfully!");
    form.current.reset();
    setPhone(undefined);
    setEmail('');
  } catch (error) {
    console.error("Submission error:", error);
    alert("Something went wrong. Please try again later.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div id="contact" className="mt-5 md:px-2">
      <div className="flex flex-col md:flex-row p-4 py-10 rounded-lg md:py-10 max-w-6xl mx-auto sm:mt-20 mb-20 justify-center">
  
        <div className="md:w-7/12 border p-5 md:p-10 rounded md:rounded-none md:border-[#155E95]">
          <h2 className="text-xl md:text-3xl font-semibold text-[#102E50] mb-6">
            Get in touch and <strong className="text-orange-600">schedule your demo now!</strong>
          </h2>
          <form ref={form} onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="lg:text-lg font-medium">Name :</label>
                <input type="text" name="name" required placeholder="Name *" className="text-sm md:text-[16px] border p-2 mt-1 rounded w-full" />
              </div>
              <div className="flex flex-col">
                <label className="lg:text-lg font-medium">Company Name :</label>
                <input type="text" name="company" required placeholder="Company Name *" className="text-sm md:text-[16px] border p-2 mt-1 rounded w-full" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="lg:text-lg font-medium">Business Email :</label>
         <input
        type="email"
        name="email"
        value={email}
        required
        placeholder="Email *"
        onChange={handleEmailChange}
        className="text-sm md:text-[16px] border p-2 mt-1 rounded w-full"
      />
      {emailError && (
        <p className="text-red-500 text-sm mt-1">{emailError}</p>
      )}
              </div>

              <div className="flex flex-col">
                <label className="lg:text-lg font-medium">Mobile Number :</label>
                <PhoneInput
                  international
                  defaultCountry="IN"
                  value={phone}
                  onChange={setPhone}
                  className=" !shadow-none rounded !bg-transparent border mt-1 p-2 [&>input]:border-none [&>input]:outline-none [&>input]:bg-transparent"
                />
                {phoneError && <p className="text-red-500 text-sm mt-1">{phoneError}</p>}
              </div>
            </div>

            <div className="flex flex-col">
              <label className="lg:text-lg font-medium">Location :</label>
              <input type="text" name="location" placeholder="Location" required className="text-sm md:text-[16px] border p-2 mt-1 rounded w-full" />
            </div>

            <div className="flex gap-2">
              <label className="lg:text-lg font-medium">Product Interested :</label>
              <input type="text" name="product" defaultValue="ACE PPAP" readOnly className="lg:text-lg font-semibold" />
            </div>

            <div className="flex flex-col">
              <label className="lg:text-lg font-medium">Queries :</label>
              <textarea name="queries" required placeholder="Queries *" className="text-sm md:text-[16px] border p-2 mt-1 rounded w-full h-24" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#155E95] text-white py-2 px-4 rounded hover:bg-green-500 flex items-center gap-2 md:text-lg"
            >
              {loading ? "Sending..." : "Send"}
              <SendHorizontal className="w-4 h-4" />
            </button>
          </form>
        </div>

     
        <div className="mt-20 md:mt-0 md:w-5/12 bg-[#155E95] border border-e-[#155E95] border-y-[#155E95] border-l-[#155E95] md:border-l-0 text-white rounded md:rounded-r-sm md:rounded-l-none">
          <div className="h-48 relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-50 bg-opacity-20 flex flex-col items-center justify-center">
              <Image fill src={icon} alt="bg" className="object-cover object-center opacity-50" />
              <div className="z-40 text-center">
                <h1 className="text-[#102E50] font-bold">ACE PPAP</h1>
                <h3 className="text-2xl font-bold text-[#102E50]">Contact Information</h3>
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-8 space-y-8 md:mt-3">
            <div className="flex items-start space-x-4">
              <div className="bg-red-400 rounded-full p-3">
                <Mails className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Email Us</h4>
                <p className="mt-1 text-sm">sales@acesoft.in</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-blue-500 rounded-full p-3">
                <PhoneCall className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Call Us</h4>
                <p className="mt-1 text-sm">+91 9840137210</p>
                <p className="opacity-90 text-sm">Mon-Sat from 10am to 6:30pm</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-violet-400 rounded-full p-3">
                <MapPinned className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-lg">Visit Us</h4>
                <p className="mt-1 text-sm">
                  #306, 2nd Floor NSIC - Software Technology Business Park, 
                  B 24, Guindy Industrial Estate, Ekkatuthangal, Chennai - 600032
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
