import { useEffect, useRef, useState, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  COURSE_CATALOGUE,
  CURRENT_COHORT_CONFIG,
  ADMISSION_CALENDAR,
  PROGRAM_FACTS,
  INTERNSHIP_COURSES,
} from '../mock-api'
import Footer from '../components/Footer'

function CoopIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0B3D23" strokeWidth="1.5">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 12h18" />
    </svg>
  )
}
function ProjectIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0B3D23" strokeWidth="1.5">
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  )
}
function TrackIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0B3D23" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9h10M7 13h6" />
      <circle cx="17" cy="16" r="2" />
    </svg>
  )
}

function CreditsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#007C41" strokeWidth="1.5">
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="M6 10v6l6 3 6-3v-6" />
    </svg>
  )
}
function InternshipIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#007C41" strokeWidth="1.5">
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  )
}
function DurationIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#007C41" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" className="flex-shrink-0 mt-0.5">
      <path d="M4 10.5 8 14.5 16 6" />
    </svg>
  )
}

const HIGHLIGHTS = [
  { title: 'Co-op by design', body: 'Half the degree is an 8-month internship.', icon: <CoopIcon /> },
  { title: 'Real industry projects', body: 'Projects come from industry, MRC, and faculty.', icon: <ProjectIcon /> },
  { title: 'Tracked in one place', body: 'Courses, internship, and graduation in the portal.', icon: <TrackIcon /> },
]

type DetailTab = 'apply' | 'timeline' | 'courses' | 'internship' | 'contact'

const DETAIL_TABS: { id: DetailTab; label: string }[] = [
  { id: 'apply', label: 'Apply' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'courses', label: 'Courses' },
  { id: 'internship', label: 'Internship' },
  { id: 'contact', label: 'Contact' },
]

// Short versions for the home page; the full wording lives in the mock API.
const SHORT_REQUIREMENTS = [
  'Four-year degree in Computing Science or a related field',
  'GPA of 3.0 or higher',
  'Programming experience',
  'Official transcript',
  'English proficiency',
]

const PHASES = [
  { when: 'Terms 1 and 2', what: 'Six courses' },
  { when: 'Before Term 3', what: 'Internship search' },
  { when: 'Terms 3 and 4', what: 'Eight-month internship' },
  { when: 'After', what: 'Graduation' },
]

const CONTACTS = [
  { email: 'csmmadm@ualberta.ca', label: 'MM Program admissions' },
  { email: 'csapplygrad@ualberta.ca', label: 'Graduate admissions' },
]

// Scroll-triggered fade-in.
function Reveal({
  children,
  className = '',
  delayMs = 0,
}: {
  children: ReactNode
  className?: string
  delayMs?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delayMs}ms` : '0ms' }}
      className={`${className} transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {children}
    </div>
  )
}

// Number that counts up from 0 once it scrolls into view.
function CountUp({ value, suffix = '' }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const [display, setDisplay] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true)
          const duration = 900
          const startTime = performance.now()
          const tick = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1)
            setDisplay(Math.round(progress * value))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [started, value])

  return (
    <p ref={ref} className="text-3xl md:text-4xl font-semibold text-ua-deep-green">
      {display}
      {suffix}
    </p>
  )
}

