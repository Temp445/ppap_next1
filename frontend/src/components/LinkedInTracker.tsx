// LinkedInTracker.tsx for next.js application
// Require src/types/window.d.ts to define window._linkedin_data_partner_ids and window.lintrk
'use client';
import { useEffect } from 'react';
import Image from 'next/image';

export default function LinkedInTracker({ partnerId }: { partnerId: string }) {
    useEffect(() => {
        if (!partnerId || typeof window === 'undefined') return;

        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        if (!window._linkedin_data_partner_ids.includes(partnerId)) {
            window._linkedin_data_partner_ids.push(partnerId);

            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';

            const partnerScript = document.createElement('script');
            partnerScript.type = 'text/javascript';
            partnerScript.innerHTML = `
        _linkedin_partner_id = "${partnerId}";
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(_linkedin_partner_id);
      `;

            document.head.appendChild(partnerScript);
            document.head.appendChild(script);
        }
    }, [partnerId]);

    return (
        <noscript>
            <Image
                src={`https://px.ads.linkedin.com/collect/?pid=${partnerId}&fmt=gif`}
                alt=""
                width={1}
                height={1}
                style={{ display: 'none' }}
                unoptimized
            />
        </noscript>
    );
}
