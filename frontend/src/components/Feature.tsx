'use client'

import React, { useState, useEffect } from 'react';

const features = [
  { number: 1, title: 'Design Records', description: 'Complete design drawings supplied by either AIE or the supplier, depending on design responsibility.' },
  { number: 2, title: 'Engineering Change Documents', description: 'Formal records such as Engineering Change Notices (ECNs) describing any product or design modifications.' },
  { number: 3, title: 'Customer Engineering Approval', description: 'Pre-PPAP engineering trials and approvals by AIE, typically through temporary deviations and sample testing.' },
  { number: 4, title: 'Design FMEA', description: 'Risk analysis of potential design failure modes and their effects, signed off by both AIE and the supplier.' },
  { number: 5, title: 'Process Flow', description: 'Detailed visualization of the entire manufacturing process, including quality checks and handling of non-conforming parts.' },
  { number: 6, title: 'Process FMEA', description: 'Evaluation of potential failure modes during production with corrective action plans for high-risk issues.' },
  { number: 7, title: 'Control Plan', description: 'Define and document quality control measures for every stage of production.' },
  { number: 8, title: 'Measurement System Analysis Studies', description: 'Perform Gage R&R studies and maintain calibration records for critical measurement tools.' },
  { number: 9, title: 'Dimensional Results', description: 'Record actual measurement values and results for all features on the ballooned drawing' },
  { number: 10, title: 'Material & Performance Test Results', description: 'Store DVP&R documents, test outcomes, and material certifications.' },
  { number: 11, title: 'Initial Process Studies', description: 'Generate SPC charts and capability indices to demonstrate process stability' },
  { number: 12, title: 'Qualified Laboratory Documentation', description: 'Attach certifications from accredited labs for all external test results.' },
  { number: 13, title: 'Appearance Approval Report (AAR)', description: 'Submit AAI forms, surface finish tests, and part appearance validations.' },
  { number: 14, title: 'Sample Product', description: 'Manage submission and tracking of physical samples from initial production.' },
  { number: 15, title: 'Master Sample', description: 'Record and store final approved samples for operator training and future reference.' },
  { number: 16, title: 'Checking Aids', description: 'Upload images, calibration data, and dimensional reports for special inspection tools.' },
  { number: 17, title: 'Compliance with Customer-Specific Requirements', description: 'Documentation confirming adherence to AIE’s specific testing and validation criteria.' },
  { number: 18, title: 'Part Submission Warrant (PSW)', description: 'Automatically generate PSWs to summarize all submitted documentation and approvals.' },
];

const Feature = () => {
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
          Core Features of{' '}
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
              {showAll ? 'Show Less' : 'Read More'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feature;
