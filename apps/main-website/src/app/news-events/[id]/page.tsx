import { notFound } from 'next/navigation';
import newsEventsData from '../../../../mocks/news-events.json';
import NewsEventClient from './NewsEventClient';

interface BaseItem {
  id: string;
  type: 'news' | 'event';
  title: string;
  category: string;
  featured: boolean;
}

interface News extends BaseItem {
  type: 'news';
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  imageUrl: string;
}

interface Event extends BaseItem {
  type: 'event';
  description: string;
  date: string;
  time: string;
  location: string;
  registrationRequired: boolean;
  contactInfo: string;
}

type NewsEvent = News | Event;

interface NewsEventPageProps {
  params: { id: string };
}

function generateMockContent(item: NewsEvent): string {
  if (item.type === 'event') {
    return `
      <p>Join us for an extraordinary ${item.title.toLowerCase()} that promises to showcase the incredible talent and dedication of our students and faculty.</p>
      // ... rest of event content ...
    `;
  } else {
    return `
      <p>This exciting development represents another milestone in CAPAS's commitment to providing world-class education in the creative arts while maintaining our strong connection to Bahamian culture and heritage.</p>
      // ... rest of news content ...
    `;
  }
}

export default function NewsEventPage({ params }: NewsEventPageProps) {
  // Server-side data fetching
  const allItems = [
    ...newsEventsData.newsArticles.map(article => ({ ...article, type: 'news' as const })),
    ...newsEventsData.upcomingEvents.map(event => ({ ...event, type: 'event' as const }))
  ];
  
  const foundItem = allItems.find(item => item.id === params.id);
  if (!foundItem) {
    notFound();
    return null;
  }
  
  const enrichedItem: NewsEvent & { views: number; likes: number; comments: number; shares: number; content: string; } = {
    ...foundItem,
    views: Math.floor(Math.random() * 2000) + 100,
    likes: Math.floor(Math.random() * 200) + 10,
    comments: Math.floor(Math.random() * 50) + 2,
    shares: Math.floor(Math.random() * 100) + 5,
    content: generateMockContent(foundItem as NewsEvent)
  };
  
  // Find related
  const related = allItems
    .filter(relatedItem => relatedItem.category === foundItem.category && relatedItem.id !== foundItem.id)
    .slice(0, 3);
  
  return <NewsEventClient item={enrichedItem} relatedItems={related} params={params} />;
}

export function generateStaticParams() {
  const allItems = [
    ...newsEventsData.newsArticles.map(article => ({ id: article.id })),
    ...newsEventsData.upcomingEvents.map(event => ({ id: event.id }))
  ];
  return allItems;
}