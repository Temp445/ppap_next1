
import Image from 'next/image';
import Link from 'next/link';
import Navbar from './Navbar';

import logo from '../assets/AceLogo.png';
import img1 from '../assets/PPAP3.jpg';
import img2 from '../assets/PPAP1.jpg';
import img3 from '../assets/PPAP2.jpg';
import img4 from '../assets/PPAP5.jpg';


const Hero = () => {
  return (
    <div className="relative min-h-fit overflow-hidden bg-[#155E95]" id="top">
      
{/* <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" /> */}
      <div className="relative min-h-fit container mx-auto">
       
        <div className="relative z-10 max-w- mx-auto px-4 sm:px-6 py-4">
          <nav aria-label="Main navigation">
            <Navbar />
          </nav>

          <div className="md:hidden flex gap-1 mx-auto justify-center w-fit  px-6 md:mt-6   -mt-16 ">
            <Image src={logo} alt="logo" className="w-8 h-8 " width={32} height={32}  />
            <span className="text-lg font-bold text-white tracking-wide mt-1">ACE CMS</span>
          </div>

          <section className="flex flex-col lg:flex-row items-center lg:max-w-11/12 mx-auto justify-between min-h-fit 2xl:pb-10  gap-12 lg:gap-8 xl:mt-10">
            <div className="relative w-full  order-1 lg:order-2">
              <div className="relative  mx-auto lg:mx-0">
                <div className="absolute -inset-8 rounded-3xl blur-2xl" />
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ">

  <div className="relative bg-white/10 rounded-2xl border border-white/20 p-4 shadow-2xl backdrop-blur-sm hidden lg:block">
    <Image
      src={img1}
      alt="image"
      className="w-full max-w-full mx-auto rounded-xl"
      width={484}
      height={588}
      priority
    />
  </div>


  <div className="grid grid-cols-1 gap-6">
    <div className="relative bg-white/10 rounded-2xl border border-white/20 p-2 md:p-4 shadow-2xl backdrop-blur-sm hidden lg:block">
      <Image
        src={img2}
        alt="image"
        className="w-full max-w-full mx-auto rounded-lg"
        width={484}
        height={588}
      />
    </div>

    <div className="relative bg-white/10 rounded-2xl border border-white/20 p-2 md:p-4 shadow-2xl backdrop-blur-sm hidden lg:block">
      <Image
        src={img3}
        alt="image"
        className="w-full max-w-full mx-auto rounded-lg shadow-lg"
        width={484}
        height={588}
      />
    </div>
  </div>
</div>


<div className="mt-6 grid grid-cols-1 gap-4 ">
  <div className="relative h-44 bg-white/10 rounded-2xl border border-white/20 p-2 shadow-2xl backdrop-blur-sm w-full">
    <Image
      src={img4}
      alt="image"
      className="h-full w-full object-cover rounded-xl"
      width={484}
      height={58}
    />
  </div>


</div>

              </div>
            </div>

            <div className="w-full text-center lg:text-left order-2 lg:order-1">
              <div className="md:max-w-2xl mx-auto lg:mx-0 space-y-8">
                <div className="space-y-4">
                  <h1 className='md:hidden text-xl text-white font-bold text-center'>Production Part Approval Process (PPAP) Services for High-Quality, Compliant Manufacturing</h1>
                  <h1 className=" hidden md:block text-4xl md:text-5xl lg:text-4xl xl:text-4xl 2xl:text-5xl font-black text-white leading-tight">
                    Production Part Approval Process (PPAP) Services for High-Quality, Compliant Manufacturing<span className='relative text-white'>
                    </span>
                  </h1>
                </div>

                <p className=" text-sm md:text-xl text-gray-300 leading-relaxed font-medium max-w-xl mx-auto lg:mx-0">
                Automate Your PPAP Workflow with Industry-Leading Software — Deliver Quality Faster, Every Time
                </p>

  <div>
  <ul className="list-none pl-0 space-y-2 text-white font-semibold grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
    <li><span className="text-red-500 mr-2">&#9679;</span>Ballooned Drawing</li>
    <li><span className="text-blue-500 mr-2">&#9679;</span>Process FMEA</li>
    <li className='hidden md:block'><span className="text-green-500 mr-2">&#9679;</span>Control Plans</li>
    <li className='-ml-12 md:ml-0'><span className="text-orange-500 mr-2">&#9679;</span>MSA Studies</li>
    <li><span className="text-purple-500 mr-2">&#9679;</span>PSW Automation</li>
    <li><span className="text-indigo-500 mr-2">&#9679;</span>Process Flow</li>
  </ul>
</div>


                <div className="md:pt-4">
                  <Link href="#contact" className="group inline-flex items-center gap-3 px-4 py-2 md:px-8 md:py-4 lg:px-6 lg:py-3 hover:bg-orange-600  border hover:border-orange-600 text-white text-sm md:text-lg font-bold rounded-lg  shadow-xl hover:shadow-2xl">
                    <span>Book a PPAP Demo</span>
                    <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                </div>

           
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Hero;