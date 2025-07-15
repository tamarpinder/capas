'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronLeftIcon, 
  ChevronRightIcon,
  ClockIcon,
  MapPinIcon 
} from '@heroicons/react/24/outline';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  type: string;
  location?: string;
  color?: string;
  bgColor?: string;
}

interface CalendarViewProps {
  viewMode: 'month' | 'week' | 'day';
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
  events: CalendarEvent[];
  onEventClick: (event: CalendarEvent) => void;
}

export default function CalendarView({ 
  viewMode, 
  selectedDate, 
  onDateSelect, 
  events, 
  onEventClick 
}: CalendarViewProps) {
  const [currentDate, setCurrentDate] = useState(selectedDate);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weekNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    return events.filter(event => event.date === dateStr);
  };

  // Navigate between periods
  const navigatePeriod = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    
    switch (viewMode) {
      case 'month':
        newDate.setMonth(newDate.getMonth() + (direction === 'next' ? 1 : -1));
        break;
      case 'week':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 7 : -7));
        break;
      case 'day':
        newDate.setDate(newDate.getDate() + (direction === 'next' ? 1 : -1));
        break;
    }
    
    setCurrentDate(newDate);
    onDateSelect(newDate);
  };

  // Get calendar title based on view mode
  const getCalendarTitle = () => {
    switch (viewMode) {
      case 'month':
        return `${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear()}`;
      case 'week':
        const startOfWeek = new Date(currentDate);
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        
        if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
          return `${monthNames[startOfWeek.getMonth()]} ${startOfWeek.getDate()}-${endOfWeek.getDate()}, ${startOfWeek.getFullYear()}`;
        } else {
          return `${monthNames[startOfWeek.getMonth()]} ${startOfWeek.getDate()} - ${monthNames[endOfWeek.getMonth()]} ${endOfWeek.getDate()}, ${startOfWeek.getFullYear()}`;
        }
      case 'day':
        return `${weekNames[currentDate.getDay()]}, ${monthNames[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;
    }
  };

  // Generate calendar days for month view
  const generateMonthCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDateCopy = new Date(startDate);

    for (let week = 0; week < 6; week++) {
      const weekDays = [];
      for (let day = 0; day < 7; day++) {
        const date = new Date(currentDateCopy);
        const isCurrentMonth = date.getMonth() === month;
        const isToday = date.toDateString() === new Date().toDateString();
        const isSelected = date.toDateString() === selectedDate.toDateString();
        const dayEvents = getEventsForDate(date);

        weekDays.push({
          date,
          isCurrentMonth,
          isToday,
          isSelected,
          events: dayEvents
        });

        currentDateCopy.setDate(currentDateCopy.getDate() + 1);
      }
      days.push(weekDays);
    }

    return days;
  };

  // Generate week view
  const generateWeekView = () => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
    
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const isToday = date.toDateString() === new Date().toDateString();
      const isSelected = date.toDateString() === selectedDate.toDateString();
      const dayEvents = getEventsForDate(date);

      days.push({
        date,
        isToday,
        isSelected,
        events: dayEvents
      });
    }

    return days;
  };

  const renderMonthView = () => {
    const calendar = generateMonthCalendar();

    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Header */}
        {dayNames.map(day => (
          <div key={day} className="p-3 text-center text-sm font-medium text-capas-ocean-dark/70">
            {day}
          </div>
        ))}
        
        {/* Calendar Days */}
        {calendar.map((week, weekIndex) => 
          week.map((day, dayIndex) => (
            <motion.div
              key={`${weekIndex}-${dayIndex}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: (weekIndex * 7 + dayIndex) * 0.01 }}
              className={`min-h-[120px] p-2 border border-capas-sand-light cursor-pointer hover:bg-capas-sand-light/50 transition-colors ${
                !day.isCurrentMonth ? 'bg-gray-50' : 'bg-white'
              } ${day.isSelected ? 'ring-2 ring-capas-turquoise' : ''}`}
              onClick={() => onDateSelect(day.date)}
            >
              <div className={`text-sm font-medium mb-2 ${
                day.isToday 
                  ? 'w-6 h-6 bg-capas-turquoise text-white rounded-full flex items-center justify-center'
                  : day.isCurrentMonth 
                    ? 'text-capas-ocean-dark' 
                    : 'text-capas-ocean-dark/40'
              }`}>
                {day.date.getDate()}
              </div>
              
              {/* Events */}
              <div className="space-y-1">
                {day.events.slice(0, 3).map((event, index) => (
                  <div
                    key={event.id}
                    className={`text-xs p-1 rounded truncate cursor-pointer hover:shadow-sm transition-shadow ${
                      event.bgColor || 'bg-capas-turquoise/10'
                    } ${event.color || 'text-capas-turquoise'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEventClick(event);
                    }}
                  >
                    {event.title}
                  </div>
                ))}
                {day.events.length > 3 && (
                  <div className="text-xs text-capas-ocean-dark/60 font-medium">
                    +{day.events.length - 3} more
                  </div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = generateWeekView();

    return (
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`min-h-[400px] p-4 border border-capas-sand-light rounded-lg cursor-pointer hover:shadow-md transition-shadow ${
              day.isSelected ? 'ring-2 ring-capas-turquoise bg-capas-turquoise/5' : 'bg-white'
            }`}
            onClick={() => onDateSelect(day.date)}
          >
            <div className="text-center mb-4">
              <div className="text-sm font-medium text-capas-ocean-dark/70">
                {dayNames[day.date.getDay()]}
              </div>
              <div className={`text-2xl font-bold ${
                day.isToday 
                  ? 'w-10 h-10 bg-capas-turquoise text-white rounded-full flex items-center justify-center mx-auto'
                  : 'text-capas-ocean-dark'
              }`}>
                {day.date.getDate()}
              </div>
            </div>
            
            <div className="space-y-2">
              {day.events.map((event) => (
                <div
                  key={event.id}
                  className={`p-3 rounded-lg cursor-pointer hover:shadow-sm transition-shadow ${
                    event.bgColor || 'bg-capas-turquoise/10'
                  } border ${event.borderColor || 'border-capas-turquoise/20'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEventClick(event);
                  }}
                >
                  <div className="font-medium text-sm text-capas-ocean-dark mb-1">
                    {event.title}
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-capas-ocean-dark/70">
                    <ClockIcon className="h-3 w-3" />
                    <span>{event.time}</span>
                  </div>
                  {event.location && (
                    <div className="flex items-center space-x-2 text-xs text-capas-ocean-dark/70 mt-1">
                      <MapPinIcon className="h-3 w-3" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const renderDayView = () => {
    const dayEvents = getEventsForDate(currentDate);
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="space-y-4">
        <div className="text-center p-6 bg-capas-sand-light rounded-lg">
          <div className="text-3xl font-bold text-capas-ocean-dark mb-2">
            {currentDate.getDate()}
          </div>
          <div className="text-lg text-capas-ocean-dark/80">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </div>
          <div className="text-sm text-capas-ocean-dark/60 mt-2">
            {dayEvents.length} events scheduled
          </div>
        </div>

        <div className="grid gap-3">
          {dayEvents.length > 0 ? (
            dayEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 rounded-lg cursor-pointer hover:shadow-md transition-shadow ${
                  event.bgColor || 'bg-capas-turquoise/10'
                } border ${event.borderColor || 'border-capas-turquoise/20'}`}
                onClick={() => onEventClick(event)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-capas-ocean-dark mb-2">{event.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-capas-ocean-dark/70">
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                      {event.location && (
                        <div className="flex items-center space-x-1">
                          <MapPinIcon className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full bg-white ${event.color || 'text-capas-turquoise'}`}>
                    {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                  </span>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏝️</div>
              <h3 className="text-lg font-medium text-capas-ocean-dark mb-2">
                Free Island Day!
              </h3>
              <p className="text-capas-ocean-dark/70">
                No events scheduled. Perfect for beach study sessions!
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigatePeriod('prev')}
          className="p-2 rounded-lg text-capas-ocean-dark hover:text-capas-turquoise hover:bg-capas-sand-light transition-colors"
        >
          <ChevronLeftIcon className="h-5 w-5" />
        </button>
        
        <h2 className="text-xl font-semibold text-capas-ocean-dark">
          {getCalendarTitle()}
        </h2>
        
        <button
          onClick={() => navigatePeriod('next')}
          className="p-2 rounded-lg text-capas-ocean-dark hover:text-capas-turquoise hover:bg-capas-sand-light transition-colors"
        >
          <ChevronRightIcon className="h-5 w-5" />
        </button>
      </div>

      {/* Calendar Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${viewMode}-${currentDate.getMonth()}-${currentDate.getFullYear()}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {viewMode === 'month' && renderMonthView()}
          {viewMode === 'week' && renderWeekView()}
          {viewMode === 'day' && renderDayView()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}