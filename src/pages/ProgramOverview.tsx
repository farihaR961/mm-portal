import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { COURSE_CATALOGUE, CURRENT_COHORT_CONFIG, ADMISSION_CALENDAR, INTERNSHIP_COURSES } from '../mock-api'
import PageHeader from '../components/PageHeader'

export default function ProgramOverview() {
  const { session } = useAuth()
  const navigate = useNavigate()

  const activeCourses = COURSE_CATALOGUE.filter((c) => CURRENT_COHORT_CONFIG.activeCourseCodes.includes(c.code))

  const content = (
    <div>
      <PageHeader
        eyebrow="Program information"
        title="What is the MM co-op program?"
        description="A plain-language guide to how the Multimedia (MM) co-op MSc works, from admission through graduation."
      />

      <section className="card mb-6">
        <h2 className="text-xl mb-3">MM co-op MSc, not a thesis or course-based MSc</h2>
        <p className="text-ink-2 mb-3">
          The MM program is a professional, co-op-based Master's degree. It is <span className="accent">not</span> a
          thesis MSc, and it is not a course-based MSc either — the difference comes down to how the 36 credits are
          earned and what happens in place of a thesis.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <div className="bg-mist rounded-card p-4">
            <p className="label-mono mb-1">Thesis MSc</p>
            <p className="text-sm text-ink-2">Coursework plus an independent research thesis, defended at the end.</p>
          </div>
          <div className="bg-mist rounded-card p-4">
            <p className="label-mono mb-1">Course-based MSc</p>
            <p className="text-sm text-ink-2">Coursework plus a smaller capstone project, no internship requirement.</p>
          </div>
          <div className="bg-sage rounded-card p-4 border border-ua-green/30">
            <p className="label-mono mb-1">MM co-op MSc (this program)</p>
            <p className="text-sm text-ink-2">
              18 credits of coursework plus an 18-credit, eight-month full-time internship. The internship is a
              program requirement — it is not optional and not replaced by a capstone.
            </p>
          </div>
        </div>
      </section>

      <section className="card mb-6">
        <h2 className="text-xl mb-4">The whole program, start to finish</h2>
        <ol className="space-y-4">
          {[
            { title: 'Admission', body: `Fall intake. Applications open ${ADMISSION_CALENDAR.applicationsOpen}. International deadline is ${ADMISSION_CALENDAR.internationalDeadline}; decisions begin going out in ${ADMISSION_CALENDAR.notificationsBegin}. Domestic applicants who don't need a study visa may apply until ${ADMISSION_CALENDAR.domesticLateDeadline}.` },
            { title: 'First day', body: 'Mandatory program orientation, followed shortly after by the co-op briefing and the Term 1 course-project briefing.' },
            { title: 'Term 1 and Term 2 — six mandatory courses', body: `Six MM courses, normally three per term, drawn from the program's course catalogue. Each has a heavily weighted project, often with an industrial or MRC research partner.` },
            { title: 'During Year 1: IDP and ethics training', body: 'Alongside coursework, students complete the Individual Development Plan workbook and eight hours of ethics training, then submit records to the MM Director.' },
            { title: 'Start looking for an internship', body: 'Before Term 3, students set up LinkedIn, prepare a resume, begin the internship search, and complete a co-op work permit if it applies to them.' },
            { title: 'Internship checklist', body: 'Once a placement is confirmed, the internship approval form is submitted before the eight-month full-time internship begins under MM 807 and MM 808.' },
            { title: 'Report status', body: 'A four-month report and an eight-month report are submitted during the internship and tracked to approval.' },
            { title: 'Graduation checklist', body: 'After the internship: submit the IDP/PD completion form, confirm all six courses and internship credits are complete, apply for graduation in Bear Tracks, and wait for the MM 808 final grade before requesting a Letter of Completion from FGSR.' },
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

      <section className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="text-lg mb-3">This cohort's six courses ({CURRENT_COHORT_CONFIG.cohortName})</h2>
          <p className="text-sm text-ink-2 mb-3">
            Admin selects six of the eight catalogue courses for each cohort — this list is not fixed year to year.
          </p>
          <ul className="space-y-2">
            {activeCourses.map((c) => (
              <li key={c.code} className="border-b border-line last:border-0 pb-2 last:pb-0">
                <p className="font-mono text-xs text-ua-deep-green">{c.code}</p>
                <p className="text-sm font-medium">{c.title}</p>
                <p className="text-xs text-ink-2">{c.description}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h2 className="text-lg mb-3">The internship, in credits</h2>
          <p className="text-sm text-ink-2 mb-3">
            36 total program credits: 18 from courses, 18 from the internship, split across two nine-credit courses.
          </p>
          <ul className="space-y-2">
            {INTERNSHIP_COURSES.map((c) => (
              <li key={c.code} className="border-b border-line last:border-0 pb-2 last:pb-0">
                <p className="font-mono text-xs text-ua-deep-green">
                  {c.code} · Term {c.term} · {c.credits} credits
                </p>
                <p className="text-sm font-medium">{c.title}</p>
              </li>
            ))}
            <li className="text-xs text-ink-2 pt-1">
              MM 809 and MM 810 are supplementary internship courses, used only when admin marks one as required for
              a specific student.
            </li>
          </ul>
        </div>
      </section>

      <section className="card mb-6">
        <h2 className="text-lg mb-3">MRC mentors and important contacts</h2>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="label-mono mb-1">MM Director</p>
            <p>Handles IDP/ethics records, program-level approvals, and graduation sign-off.</p>
          </div>
          <div>
            <p className="label-mono mb-1">MM Administrator</p>
            <p>Day-to-day questions, late domestic applications, and portal access.</p>
          </div>
          <div>
            <p className="label-mono mb-1">MRC Industry Mentors</p>
            <p>Faculty and industry partners linked to course projects and internship placements.</p>
          </div>
        </div>
      </section>

      {!session && (
        <div className="card bg-mist border-none flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-sm text-ink-2">Ready to see this from a student or admin view?</p>
          <button onClick={() => navigate('/')} className="btn-primary">
            Go to sign in
          </button>
        </div>
      )}
    </div>
  )
}
