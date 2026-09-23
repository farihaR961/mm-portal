import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  COURSE_CATALOGUE,
  CURRENT_COHORT_CONFIG,
  ADMISSION_CALENDAR,
  ADMISSION_REQUIREMENTS,
  PROGRAM_FACTS,
  INTERNSHIP_COURSES,
  SUPPLEMENTARY_COURSES,
} from '../mock-api'
import PageHeader from '../components/PageHeader'
import Footer from '../components/Footer'

interface SearchTopic {
  id: string
  label: string
  keywords: string[]
}

const SEARCH_TOPICS: SearchTopic[] = [
  { id: 'coop-vs-thesis', label: 'Co-op vs. thesis MSc', keywords: ['thesis', 'course-based', 'co-op', 'credits', 'capstone'] },
  { id: 'admission-requirements', label: 'Admission requirements', keywords: ['gpa', 'degree', 'programming', 'transcript', 'english', 'admission', 'requirements'] },
  { id: 'program-length', label: 'Program length & scheduling', keywords: ['duration', 'length', 'scheduling', 'residency', 'publishing', 'maximum'] },
  { id: 'program-timeline', label: 'Program timeline: admission to graduation', keywords: ['orientation', 'graduation', 'ethics', 'idp', 'internship checklist', 'report', 'timeline'] },
  { id: 'cohort-courses', label: "This cohort's six courses", keywords: ['mm 801', 'mm 802', 'mm 803', 'mm 804', 'mm 805', 'mm 806', 'courses'] },
  { id: 'internship-credits', label: 'Internship credits (MM 807/808)', keywords: ['mm 807', 'mm 808', 'mm 809', 'mm 810', 'internship credits'] },
  { id: 'internship-partners', label: 'Internship partners', keywords: ['mitacs', 'industry', 'research group', 'partners'] },
  { id: 'contacts', label: 'MRC mentors and contacts', keywords: ['contact', 'email', 'csmmadm', 'csapplygrad'] },
  { id: 'student-resources', label: 'Student resources', keywords: ['student service centre', 'ssc', 'transcripts', 'financial support', 'career services', 'wellness', 'resources'] },
]

