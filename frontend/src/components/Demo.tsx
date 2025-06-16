import Link from 'next/link';
import { MoveRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

const Demo = () => {
  const t = useTranslations('Demo')
  return (
    <section className="bg-[#155E95] py-10 md:py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-xl md:text-4xl text-white font-bold max-w-3xl mx-auto">
          {t('heading')}
        </h1>
        <div className="mt-8 flex justify-center">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 md:gap-3 text-sm md:text-base font-bold text-[#155E95] bg-white py-2 px-4 md:py-3 md:px-6 rounded shadow-md transition-colors duration-300 hover:bg-blue-100"
          >
            {t('button')}
            <MoveRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Demo;
