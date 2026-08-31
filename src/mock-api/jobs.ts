import { JobPosting } from '../types'

// Placeholder postings — replace with the real sample postings once provided.
export let JOB_POSTINGS: JobPosting[] = [
  {
    id: 'job-1',
    title: 'Multimedia Software Intern',
    company: 'Northlight Studios',
    location: 'Edmonton, AB (hybrid)',
    type: 'internship',
    description:
      'Work with the engine team on tools for real-time rendering and asset pipelines used across Northlight\'s animation productions.',
    requirements: ['Familiarity with C++ or C#', 'Coursework in graphics or computer vision', 'Comfortable with Git'],
    deadline: '2027-02-15',
    duration: '8 months',
    startDate: '2027-05-04',
    applicationLink: 'https://example.com/careers/northlight-mm-intern',
    postedAt: '2027-01-05',
  },
  {
    id: 'job-2',
    title: 'Computer Vision Intern',
    company: 'Aurora Health Analytics',
    location: 'Remote (Canada)',
    type: 'internship',
    description:
      'Support a small applied-ML team building vision models for clinical imaging workflows, from data pipeline to model evaluation.',
    requirements: ['Python and PyTorch experience', 'Interest in medical imaging', 'MM 805 or equivalent coursework preferred'],
    deadline: '2027-02-01',
    duration: '8 months',
    startDate: '2027-05-01',
    applicationLink: 'https://example.com/careers/aurora-cv-intern',
    postedAt: '2027-01-08',
  },
  {
    id: 'job-3',
    title: 'Video Systems Intern',
    company: 'Beacon Interactive Inc.',
    location: 'Calgary, AB',
    type: 'internship',
    description: 'Contribute to real-time video compression and streaming quality tooling for a live-events platform.',
    requirements: ['Signal/video processing coursework', 'C++ experience', 'Interest in live streaming systems'],
    deadline: '2027-01-25',
    duration: '8 months',
    startDate: '2027-04-15',
    applicationLink: 'https://example.com/careers/beacon-video-intern',
    postedAt: '2026-12-15',
  },
]

export function getAllJobs(): JobPosting[] {
  return [...JOB_POSTINGS].sort((a, b) => b.postedAt.localeCompare(a.postedAt))
}

export function addJob(job: Omit<JobPosting, 'id' | 'postedAt'>): JobPosting {
  const newJob: JobPosting = { ...job, id: `job-${Date.now()}`, postedAt: new Date().toISOString().slice(0, 10) }
  JOB_POSTINGS = [...JOB_POSTINGS, newJob]
  return newJob
}

export function removeJob(id: string): void {
  JOB_POSTINGS = JOB_POSTINGS.filter((j) => j.id !== id)
}
