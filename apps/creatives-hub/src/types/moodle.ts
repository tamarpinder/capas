// TypeScript interfaces matching Moodle API structure for future compatibility

export interface MoodleCourse {
  id: string;
  fullname: string;
  shortname: string;
  categoryid: number;
  categorypathname: string;
  summary: string;
  summaryformat: number;
  format: string;
  showgrades: boolean;
  newsitems: number;
  startdate: number;
  enddate: number;
  numsections: number;
  maxbytes: number;
  showreports: boolean;
  visible: boolean;
  hiddensections: number;
  groupmode: number;
  groupmodeforce: number;
  defaultgroupingid: number;
  timecreated: number;
  timemodified: number;
  enablecompletion: boolean;
  completionnotify: boolean;
  lang: string;
  forcetheme: string;
  courseformatoptions: Array<{
    name: string;
    value: any;
  }>;
}

export interface MoodleCourseContent {
  id: number;
  name: string;
  visible: boolean;
  summary: string;
  summaryformat: number;
  section: number;
  hiddenbynumsections: boolean;
  uservisible: boolean;
  availabilityinfo?: string;
  modules: MoodleModule[];
}

export interface MoodleModule {
  id: number;
  url: string;
  name: string;
  instance: number;
  description: string;
  visible: boolean;
  uservisible: boolean;
  availabilityinfo?: string;
  visibleoncoursepage: boolean;
  modicon: string;
  modname: string;
  modplural: string;
  availability?: string;
  indent: number;
  contents?: MoodleModuleContent[];
  contentsinfo?: {
    filescount: number;
    filessize: number;
    lastmodified: number;
    mimetypes: string[];
    repositorytype?: string;
  };
}

export interface MoodleModuleContent {
  type: string;
  filename: string;
  filepath: string;
  filesize: number;
  fileurl: string;
  timecreated: number;
  timemodified: number;
  sortorder: number;
  mimetype: string;
  isexternalfile: boolean;
  repositorytype?: string;
  userid: number;
  author: string;
  license: string;
}

export interface MoodleForum {
  id: number;
  course: number;
  type: string;
  name: string;
  intro: string;
  introformat: number;
  duedate: number;
  cutoffdate: number;
  assessed: number;
  assesstimestart: number;
  assesstimefinish: number;
  scale: number;
  maxbytes: number;
  maxattachments: number;
  forcesubscribe: number;
  trackingtype: number;
  rsstype: number;
  rssarticles: number;
  timemodified: number;
  warnafter: number;
  blockafter: number;
  blockperiod: number;
  completiondiscussions: number;
  completionreplies: number;
  completionposts: number;
  cmid: number;
  numdiscussions: number;
  cancreatediscussions: boolean;
  lockdiscussionafter: number;
  istracked: boolean;
}

export interface MoodleDiscussion {
  id: number;
  name: string;
  firstpost: number;
  userid: number;
  groupid: number;
  assessed: boolean;
  timemodified: number;
  usermodified: number;
  timestart: number;
  timeend: number;
  discussion: number;
  parent: number;
  created: number;
  modified: number;
  mailed: boolean;
  subject: string;
  message: string;
  messageformat: number;
  messagetrust: number;
  attachment: string;
  totalscore: number;
  mailnow: number;
  userfullname: string;
  usermodifiedfullname: string;
  userpictureurl: string;
  usermodifiedpictureurl: string;
  numreplies: number;
  numunread: number;
  pinned: boolean;
  locked: boolean;
  starred: boolean;
  canreply: boolean;
  canlock: boolean;
  canfavourite: boolean;
}

export interface MoodleUser {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  fullname: string;
  email: string;
  department: string;
  firstaccess: number;
  lastaccess: number;
  description: string;
  descriptionformat: number;
  profileimageurlsmall: string;
  profileimageurl: string;
  customfields: Array<{
    type: string;
    value: string;
    name: string;
    shortname: string;
  }>;
  preferences: Array<{
    name: string;
    value: string;
  }>;
}

export interface MoodleGrade {
  id: number;
  userid: number;
  itemid: number;
  categoryid: number;
  itemname: string;
  itemtype: string;
  itemmodule: string;
  iteminstance: number;
  itemnumber: number;
  idnumber: string;
  categoryidnumber: string;
  outcomeid: number;
  scaleid: number;
  gradetype: number;
  grademax: number;
  grademin: number;
  gradepass: number;
  display: number;
  decimals: number;
  hidden: number;
  locked: number;
  gradedategraded: number;
  gradedatesubmitted: number;
  rawgrade: number;
  grade: string;
  gradeformatted: string;
  gradefordisplay: string;
  feedback: string;
  feedbackformat: number;
}

// Creative Hub specific extensions
export interface CreativeCourse extends Omit<MoodleCourse, 'id'> {
  id: string;
  title: string;
  description: string;
  instructor: string;
  department: string;
  level: string;
  credits: number;
  duration: string;
  format: string;
  coverImage: string;
  preview3D?: string;
  color: string;
  progress: number;
  enrolled: boolean;
  totalLessons: number;
  completedLessons: number;
  nextDeadline?: string;
  tags: string[];
  skills: string[];
  tools: string[];
  assignments: CreativeAssignment[];
}

export interface CreativeAssignment {
  id: string;
  title: string;
  dueDate: string;
  status: 'pending' | 'in_progress' | 'submitted' | 'completed';
  grade?: string;
  submissionType: string;
  type?: string;
  progress?: number;
}

export interface CreativeSubmission {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  assignmentId: string;
  title: string;
  description: string;
  submittedAt: string;
  type: '3d_model' | 'audio' | 'video' | 'design_portfolio' | 'vr_application' | 'interactive_media';
  status: 'submitted' | 'in_review' | 'graded';
  grade?: string;
  points?: number;
  maxPoints: number;
  files: CreativeFile[];
  feedback?: {
    instructor: string;
    comment: string;
    rubricScores: Record<string, number>;
  };
  tags: string[];
  featured: boolean;
  likes: number;
  views: number;
}

export interface CreativeFile {
  name: string;
  type: string;
  size: string;
  url: string;
  preview?: string;
  duration?: string;
  caption?: string;
}

// API Response types
export interface MoodleApiResponse<T> {
  data: T;
  warnings?: Array<{
    item: string;
    itemid: number;
    warningcode: string;
    message: string;
  }>;
  exception?: {
    message: string;
    errorcode: string;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}