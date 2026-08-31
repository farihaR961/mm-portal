import { useState } from 'react'
import { useCurrentStudent } from '../../hooks/useCurrentStudent'
import PageHeader from '../../components/PageHeader'

type Tab = 'resume' | 'linkedin' | 'search'

const RESUME_FIELDS = [
  { key: 'headline', label: 'Professional headline', placeholder: 'MM Co-op Student — Computer Vision & Graphics' },
  { key: 'summary', label: 'Short summary (2-3 sentences)', placeholder: 'What you focus on and what you are looking for' },
  { key: 'skills', label: 'Key skills (comma separated)', placeholder: 'Python, PyTorch, C++, OpenCV' },
  { key: 'projects', label: 'Notable course projects', placeholder: 'MM 805 project: real-time object tracking demo' },
  { key: 'education', label: 'Education', placeholder: 'MSc Multimedia (Co-op), University of Alberta, expected 2028' },
]

const LINKEDIN_STEPS = [
  { title: 'Create your profile photo & banner', detail: 'Use a plain-background headshot and a simple banner — avoid busy graphics.' },
  { title: 'Write your headline', detail: 'Lead with "MM Co-op Student, University of Alberta" plus your area of focus.' },
  { title: 'Fill in your About section', detail: 'Reuse the summary from your resume tool draft as a starting point.' },
  { title: 'Add your MM coursework and projects', detail: 'List completed courses and any project outcomes worth highlighting.' },
  { title: 'Connect with your cohort and MRC contacts', detail: 'Start with classmates, MM alumni, and instructors before reaching out to companies.' },
]

const JOB_SEARCH_TIPS = [
  { title: 'Where to look', detail: 'Start with the portal Job Hub, then UofA Career Centre postings, and MRC industry partner pages.' },
  { title: 'How to start', detail: 'Shortlist 10–15 roles that match your coursework, then tailor your resume per application rather than mass-applying.' },
  { title: 'What to prepare', detail: 'A one-page resume, a short portfolio of course projects, and 2-3 rehearsed answers about your strongest project.' },
]

export default function StudentTools() {
  const student = useCurrentStudent()
  const [tab, setTab] = useState<Tab>('resume')
  const [fields, setFields] = useState<Record<string, string>>(student?.resumeDraft ?? {})
  const [generated, setGenerated] = useState(false)

  if (!student) return null

  return (
    <div>
      <PageHeader eyebrow="Tools" title="Resume, LinkedIn & job search" description="Step-by-step guides to help you get ready for the internship search." />

      <div className="flex gap-1 bg-mist rounded-card p-1 mb-6 w-fit">
        {(['resume', 'linkedin', 'search'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`text-sm px-4 py-1.5 rounded-card capitalize ${tab === t ? 'bg-white shadow-sm font-medium' : 'text-ink-2'}`}
          >
            {t === 'search' ? 'Job search tips' : t}
          </button>
        ))}
      </div>

      {tab === 'resume' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-lg mb-4">Fill in your information</h2>
            <div className="space-y-4">
              {RESUME_FIELDS.map((f) => (
                <div key={f.key}>
                  <label className="text-sm font-medium block mb-1">{f.label}</label>
                  <textarea
                    className="input"
                    rows={f.key === 'summary' ? 3 : 2}
                    placeholder={f.placeholder}
                    value={fields[f.key] ?? ''}
                    onChange={(e) => setFields((prev) => ({ ...prev, [f.key]: e.target.value }))}
                  />
                </div>
              ))}
            </div>
            <button className="btn-primary mt-4 w-full" onClick={() => setGenerated(true)}>
              Generate resume preview
            </button>
          </div>

          <div className="card">
            <h2 className="text-lg mb-1">Resume preview</h2>
            <p className="text-xs text-ink-2 mb-4">
              Uses a placeholder MM layout for this prototype — swap in the real MM resume template once it's added
              to the repo.
            </p>
            {!generated ? (
              <p className="text-sm text-ink-2">Fill in the form and generate a preview to see it here.</p>
            ) : (
              <div className="border border-line rounded-card p-4 font-serif text-sm space-y-3 bg-white">
                <div>
                  <p className="text-lg font-semibold">{student.name}</p>
                  <p className="text-ink-2">{fields.headline || 'Professional headline'}</p>
                  <p className="text-xs text-ink-2">{student.email}</p>
                </div>
                <div>
                  <p className="font-semibold text-xs uppercase tracking-wide border-b border-line pb-1 mb-1">Summary</p>
                  <p>{fields.summary || '—'}</p>
                </div>
                <div>
                  <p className="font-semibold text-xs uppercase tracking-wide border-b border-line pb-1 mb-1">Skills</p>
                  <p>{fields.skills || '—'}</p>
                </div>
                <div>
                  <p className="font-semibold text-xs uppercase tracking-wide border-b border-line pb-1 mb-1">Projects</p>
                  <p>{fields.projects || '—'}</p>
                </div>
                <div>
                  <p className="font-semibold text-xs uppercase tracking-wide border-b border-line pb-1 mb-1">Education</p>
                  <p>{fields.education || '—'}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {tab === 'linkedin' && (
        <div className="card max-w-2xl">
          <h2 className="text-lg mb-4">Set up LinkedIn</h2>
          <p className="text-sm text-ink-2 mb-4">Your saved progress: step {student.linkedinSetupStep} of {LINKEDIN_STEPS.length}.</p>
          <ol className="space-y-4">
            {LINKEDIN_STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-3">
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono flex-shrink-0 ${
                    i < student.linkedinSetupStep ? 'bg-ua-green text-white' : 'bg-mist text-ink-2'
                  }`}
                >
                  {i + 1}
                </div>
                <div>
                  <p className="font-medium text-sm">{step.title}</p>
                  <p className="text-xs text-ink-2">{step.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      )}

      {tab === 'search' && (
        <div className="grid sm:grid-cols-3 gap-4">
          {JOB_SEARCH_TIPS.map((tip) => (
            <div key={tip.title} className="card">
              <h2 className="font-medium mb-2">{tip.title}</h2>
              <p className="text-sm text-ink-2">{tip.detail}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
