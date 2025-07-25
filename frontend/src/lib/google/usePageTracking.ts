// src/lib/google/usePageTracking.ts for next.js application
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageview as trackGA } from './ga4';

const blockedRoutes = ['/auth', '/admin'];

export const usePageTracking = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (blockedRoutes.some((route) => pathname.startsWith(route))) return;
    trackGA({ page_path: pathname });
  }, [pathname]);
};
