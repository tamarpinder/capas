'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import {
  HomeIcon,
  CalendarIcon,
  BookOpenIcon,
  ChartBarIcon,
  BellIcon,
  UserIcon,
  CogIcon,
  ArrowLeftIcon,
  AcademicCapIcon,
  IdentificationIcon,
  UserGroupIcon,
  DocumentTextIcon,
  ClipboardDocumentListIcon,
  PencilSquareIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const studentNavigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Registration', href: '/dashboard/registration', icon: AcademicCapIcon },
  { name: 'Calendar', href: '/dashboard/calendar', icon: CalendarIcon },
  { name: 'Courses', href: '/dashboard/courses', icon: BookOpenIcon },
  { name: 'Progress', href: '/dashboard/progress', icon: ChartBarIcon },
  { name: 'Student ID', href: '/dashboard/student-id', icon: IdentificationIcon },
  { name: 'Notices', href: '/dashboard/notices', icon: BellIcon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: CogIcon },
];

const instructorNavigation = [
  { name: 'Dashboard', href: '/dashboard/instructor', icon: HomeIcon },
  { name: 'My Courses', href: '/dashboard/instructor/courses', icon: AcademicCapIcon },
  { name: 'Students', href: '/dashboard/instructor/students', icon: UserGroupIcon },
  { name: 'Grading', href: '/dashboard/instructor/grading', icon: PencilSquareIcon },
  { name: 'Calendar', href: '/dashboard/calendar', icon: CalendarIcon },
  { name: 'Messages', href: '/dashboard/instructor/messages', icon: ChatBubbleLeftRightIcon },
  { name: 'Reports', href: '/dashboard/instructor/reports', icon: ChartBarIcon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserIcon },
  { name: 'Settings', href: '/dashboard/settings', icon: CogIcon },
];

const adminNavigation = [
  { name: 'Dashboard', href: '/dashboard/admin', icon: HomeIcon },
  { name: 'User Management', href: '/dashboard/admin/users', icon: UserGroupIcon },
  { name: 'Form Approvals', href: '/dashboard/admin/forms', icon: ClipboardDocumentListIcon },
  { name: 'Reports', href: '/dashboard/admin/reports', icon: ChartBarIcon },
  { name: 'System Settings', href: '/dashboard/admin/settings', icon: CogIcon },
  { name: 'Calendar', href: '/dashboard/calendar', icon: CalendarIcon },
  { name: 'Notices', href: '/dashboard/notices', icon: BellIcon },
  { name: 'Policies', href: '/dashboard/admin/policies', icon: DocumentTextIcon },
  { name: 'Profile', href: '/dashboard/profile', icon: UserIcon },
];

interface DashboardSidebarProps {
  isMobileMenuOpen?: boolean;
  onMobileMenuClose?: () => void;
}

