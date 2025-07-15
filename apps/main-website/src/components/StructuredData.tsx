'use client';

import { useEffect } from 'react';

interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  alternateName?: string;
  url: string;
  logo: string;
  description: string;
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressCountry: string;
    postalCode?: string;
  };
  contactPoint: {
    '@type': string;
    telephone: string;
    email: string;
    contactType: string;
  }[];
  sameAs: string[];
  hasOfferCatalog?: {
    '@type': string;
    name: string;
    itemListElement: {
      '@type': string;
      itemOffered: {
        '@type': string;
        name: string;
        description: string;
        provider: {
          '@type': string;
          name: string;
        };
      };
    }[];
  };
}

interface EducationalOrganizationSchema extends OrganizationSchema {
  '@type': 'EducationalOrganization';
  foundingDate?: string;
  hasCredential?: string[];
  alumniOf?: string[];
  accreditingBody?: string[];
}

interface CourseSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  provider: {
    '@type': string;
    name: string;
    url: string;
  };
  courseCode?: string;
  educationalCredentialAwarded?: string;
  teaches?: string[];
  timeRequired?: string;
  coursePrerequisites?: string;
  courseFee?: {
    '@type': string;
    currency: string;
    value: number;
  };
  availableLanguage?: string[];
  inLanguage?: string;
}

interface EventSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: {
    '@type': string;
    name: string;
    address: {
      '@type': string;
      streetAddress: string;
      addressLocality: string;
      addressCountry: string;
    };
  };
  organizer: {
    '@type': string;
    name: string;
    url: string;
  };
  offers?: {
    '@type': string;
    url: string;
    price: string;
    priceCurrency: string;
    availability: string;
  };
}

interface PersonSchema {
  '@context': string;
  '@type': string;
  name: string;
  jobTitle: string;
  worksFor: {
    '@type': string;
    name: string;
    url: string;
  };
  description?: string;
  knowsAbout?: string[];
  alumniOf?: string[];
  award?: string[];
}

interface StructuredDataProps {
  type: 'organization' | 'course' | 'event' | 'person';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  useEffect(() => {
    // Only run on client side to avoid hydration issues
    if (typeof window === 'undefined') return;
    
    let schema: any = {};

    switch (type) {
      case 'organization':
        schema = createOrganizationSchema(data);
        break;
      case 'course':
        schema = createCourseSchema(data);
        break;
      case 'event':
        schema = createEventSchema(data);
        break;
      case 'person':
        schema = createPersonSchema(data);
        break;
      default:
        return;
    }

    // Use a timeout to ensure DOM is ready and avoid hydration issues
    const timer = setTimeout(() => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify(schema);
      script.id = `structured-data-${type}`;
      
      // Remove existing schema of the same type
      const existing = document.getElementById(`structured-data-${type}`);
      if (existing) {
        existing.remove();
      }
      
      document.head.appendChild(script);
    }, 100);

    return () => {
      clearTimeout(timer);
      const element = document.getElementById(`structured-data-${type}`);
      if (element) {
        element.remove();
      }
    };
  }, [type, data]);

  return null;
}

function createOrganizationSchema(data: any): EducationalOrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'CAPAS Bahamas',
    alternateName: 'Creative Arts, Performance & Academic Studies',
    url: 'https://capas.edu.bs',
    logo: 'https://capas.edu.bs/logo.png',
    description: 'CAPAS Bahamas is a premier creative arts and academic institution in The Bahamas, offering world-class education in music, dance, theatre, and visual arts while celebrating Caribbean cultural heritage.',
    foundingDate: '2016',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'West Bay Street',
      addressLocality: 'Nassau',
      addressCountry: 'Bahamas',
      postalCode: 'N-1234'
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+1-242-123-4567',
        email: 'info@capas.edu.bs',
        contactType: 'General Information'
      },
      {
        '@type': 'ContactPoint',
        telephone: '+1-242-123-4567',
        email: 'admissions@capas.edu.bs',
        contactType: 'Admissions'
      }
    ],
    sameAs: [
      'https://facebook.com/capasbahamas',
      'https://instagram.com/capasbahamas',
      'https://youtube.com/capasbahamas',
      'https://linkedin.com/school/capas-bahamas'
    ],
    hasCredential: [
      'Accredited by Caribbean Education Authority',
      'Member of International Association of Arts Schools'
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'CAPAS Academic Programs',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Full-Time Vocal Performance',
            description: 'Comprehensive vocal training combining classical technique with Caribbean musical traditions',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'CAPAS Bahamas'
            }
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Full-Time Dance Performance',
            description: 'Professional dance training incorporating Caribbean movement traditions and contemporary techniques',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'CAPAS Bahamas'
            }
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Course',
            name: 'Full-Time Theatre Arts',
            description: 'Complete theatrical training covering acting, directing, and Caribbean storytelling',
            provider: {
              '@type': 'EducationalOrganization',
              name: 'CAPAS Bahamas'
            }
          }
        }
      ]
    },
    ...data
  };
}

function createCourseSchema(data: any): CourseSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: data.title || 'CAPAS Course',
    description: data.description || 'Professional arts education course at CAPAS Bahamas',
    provider: {
      '@type': 'EducationalOrganization',
      name: 'CAPAS Bahamas',
      url: 'https://capas.edu.bs'
    },
    courseCode: data.id || data.slug,
    educationalCredentialAwarded: data.credential || 'Certificate of Completion',
    teaches: data.skills || ['Performance', 'Creative Arts', 'Caribbean Culture'],
    timeRequired: data.duration || 'P4Y',
    availableLanguage: ['en'],
    inLanguage: 'en',
    courseFee: data.tuition ? {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: parseFloat(data.tuition.replace(/[^0-9.]/g, '')) || 12000
    } : undefined,
    ...data
  };
}

function createEventSchema(data: any): EventSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: data.title || 'CAPAS Event',
    description: data.description || 'Event at CAPAS Bahamas',
    startDate: data.date || data.startDate,
    endDate: data.endDate,
    location: {
      '@type': 'Place',
      name: data.location || 'CAPAS Bahamas Campus',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'West Bay Street',
        addressLocality: 'Nassau',
        addressCountry: 'Bahamas'
      }
    },
    organizer: {
      '@type': 'EducationalOrganization',
      name: 'CAPAS Bahamas',
      url: 'https://capas.edu.bs'
    },
    offers: data.ticketInfo ? {
      '@type': 'Offer',
      url: 'https://capas.edu.bs/events',
      price: data.ticketInfo.price || '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    } : undefined,
    ...data
  };
}

function createPersonSchema(data: any): PersonSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: `${data.firstName} ${data.lastName}`,
    jobTitle: data.title || 'Faculty Member',
    worksFor: {
      '@type': 'EducationalOrganization',
      name: 'CAPAS Bahamas',
      url: 'https://capas.edu.bs'
    },
    description: data.bio,
    knowsAbout: data.specialization || [],
    award: data.achievements || [],
    ...data
  };
}

// Pre-built schemas for common pages
export const OrganizationStructuredData = () => (
  <StructuredData type="organization" data={{}} />
);

export const ProgramStructuredData = ({ program }: { program: any }) => (
  <StructuredData type="course" data={program} />
);

export const EventStructuredData = ({ event }: { event: any }) => (
  <StructuredData type="event" data={event} />
);

export const FacultyStructuredData = ({ faculty }: { faculty: any }) => (
  <StructuredData type="person" data={faculty} />
);