import { useState, ReactNode } from 'react'
import { useCurrentStudent } from '../../hooks/useCurrentStudent'
import { getRequestsForStudent, submitRequest, markRequestViewed } from '../../mock-api'
import PageHeader from '../../components/PageHeader'
import StatusBadge from '../../components/StatusBadge'

export default function StudentProfile() {
  const student = useCurrentStudent()
  const [, forceRerender] = useState(0)
  if (!student) return null

  const requests = getRequestsForStudent(student.id)
  const openRequests = requests.filter((r) => r.status !== 'submitted')

  const handleView = (id: string) => {
    markRequestViewed(id)
    forceRerender((n) => n + 1)
  }

  const handleSubmit = (id: string, fields: string[], form: HTMLFormElement) => {
    const values: Record<string, string> = {}
    fields.forEach((f) => {
      const input = form.elements.namedItem(f) as HTMLInputElement | null
      values[f] = input?.value ?? ''
    })
    submitRequest(id, values)
    forceRerender((n) => n + 1)
  }

  return (
    <div>
      <PageHeader
        eyebrow="Your profile"
        title="Profile & progress"
        description="Your MM record as entered by the program admin. You can only edit fields the admin has specifically requested below."
      />

      {openRequests.length > 0 && (
        <div className="mb-6 space-y-4">
          {openRequests.map((r) => (
            <div key={r.id} className="card border-ua-gold/60 bg-cream/40" onFocus={() => handleView(r.id)}>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <p className="label-mono mb-1">Information requested by admin</p>
                  <h2 className="text-lg">{r.title}</h2>
                  <p className="text-xs text-ink-2 mt-1">Due {r.dueDate}</p>
                </div>
                <StatusBadge status={r.status} />
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit(r.id, r.fieldsRequested, e.currentTarget)
                }}
                className="space-y-3"
              >
                {r.fieldsRequested.map((field) => (
                  <div key={field}>
                    <label className="text-sm font-medium block mb-1">{field}</label>
                    <input name={field} className="input" placeholder={`Enter ${field.toLowerCase()}`} />
                  </div>
                ))}
                <button type="submit" className="btn-primary text-sm">
                  Submit to admin
                </button>
              </form>
            </div>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg mb-4">Basic information</h2>
          <dl className="space-y-3 text-sm">
            <Row label="Name" value={student.name} />
            <Row label="UofA CCID" value={student.ccid} />
            <Row label="Email" value={student.email} />
            <Row label="Cohort" value={student.cohort} />
            <Row label="Program status" value={<StatusBadge status={student.status} />} />
          </dl>
        </div>

        <div className="card">
          <h2 className="text-lg mb-4">Requirements progress</h2>
          <dl className="space-y-3 text-sm">
            <Row label="IDP workbook" value={student.idpCompleted ? 'Completed' : 'Not yet completed'} />
            <Row label="Ethics training" value={`${student.ethicsHoursCompleted} / 8 hours`} />
            <Row
              label="Co-op work permit"
              value={student.coopPermitRequired ? <StatusBadge status={student.coopPermitStatus} /> : 'Not required'}
            />
            <Row label="LinkedIn setup" value={`Step ${student.linkedinSetupStep} of 5`} />
          </dl>
        </div>
      </div>

      <p className="text-xs text-ink-2 mt-6">
        Notice something wrong with your information? Contact the MM administrator — most fields here are entered
        and maintained by the program admin, not self-service, to keep records consistent.
      </p>
    </div>
  )
}

function Row({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-line pb-2 last:border-0 last:pb-0">
      <dt className="text-ink-2">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  )
}
