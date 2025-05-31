'use client';

import React, { useState } from 'react';
import { LuSquareArrowOutUpRight } from 'react-icons/lu';

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
  const features: Feature[] = [
    { name: 'PPAP Limit', Essential: true, EssentialNote: 'Max 10', BasicPlus: true, BasicPlusNote: 'Max 25', premium: true, premiumNote: 'Max 50', enterprise: true, enterpriseNote: 'Unlimited' },
    { name: 'Up to 2 submission per month', Essential: true, BasicPlus: undefined, premium: undefined, enterprise: true },
    { name: '20 submissions per validity period', Essential: undefined, BasicPlus: true, premium: undefined, enterprise: true },
    { name: '50 submissions per validity period', Essential: undefined, BasicPlus: undefined, premium: true, enterprise: true },
    { name: 'Basic download documents', Essential: true, BasicPlus: true, premium: true, enterprise: true },
    { name: 'Efficient Documentation', Essential: true, BasicPlus: true, premium: true, enterprise: true },
    { name: 'Secure Storage', Essential: true, BasicPlus: true, premium: true, enterprise: true },
    { name: 'Export Options', Essential: true, BasicPlus: true, premium: true, enterprise: true },
  ];

  const plans: Plan[] = [
    {
      name: 'Essential',
      desc: 'Perfect for PPAP beginners',
      buttonText: 'Subscribe Now',
      buttonlink: '#',
      buttonClass: 'bg-none border text-gray-800 hover:bg-[#155E95] hover:text-white',
      highlighted: false,
      tag: '',
    },
    {
      name: 'Standard',
      desc: 'Best choice for PPAP users',
      buttonText: 'Subscribe Now',
      buttonlink: '#',
      buttonClass: 'bg-none border text-gray-800 hover:bg-[#155E95] hover:text-white',
      highlighted: true,
      tag: 'Smart Choice',
    },
    {
      name: 'Pro',
      desc: 'Best for PPAP professionals',
      buttonText: 'Subscribe Now',
      buttonlink: '#',
      buttonClass: 'bg-none border text-gray-800 hover:bg-[#155E95] hover:text-white',
      highlighted: false,
      tag: 'Max level',
    },
    {
      name: 'Enterprise',
      desc: 'Custom solutions for enterprises',
      buttonText: 'Contact Us',
      buttonlink: '#contact',
      buttonClass: 'bg-none border text-gray-800 hover:bg-[#155E95] hover:text-white',
      highlighted: false,
      tag: 'Custom Plan',
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
        <h1 className="text-2xl md:text-4xl font-bold text-[#102E50] mb-2">Subscription Options</h1>
        <p className="text-lg md:text-3xl text-gray-600 mb-6">Grow smarter with the right solution</p>
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
              <h2 className="text-xl md:text-2xl font-bold text-[#102E50] mb-2">{plan.name}</h2>
              <p className="text-gray-600 mb-4">{plan.desc}</p>

              <div className="mb-6 text-[#155E95] font-extrabold text-2xl md:text-3xl">
                {plan.name !== 'Enterprise' ? (
                  <>
                    ₹{prices[plan.name].toLocaleString()}
                    <span className="text-base md:text-lg font-semibold text-gray-600 ml-1">/Yearly</span>
                  </>
                ) : (
                  <span className="text-lg font-semibold text-gray-600">Custom pricing</span>
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
                  <h3 className="font-semibold text-gray-900 mb-4">Key features:</h3>
                  <ul className="space-y-1 text-gray-700">
                    <li className="flex gap-3"><span className="text-green-600">✓</span>Offers Pro features along with customization options</li>
                    <li className="flex gap-3"><span className="text-green-600">✓</span>Customizable to your exact needs</li>
                    <li className="flex gap-3"><span className="text-green-600">✓</span>Reach out for a solution built around your needs</li>
                  </ul>
                </div>
              )}

              <button
                className="w-full md:hidden bg-[#155E95] text-white py-2 rounded mt-6 font-semibold flex items-center justify-center"
                onClick={() => togglePlanFeatures(plan.name)}
              >
                Features List <LuSquareArrowOutUpRight className="ml-2 text-lg" />
              </button>

              <div className={`mt-6 transition-all duration-300 ${expandedPlans[plan.name] ? 'block' : 'hidden'} md:block`}>
                {plan.name !== 'Enterprise' && (
                  <>
                    <h3 className="font-semibold text-gray-900 mb-4">Key features:</h3>
                    <div className="space-y-2 text-gray-700">
                      {renderFeatureList(features, getFeatureKey(plan.name), plan.name)}
                    </div>
                  </>
                )}

                {plan.name === 'Enterprise' && (
                  <div className="mb-6 mt-6 md:hidden">
                    <h3 className="font-semibold text-gray-900 mb-4">Key features:</h3>
                    <ul className="space-y-1 text-gray-700">
                    <li className="flex gap-3"><span className="text-green-600">✓</span>Offers Pro features along with customization options</li>
                    <li className="flex gap-3"><span className="text-green-600">✓</span>Customizable to your exact needs</li>
                    <li className="flex gap-3"><span className="text-green-600">✓</span>Reach out for a solution built around your needs</li>
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
