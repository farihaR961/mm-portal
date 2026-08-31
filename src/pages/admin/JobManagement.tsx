import { useState } from 'react'
import { getAllJobs, addJob, removeJob } from '../../mock-api'
import { JobPosting } from '../../types'
import PageHeader from '../../components/PageHeader'
import Modal from '../../components/Modal'

export default function AdminJobManagement() {
  const [, forceRerender] = useState(0)
  const [creating, setCreating] = useState(false)
  const jobs = getAllJobs()

  const handleAdd = (job: Omit<JobPosting, 'id' | 'postedAt'>) => {
    addJob(job)
    setCreating(false)
    forceRerender((n) => n + 1)
  }

  const handleRemove = (id: string) => {
    removeJob(id)
    forceRerender((n) => n + 1)
  }

  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="Job posting management"
        description="Post job and internship opportunities for the student job hub."
        actions={
          <button className="btn-primary" onClick={() => setCreating(true)}>
            Add posting
          </button>
        }
      />

      <div className="space-y-3">
        {jobs.map((job) => (
          <div key={job.id} className="card flex items-start justify-between gap-4">
            <div>
              <p className="font-medium">{job.title}</p>
              <p className="text-sm text-ink-2">
                {job.company} · {job.location} · Deadline {job.deadline}
              </p>
            </div>
            <button className="text-sm text-red-600 hover:underline flex-shrink-0" onClick={() => handleRemove(job.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>

      {creating && <JobFormModal onClose={() => setCreating(false)} onSave={handleAdd} />}
    </div>
  )
}

function JobFormModal({
  onClose,
  onSave,
}: {
  onClose: () => void
  onSave: (job: Omit<JobPosting, 'id' | 'postedAt'>) => void
}) {
  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    type: 'internship' as 'internship' | 'job',
    description: '',
    requirements: '',
    deadline: '',
    duration: '',
    startDate: '',
    applicationLink: '',
  })

  const update = (key: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [key]: value }))

  return (
    <Modal title="Add job posting" onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSave({
            title: form.title,
            company: form.company,
            location: form.location,
            type: form.type,
            description: form.description,
            requirements: form.requirements.split(',').map((r) => r.trim()).filter(Boolean),
            deadline: form.deadline,
            duration: form.duration,
            startDate: form.startDate,
            applicationLink: form.applicationLink,
          })
        }}
        className="space-y-3"
      >
        <div className="grid grid-cols-2 gap-3">
          <input className="input" placeholder="Title" value={form.title} onChange={(e) => update('title', e.target.value)} required />
          <input className="input" placeholder="Company" value={form.company} onChange={(e) => update('company', e.target.value)} required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input className="input" placeholder="Location" value={form.location} onChange={(e) => update('location', e.target.value)} required />
          <select className="input" value={form.type} onChange={(e) => update('type', e.target.value)}>
            <option value="internship">Internship</option>
            <option value="job">Job</option>
          </select>
        </div>
        <textarea
          className="input"
          rows={3}
          placeholder="Description"
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          required
        />
        <input
          className="input"
          placeholder="Requirements (comma separated)"
          value={form.requirements}
          onChange={(e) => update('requirements', e.target.value)}
        />
        <div className="grid grid-cols-3 gap-3">
          <input type="date" className="input" placeholder="Deadline" value={form.deadline} onChange={(e) => update('deadline', e.target.value)} required />
          <input className="input" placeholder="Duration" value={form.duration} onChange={(e) => update('duration', e.target.value)} required />
          <input type="date" className="input" placeholder="Start date" value={form.startDate} onChange={(e) => update('startDate', e.target.value)} required />
        </div>
        <input
          className="input"
          placeholder="Application link (https://…)"
          value={form.applicationLink}
          onChange={(e) => update('applicationLink', e.target.value)}
          required
        />
        <button type="submit" className="btn-primary w-full">
          Add posting
        </button>
      </form>
    </Modal>
  )
}
