
import { useTranslations } from "next-intl"

const PPAP = () => {
  const t = useTranslations('WhyChoose');
  const ppap = "Production Part Approval Process" ;
  return (
    <div className="min-h-fit bg-gradient-to-b from-white to-gray-100 flex items-center justify-center p-2 md:p-6 container mx-auto">
      <div className="bg-white md:shadow-2xl  rounded md:rounded-2xl p-2 md:p-8  w-full md:border md:border-gray-200">
        <h1 className="text-xl md:text-3xl font-bold text-[#102E50] mb-4">
          {t('Title')} <span className="text-orange-600">PPAP</span> ?
        </h1>
        <p className="text-gray-500 md:text-lg leading-relaxed"> 
          <span className="font-semibold">PPAP</span> {t.rich('Para',{ ppap: ()=> <strong>{ppap}</strong> })} 
        </p>
      </div>
  <div>
  </div>    
  </div>
  )
}

export default PPAP
