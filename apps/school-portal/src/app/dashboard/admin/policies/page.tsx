'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  DocumentTextIcon,
  PlusIcon,
  PencilIcon,
  EyeIcon,
  ArrowDownTrayIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon,
} from '@heroicons/react/24/outline';

export default function AdminPoliciesPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const policies = [
    {
      id: 'pol-001',
      title: 'Hurricane Emergency Procedures',
      category: 'emergency',
      description: 'Comprehensive procedures for hurricane preparedness and response, including class cancellations and safety protocols.',
      version: '3.2',
      lastUpdated: '2024-06-15T10:00:00',
      status: 'active',
      updatedBy: 'Ms. Sarah McKenzie',
      effectiveDate: '2024-07-01T00:00:00',
      applicableTo: ['students', 'faculty', 'staff'],
      priority: 'high',
      tags: ['hurricane', 'emergency', 'safety', 'weather'],
      documentSize: '245 KB',
      downloads: 1247
    },
    {
      id: 'pol-002',
      title: 'Academic Integrity Policy',
      category: 'academic',
      description: 'Guidelines on academic honesty, plagiarism, cheating, and consequences for academic misconduct.',
      version: '2.1',
      lastUpdated: '2024-05-20T14:30:00',
      status: 'active',
      updatedBy: 'Dr. Patricia Rolle',
      effectiveDate: '2024-06-01T00:00:00',
      applicableTo: ['students', 'faculty'],
      priority: 'high',
      tags: ['academic', 'integrity', 'misconduct', 'plagiarism'],
      documentSize: '189 KB',
      downloads: 2156
    },
    {
      id: 'pol-003',
      title: 'Cultural Expression and Dress Code',
      category: 'student_life',
      description: 'Guidelines for appropriate dress and cultural expression on campus, celebrating Bahamian heritage.',
      version: '1.5',
      lastUpdated: '2024-04-10T09:15:00',
      status: 'active',
      updatedBy: 'Student Affairs Committee',
      effectiveDate: '2024-05-01T00:00:00',
      applicableTo: ['students', 'visitors'],
      priority: 'medium',
      tags: ['dress_code', 'culture', 'expression', 'guidelines'],
      documentSize: '98 KB',
      downloads: 845
    },
    {
      id: 'pol-004',
      title: 'Grade Appeal Process',
      category: 'academic',
      description: 'Step-by-step process for students to appeal grades, including timelines and required documentation.',
      version: '2.0',
      lastUpdated: '2024-03-25T16:45:00',
      status: 'active',
      updatedBy: 'Academic Affairs Office',
      effectiveDate: '2024-04-01T00:00:00',
      applicableTo: ['students', 'faculty'],
      priority: 'medium',
      tags: ['grades', 'appeals', 'process', 'academic'],
      documentSize: '156 KB',
      downloads: 456
    },
    {
      id: 'pol-005',
      title: 'Financial Aid Disbursement Policy',
      category: 'financial',
      description: 'Procedures for financial aid distribution, scholarship maintenance, and refund policies.',
      version: '3.0',
      lastUpdated: '2024-07-01T11:00:00',
      status: 'draft',
      updatedBy: 'Financial Aid Office',
      effectiveDate: '2024-08-01T00:00:00',
      applicableTo: ['students', 'financial_aid'],
      priority: 'high',
      tags: ['financial_aid', 'scholarships', 'disbursement', 'refunds'],
      documentSize: '278 KB',
      downloads: 0
    },
    {
      id: 'pol-006',
      title: 'Campus Sustainability Initiatives',
      category: 'environmental',
      description: 'Environmental policies focused on marine conservation and sustainable practices on campus.',
      version: '1.2',
      lastUpdated: '2024-02-14T13:20:00',
      status: 'under_review',
      updatedBy: 'Environmental Committee',
      effectiveDate: '2024-09-01T00:00:00',
      applicableTo: ['students', 'faculty', 'staff'],
      priority: 'medium',
      tags: ['sustainability', 'environment', 'marine', 'conservation'],
      documentSize: '134 KB',
      downloads: 289
    }
  ];

  const categories = [
    { id: 'academic', name: 'Academic Policies', color: 'text-capas-turquoise' },
    { id: 'emergency', name: 'Emergency Procedures', color: 'text-capas-coral' },
    { id: 'student_life', name: 'Student Life', color: 'text-capas-palm' },
    { id: 'financial', name: 'Financial Policies', color: 'text-capas-gold' },
    { id: 'environmental', name: 'Environmental', color: 'text-capas-ocean' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="h-5 w-5 text-capas-palm" />;
      case 'draft':
        return <PencilIcon className="h-5 w-5 text-capas-gold" />;
      case 'under_review':
        return <ClockIcon className="h-5 w-5 text-capas-turquoise" />;
      case 'archived':
        return <DocumentTextIcon className="h-5 w-5 text-capas-ocean-dark/50" />;
      default:
        return <DocumentTextIcon className="h-5 w-5 text-capas-ocean" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-capas-palm/10 text-capas-palm';
      case 'draft':
        return 'bg-capas-gold/10 text-capas-gold';
      case 'under_review':
        return 'bg-capas-turquoise/10 text-capas-turquoise';
      case 'archived':
        return 'bg-capas-ocean-dark/10 text-capas-ocean-dark/70';
      default:
        return 'bg-capas-ocean/10 text-capas-ocean';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-capas-coral';
      case 'medium':
        return 'border-l-capas-gold';
      case 'low':
        return 'border-l-capas-turquoise';
      default:
        return 'border-l-capas-ocean';
    }
  };

  const getCategoryInfo = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId) || { name: categoryId, color: 'text-capas-ocean' };
  };

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTab = activeTab === 'all' || policy.status === activeTab || policy.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const policyStats = {
    total: policies.length,
    active: policies.filter(p => p.status === 'active').length,
    draft: policies.filter(p => p.status === 'draft').length,
    under_review: policies.filter(p => p.status === 'under_review').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-capas-ocean-dark">
            Policy Management
          </h1>
          <p className="text-capas-ocean-dark/70 mt-1">
            Manage institutional policies and procedures
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-capas-secondary flex items-center gap-2">
            <ArrowDownTrayIcon className="h-5 w-5" />
            Export All
          </button>
          <button className="btn-capas-primary flex items-center gap-2">
            <PlusIcon className="h-5 w-5" />
            New Policy
          </button>
        </div>
      </div>

      {/* Policy Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <DocumentTextIcon className="h-8 w-8 text-capas-turquoise" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Total Policies</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">{policyStats.total}</p>
            </div>
          </div>
        </div>

        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircleIcon className="h-8 w-8 text-capas-palm" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Active</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">{policyStats.active}</p>
            </div>
          </div>
        </div>

        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <PencilIcon className="h-8 w-8 text-capas-gold" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Drafts</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">{policyStats.draft}</p>
            </div>
          </div>
        </div>

        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClockIcon className="h-8 w-8 text-capas-turquoise" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Under Review</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">{policyStats.under_review}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card-capas p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <DocumentTextIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-capas-ocean-dark/50" />
              <input
                type="text"
                placeholder="Search policies by title, description, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Policy Tabs */}
      <div className="border-b border-capas-ocean-light/20">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'all', label: 'All Policies', count: policyStats.total },
            { id: 'active', label: 'Active', count: policyStats.active },
            { id: 'draft', label: 'Drafts', count: policyStats.draft },
            { id: 'under_review', label: 'Under Review', count: policyStats.under_review },
            ...categories.map(cat => ({
              id: cat.id,
              label: cat.name,
              count: policies.filter(p => p.category === cat.id).length
            }))
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

      {/* Policy List */}
      <div className="space-y-4">
        {filteredPolicies.map((policy) => (
          <div key={policy.id} className={`card-capas p-6 border-l-4 ${getPriorityColor(policy.priority)}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-capas-ocean-dark">
                    {policy.title}
                  </h3>
                  {getStatusIcon(policy.status)}
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(policy.status)}`}>
                    {policy.status.replace('_', ' ')}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full bg-capas-ocean/10 ${getCategoryInfo(policy.category).color}`}>
                    {getCategoryInfo(policy.category).name}
                  </span>
                </div>
                
                <p className="text-capas-ocean-dark/70 mb-3 line-clamp-2">
                  {policy.description}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-medium text-capas-ocean-dark mb-1">Document Info</h4>
                    <div className="text-sm text-capas-ocean-dark/70 space-y-1">
                      <div>Version {policy.version}</div>
                      <div>{policy.documentSize}</div>
                      <div>{policy.downloads} downloads</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-capas-ocean-dark mb-1">Timeline</h4>
                    <div className="text-sm text-capas-ocean-dark/70 space-y-1">
                      <div>Updated: {new Date(policy.lastUpdated).toLocaleDateString()}</div>
                      <div>Effective: {new Date(policy.effectiveDate).toLocaleDateString()}</div>
                      <div>By: {policy.updatedBy}</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-capas-ocean-dark mb-1">Applicable To</h4>
                    <div className="flex flex-wrap gap-1">
                      {policy.applicableTo.map(group => (
                        <span key={group} className="px-2 py-1 text-xs bg-capas-turquoise/10 text-capas-turquoise rounded">
                          {group}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-capas-ocean-dark mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {policy.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs bg-capas-sand-light text-capas-ocean-dark rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Special alerts for certain policies */}
                {policy.category === 'emergency' && (
                  <div className="bg-capas-coral/5 border border-capas-coral/20 rounded-lg p-3 mb-4">
                    <div className="flex items-start gap-2">
                      <ExclamationTriangleIcon className="h-5 w-5 text-capas-coral mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-capas-coral">Critical Emergency Policy</p>
                        <p className="text-xs text-capas-coral/70">
                          All faculty and staff should be familiar with these procedures
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-capas-ocean-light/10">
              <div className="text-sm text-capas-ocean-dark/70">
                Policy ID: {policy.id}
              </div>
              <div className="flex items-center gap-2">
                <button className="btn-capas-secondary text-sm flex items-center gap-1">
                  <EyeIcon className="h-4 w-4" />
                  View
                </button>
                <button className="btn-capas-secondary text-sm flex items-center gap-1">
                  <ArrowDownTrayIcon className="h-4 w-4" />
                  Download
                </button>
                <button className="btn-capas-secondary text-sm flex items-center gap-1">
                  <PencilIcon className="h-4 w-4" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredPolicies.length === 0 && (
        <div className="card-capas p-12 text-center">
          <DocumentTextIcon className="h-12 w-12 text-capas-ocean-light mx-auto mb-4" />
          <h3 className="text-lg font-medium text-capas-ocean-dark mb-2">No policies found</h3>
          <p className="text-capas-ocean-dark/70">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      )}

      {/* Policy Categories Overview */}
      <div className="card-capas p-6">
        <h3 className="text-lg font-semibold text-capas-ocean-dark mb-4">Policy Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map(category => (
            <div key={category.id} className="border border-capas-ocean-light/20 rounded-lg p-4">
              <h4 className={`font-medium ${category.color} mb-2`}>{category.name}</h4>
              <p className="text-2xl font-semibold text-capas-ocean-dark">
                {policies.filter(p => p.category === category.id).length}
              </p>
              <p className="text-sm text-capas-ocean-dark/70">
                {policies.filter(p => p.category === category.id && p.status === 'active').length} active
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}