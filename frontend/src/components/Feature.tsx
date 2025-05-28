'use client'

import React, { useState, useEffect } from 'react';

const features = [
  { number: 1, title: 'Design Records', description: 'Complete design drawings supplied by either AIE or the supplier, depending on design responsibility.' },
  { number: 2, title: 'Ballooned Drawing', description: 'Visual diagrams highlighting all part specifications with corresponding numbered measurements for easy reference.' },
  { number: 3, title: 'Engineering Change Documents', description: 'Formal records such as Engineering Change Notices (ECNs) describing any product or design modifications.' },
  { number: 4, title: 'Customer Engineering Approval', description: 'Pre-PPAP engineering trials and approvals by AIE, typically through temporary deviations and sample testing.' },
  { number: 5, title: 'Design FMEA (DFMEA)', description: 'Risk analysis of potential design failure modes and their effects, signed off by both AIE and the supplier.' },
  { number: 6, title: 'Process Flow Diagram', description: 'Detailed visualization of the entire manufacturing process, including quality checks and handling of non-conforming parts.' },
  { number: 7, title: 'Process FMEA (PFMEA)', description: 'Evaluation of potential failure modes during production with corrective action plans for high-risk issues.' },
  { number: 8, title: 'Control Plans', description: 'Define and document quality control measures for every stage of production.' },
  { number: 9, title: 'Measurement System Analysis (MSA)', description: 'Perform Gage R&R studies and maintain calibration records for critical measurement tools.' },
  { number: 10, title: 'Dimensional Results', description: 'Record actual measurement values and results for all features on the ballooned drawing' },
  { number: 11, title: 'Material & Performance Test Results', description: 'Store DVP&R documents, test outcomes, and material certifications.' },
  { number: 12, title: 'Initial Process Studies', description: 'Generate SPC charts and capability indices to demonstrate process stability' },
  { number: 13, title: 'Qualified Laboratory Documentation', description: 'Attach certifications from accredited labs for all external test results.' },
  { number: 14, title: 'Appearance Approval Report (AAR)', description: 'Submit AAI forms, surface finish tests, and part appearance validations.' },
  { number: 15, title: 'Sample Product', description: 'Manage submission and tracking of physical samples from initial production.' },
  { number: 16, title: 'Master Sample', description: 'Record and store final approved samples for operator training and future reference.' },
  { number: 17, title: 'Checking Aids', description: 'Upload images, calibration data, and dimensional reports for special inspection tools.' },
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
    <div className="mx-auto px-4 py-10" id="features">
      <div className="bg-[#155E95] text-white p-8 md:p-10 text-center mb-8 2xl:rounded">
        <h1 className="text-4xl md:text-4xl font-bold mb-4">
          Core Features of{' '}
          <span className="bg-white text-[#155E95] px-4 py-2 rounded-lg inline-block transform shadow-lg font-black">
            ACE PPAP
          </span>
        </h1>
        <div className="w-32 h-1 bg-white mx-auto rounded-full mt-6"></div>
      </div>

      <div className="container mx-auto">
        <div className="grid gap-6 md:grid-cols-3">
          {visibleFeatures.map((feature) => (
            <div
              key={feature.number}
              className="flex items-start gap-4 p-5 rounded-lg bg-white hover:scale-105 shadow-lg hover:shadow-2xl border border-black/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              <div className="flex-shrink-0 rounded-full border-y-2  text-[#155E95] w-12 h-12 flex items-center justify-center text-xl font-bold">
                {feature.number}
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-1 text-[#102E50]">{feature.title}</h2>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>


        {isMobile && (
          <div className="text-center mt-6">
            <button
              onClick={() => setShowAll(!showAll)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full shadow-md transition"
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
