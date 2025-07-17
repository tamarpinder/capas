'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface DropdownItem {
  name: string;
  href: string;
  description?: string;
  icon?: React.ComponentType<any>;
  color?: string;
  badge?: string;
  isExternal?: boolean;
}

interface DropdownMenuProps {
  title: string;
  items: DropdownItem[];
  className?: string;
  badge?: string;
}

export default function DropdownMenu({ title, items, className = '', badge }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setActiveItem(null);
    }, 150);
  };

  const handleItemHover = (itemName: string) => {
    setActiveItem(itemName);
  };

  const handleItemClick = () => {
    setIsOpen(false);
    setActiveItem(null);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div 
      ref={dropdownRef}
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`flex items-center space-x-1 px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
          isOpen
            ? 'text-capas-turquoise bg-capas-ocean-light shadow-md'
            : 'text-gray-700 hover:text-capas-turquoise hover:bg-capas-ocean-light/50'
        }`}
        onFocus={() => setIsOpen(true)}
        onBlur={() => {
          setTimeout(() => setIsOpen(false), 150);
        }}
      >
        <span className="relative">
          {title}
          {badge && (
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-capas-coral rounded-full"></span>
          )}
        </span>
        <ChevronDownIcon 
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
            style={{ 
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)'
            }}
          >
            <div className="px-3 py-2 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900 text-sm">{title}</h3>
            </div>
            
            <div className="py-2">
              {items.map((item, index) => {
                const isActive = activeItem === item.name;
                const ItemIcon = item.icon;
                
                return (
                  <div key={item.name} className="px-1">
                    {item.isExternal ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 ${
                          isActive 
                            ? 'bg-capas-ocean-light text-capas-turquoise' 
                            : 'hover:bg-capas-ocean-light/50 text-gray-700 hover:text-capas-turquoise'
                        }`}
                        onMouseEnter={() => handleItemHover(item.name)}
                        onClick={handleItemClick}
                      >
                        {ItemIcon && (
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isActive ? 'bg-capas-turquoise' : 'bg-capas-turquoise/10'
                          }`}>
                            <ItemIcon className={`w-4 h-4 ${
                              isActive ? 'text-white' : 'text-capas-turquoise'
                            }`} />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className={`font-medium ${item.color || ''}`}>
                              {item.name}
                            </span>
                            {item.badge && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-capas-coral text-white">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </a>
                    ) : (
                      <Link
                        href={item.href}
                        className={`flex items-start space-x-3 p-3 rounded-lg transition-all duration-200 ${
                          isActive 
                            ? 'bg-capas-ocean-light text-capas-turquoise' 
                            : 'hover:bg-capas-ocean-light/50 text-gray-700 hover:text-capas-turquoise'
                        }`}
                        onMouseEnter={() => handleItemHover(item.name)}
                        onClick={handleItemClick}
                      >
                        {ItemIcon && (
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isActive ? 'bg-capas-turquoise' : 'bg-capas-turquoise/10'
                          }`}>
                            <ItemIcon className={`w-4 h-4 ${
                              isActive ? 'text-white' : 'text-capas-turquoise'
                            }`} />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2">
                            <span className={`font-medium ${item.color || ''}`}>
                              {item.name}
                            </span>
                            {item.badge && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-capas-coral text-white">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}