// One focused card with tabs: only one topic is visible at a time.
function DetailsPanel() {
  const [tab, setTab] = useState<DetailTab>('apply')
  const activeCourses = COURSE_CATALOGUE.filter((c) => CURRENT_COHORT_CONFIG.activeCourseCodes.includes(c.code))

  return (
    <div className="border border-line rounded-card overflow-hidden bg-white md:grid md:grid-cols-[200px_1fr]">
      <div
        role="tablist"
        aria-label="Program details"
        className="flex md:flex-col overflow-x-auto bg-mist border-b md:border-b-0 md:border-r border-line"
      >
        {DETAIL_TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            id={`tab-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`panel-${t.id}`}
            onClick={() => setTab(t.id)}
            className={`whitespace-nowrap text-left px-5 py-3.5 text-sm transition-colors ${
              tab === t.id
                ? 'bg-white text-ua-deep-green font-medium shadow-[inset_0_-3px_0_#FFDB05] md:shadow-[inset_3px_0_0_#FFDB05]'
                : 'text-ink-2 hover:bg-white/60'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div
        key={tab}
        role="tabpanel"
        id={`panel-${tab}`}
        aria-labelledby={`tab-${tab}`}
        className="p-6 md:p-8 min-h-[300px] animate-fade-up"
      >
        {tab === 'apply' && (
          <>
            <h3 className="text-lg font-semibold mb-4">How to apply</h3>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {[
                { label: 'Opens', value: ADMISSION_CALENDAR.applicationsOpen },
                { label: 'International deadline', value: ADMISSION_CALENDAR.internationalDeadline },
                { label: 'Decisions from', value: ADMISSION_CALENDAR.notificationsBegin },
              ].map((d) => (
                <div key={d.label} className="border border-ua-gold/50 bg-cream rounded-card px-3 py-3">
                  <p className="label-mono mb-1">{d.label}</p>
                  <p className="font-medium text-sm">{d.value}</p>
                </div>
              ))}
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-ink-2 mb-6">
              {SHORT_REQUIREMENTS.map((r) => (
                <li key={r} className="flex items-start gap-2">
                  <span className="text-ua-deep-green">
                    <CheckIcon />
                  </span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
            <a
              href="https://www.ualberta.ca/en/graduate-studies/admissions-programs/apply/index.html"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
            >
              Apply through UofA GPS ↗
            </a>
          </>
        )}

        {tab === 'timeline' && (
          <>
            <h3 className="text-lg font-semibold mb-6">Program timeline</h3>
            <ol className="grid sm:grid-cols-4 gap-6 sm:gap-4">
              {PHASES.map((p, i) => (
                <li key={p.what}>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-7 h-7 rounded-full bg-ua-deep-green text-white font-mono text-xs flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </span>
                    {i < PHASES.length - 1 && <span className="hidden sm:block flex-1 h-px bg-line" />}
                  </div>
                  <p className="label-mono">{p.when}</p>
                  <p className="font-medium text-sm mt-0.5">{p.what}</p>
                </li>
              ))}
            </ol>
          </>
        )}

        {tab === 'courses' && (
          <>
            <h3 className="text-lg font-semibold mb-4">Six courses</h3>
            <div className="grid sm:grid-cols-2 gap-2">
              {activeCourses.map((c) => (
                <div
                  key={c.code}
                  className="border border-line rounded-card px-3 py-2.5 text-sm transition-colors hover:border-ua-green/50"
                >
                  <span className="font-mono text-xs text-ua-deep-green mr-2">{c.code}</span>
                  {c.title}
                </div>
              ))}
            </div>
          </>
        )}

        {tab === 'internship' && (
          <>
            <h3 className="text-lg font-semibold mb-4">Internship</h3>
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              {[
                {
                  value: `${PROGRAM_FACTS.internshipCredits} credits`,
                  label: INTERNSHIP_COURSES.map((c) => c.code).join(' and '),
                },
                { value: '8 months', label: 'Full-time' },
                { value: 'Industry or research', label: 'Company or academic group' },
              ].map((f) => (
                <div key={f.value} className="border border-line rounded-card px-4 py-4">
                  <p className="font-semibold text-ua-deep-green">{f.value}</p>
                  <p className="label-mono mt-1">{f.label}</p>
                </div>
              ))}
            </div>
            <p className="text-sm text-ink-2">MITACS helps arrange placements.</p>
          </>
        )}

        {tab === 'contact' && (
          <>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-4">
              {CONTACTS.map((c) => (
                <li key={c.email} className="flex items-start gap-3">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#007C41"
                    strokeWidth="1.75"
                    className="mt-0.5 flex-shrink-0"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  <div>
                    <a href={`mailto:${c.email}`} className="text-ua-deep-green hover:underline font-medium">
                      {c.email}
                    </a>
                    <p className="text-xs text-ink-2">{c.label}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  )
}

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-line bg-white sticky top-0 z-20">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-card bg-ua-green flex items-center justify-center text-white font-mono text-sm font-semibold">
              MM
            </div>
            <div>
              <p className="font-semibold leading-tight">MM Program</p>
              <p className="label-mono leading-tight">University of Alberta · Multimedia</p>
            </div>
          </div>
          <button onClick={() => navigate('/login')} className="btn-primary text-sm">
            Log in
          </button>
        </div>
      </header>

      {/* Hero: a title, one short sentence, and two buttons */}
      <section className="border-b border-line relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.4] pointer-events-none" preserveAspectRatio="none">
          <defs>
            <pattern id="dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#DBE2DA" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>
        <div className="max-w-5xl mx-auto px-4 pt-16 pb-14 grid md:grid-cols-[1.3fr_1fr] gap-10 items-center relative">
          <div className="animate-fade-up">
            <p className="label-mono mb-4">Department of Computing Science</p>
            <h1 className="text-4xl md:text-5xl leading-[1.1] mb-5">
              MSc in Computing Science, <span className="font-bold">Specialization in Multimedia</span>
            </h1>
            <p className="text-ink-2 leading-relaxed text-lg mb-8 max-w-md">
              A course-based, co-op Master's degree: {PROGRAM_FACTS.courseCredits} credits of coursework and an
              8-month, full-time industry internship.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="https://mmgrad.org/program.php" target="_blank" rel="noreferrer" className="btn-primary">
                How to apply ↗
              </a>
              <a href="#details" className="btn-secondary">
                Program details
              </a>
            </div>
          </div>

          <div className="hidden md:flex justify-center animate-fade-up">
            <svg viewBox="0 0 280 320" className="w-full max-w-[260px]" fill="none">
              <rect x="20" y="20" width="200" height="130" rx="6" fill="#E3EDE6" stroke="#007C41" strokeWidth="2" />
              <polygon points="95,65 95,110 135,87" fill="#007C41" />
              <rect x="50" y="170" width="140" height="8" rx="4" fill="#DBE2DA" />
              <rect x="50" y="186" width="90" height="8" rx="4" fill="#DBE2DA" />
              <rect x="180" y="210" width="70" height="95" rx="8" fill="white" stroke="#0B3D23" strokeWidth="2" />
              <circle cx="215" cy="230" r="7" fill="#0B3D23" />
              <rect x="192" y="250" width="46" height="5" rx="2.5" fill="#DBE2DA" />
              <rect x="192" y="264" width="34" height="5" rx="2.5" fill="#DBE2DA" />
              <rect x="192" y="278" width="40" height="5" rx="2.5" fill="#DBE2DA" />
              <circle
                cx="40"
                cy="230"
                r="24"
                fill="#F7ECC4"
                stroke="#FFDB05"
                strokeWidth="2"
                className="animate-float"
                style={{ transformOrigin: '40px 230px' }}
              />
            </svg>
          </div>
        </div>
      </section>

      {/* Three numbers */}
      <Reveal className="border-b border-line">
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-3 divide-x divide-line text-center">
          <div className="px-4 flex flex-col items-center">
            <CreditsIcon />
            <div className="mt-2">
              <CountUp value={PROGRAM_FACTS.totalCredits} />
            </div>
            <p className="label-mono mt-1">total credits</p>
          </div>
          <div className="px-4 flex flex-col items-center">
            <InternshipIcon />
            <div className="mt-2">
              <CountUp value={8} suffix=" months" />
            </div>
            <p className="label-mono mt-1">internship</p>
          </div>
          <div className="px-4 flex flex-col items-center">
            <DurationIcon />
            <div className="mt-2">
              <CountUp value={2} suffix=" years" />
            </div>
            <p className="label-mono mt-1">typical duration</p>
          </div>
        </div>
      </Reveal>

      {/* Three one-line highlights */}
      <section className="max-w-5xl mx-auto px-4 py-14 w-full">
        <div className="grid sm:grid-cols-3 gap-8">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h.title} delayMs={i * 120}>
              <div className="border-t-2 border-ua-gold pt-4">
                <div className="mb-3">{h.icon}</div>
                <h2 className="font-medium mb-1">{h.title}</h2>
                <p className="text-sm text-ink-2">{h.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Program details: one focused card with tabs */}
      <Reveal>
        <section id="details" className="max-w-4xl mx-auto px-4 pb-14 w-full scroll-mt-24">
          <p className="label-mono mb-3">Program details</p>
          <DetailsPanel />
        </section>
      </Reveal>

      {/* Lab posters placeholder, to be filled once the posters arrive */}
      <Reveal>
        <section id="lab-posters" className="max-w-5xl mx-auto px-4 pb-16 w-full">
          <p className="label-mono mb-3">Lab posters · coming soon</p>
          <div className="grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-card border-2 border-dashed border-line flex items-center justify-center text-ink-2/30 bg-mist"
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-5-5L5 21" />
                </svg>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      <Footer maxWidth="max-w-5xl" />
    </div>
  )
}