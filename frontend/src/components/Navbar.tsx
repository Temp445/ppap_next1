"use client";
import { FC, useState } from "react";
import Link from "next/link";
import {
  House,
  Star,
  DollarSign,
  FileText,
  Menu,
  X,
  Calendar,
  Users,
} from "lucide-react";
import Image from "next/image";
import logo from "../assets/AceLogo.png";
import { useTranslations } from "next-intl";

const Navbar: FC = () => {
const t = useTranslations('Navbar')

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="flex items-center justify-between md:pt-5 lg:pb-10 px-4 md:px-0 xl:px-6 relative">
        <div className="md:flex items-center hidden ">
          <Link href="/" className="text-2xl md:text-xl lg:text-2xl xl:text-2xl font-bold text-white flex gap-1">
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className="w-12 h-12 md:w-10 md:h-10 "
            />
            <span className="mt-2">ACE PPAP </span>
          </Link>
        </div>

        <div className="hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        <div className="hidden md:flex items-center space-x-2">
          <Link
            href="/#features"
            className="flex items-center text-white hover:text-white text-base font-semibold relative px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-orange-600"
          >
            <Star className="w-4 h-4 mr-2" />
            {t('Links.Features')}
          </Link>

          <Link
            href="/#pricing"
            className="flex items-center text-white hover:text-white text-base font-semibold relative px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-orange-600"
          >
            <DollarSign className="w-4 h-4 mr-2" />
             {t('Links.Pricing')}
          </Link>

          <Link
            href="/BookDemo"
            className="flex items-center text-white hover:text-white text-base font-semibold relative px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-orange-600"
          >
            <FileText className="w-4 h-4 mr-2" />
            {t('Links.BookDemo')}
          </Link>

          <Link
            href="/#client"
            className="flex items-center text-white hover:text-white text-base font-semibold relative px-4 py-2 rounded-full transition-all duration-300 ease-in-out hover:bg-orange-600"
          >
            <Users className="w-4 h-4 mr-2" />
            {t('Links.Clients')}
          </Link>
        </div>

        {isMenuOpen && (
          <div className="fixed bottom-14 md:top-full left-0.5 right-10 bg-white shadow-lg rounded py-4 px-6 z-50 md:hidden">
            <div className="flex flex-col space-y-4">
               <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center text-[#102E50] text-base font-semibold"
              >
                <House className="w-4 h-4 mr-2" />
                {t('Links.Home')}
              </Link>
              <Link
                href="/#features"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center text-[#102E50] text-base font-semibold"
              >
                <Star className="w-4 h-4 mr-2" />
                {t('Links.Features')}
              </Link>

              <Link
                href="/#pricing"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center text-[#102E50]  text-base font-semibold"
              >
                <DollarSign className="w-4 h-4 mr-2" />
                 {t('Links.Pricing')}
              </Link>

              <Link
                href="/#contact"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center text-[#102E50]  text-base font-semibold"
              >
                <FileText className="w-4 h-4 mr-2" />
                {t('Links.Contact')}
              </Link>

              <Link
                href="/#client"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center text-[#102E50]  text-base font-semibold"
              >
                <Users className="w-4 h-4 mr-2" />
                {t('Links.Clients')}
              </Link>
            </div>
          </div>
        )}

        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="#"
            className="hover:bg-green-700 hover hover:border-green-700 border text-white px-4 py-1 md:px-2 lg:px-4  rounded-md font-medium hover:opacity-90 transition"
          >
            {t('Links.SignIn')}
          </Link>
        </div>
      </nav>

      <div className="fixed bottom-0 left-0 right-0  flex justify-between items-center  md:hidden z-[100]">
        <button
          onClick={toggleMenu}
          className="flex flex-col items-center justify-center text-gray-100"
        >
          <div className="w-12 h-12  bg-gray-400 flex items-center justify-center">
            <Menu className="w-6 h-6" />
          </div>
        </button>

        <Link
          href="#"
          className="flex flex-col items-center justify-center text-white w-full"
        >
          <span className="w-full h-12  bg-gradient-to-r from-red-500 to-red-400 flex items-center justify-center">
            {t('Links.SignIn')}
          </span>
        </Link>

        <Link
          href="/BookDemo"
          className="flex flex-col items-center justify-center text-gray-600"
        >
          <div className="w-12 h-12  bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center">
            <Calendar className="w-5 h-8 text-white" />
          </div>
        </Link>
      </div>

      <div className="h-16 md:hidden"></div>
    </>
  );
};

export default Navbar;
