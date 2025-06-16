'use client';

import React, { useState } from 'react';
import { LuSquareArrowOutUpRight } from 'react-icons/lu';
import { useTranslations } from 'next-intl';

interface Feature {
  name: string;
  Essential?: boolean;
  EssentialNote?: string;
  BasicPlus?: boolean;
  BasicPlusNote?: string;
  premium?: boolean;
  premiumNote?: string;
  enterprise: boolean;
  enterpriseNote?: string;
}

interface Plan {
  name: string;
  displayname: string;
  desc: string;
  tools?: string;
  Price?: string;
  buttonText: string;
  buttonlink: string;
  buttonClass: string;
  highlighted: boolean;
  tag: string;
}

interface FeatureIconProps {
  available: boolean;
}

const PricingTable: React.FC = () => {
 
  const t = useTranslations('Pricing');

  const features: Feature[] = [
    { name: t('Features.Limit'), Essential: true, EssentialNote: t('Features.EssentialNote'), BasicPlus: true, BasicPlusNote: t('Features.BasicPlusNote'), premium: true, premiumNote: t('Features.premiumNote'), enterprise: true, enterpriseNote: t('Features.enterpriseNote') },
    { name: t('Features.Upto2'), Essential: true, BasicPlus: undefined, premium: undefined, enterprise: true },
    { name: t('Features.Upto20'), Essential: undefined, BasicPlus: true, premium: undefined, enterprise: true },
    { name: t('Features.Upto50'), Essential: undefined, BasicPlus: undefined, premium: true, enterprise: true },
    { name: t('Features.Download'), Essential: true, BasicPlus: true, premium: true, enterprise: true },
    { name: t('Features.Documentation'), Essential: true, BasicPlus: true, premium: true, enterprise: true },
    { name: t('Features.Storage'), Essential: true, BasicPlus: true, premium: true, enterprise: true },
    { name: t('Features.Export'), Essential: true, BasicPlus: true, premium: true, enterprise: true },
  ];

  const plans: Plan[] = [
    {
      name: 'Essential',
      displayname:t('Plans.name1'),
      desc: t('Plans.desc1'),
      buttonText: t('Plans.button1'),
      buttonlink: '#',
      buttonClass: 'bg-none border text-gray-800 hover:bg-[#155E95] hover:text-white',
      highlighted: false,
      tag: '',
    },
    {
      name: 'Standard',
      displayname:t('Plans.name2'),
      desc: t('Plans.desc2'),
      buttonText: t('Plans.button1'),
      buttonlink: '#',
      buttonClass: 'bg-none border text-gray-800 hover:bg-[#155E95] hover:text-white',
      highlighted: true,
      tag: t('Plans.tag2'),
    },
    {
      name: 'Pro',
      displayname:t('Plans.name3'),
      desc: t('Plans.desc3'),
      buttonText: t('Plans.button1'),
      buttonlink: '#',
      buttonClass: 'bg-none border text-gray-800 hover:bg-[#155E95] hover:text-white',
      highlighted: false,
      tag: t('Plans.tag3'),
    },
    {
      name: 'Enterprise',
      displayname:t('Plans.name4'),
      desc: t('Plans.desc4'),
      buttonText: t('Plans.button4'),
      buttonlink: '#contact',
      buttonClass: 'bg-none border text-gray-800 hover:bg-[#155E95] hover:text-white',
      highlighted: false,
      tag: t('Plans.tag4'),

    },
  ];

  const [expandedPlans, setExpandedPlans] = useState<{ [key: string]: boolean }>({});

  const togglePlanFeatures = (name: string) => {
    setExpandedPlans(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const FeatureIcon: React.FC<FeatureIconProps> = ({ available }) => (
    <span className={`font-medium ${available ? 'text-green-500' : 'text-red-500'}`}>{available ? '✓' : '✗'}</span>
  );

  const getFeatureKey = (planName: string) => {
    if (planName === 'Standard') return 'BasicPlus';
    if (planName === 'Pro') return 'premium';
    if (planName === 'Enterprise') return 'enterprise';
    return 'Essential';
  };

  const prices: Record<string, number> = {
    Essential: 48000,
    Standard: 108000,
    Pro: 200000,
    Enterprise: 0,
  };

  return (
    <div className="w-full container mx-auto px-5 sm:px-6 md:px-4 lg:px-2 xl:px-4 py-16" id="pricing">
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-4xl font-bold text-[#102E50] mb-2">{t('Title')}</h1>
        <p className="text-lg md:text-3xl text-gray-600 mb-6">{t('Subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 lg:gap-2 xl:gap-4">
        {plans.map(plan => (
          <div
            key={plan.name}
            className={`relative bg-white rounded border ${
              plan.highlighted ? 'border-[#155E95] shadow-lg' : 'border-gray-200 shadow'
            } hover:shadow-xl transition-shadow duration-300`}
          >
            {plan.tag && (
              <div className="absolute top-5 right-0">
                <span className="bg-[#155E95] text-white px-3 py-1 rounded-l-full text-sm font-semibold shadow-sm select-none">
                  {plan.tag}
                </span>
              </div>
            )}
            <div className="p-6 lg:p-4 xl:p-8 flex flex-col h-full">
              <h2 className="text-xl md:text-2xl font-bold text-[#102E50] mb-2">{plan.displayname}</h2>
              <p className="text-gray-600 mb-4">{plan.desc}</p>

              <div className="mb-6 text-[#155E95] font-extrabold text-2xl md:text-3xl">
                {plan.name !== 'Enterprise' ? (
                  <>
                    ₹{prices[plan.name].toLocaleString()}
                    <span className="text-base md:text-lg font-semibold text-gray-600 ml-1">/{t('Yearly')}</span>
                  </>
                ) : (
                  <span className="text-lg font-semibold text-gray-600">{t('Custompricing')}</span>
                )}
              </div>

              <a
                href={plan.buttonlink}
                className={`${plan.buttonClass} w-full py-2 md:py-3 rounded md:rounded-lg font-semibold shadow-sm hover:shadow text-center transition-colors duration-200`}
              >
                {plan.buttonText}
              </a>

              {plan.name === 'Enterprise' && (
                <div className="mb-6 mt-6 hidden md:block">
                  <h3 className="font-semibold text-gray-900 mb-4">{t('FeaturesTitle')}</h3>
               <ul className="space-y-1 text-gray-700">
                      {t.raw('Plans.Enterprisefeatures').map((feature: string, i: number) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-green-600">✓</span>{feature}
                        </li>
                      ))}
                    </ul>
                </div>
              )}

              <button
                className="w-full md:hidden bg-[#155E95] text-white py-2 rounded mt-6 font-semibold flex items-center justify-center"
                onClick={() => togglePlanFeatures(plan.name)}
              >
                {t('Toggle.ShowFeatures')} <LuSquareArrowOutUpRight className="ml-2 text-lg" />
              </button>

              <div className={`mt-6 transition-all duration-300 ${expandedPlans[plan.name] ? 'block' : 'hidden'} md:block`}>
                {plan.name !== 'Enterprise' && (
                  <>
                    <h3 className="font-semibold text-gray-900 mb-4">{t('FeaturesTitle')}</h3>
                    <div className="space-y-2 text-gray-700">
                      {renderFeatureList(features, getFeatureKey(plan.name), plan.name)}
                    </div>
                  </>
                )}

                {plan.name === 'Enterprise' && (
                  <div className="mb-6 mt-6 md:hidden">
                    <h3 className="font-semibold text-gray-900 mb-4">{t('FeaturesTitle')}:</h3>
                  <ul className="space-y-1 text-gray-700">
                      {t.raw('Plans.Enterprisefeatures').map((feature: string, i: number) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-green-600">✓</span>{feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  function renderFeatureList(features: Feature[], key: string, planName: string) {
    return features.map((feature, i) => {
      const isAvailable = feature[key as keyof Feature];
      if (isAvailable === undefined) return null;

      const note = feature[`${key}Note` as keyof Feature] as string | undefined;
      return (
        <div key={`${planName}-${i}`} className="flex items-start">
          <div className="mt-0.5 mr-3">
            <FeatureIcon available={isAvailable as boolean} />
          </div>
          <span className={isAvailable ? 'text-gray-800' : 'text-gray-500'}>
            {feature.name}
            {note && <span className="text-[#102E50] font-semibold ml-1">- {note}</span>}
          </span>
        </div>
      );
    });
  }
};

export default PricingTable;
