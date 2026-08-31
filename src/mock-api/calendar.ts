import { CalendarEvent } from '../types'

// Fake dates for a Fall 2026 cohort. Replace with real admin-entered dates.
export let CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'MM Program Orientation',
    description: 'Mandatory orientation session for all incoming MM students. Covers program structure, key contacts, and first-term expectations.',
    category: 'orientation',
    date: '2026-09-03',
    audience: 'all',
    createdAt: '2026-06-01',
  },
  {
    id: 'evt-2',
    title: 'Co-op Briefing',
    description: 'Overview of the co-op internship model, MM 807/MM 808 requirements, and the approval-form process.',
    category: 'briefing',
    date: '2026-09-10',
    audience: 'all',
    createdAt: '2026-06-01',
  },
  {
    id: 'evt-3',
    title: 'Course Project Briefing — Term 1',
    description: 'Kickoff session for Term 1 course projects, including how industrial and MRC-linked projects are assigned.',
    category: 'briefing',
    date: '2026-09-15',
    audience: 'all',
    createdAt: '2026-06-01',
  },
  {
    id: 'evt-4',
    title: 'MM Seminar: Careers in Applied Multimedia',
    description: 'Guest seminar from MRC industry partners on career paths after the MM program.',
    category: 'seminar',
    date: '2026-10-22',
    audience: 'all',
    createdAt: '2026-06-01',
  },
  {
    id: 'evt-5',
    title: 'MM 801/802/803 Project Deadline',
    description: 'Final project submission deadline for all three Term 1 courses.',
    category: 'course',
    date: '2026-12-12',
    audience: 'all',
    createdAt: '2026-06-01',
  },
  {
    id: 'evt-6',
    title: 'IDP Workbook and Ethics Records Due',
    description: 'Individual Development Plan workbook and ethics training records due to the MM Director.',
    category: 'report',
    date: '2026-12-15',
    audience: 'all',
    createdAt: '2026-06-01',
  },
  {
    id: 'evt-7',
    title: 'Internship Search Kickoff Workshop',
    description: 'Resume, LinkedIn, and job-search strategy workshop ahead of the Term 3 internship search.',
    category: 'internship',
    date: '2027-01-14',
    audience: 'all',
    createdAt: '2026-06-01',
  },
  {
    id: 'evt-8',
    title: 'Internship Approval Form Deadline',
    description: 'Deadline to submit the internship approval form for students who have accepted a placement.',
    category: 'internship',
    date: '2027-04-15',
    audience: 'all',
    createdAt: '2026-06-01',
  },
  {
    id: 'evt-9',
    title: 'Four-Month Internship Report Due',
    description: 'Four-month report due for all students currently on internship.',
    category: 'report',
    date: '2026-12-20',
    audience: ['stu-004', 'stu-005'],
    createdAt: '2026-10-01',
  },
  {
    id: 'evt-10',
    title: 'Eight-Month Internship Report Due',
    description: 'Eight-month final report due for all students completing their internship this term.',
    category: 'report',
    date: '2027-03-15',
    audience: ['stu-004', 'stu-005'],
    createdAt: '2026-10-01',
  },
  {
    id: 'evt-11',
    title: 'Graduation Application Deadline (Bear Tracks)',
    description: 'Deadline to apply for graduation for students completing the program this cycle.',
    category: 'graduation',
    date: '2027-05-01',
    audience: 'all',
    createdAt: '2026-06-01',
  },
  {
    id: 'evt-12',
    title: 'MM Alumni Mixer',
    description: 'Informal networking event with MM alumni and current students.',
    category: 'event',
    date: '2027-02-06',
    audience: 'all',
    createdAt: '2026-11-01',
  },
]

export function getEventsForStudent(studentId: string): CalendarEvent[] {
  return CALENDAR_EVENTS.filter((e) => e.audience === 'all' || e.audience.includes(studentId)).sort(
    (a, b) => a.date.localeCompare(b.date),
  )
}

export function getAllEvents(): CalendarEvent[] {
  return [...CALENDAR_EVENTS].sort((a, b) => a.date.localeCompare(b.date))
}

export function addEvent(event: Omit<CalendarEvent, 'id' | 'createdAt'>): CalendarEvent {
  const newEvent: CalendarEvent = {
    ...event,
    id: `evt-${Date.now()}`,
    createdAt: new Date().toISOString(),
  }
  CALENDAR_EVENTS = [...CALENDAR_EVENTS, newEvent]
  return newEvent
}

export function updateEvent(id: string, updates: Partial<CalendarEvent>): CalendarEvent | undefined {
  let updated: CalendarEvent | undefined
  CALENDAR_EVENTS = CALENDAR_EVENTS.map((e) => {
    if (e.id === id) {
      updated = { ...e, ...updates, updatedAt: new Date().toISOString() }
      return updated
    }
    return e
  })
  return updated
}

export function removeEvent(id: string): void {
  CALENDAR_EVENTS = CALENDAR_EVENTS.filter((e) => e.id !== id)
}
