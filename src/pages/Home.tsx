import { useNavigate } from 'react-router-dom'
import { PROGRAM_FACTS } from '../mock-api'
import Footer from '../components/Footer'

const HIGHLIGHTS = [
  {
    title: 'Co-op by design',
    body: 'Half the program is an 8-month, full-time internship — not an add-on, but a core degree requirement.',
  },
  {
    title: 'Real industry projects',
    body: 'Course projects come from industrial collaborators, MRC researchers, and faculty, not textbook exercises.',
  },
  {
    title: 'One place to track it',
    body: 'Courses, internship status, forms, and graduation progress, all in a single student view.',
  },
]

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="border-b border-line bg-white sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-card bg-ua-green flex items-center justify-center text-white font-mono text-sm font-semibold">
              MM
            </div>
            <div>
              <p className="font-semibold leading-tight">MM Portal</p>
              <p className="label-mono leading-tight">University of Alberta · Multimedia Program</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2">
            <button onClick={() => navigate('/program')} className="btn-ghost text-sm">
              Program information
            </button>
            <button onClick={() => navigate('/login')} className="btn-primary text-sm">
              Log in
            </button>
          </div>
        </div>
      </header>

      <section className="border-b border-line">
        <div className="max-w-5xl mx-auto px-4 pt-20 pb-16">
          <p className="label-mono mb-4">Department of Computing Science · Faculty of Science</p>
          <h1 className="text-4xl md:text-6xl leading-[1.08] max-w-3xl mb-6">
            MSc in Computing Science, <span className="font-bold">Specialization in Multimedia</span>
          </h1>
          <p className="text-ink-2 max-w-xl leading-relaxed mb-10 text-lg">
            A course-based, co-op Master's degree with a mandatory eight-month industry internship.
          </p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => navigate('/login')} className="btn-primary">
              Log in to the portal
            </button>
            <button onClick={() => navigate('/program')} className="btn-secondary">
              Read the program overview
            </button>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-mist">
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-3 divide-x divide-line text-center">
          <div className="px-4">
            <p className="text-3xl md:text-4xl font-semibold text-ua-deep-green">{PROGRAM_FACTS.totalCredits}</p>
            <p className="label-mono mt-1">total credits</p>
          </div>
          <div className="px-4">
            <p className="text-3xl md:text-4xl font-semibold text-ua-deep-green">8 months</p>
            <p className="label-mono mt-1">full-time internship</p>
          </div>
          <div className="px-4">
            <p className="text-3xl md:text-4xl font-semibold text-ua-deep-green">{PROGRAM_FACTS.typicalLength}</p>
            <p className="label-mono mt-1">typical duration</p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-20 w-full">
        <div className="grid md:grid-cols-[280px_1fr] gap-12">
          <div>
            <p className="label-mono mb-2">Why this program</p>
            <h2 className="text-2xl leading-snug">
              Course-based, co-op, and built around real R&amp;D work.
            </h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-8">
            {HIGHLIGHTS.map((h, i) => (
              <div key={h.title} className="border-t-2 border-ua-gold pt-4">
                <p className="font-mono text-xs text-ink-2 mb-2">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="font-medium mb-2">{h.title}</h3>
                <p className="text-sm text-ink-2 leading-relaxed">{h.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ua-deep-green">
        <div className="max-w-5xl mx-auto px-4 py-14 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-white/60 label-mono mb-2">Already admitted?</p>
            <h2 className="text-white text-2xl">Sign in to check your program status.</h2>
          </div>
          <button onClick={() => navigate('/login')} className="btn-primary flex-shrink-0">
            Log in to the portal
          </button>
        </div>
      </section>

      <Footer maxWidth="max-w-5xl" />
    </div>
  )
}