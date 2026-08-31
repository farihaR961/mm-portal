import { useState } from 'react'
import { getAllEvents, addEvent, updateEvent, removeEvent, sendNotification, getCurrentStudents } from '../../mock-api'
import { CalendarEvent, CalendarEventCategory } from '../../types'
import PageHeader from '../../components/PageHeader'
import CalendarView from '../../components/CalendarView'
import Modal from '../../components/Modal'

const CATEGORIES: CalendarEventCategory[] = ['orientation', 'briefing', 'seminar', 'course', 'internship', 'report', 'event', 'graduation']

export default function AdminCalendarManagement() {
  const [, forceRerender] = useState(0)
  const [editing, setEditing] = useState<CalendarEvent | null>(null)
  const [creating, setCreating] = useState(false)

  const events = getAllEvents()
  const allStudentIds = getCurrentStudents().map((s) => s.id)

  const handleSave = (data: Omit<CalendarEvent, 'id' | 'createdAt'>, existingId?: string) => {
    if (existingId) {
      updateEvent(existingId, data)
      sendNotification(allStudentIds, 'Calendar event updated', `"${data.title}" was updated. New date: ${data.date}.`)
    } else {
      addEvent(data)
      sendNotification(allStudentIds, 'New calendar event added', `"${data.title}" was added to the MM calendar for ${data.date}.`)
    }
    setEditing(null)
    setCreating(false)
    forceRerender((n) => n + 1)
  }

  const handleDelete = (id: string) => {
    removeEvent(id)
    forceRerender((n) => n + 1)
  }

  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="Calendar management"
        description="Only admin can add, edit, or remove events. Students receive a portal notification and a mock email on every change."
        actions={
          <button className="btn-primary" onClick={() => setCreating(true)}>
            Add event
          </button>
        }
      />

      <CalendarView
        events={events}
        onSelect={setEditing}
        renderExtraActions={(e) => (
          <button
            className="text-xs text-red-600 hover:underline"
            onClick={(ev) => {
              ev.stopPropagation()
              handleDelete(e.id)
            }}
          >
            Remove
          </button>
        )}
      />

      {(editing || creating) && (
        <EventFormModal
          event={editing ?? undefined}
          onClose={() => {
            setEditing(null)
            setCreating(false)
          }}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

function EventFormModal({
  event,
  onClose,
  onSave,
}: {
  event?: CalendarEvent
  onClose: () => void
  onSave: (data: Omit<CalendarEvent, 'id' | 'createdAt'>, existingId?: string) => void
}) {
  const [title, setTitle] = useState(event?.title ?? '')
  const [description, setDescription] = useState(event?.description ?? '')
  const [category, setCategory] = useState<CalendarEventCategory>(event?.category ?? 'event')
  const [date, setDate] = useState(event?.date ?? '')

  return (
    <Modal title={event ? 'Edit event' : 'Add event'} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSave({ title, description, category, date, audience: 'all' }, event?.id)
        }}
        className="space-y-3"
      >
        <div>
          <label className="text-sm font-medium block mb-1">Title</label>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Description</label>
          <textarea className="input" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium block mb-1">Category</label>
            <select className="input" value={category} onChange={(e) => setCategory(e.target.value as CalendarEventCategory)}>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Date</label>
            <input type="date" className="input" value={date} onChange={(e) => setDate(e.target.value)} required />
          </div>
        </div>
        <button type="submit" className="btn-primary w-full">
          {event ? 'Save changes' : 'Add event'}
        </button>
      </form>
    </Modal>
  )
}
