// ---------- Roles ----------
export type Role = 'admin' | 'student'
export type StudentSubRole = 'current' | 'alumni'

// ---------- Courses ----------
export interface CourseCatalogEntry {
  code: string // e.g. 'MM 801'
  title: string
  description: string
}

export interface CohortCourseRecord {
  code: string
  title: string
  term: 1 | 2
  status: 'completed' | 'in-progress' | 'upcoming'
  grade?: string
}

// ---------- Internship ----------
export type InternshipSearchStatus =
  | 'not-started'
  | 'looking'
  | 'applied'
  | 'interviewing'
  | 'offer'
  | 'placed'
  | 'active'
  | 'completed'

export interface InternshipApplication {
  id: string
  company: string
  role: string
  appliedOn: string // ISO date, fake
  status: 'applied' | 'interviewing' | 'offer' | 'rejected'
  link?: string
}

export interface InternshipRecord {
  searchStatus: InternshipSearchStatus
  companyOrGroup?: string
  project?: string
  durationMonths?: number
  startMonth?: string // e.g. '2027-05'
  endMonth?: string
  approvalStatus: 'not-submitted' | 'pending' | 'approved' | 'changes-requested'
  mm807Status: 'not-enrolled' | 'enrolled' | 'completed'
  mm808Status: 'not-enrolled' | 'enrolled' | 'completed'
  fourMonthReport: ReportStatus
  eightMonthReport: ReportStatus
  supplementaryCourses: { code: 'MM 809' | 'MM 810'; required: boolean; status: ReportStatus }[]
  applications: InternshipApplication[]
}

export type ReportStatus = 'not-due' | 'due' | 'submitted' | 'approved' | 'overdue'

// ---------- Graduation / forms ----------
export interface GraduationChecklistItem {
  id: string
  label: string
  done: boolean
}

export interface FormRecord {
  id: string
  label: string
  status: 'not-started' | 'in-progress' | 'submitted' | 'approved'
  dueDate?: string
}

// ---------- Calendar ----------
export type CalendarEventCategory =
  | 'orientation'
  | 'briefing'
  | 'seminar'
  | 'course'
  | 'internship'
  | 'report'
  | 'event'
  | 'graduation'

export interface CalendarEvent {
  id: string
  title: string
  description: string
  category: CalendarEventCategory
  date: string // ISO date
  endDate?: string
  audience: 'all' | string[] // 'all' or list of student ids
  createdAt: string
  updatedAt?: string
}

// ---------- Notifications & requests ----------
export interface PortalNotification {
  id: string
  title: string
  body: string
  createdAt: string
  read: boolean
  relatedEventId?: string
  mockEmailSent: boolean
}

export interface InfoRequest {
  id: string
  studentId: string
  title: string
  fieldsRequested: string[]
  dueDate: string
  status: 'pending' | 'viewed' | 'submitted'
  submittedValues?: Record<string, string>
  createdAt: string
}

// ---------- Jobs ----------
export interface JobPosting {
  id: string
  title: string
  company: string
  location: string
  type: 'internship' | 'job'
  description: string
  requirements: string[]
  deadline: string
  duration: string
  startDate: string
  applicationLink: string
  postedAt: string
}

// ---------- Student ----------
export interface Student {
  id: string
  name: string
  ccid: string // mock UofA account id
  email: string
  subRole: StudentSubRole
  cohort: string // e.g. 'Fall 2026'
  photoInitials: string
  status: 'active' | 'on-internship' | 'graduated' | 'inactive'
  courses: CohortCourseRecord[]
  idpCompleted: boolean
  ethicsHoursCompleted: number // out of 8
  coopPermitRequired: boolean
  coopPermitStatus: 'n/a' | 'not-started' | 'in-progress' | 'complete'
  internship: InternshipRecord
  graduationChecklist: GraduationChecklistItem[]
  forms: FormRecord[]
  needsAttention?: string // short reason, admin dashboard only
  resumeDraft?: Record<string, string>
  linkedinSetupStep: number // 0-5
  // Alumni-only
  gradYear?: string
  currentRole?: string
  currentCompany?: string
}

// ---------- Admin ----------
export interface AdminUser {
  id: string
  name: string
  email: string
}

export interface CohortConfig {
  cohortName: string
  activeCourseCodes: string[] // 6 of the 8 catalogue courses
}
