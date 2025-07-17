import type { Metadata } from "next";
import { Inter, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import Header from "../components/Header";
import AccessibilityEnhancer from "../components/AccessibilityEnhancer";
import CriticalCSS from "../components/CriticalCSS";
import PerformanceMonitor from "../components/PerformanceMonitor";

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

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://capas.edu.bs'),
  title: "CAPAS Bahamas | Creative Arts, Performance & Academic Studies",
  description: "Where Caribbean culture meets creative innovation. Discover world-class education in the heart of The Bahamas.",
  keywords: ["education", "bahamas", "creative arts", "academic studies", "caribbean", "music", "dance", "theatre", "visual arts"],
  authors: [{ name: "CAPAS Bahamas" }],
  creator: "CAPAS Bahamas",
  publisher: "CAPAS Bahamas",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "CAPAS Bahamas | Creative Arts, Performance & Academic Studies",
    description: "Where Caribbean culture meets creative innovation. Discover world-class education in the heart of The Bahamas.",
    url: "https://capas.edu.bs",
    siteName: "CAPAS Bahamas",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CAPAS Bahamas - Creative Arts Education",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CAPAS Bahamas | Creative Arts, Performance & Academic Studies",
    description: "Where Caribbean culture meets creative innovation",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <head>
        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme Colors */}
        <meta name="theme-color" content="#0891b2" />
        
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Service Worker Registration - Disabled in development */}
        {process.env.NODE_ENV === 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js')
                      .then(function(registration) {
                        console.log('🎯 SW registered: ', registration);
                      })
                      .catch(function(registrationError) {
                        console.log('❌ SW registration failed: ', registrationError);
                      });
                  });
                }
              `,
            }}
          />
        )}
      </head>
      <body className="font-body antialiased bg-capas-ocean-light dark:bg-gray-900 text-capas-ocean-dark dark:text-gray-100 transition-colors duration-300">
        {/* Skip to main content link for screen readers */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-capas-turquoise text-white px-4 py-2 rounded-md z-50 focus:outline-none focus:ring-2 focus:ring-capas-gold"
        >
          Skip to main content
        </a>
        
        <CriticalCSS />
        <PerformanceMonitor enableConsoleLogging={process.env.NODE_ENV === 'development'} />
        <ThemeProvider>
          <AccessibilityEnhancer>
            <Header />
            <main id="main-content" className="pt-20" role="main">
              {children}
            </main>
          </AccessibilityEnhancer>
        </ThemeProvider>
      </body>
    </html>
  );
}
