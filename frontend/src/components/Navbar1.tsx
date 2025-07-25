"use client";
import { FC, useState, useRef, useEffect } from "react";
import Image from "next/image";
import logo from "../assets/AceLogo.png";
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ChevronDown, Globe } from 'lucide-react';
import { useTranslations } from "next-intl";
const Navbar1: FC = () => {
  const t = useTranslations('Menu');
 
  const pathname = usePathname();
  const currentLocale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

const languages = [
  { code: 'en', label: 'English', flag: 'us' },
  { code: 'hi', label: 'हिन्दी', flag: 'in' },
  { code: 'de', label: 'Deutsch', flag: 'de' },
  { code: 'fr', label: 'Français', flag: 'fr' },
  { code: 'es', label: 'Español', flag: 'es' },
  { code: 'it', label: 'Italiano', flag: 'it' },
  { code: 'ja', label: '日本語', flag: 'jp' },
  { code: 'zh', label: '中文', flag: 'cn' },
  { code: 'br', label: 'Português (Brasil)', flag: 'br' },
  { code: 'kr', label: '한국어', flag: 'kr' },
  { code: 'be', label: 'বাংলা', flag: 'bd' },
  { code: 'ru', label: 'русский', flag: 'ru' },

];


  const toggleDropdown = () => setIsOpen(!isOpen);

   useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
 

  return (
    <>
      <nav className=" container mx-auto hidden md:flex items-center justify-between md:pt-3 pb-2  px-4 md:px-0  relative">
      <div className="flex">
          <div className="md:flex items-center hidden ">
          <Link href="https://acesoft.in/" className="text-2xl md:text-xl lg:text-2xl xl:text-3xl font-bold text-[#2b2d42] flex gap-1">
            <Image
              src={logo}
              alt="logo"
              width={100}
              height={100}
              className="w-10 h-10 md:w-10 md:h-10  "
            />
            <span className="mt-2 text-sm lg:text-xl">ACE Software <br className="lg:hidden"/> Solutions Pvt. Ltd</span>
          </Link>
        </div>


        <div className="hidden md:flex items-center space-x-4 ml-10">
       <div className="group">
           <Link
            href="https://acesoft.in/products/ace-project-management-software"
            className="flex items-center text-[#2b2d42]  border border-white  text-base font-semibold relative px-4 py-2 rounded-full transition-all duration-300 ease-in-out   hover:scale-105"
          >
            {t('Project')}
          </Link>
            <div className="hidden group-hover:block absolute top-14   w-52 bg-white border  text-black text-xs p-2 rounded z-[52]">
          {t('ProjectTooltip')}
        </div>
       </div>

     <div className="group">
           <Link
            href="https://crm.acesoftcloud.in/"
            className="flex items-center text-[#2b2d42]  border border-white  text-base font-semibold relative px-4 py-2 rounded-full transition-all duration-300 ease-in-out   hover:scale-105"
          >
            {t('CRM')}
          </Link>
            <div className="hidden group-hover:block absolute top-14   w-52 bg-white border shadow-2xl text-black text-xs p-2 rounded z-[52]">
         {t('CRMTooltip')}
        </div>
       </div>

        <div className="group">
           <Link
            href="https://acecms.in/"
            className="flex items-center text-[#2b2d42]  border border-white  text-base font-semibold relative px-4 py-2 rounded-full transition-all duration-300 ease-in-out   hover:scale-105"
          >
            {t('CMS')}
          </Link>
            <div className="hidden group-hover:block absolute top-14   w-52 bg-white border shadow-2xl text-black text-xs p-2 rounded z-[52]">
          {t('CMSTooltip')}
        </div>
       </div>

          <Link
            href="https://acesoft.in/products"
            className="flex items-center text-[#2b2d42]  border border-white   text-base font-semibold relative px-4 py-2 rounded-full transition-all duration-300 ease-in-out  hover:scale-105"
          >
            {t('AllProducts')}
          </Link>
        </div>
      </div>

         <div className="relative z-[100]" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 px-2 py-1.5 mr-2 bg-[#155E95] text-white rounded  transition"
          >
            <Globe className="w-5 h-5" />
            {languages.find((l) => l.code === currentLocale)?.label}
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <ul className="absolute right-2 mt-2 w-80 bg-white border rounded shadow-lg z-50 grid grid-cols-2 gap-1 p-2">
              {languages
                .filter((lang) => lang.code !== currentLocale)
                .map((lang) => (
                  <li key={lang.code}>
                    <Link
                      href={pathname}
                      locale={lang.code}
                      className="flex items-center gap-2 px-2 py-1 text-sm text-gray-800 hover:bg-blue-50 hover:text-[#155E95] transition rounded"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className={`fi fi-${lang.flag} w-7 h-5 block shadow-sm`} />
                      <span>{lang.label}</span>
                    </Link>
                  </li>
                ))}
            </ul>
          )}
        </div>

      </nav>

    </>
  );
};

export default Navbar1;
