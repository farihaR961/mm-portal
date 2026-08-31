import { CalendarEventCategory } from '../types'

const CATEGORY_LABELS: Record<CalendarEventCategory, string> = {
  orientation: 'Orientation',
  briefing: 'Briefing',
  seminar: 'Seminar',
  course: 'Course',
  internship: 'Internship',
  report: 'Report',
  event: 'Event',
  graduation: 'Graduation',
}

const CATEGORY_COLORS: Record<CalendarEventCategory, string> = {
  orientation: 'bg-sage text-ua-deep-green border-ua-green/30',
  briefing: 'bg-mist text-ink-2 border-line',
  seminar: 'bg-cream text-ink border-ua-gold/60',
  course: 'bg-mist text-ink-2 border-line',
  internship: 'bg-ua-green/10 text-ua-deep-green border-ua-green/40',
  report: 'bg-cream text-ink border-ua-gold/60',
  event: 'bg-sage text-ua-deep-green border-ua-green/30',
  graduation: 'bg-ua-green/10 text-ua-deep-green border-ua-green/40',
}

export default function CategoryTag({ category }: { category: CalendarEventCategory }) {
  return <span className={`badge ${CATEGORY_COLORS[category]}`}>{CATEGORY_LABELS[category]}</span>
}
