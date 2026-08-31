import { useMemo, useState } from 'react'
import { getAllJobs } from '../../mock-api'
import { JobPosting } from '../../types'
import PageHeader from '../../components/PageHeader'
import Modal from '../../components/Modal'

export default function JobHub() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<JobPosting | null>(null)
  const jobs = getAllJobs()

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return jobs
    return jobs.filter(
      (j) => j.title.toLowerCase().includes(q) || j.company.toLowerCase().includes(q) || j.location.toLowerCase().includes(q),
    )
  }, [jobs, query])

  return (
    <div>
      <PageHeader eyebrow="Opportunities" title="Job & internship hub" description="Postings shared by the MM office. Search by title, company, or location." />

      <input
        className="input mb-6 max-w-md"
        placeholder="Search postings…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((job) => (
          <button key={job.id} onClick={() => setSelected(job)} className="card text-left hover:border-ua-green/50 transition-colors">
            <p className="label-mono mb-1">{job.type === 'internship' ? 'Internship' : 'Job'}</p>
            <h2 className="font-medium mb-1">{job.title}</h2>
            <p className="text-sm text-ink-2 mb-3">
              {job.company} · {job.location}
            </p>
            <div className="flex items-center justify-between text-xs text-ink-2 font-mono">
              <span>Deadline {job.deadline}</span>
              <span>{job.duration}</span>
            </div>
          </button>
        ))}
        {filtered.length === 0 && <p className="text-sm text-ink-2 col-span-full">No postings match your search.</p>}
      </div>

      {selected && (
        <Modal title={selected.title} onClose={() => setSelected(null)}>
          <div className="space-y-4">
            <p className="text-sm text-ink-2">
              {selected.company} · {selected.location}
            </p>
            <p className="text-sm">{selected.description}</p>
            <div>
              <p className="label-mono mb-1">Requirements</p>
              <ul className="list-disc list-inside text-sm text-ink-2 space-y-0.5">
                {selected.requirements.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="label-mono mb-1">Deadline</p>
                <p>{selected.deadline}</p>
              </div>
              <div>
                <p className="label-mono mb-1">Duration</p>
                <p>{selected.duration}</p>
              </div>
              <div>
                <p className="label-mono mb-1">Start date</p>
                <p>{selected.startDate}</p>
              </div>
            </div>
            <a href={selected.applicationLink} target="_blank" rel="noreferrer" className="btn-primary w-full">
              Open application link
            </a>
          </div>
        </Modal>
      )}
    </div>
  )
}
