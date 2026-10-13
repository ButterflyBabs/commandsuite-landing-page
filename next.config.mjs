/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The site now lives at landingpage.lccommandsuite.com. The old Vercel address keeps working by sending every
      // page to the same path on the new one (API routes are left alone so nothing that posts to them breaks).
      // Temporary (307) so it can be changed later without fighting cached permanent redirects.
      {
        source: "/:path((?!api/|_next/).*)",
        has: [{ type: "host", value: "commandsuite-landing-page.vercel.app" }],
        destination: "https://landingpage.lccommandsuite.com/:path",
        permanent: false,
      },
      // /challenge was never built on this site; the live challenge landing page
      // is its own deployment. Temporary (307) so a real /challenge route can be
      // added later without fighting cached permanent redirects.
      {
        source: "/challenge",
        destination: "https://command-shift-landing.vercel.app/",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
