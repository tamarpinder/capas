'use client';

import Link from 'next/link';

const footerLinks = {
  academic: [
    { name: 'Programs', href: '/programs' },
    { name: 'Faculty', href: '/faculty' },
    { name: 'Student Info', href: '/students' },
    { name: 'Apply', href: '/how-to-apply' },
  ],
  community: [
    { name: 'About Us', href: '/about' },
    { name: 'Alumni', href: '/alumni' },
    { name: 'News & Events', href: '/news' },
    { name: 'Support CAPAS', href: '/support' },
  ],
  resources: [
    { name: 'School Portal', href: '/school-portal' },
    { name: 'Creatives Hub', href: '/creatives-hub' },
    { name: 'Library', href: '#' },
    { name: 'Student Services', href: '#' },
  ],
  legal: [
    { name: 'Governance', href: '/governance' },
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Use', href: '#' },
    { name: 'Contact', href: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="relative bg-capas-ocean-dark text-white overflow-hidden" role="contentinfo" aria-label="Site footer">
      {/* Ocean wave pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg 
          className="w-full h-full object-cover" 
          viewBox="0 0 1440 320" 
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path 
            fill="currentColor" 
            d="M0,160L48,170.7C96,181,192,203,288,213.3C384,224,480,224,576,213.3C672,203,768,181,864,170.7C960,160,1056,160,1152,165.3C1248,171,1344,181,1392,186.7L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* CAPAS Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-capas-turquoise rounded-full flex items-center justify-center">
                <span className="text-white font-display font-bold text-xl">C</span>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white">CAPAS</h3>
                <p className="text-capas-ocean-light text-sm">Bahamas</p>
              </div>
            </div>
            <p className="text-capas-ocean-light text-sm leading-relaxed">
              Creative Arts, Performance & Academic Studies - Where Caribbean culture meets creative innovation.
            </p>
            <div className="mt-6 space-y-2">
              <p className="text-capas-ocean-light text-sm">Nassau, The Bahamas</p>
              <p className="text-capas-ocean-light text-sm">info@capas.edu.bs</p>
              <p className="text-capas-ocean-light text-sm">+1 (242) 123-4567</p>
            </div>
          </div>

          {/* Academic Links */}
          <div>
            <h4 className="font-montserrat text-lg font-semibold text-capas-gold mb-4">Academic</h4>
            <nav aria-label="Academic navigation">
              <ul className="space-y-2">
                {footerLinks.academic.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-capas-ocean-light hover:text-white transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-capas-gold focus:ring-offset-2 focus:ring-offset-capas-ocean-dark rounded-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="font-montserrat text-lg font-semibold text-capas-gold mb-4">Community</h4>
            <nav aria-label="Community navigation">
              <ul className="space-y-2">
                {footerLinks.community.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-capas-ocean-light hover:text-white transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-capas-gold focus:ring-offset-2 focus:ring-offset-capas-ocean-dark rounded-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-montserrat text-lg font-semibold text-capas-gold mb-4">Resources</h4>
            <nav aria-label="Resources navigation">
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-capas-ocean-light hover:text-white transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-capas-gold focus:ring-offset-2 focus:ring-offset-capas-ocean-dark rounded-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-montserrat text-lg font-semibold text-capas-gold mb-4">Information</h4>
            <nav aria-label="Legal and support navigation">
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-capas-ocean-light hover:text-white transition-colors duration-200 text-sm focus:outline-none focus:ring-2 focus:ring-capas-gold focus:ring-offset-2 focus:ring-offset-capas-ocean-dark rounded-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-capas-ocean-light/30">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-capas-ocean-light text-sm">
              © 2024 CAPAS Bahamas. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <nav aria-label="Social media">
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="text-capas-ocean-light hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-capas-gold focus:ring-offset-2 focus:ring-offset-capas-ocean-dark rounded-sm p-1"
                    aria-label="Follow CAPAS on Facebook (opens in new window)"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a 
                    href="#" 
                    className="text-capas-ocean-light hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-capas-gold focus:ring-offset-2 focus:ring-offset-capas-ocean-dark rounded-sm p-1"
                    aria-label="Follow CAPAS on Instagram (opens in new window)"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.017 6.015a5.985 5.985 0 00-5.982-5.982c-3.315 0-6.015 2.7-6.015 6.015 0 3.315 2.7 6.015 6.015 6.015a5.985 5.985 0 005.982-5.982c0-3.315-2.7-6.015-6.015-6.015zM10 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm4.125-10.125a1.25 1.25 0 11-2.5 0 1.25 1.25 0 012.5 0z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}