import { Link } from 'react-router-dom'
import { useCurrentStudent } from '../../hooks/useCurrentStudent'
import { getEventsForStudent, getNotificationsForStudent, getRequestsForStudent } from '../../mock-api'
import PageHeader from '../../components/PageHeader'
import StatusBadge from '../../components/StatusBadge'
import CategoryTag from '../../components/CategoryTag'

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
    </div>
  )
}
