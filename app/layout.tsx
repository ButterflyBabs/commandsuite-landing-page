import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LifeCharter — From a scattered hustle to a soft landing",
  description:
    "Architect-led executive coaching paired with the LifeCharter Command Suite. Find your clarity, then run your business from one integrated system — mission, brand, and finances working as one, on purpose.",
  openGraph: {
    title: "LifeCharter — From a scattered hustle to a soft landing",
    description:
      "Executive coaching plus the Command Suite — one integrated system to build, run, and grow a lasting business legacy.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
