'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  EyeIcon,
  DocumentTextIcon,
  UserIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

export default function AdminFormsPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedForm, setSelectedForm] = useState<any>(null);

  const forms = [
    {
      id: 'form-001',
      type: 'course_registration',
      title: 'Course Registration - Fall 2024',
      student: 'Sophia Chen',
      studentId: 'CAP2024-001',
      studentEmail: 'sophia.chen@capas.edu.bs',
      submittedDate: '2024-07-15T14:30:00',
      status: 'pending',
      priority: 'normal',
      courses: [
        { code: 'MUS-301', name: 'Advanced Caribbean Harmony', credits: 3 },
        { code: 'MUS-350', name: 'Music Business', credits: 3 },
        { code: 'GEN-201', name: 'Caribbean Literature', credits: 3 }
      ],
      totalCredits: 9,
      notes: 'Requesting permission for overload (15 credits total)',
      documents: ['transcript.pdf', 'advisor_approval.pdf']
    },
    {
      id: 'form-002',
      type: 'extension_request',
      title: 'Assignment Extension Request',
      student: 'Marcus Williams',
      studentId: 'CAP2024-156',
      studentEmail: 'marcus.williams@capas.edu.bs',
      submittedDate: '2024-07-15T10:15:00',
      status: 'pending',
      priority: 'urgent',
      assignment: 'Marine Biology Final Project',
      course: 'BIO-110',
      originalDue: '2024-07-18T23:59:00',
      requestedDue: '2024-07-25T23:59:00',
      reason: 'Family emergency in Eleuthera - supporting elderly grandmother',
      documents: ['emergency_documentation.pdf'],
      notes: 'Student has been in regular contact with instructor'
    },
    {
      id: 'form-003',
      type: 'grade_appeal',
      title: 'Grade Appeal - MUS-150',
      student: 'Aaliyah Thompson',
      studentId: 'CAP2022-089',
      studentEmail: 'aaliyah.thompson@capas.edu.bs',
      submittedDate: '2024-07-14T16:45:00',
      status: 'under_review',
      priority: 'high',
      course: 'MUS-150',
      instructor: 'Dr. James Roberts',
      originalGrade: 'C+',
      appealedGrade: 'B',
      reason: 'Believes assignment was graded incorrectly due to technical submission issues',
      documents: ['original_submission.pdf', 'technical_error_screenshots.zip'],
      reviewDate: '2024-07-16T14:00:00'
    },
    {
      id: 'form-004',
      type: 'withdrawal_request',
      title: 'Course Withdrawal Request',
      student: 'Jayden Roberts',
      studentId: 'CAP2023-078',
      studentEmail: 'jayden.roberts@capas.edu.bs',
      submittedDate: '2024-07-12T09:30:00',
      status: 'approved',
      priority: 'normal',
      course: 'ART-201',
      reason: 'Schedule conflict with work obligations',
      withdrawalDate: '2024-07-15',
      refundAmount: '$450',
      approvedBy: 'Ms. Sarah McKenzie',
      approvedDate: '2024-07-14T11:00:00'
    },
    {
      id: 'form-005',
      type: 'accommodation_request',
      title: 'Academic Accommodation Request',
      student: 'Kimberly Johnson',
      studentId: 'CAP2024-203',
      studentEmail: 'kimberly.johnson@capas.edu.bs',
      submittedDate: '2024-07-10T13:20:00',
      status: 'rejected',
      priority: 'high',
      accommodationType: 'Extended time for exams',
      reason: 'Learning disability documentation',
      rejectionReason: 'Insufficient medical documentation provided',
      documents: ['medical_form.pdf'],
      rejectedBy: 'Dr. Patricia Rolle',
      rejectedDate: '2024-07-13T15:30:00'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <ClockIcon className="h-5 w-5 text-capas-gold" />;
      case 'under_review':
        return <EyeIcon className="h-5 w-5 text-capas-turquoise" />;
      case 'approved':
        return <CheckCircleIcon className="h-5 w-5 text-capas-palm" />;
      case 'rejected':
        return <XCircleIcon className="h-5 w-5 text-capas-coral" />;
      default:
        return <ClipboardDocumentListIcon className="h-5 w-5 text-capas-ocean" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-capas-gold/10 text-capas-gold';
      case 'under_review':
        return 'bg-capas-turquoise/10 text-capas-turquoise';
      case 'approved':
        return 'bg-capas-palm/10 text-capas-palm';
      case 'rejected':
        return 'bg-capas-coral/10 text-capas-coral';
      default:
        return 'bg-capas-ocean/10 text-capas-ocean';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-capas-coral/10 text-capas-coral border-l-capas-coral';
      case 'high':
        return 'bg-capas-gold/10 text-capas-gold border-l-capas-gold';
      default:
        return 'bg-capas-turquoise/10 text-capas-turquoise border-l-capas-turquoise';
    }
  };

  const getFormTypeIcon = (type: string) => {
    switch (type) {
      case 'course_registration':
        return <ClipboardDocumentListIcon className="h-5 w-5 text-capas-turquoise" />;
      case 'extension_request':
        return <CalendarDaysIcon className="h-5 w-5 text-capas-gold" />;
      case 'grade_appeal':
        return <ExclamationTriangleIcon className="h-5 w-5 text-capas-coral" />;
      case 'withdrawal_request':
        return <XCircleIcon className="h-5 w-5 text-capas-ocean" />;
      case 'accommodation_request':
        return <UserIcon className="h-5 w-5 text-capas-palm" />;
      default:
        return <DocumentTextIcon className="h-5 w-5 text-capas-ocean-dark" />;
    }
  };

  const getFormTypeName = (type: string) => {
    switch (type) {
      case 'course_registration':
        return 'Course Registration';
      case 'extension_request':
        return 'Extension Request';
      case 'grade_appeal':
        return 'Grade Appeal';
      case 'withdrawal_request':
        return 'Withdrawal Request';
      case 'accommodation_request':
        return 'Accommodation Request';
      default:
        return 'Form';
    }
  };

  const filteredForms = forms.filter(form => {
    if (activeTab === 'all') return true;
    return form.status === activeTab;
  });

  const formStats = {
    pending: forms.filter(f => f.status === 'pending').length,
    under_review: forms.filter(f => f.status === 'under_review').length,
    approved: forms.filter(f => f.status === 'approved').length,
    rejected: forms.filter(f => f.status === 'rejected').length,
    total: forms.length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-capas-ocean-dark">
            Form Approvals
          </h1>
          <p className="text-capas-ocean-dark/70 mt-1">
            Review and manage student form submissions
          </p>
        </div>
      </div>

      {/* Form Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClipboardDocumentListIcon className="h-8 w-8 text-capas-turquoise" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Total Forms</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">{formStats.total}</p>
            </div>
          </div>
        </div>

        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClockIcon className="h-8 w-8 text-capas-gold" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Pending</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">{formStats.pending}</p>
            </div>
          </div>
        </div>

        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <EyeIcon className="h-8 w-8 text-capas-turquoise" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Under Review</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">{formStats.under_review}</p>
            </div>
          </div>
        </div>

        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-8 w-8 text-capas-palm" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Approved</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">{formStats.approved}</p>
            </div>
          </div>
        </div>

        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <XCircleIcon className="h-8 w-8 text-capas-coral" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Rejected</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">{formStats.rejected}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Form Tabs */}
      <div className="border-b border-capas-ocean-light/20">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'pending', label: 'Pending', count: formStats.pending },
            { id: 'under_review', label: 'Under Review', count: formStats.under_review },
            { id: 'approved', label: 'Approved', count: formStats.approved },
            { id: 'rejected', label: 'Rejected', count: formStats.rejected },
            { id: 'all', label: 'All Forms', count: formStats.total }
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

      {/* Form List */}
      <div className="space-y-4">
        {filteredForms.map((form) => (
          <div key={form.id} className={`card-capas p-6 border-l-4 ${getPriorityColor(form.priority).split(' ').pop()}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getFormTypeIcon(form.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-capas-ocean-dark">
                      {form.title}
                    </h3>
                    {getStatusIcon(form.status)}
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(form.status)}`}>
                      {form.status.replace('_', ' ')}
                    </span>
                    {form.priority !== 'normal' && (
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(form.priority)}`}>
                        {form.priority}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-capas-ocean-dark/70 mb-2">
                    <span className="font-medium text-capas-turquoise">{form.student}</span>
                    <span>•</span>
                    <span>{form.studentId}</span>
                    <span>•</span>
                    <span>{getFormTypeName(form.type)}</span>
                    <span>•</span>
                    <span>Submitted: {new Date(form.submittedDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form-specific details */}
            <div className="mb-4">
              {form.type === 'course_registration' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-capas-ocean-dark mb-2">Requested Courses</h4>
                    <div className="space-y-1">
                      {form.courses?.map(course => (
                        <div key={course.code} className="text-sm text-capas-ocean-dark/70">
                          {course.code} - {course.name} ({course.credits} credits)
                        </div>
                      ))}
                    </div>
                    <div className="text-sm font-medium text-capas-turquoise mt-2">
                      Total Credits: {form.totalCredits}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-capas-ocean-dark mb-2">Notes</h4>
                    <p className="text-sm text-capas-ocean-dark/70">{form.notes}</p>
                  </div>
                </div>
              )}

              {form.type === 'extension_request' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-capas-ocean-dark mb-2">Assignment Details</h4>
                    <div className="text-sm text-capas-ocean-dark/70 space-y-1">
                      <div><strong>Assignment:</strong> {form.assignment}</div>
                      <div><strong>Course:</strong> {form.course}</div>
                      <div><strong>Original Due:</strong> {new Date(form.originalDue!).toLocaleString()}</div>
                      <div><strong>Requested Due:</strong> {new Date(form.requestedDue!).toLocaleString()}</div>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-capas-ocean-dark mb-2">Reason</h4>
                    <p className="text-sm text-capas-ocean-dark/70">{form.reason}</p>
                  </div>
                </div>
              )}

              {form.type === 'grade_appeal' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium text-capas-ocean-dark mb-2">Grade Details</h4>
                    <div className="text-sm text-capas-ocean-dark/70 space-y-1">
                      <div><strong>Course:</strong> {form.course}</div>
                      <div><strong>Instructor:</strong> {form.instructor}</div>
                      <div><strong>Original Grade:</strong> <span className="text-capas-coral">{form.originalGrade}</span></div>
                      <div><strong>Appealed Grade:</strong> <span className="text-capas-palm">{form.appealedGrade}</span></div>
                      {form.reviewDate && (
                        <div><strong>Review Date:</strong> {new Date(form.reviewDate).toLocaleString()}</div>
                      )}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-capas-ocean-dark mb-2">Appeal Reason</h4>
                    <p className="text-sm text-capas-ocean-dark/70">{form.reason}</p>
                  </div>
                </div>
              )}

              {form.status === 'approved' && form.approvedBy && (
                <div className="bg-capas-palm/5 border border-capas-palm/20 rounded-lg p-3 mt-2">
                  <p className="text-sm text-capas-palm">
                    <strong>Approved by:</strong> {form.approvedBy} on {new Date(form.approvedDate!).toLocaleString()}
                  </p>
                  {form.refundAmount && (
                    <p className="text-sm text-capas-palm">
                      <strong>Refund Amount:</strong> {form.refundAmount}
                    </p>
                  )}
                </div>
              )}

              {form.status === 'rejected' && form.rejectedBy && (
                <div className="bg-capas-coral/5 border border-capas-coral/20 rounded-lg p-3 mt-2">
                  <p className="text-sm text-capas-coral">
                    <strong>Rejected by:</strong> {form.rejectedBy} on {new Date(form.rejectedDate!).toLocaleString()}
                  </p>
                  <p className="text-sm text-capas-coral">
                    <strong>Reason:</strong> {form.rejectionReason}
                  </p>
                </div>
              )}
            </div>

            {/* Documents */}
            {form.documents && form.documents.length > 0 && (
              <div className="mb-4">
                <h4 className="text-sm font-medium text-capas-ocean-dark mb-2">Documents</h4>
                <div className="flex flex-wrap gap-2">
                  {form.documents.map(doc => (
                    <span key={doc} className="px-2 py-1 text-xs bg-capas-turquoise/10 text-capas-turquoise rounded">
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-capas-ocean-light/10">
              <div className="text-sm text-capas-ocean-dark/70">
                Form ID: {form.id}
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setSelectedForm(form)}
                  className="btn-capas-secondary text-sm flex items-center gap-1"
                >
                  <EyeIcon className="h-4 w-4" />
                  View Details
                </button>
                {(form.status === 'pending' || form.status === 'under_review') && (
                  <>
                    <button className="btn-capas-primary text-sm flex items-center gap-1">
                      <CheckCircleIcon className="h-4 w-4" />
                      Approve
                    </button>
                    <button className="bg-capas-coral text-white px-3 py-1 rounded-lg text-sm hover:bg-capas-coral/90 transition-colors flex items-center gap-1">
                      <XCircleIcon className="h-4 w-4" />
                      Reject
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredForms.length === 0 && (
        <div className="card-capas p-12 text-center">
          <ClipboardDocumentListIcon className="h-12 w-12 text-capas-ocean-light mx-auto mb-4" />
          <h3 className="text-lg font-medium text-capas-ocean-dark mb-2">No forms found</h3>
          <p className="text-capas-ocean-dark/70">
            No forms match the selected status filter.
          </p>
        </div>
      )}
    </div>
  );
}