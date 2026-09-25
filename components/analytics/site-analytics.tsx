"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useEffect, useState } from "react";

const SITE_HOST = "seanportfolio.dothome.co.kr";

export function SiteAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.location.hostname === SITE_HOST);
  }, []);

  if (!gaId || !enabled) {
    return null;
  }

  return <GoogleAnalytics gaId={gaId} />;
}
