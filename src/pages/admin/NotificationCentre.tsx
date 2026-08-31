import { useState, FormEvent } from 'react'
import { getCurrentStudents, sendNotification, getAllRequests } from '../../mock-api'
import PageHeader from '../../components/PageHeader'
import StatusBadge from '../../components/StatusBadge'

type Target = 'one' | 'group' | 'all'

export default function AdminNotificationCentre() {
  const students = getCurrentStudents()
  const [target, setTarget] = useState<Target>('all')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [sentMessage, setSentMessage] = useState<string | null>(null)
  const [, forceRerender] = useState(0)

  const requests = getAllRequests()

  const toggleStudent = (id: string) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]))
  }

  const handleSend = (e: FormEvent) => {
    e.preventDefault()
    const ids = target === 'all' ? students.map((s) => s.id) : selectedIds
    if (ids.length === 0) return
    sendNotification(ids, title, body)
    setSentMessage(`Sent to ${ids.length} student${ids.length === 1 ? '' : 's'}, with a mock email for each.`)
    setTitle('')
    setBody('')
    setSelectedIds([])
    forceRerender((n) => n + 1)
  }

  return (
    <div>
      <PageHeader eyebrow="Admin" title="Notification centre" description="Send a portal notification to one student, a group, or the whole cohort." />

      <div className="grid md:grid-cols-3 gap-6">
        <form onSubmit={handleSend} className="card md:col-span-2 space-y-4">
          <div>
            <label className="text-sm font-medium block mb-1">Send to</label>
            <div className="flex gap-2">
              {(['all', 'group', 'one'] as Target[]).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => {
                    setTarget(t)
                    setSelectedIds([])
                  }}
                  className={`text-sm px-3 py-1.5 rounded-card border ${
                    target === t ? 'bg-ua-deep-green text-white border-ua-deep-green' : 'border-line text-ink-2'
                  }`}
                >
                  {t === 'all' ? 'Whole cohort' : t === 'group' ? 'Group' : 'One student'}
                </button>
              ))}
            </div>
          </div>

          {target !== 'all' && (
            <div>
              <label className="text-sm font-medium block mb-1">
                {target === 'one' ? 'Select student' : 'Select students'}
              </label>
              <div className="border border-line rounded-card max-h-48 overflow-y-auto divide-y divide-line">
                {students.map((s) => (
                  <label key={s.id} className="flex items-center gap-2 px-3 py-2 text-sm cursor-pointer">
                    <input
                      type={target === 'one' ? 'radio' : 'checkbox'}
                      name="student-select"
                      checked={selectedIds.includes(s.id)}
                      onChange={() => (target === 'one' ? setSelectedIds([s.id]) : toggleStudent(s.id))}
                    />
                    {s.name}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="text-sm font-medium block mb-1">Title</label>
            <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Message</label>
            <textarea className="input" rows={4} value={body} onChange={(e) => setBody(e.target.value)} required />
          </div>
          <button type="submit" className="btn-primary">
            Send notification
          </button>
          {sentMessage && <p className="text-sm text-ua-deep-green">{sentMessage}</p>}
        </form>

        <div className="card">
          <h2 className="text-lg mb-3">Open information requests</h2>
          {requests.filter((r) => r.status !== 'submitted').length === 0 ? (
            <p className="text-sm text-ink-2">None pending.</p>
          ) : (
            <ul className="space-y-3">
              {requests
                .filter((r) => r.status !== 'submitted')
                .map((r) => {
                  const student = students.find((s) => s.id === r.studentId)
                  return (
                    <li key={r.id}>
                      <p className="text-sm font-medium">{student?.name}</p>
                      <p className="text-xs text-ink-2 mb-1">{r.title}</p>
                      <StatusBadge status={r.status} />
                    </li>
                  )
                })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
