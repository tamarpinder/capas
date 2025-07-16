'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  UserGroupIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  PencilIcon,
  TrashIcon,
  LockClosedIcon,
  LockOpenIcon,
  EnvelopeIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

export default function AdminUsersPage() {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const users = [
    {
      id: '1',
      name: 'Sophia Chen',
      email: 'sophia.chen@capas.edu.bs',
      role: 'student',
      status: 'active',
      program: 'Music Performance & Production',
      year: 2,
      island: 'New Providence',
      lastLogin: '2024-07-15T14:30:00',
      enrollmentDate: '2023-09-01',
      courses: ['MUS-150', 'MUS-201', 'GEN-101'],
      gpa: 3.7
    },
    {
      id: '2',
      name: 'Marcus Williams',
      email: 'marcus.williams@capas.edu.bs',
      role: 'student',
      status: 'active',
      program: 'Marine Conservation & Arts',
      year: 1,
      island: 'Eleuthera',
      lastLogin: '2024-07-15T16:00:00',
      enrollmentDate: '2024-01-15',
      courses: ['BIO-110', 'ART-105', 'GEN-101'],
      gpa: 3.9
    },
    {
      id: '3',
      name: 'Aaliyah Thompson',
      email: 'aaliyah.thompson@capas.edu.bs',
      role: 'student',
      status: 'attention',
      program: 'Contemporary Dance & Choreography',
      year: 4,
      island: 'Grand Bahama',
      lastLogin: '2024-07-14T10:00:00',
      enrollmentDate: '2022-09-01',
      courses: ['DAN-401', 'DAN-350', 'THE-200'],
      gpa: 3.8
    },
    {
      id: '4',
      name: 'Dr. James Roberts',
      email: 'james.roberts@capas.edu.bs',
      role: 'instructor',
      status: 'active',
      department: 'Music Theory & Composition',
      hireDate: '2019-08-15',
      island: 'New Providence',
      lastLogin: '2024-07-15T12:00:00',
      courses: ['MUS-150', 'MUS-350', 'MUS-450'],
      students: 33
    },
    {
      id: '5',
      name: 'Ms. Sarah McKenzie',
      email: 'sarah.mckenzie@capas.edu.bs',
      role: 'admin',
      status: 'active',
      department: 'Student Affairs',
      hireDate: '2020-01-10',
      island: 'New Providence',
      lastLogin: '2024-07-15T09:00:00',
      permissions: ['user_management', 'registration_approval', 'policy_management']
    },
    {
      id: '6',
      name: 'Prof. Lisa Johnson',
      email: 'lisa.johnson@capas.edu.bs',
      role: 'instructor',
      status: 'inactive',
      department: 'Visual Arts',
      hireDate: '2018-09-01',
      island: 'New Providence',
      lastLogin: '2024-06-30T15:00:00',
      courses: ['ART-101', 'ART-201'],
      students: 0
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <LockOpenIcon className="h-4 w-4 text-capas-palm" />;
      case 'inactive':
        return <LockClosedIcon className="h-4 w-4 text-capas-coral" />;
      case 'attention':
        return <EyeIcon className="h-4 w-4 text-capas-gold" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-capas-palm/10 text-capas-palm';
      case 'inactive':
        return 'bg-capas-coral/10 text-capas-coral';
      case 'attention':
        return 'bg-capas-gold/10 text-capas-gold';
      default:
        return 'bg-capas-ocean/10 text-capas-ocean';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-capas-coral/10 text-capas-coral';
      case 'instructor':
        return 'bg-capas-turquoise/10 text-capas-turquoise';
      case 'student':
        return 'bg-capas-palm/10 text-capas-palm';
      default:
        return 'bg-capas-ocean/10 text-capas-ocean';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const roleStats = {
    students: users.filter(u => u.role === 'student').length,
    instructors: users.filter(u => u.role === 'instructor').length,
    admins: users.filter(u => u.role === 'admin').length,
    total: users.length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-capas-ocean-dark">
            User Management
          </h1>
          <p className="text-capas-ocean-dark/70 mt-1">
            Manage students, instructors, and administrators
          </p>
        </div>
        <button className="btn-capas-primary flex items-center gap-2">
          <PlusIcon className="h-5 w-5" />
          Add User
        </button>
      </div>

      {/* User Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserGroupIcon className="h-8 w-8 text-capas-turquoise" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Total Users</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">{roleStats.total}</p>
            </div>
          </div>
        </div>

        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserGroupIcon className="h-8 w-8 text-capas-palm" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Students</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">{roleStats.students}</p>
            </div>
          </div>
        </div>

        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserGroupIcon className="h-8 w-8 text-capas-coral" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Instructors</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">{roleStats.instructors}</p>
            </div>
          </div>
        </div>

        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserGroupIcon className="h-8 w-8 text-capas-gold" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Administrators</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">{roleStats.admins}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card-capas p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-capas-ocean-dark/50" />
              <input
                type="text"
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="student">Students</option>
              <option value="instructor">Instructors</option>
              <option value="admin">Administrators</option>
            </select>
            
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="attention">Needs Attention</option>
            </select>
          </div>
        </div>
      </div>

      {/* User List */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <div key={user.id} className="card-capas p-6">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="w-12 h-12 bg-gradient-to-br from-capas-turquoise to-capas-ocean rounded-full flex items-center justify-center text-white font-semibold flex-shrink-0">
                {getInitials(user.name)}
              </div>

              {/* User Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-capas-ocean-dark flex items-center gap-2">
                      {user.name}
                      {getStatusIcon(user.status)}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-capas-ocean-dark/70">
                      <span>{user.email}</span>
                      <span>•</span>
                      <span>{user.island}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </div>
                </div>

                {/* Role-specific information */}
                {user.role === 'student' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-capas-ocean-dark mb-1">Academic Info</h4>
                      <p className="text-sm text-capas-turquoise">{user.program}</p>
                      <p className="text-sm text-capas-ocean-dark/70">Year {user.year} • GPA: {user.gpa}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-capas-ocean-dark mb-1">Enrollment</h4>
                      <p className="text-sm text-capas-ocean-dark/70">
                        Started: {new Date(user.enrollmentDate!).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-capas-ocean-dark/70">
                        Courses: {user.courses?.length}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-capas-ocean-dark mb-1">Activity</h4>
                      <p className="text-sm text-capas-ocean-dark/70">
                        Last login: {new Date(user.lastLogin).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}

                {user.role === 'instructor' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-capas-ocean-dark mb-1">Department</h4>
                      <p className="text-sm text-capas-turquoise">{user.department}</p>
                      <p className="text-sm text-capas-ocean-dark/70">
                        Since: {new Date(user.hireDate!).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-capas-ocean-dark mb-1">Teaching Load</h4>
                      <p className="text-sm text-capas-ocean-dark/70">
                        Courses: {user.courses?.length}
                      </p>
                      <p className="text-sm text-capas-ocean-dark/70">
                        Students: {user.students}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-capas-ocean-dark mb-1">Activity</h4>
                      <p className="text-sm text-capas-ocean-dark/70">
                        Last login: {new Date(user.lastLogin).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}

                {user.role === 'admin' && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-capas-ocean-dark mb-1">Department</h4>
                      <p className="text-sm text-capas-turquoise">{user.department}</p>
                      <p className="text-sm text-capas-ocean-dark/70">
                        Since: {new Date(user.hireDate!).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-capas-ocean-dark mb-1">Permissions</h4>
                      <div className="flex flex-wrap gap-1">
                        {user.permissions?.slice(0, 2).map(perm => (
                          <span key={perm} className="px-2 py-1 text-xs bg-capas-ocean/10 text-capas-ocean rounded">
                            {perm.replace('_', ' ')}
                          </span>
                        ))}
                        {(user.permissions?.length || 0) > 2 && (
                          <span className="px-2 py-1 text-xs bg-capas-ocean/10 text-capas-ocean rounded">
                            +{(user.permissions?.length || 0) - 2} more
                          </span>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-capas-ocean-dark mb-1">Activity</h4>
                      <p className="text-sm text-capas-ocean-dark/70">
                        Last login: {new Date(user.lastLogin).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-capas-ocean-light/10">
                  <div className="text-sm text-capas-ocean-dark/70">
                    ID: {user.id}
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-capas-ocean-dark/70 hover:text-capas-turquoise transition-colors">
                      <EyeIcon className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-capas-ocean-dark/70 hover:text-capas-turquoise transition-colors">
                      <EnvelopeIcon className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-capas-ocean-dark/70 hover:text-capas-turquoise transition-colors">
                      <PencilIcon className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-capas-ocean-dark/70 hover:text-capas-coral transition-colors">
                      {user.status === 'active' ? <LockClosedIcon className="h-4 w-4" /> : <LockOpenIcon className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="card-capas p-12 text-center">
          <UserGroupIcon className="h-12 w-12 text-capas-ocean-light mx-auto mb-4" />
          <h3 className="text-lg font-medium text-capas-ocean-dark mb-2">No users found</h3>
          <p className="text-capas-ocean-dark/70">
            Try adjusting your search criteria or filters.
          </p>
        </div>
      )}

      {/* Bulk Actions */}
      <div className="card-capas p-6 bg-capas-sand-light/30">
        <h3 className="font-semibold text-capas-ocean-dark mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="btn-capas-secondary text-sm">
            Export User List
          </button>
          <button className="btn-capas-secondary text-sm">
            Bulk Email Users
          </button>
          <button className="btn-capas-secondary text-sm">
            Generate Reports
          </button>
        </div>
      </div>
    </div>
  );
}