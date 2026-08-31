import { ReactNode } from 'react'
import { useCurrentStudent } from '../../hooks/useCurrentStudent'
import PageHeader from '../../components/PageHeader'
import StatusBadge from '../../components/StatusBadge'

export default function StudentInternship() {
  const student = useCurrentStudent()
  if (!student) return null
  const i = student.internship

  return (
    <div>
      <PageHeader eyebrow="Internship" title="Internship tracking" description="Your search progress, placement details, course enrollment, and reports." />

      <div className="card mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg">Search status</h2>
          <StatusBadge status={i.searchStatus} />
        </div>
        {i.companyOrGroup && (
          <div className="grid sm:grid-cols-2 gap-4 mt-4 text-sm">
            <div>
              <p className="label-mono mb-1">Company / research group</p>
              <p className="font-medium">{i.companyOrGroup}</p>
            </div>
            <div>
              <p className="label-mono mb-1">Project</p>
              <p className="font-medium">{i.project}</p>
            </div>
            {i.durationMonths && (
              <div>
                <p className="label-mono mb-1">Duration</p>
                <p className="font-medium">{i.durationMonths} months</p>
              </div>
            )}
            {i.startMonth && (
              <div>
                <p className="label-mono mb-1">Start – end</p>
                <p className="font-medium">
                  {i.startMonth} – {i.endMonth}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="text-lg mb-4">Applications & interviews</h2>
          {i.applications.length === 0 ? (
            <p className="text-sm text-ink-2">No applications logged yet.</p>
          ) : (
            <ul className="space-y-3">
              {i.applications.map((a) => (
                <li key={a.id} className="flex items-center justify-between border-b border-line last:border-0 pb-2 last:pb-0">
                  <div>
                    <p className="text-sm font-medium">{a.company}</p>
                    <p className="text-xs text-ink-2">
                      {a.role} · Applied {a.appliedOn}
                    </p>
                  </div>
                  <StatusBadge status={a.status} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2 className="text-lg mb-4">Enrollment & approval</h2>
          <dl className="space-y-3 text-sm">
            <Row label="Approval status" value={<StatusBadge status={i.approvalStatus} />} />
            <Row label="MM 807" value={<StatusBadge status={i.mm807Status} />} />
            <Row label="MM 808" value={<StatusBadge status={i.mm808Status} />} />
            {i.supplementaryCourses.filter((c) => c.required).map((c) => (
              <Row key={c.code} label={c.code} value={<StatusBadge status={c.status} />} />
            ))}
          </dl>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg mb-4">Reports</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="flex items-center justify-between border border-line rounded-card p-3">
            <span className="text-sm font-medium">Four-month report</span>
            <StatusBadge status={i.fourMonthReport} />
          </div>
          <div className="flex items-center justify-between border border-line rounded-card p-3">
            <span className="text-sm font-medium">Eight-month report</span>
            <StatusBadge status={i.eightMonthReport} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-line pb-2 last:border-0 last:pb-0">
      <dt className="text-ink-2">{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}
