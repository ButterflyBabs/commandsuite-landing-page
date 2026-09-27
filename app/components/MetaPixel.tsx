"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Tracking for the Command Suite landing and MasterClass pages (Babs, 2026-09-27: one pixel and
// one Analytics account for every site). Sends to:
//   - the shared Meta Pixel "AmiLynne Carroll Websites" (business portfolio Sacred Kaleidoscope Community)
//   - this site's original Command Suite pixel (NEXT_PUBLIC_META_PIXEL_ID), kept so nothing set up on it is lost
//   - Google Analytics 4, the shared property (account "Sacred Kaleidoscope Community LLC")
export const SHARED_META_PIXEL_ID = "1084205054362982";
export const GA_MEASUREMENT_ID = "G-EK2T4YVFF4";
const SITE_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function MetaPixel() {
  const pathname = usePathname();
  const first = useRef(true);

  // The snippet counts the first page view; count later in-page navigations here.
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  const inits = [SHARED_META_PIXEL_ID, SITE_PIXEL_ID].filter(Boolean).map((id) => `fbq('init', '${id}');`).join("\n");

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_MEASUREMENT_ID}');`}
      </Script>
      <Script id="meta-pixel-base" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
${inits}
fbq('track', 'PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img height="1" width="1" style={{ display: "none" }} src={`https://www.facebook.com/tr?id=${SHARED_META_PIXEL_ID}&ev=PageView&noscript=1`} alt="" />
      </noscript>
    </>
  );
}
