// src/components/PageTracker.tsx for next.js application
'use client';

import { usePageTracking, usePathConversion, useEventConversion } from '@/lib/google';

type Props = {
    conversionLabel?: string; // Optional conversion label for custom tracking
    trackPathConversion?: boolean; // Whether to track path conversions
    trackEventLabels?: Record<string, string>; // Optional label for event tracking
};

export const PageTracker = ({ trackPathConversion = false, conversionLabel = '', trackEventLabels }: Props) => {
    usePageTracking();
    usePathConversion({ trackPathConversion });
    useEventConversion(conversionLabel, trackEventLabels);

    return null;
};
