import Image from "next/image";
import icon5 from "../assets/PPAP6.jpg";
import { PiArrowBendDoubleUpRightFill } from "react-icons/pi";

const advantages = [
  " Comprehensive and fully integrated PPAP management system",
   "Eliminates duplication of work, saving time and effort",
  "Documents are always ready for submission or audit",
  " Improves ownership and accountability across teams",
  "Information is centralized, not dependent on any individual",
  "Innovative platform that keeps PPAP documents continuously updated",
  " Always compliant with the latest PPAP standards and ISO/TS 16949",
  
];

const Advantage = () => {
  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 py-16 px-4">
      <div className="container mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">

          <div className="md:w-1/2 flex justify-center relative">
          <div className="bg-white p-6 rounded shadow-xl border border-gray-200 transition-transform duration-300 hover:scale-105 z-10">
            <Image
              src={icon5}
              alt="ACE PPAP Illustration"
              className="w-xl h-auto rounded-xl"
              priority
            />
          </div>
          <div className="absolute w-32 h-32 rounded bg-sky-100 left-0 top-0 z-0 rotate-45" ></div>
          <div className="absolute w-40 h-40 rounded-full bg-red-100 right-0 bottom-0 z-0 animate-pulse" ></div>
        </div>

        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl font-extrabold text-[#102E50] leading-tight">
            Advantages of <span className="text-orange-600">ACE PPAP</span>
          </h1>
          <ul className="space-y-4">
            {advantages.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-700 text-lg">
             <span className="mt-1 text-[#102E50]"> <PiArrowBendDoubleUpRightFill /></span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      
      </div>
    </div>
  );
};

export default Advantage;
