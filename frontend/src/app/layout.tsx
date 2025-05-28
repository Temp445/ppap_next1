import type { Metadata } from "next";
import { Geist, Geist_Mono, Urbanist } from "next/font/google";
import "./globals.css";
import 'swiper/css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const urbanist = Urbanist({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ACE PPAP",
  description: "Cloud-based calibration management software for ISO 17025 compliance. Automate scheduling, tracking, and certificate generation with ACE CMS.",
  keywords:"ACE, CMS, Calibration Management System, Calibration Management Software, Cloud-Based Calibration Management, Online Calibration Management Platform, Digital Calibration Management Tool, Web-Based Calibration Platform, Online Calibration System, Calibration System with Cloud Access, Paperless Calibration Management, ACE CMS (Calibration Management System), ACE Calibration Software, Calibration Software, Automated Calibration Software, Calibration Software Solutions, Best Calibration Software for Labs, Industrial Calibration Software, Remote Calibration Management Software, Online Calibration Records, Instrument Calibration Software, Precision Instrument Calibration System, Laboratory Instrument Calibration Software, Lab Calibration Software, Calibration for Measuring Instruments, Calibration System for Testing Labs, Laboratory Calibration Tracking Tool, Calibration Tracking System, Calibration Schedule Tracker, Asset Calibration Tracking Software, Calibration Due Date Reminder Tool, Equipment Calibration Scheduler, Maintenance and Calibration Scheduler, Automated Equipment Calibration System, Tool Calibration Scheduling Software, Maintenance Log and Calibration Tracker, ISO 17025 Calibration Software, ISO 17025 Lab Software Solution, ISO Compliant Calibration Tracking, Compliance Calibration Software, Calibration Certificate Management, Digital Calibration Certificates, Certificate of Calibration Generator, Automated Calibration Certificate System, Digital Calibration Log, Maintenance and Calibration Software, Preventive Maintenance & Calibration Software, Preventive Maintenance Software, Asset Preventive Maintenance System, PM and Calibration Integrated Software, Best Calibration Management Software, Top Calibration Software for Labs, Best CMS for Calibration, Top-Rated Calibration Software, Best ISO 17025 Compliant CMS, Most Reliable Calibration Management System, Affordable Calibration Tracking Software, Calibration Management Software USA, Calibration Management Software India",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <head>
      <link rel="icon" href="/AceLogo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${urbanist.variable} antialiased`}
      >
        {children}
      </body>
    </html>
    
  );
}
