"use client";

import React, { useRef, useState } from "react";
import { SendHorizontal, Mails, PhoneCall, MapPinned } from "lucide-react";
import emailjs from "@emailjs/browser";
import Image from "next/image";
import icon from "../assets/CF.jpg";

const service_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const template_ID = process.env.NEXT_PUBLIC_EMAILJS_ENQ_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

const Form: React.FC = () => {
  const form = useRef<HTMLFormElement | null>(null);
  const [emailError, setEmailError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]{2,6}\.[a-zA-Z]{2,6}$/;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    const emailInput = (
      form.current.elements.namedItem("email") as HTMLInputElement
    ).value;

    if (!emailPattern.test(emailInput)) {
      setEmailError("Please enter a valid email format");
      return;
    } else {
      setEmailError("");
    }

    setLoading(true);

    emailjs
      .sendForm(
         service_ID!, // service ID
         template_ID!, // template ID
        form.current,
        publicKey // public key
      )
      .then(
        (response) => {
          console.log("Email sent successfully!", response);
          alert("Your message has been sent successfully!");
          form.current?.reset();
        },
        (error) => {
          console.error("Email sending failed:", error);
          alert(
            "There was an issue sending your message. Please try again later."
          );
        }
      )
      .finally(() => setLoading(false));
  };

  return (
    <div id="contact">
      <div className="mt-5 md:px-2">
        <div className="flex flex-col md:flex-row p-4 py-10  rounded-lg  md:py-10 max-w-6xl mx-auto sm:mt-20 mb-20 justify-center">
          <div className="md:w-7/12 rounded md:rounded-none md:rounded-l-sm md:border-sky-800 border p-5 md:p-10">
            <h2 className="text-xl md:text-3xl font-semibold text-[#102E50] mb-6">
              Get in touch and{" "}
              <strong className="text-orange-600">schedule your demo now!</strong>
            </h2>
            <form ref={form} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="name" className="lg:text-lg font-medium">
                    Name :
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Name *"
                    className="text-sm md:text-[16px] border p-2 mt-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-100"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="company" className="lg:text-lg font-medium">
                    Company Name :
                  </label>
                  <input
                    type="text"
                    name="company"
                    placeholder="Company Name *"
                    className="text-sm md:text-[16px] border p-2 mt-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-100"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="email" className="lg:text-lg font-medium">
                    Business Email :
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email *"
                    onChange={(e) => {
                      const emailInput = e.target.value;
                      if (emailPattern.test(emailInput)) {
                        setEmailError("");
                      } else {
                        setEmailError("Please enter a valid email format");
                      }
                    }}
                    className="text-sm md:text-[16px] border p-2 mt-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-100"
                    required
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="number" className="lg:text-lg font-medium">
                    Mobile Number :
                  </label>
                  <input
                    type="number"
                    name="number"
                    placeholder="Phone Number *"
                    className="text-sm md:text-[16px] border p-2 mt-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-100 appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    required
                    style={{
                      WebkitAppearance: "none",
                      MozAppearance: "textfield",
                    }}
                  />
                </div>
              </div>

              <label htmlFor="location" className="lg:text-lg font-medium">
                Location :
              </label>
              <input
                type="text"
                name="location"
                placeholder="Location"
                className="text-sm md:text-[16px] border p-2 mt-1 rounded w-full focus:outline-none focus:ring-2 focus:ring-red-100"
              />

              <div className="flex flex-wrap gap-2 w-full">
                <label className="lg:text-lg font-medium">
                  Product Interested :
                </label>
                <input
                  type="text"
                  name="product"
                  defaultValue="ACE PPAP"
                  readOnly
                  className="lg:text-lg font-semibold"
                  aria-label="Product Interested"
                />
              </div>

              <label className="lg:text-lg font-medium">Queries : </label>
              <textarea
                name="queries"
                placeholder="Queries *"
                className="text-sm md:text-[16px] border p-2 mt-1 rounded w-full h-24 focus:outline-none focus:ring-2 focus:ring-red-100"
                required
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className="bg-[#155E95] text-white py-1 px-3 md:px-4 md:py-2 rounded hover:bg-green-500 flex gap-3 md:text-lg"
              >
                {loading ? "Sending" : "Send"}
                <SendHorizontal className="mt-1 w-4 h-4 md:mt-1.5 " />
              </button>
            </form>
          </div>

          <div className="mt-20 md:mt-0 md:w-5/12 bg-[#155E95] text-white border border-e-sky-800 border-y-sky-800 border-l-sky-800 md:border-l-0 rounded md:rounded-none md:rounded-r-sm">
            <div className="h-48 relative overflow-hidden">
              <div className="absolute inset-0 bg-blue-50 bg-opacity-20 flex flex-col items-center justify-center rounded md:rounded-tr">
                <Image
                  fill
                  src={icon}
                  alt="bg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="w-full h-full object-cover object-center z-10 opacity-50"
                />

                <div className="z-40  text-center ">
                  <h1 className="z-20 text-[#102E50] text-shadow-lg font-bold ">
                    ACE PPAP
                  </h1>
                  <h3 className="text-2xl font-bold text-[#102E50] z-20 text-shadow-lg">
                    Contact Information
                  </h3>
                </div>
              </div>
            </div>

            <div className=" p-4 lg:p-8 space-y-8 md:mt-3">
              <div className="flex items-start space-x-4">
                <div className="bg-red-400  rounded-full p-3">
                  <Mails className=" w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div className="">
                  <h4 className="font-semibold text-lg text-white ">
                    Email Us
                  </h4>
                  <p className=" mt-1 text-white text-sm md:test-base  ">
                    sales@acesoft.in
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-500  rounded-full p-3">
                  <PhoneCall className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-white ">Call Us</h4>
                  <p className=" mt-1 text-white text-sm md:test-base ">
                    +91 9840137210
                  </p>
                  <p className="opacity-90 text-white text-sm md:test-base ">
                    Mon-Sat from 10am to 6:30pm
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-violet-400  rounded-full p-3">
                  <MapPinned className=" w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-lg text-white ">
                    Visit Us
                  </h4>
                  <p className="mt-1 text-white text-sm md:text-base ">
                    #306, 2nd Floor NSIC - Software Technology Business Park B
                    24, Guindy Industrial Estate Ekkatuthangal, Chennai - 600032
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
