'use client'

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';


const Feature = () => {

const t = useTranslations('Feature');
const features = t.raw('items') as { number: number; title: string; description: string }[];

  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const visibleFeatures = isMobile && !showAll ? features.slice(0, 5) : features;

  return (
    <div className="mx-auto  md:px-4 py-10" id="features">
      <div className="bg-[#155E95] text-white p-8 md:p-10 text-center mb-8 2xl:rounded">
        <h1 className="text-xl md:text-4xl font-bold mb-4">
          {t('Title')}{' '}
          <span className="bg-white text-[#155E95] px-4 py-2 rounded-lg inline-block transform shadow-lg font-black">
            ACE PPAP
          </span>
        </h1>
        <div className="w-32 h-1 bg-white mx-auto rounded-full mt-6"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleFeatures.map((feature) => (
            <div
              key={feature.number}
              className="flex items-start gap-4 p-5 rounded-lg bg-white hover:scale-105 shadow-lg hover:shadow-2xl border border-black/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              <div className="flex-shrink-0 rounded-full border-y-2  text-[#155E95] w-8 h-8 md:w-12 md:h-12 flex items-center justify-center md:text-xl font-bold">
                {feature.number}
              </div>
              <div>
                <h2 className="text-lg md:text-xl font-semibold mb-1 text-[#102E50]">{feature.title}</h2>
                <p className="text-sm md:text-base text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>


        {isMobile && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-[#155E95]  text-white text-sm p-2 md:px-6 md:py-2 rounded shadow-md transition"
            >
              {showAll ? t('button.showLess') : t('button.readMore')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feature;
