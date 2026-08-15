/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
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
