import { useMemo, useState, ReactNode } from 'react'
import { CalendarEvent, CalendarEventCategory } from '../types'
import CategoryTag from './CategoryTag'

const ALL_CATEGORIES: CalendarEventCategory[] = [
  'orientation',
  'briefing',
  'seminar',
  'course',
  'internship',
  'report',
  'event',
  'graduation',
]

function monthLabel(date: Date): string {
  return date.toLocaleDateString('en-CA', { month: 'long', year: 'numeric' })
}

export default function CalendarView({
  events,
  onSelect,
  renderExtraActions,
}: {
  events: CalendarEvent[]
  onSelect?: (event: CalendarEvent) => void
  renderExtraActions?: (event: CalendarEvent) => ReactNode
}) {
  const [view, setView] = useState<'month' | 'list'>('list')
  const [activeCategories, setActiveCategories] = useState<Set<CalendarEventCategory>>(new Set(ALL_CATEGORIES))
  const [monthCursor, setMonthCursor] = useState(() => {
    const first = events[0]
    return first ? new Date(first.date + 'T00:00:00') : new Date()
  })

  const filtered = useMemo(
    () => events.filter((e) => activeCategories.has(e.category)).sort((a, b) => a.date.localeCompare(b.date)),
    [events, activeCategories],
  )

  const toggleCategory = (cat: CalendarEventCategory) => {
    setActiveCategories((prev) => {
      const next = new Set(prev)
      if (next.has(cat)) next.delete(cat)
      else next.add(cat)
      return next
    })
  }

  const monthEvents = useMemo(() => {
    return filtered.filter((e) => {
      const d = new Date(e.date + 'T00:00:00')
      return d.getMonth() === monthCursor.getMonth() && d.getFullYear() === monthCursor.getFullYear()
    })
  }, [filtered, monthCursor])

  const daysInMonth = new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 0).getDate()
  const firstWeekday = new Date(monthCursor.getFullYear(), monthCursor.getMonth(), 1).getDay()
  const cells: (number | null)[] = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap gap-1.5">
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                activeCategories.has(cat) ? 'bg-ua-deep-green text-white border-ua-deep-green' : 'bg-white text-ink-2 border-line'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-mist rounded-card p-1">
          <button
            onClick={() => setView('list')}
            className={`text-sm px-3 py-1 rounded-card ${view === 'list' ? 'bg-white shadow-sm' : 'text-ink-2'}`}
          >
            List
          </button>
          <button
            onClick={() => setView('month')}
            className={`text-sm px-3 py-1 rounded-card ${view === 'month' ? 'bg-white shadow-sm' : 'text-ink-2'}`}
          >
            Month
          </button>
        </div>
      </div>

      {view === 'list' ? (
        <ul className="space-y-2">
          {filtered.length === 0 && <p className="text-sm text-ink-2">No events match the selected filters.</p>}
          {filtered.map((e) => (
            <li key={e.id}>
              <button
                onClick={() => onSelect?.(e)}
                className="card w-full text-left hover:border-ua-green/50 transition-colors flex items-start justify-between gap-3"
              >
                <div>
                  <p className="font-mono text-xs text-ink-2 mb-1">{e.date}</p>
                  <p className="font-medium">{e.title}</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <CategoryTag category={e.category} />
                  {renderExtraActions?.(e)}
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-3">
            <button
              className="btn-secondary text-sm"
              onClick={() => setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth() - 1, 1))}
            >
              ← Prev
            </button>
            <p className="font-medium">{monthLabel(monthCursor)}</p>
            <button
              className="btn-secondary text-sm"
              onClick={() => setMonthCursor(new Date(monthCursor.getFullYear(), monthCursor.getMonth() + 1, 1))}
            >
              Next →
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-xs text-ink-2 mb-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
              <div key={d}>{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} />
              const dateStr = `${monthCursor.getFullYear()}-${String(monthCursor.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
              const dayEvents = monthEvents.filter((e) => e.date === dateStr)
              return (
                <div key={day} className="border border-line rounded-card min-h-[70px] p-1 text-left">
                  <p className="text-xs text-ink-2">{day}</p>
                  {dayEvents.map((e) => (
                    <button
                      key={e.id}
                      onClick={() => onSelect?.(e)}
                      className="block w-full text-left text-[11px] leading-tight bg-sage text-ua-deep-green rounded px-1 py-0.5 mt-1 truncate"
                      title={e.title}
                    >
                      {e.title}
                    </button>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
