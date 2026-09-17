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

export default function ProgramOverview() {
  const { session } = useAuth()
  const navigate = useNavigate()

  const activeCourses = COURSE_CATALOGUE.filter((c) => CURRENT_COHORT_CONFIG.activeCourseCodes.includes(c.code))

  const content = (
    <div>
      <PageHeader
        eyebrow="Program information"
        title="MSc in Computing Science, Specialization in Multimedia"
        description="A plain-language guide to how the MM co-op MSc works, from admission through graduation. Source: the official MM Program site and UofA course catalogue."
      />

      <section className="card mb-6">
        <h2 className="text-xl mb-3">A course-based, co-op MSc — not a thesis MSc</h2>
        <p className="text-ink-2 mb-3">
          The MM program is a course-based Master's degree with a mandatory <span className="accent">internship</span>{' '}
          component, administered by the Department of Computing Science. It requires {PROGRAM_FACTS.totalCredits}{' '}
          total credits: {PROGRAM_FACTS.courseCredits} from coursework and {PROGRAM_FACTS.internshipCredits} from the
          internship — the internship makes up half the program and is not replaced by a thesis or capstone.
        </p>
        <div className="grid sm:grid-cols-3 gap-4 mt-4">
          <div className="bg-mist rounded-card p-4">
            <p className="label-mono mb-1">Thesis MSc</p>
            <p className="text-sm text-ink-2">Coursework plus an independent research thesis, defended at the end.</p>
          </div>
          <div className="bg-mist rounded-card p-4">
            <p className="label-mono mb-1">Other course-based MSc</p>
            <p className="text-sm text-ink-2">Coursework plus a smaller capstone course, no internship requirement.</p>
          </div>
          <div className="bg-sage rounded-card p-4 border border-ua-green/30">
            <p className="label-mono mb-1">MM co-op MSc (this program)</p>
            <p className="text-sm text-ink-2">
              {PROGRAM_FACTS.courseCredits} course credits plus an 8-month, full-time internship worth{' '}
              {PROGRAM_FACTS.internshipCredits} credits, typically completed in {PROGRAM_FACTS.typicalLength}.
            </p>
          </div>
        </div>
      </section>

      <section className="card mb-6">
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

      <section className="card mb-6">
        <h2 className="text-xl mb-3">Program length &amp; scheduling</h2>
        <div className="grid sm:grid-cols-2 gap-4 text-sm text-ink-2">
          <div>
            <p className="label-mono mb-1">Duration</p>
            <p>
              Designed to be completed in {PROGRAM_FACTS.typicalLength}; must be finished within{' '}
              {PROGRAM_FACTS.maxLength} of admission. {PROGRAM_FACTS.residency}.
            </p>
          </div>
          <div>
            <p className="label-mono mb-1">Course scheduling</p>
            <p>
              {PROGRAM_FACTS.scheduling}. Full-time students register in at least {PROGRAM_FACTS.fullTimeCreditsPerTerm}{' '}
              credits per term, and a maximum of {PROGRAM_FACTS.maxCreditsPerTerm} MM credits per term.
            </p>
          </div>
          <div>
            <p className="label-mono mb-1">Publishing course work</p>
            <p>{PROGRAM_FACTS.publishing}.</p>
          </div>
        </div>
      </section>

      <section className="card mb-6">
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

      <section className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="text-lg mb-3">This cohort's six courses ({CURRENT_COHORT_CONFIG.cohortName})</h2>
          <p className="text-sm text-ink-2 mb-3">
            MM 801–806 form the standard six; admin can substitute MM 811/812 for a given cohort since course
            offerings can vary term to term.
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
            {PROGRAM_FACTS.totalCredits} total program credits: {PROGRAM_FACTS.courseCredits} from courses,{' '}
            {PROGRAM_FACTS.internshipCredits} from the internship (50% of the program).
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
            {SUPPLEMENTARY_COURSES.map((c) => (
              <li key={c.code} className="text-xs text-ink-2 pt-1">
                {c.code} — {c.title} ({c.credits} credits), used only when required for a specific student.
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="card mb-6">
        <h2 className="text-lg mb-3">Internship partners</h2>
        <p className="text-sm text-ink-2 mb-3">
          Students can intern with industry or an academic research group, in Canada or abroad (subject to visa
          approval). The program partners with the national research organization MITACS to help facilitate
          placements, alongside a network of industry and university research-group collaborators tied to the
          Multimedia Research Center (MRC).
        </p>
      </section>

      <section className="card mb-6">
        <h2 className="text-lg mb-3">MRC mentors and important contacts</h2>
        <div className="grid sm:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="label-mono mb-1">MM Program admissions</p>
            <p>csmmadm@ualberta.ca — late domestic applications and MM-specific admission questions.</p>
          </div>
          <div>
            <p className="label-mono mb-1">General grad admissions</p>
            <p>csapplygrad@ualberta.ca — Department of Computing Science graduate admissions.</p>
          </div>
          <div>
            <p className="label-mono mb-1">Multimedia Research Center (MRC)</p>
            <p>Faculty research group hosting MM course projects and internship partnerships.</p>
          </div>
        </div>
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

  return content
}