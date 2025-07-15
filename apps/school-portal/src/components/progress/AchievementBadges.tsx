'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface AchievementBadgesProps {
  achievements: string[];
}

export default function AchievementBadges({ achievements }: AchievementBadgesProps) {
  // Extended achievements with Caribbean context
  const allAchievements = [
    ...achievements,
    {
      id: 'junkanoo-performer',
      title: 'Junkanoo Performer',
      description: 'Participated in Junkanoo Festival',
      earnedDate: 'December 2023',
      icon: '🎭',
      color: 'text-capas-coral',
      bgColor: 'bg-capas-coral/10',
      category: 'Cultural'
    },
    {
      id: 'island-scholar',
      title: 'Island Scholar',
      description: 'Excellence in Caribbean Studies',
      earnedDate: 'Fall 2023',
      icon: '🏝️',
      color: 'text-capas-turquoise',
      bgColor: 'bg-capas-turquoise/10',
      category: 'Academic'
    },
    {
      id: 'creative-spirit',
      title: 'Creative Spirit',
      description: 'Outstanding artistic contribution',
      earnedDate: 'Spring 2024',
      icon: '🎨',
      color: 'text-capas-gold',
      bgColor: 'bg-capas-gold/10',
      category: 'Arts'
    }
  ];

  // Locked achievements (future goals)
  const lockedAchievements = [
    {
      id: 'magna-cum-laude',
      title: 'Magna Cum Laude',
      description: 'Maintain 3.8+ GPA through graduation',
      requirement: '3.8+ Cumulative GPA',
      icon: '🎓',
      progress: 85
    },
    {
      id: 'research-excellence',
      title: 'Research Excellence',
      description: 'Complete undergraduate research project',
      requirement: 'Submit Research Paper',
      icon: '🔬',
      progress: 45
    },
    {
      id: 'global-artist',
      title: 'Global Artist',
      description: 'Perform internationally',
      requirement: 'International Performance',
      icon: '🌍',
      progress: 30
    }
  ];

  const categories = ['All', 'Academic', 'Cultural', 'Arts', 'Service'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredAchievements = selectedCategory === 'All' 
    ? allAchievements 
    : allAchievements.filter(a => a.category === selectedCategory);

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-capas-turquoise text-white'
                : 'bg-capas-sand-light text-capas-ocean-dark hover:bg-capas-sand'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Earned Achievements */}
      <div>
        <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-4 flex items-center space-x-2">
          <TrophyIcon className="h-6 w-6" />
          <span>Earned Achievements</span>
          <span className="text-sm font-normal text-capas-ocean-dark/70">
            ({filteredAchievements.length})
          </span>
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className={`${achievement.bgColor} border ${achievement.borderColor || 'border-transparent'} rounded-xl p-6 text-center cursor-pointer hover:shadow-lg transition-all`}
            >
              <div className="text-5xl mb-3">{achievement.icon}</div>
              <h4 className={`font-semibold ${achievement.color} mb-2`}>
                {achievement.title}
              </h4>
              <p className="text-sm text-capas-ocean-dark/80 mb-3">
                {achievement.description}
              </p>
              <div className="flex items-center justify-center space-x-1 text-xs text-capas-ocean-dark/60">
                <StarIcon className="h-3 w-3" />
                <span>Earned {achievement.earnedDate}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Locked Achievements */}
      <div>
        <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-4 flex items-center space-x-2">
          <LightBulbIcon className="h-6 w-6" />
          <span>Future Goals</span>
          <span className="text-sm font-normal text-capas-ocean-dark/70">
            (Locked)
          </span>
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lockedAchievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative bg-gray-100 border border-gray-200 rounded-xl p-6 text-center opacity-80"
            >
              <div className="absolute top-3 right-3">
                <div className="bg-gray-300 text-gray-600 text-xs px-2 py-1 rounded-full">
                  Locked
                </div>
              </div>
              
              <div className="text-5xl mb-3 grayscale opacity-50">{achievement.icon}</div>
              <h4 className="font-semibold text-gray-600 mb-2">
                {achievement.title}
              </h4>
              <p className="text-sm text-gray-500 mb-3">
                {achievement.description}
              </p>
              
              <div className="mb-3">
                <div className="text-xs text-gray-500 mb-1">{achievement.requirement}</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gray-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${achievement.progress}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">{achievement.progress}% Complete</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievement Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-gradient-to-r from-capas-gold/10 to-capas-coral/10 rounded-lg p-6"
      >
        <h4 className="font-display text-lg font-semibold text-capas-gold mb-4 flex items-center space-x-2">
          <FireIcon className="h-5 w-5" />
          <span>Achievement Summary</span>
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-capas-ocean-dark">{allAchievements.length}</div>
            <div className="text-sm text-capas-ocean-dark/70">Total Earned</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-capas-ocean-dark">
              {allAchievements.filter(a => a.category === 'Academic').length}
            </div>
            <div className="text-sm text-capas-ocean-dark/70">Academic</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-capas-ocean-dark">
              {allAchievements.filter(a => a.category === 'Cultural').length}
            </div>
            <div className="text-sm text-capas-ocean-dark/70">Cultural</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-capas-ocean-dark">
              {lockedAchievements.length}
            </div>
            <div className="text-sm text-capas-ocean-dark/70">In Progress</div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center">
          <button className="flex items-center space-x-2 text-capas-gold hover:text-capas-gold/80 font-medium">
            <span>View Achievement History</span>
            <ChevronRightIcon className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}