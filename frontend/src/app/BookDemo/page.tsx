'use client'

import Header from "@/components/Navbar";
import React from "react";
import { InlineWidget } from "react-calendly";


const CalendlyEmbed = () => {
const url = "https://calendly.com/dmadmin";

  return (
 <div className="bg-gray-900 max-h-screen" >
  <div className="container mx-auto" >
    <Header/>
  </div>
  <h1 className="mt-10 text-xl md:text-2xl font-bold md:font-extrabold  text-center text-shadow-lg/20 text-white">Book A Free Demo Now!</h1>
     <div className="pb-32">
      <InlineWidget url= {url}/>
    </div>
 </div>
  );
};

export default CalendlyEmbed;