export default function DashboardSidebar({ isMobileMenuOpen = false, onMobileMenuClose }: DashboardSidebarProps = {}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { data: session } = useSession();

  // Get navigation based on user role
  const getNavigation = () => {
    const userRole = session?.user?.role;
    switch (userRole) {
      case 'admin':
        return adminNavigation;
      case 'instructor':
        return instructorNavigation;
      case 'student':
      default:
        return studentNavigation;
    }
  };

  const navigation = getNavigation();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`hidden lg:flex lg:flex-col lg:fixed lg:top-[72px] lg:bottom-0 ${collapsed ? 'lg:w-16' : 'lg:w-64'} transition-all duration-300`}>
        <div className="flex flex-col flex-grow bg-white border-r border-capas-ocean-light/20 shadow-sm">
          {/* Collapse Button */}
          <div className="flex items-center justify-end p-4">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-lg text-capas-ocean-dark hover:text-capas-turquoise hover:bg-capas-sand-light transition-colors"
            >
              <ArrowLeftIcon className={`h-5 w-5 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 pb-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors
                    ${isActive
                      ? 'bg-capas-turquoise text-white shadow-sm'
                      : 'text-capas-ocean-dark hover:text-capas-turquoise hover:bg-capas-sand-light'
                    }
                  `}
                  title={collapsed ? item.name : undefined}
                >
                  <item.icon className={`h-5 w-5 ${collapsed ? 'mx-auto' : 'mr-3'} flex-shrink-0`} />
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              );
            })}
          </nav>

          {/* Back to Main Site */}
          {!collapsed && (
            <div className="p-4 border-t border-capas-ocean-light/20">
              <a
                href="https://capas.netlify.app/"
                className="flex items-center px-3 py-2 text-sm text-capas-ocean-dark hover:text-capas-turquoise transition-colors"
              >
                <ArrowLeftIcon className="h-4 w-4 mr-2" />
                Back to Main Site
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-capas-ocean-light/20 shadow-lg z-50">
        <div className="grid grid-cols-4 gap-1 p-2">
          {[navigation[0], navigation[1], navigation[2], navigation[5]].map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex flex-col items-center py-2 px-1 rounded-lg text-xs font-medium transition-colors
                  ${isActive
                    ? 'text-capas-turquoise bg-capas-turquoise/10'
                    : 'text-capas-ocean-dark hover:text-capas-turquoise'
                  }
                `}
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span className="truncate">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
            onClick={onMobileMenuClose}
            aria-hidden="true"
          />
          
          {/* Sliding Menu */}
          <div className="lg:hidden fixed inset-y-0 left-0 w-72 bg-white shadow-xl z-50 transform transition-transform">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-capas-ocean-light/20">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-capas-turquoise rounded-full flex items-center justify-center">
                    <span className="text-white font-display font-bold text-sm">C</span>
                  </div>
                  <h2 className="font-display text-lg font-bold text-capas-turquoise">CAPAS Portal</h2>
                </div>
                <button
                  onClick={onMobileMenuClose}
                  className="p-2 rounded-md text-capas-ocean-dark hover:text-capas-turquoise transition-colors"
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* User Info */}
              <div className="p-4 border-b border-capas-ocean-light/20">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-capas-turquoise rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {session?.user?.name ? session.user.name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-capas-ocean-dark">
                      {session?.user?.name || 'User'}
                    </div>
                    <div className="text-xs text-capas-ocean-dark/70">
                      {session?.user?.email}
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={onMobileMenuClose}
                      className={`
                        flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-colors
                        ${isActive
                          ? 'bg-capas-turquoise text-white shadow-sm'
                          : 'text-capas-ocean-dark hover:text-capas-turquoise hover:bg-capas-sand-light'
                        }
                      `}
                    >
                      <item.icon className="h-5 w-5 mr-3 flex-shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Footer Actions */}
              <div className="p-4 border-t border-capas-ocean-light/20 space-y-2">
                {/* Quick Links */}
                <Link
                  href="https://capas.netlify.app/"
                  onClick={onMobileMenuClose}
                  className="flex items-center px-3 py-2 text-sm text-capas-ocean-dark hover:text-capas-turquoise transition-colors"
                >
                  <ArrowLeftIcon className="h-4 w-4 mr-2" />
                  Back to Main Site
                </Link>
                
                <Link
                  href="http://localhost:4001"
                  target="_blank"
                  onClick={onMobileMenuClose}
                  className="flex items-center px-3 py-2 text-sm text-capas-turquoise hover:text-capas-turquoise-dark transition-colors"
                >
                  <span className="mr-2">🎨</span>
                  Creatives Hub
                </Link>

                {/* Sign Out */}
                <button
                  onClick={() => {
                    onMobileMenuClose?.();
                    signOut({ callbackUrl: '/auth/signin' });
                  }}
                  className="flex items-center w-full px-3 py-2 text-sm text-capas-coral hover:bg-capas-coral/10 transition-colors rounded-md"
                >
                  <ArrowRightOnRectangleIcon className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}