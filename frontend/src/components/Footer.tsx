
import Image from 'next/image';
import logo from '../assets/logo.svg'

const Footer = () => {
  return (
    <footer className="bg-gray-700 text-gray-300 pb-20 -mt-20">
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FAFAFA" fillOpacity="1" d="M0,96L80,96C160,96,320,96,480,106.7C640,117,800,139,960,138.7C1120,139,1280,117,1360,106.7L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
      </div>
     <div className='container mx-auto xl:-mt-32'>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between md:justify-around space-y-8 md:space-y-0">

          <div className='w-80'>
            <div className="text-lg font-semibold text-white flex gap-2"> <Image src={logo} alt="logo" width={100} height={100} className='w-6 h-6' /> ACE CMS</div>
            <p className="mt-2 text-sm flex flex-wrap">ACE CMS brings efficiency, traceability, and compliance to calibration management. By leveraging automation, real-time data, and cloud flexibility, it transforms a traditionally manual and error-prone process into a streamlined, audit-ready system—saving time, reducing risk, and ensuring quality.</p>
          </div>

        <div className='flex gap-14 xl:gap-28'>
              <div>
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li><a href="#features" className="hover:text-orange-400">Features</a></li>
              <li><a href="#client" className="hover:text-orange-400">Clients</a></li>
              <li><a href="#pricing" className="hover:text-orange-400">Pricing</a></li>
              <li><a href="#contact" className="hover:text-orange-400">Contact</a></li>

            </ul>
          </div>

   
          <div>
            <h4 className="text-lg font-semibold text-white">Follow Us</h4>
            <ul className="mt-2 space-y-2 text-sm">
              <li><a href="https://www.facebook.com/people/Ace-Software-Solutions-Pvt-Ltd/61565550617223/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">Facebook</a></li>
              <li><a href="https://youtube.com/@acesoftwaresolutions?si=KqZ0BFZg5pNmGBqk" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">Youtube</a></li>
              <li><a href="https://www.instagram.com/ace_software_solutions/" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">Instagram</a></li>
              <li><a href="https://in.linkedin.com/company/ace-software-solutions-private-limited" target="_blank" rel="noopener noreferrer" className="hover:text-orange-400">LinkedIn</a></li>
            </ul>
          </div>
        </div>

          <div className="md:hidden lg:block">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7774.626039048191!2d80.20146899191994!3d13.0157278024425!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52669470c1b127%3A0xe3512b101f4ee3ad!2sACE%20Software%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1742627952587!5m2!1sen!2sin" 
              title="ACE Software Solutions location"
              className="w-full h-full rounded"
              frameBorder="0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
     </div>
    </footer>
  );
};

export default Footer;
