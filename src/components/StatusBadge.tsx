type Tone = 'neutral' | 'progress' | 'good' | 'warning' | 'danger'

const TONE_CLASSES: Record<Tone, string> = {
  neutral: 'bg-mist text-ink-2 border-line',
  progress: 'bg-sage text-ua-deep-green border-ua-green/30',
  good: 'bg-ua-green/10 text-ua-deep-green border-ua-green/40',
  warning: 'bg-cream text-ink border-ua-gold/60',
  danger: 'bg-red-50 text-red-700 border-red-200',
}

// Central place mapping every status string used across the app to a visual
// tone, so a given status always reads the same way everywhere it appears.
const STATUS_TONE_MAP: Record<string, Tone> = {
  'not-started': 'neutral',
  'not-due': 'neutral',
  'not-submitted': 'neutral',
  'not-enrolled': 'neutral',
  'n/a': 'neutral',
  looking: 'progress',
  applied: 'progress',
  interviewing: 'progress',
  'in-progress': 'progress',
  pending: 'progress',
  enrolled: 'progress',
  due: 'warning',
  viewed: 'progress',
  offer: 'good',
  placed: 'good',
  active: 'good',
  approved: 'good',
  completed: 'good',
  submitted: 'good',
  graduated: 'good',
  'changes-requested': 'warning',
  rejected: 'danger',
  overdue: 'danger',
  inactive: 'neutral',
}

function formatLabel(status: string): string {
  return status
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export default function StatusBadge({ status, label }: { status: string; label?: string }) {
  const tone = STATUS_TONE_MAP[status] ?? 'neutral'
  return <span className={`badge ${TONE_CLASSES[tone]}`}>{label ?? formatLabel(status)}</span>
}
