import { useState } from 'react'
import { useCurrentStudent } from '../../hooks/useCurrentStudent'
import { getNotificationsForStudent, markNotificationRead, getRequestsForStudent, markRequestViewed, submitRequest } from '../../mock-api'
import PageHeader from '../../components/PageHeader'
import StatusBadge from '../../components/StatusBadge'

export default function StudentNotifications() {
  const student = useCurrentStudent()
  const [, forceRerender] = useState(0)
  if (!student) return null

  const notifications = [...getNotificationsForStudent(student.id)].sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  const requests = getRequestsForStudent(student.id)

  const handleRead = (id: string) => {
    markNotificationRead(student.id, id)
    forceRerender((n) => n + 1)
  }

  const handleRequestFocus = (id: string, status: string) => {
    if (status === 'pending') {
      markRequestViewed(id)
      forceRerender((n) => n + 1)
    }
  }

  const handleRequestSubmit = (id: string, fields: string[], form: HTMLFormElement) => {
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
      <PageHeader eyebrow="Inbox" title="Notifications & requests" description="Portal notifications from admin and any information requests that need your input." />

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg mb-3">Notifications</h2>
          {notifications.length === 0 && <p className="text-sm text-ink-2">No notifications yet.</p>}
          <ul className="space-y-2">
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`card cursor-pointer ${n.read ? '' : 'border-ua-gold/60 bg-cream/30'}`}
                onClick={() => !n.read && handleRead(n.id)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className={n.read ? 'text-ink-2' : 'font-medium'}>{n.title}</p>
                    <p className="text-sm text-ink-2 mt-1">{n.body}</p>
                    <p className="font-mono text-xs text-ink-2 mt-2">
                      {new Date(n.createdAt).toLocaleString('en-CA')}
                      {n.mockEmailSent && ' · Mock email sent'}
                    </p>
                  </div>
                  {!n.read && <span className="w-2 h-2 rounded-full bg-ua-gold mt-1.5 flex-shrink-0" />}
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-lg mb-3">Information requests</h2>
          {requests.length === 0 && <p className="text-sm text-ink-2">No open requests.</p>}
          <ul className="space-y-3">
            {requests.map((r) => (
              <li key={r.id} className="card" onFocus={() => handleRequestFocus(r.id, r.status)}>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <p className="font-medium">{r.title}</p>
                    <p className="text-xs text-ink-2">Due {r.dueDate}</p>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
                {r.status === 'submitted' ? (
                  <div className="text-sm text-ink-2 space-y-1 mt-2">
                    {Object.entries(r.submittedValues ?? {}).map(([k, v]) => (
                      <p key={k}>
                        <span className="text-ink font-medium">{k}:</span> {v}
                      </p>
                    ))}
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleRequestSubmit(r.id, r.fieldsRequested, e.currentTarget)
                    }}
                    className="space-y-2 mt-2"
                  >
                    {r.fieldsRequested.map((field) => (
                      <input key={field} name={field} className="input text-sm" placeholder={field} />
                    ))}
                    <button type="submit" className="btn-primary text-sm w-full">
                      Submit
                    </button>
                  </form>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
