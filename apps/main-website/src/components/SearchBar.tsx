'use client';

import GlobalSearch from './GlobalSearch';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  showRecentSearches?: boolean;
  showPopularSearches?: boolean;
  maxResults?: number;
}

export default function SearchBar({ 
  placeholder = "Search CAPAS...", 
  className = "",
  showRecentSearches = true,
  showPopularSearches = true,
  maxResults = 6
}: SearchBarProps) {
  return (
    <GlobalSearch
      className={className}
      placeholder={placeholder}
      showRecentSearches={showRecentSearches}
      showPopularSearches={showPopularSearches}
      maxResults={maxResults}
    />
  );
}