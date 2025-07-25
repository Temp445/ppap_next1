
import BackToTop from '@/components/BackToTop';
import Clients from '@/components/Clients';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import PricingTable from '@/components/PricingTable';
import Testimonial from '@/components/testimonial';
import Why_Choose from '@/components/Why_Choose';
import PPAP from '@/components/ppap';
import Feature from '@/components/Feature';
import Advantage from '@/components/Advantage';
import Demo from '@/components/Demo';
import Navbar1 from '@/components/Navbar1';
import NotificationButton from '@/components/NotificationButton';
import CallbackCard from '@/components/CallbackCard';


const Home = () => {
  return (
    <div>
      <Navbar1/>
    <div className='container mx-auto absolute md:hidden'><Navbar/></div>
    <Hero/>
    <PPAP/>
    <Why_Choose/>
    <Clients/>
    <Advantage/>
    <Feature/>
    <Demo/>
    <PricingTable/>
    <Testimonial/>
    <Contact/>
    <Footer/>
    <CallbackCard/>
    <NotificationButton/>
    <BackToTop/>
    </div>
  )
}

export default Home