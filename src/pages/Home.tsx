import { useEffect, useMemo, useRef, useState, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  COURSE_CATALOGUE,
  CURRENT_COHORT_CONFIG,
  ADMISSION_CALENDAR,
  ADMISSION_REQUIREMENTS,
  PROGRAM_FACTS,
  INTERNSHIP_COURSES,
  SUPPLEMENTARY_COURSES,
} from '../mock-api'
import Footer from '../components/Footer'

interface SearchTopic {
  id: string
  label: string
  keywords: string[]
}

const SEARCH_TOPICS: SearchTopic[] = [
  { id: 'why-multimedia', label: 'Why Multimedia?', keywords: ['why multimedia', 'partner', 'abroad', 'industrial project'] },
  { id: 'coop-vs-thesis', label: 'Co-op vs. thesis MSc', keywords: ['thesis', 'course-based', 'co-op', 'credits', 'capstone'] },
  { id: 'admission-requirements', label: 'Admission requirements & how to apply', keywords: ['gpa', 'degree', 'programming', 'transcript', 'english', 'admission', 'requirements', 'apply', 'gps'] },
  { id: 'program-length', label: 'Program length & scheduling', keywords: ['duration', 'length', 'scheduling', 'residency', 'publishing', 'maximum'] },
  { id: 'program-timeline', label: 'Program timeline: admission to graduation', keywords: ['orientation', 'graduation', 'ethics', 'idp', 'internship checklist', 'report', 'timeline'] },
  { id: 'cohort-courses', label: "This cohort's six courses", keywords: ['mm 801', 'mm 802', 'mm 803', 'mm 804', 'mm 805', 'mm 806', 'courses'] },
  { id: 'internship-credits', label: 'Internship credits (MM 807/808)', keywords: ['mm 807', 'mm 808', 'mm 809', 'mm 810', 'internship credits'] },
  { id: 'internship-partners', label: 'Internship partners', keywords: ['mitacs', 'industry', 'research group', 'partners'] },
  { id: 'contacts', label: 'MRC mentors and contacts', keywords: ['contact', 'email', 'csmmadm', 'csapplygrad'] },
  { id: 'student-resources', label: 'Student resources', keywords: ['student service centre', 'ssc', 'transcripts', 'financial support', 'career services', 'wellness', 'resources'] },
  { id: 'lab-posters', label: 'Lab & research posters', keywords: ['poster', 'lab', 'research'] },
]

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

const HIGHLIGHTS = [
  { title: 'Co-op by design', body: 'Half the program is an 8-month, full-time internship — not an add-on, but a core degree requirement.', icon: <CoopIcon /> },
  { title: 'Real industry projects', body: 'Course projects come from industrial collaborators, MRC researchers, and faculty, not textbook exercises.', icon: <ProjectIcon /> },
  { title: 'One place to track it', body: 'Courses, internship status, forms, and graduation progress, all in a single student view.', icon: <TrackIcon /> },
]

const ADMISSION_ITEMS = [
  ADMISSION_REQUIREMENTS.degree,
  ADMISSION_REQUIREMENTS.gpa,
  ADMISSION_REQUIREMENTS.programming,
  ADMISSION_REQUIREMENTS.transcript,
  ADMISSION_REQUIREMENTS.englishProficiency,
]

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" className="flex-shrink-0 mt-0.5">
      <path d="M4 10.5 8 14.5 16 6" />
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

