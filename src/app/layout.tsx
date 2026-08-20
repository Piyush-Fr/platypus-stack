import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/providers/LenisProvider";

export const metadata: Metadata = {
  title: "Platypus Stack — Web Design & Development Agency",
  description:
    "A four-person creative studio building high-end websites, portfolios, and design systems. We engineer fast, beautiful digital experiences.",
  openGraph: {
    title: "Platypus Stack — Web Design & Development Agency",
    description: "A four-person creative studio building high-end websites, portfolios, and design systems.",
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
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Space+Grotesk:wght@300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#050505] p-2 sm:p-4 md:p-6">
        <div className="bg-[#0A0A0A] min-h-[calc(100vh-16px)] md:min-h-[calc(100vh-48px)] rounded-xl md:rounded-3xl overflow-hidden relative shadow-2xl">
          <LenisProvider>{children}</LenisProvider>
        </div>
      </body>
    </html>
  );
}
