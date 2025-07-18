'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

interface DropdownItem {
  name: string;
  href: string;
  description?: string;
  color?: string;
}

interface DropdownMenuProps {
  title: string;
  items: DropdownItem[];
  className?: string;
  isActive?: boolean;
}

export default function DropdownMenu({ title, items, className = '', isActive = false }: DropdownMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleMouseEnter = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsOpen(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      setFocusedIndex(-1);
    }, 150);
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    if (!isOpen) {
      setFocusedIndex(0);
    }
  }, [isOpen]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'Escape':
        setIsOpen(false);
        setFocusedIndex(-1);
        buttonRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        } else {
          setFocusedIndex(prev => (prev + 1) % items.length);
        }
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setFocusedIndex(prev => prev <= 0 ? items.length - 1 : prev - 1);
        }
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
          itemRefs.current[focusedIndex]?.click();
        } else if (!isOpen) {
          setIsOpen(true);
          setFocusedIndex(0);
        }
        break;
    }
  }, [isOpen, focusedIndex, items.length]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    setFocusedIndex(-1);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [closeDropdown]);

  // Focus management
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.focus();
    }
  }, [focusedIndex, isOpen]);

  return (
    <div
      ref={dropdownRef}
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={buttonRef}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={`flex items-center space-x-1 transition-all duration-200 font-medium font-montserrat focus:outline-none focus:ring-2 focus:ring-capas-turquoise focus:ring-offset-2 rounded-md px-2 py-1 ${
          isActive 
            ? 'text-capas-turquoise font-semibold bg-capas-turquoise/10 border-b-2 border-capas-turquoise' 
            : 'text-capas-ocean-dark hover:text-capas-turquoise dark:text-gray-200 dark:hover:text-capas-turquoise hover:bg-capas-turquoise/5'
        } ${className}`}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label={`${title} menu`}
        id={`dropdown-button-${title.toLowerCase().replace(/\s+/g, '-')}`}
      >
        <span>{title}</span>
        <ChevronDownIcon 
          className={`w-4 h-4 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="absolute left-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-capas-ocean-light/20 dark:border-gray-700 py-2 z-50"
            style={{ transformOrigin: 'top left' }}
            role="menu"
            aria-labelledby={`dropdown-button-${title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className="px-1">
              {items.map((item, index) => (
                <Link
                  key={item.href}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  href={item.href}
                  onClick={closeDropdown}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      closeDropdown();
                      buttonRef.current?.focus();
                    }
                  }}
                  onMouseEnter={() => setFocusedIndex(index)}
                  className={`block px-4 py-3 rounded-md transition-colors duration-200 group focus:outline-none focus:ring-2 focus:ring-capas-turquoise focus:ring-inset ${
                    focusedIndex === index 
                      ? 'bg-capas-sand-light dark:bg-gray-700' 
                      : 'hover:bg-capas-sand-light dark:hover:bg-gray-700'
                  }`}
                  role="menuitem"
                  tabIndex={isOpen ? 0 : -1}
                >
                  <div className={`font-medium transition-colors ${
                    item.color ? item.color : (
                      focusedIndex === index 
                        ? 'text-capas-turquoise' 
                        : 'text-capas-ocean-dark dark:text-gray-200 group-hover:text-capas-turquoise'
                    )
                  }`}>
                    {item.name}
                  </div>
                  {item.description && (
                    <div className="text-sm text-capas-ocean-dark/70 dark:text-gray-400 mt-1">
                      {item.description}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}