import { useCurrentStudent } from '../hooks/useCurrentStudent'
import { getAllJobs, getAllEvents } from '../mock-api'
import PageHeader from '../components/PageHeader'
import CategoryTag from '../components/CategoryTag'

export default function AlumniPortal() {
  const alumnus = useCurrentStudent()
  if (!alumnus) return null

  const alumniEvents = getAllEvents().filter((e) => e.category === 'event')
  const jobs = getAllJobs()

  return (
    <div>
      <PageHeader eyebrow={`Class of ${alumnus.gradYear}`} title={`Welcome back, ${alumnus.name.split(' ')[0]}`} description="Your MM program record and ways to stay connected with the community." />

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div className="card">
          <h2 className="text-lg mb-4">Alumni profile</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-line pb-2">
              <dt className="text-ink-2">Cohort</dt>
              <dd className="font-medium">{alumnus.cohort}</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-2">
              <dt className="text-ink-2">Current role</dt>
              <dd className="font-medium">{alumnus.currentRole ?? 'Not shared'}</dd>
            </div>
            <div className="flex justify-between border-b border-line pb-2">
              <dt className="text-ink-2">Current company</dt>
              <dd className="font-medium">{alumnus.currentCompany ?? 'Not shared'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-2">Internship placement</dt>
              <dd className="font-medium">{alumnus.internship.companyOrGroup}</dd>
            </div>
          </dl>
        </div>

        <div className="card">
          <h2 className="text-lg mb-4">Past program record</h2>
          <ul className="space-y-2 text-sm">
            {alumnus.courses.map((c) => (
              <li key={c.code} className="flex justify-between border-b border-line last:border-0 pb-1 last:pb-0">
                <span>
                  {c.code} — {c.title}
                </span>
                <span className="font-mono text-ink-2">{c.grade}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-lg mb-4">Upcoming alumni events</h2>
          {alumniEvents.length === 0 ? (
            <p className="text-sm text-ink-2">No alumni events scheduled right now.</p>
          ) : (
            <ul className="space-y-3">
              {alumniEvents.map((e) => (
                <li key={e.id} className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">{e.title}</p>
                    <p className="text-xs text-ink-2 font-mono">{e.date}</p>
                  </div>
                  <CategoryTag category={e.category} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="card">
          <h2 className="text-lg mb-4">Current openings you might refer someone to</h2>
          <ul className="space-y-2 text-sm">
            {jobs.slice(0, 3).map((j) => (
              <li key={j.id} className="border-b border-line last:border-0 pb-2 last:pb-0">
                <p className="font-medium">{j.title}</p>
                <p className="text-ink-2 text-xs">{j.company}</p>
              </li>
            ))}
          </ul>
          <p className="text-xs text-ink-2 mt-3">Want to post an opportunity for current students? Contact the MM administrator.</p>
        </div>
      </div>
    </div>
  )
}
