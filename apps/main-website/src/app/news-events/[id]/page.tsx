'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  CalendarIcon,
  ClockIcon,
  UserIcon,
  TagIcon,
  ShareIcon,
  BookmarkIcon,
  ArrowLeftIcon,
  HeartIcon,
  ChatBubbleLeftIcon,
  EyeIcon,
  PrinterIcon,
  MapPinIcon,
  TicketIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon, BookmarkIcon as BookmarkSolidIcon } from '@heroicons/react/24/solid';
import Footer from '@/components/Footer';
import PlaceholderImage from '@/components/PlaceholderImage';
import newsEventsData from '../../../../mocks/news-events.json';

interface NewsEvent {
  id: string;
  type: 'news' | 'event';
  title: string;
  excerpt: string;
  content: string;
  author?: string;
  publishDate: string;
  category: string;
  tags: string[];
  imageUrl: string;
  featured: boolean;
  
  // Event-specific fields
  date?: string;
  endDate?: string;
  time?: string;
  endTime?: string;
  location?: string;
  venueDetails?: {
    name: string;
    address: string;
    capacity?: number;
    accessibility?: string[];
  };
  ticketInfo?: {
    required: boolean;
    price?: string;
    bookingUrl?: string;
    contactInfo?: string;
  };
  
  // Engagement metrics (mock)
  views: number;
  likes: number;
  comments: number;
  shares: number;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
}

interface NewsEventPageProps {
  params: { id: string };
}