export default function Home() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [highlightedId, setHighlightedId] = useState<string | null>(null)

  const activeCourses = COURSE_CATALOGUE.filter((c) => CURRENT_COHORT_CONFIG.activeCourseCodes.includes(c.code))

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return SEARCH_TOPICS.filter((t) => t.label.toLowerCase().includes(q) || t.keywords.some((k) => k.includes(q)))
  }, [query])

  const jumpTo = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setHighlightedId(id)
    setQuery('')
    window.setTimeout(() => setHighlightedId(null), 1600)
  }

  const ring = (id: string) => (highlightedId === id ? 'ring-4 ring-ua-gold/70' : 'ring-0 ring-transparent')

  const TIMELINE_STEPS = [
    { title: 'First day', body: 'Mandatory program orientation, followed shortly after by the co-op briefing and the Term 1 course-project briefing.' },
    { title: 'Term 1 and Term 2 — six mandatory courses', body: `Nine course credits per term (three courses). Full-time students maintain a term GPA of at least ${PROGRAM_FACTS.minTermGpa} with no course grade below ${PROGRAM_FACTS.minCourseGrade}.` },
    { title: 'During Year 1: IDP and ethics training', body: 'Students complete the Individual Development Plan (IDP) workbook, the IDP/PD completion form, and the FGSR-required ethics training.' },
    { title: 'Start looking for an internship', body: 'Before Term 3, students set up LinkedIn, prepare a resume, begin the internship search, and complete a co-op work permit if it applies to them.' },
    { title: 'Internship checklist', body: 'Once a placement is confirmed, an approval form is submitted before the 8-month internship begins under MM 807 and MM 808 in Terms 3 and 4.' },
    { title: 'Report status', body: 'A 4-month progress report and a final report on the R&D work are submitted during the internship.' },
    { title: 'Graduation checklist', body: `Confirm all six courses and both internship terms are complete, meet the minimum ${PROGRAM_FACTS.minGpaToGraduate} GPA, apply for graduation in Bear Tracks, and wait for the final grade before requesting a Letter of Completion.` },
    { title: 'Alumni portal', body: 'After graduating, students keep access to an alumni view of the portal with their program record, alumni events, and ways to stay connected.' },
  ]

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
            Portal ↗
          </button>
        </div>
      </header>

      <div className="border-b border-line bg-mist/50">
        <div className="max-w-5xl mx-auto px-4 py-2 flex items-center gap-1 text-xs overflow-x-auto">
          <span className="label-mono mr-2 flex-shrink-0">Jump to</span>
          {[
            { id: 'why-multimedia', label: 'Why Multimedia?' },
            { id: 'admission-requirements', label: 'How to Apply' },
            { id: 'program-timeline', label: 'Program Timeline' },
            { id: 'cohort-courses', label: 'Courses' },
          ].map((link) => (
            <button
              key={link.id}
              onClick={() => jumpTo(link.id)}
              className="px-2 py-1 rounded-full text-ink-2 hover:bg-white hover:text-ua-deep-green transition-colors whitespace-nowrap"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      <section className="border-b border-line relative overflow-hidden">
        <svg className="absolute inset-0 w-full h-full opacity-[0.4] pointer-events-none" preserveAspectRatio="none">
          <defs>
            <pattern id="dot-grid" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#DBE2DA" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-grid)" />
        </svg>
        <div className="max-w-5xl mx-auto px-4 pt-16 pb-12 grid md:grid-cols-[1.3fr_1fr] gap-10 items-start relative">
          <div className="animate-fade-up">
            <p className="label-mono mb-4">Department of Computing Science · Faculty of Science</p>
            <h1 className="text-4xl md:text-5xl leading-[1.1] mb-6">
              MSc in Computing Science, <span className="font-bold">Specialization in Multimedia</span>
            </h1>
            <p className="text-ink-2 leading-relaxed text-lg mb-4">
              The MM program is a course-based, co-op Master's degree. It is not a thesis MSc and not a plain
              course-based MSc — {PROGRAM_FACTS.courseCredits} credits of coursework are paired with an 8-month,
              full-time industry internship worth {PROGRAM_FACTS.internshipCredits} credits, for{' '}
              {PROGRAM_FACTS.totalCredits} credits total.
            </p>
            <p className="text-ink-2 leading-relaxed mb-8">
              Course projects come from industrial collaborators, MRC researchers, and faculty — real applied
              multimedia work, not textbook exercises. Typically completed in {PROGRAM_FACTS.typicalLength}.
            </p>
            <div className="flex flex-wrap gap-3">
              <button onClick={() => navigate('/login')} className="btn-primary">
                Go to the Portal
              </button>
              <a href="https://mmgrad.org/program.php" target="_blank" rel="noreferrer" className="btn-secondary">
                How to apply ↗
              </a>
            </div>
          </div>

          <div className="hidden md:flex justify-center pt-4 animate-fade-up">
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
              <circle cx="40" cy="230" r="24" fill="#F7ECC4" stroke="#FFDB05" strokeWidth="2" className="animate-float" style={{ transformOrigin: '40px 230px' }} />
            </svg>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-mist">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <div className="relative">
            <div className="border border-ua-gold rounded-full flex items-center px-6 py-4 bg-white shadow-sm focus-within:shadow-md transition-shadow">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="text-ink-2/60 flex-shrink-0">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="flex-1 ml-4 outline-none text-base bg-transparent placeholder:text-ink-2/50"
              />
            </div>
            {results.length > 0 && (
              <div className="absolute z-10 top-full mt-2 w-full bg-white border border-line rounded-2xl shadow-lg overflow-hidden py-2">
                {results.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => jumpTo(r.id)}
                    className="w-full text-left px-6 py-3 text-sm hover:bg-mist transition-colors"
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

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
            <p className="label-mono mt-1">full-time internship</p>
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

      <Reveal className="border-b border-line">
        <section className="max-w-5xl mx-auto px-4 py-16 w-full">
          <div className="grid md:grid-cols-[280px_1fr] gap-12">
            <div>
              <p className="label-mono mb-2">Why this program</p>
              <h2 className="text-2xl leading-snug">Course-based, co-op, and built around real R&amp;D work.</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-8">
              {HIGHLIGHTS.map((h, i) => (
                <Reveal key={h.title} delayMs={i * 120}>
                  <div className="border-t-2 border-ua-gold pt-4">
                    <div className="mb-3">{h.icon}</div>
                    <h3 className="font-medium mb-2">{h.title}</h3>
                    <p className="text-sm text-ink-2 leading-relaxed">{h.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      <section className="max-w-5xl mx-auto px-4 py-16 w-full">
        <Reveal>
          <section
            id="coop-vs-thesis"
            className={`rounded-card p-6 mb-6 bg-sage border border-ua-green/30 transition-shadow duration-700 ${ring('coop-vs-thesis')}`}
          >
            <h2 className="text-xl mb-4 text-ua-deep-green">Co-op vs. thesis vs. course-based, at a glance</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white rounded-card p-4 border border-line">
                <p className="label-mono mb-1">Thesis MSc</p>
                <p className="text-sm text-ink-2">Coursework plus an independent research thesis, defended at the end.</p>
              </div>
              <div className="bg-white rounded-card p-4 border border-line">
                <p className="label-mono mb-1">Other course-based MSc</p>
                <p className="text-sm text-ink-2">Coursework plus a smaller capstone course, no internship requirement.</p>
              </div>
              <div className="bg-ua-deep-green rounded-card p-4">
                <p className="label-mono mb-1 text-white/70">MM co-op MSc (this program)</p>
                <p className="text-sm text-white/90">
                  {PROGRAM_FACTS.courseCredits} course credits plus an 8-month, full-time internship worth{' '}
                  {PROGRAM_FACTS.internshipCredits} credits.
                </p>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section
            id="why-multimedia"
            className={`card mb-6 transition-shadow duration-700 ${ring('why-multimedia')}`}
          >
            <p className="label-mono mb-2">From the official MM Program description</p>
            <h2 className="text-xl mb-4">Why Multimedia?</h2>
            <p className="text-ink-2 leading-relaxed mb-4">
              The program gives students the chance to spend two terms completing UofA-equivalent coursework at a
              partner organization or research group abroad, including placements in the EU and US. A core feature
              is direct involvement in an industrial project during the second year — this helps shape each
              student's career direction and connects them with the wider multimedia R&amp;D community.
            </p>
            <p className="text-ink-2 leading-relaxed">
              Project areas span games and film, broadcast and transmission, medical and rehabilitation technology,
              and education and training. Topics are defined together with program partners to match current and
              emerging industry needs.
            </p>
          </section>
        </Reveal>

        <Reveal>
          <section
            id="admission-requirements"
            className={`rounded-card p-6 mb-6 bg-cream border border-ua-gold/50 transition-shadow duration-700 ${ring('admission-requirements')}`}
          >
            <h2 className="text-xl mb-4">Admission requirements</h2>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-3">
              {ADMISSION_ITEMS.map((item, i) => (
                <Reveal key={item} delayMs={i * 80} className="flex items-start gap-2 text-sm text-ink-2">
                  <span className="text-ua-deep-green"><CheckIcon /></span>
                  <span>{item}</span>
                </Reveal>
              ))}
            </ul>
            <p className="text-sm text-ink-2 mt-4 pt-4 border-t border-ua-gold/30">
              Fall intake. Applications open {ADMISSION_CALENDAR.applicationsOpen}. International deadline is{' '}
              {ADMISSION_CALENDAR.internationalDeadline}; decisions begin going out in{' '}
              {ADMISSION_CALENDAR.notificationsBegin}. Domestic applicants who don't need a study visa may apply
              until {ADMISSION_CALENDAR.domesticLateDeadline}.
            </p>
            <div className="mt-4 pt-4 border-t border-ua-gold/30">
              <p className="label-mono mb-2">How to apply</p>
              <ol className="space-y-1.5 text-sm text-ink-2 list-decimal list-inside">
                <li>
                  Start the{' '}
                  <a
                    href="https://www.ualberta.ca/en/graduate-studies/admissions-programs/apply/index.html"
                    target="_blank"
                    rel="noreferrer"
                    className="text-ua-deep-green hover:underline"
                  >
                    University of Alberta GPS application
                  </a>
                </li>
                <li>Choose "Computing Science" as the Department</li>
                <li>From the search results, choose "Master of Science (Crse) in Computing Science, Multimedia"</li>
              </ol>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section
            id="program-length"
            className={`card mb-6 border-l-4 border-l-ua-green transition-shadow duration-700 ${ring('program-length')}`}
          >
            <h2 className="text-xl mb-3">Program length &amp; scheduling</h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm text-ink-2">
              <div>
                <p className="label-mono mb-1 text-ua-deep-green">Duration</p>
                <p>
                  Designed to be completed in {PROGRAM_FACTS.typicalLength}; must be finished within{' '}
                  {PROGRAM_FACTS.maxLength} of admission. {PROGRAM_FACTS.residency}.
                </p>
              </div>
              <div>
                <p className="label-mono mb-1 text-ua-deep-green">Course scheduling</p>
                <p>
                  {PROGRAM_FACTS.scheduling}. Full-time students register in at least{' '}
                  {PROGRAM_FACTS.fullTimeCreditsPerTerm} credits per term, and a maximum of{' '}
                  {PROGRAM_FACTS.maxCreditsPerTerm} MM credits per term.
                </p>
              </div>
              <div>
                <p className="label-mono mb-1 text-ua-deep-green">Publishing course work</p>
                <p>{PROGRAM_FACTS.publishing}.</p>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section
            id="program-timeline"
            className={`card mb-6 transition-shadow duration-700 ${ring('program-timeline')}`}
          >
            <h2 className="text-xl mb-6">The whole program, start to finish</h2>
            <ol className="relative border-l-2 border-ua-green/30 ml-3 space-y-8">
              {TIMELINE_STEPS.map((step, i) => (
                <li key={step.title} className="ml-6 relative group">
                  <span className="absolute -left-[31px] top-0.5 w-6 h-6 rounded-full bg-ua-deep-green text-white font-mono text-[10px] flex items-center justify-center transition-transform group-hover:scale-125">
                    {i + 1}
                  </span>
                  <p className="font-medium">{step.title}</p>
                  <p className="text-sm text-ink-2 mt-1">{step.body}</p>
                </li>
              ))}
            </ol>
          </section>
        </Reveal>

        <Reveal>
          <section
            id="cohort-courses"
            className={`grid md:grid-cols-2 gap-6 mb-6 transition-shadow duration-700 ${ring('cohort-courses')}`}
          >
            <div className="rounded-card p-5 bg-sage border border-ua-green/30">
              <h2 className="text-lg mb-3 text-ua-deep-green">
                This cohort's six courses ({CURRENT_COHORT_CONFIG.cohortName})
              </h2>
              <p className="text-sm text-ink-2 mb-3">
                MM 801–806 form the standard six; admin can substitute MM 811/812 for a given cohort.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {activeCourses.map((c) => (
                  <div
                    key={c.code}
                    className="bg-white rounded-card p-3 border border-line transition-all hover:border-ua-green/50 hover:-translate-y-0.5 hover:shadow-sm"
                  >
                    <p className="font-mono text-xs text-ua-deep-green">{c.code}</p>
                    <p className="text-xs font-medium mt-0.5">{c.title}</p>
                  </div>
                ))}
              </div>
            </div>
            <div
              id="internship-credits"
              className={`rounded-card p-5 bg-cream border border-ua-gold/50 transition-shadow duration-700 ${ring('internship-credits')}`}
            >
              <h2 className="text-lg mb-3">The internship, in credits</h2>
              <p className="text-sm text-ink-2 mb-3">
                {PROGRAM_FACTS.totalCredits} total credits: {PROGRAM_FACTS.courseCredits} from courses,{' '}
                {PROGRAM_FACTS.internshipCredits} from the internship (50% of the program).
              </p>
              <ul className="space-y-2">
                {INTERNSHIP_COURSES.map((c) => (
                  <li key={c.code} className="bg-white rounded-card p-3 border border-line">
                    <p className="font-mono text-xs text-ua-deep-green">
                      {c.code} · Term {c.term} · {c.credits} credits
                    </p>
                    <p className="text-sm font-medium">{c.title}</p>
                  </li>
                ))}
                {SUPPLEMENTARY_COURSES.map((c) => (
                  <li key={c.code} className="text-xs text-ink-2 pt-1">
                    {c.code} — {c.title} ({c.credits} credits), used only when required for a specific student.
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section
            id="internship-partners"
            className={`card mb-6 border-l-4 border-l-ua-gold transition-shadow duration-700 ${ring('internship-partners')}`}
          >
            <div className="grid md:grid-cols-[1fr_200px] gap-6 items-center">
              <div>
                <h2 className="text-lg mb-3">Internship partners</h2>
                <p className="text-sm text-ink-2">
                  Students can intern with industry or an academic research group, in Canada or abroad (subject to
                  visa approval). The program partners with the national research organization MITACS to help
                  facilitate placements, alongside a network of industry and university research-group
                  collaborators tied to the Multimedia Research Center (MRC).
                </p>
              </div>
              <svg viewBox="0 0 200 140" className="hidden md:block w-full" fill="none">
                <line x1="100" y1="40" x2="45" y2="105" stroke="#DBE2DA" strokeWidth="2" />
                <line x1="100" y1="40" x2="155" y2="105" stroke="#DBE2DA" strokeWidth="2" />
                <line x1="45" y1="105" x2="155" y2="105" stroke="#DBE2DA" strokeWidth="2" />
                <circle cx="100" cy="40" r="22" fill="#0B3D23" className="transition-transform hover:scale-110" style={{ transformOrigin: '100px 40px' }} />
                <text x="100" y="44" textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace">MM</text>
                <circle cx="45" cy="105" r="18" fill="#E3EDE6" stroke="#007C41" strokeWidth="2" className="transition-transform hover:scale-110" style={{ transformOrigin: '45px 105px' }} />
                <circle cx="155" cy="105" r="18" fill="#F7ECC4" stroke="#FFDB05" strokeWidth="2" className="transition-transform hover:scale-110" style={{ transformOrigin: '155px 105px' }} />
              </svg>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section
            id="contacts"
            className={`rounded-card p-6 mb-6 bg-ua-deep-green transition-shadow duration-700 ${ring('contacts')}`}
          >
            <h2 className="text-lg mb-4 text-white">MRC mentors and important contacts</h2>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              {[
                { label: 'MM Program admissions', value: 'csmmadm@ualberta.ca' },
                { label: 'General grad admissions', value: 'csapplygrad@ualberta.ca' },
                { label: 'Multimedia Research Center (MRC)', value: 'Faculty research group hosting MM course projects and internships.' },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FFDB05" strokeWidth="1.75" className="mt-0.5 flex-shrink-0">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  <div>
                    <p className="label-mono mb-1 text-white/60">{c.label}</p>
                    <p className="text-white/90">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section
            id="student-resources"
            className={`card mb-6 transition-shadow duration-700 ${ring('student-resources')}`}
          >
            <h2 className="text-lg mb-3">Student resources</h2>
            <p className="text-sm text-ink-2 mb-4">
              The university's Student Service Centre can help with admissions, registration, transcripts,
              financial support, career services, and wellness.
            </p>
            <a
              href="https://www.ualberta.ca/en/services/student-service-centre/index.html"
              target="_blank"
              rel="noreferrer"
              className="btn-secondary"
            >
              Visit the Student Service Centre ↗
            </a>
          </section>
        </Reveal>

        <Reveal>
          <section
            id="lab-posters"
            className={`card mb-6 border-2 border-dashed border-line transition-shadow duration-700 ${ring('lab-posters')}`}
          >
            <h2 className="text-lg mb-4">Lab &amp; research posters</h2>
            <div className="grid grid-cols-3 gap-3 mb-4">
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
      </section>

      <Reveal className="border-t border-line bg-ua-deep-green">
        <div className="max-w-5xl mx-auto px-4 py-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-white/60 label-mono mb-2">Already admitted?</p>
            <h2 className="text-white text-2xl">Sign in to the Portal to check your program status.</h2>
          </div>
          <button onClick={() => navigate('/login')} className="btn-primary flex-shrink-0">
            Go to the Portal
          </button>
        </div>
      </Reveal>

      <Footer maxWidth="max-w-5xl" />
    </div>
  )
}