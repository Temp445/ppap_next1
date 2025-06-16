import type { Metadata } from "next";
import { Geist, Geist_Mono, Urbanist } from "next/font/google";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import "../globals.css";
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
  description: "Optimize your manufacturing quality control with an industry-proven PPAP process to streamline part approval and supplier management.",
  keywords:"ACE PPAP,Production Part Approval Process, PPAP, PPAP process, PPAP requirements, PPAP documentation, PPAP submission, PPAP approval process, PPAP checklist, PPAP compliance, PPAP forms, Supplier PPAP, PPAP quality control, PPAP sample approval, Best PPAP, #1 PPAP, PPAP best practices, Reliable PPAP process, Effective PPAP approval, Automotive PPAP, Automotive production part approval, PPAP automotive suppliers, Automotive supplier quality, Automotive PPAP documentation, Aerospace PPAP, Aerospace part approval, PPAP in aerospace manufacturing, Aerospace supplier quality process, Electronics PPAP, Electronics component approval, PPAP for electronics manufacturing, Medical device PPAP, Medical manufacturing PPAP, PPAP for healthcare devices, Manufacturing PPAP process, Production part approval in manufacturing, Supplier quality management, Manufacturing quality control",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
       <head>
      <link rel="icon" href="/AceLogo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${urbanist.variable} antialiased`}
      >
     <NextIntlClientProvider> {children} </NextIntlClientProvider>
      </body>
    </html>
    
  );
}
