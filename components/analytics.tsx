"use client";

import { useEffect } from "react";
import Script from "next/script";

export function Analytics() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    // Track page views
    const trackPageView = () => {
      if (window.plausible) {
        window.plausible("pageview");
      }
    };

    trackPageView();
  }, []);

  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  if (!plausibleDomain || process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Script
      data-domain={plausibleDomain}
      src="https://plausible.io/js/script.js"
      strategy="afterInteractive"
    />
  );
}

declare global {
  interface Window {
    plausible?: (event: string, props?: Record<string, unknown>) => void;
  }
}







