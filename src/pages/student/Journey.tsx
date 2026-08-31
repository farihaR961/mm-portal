import { useCurrentStudent } from '../../hooks/useCurrentStudent'
import PageHeader from '../../components/PageHeader'

type StepState = 'completed' | 'current' | 'upcoming' | 'waiting' | 'overdue'

const STATE_STYLES: Record<StepState, { dot: string; text: string }> = {
  completed: { dot: 'bg-ua-green', text: 'text-ink' },
  current: { dot: 'bg-ua-gold ring-4 ring-ua-gold/30', text: 'text-ink font-medium' },
  upcoming: { dot: 'bg-line', text: 'text-ink-2' },
  waiting: { dot: 'bg-line border-2 border-dashed border-ink-2', text: 'text-ink-2' },
  overdue: { dot: 'bg-red-500', text: 'text-red-700 font-medium' },
}

const STATE_LABELS: Record<StepState, string> = {
  completed: 'Completed',
  current: 'In progress',
  upcoming: 'Upcoming',
  waiting: 'Waiting',
  overdue: 'Overdue',
}

export default function StudentJourney() {
  const student = useCurrentStudent()
  if (!student) return null

  const coursesDone = student.courses.every((c) => c.status === 'completed')
  const coursesInProgress = student.courses.some((c) => c.status === 'in-progress')

  const steps: { title: string; detail: string; state: StepState }[] = [
    { title: 'Admission & orientation', detail: 'Accepted into the MM co-op MSc program and attended orientation.', state: 'completed' },
    {
      title: 'Term 1 & 2 courses',
      detail: `${student.courses.filter((c) => c.status === 'completed').length} of 6 required courses completed.`,
      state: coursesDone ? 'completed' : coursesInProgress ? 'current' : 'upcoming',
    },
    {
      title: 'IDP workbook & ethics training',
      detail: `Ethics training: ${student.ethicsHoursCompleted}/8 hours. IDP workbook ${student.idpCompleted ? 'submitted' : 'not yet submitted'}.`,
      state: student.idpCompleted && student.ethicsHoursCompleted >= 8 ? 'completed' : 'current',
    },
    {
      title: 'Internship search',
      detail: `Current status: ${student.internship.searchStatus.replace('-', ' ')}.`,
      state:
        student.internship.searchStatus === 'not-started'
          ? coursesDone
            ? 'current'
            : 'waiting'
          : ['placed', 'active', 'completed'].includes(student.internship.searchStatus)
            ? 'completed'
            : 'current',
    },
    {
      title: 'Internship approval form',
      detail: student.internship.companyOrGroup
        ? `Placement: ${student.internship.companyOrGroup}`
        : 'Submitted once a placement is confirmed.',
      state:
        student.internship.approvalStatus === 'approved'
          ? 'completed'
          : student.internship.approvalStatus === 'pending' || student.internship.approvalStatus === 'changes-requested'
            ? 'current'
            : student.internship.companyOrGroup
              ? 'current'
              : 'waiting',
    },
    {
      title: 'MM 807 & MM 808 internship',
      detail: 'Eight-month full-time internship, four-month and eight-month reports.',
      state:
        student.internship.mm808Status === 'completed'
          ? 'completed'
          : student.internship.mm807Status === 'enrolled' || student.internship.mm808Status === 'enrolled'
            ? 'current'
            : 'waiting',
    },
    {
      title: 'Graduation checklist',
      detail: `${student.graduationChecklist.filter((i) => i.done).length} of ${student.graduationChecklist.length} items complete.`,
      state: student.graduationChecklist.every((i) => i.done)
        ? 'completed'
        : student.graduationChecklist.some((i) => i.done)
          ? 'current'
          : 'waiting',
    },
    {
      title: 'Alumni portal access',
      detail: 'Unlocked once graduation is confirmed.',
      state: student.subRole === 'alumni' ? 'completed' : 'waiting',
    },
  ]

  return (
    <div>
      <PageHeader eyebrow="Your progress" title="MM journey" description="Your full program timeline, from admission to graduation." />

      <div className="card">
        <ol className="relative border-l border-line ml-3">
          {steps.map((step) => (
            <li key={step.title} className="mb-8 ml-6 last:mb-0">
              <span
                className={`absolute -left-[7px] mt-1 w-3.5 h-3.5 rounded-full ${STATE_STYLES[step.state].dot}`}
              />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className={STATE_STYLES[step.state].text}>{step.title}</p>
                  <p className="text-sm text-ink-2 mt-0.5">{step.detail}</p>
                </div>
                <span className="label-mono flex-shrink-0">{STATE_LABELS[step.state]}</span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <div className="card mt-6">
        <h2 className="text-lg mb-4">Graduation checklist detail</h2>
        <ul className="space-y-2">
          {student.graduationChecklist.map((item) => (
            <li key={item.id} className="flex items-center gap-3 text-sm">
              <span
                className={`w-4 h-4 rounded-sm flex-shrink-0 border ${
                  item.done ? 'bg-ua-green border-ua-green' : 'border-line'
                }`}
              />
              <span className={item.done ? 'text-ink-2 line-through' : 'text-ink'}>{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
