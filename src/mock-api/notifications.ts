import { PortalNotification, InfoRequest } from '../types'

// Keyed by studentId. Mutated in place by mock "admin" actions during the
// session — none of this persists on refresh since there is no real backend yet.
export let NOTIFICATIONS_BY_STUDENT: Record<string, PortalNotification[]> = {
  'stu-001': [
    {
      id: 'note-1',
      title: 'Internship Search Kickoff Workshop added',
      body: 'A new calendar event "Internship Search Kickoff Workshop" was added for Jan 14, 2027.',
      createdAt: '2026-11-20T09:00:00Z',
      read: false,
      relatedEventId: 'evt-7',
      mockEmailSent: true,
    },
    {
      id: 'note-2',
      title: 'Reminder: IDP workbook due Dec 15',
      body: 'Your Individual Development Plan workbook and ethics training records are due December 15.',
      createdAt: '2026-12-01T09:00:00Z',
      read: true,
      mockEmailSent: true,
    },
  ],
  'stu-002': [
    {
      id: 'note-3',
      title: 'Ethics training incomplete',
      body: 'You have completed 4 of 8 required ethics training hours. Please complete the remaining hours before the December 15 deadline.',
      createdAt: '2026-11-25T09:00:00Z',
      read: false,
      mockEmailSent: true,
    },
  ],
  'stu-006': [],
  'stu-008': [
    {
      id: 'note-4',
      title: 'Co-op permit follow-up requested',
      body: 'The MM office has requested an update on your co-op work permit status ahead of your upcoming interview.',
      createdAt: '2027-01-12T09:00:00Z',
      read: false,
      mockEmailSent: true,
    },
  ],
}

export let INFO_REQUESTS: InfoRequest[] = [
  {
    id: 'req-1',
    studentId: 'stu-002',
    title: 'Confirm co-op permit eligibility',
    fieldsRequested: ['Citizenship/permit status', 'Preferred internship start month'],
    dueDate: '2026-12-10',
    status: 'pending',
    createdAt: '2026-11-25',
  },
  {
    id: 'req-2',
    studentId: 'stu-008',
    title: 'Update internship interview details',
    fieldsRequested: ['Interviewing company', 'Interview date'],
    dueDate: '2027-01-20',
    status: 'viewed',
    createdAt: '2027-01-12',
  },
]

export function getNotificationsForStudent(studentId: string): PortalNotification[] {
  return NOTIFICATIONS_BY_STUDENT[studentId] ?? []
}

export function markNotificationRead(studentId: string, notificationId: string): void {
  const list = NOTIFICATIONS_BY_STUDENT[studentId] ?? []
  NOTIFICATIONS_BY_STUDENT[studentId] = list.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
}

export function sendNotification(studentIds: string[], title: string, body: string): void {
  const note: Omit<PortalNotification, 'id'> = {
    title,
    body,
    createdAt: new Date().toISOString(),
    read: false,
    mockEmailSent: true,
  }
  studentIds.forEach((id, i) => {
    const list = NOTIFICATIONS_BY_STUDENT[id] ?? []
    NOTIFICATIONS_BY_STUDENT[id] = [...list, { ...note, id: `note-${Date.now()}-${i}` }]
  })
}

export function getRequestsForStudent(studentId: string): InfoRequest[] {
  return INFO_REQUESTS.filter((r) => r.studentId === studentId)
}

export function getAllRequests(): InfoRequest[] {
  return INFO_REQUESTS
}

export function markRequestViewed(requestId: string): void {
  INFO_REQUESTS = INFO_REQUESTS.map((r) => (r.id === requestId && r.status === 'pending' ? { ...r, status: 'viewed' } : r))
}

export function submitRequest(requestId: string, values: Record<string, string>): void {
  INFO_REQUESTS = INFO_REQUESTS.map((r) => (r.id === requestId ? { ...r, status: 'submitted', submittedValues: values } : r))
}

export function createRequest(studentId: string, title: string, fields: string[], dueDate: string): InfoRequest {
  const req: InfoRequest = {
    id: `req-${Date.now()}`,
    studentId,
    title,
    fieldsRequested: fields,
    dueDate,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  INFO_REQUESTS = [...INFO_REQUESTS, req]
  return req
}
