import { Link } from 'react-router-dom'
import { getCurrentStudents, getAllRequests } from '../../mock-api'
import PageHeader from '../../components/PageHeader'
import StatusBadge from '../../components/StatusBadge'

export default function AdminDashboard() {
  const students = getCurrentStudents()
  const requests = getAllRequests()

  const counts = {
    notStarted: students.filter((s) => s.internship.searchStatus === 'not-started').length,
    looking: students.filter((s) => ['looking', 'applied', 'interviewing'].includes(s.internship.searchStatus)).length,
    placedOrActive: students.filter((s) => ['offer', 'placed', 'active'].includes(s.internship.searchStatus)).length,
    completed: students.filter((s) => s.internship.searchStatus === 'completed').length,
  }

  const needsAttention = students.filter((s) => s.needsAttention)
  const pendingRequests = requests.filter((r) => r.status !== 'submitted')

  return (
    <div>
      <PageHeader
        eyebrow="MM Program Admin"
        title="Cohort overview"
        description="Snapshot of every current MM student's progress."
        actions={
          <Link to="/admin/export" className="btn-primary">
            Export status
          </Link>
        }
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="card">
          <p className="label-mono mb-1">Not started search</p>
          <p className="text-2xl font-semibold">{counts.notStarted}</p>
        </div>
        <div className="card">
          <p className="label-mono mb-1">Actively searching</p>
          <p className="text-2xl font-semibold">{counts.looking}</p>
        </div>
        <div className="card">
          <p className="label-mono mb-1">Placed / active internship</p>
          <p className="text-2xl font-semibold">{counts.placedOrActive}</p>
        </div>
        <div className="card">
          <p className="label-mono mb-1">Completed internship</p>
          <p className="text-2xl font-semibold">{counts.completed}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="text-lg mb-3">Students who need attention</h2>
          {needsAttention.length === 0 ? (
            <p className="text-sm text-ink-2">No flags right now.</p>
          ) : (
            <ul className="space-y-3">
              {needsAttention.map((s) => (
                <li key={s.id}>
                  <Link to={`/admin/students/${s.id}`} className="block hover:bg-mist -mx-2 px-2 py-1 rounded-card">
                    <p className="text-sm font-medium">{s.name}</p>
                    <p className="text-xs text-ink-2">{s.needsAttention}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2 className="text-lg mb-3">Pending information requests</h2>
          {pendingRequests.length === 0 ? (
            <p className="text-sm text-ink-2">No open requests.</p>
          ) : (
            <ul className="space-y-3">
              {pendingRequests.map((r) => {
                const student = students.find((s) => s.id === r.studentId)
                return (
                  <li key={r.id} className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium">{student?.name}</p>
                      <p className="text-xs text-ink-2">
                        {r.title} · Due {r.dueDate}
                      </p>
                    </div>
                    <StatusBadge status={r.status} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg">All current students</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-ink-2 border-b border-line">
                <th className="pb-2 pr-4">Name</th>
                <th className="pb-2 pr-4">Cohort</th>
                <th className="pb-2 pr-4">Courses</th>
                <th className="pb-2 pr-4">Internship</th>
                <th className="pb-2 pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-b border-line last:border-0">
                  <td className="py-2 pr-4">
                    <Link to={`/admin/students/${s.id}`} className="font-medium hover:underline">
                      {s.name}
                    </Link>
                  </td>
                  <td className="py-2 pr-4 text-ink-2">{s.cohort}</td>
                  <td className="py-2 pr-4 text-ink-2">{s.courses.filter((c) => c.status === 'completed').length}/6</td>
                  <td className="py-2 pr-4">
                    <StatusBadge status={s.internship.searchStatus} />
                  </td>
                  <td className="py-2 pr-4">
                    <StatusBadge status={s.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