export default function NewsEventPage({ params }: NewsEventPageProps) {
  const [item, setItem] = useState<NewsEvent | null>(null);
  const [relatedItems, setRelatedItems] = useState<NewsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    // Find item by ID in both news articles and events
    const allItems = [
      ...newsEventsData.newsArticles.map(article => ({ ...article, type: 'news' as const })),
      ...newsEventsData.upcomingEvents.map(event => ({ ...event, type: 'event' as const }))
    ];
    
    const foundItem = allItems.find(item => item.id === params.id);
    
    if (!foundItem) {
      notFound();
      return;
    }

    // Add mock engagement data
    const enrichedItem: NewsEvent = {
      ...foundItem,
      views: Math.floor(Math.random() * 2000) + 100,
      likes: Math.floor(Math.random() * 200) + 10,
      comments: Math.floor(Math.random() * 50) + 2,
      shares: Math.floor(Math.random() * 100) + 5,
      content: generateMockContent(foundItem)
    };

    // Find related items (same category, different item)
    const related = allItems
      .filter(relatedItem => 
        relatedItem.category === foundItem.category && 
        relatedItem.id !== foundItem.id
      )
      .slice(0, 3);

    // Generate mock comments
    const mockComments: Comment[] = Array.from({ length: enrichedItem.comments }, (_, i) => ({
      id: `comment-${i}`,
      author: `Student ${i + 1}`,
      content: `This is a great ${foundItem.type}! Looking forward to more updates.`,
      timestamp: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      likes: Math.floor(Math.random() * 20)
    }));

    setTimeout(() => {
      setItem(enrichedItem);
      setRelatedItems(related);
      setComments(mockComments);
      setLoading(false);
    }, 300);
  }, [params.id]);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrolled / maxHeight) * 100, 100);
      setReadingProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generateMockContent = (item: NewsEvent): string => {
    if (item.type === 'event') {
      return `
        <p>Join us for an extraordinary ${item.title.toLowerCase()} that promises to showcase the incredible talent and dedication of our students and faculty.</p>
        
        <h3>Event Highlights</h3>
        <p>This special event will feature performances, workshops, and opportunities to experience the vibrant CAPAS community firsthand. Whether you're a prospective student, current family member, or arts enthusiast, this event offers something special for everyone.</p>
        
        <h3>What to Expect</h3>
        <ul>
          <li>Live performances by our talented students</li>
          <li>Faculty demonstrations and workshops</li>
          <li>Behind-the-scenes campus tours</li>
          <li>Meet and greet with current students and alumni</li>
          <li>Information sessions about our programs</li>
        </ul>
        
        <h3>Schedule of Activities</h3>
        <p>The event will run throughout the day with various activities scheduled at different times. Detailed schedules will be provided upon arrival.</p>
        
        <h3>Accessibility and Accommodations</h3>
        <p>CAPAS is committed to ensuring all guests can fully participate in our events. Please contact us in advance if you require any accommodations.</p>
      `;
    } else {
      return `
        <p>This exciting development represents another milestone in CAPAS's commitment to providing world-class education in the creative arts while maintaining our strong connection to Bahamian culture and heritage.</p>
        
        <h3>Impact on Our Community</h3>
        <p>This news highlights the ongoing success of our programs and the dedication of our faculty, staff, and students. It demonstrates how CAPAS continues to evolve and grow while staying true to our founding mission.</p>
        
        <h3>Looking Forward</h3>
        <p>As we continue to build on this success, we remain focused on providing exceptional educational opportunities that prepare our students for successful careers in the creative arts while celebrating and preserving Caribbean cultural traditions.</p>
        
        <h3>Student and Faculty Response</h3>
        <p>The response from our community has been overwhelmingly positive, with many expressing excitement about the opportunities this creates for current and future students.</p>
        
        <blockquote>
          <p>"This is exactly the kind of innovation and excellence we strive for at CAPAS. It shows our commitment to staying at the forefront of arts education while honoring our roots."</p>
          <footer>— CAPAS Faculty Member</footer>
        </blockquote>
      `;
    }
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (item) {
      setItem({ ...item, likes: item.likes + (isLiked ? -1 : 1) });
    }
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const title = item?.title || '';
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      copy: url
    };

    if (platform === 'copy') {
      navigator.clipboard.writeText(url);
      alert('Link copied to clipboard!');
    } else {
      window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
    }
    
    setShowShareMenu(false);
  };

  const submitComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: `comment-${Date.now()}`,
      author: 'You',
      content: newComment,
      timestamp: new Date().toISOString(),
      likes: 0
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
    if (item) {
      setItem({ ...item, comments: item.comments + 1 });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-capas-sand-light flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-capas-turquoise border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-capas-ocean-dark font-montserrat">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!item) {
    notFound();
  }

  const isEvent = item.type === 'event';
  const eventDate = isEvent && item.date ? new Date(item.date) : null;
  const isUpcoming = eventDate ? eventDate > new Date() : false;

  return (
    <>
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-capas-ocean-light/20 z-50">
        <div 
          className="h-full bg-capas-turquoise transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      <div className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <section className="bg-capas-sand-light py-4 border-b border-capas-ocean-light/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link href="/" className="text-capas-ocean-dark hover:text-capas-turquoise transition-colors">
                    Home
                  </Link>
                </li>
                <span className="text-capas-ocean-dark/50">/</span>
                <li>
                  <Link href="/news-events" className="text-capas-ocean-dark hover:text-capas-turquoise transition-colors">
                    News & Events
                  </Link>
                </li>
                <span className="text-capas-ocean-dark/50">/</span>
                <li className="text-capas-turquoise font-medium truncate">
                  {item.title}
                </li>
              </ol>
            </nav>
          </div>
        </section>

        {/* Back Button */}
        <section className="py-6 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/news-events"
              className="inline-flex items-center text-capas-turquoise hover:text-capas-turquoise-dark transition-colors font-montserrat font-medium"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-2" />
              Back to News & Events
            </Link>
          </div>
        </section>

        {/* Article/Event Header */}
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          {/* Category and Type Badge */}
          <div className="flex items-center space-x-3 mb-6">
            <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
              isEvent 
                ? 'bg-capas-palm text-white' 
                : 'bg-capas-coral text-white'
            }`}>
              {isEvent ? 'Event' : 'News'}
            </span>
            <span className="inline-block bg-capas-sand-light text-capas-ocean-dark px-3 py-1 rounded-full text-sm font-medium capitalize">
              {item.category}
            </span>
            {item.featured && (
              <span className="inline-block bg-capas-gold text-white px-3 py-1 rounded-full text-sm font-semibold">
                Featured
              </span>
            )}
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-montserrat text-3xl md:text-4xl lg:text-5xl font-bold text-capas-turquoise mb-6 leading-tight"
          >
            {item.title}
          </motion.h1>

          {/* Excerpt */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-capas-ocean-dark leading-relaxed mb-8 font-montserrat"
          >
            {item.excerpt}
          </motion.p>

          {/* Meta Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-capas-ocean-light/30"
          >
            
            {/* Date */}
            <div className="flex items-center text-capas-ocean-dark">
              <CalendarIcon className="w-5 h-5 mr-2" />
              <span className="text-sm">
                {isEvent && item.date ? (
                  `${new Date(item.date).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}${item.endDate && item.endDate !== item.date ? 
                    ` - ${new Date(item.endDate).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}` : ''
                  }`
                ) : (
                  new Date(item.publishDate).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })
                )}
              </span>
            </div>

            {/* Time (for events) */}
            {isEvent && item.time && (
              <div className="flex items-center text-capas-ocean-dark">
                <ClockIcon className="w-5 h-5 mr-2" />
                <span className="text-sm">
                  {item.time}{item.endTime && item.endTime !== item.time ? ` - ${item.endTime}` : ''}
                </span>
              </div>
            )}

            {/* Location (for events) */}
            {isEvent && item.location && (
              <div className="flex items-center text-capas-ocean-dark">
                <MapPinIcon className="w-5 h-5 mr-2" />
                <span className="text-sm">{item.location}</span>
              </div>
            )}

            {/* Author (for news) */}
            {!isEvent && item.author && (
              <div className="flex items-center text-capas-ocean-dark">
                <UserIcon className="w-5 h-5 mr-2" />
                <span className="text-sm">By {item.author}</span>
              </div>
            )}

            {/* Engagement Stats */}
            <div className="flex items-center space-x-4 text-capas-ocean-dark/70 text-sm">
              <div className="flex items-center">
                <EyeIcon className="w-4 h-4 mr-1" />
                <span>{item.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center">
                <HeartIcon className="w-4 h-4 mr-1" />
                <span>{item.likes}</span>
              </div>
              <div className="flex items-center">
                <ChatBubbleLeftIcon className="w-4 h-4 mr-1" />
                <span>{item.comments}</span>
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center space-x-4">
              
              {/* Like Button */}
              <button
                onClick={handleLike}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isLiked 
                    ? 'bg-red-500 text-white' 
                    : 'bg-capas-sand-light text-capas-ocean-dark hover:bg-capas-ocean-light'
                }`}
              >
                {isLiked ? (
                  <HeartSolidIcon className="w-5 h-5" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
                <span className="text-sm font-medium">{item.likes}</span>
              </button>

              {/* Bookmark Button */}
              <button
                onClick={handleBookmark}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isBookmarked 
                    ? 'bg-capas-turquoise text-white' 
                    : 'bg-capas-sand-light text-capas-ocean-dark hover:bg-capas-ocean-light'
                }`}
              >
                {isBookmarked ? (
                  <BookmarkSolidIcon className="w-5 h-5" />
                ) : (
                  <BookmarkIcon className="w-5 h-5" />
                )}
                <span className="text-sm font-medium">Save</span>
              </button>

              {/* Share Button */}
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-capas-sand-light text-capas-ocean-dark hover:bg-capas-ocean-light transition-colors duration-200"
                >
                  <ShareIcon className="w-5 h-5" />
                  <span className="text-sm font-medium">Share</span>
                </button>

                {/* Share Dropdown */}
                <AnimatePresence>
                  {showShareMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border border-capas-ocean-light/20 py-2 min-w-48 z-10"
                    >
                      {[
                        { name: 'Facebook', key: 'facebook' },
                        { name: 'Twitter', key: 'twitter' },
                        { name: 'LinkedIn', key: 'linkedin' },
                        { name: 'Copy Link', key: 'copy' }
                      ].map((platform) => (
                        <button
                          key={platform.key}
                          onClick={() => handleShare(platform.key)}
                          className="w-full text-left px-4 py-2 text-sm text-capas-ocean-dark hover:bg-capas-sand-light transition-colors"
                        >
                          {platform.name}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Print Button */}
            <button
              onClick={() => window.print()}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-capas-sand-light text-capas-ocean-dark hover:bg-capas-ocean-light transition-colors duration-200"
            >
              <PrinterIcon className="w-5 h-5" />
              <span className="text-sm font-medium">Print</span>
            </button>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <div className="relative h-64 md:h-96 lg:h-[500px] rounded-xl overflow-hidden shadow-lg">
              <PlaceholderImage
                width={800}
                height={500}
                text={item.title}
                variant="landscape"
                colorScheme={isEvent ? 'palm' : 'turquoise'}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              
              {/* Image Caption */}
              <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white text-sm bg-black/50 rounded-lg px-3 py-2 backdrop-blur-sm">
                  {isEvent ? `${item.title} - ${item.location}` : item.title}
                </p>
              </div>
            </div>
          </motion.div>

          {/* Event-specific Information */}
          {isEvent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-capas-sand-light rounded-xl p-6 mb-8"
            >
              <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-4">
                Event Information
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                
                {/* Venue Details */}
                {item.venueDetails && (
                  <div>
                    <h4 className="font-semibold text-capas-ocean-dark mb-2">Venue</h4>
                    <p className="text-capas-ocean-dark">{item.venueDetails.name}</p>
                    <p className="text-capas-ocean-dark/70 text-sm">{item.venueDetails.address}</p>
                    {item.venueDetails.capacity && (
                      <p className="text-capas-ocean-dark/70 text-sm">
                        Capacity: {item.venueDetails.capacity} people
                      </p>
                    )}
                  </div>
                )}

                {/* Ticket Information */}
                {item.ticketInfo && (
                  <div>
                    <h4 className="font-semibold text-capas-ocean-dark mb-2">Tickets</h4>
                    {item.ticketInfo.required ? (
                      <div>
                        {item.ticketInfo.price && (
                          <p className="text-capas-turquoise font-semibold">{item.ticketInfo.price}</p>
                        )}
                        {item.ticketInfo.bookingUrl && (
                          <a
                            href={item.ticketInfo.bookingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center bg-capas-turquoise hover:bg-capas-turquoise-dark text-white font-semibold px-4 py-2 rounded-lg transition-colors duration-200 mt-2"
                          >
                            <TicketIcon className="w-5 h-5 mr-2" />
                            Book Tickets
                          </a>
                        )}
                      </div>
                    ) : (
                      <p className="text-capas-palm font-semibold">Free Event</p>
                    )}
                  </div>
                )}
              </div>

              {/* Event Status */}
              <div className="mt-6 pt-6 border-t border-capas-ocean-light/30">
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                    isUpcoming 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {isUpcoming ? 'Upcoming Event' : 'Past Event'}
                  </span>
                  
                  {isUpcoming && (
                    <div className="flex items-center text-capas-ocean-dark/70 text-sm">
                      <UsersIcon className="w-4 h-4 mr-1" />
                      <span>Join {Math.floor(Math.random() * 100) + 20} others attending</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="prose prose-lg max-w-none text-capas-ocean-dark mb-12"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-12"
          >
            <h3 className="font-montserrat text-lg font-bold text-capas-turquoise mb-4 flex items-center">
              <TagIcon className="w-5 h-5 mr-2" />
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/news-events?tag=${encodeURIComponent(tag)}`}
                  className="bg-capas-sand-light text-capas-ocean-dark px-3 py-2 rounded-lg text-sm font-medium hover:bg-capas-ocean-light transition-colors duration-200"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Comments Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-12"
          >
            <h3 className="font-montserrat text-2xl font-bold text-capas-turquoise mb-6">
              Comments ({comments.length})
            </h3>

            {/* Comment Form */}
            <div className="bg-capas-sand-light rounded-lg p-6 mb-8">
              <h4 className="font-semibold text-capas-ocean-dark mb-4">Leave a Comment</h4>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-capas-ocean-light/30 focus:ring-2 focus:ring-capas-turquoise focus:border-transparent transition-colors resize-none"
              />
              <div className="flex justify-end mt-4">
                <button
                  onClick={submitComment}
                  disabled={!newComment.trim()}
                  className="bg-capas-turquoise hover:bg-capas-turquoise-dark disabled:bg-capas-ocean-light/50 text-white font-semibold px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  Post Comment
                </button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="bg-white rounded-lg p-6 shadow-sm border border-capas-ocean-light/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-capas-turquoise rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {comment.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-capas-ocean-dark">{comment.author}</p>
                        <p className="text-sm text-capas-ocean-dark/70">
                          {new Date(comment.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 text-capas-ocean-dark/70 text-sm">
                      <HeartIcon className="w-4 h-4" />
                      <span>{comment.likes}</span>
                    </div>
                  </div>
                  <p className="text-capas-ocean-dark leading-relaxed">{comment.content}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </article>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <section className="py-20 bg-capas-sand-light">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="font-montserrat text-3xl font-bold text-capas-turquoise mb-4">
                  Related {isEvent ? 'Events' : 'Articles'}
                </h2>
                <p className="text-xl text-capas-ocean-dark max-w-3xl mx-auto">
                  More from the {item.category} category
                </p>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedItems.map((relatedItem, index) => (
                  <motion.div
                    key={relatedItem.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link href={`/news-events/${relatedItem.id}`} className="block group">
                      <article className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                        <div className="h-48 relative overflow-hidden">
                          <PlaceholderImage
                            width={400}
                            height={192}
                            text={relatedItem.title}
                            variant="landscape"
                            colorScheme={relatedItem.type === 'event' ? 'palm' : 'coral'}
                            className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                          <div className="absolute top-4 left-4">
                            <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                              relatedItem.type === 'event' 
                                ? 'bg-capas-palm text-white' 
                                : 'bg-capas-coral text-white'
                            }`}>
                              {relatedItem.type === 'event' ? 'Event' : 'News'}
                            </span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h3 className="font-montserrat text-xl font-bold text-capas-turquoise mb-2 group-hover:text-capas-turquoise-dark transition-colors line-clamp-2">
                            {relatedItem.title}
                          </h3>
                          <p className="text-capas-ocean-dark mb-4 line-clamp-3">
                            {relatedItem.excerpt}
                          </p>
                          <div className="flex items-center justify-between text-sm text-capas-ocean-dark/70">
                            <span>
                              {relatedItem.type === 'event' && relatedItem.date 
                                ? new Date(relatedItem.date).toLocaleDateString()
                                : new Date(relatedItem.publishDate).toLocaleDateString()
                              }
                            </span>
                            <span className="text-capas-turquoise font-medium group-hover:translate-x-1 transition-transform duration-200">
                              Read More →
                            </span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        <Footer />
      </div>
    </>
  );
}