'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import {
  ChatBubbleLeftRightIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  UserGroupIcon,
  ExclamationCircleIcon,
  ClockIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

export default function InstructorMessagesPage() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('inbox');
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [selectedRecipient, setSelectedRecipient] = useState('');

  const messages = [
    {
      id: '1',
      from: 'Sophia Chen',
      fromEmail: 'sophia.chen@capas.edu.bs',
      subject: 'Question about Caribbean Rhythm Assignment',
      preview: 'Hi Dr. Roberts, I have a question about the rhythm patterns in...',
      timestamp: '2024-07-15T14:30:00',
      read: false,
      priority: 'normal',
      course: 'MUS-150',
      type: 'student_inquiry'
    },
    {
      id: '2',
      from: 'Marcus Williams',
      fromEmail: 'marcus.williams@capas.edu.bs',
      subject: 'Thank you for the feedback',
      preview: 'Thank you for the detailed feedback on my composition. I will...',
      timestamp: '2024-07-15T10:15:00',
      read: true,
      priority: 'normal',
      course: 'MUS-201',
      type: 'student_response'
    },
    {
      id: '3',
      from: 'Aaliyah Thompson',
      fromEmail: 'aaliyah.thompson@capas.edu.bs',
      subject: 'Request for Extension - Family Emergency',
      preview: 'Dear Professor, due to a family emergency in Freeport, I need to...',
      timestamp: '2024-07-14T16:45:00',
      read: false,
      priority: 'urgent',
      course: 'MUS-150',
      type: 'extension_request'
    },
    {
      id: '4',
      from: 'CAPAS Administration',
      fromEmail: 'admin@capas.edu.bs',
      subject: 'Hurricane Season Preparedness Update',
      preview: 'Important updates regarding hurricane season protocols and...',
      timestamp: '2024-07-14T09:00:00',
      read: true,
      priority: 'high',
      course: null,
      type: 'administrative'
    }
  ];

  const conversations = [
    {
      id: 'conv-1',
      participant: 'Sophia Chen',
      lastMessage: 'Thank you for clarifying that!',
      timestamp: '2024-07-15T15:20:00',
      unread: 2,
      course: 'MUS-150'
    },
    {
      id: 'conv-2',
      participant: 'Marcus Williams',
      lastMessage: 'I understand the assignment now.',
      timestamp: '2024-07-15T11:30:00',
      unread: 0,
      course: 'MUS-201'
    }
  ];

  const students = [
    { name: 'Sophia Chen', email: 'sophia.chen@capas.edu.bs', course: 'MUS-150' },
    { name: 'Marcus Williams', email: 'marcus.williams@capas.edu.bs', course: 'MUS-201' },
    { name: 'Aaliyah Thompson', email: 'aaliyah.thompson@capas.edu.bs', course: 'MUS-150' }
  ];

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <ExclamationCircleIcon className="h-4 w-4 text-capas-coral" />;
      case 'high':
        return <ExclamationCircleIcon className="h-4 w-4 text-capas-gold" />;
      default:
        return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'border-l-capas-coral';
      case 'high':
        return 'border-l-capas-gold';
      default:
        return 'border-l-capas-turquoise';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'extension_request':
        return <ClockIcon className="h-4 w-4 text-capas-gold" />;
      case 'administrative':
        return <UserGroupIcon className="h-4 w-4 text-capas-ocean" />;
      default:
        return <ChatBubbleLeftRightIcon className="h-4 w-4 text-capas-turquoise" />;
    }
  };

  const filteredMessages = messages.filter(message =>
    message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-display font-bold text-capas-ocean-dark">
            Messages
          </h1>
          <p className="text-capas-ocean-dark/70 mt-1">
            Communicate with students and colleagues
          </p>
        </div>
        <button className="btn-capas-primary flex items-center gap-2">
          <PlusIcon className="h-5 w-5" />
          New Message
        </button>
      </div>

      {/* Message Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ChatBubbleLeftRightIcon className="h-8 w-8 text-capas-turquoise" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Total Messages</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">{messages.length}</p>
            </div>
          </div>
        </div>

        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ExclamationCircleIcon className="h-8 w-8 text-capas-coral" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Unread</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">
                {messages.filter(m => !m.read).length}
              </p>
            </div>
          </div>
        </div>

        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <ClockIcon className="h-8 w-8 text-capas-gold" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Urgent</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">
                {messages.filter(m => m.priority === 'urgent').length}
              </p>
            </div>
          </div>
        </div>

        <div className="card-capas p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <UserGroupIcon className="h-8 w-8 text-capas-palm" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-capas-ocean-dark/70">Active Conversations</p>
              <p className="text-2xl font-semibold text-capas-ocean-dark">{conversations.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-2">
          <div className="card-capas">
            {/* Search and Tabs */}
            <div className="p-6 border-b border-capas-ocean-light/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-capas-ocean-dark/50" />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
                  />
                </div>
              </div>

              <div className="flex space-x-4">
                {[
                  { id: 'inbox', label: 'Inbox', count: messages.filter(m => !m.read).length },
                  { id: 'sent', label: 'Sent', count: 5 },
                  { id: 'urgent', label: 'Urgent', count: messages.filter(m => m.priority === 'urgent').length }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg ${
                      activeTab === tab.id
                        ? 'bg-capas-turquoise text-white'
                        : 'text-capas-ocean-dark/70 hover:text-capas-ocean-dark hover:bg-capas-sand-light'
                    }`}
                  >
                    {tab.label} {tab.count > 0 && `(${tab.count})`}
                  </button>
                ))}
              </div>
            </div>

            {/* Message List */}
            <div className="divide-y divide-capas-ocean-light/10">
              {filteredMessages.map((message) => (
                <div 
                  key={message.id} 
                  className={`p-6 hover:bg-capas-sand-light/30 cursor-pointer border-l-4 ${getPriorityColor(message.priority)} ${!message.read ? 'bg-capas-turquoise/5' : ''}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-medium ${!message.read ? 'text-capas-ocean-dark' : 'text-capas-ocean-dark/70'}`}>
                        {message.from}
                      </h4>
                      {getPriorityIcon(message.priority)}
                      {getTypeIcon(message.type)}
                      {!message.read && (
                        <span className="w-2 h-2 bg-capas-turquoise rounded-full"></span>
                      )}
                    </div>
                    <div className="text-sm text-capas-ocean-dark/50">
                      {new Date(message.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <h5 className={`font-medium mb-1 ${!message.read ? 'text-capas-ocean-dark' : 'text-capas-ocean-dark/70'}`}>
                    {message.subject}
                  </h5>
                  
                  <p className="text-sm text-capas-ocean-dark/60 mb-2 line-clamp-2">
                    {message.preview}
                  </p>
                  
                  {message.course && (
                    <span className="inline-block px-2 py-1 text-xs bg-capas-turquoise/10 text-capas-turquoise rounded-full">
                      {message.course}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Compose */}
          <div className="card-capas p-6">
            <h3 className="font-semibold text-capas-ocean-dark mb-4">Quick Message</h3>
            <div className="space-y-4">
              <select
                value={selectedRecipient}
                onChange={(e) => setSelectedRecipient(e.target.value)}
                className="w-full px-3 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent"
              >
                <option value="">Select recipient...</option>
                <optgroup label="Students">
                  {students.map(student => (
                    <option key={student.email} value={student.email}>
                      {student.name} ({student.course})
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Broadcast">
                  <option value="all_students">All Students</option>
                  <option value="mus_150">MUS-150 Students</option>
                  <option value="mus_201">MUS-201 Students</option>
                </optgroup>
              </select>
              
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                rows={4}
                className="w-full px-3 py-2 border border-capas-ocean-light/20 rounded-lg focus:ring-2 focus:ring-capas-turquoise focus:border-transparent resize-none"
              />
              
              <button 
                className="w-full btn-capas-primary flex items-center justify-center gap-2"
                disabled={!selectedRecipient || !newMessage.trim()}
              >
                <PaperAirplaneIcon className="h-4 w-4" />
                Send Message
              </button>
            </div>
          </div>

          {/* Recent Conversations */}
          <div className="card-capas p-6">
            <h3 className="font-semibold text-capas-ocean-dark mb-4">Recent Conversations</h3>
            <div className="space-y-3">
              {conversations.map((conv) => (
                <div key={conv.id} className="flex items-center justify-between p-3 bg-capas-sand-light/30 rounded-lg hover:bg-capas-sand-light/50 cursor-pointer">
                  <div className="flex-1">
                    <h4 className="font-medium text-capas-ocean-dark text-sm">{conv.participant}</h4>
                    <p className="text-xs text-capas-ocean-dark/60 line-clamp-1">{conv.lastMessage}</p>
                    <p className="text-xs text-capas-turquoise">{conv.course}</p>
                  </div>
                  {conv.unread > 0 && (
                    <span className="w-5 h-5 bg-capas-coral text-white text-xs rounded-full flex items-center justify-center">
                      {conv.unread}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Message Templates */}
          <div className="card-capas p-6">
            <h3 className="font-semibold text-capas-ocean-dark mb-4">Quick Templates</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-2 text-sm text-capas-ocean-dark hover:bg-capas-sand-light/50 rounded">
                Assignment Reminder
              </button>
              <button className="w-full text-left p-2 text-sm text-capas-ocean-dark hover:bg-capas-sand-light/50 rounded">
                Grade Feedback
              </button>
              <button className="w-full text-left p-2 text-sm text-capas-ocean-dark hover:bg-capas-sand-light/50 rounded">
                Class Announcement
              </button>
              <button className="w-full text-left p-2 text-sm text-capas-ocean-dark hover:bg-capas-sand-light/50 rounded">
                Hurricane Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}