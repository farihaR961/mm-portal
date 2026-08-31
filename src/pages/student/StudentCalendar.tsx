import { useState } from 'react'
import { useCurrentStudent } from '../../hooks/useCurrentStudent'
import { getEventsForStudent } from '../../mock-api'
import { CalendarEvent } from '../../types'
import PageHeader from '../../components/PageHeader'
import CalendarView from '../../components/CalendarView'
import CategoryTag from '../../components/CategoryTag'
import Modal from '../../components/Modal'

export default function StudentCalendarPage() {
  const student = useCurrentStudent()
  const [selected, setSelected] = useState<CalendarEvent | null>(null)
  if (!student) return null

  const events = getEventsForStudent(student.id)

  return (
    <div>
      <PageHeader eyebrow="MM calendar" title="Program calendar" description="Orientation, briefings, seminars, course deadlines, internship milestones, and graduation dates for your cohort." />
      <CalendarView events={events} onSelect={setSelected} />
      {selected && (
        <Modal title={selected.title} onClose={() => setSelected(null)}>
          <div className="space-y-3">
            <CategoryTag category={selected.category} />
            <p className="text-sm font-mono text-ink-2">
              {selected.date}
              {selected.endDate ? ` – ${selected.endDate}` : ''}
            </p>
            <p className="text-sm text-ink-2">{selected.description}</p>
          </div>
        </Modal>
      )}
    </div>
  )
}