export default function ProgramOverview() {
  const { session } = useAuth()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [highlightedId, setHighlightedId] = useState<string | null>(null)

  const activeCourses = COURSE_CATALOGUE.filter((c) => CURRENT_COHORT_CONFIG.activeCourseCodes.includes(c.code))

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return SEARCH_TOPICS.filter(
      (t) => t.label.toLowerCase().includes(q) || t.keywords.some((k) => k.includes(q)),
    )
  }, [query])

  const jumpTo = (id: string) => {
    const el = document.getElementById(id)
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setHighlightedId(id)
    setQuery('')
    window.setTimeout(() => setHighlightedId(null), 1600)
  }

  const ring = (id: string) =>
    highlightedId === id ? 'ring-4 ring-ua-gold/70' : 'ring-0 ring-transparent'

  const pageBody = (
    <div>
      <PageHeader
        eyebrow="Program information"
        title="MSc in Computing Science, Specialization in Multimedia"
        description="A plain-language guide to how the MM co-op MSc works, from admission through graduation. Source: the official MM Program site and UofA course catalogue."
      />

      <div className="relative mb-10">
        <div className="border border-ua-gold rounded-full flex items-center px-6 py-4 bg-white shadow-sm focus-within:shadow-md focus-within:border-ua-gold transition-shadow">
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

      <section
        id="coop-vs-thesis"
        className={`rounded-card p-6 mb-6 bg-sage border border-ua-green/30 transition-shadow duration-700 ${ring('coop-vs-thesis')}`}
      >
        <h2 className="text-xl mb-3 text-ua-deep-green">A course-based, co-op MSc — not a thesis MSc</h2>
        <p className="text-ink-2 mb-3">
          The MM program is a course-based Master's degree with a mandatory <span className="accent">internship</span>{' '}
          component, administered by the Department of Computing Science. It requires {PROGRAM_FACTS.totalCredits}{' '}
          total credits: {PROGRAM_FACTS.courseCredits} from coursework and {PROGRAM_FACTS.internshipCredits} from the
          internship — the internship makes up half the program and is not replaced by a thesis or capstone.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
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
              {PROGRAM_FACTS.internshipCredits} credits, typically completed in {PROGRAM_FACTS.typicalLength}.
            </p>
          </div>
        </div>
      </section>

      <section
        id="admission-requirements"
        className={`rounded-card p-6 mb-6 bg-cream border border-ua-gold/50 transition-shadow duration-700 ${ring('admission-requirements')}`}
      >
        <h2 className="text-xl mb-3">Admission requirements</h2>
        <ul className="space-y-2 text-sm text-ink-2">
          <li>• {ADMISSION_REQUIREMENTS.degree}</li>
          <li>• {ADMISSION_REQUIREMENTS.gpa}</li>
          <li>• {ADMISSION_REQUIREMENTS.programming}</li>
          <li>• {ADMISSION_REQUIREMENTS.transcript}</li>
          <li>• {ADMISSION_REQUIREMENTS.englishProficiency}</li>
          <li>• Reviewed by an admission committee specific to the MM Program, separate from the department's general graduate admissions committee.</li>
        </ul>
      </section>

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
              {PROGRAM_FACTS.scheduling}. Full-time students register in at least {PROGRAM_FACTS.fullTimeCreditsPerTerm}{' '}
              credits per term, and a maximum of {PROGRAM_FACTS.maxCreditsPerTerm} MM credits per term.
            </p>
          </div>
          <div>
            <p className="label-mono mb-1 text-ua-deep-green">Publishing course work</p>
            <p>{PROGRAM_FACTS.publishing}.</p>
          </div>
        </div>
      </section>

      <section
        id="program-timeline"
        className={`card mb-6 transition-shadow duration-700 ${ring('program-timeline')}`}
      >
        <h2 className="text-xl mb-4">The whole program, start to finish</h2>
        <ol className="space-y-4">
          {[
            { title: 'Admission', body: `Fall intake. Applications open ${ADMISSION_CALENDAR.applicationsOpen}. International deadline is ${ADMISSION_CALENDAR.internationalDeadline}; decisions begin going out in ${ADMISSION_CALENDAR.notificationsBegin}. Domestic applicants who don't need a study visa may apply until ${ADMISSION_CALENDAR.domesticLateDeadline}.` },
            { title: 'First day', body: 'Mandatory program orientation, followed shortly after by the co-op briefing and the Term 1 course-project briefing.' },
            { title: 'Term 1 and Term 2 — six mandatory courses', body: `Nine course credits per term (three courses), drawn from the MM course catalogue. Full-time students must register in at least ${PROGRAM_FACTS.fullTimeCreditsPerTerm} credits per term, and must maintain a term GPA of at least ${PROGRAM_FACTS.minTermGpa} with no course grade below ${PROGRAM_FACTS.minCourseGrade}.` },
            { title: 'During Year 1: IDP and ethics training', body: 'Alongside coursework, students complete the Individual Development Plan (IDP) workbook, the IDP/PD completion form, and the FGSR-required ethics training, then submit records as required.' },
            { title: 'Start looking for an internship', body: 'Before Term 3, students set up LinkedIn, prepare a resume, begin the internship search, and complete a co-op work permit if it applies to them.' },
            { title: 'Internship checklist', body: 'Once a placement is confirmed, an approval form is submitted before the 8-month, full-time internship begins under MM 807 and MM 808 in Terms 3 and 4, with industry or an academic research group.' },
            { title: 'Report status', body: 'A 4-month progress report and a final report on the R&D work are submitted during the internship.' },
            { title: 'Graduation checklist', body: `Confirm all six courses and both internship terms are complete, meet the minimum ${PROGRAM_FACTS.minGpaToGraduate} GPA across all MM credits, apply for graduation in Bear Tracks, and wait for the final grade before requesting a Letter of Completion.` },
            { title: 'Alumni portal', body: 'After graduating, students keep access to an alumni view of the portal with their program record, alumni events, and ways to stay connected.' },
          ].map((step, i) => (
            <li key={step.title} className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-ua-deep-green text-white font-mono text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </div>
              <div>
                <p className="font-medium">{step.title}</p>
                <p className="text-sm text-ink-2 mt-0.5">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section
        id="cohort-courses"
        className={`grid md:grid-cols-2 gap-6 mb-6 transition-shadow duration-700 ${ring('cohort-courses')}`}
      >
        <div className="rounded-card p-5 bg-sage border border-ua-green/30">
          <h2 className="text-lg mb-3 text-ua-deep-green">This cohort's six courses ({CURRENT_COHORT_CONFIG.cohortName})</h2>
          <p className="text-sm text-ink-2 mb-3">
            MM 801–806 form the standard six; admin can substitute MM 811/812 for a given cohort since course
            offerings can vary term to term.
          </p>
          <ul className="space-y-2">
            {activeCourses.map((c) => (
              <li key={c.code} className="bg-white rounded-card p-3 border border-line">
                <p className="font-mono text-xs text-ua-deep-green">{c.code}</p>
                <p className="text-sm font-medium">{c.title}</p>
                <p className="text-xs text-ink-2">{c.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div id="internship-credits" className={`rounded-card p-5 bg-cream border border-ua-gold/50 transition-shadow duration-700 ${ring('internship-credits')}`}>
          <h2 className="text-lg mb-3">The internship, in credits</h2>
          <p className="text-sm text-ink-2 mb-3">
            {PROGRAM_FACTS.totalCredits} total program credits: {PROGRAM_FACTS.courseCredits} from courses,{' '}
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

      <section
        id="internship-partners"
        className={`card mb-6 border-l-4 border-l-ua-gold transition-shadow duration-700 ${ring('internship-partners')}`}
      >
        <h2 className="text-lg mb-3">Internship partners</h2>
        <p className="text-sm text-ink-2 mb-3">
          Students can intern with industry or an academic research group, in Canada or abroad (subject to visa
          approval). The program partners with the national research organization MITACS to help facilitate
          placements, alongside a network of industry and university research-group collaborators tied to the
          Multimedia Research Center (MRC).
        </p>
      </section>

      <section
        id="contacts"
        className={`rounded-card p-6 mb-6 bg-ua-deep-green transition-shadow duration-700 ${ring('contacts')}`}
      >
        <h2 className="text-lg mb-3 text-white">MRC mentors and important contacts</h2>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="label-mono mb-1 text-white/60">MM Program admissions</p>
            <p className="text-white/90">csmmadm@ualberta.ca — late domestic applications and MM-specific admission questions.</p>
          </div>
          <div>
            <p className="label-mono mb-1 text-white/60">General grad admissions</p>
            <p className="text-white/90">csapplygrad@ualberta.ca — Department of Computing Science graduate admissions.</p>
          </div>
          <div>
            <p className="label-mono mb-1 text-white/60">Multimedia Research Center (MRC)</p>
            <p className="text-white/90">Faculty research group hosting MM course projects and internship partnerships.</p>
          </div>
        </div>
      </section>

      <section
        id="student-resources"
        className={`card mb-6 transition-shadow duration-700 ${ring('student-resources')}`}
      >
        <h2 className="text-lg mb-3">Student resources</h2>
        <p className="text-sm text-ink-2 mb-4">
          Beyond the MM Program office, the university's Student Service Centre can help with admissions, course
          registration, convocation, records and transcripts, financial support, career services, health and
          wellness, and academic supports.
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

      <section className="card mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="label-mono mb-1">Official program site</p>
          <p className="text-sm text-ink-2">
            This page summarizes entrance and program requirements from the official MM Program site.
          </p>
        </div>
        <a
          href="https://mmgrad.org/program.php"
          target="_blank"
          rel="noreferrer"
          className="btn-primary flex-shrink-0"
        >
          More information
        </a>
      </section>

      {!session && (
        <div className="card bg-mist border-none flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm text-ink-2">Ready to see this from a student or admin view?</p>
          <button onClick={() => navigate('/login')} className="btn-primary">
            Go to sign in
          </button>
        </div>
      )}
    </div>
  )

  // When there's no logged-in session, this page is reached directly (no
  // AppShell nav wraps it), so it needs its own header, padding, and footer.
  if (!session) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <header className="border-b border-line bg-white">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
            <button onClick={() => navigate('/')} className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-card bg-ua-green flex items-center justify-center text-white font-mono text-sm font-semibold">
                MM
              </div>
              <div className="text-left">
                <p className="font-semibold leading-tight">MM Portal</p>
                <p className="label-mono leading-tight">University of Alberta</p>
              </div>
            </button>
            <button onClick={() => navigate('/login')} className="btn-primary text-sm">
              Log in
            </button>
          </div>
        </header>
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-12">{pageBody}</main>
        <Footer maxWidth="max-w-5xl" />
      </div>
    )
  }

  // Logged in: AppShell already provides the nav, padding, and footer.
  return pageBody
}