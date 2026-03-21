import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Azat Samat | Marketing Manager",
  description: "Silicon Valley Video Portfolio",
  icons: {
    icon: [{ url: "/tab.png", type: "image/png" }],
    apple: [{ url: "/tab.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable} h-full antialiased dark`}>
      <body className="h-full flex flex-col overflow-hidden">{children}</body>
    </html>
  );
}
