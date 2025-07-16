'use client';

import { motion } from 'framer-motion';
import { 
  ChartBarIcon,
  TrophyIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline';

interface ProgressOverviewProps {
  data: any;
  getGradeColor: (grade: string) => string;
  getStatusIcon: (status: string) => JSX.Element;
}

export default function ProgressOverview({ data, getGradeColor, getStatusIcon }: ProgressOverviewProps) {
  const calculateTrend = () => {
    const recent = data?.semesterGrades?.slice(-2) || [];
    if (recent.length < 2) return null;
    
    const diff = recent[1].gpa - recent[0].gpa;
    if (Math.abs(diff) < 0.1) return 'stable';
    return diff > 0 ? 'up' : 'down';
  };

  const trend = calculateTrend();

  return (
    <div className="space-y-8">
      {/* GPA Trend Overview */}
      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-capas-turquoise/10 to-capas-ocean/10 rounded-lg p-6"
        >
          <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-4">
            GPA Performance
          </h3>
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-3xl font-bold text-capas-ocean-dark mb-1">
                {data?.currentGPA || '0.0'}
              </div>
              <div className="text-sm text-capas-ocean-dark/70">Current Semester</div>
            </div>
            
            <div className="text-right">
              <div className="text-2xl font-bold text-capas-ocean-dark mb-1">
                {data?.cumulativeGPA || '0.0'}
              </div>
              <div className="text-sm text-capas-ocean-dark/70">Cumulative</div>
            </div>
          </div>

          {trend && (
            <div className={`flex items-center space-x-2 p-3 rounded-lg ${
              trend === 'up' ? 'bg-capas-palm/10 text-capas-palm' :
              trend === 'down' ? 'bg-capas-coral/10 text-capas-coral' :
              'bg-capas-gold/10 text-capas-gold'
            }`}>
              {trend === 'up' ? (
                <ArrowTrendingUpIcon className="h-5 w-5" />
              ) : trend === 'down' ? (
                <ArrowTrendingDownIcon className="h-5 w-5" />
              ) : (
                <ChartBarIcon className="h-5 w-5" />
              )}
              <span className="text-sm font-medium">
                {trend === 'up' ? 'GPA Improved from Last Semester' :
                 trend === 'down' ? 'GPA Decreased from Last Semester' :
                 'GPA Stable'}
              </span>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-capas-gold/10 to-capas-coral/10 rounded-lg p-6"
        >
          <h3 className="font-display text-xl font-semibold text-capas-gold mb-4">
            Credit Progress
          </h3>
          
          <div className="mb-4">
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-3xl font-bold text-capas-ocean-dark">
                {data?.totalCredits || 0}
              </span>
              <span className="text-lg text-capas-ocean-dark/70">
                / {data?.creditsNeeded || 120} credits
              </span>
            </div>
            
            <div className="w-full bg-white rounded-full h-3 mb-2">
              <div 
                className="bg-gradient-to-r from-capas-gold to-capas-coral h-3 rounded-full transition-all duration-1000"
                style={{ width: `${((data?.totalCredits || 0) / (data?.creditsNeeded || 120)) * 100}%` }}
              ></div>
            </div>
            
            <div className="text-sm text-capas-ocean-dark/70">
              {(((data?.totalCredits || 0) / (data?.creditsNeeded || 120)) * 100).toFixed(0)}% Complete
            </div>
          </div>

          <div className="bg-white rounded-lg p-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-capas-ocean-dark/70">This Semester</span>
              <span className="font-medium text-capas-ocean-dark">{data?.creditsThisSemester || 0} credits</span>
            </div>
            <div className="flex items-center justify-between text-sm mt-2">
              <span className="text-capas-ocean-dark/70">Expected Graduation</span>
              <span className="font-medium text-capas-ocean-dark">{data?.expectedGraduation || 'TBD'}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Study Goals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="card-capas p-6"
      >
        <h3 className="font-display text-xl font-semibold text-capas-turquoise mb-4">
          Study Goals & Targets
        </h3>
        
        <div className="space-y-4">
          {(data?.studyGoals || []).map((goal: any, index: number) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="border border-capas-sand-light rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  {getStatusIcon(goal.status)}
                  <div>
                    <h4 className="font-medium text-capas-ocean-dark">{goal.title}</h4>
                    <p className="text-sm text-capas-ocean-dark/70">{goal.target}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-capas-ocean-dark">
                  {goal.progress}%
                </span>
              </div>
              
              <div className="w-full bg-capas-sand-light rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    goal.status === 'on-track' ? 'bg-capas-palm' :
                    goal.status === 'needs-attention' ? 'bg-capas-coral' :
                    'bg-capas-gold'
                  }`}
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="grid md:grid-cols-3 gap-4"
      >
        <button className="p-4 bg-capas-turquoise/10 border border-capas-turquoise/20 rounded-lg hover:shadow-md transition-shadow text-left">
          <h4 className="font-medium text-capas-turquoise mb-2">Schedule Advising</h4>
          <p className="text-sm text-capas-ocean-dark/70">Meet with your academic advisor</p>
        </button>
        
        <button className="p-4 bg-capas-gold/10 border border-capas-gold/20 rounded-lg hover:shadow-md transition-shadow text-left">
          <h4 className="font-medium text-capas-gold mb-2">View Transcript</h4>
          <p className="text-sm text-capas-ocean-dark/70">Download official transcript</p>
        </button>
        
        <button className="p-4 bg-capas-coral/10 border border-capas-coral/20 rounded-lg hover:shadow-md transition-shadow text-left">
          <h4 className="font-medium text-capas-coral mb-2">Degree Audit</h4>
          <p className="text-sm text-capas-ocean-dark/70">Check graduation requirements</p>
        </button>
      </motion.div>
    </div>
  );
}