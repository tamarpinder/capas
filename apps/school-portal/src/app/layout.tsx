import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SessionProvider from "./providers/SessionProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CAPAS School Portal | Student Dashboard",
  description: "Access your academic information, courses, and resources at CAPAS Bahamas.",
  keywords: ["education", "student portal", "bahamas", "capas", "academic"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-body antialiased bg-capas-sand-light text-capas-ocean-dark">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
