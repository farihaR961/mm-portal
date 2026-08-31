import { useState, ReactNode } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getStudentById, sendNotification, createRequest, getRequestsForStudent, getNotificationsForStudent } from '../../mock-api'
import PageHeader from '../../components/PageHeader'
import StatusBadge from '../../components/StatusBadge'
import Modal from '../../components/Modal'

export default function AdminStudentDetail() {
  const { studentId } = useParams<{ studentId: string }>()
  const [, forceRerender] = useState(0)
  const [showNotifyModal, setShowNotifyModal] = useState(false)
  const [showRequestModal, setShowRequestModal] = useState(false)

  const student = studentId ? getStudentById(studentId) : undefined
  if (!student) {
    return (
      <div>
        <p>Student not found.</p>
        <Link to="/admin" className="btn-ghost">
          ← Back to dashboard
        </Link>
      </div>
    )
  }

  const requests = getRequestsForStudent(student.id)
  const notifications = getNotificationsForStudent(student.id)

  const handleSendNotification = (title: string, body: string) => {
    sendNotification([student.id], title, body)
    setShowNotifyModal(false)
    forceRerender((n) => n + 1)
  }

  const handleCreateRequest = (title: string, fields: string[], dueDate: string) => {
    createRequest(student.id, title, fields, dueDate)
    setShowRequestModal(false)
    forceRerender((n) => n + 1)
  }

  return (
    <div>
      <Link to="/admin" className="btn-ghost text-sm mb-3 inline-block">
        ← Back to dashboard
      </Link>
      <PageHeader
        eyebrow={student.cohort}
        title={student.name}
        description={`${student.ccid}@ualberta.ca CCID · ${student.email}`}
        actions={
          <>
            <button className="btn-secondary" onClick={() => setShowRequestModal(true)}>
              Request information
            </button>
            <button className="btn-primary" onClick={() => setShowNotifyModal(true)}>
              Send notification
            </button>
          </>
        }
      />

      {student.needsAttention && (
        <div className="card bg-cream/40 border-ua-gold/60 mb-6">
          <p className="label-mono mb-1">Flagged for attention</p>
          <p className="text-sm">{student.needsAttention}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="text-lg mb-4">Course progress</h2>
          <ul className="space-y-2 text-sm">
            {student.courses.map((c) => (
              <li key={c.code} className="flex items-center justify-between border-b border-line last:border-0 pb-2 last:pb-0">
                <span>
                  {c.code} — {c.title}
                </span>
                <StatusBadge status={c.status} />
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2 className="text-lg mb-4">Program requirements</h2>
          <dl className="space-y-3 text-sm">
            <Row label="IDP workbook" value={student.idpCompleted ? 'Completed' : 'Not completed'} />
            <Row label="Ethics training" value={`${student.ethicsHoursCompleted}/8 hours`} />
            <Row label="Co-op permit" value={student.coopPermitRequired ? <StatusBadge status={student.coopPermitStatus} /> : 'Not required'} />
          </dl>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="text-lg mb-4">Internship</h2>
          <dl className="space-y-3 text-sm">
            <Row label="Search status" value={<StatusBadge status={student.internship.searchStatus} />} />
            <Row label="Company / group" value={student.internship.companyOrGroup ?? '—'} />
            <Row label="Approval status" value={<StatusBadge status={student.internship.approvalStatus} />} />
            <Row label="MM 807" value={<StatusBadge status={student.internship.mm807Status} />} />
            <Row label="MM 808" value={<StatusBadge status={student.internship.mm808Status} />} />
            <Row label="Four-month report" value={<StatusBadge status={student.internship.fourMonthReport} />} />
            <Row label="Eight-month report" value={<StatusBadge status={student.internship.eightMonthReport} />} />
          </dl>
        </div>

        <div className="card">
          <h2 className="text-lg mb-4">Graduation checklist</h2>
          <ul className="space-y-2">
            {student.graduationChecklist.map((item) => (
              <li key={item.id} className="flex items-center gap-3 text-sm">
                <span className={`w-4 h-4 rounded-sm flex-shrink-0 border ${item.done ? 'bg-ua-green border-ua-green' : 'border-line'}`} />
                <span className={item.done ? 'text-ink-2 line-through' : ''}>{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg mb-4">Forms</h2>
          <ul className="space-y-2 text-sm">
            {student.forms.map((f) => (
              <li key={f.id} className="flex items-center justify-between border-b border-line last:border-0 pb-2 last:pb-0">
                <span>{f.label}</span>
                <StatusBadge status={f.status} />
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2 className="text-lg mb-4">Requests & notifications sent</h2>
          <p className="label-mono mb-2">Information requests</p>
          <ul className="space-y-2 text-sm mb-4">
            {requests.length === 0 && <li className="text-ink-2">None sent.</li>}
            {requests.map((r) => (
              <li key={r.id} className="flex items-center justify-between">
                <span>{r.title}</span>
                <StatusBadge status={r.status} />
              </li>
            ))}
          </ul>
          <p className="label-mono mb-2">Notifications</p>
          <ul className="space-y-1 text-sm">
            {notifications.length === 0 && <li className="text-ink-2">None sent.</li>}
            {notifications.map((n) => (
              <li key={n.id} className="text-ink-2">
                {n.title} {n.mockEmailSent && '· mock email sent'}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {showNotifyModal && (
        <NotifyModal onClose={() => setShowNotifyModal(false)} onSend={handleSendNotification} />
      )}
      {showRequestModal && (
        <RequestModal onClose={() => setShowRequestModal(false)} onCreate={handleCreateRequest} />
      )}
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

function NotifyModal({ onClose, onSend }: { onClose: () => void; onSend: (title: string, body: string) => void }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  return (
    <Modal title="Send notification" onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSend(title, body)
        }}
        className="space-y-3"
      >
        <div>
          <label className="text-sm font-medium block mb-1">Title</label>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Message</label>
          <textarea className="input" rows={4} value={body} onChange={(e) => setBody(e.target.value)} required />
        </div>
        <p className="text-xs text-ink-2">This will also show as a mock email in the student's notification record.</p>
        <button type="submit" className="btn-primary w-full">
          Send
        </button>
      </form>
    </Modal>
  )
}

function RequestModal({
  onClose,
  onCreate,
}: {
  onClose: () => void
  onCreate: (title: string, fields: string[], dueDate: string) => void
}) {
  const [title, setTitle] = useState('')
  const [fieldsText, setFieldsText] = useState('')
  const [dueDate, setDueDate] = useState('')
  return (
    <Modal title="Request information" onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onCreate(
            title,
            fieldsText.split(',').map((f) => f.trim()).filter(Boolean),
            dueDate,
          )
        }}
        className="space-y-3"
      >
        <div>
          <label className="text-sm font-medium block mb-1">Request title</label>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Fields requested (comma separated)</label>
          <input
            className="input"
            placeholder="Interviewing company, Interview date"
            value={fieldsText}
            onChange={(e) => setFieldsText(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Due date</label>
          <input type="date" className="input" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required />
        </div>
        <button type="submit" className="btn-primary w-full">
          Send request
        </button>
      </form>
    </Modal>
  )
}
