'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  ClipboardDocumentListIcon,
  PencilIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  FunnelIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';

export default function InstructorGradingPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedCourse, setSelectedCourse] = useState('all');

  const assignments = [
    {
      id: 'assign-1',
      title: 'Caribbean Rhythm Analysis',
      course: 'MUS-150',
      courseName: 'Music Theory & Composition',
      dueDate: '2024-07-10',
      submittedDate: '2024-07-10',
      submissions: 15,
      totalStudents: 18,
      pending: 3,
      graded: 12,
      type: 'Essay',
      points: 100,
      status: 'pending'
    },
    {
      id: 'assign-2',
      title: 'Steel Drum Composition',
      course: 'MUS-201',
      courseName: 'Caribbean Music Production',
      dueDate: '2024-07-08',
      submittedDate: '2024-07-08',
      submissions: 14,
      totalStudents: 15,
      pending: 2,
      graded: 12,
      type: 'Audio Project',
      points: 150,
      status: 'pending'
    },
    {
      id: 'assign-3',
      title: 'Harmony Exercises Set 1',
      course: 'MUS-150',
      courseName: 'Music Theory & Composition',
      dueDate: '2024-07-05',
      submittedDate: '2024-07-05',
      submissions: 18,
      totalStudents: 18,
      pending: 0,
      graded: 18,
      type: 'Written',
      points: 50,
      status: 'completed',
      avgGrade: 87
    },
    {
      id: 'assign-4',
      title: 'Calypso Music History Research',
      course: 'MUS-201',
      courseName: 'Caribbean Music Production',
      dueDate: '2024-07-03',
      submittedDate: '2024-07-03',
      submissions: 15,
      totalStudents: 15,
      pending: 0,
      graded: 15,
      type: 'Research Paper',
      points: 75,
      status: 'completed',
      avgGrade: 92
    }
  ];

  const recentSubmissions = [
    {
      id: 'sub-1',
      student: 'Sophia Chen',
      studentId: 'CAP2024-001',
      assignment: 'Caribbean Rhythm Analysis',
      course: 'MUS-150',
      submittedAt: '2024-07-10T14:30:00',
      status: 'needs_review',
      files: ['rhythm_analysis.pdf', 'audio_examples.mp3']
    },
    {
      id: 'sub-2',
      student: 'Marcus Williams',
      studentId: 'CAP2024-156',
      assignment: 'Steel Drum Composition',
      course: 'MUS-201',
      submittedAt: '2024-07-08T16:45:00',
      status: 'needs_review',
      files: ['steel_drum_track.wav', 'composition_notes.pdf']
    },
    {
      id: 'sub-3',
      student: 'Aaliyah Thompson',
      studentId: 'CAP2022-089',
      assignment: 'Caribbean Rhythm Analysis',
      course: 'MUS-150',
      submittedAt: '2024-07-10T23:45:00',
      status: 'late',
      files: ['late_submission.pdf']
    }
  ];

  const courses = [
    { id: 'MUS-150', name: 'Music Theory & Composition' },
    { id: 'MUS-201', name: 'Caribbean Music Production' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-capas-gold" />;
      case 'completed':
        return <CheckCircleIcon className="h-5 w-5 text-capas-palm" />;
      case 'overdue':
        return <ExclamationTriangleIcon className="h-5 w-5 text-capas-coral" />;
      default:
        return <ClipboardDocumentListIcon className="h-5 w-5 text-capas-turquoise" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-capas-gold/10 text-capas-gold';
      case 'completed':
        return 'bg-capas-palm/10 text-capas-palm';
      case 'overdue':
        return 'bg-capas-coral/10 text-capas-coral';
      case 'needs_review':
        return 'bg-capas-turquoise/10 text-capas-turquoise';
      case 'late':
        return 'bg-capas-coral/10 text-capas-coral';
      default:
        return 'bg-capas-ocean/10 text-capas-ocean';
    }
  };

  const getSubmissionStatusText = (status: string) => {
    switch (status) {
      case 'needs_review':
        return 'Needs Review';
      case 'late':
        return 'Late Submission';
      default:
        return status;
    }
  };

  const filteredAssignments = assignments.filter(assignment => {
    const matchesCourse = selectedCourse === 'all' || assignment.course === selectedCourse;
    const matchesTab = activeTab === 'all' || assignment.status === activeTab;
    return matchesCourse && matchesTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-capas-ocean-dark">
            Grading Center
          </h1>
          <p className="text-capas-ocean-dark/70 mt-1">
            Review and grade student submissions
          </p>
        </div>
      </div>

      {/* Grading Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClockIcon className="h-8 w-8 text-capas-gold" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Pending Grades</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">
                {assignments.reduce((sum, a) => sum + a.pending, 0)}
              </p>
            </div>
          </div>
        </div>

        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-8 w-8 text-capas-palm" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Graded This Week</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">24</p>
            </div>
          </div>
        </div>

        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChartBarIcon className="h-8 w-8 text-capas-turquoise" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Avg Grade</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">89%</p>
            </div>
          </div>
        </div>

        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-8 w-8 text-capas-coral" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Late Submissions</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Filter */}
      <div className="card-capas p-4">
        <div className="flex items-center gap-4">
          <FunnelIcon className="h-5 w-5 text-capas-ocean-dark/70" />
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="px-3 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
          >
            <option value="all">All Courses</option>
            {courses.map(course => (
              <option key={course.id} value={course.id}>{course.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Assignment Tabs */}
      <div className="border-b border-capas-ocean-light/20">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'pending', label: 'Pending', count: assignments.filter(a => a.status === 'pending').length },
            { id: 'completed', label: 'Completed', count: assignments.filter(a => a.status === 'completed').length },
            { id: 'all', label: 'All Assignments', count: assignments.length }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-capas-turquoise text-capas-turquoise'
                  : 'border-transparent text-capas-ocean-dark/70 hover:text-capas-ocean-dark hover:border-capas-ocean-light'
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </nav>
      </div>

      {/* Assignment List */}
      <div className="space-y-4">
        {filteredAssignments.map((assignment) => (
          <div key={assignment.id} className="card-capas p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-capas-ocean-dark">
                    {assignment.title}
                  </h3>
                  {getStatusIcon(assignment.status)}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(assignment.status)}`}>
                    {assignment.status}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-capas-ocean-dark/70 mb-2">
                  <span className="text-capas-turquoise font-medium">{assignment.courseName}</span>
                  <span>•</span>
                  <span>{assignment.type}</span>
                  <span>•</span>
                  <span>{assignment.points} points</span>
                  <span>•</span>
                  <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
              <div>
                <h4 className="text-sm font-medium text-capas-ocean-dark mb-2">Submission Progress</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-capas-ocean-dark/70">Submitted</span>
                    <span className="font-medium text-capas-palm">{assignment.submissions}/{assignment.totalStudents}</span>
                  </div>
                  <div className="w-full bg-capas-sand-light rounded-full h-2">
                    <div 
                      className="bg-capas-palm h-2 rounded-full"
                      style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-capas-ocean-dark mb-2">Grading Progress</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-capas-ocean-dark/70">Graded</span>
                    <span className="font-medium text-capas-turquoise">{assignment.graded}/{assignment.submissions}</span>
                  </div>
                  <div className="w-full bg-capas-sand-light rounded-full h-2">
                    <div 
                      className="bg-capas-turquoise h-2 rounded-full"
                      style={{ width: assignment.submissions > 0 ? `${(assignment.graded / assignment.submissions) * 100}%` : '0%' }}
                    ></div>
                  </div>
                </div>
              </div>

              {assignment.status === 'completed' && assignment.avgGrade && (
                <div>
                  <h4 className="text-sm font-medium text-capas-ocean-dark mb-2">Class Average</h4>
                  <div className="text-2xl font-semibold text-capas-ocean-dark">
                    {assignment.avgGrade}%
                  </div>
                  <div className="text-sm text-capas-ocean-dark/70">
                    {assignment.avgGrade >= 85 ? 'Excellent' : assignment.avgGrade >= 75 ? 'Good' : 'Needs Improvement'}
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-capas-ocean-light/10">
              <div className="flex items-center gap-4">
                {assignment.pending > 0 && (
                  <span className="text-sm text-capas-gold">
                    {assignment.pending} submissions pending review
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-capas-secondary text-sm flex items-center gap-1">
                  <ChartBarIcon className="h-4 w-4" />
                  View Analytics
                </button>
                <button className="btn-capas-primary text-sm flex items-center gap-1">
                  <PencilIcon className="h-4 w-4" />
                  Grade Submissions
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Submissions */}
      <div className="card-capas p-6">
        <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Recent Submissions</h3>
        <div className="space-y-3">
          {recentSubmissions.map((submission) => (
            <div key={submission.id} className="flex items-center justify-between p-4 bg-capas-sand-light/50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-medium text-capas-ocean-dark">{submission.student}</h4>
                  <span className="text-sm text-capas-ocean-dark/70">({submission.studentId})</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(submission.status)}`}>
                    {getSubmissionStatusText(submission.status)}
                  </span>
                </div>
                <div className="text-sm text-capas-ocean-dark/70">
                  {submission.assignment} • {courses.find(c => c.id === submission.course)?.name}
                </div>
                <div className="text-xs text-capas-ocean-dark/50">
                  Submitted: {new Date(submission.submittedAt).toLocaleString()}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-capas-secondary text-sm">
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}