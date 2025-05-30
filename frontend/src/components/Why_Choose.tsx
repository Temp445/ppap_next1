
import Image from 'next/image'
import icon1 from '../assets/icon-1.png'
import icon2 from '../assets/icon-2.png'
import icon3 from '../assets/icon-3.png'
import icon4 from '../assets/icon-4.png'

import EnquiryForm from './EnquiryForm'


const Why_Choose = () => {
 

  return (
    <section className="pt-16 container mx-auto ">
      <div className=" mx-auto px-2 md:px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0 xl:gap-16 container">
          <div className="w-full md:w-8/12 lg:w-10/12  xl:w-6/12 relative">
            <div className='z-20'>
              <EnquiryForm/>
            </div>
          
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-indigo-100 rounded-full opacity-70 z-0"></div>
          </div>
          
        
          <div className="w-full xl:w-11/12 space-y-6   pt-5 pb-10 px-2 lg:px-12 xl:px-2 rounded">
            <div className="inline-block  text-[#102E50] text-xl md:text-3xl rounded-full font-bold">
              Why Choose <span className='text-orange-600'>ACE PPAP</span> ?
            </div>
            
            <h2 className=" md:3xl  2xl:text-2xl font-medium text-gray-500 leading-tight">
            <strong>ACE PPAP</strong> is an all-in-one PPAP management software that enables manufacturers and suppliers to automate and submit all 18 Production Part Approval Process elements with speed, accuracy, and compliance. 
              <span className="text-orange-600"></span>
            </h2>
          <h2 className=" md:3xl  2xl:text-2xl font-medium text-gray-500 leading-tight">
           Designed for <span className='text-orange-600'>automotive, aerospace, and industrial sectors</span>, it streamlines the full PPAP lifecycle in a centralized, audit-ready platform.
            </h2>
            
        <div className="grid grid-cols-2 md:grid-cols-2 grid-rows-2 gap-6 pt-10">
  <div className="p-6   rounded backdrop-blur-sm  bg-blue-100/80 relative hover:scale-105 shadow-lg hover:shadow-2xl border border-white/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
      <h2 className="text-lg md:text-2xl font-semibold mb-2 text-[#102E50]">100%</h2>
    <p className="text-sm md:text-base text-gray-600">Secure Document Storage</p>
   <div className='absolute bottom-0 right-0'><Image src={icon1} alt="icon" className=' w-14 h-14 md:w-20 md:h-20 opacity-25 -rotate-6' /></div>
  </div>
  <div className="p-6 rounded backdrop-blur-sm  bg-green-100/80 relative hover:scale-105 shadow-lg hover:shadow-2xl border border-white/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
    <h2 className="text-lg md:text-2xl font-semibold mb-2 text-[#102E50]"> 90% </h2>
    <p className="text-sm md:text-base text-gray-600">Less Manual Paperwork</p>
   <div className='absolute bottom-0 right-0'><Image src={icon2} alt="icon" className='w-14 h-14 md:w-20 md:h-20 opacity-25 -rotate-6' /></div>
  </div>
  <div className="p-6  rounded backdrop-blur-sm  bg-red-100/80 relative hover:scale-105 shadow-lg hover:shadow-2xl border border-white/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden">
    <h2 className="text-lg md:text-2xl font-semibold mb-2 text-[#102E50]">100%</h2>
    <p className="text-sm md:text-base text-gray-600">Audit-Ready Compliance</p>
   <div className='absolute bottom-0 right-0'><Image src={icon3} alt="icon" className='w-14 h-14 md:w-20 md:h-20 opacity-25 -rotate-6' /></div>

  </div>
  <div className=" p-6   rounded backdrop-blur-sm  bg-violet-100/80 relative hover:scale-105 shadow-lg hover:shadow-2xl border border-white/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden ">
    <h2 className="text-lg md:text-2xl font-semibold mb-2 text-[#102E50]"> 75% </h2>
    <p className="text-sm md:text-base text-gray-600"> Faster PPAP Submissions</p>
   <div className='absolute bottom-0 right-0'><Image src={icon4} alt="icon" className='w-14 h-14 md:w-20 md:h-20 opacity-25 ' /></div>
  </div>
  
</div>

 <div className="w-full border h-20 rounded flex items-center justify-center text-[#102E50] md:text-xl font-semibold text-center">
  Experience the #1 PPAP Software – Book Your Demo Today!
</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Why_Choose