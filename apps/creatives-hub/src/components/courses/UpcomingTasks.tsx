'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CreativeCourse } from '@/types/moodle';
import {
  ClockIcon,
  ExclamationTriangleIcon,
  BookOpenIcon,
  CheckCircleIcon,
  CalendarIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface UpcomingTasksProps {
  courses: CreativeCourse[];
}

interface TaskItem {
  id: string;
  title: string;
  courseTitle: string;
  courseColor: string;
  dueDate: string;
  priority: 'high' | 'medium' | 'low';
  type: 'assignment' | 'quiz' | 'project' | 'discussion';
  status: 'pending' | 'in_progress' | 'submitted';
  progress?: number;
}

const UpcomingTasks = ({ courses }: UpcomingTasksProps) => {
  const [filter, setFilter] = useState<'all' | 'urgent' | 'thisweek'>('all');

  const extractTasks = (): TaskItem[] => {
    const tasks: TaskItem[] = [];
    
    courses.forEach(course => {
      course.assignments?.forEach(assignment => {
        if (assignment.status !== 'completed' && assignment.dueDate) {
          const dueDate = new Date(assignment.dueDate);
          const now = new Date();
          const diffTime = dueDate.getTime() - now.getTime();
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          let priority: 'high' | 'medium' | 'low' = 'medium';
          if (diffDays <= 1) priority = 'high';
          else if (diffDays <= 3) priority = 'medium';
          else priority = 'low';

          tasks.push({
            id: `${course.id}-${assignment.id}`,
            title: assignment.title,
            courseTitle: course.title,
            courseColor: course.color,
            dueDate: assignment.dueDate,
            priority,
            type: assignment.type as any || 'assignment',
            status: assignment.status as any,
            progress: assignment.progress
          });
        }
      });
    });

    return tasks.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  };

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { text: 'Overdue', urgent: true };
    if (diffDays === 0) return { text: 'Due today', urgent: true };
    if (diffDays === 1) return { text: 'Due tomorrow', urgent: true };
    if (diffDays <= 7) return { text: `Due in ${diffDays} days`, urgent: false };
    
    return { 
      text: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      }), 
      urgent: false 
    };
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'assignment': return BookOpenIcon;
      case 'quiz': return CheckCircleIcon;
      case 'project': return BookOpenIcon;
      case 'discussion': return BookOpenIcon;
      default: return BookOpenIcon;
    }
  };

  const getPriorityColor = (priority: string, urgent: boolean) => {
    if (urgent) return 'text-capas-coral';
    switch (priority) {
      case 'high': return 'text-capas-coral';
      case 'medium': return 'text-capas-gold';
      case 'low': return 'text-capas-turquoise';
      default: return 'text-capas-turquoise';
    }
  };

  const allTasks = extractTasks();
  
  const filteredTasks = allTasks.filter(task => {
    const dueDate = new Date(task.dueDate);
    const now = new Date();
    const diffDays = Math.ceil((dueDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    switch (filter) {
      case 'urgent':
        return diffDays <= 2;
      case 'thisweek':
        return diffDays <= 7;
      default:
        return true;
    }
  });

  return (
    <div className="creative-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display text-xl font-semibold text-capas-turquoise">
          Upcoming Tasks
        </h3>
        <div className="flex items-center space-x-1 text-xs">
          {['all', 'urgent', 'thisweek'].map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType as any)}
              className={`px-2 py-1 rounded-md transition-colors ${
                filter === filterType
                  ? 'bg-capas-turquoise text-white'
                  : 'text-capas-ocean-dark hover:bg-capas-sand-light'
              }`}
            >
              {filterType === 'thisweek' ? 'This Week' : filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        <AnimatePresence mode="wait">
          {filteredTasks.length > 0 ? (
            filteredTasks.slice(0, 8).map((task, index) => {
              const dueDateInfo = formatDueDate(task.dueDate);
              const TypeIcon = getTypeIcon(task.type);

              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="group flex items-start space-x-3 p-3 bg-capas-sand-light rounded-lg hover:bg-white transition-colors cursor-pointer"
                >
                  {/* Priority Indicator */}
                  <div className="flex-shrink-0 mt-1">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: task.courseColor }}
                    />
                  </div>

                  {/* Task Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-capas-ocean-dark text-sm line-clamp-1 group-hover:text-capas-turquoise transition-colors">
                          {task.title}
                        </h4>
                        <p className="text-xs text-capas-ocean-dark/70 mt-1">
                          {task.courseTitle}
                        </p>
                        
                        {/* Progress bar for in-progress tasks */}
                        {task.status === 'in_progress' && task.progress !== undefined && (
                          <div className="mt-2">
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="text-capas-ocean-dark/70">Progress</span>
                              <span className="font-medium">{task.progress}%</span>
                            </div>
                            <div className="w-full bg-capas-ocean-light/30 rounded-full h-1">
                              <motion.div
                                className="h-1 rounded-full"
                                style={{ backgroundColor: task.courseColor }}
                                initial={{ width: 0 }}
                                animate={{ width: `${task.progress}%` }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Due Date and Status */}
                      <div className="flex flex-col items-end space-y-1">
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="w-3 h-3 text-capas-ocean-dark/60" />
                          <span className={`text-xs font-medium ${getPriorityColor(task.priority, dueDateInfo.urgent)}`}>
                            {dueDateInfo.text}
                          </span>
                        </div>
                        
                        {/* Task Type Icon */}
                        <div className="flex items-center space-x-1">
                          <TypeIcon className="w-3 h-3 text-capas-ocean-dark/60" />
                          <span className="text-xs text-capas-ocean-dark/60 capitalize">
                            {task.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="flex items-center justify-between mt-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        task.status === 'pending' ? 'bg-capas-sand text-capas-ocean-dark' :
                        task.status === 'in_progress' ? 'bg-capas-gold/20 text-capas-gold' :
                        'bg-capas-turquoise/20 text-capas-turquoise'
                      }`}>
                        {task.status === 'pending' ? 'Not Started' :
                         task.status === 'in_progress' ? 'In Progress' :
                         'Submitted'}
                      </span>
                      
                      {dueDateInfo.urgent && (
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <ExclamationTriangleIcon className="w-4 h-4 text-capas-coral" />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Arrow indicator */}
                  <ChevronRightIcon className="w-4 h-4 text-capas-ocean-dark/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <div className="text-4xl mb-3">🎯</div>
              <p className="text-capas-ocean-dark font-medium mb-1">All caught up!</p>
              <p className="text-sm text-capas-ocean-dark/70">
                No upcoming tasks in this timeframe
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredTasks.length > 8 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center pt-3 border-t border-capas-ocean-light/30"
          >
            <button className="text-sm text-capas-turquoise hover:text-capas-turquoise-dark font-medium">
              View all {filteredTasks.length} tasks →
            </button>
          </motion.div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-capas-ocean-light/30">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div>
            <div className="text-lg font-bold text-capas-coral">
              {allTasks.filter(t => formatDueDate(t.dueDate).urgent).length}
            </div>
            <div className="text-xs text-capas-ocean-dark/70">Urgent</div>
          </div>
          <div>
            <div className="text-lg font-bold text-capas-gold">
              {allTasks.filter(t => t.status === 'in_progress').length}
            </div>
            <div className="text-xs text-capas-ocean-dark/70">In Progress</div>
          </div>
          <div>
            <div className="text-lg font-bold text-capas-turquoise">
              {allTasks.length}
            </div>
            <div className="text-xs text-capas-ocean-dark/70">Total</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingTasks;