import { Link } from 'react-router-dom'
import { useCurrentStudent } from '../../hooks/useCurrentStudent'
import { getEventsForStudent, getNotificationsForStudent, getRequestsForStudent } from '../../mock-api'
import PageHeader from '../../components/PageHeader'
import StatusBadge from '../../components/StatusBadge'
import CategoryTag from '../../components/CategoryTag'

// The link points to the department's TA resources page (it explains TA
// assignment, pay, and duties; it is not an application form). If the MM office
// confirms MM students can apply, put the real application link here and change
// the label to 'Apply for TA ↗'.
const TA_URL = 'https://www.ualberta.ca/en/computing-science/graduate-studies/teaching-assistant-resources/index.html'
const TA_BUTTON_LABEL = 'TA resources ↗'

function computeNextAction(student: ReturnType<typeof useCurrentStudent>): string {
  if (!student) return ''
  if (student.ethicsHoursCompleted < 8) return 'Complete remaining ethics training hours.'
  if (!student.idpCompleted) return 'Submit your Individual Development Plan workbook.'
  if (student.internship.searchStatus === 'not-started') return 'Start your internship search — try the Job Hub and the resume tool.'
  if (student.internship.searchStatus === 'looking') return 'Keep applying — check the Job Hub for new postings.'
  if (student.internship.approvalStatus === 'not-submitted' && student.internship.companyOrGroup)
    return 'Submit your internship approval form.'
  if (student.internship.eightMonthReport === 'due') return 'Submit your eight-month internship report.'
  if (student.internship.fourMonthReport === 'due') return 'Submit your four-month internship report.'
  return 'You are on track — no urgent action right now.'
}

function CanvasLogo() {
  const dots = Array.from({ length: 16 }, (_, i) => {
    const angle = (i / 16) * 2 * Math.PI
    const r = 10
    return { cx: 13 + r * Math.cos(angle), cy: 13 + r * Math.sin(angle) }
  })
  return (
    <svg width="26" height="26" viewBox="0 0 26 26">
      {dots.map((d, i) => (
        <circle key={i} cx={d.cx} cy={d.cy} r="1.6" fill="#0B3D23" />
      ))}
    </svg>
  )
}

function GmailLogo() {
  return (
    <svg width="26" height="26" viewBox="0 0 48 36" fill="none">
      <rect x="0" y="2" width="48" height="32" rx="4" fill="#101B13" />
      <path d="M8 28V12l16 12 16-12v16" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function BearTracksLogo() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="#0B3D23">
      <path d="M7 9c-1.4 0-2.5 1.1-2.5 2.5S5.6 14 7 14s2.5-1.1 2.5-2.5S8.4 9 7 9Zm10 0c-1.4 0-2.5 1.1-2.5 2.5S15.6 14 17 14s2.5-1.1 2.5-2.5S18.4 9 17 9ZM3.5 5.5C2.4 5.5 1.5 6.4 1.5 7.5S2.4 9.5 3.5 9.5 5.5 8.6 5.5 7.5 4.6 5.5 3.5 5.5Zm17 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2Z" />
      <path d="M12 11c-3.6 0-6.5 2.6-6.5 6.2 0 1.7 1.5 2.8 3.2 2.3.9-.3 2-.5 3.3-.5s2.4.2 3.3.5c1.7.5 3.2-.6 3.2-2.3C18.5 13.6 15.6 11 12 11Z" />
    </svg>
  )
}

function TeachingIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="12" rx="1.5" />
      <path d="M8 20l4-4 4 4M7 9h6M7 12h10" />
    </svg>
  )
}

const UALBERTA_APPS = [
  {
    name: 'Gmail',
    description: 'Your @ualberta.ca student email',
    url: 'https://mail.google.com/a/ualberta.ca',
    icon: <GmailLogo />,
  },
  {
    name: 'Canvas',
    description: 'Course content, assignments, and grades',
    url: 'https://canvas.ualberta.ca/',
    icon: <CanvasLogo />,
  },
  {
    name: 'Bear Tracks',
    description: 'Registration, grades, and tuition payments',
    url: 'https://www.beartracks.ualberta.ca/',
    icon: <BearTracksLogo />,
  },
]

export default function StudentDashboard() {
  const student = useCurrentStudent()
  if (!student) return null

  const events = getEventsForStudent(student.id).filter((e) => new Date(e.date) >= new Date('2026-06-01')).slice(0, 4)
  const notifications = getNotificationsForStudent(student.id)
  const unread = notifications.filter((n) => !n.read)
  const requests = getRequestsForStudent(student.id).filter((r) => r.status !== 'submitted')
  const coursesDone = student.courses.filter((c) => c.status === 'completed').length

  return (
    <div>
      <PageHeader
        eyebrow={student.cohort}
        title={`Welcome back, ${student.name.split(' ')[0]}`}
        description="Here's where things stand across your MM program requirements."
      />

      <div className="card bg-sage border-ua-green/30 mb-6">
        <p className="label-mono mb-1">Next action</p>
        <p className="text-lg font-medium">{computeNextAction(student)}</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Link to="/student/journey" className="card hover:border-ua-green/50 transition-colors">
          <p className="label-mono mb-1">Course progress</p>
          <p className="text-2xl font-semibold">{coursesDone}/6</p>
          <p className="text-xs text-ink-2 mt-1">courses completed</p>
        </Link>
        <Link to="/student/internship" className="card hover:border-ua-green/50 transition-colors">
          <p className="label-mono mb-1">Internship status</p>
          <StatusBadge status={student.internship.searchStatus} />
        </Link>
        <Link to="/student/notifications" className="card hover:border-ua-green/50 transition-colors">
          <p className="label-mono mb-1">Unread notifications</p>
          <p className="text-2xl font-semibold">{unread.length}</p>
          <p className="text-xs text-ink-2 mt-1">{requests.length} open request{requests.length === 1 ? '' : 's'}</p>
        </Link>
        <Link to="/student/journey" className="card hover:border-ua-green/50 transition-colors">
          <p className="label-mono mb-1">Graduation checklist</p>
          <p className="text-2xl font-semibold">
            {student.graduationChecklist.filter((i) => i.done).length}/{student.graduationChecklist.length}
          </p>
          <p className="text-xs text-ink-2 mt-1">items complete</p>
        </Link>
      </div>

      <div className="card mb-6">
        <h2 className="text-lg mb-1">Apps of UAlberta</h2>
        <p className="text-sm text-ink-2 mb-4">Quick access to the university's own systems.</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {UALBERTA_APPS.map((app) => (
            <a
              key={app.name}
              href={app.url}
              target="_blank"
              rel="noreferrer"
              className="border border-line rounded-card p-4 hover:border-ua-green/50 hover:shadow-sm transition-all flex items-start gap-3"
            >
              <div className="flex-shrink-0 mt-0.5">{app.icon}</div>
              <div>
                <p className="font-medium text-sm">{app.name} ↗</p>
                <p className="text-xs text-ink-2 mt-0.5">{app.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg">Upcoming on your calendar</h2>
            <Link to="/student/calendar" className="btn-ghost text-sm">
              View calendar →
            </Link>
          </div>
          {events.length === 0 ? (
            <p className="text-sm text-ink-2">No upcoming events right now.</p>
          ) : (
            <ul className="space-y-3">
              {events.map((e) => (
                <li key={e.id} className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{e.title}</p>
                    <p className="text-xs text-ink-2 font-mono">{e.date}</p>
                  </div>
                  <CategoryTag category={e.category} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg">Notifications &amp; requests</h2>
            <Link to="/student/notifications" className="btn-ghost text-sm">
              View inbox →
            </Link>
          </div>
          {notifications.length === 0 && requests.length === 0 ? (
            <p className="text-sm text-ink-2">Nothing new right now.</p>
          ) : (
            <ul className="space-y-3">
              {requests.map((r) => (
                <li key={r.id} className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{r.title}</p>
                    <p className="text-xs text-ink-2">Due {r.dueDate}</p>
                  </div>
                  <StatusBadge status={r.status} />
                </li>
              ))}
              {notifications.slice(0, 3).map((n) => (
                <li key={n.id} className="flex items-start justify-between gap-3">
                  <div>
                    <p className={`text-sm ${n.read ? 'text-ink-2' : 'font-medium'}`}>{n.title}</p>
                  </div>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-ua-gold mt-1.5 flex-shrink-0" />}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="card mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="text-ua-deep-green flex-shrink-0 mt-0.5">
            <TeachingIcon />
          </div>
          <div>
            <h2 className="text-lg">Apply for TA</h2>
          
          </div>
        </div>
        <a href={TA_URL} target="_blank" rel="noreferrer" className="btn-primary flex-shrink-0">
          {TA_BUTTON_LABEL}
        </a>
      </div>
    </div>
  )
}