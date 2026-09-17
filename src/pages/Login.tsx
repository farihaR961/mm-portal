import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { STUDENTS } from '../mock-api/students'

export default function Login() {
  const { loginAsAdmin, loginAsStudent } = useAuth()
  const navigate = useNavigate()

  const currentStudents = STUDENTS.filter((s) => s.subRole === 'current')
  const alumni = STUDENTS.filter((s) => s.subRole === 'alumni')

  const handleAdmin = () => {
    loginAsAdmin()
    navigate('/admin')
  }
  const handleStudent = (id: string) => {
    loginAsStudent(id, 'current')
    navigate('/student')
  }
  const handleAlumni = (id: string) => {
    loginAsStudent(id, 'alumni')
    navigate('/alumni')
  }

  return (
    <div className="min-h-screen bg-mist flex flex-col">
      <header className="border-b border-line bg-white">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-9 h-9 rounded-card bg-ua-green flex items-center justify-center text-white font-mono text-sm font-semibold">
            MM
          </div>
          <div>
            <p className="font-semibold leading-tight">MM Portal</p>
            <p className="label-mono leading-tight">University of Alberta · Multimedia Program</p>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-12">
        <div className="max-w-xl mb-10">
          <p className="label-mono mb-2">Sign in</p>
          <h1 className="text-3xl md:text-4xl mb-3">
            Welcome to the <span className="accent">MM</span> Portal
          </h1>
          <p className="text-ink-2">
            Pick a role below to explore the MM portal.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="card flex flex-col">
            <p className="label-mono mb-2">Administrator</p>
            <h2 className="text-lg mb-2">MM Program Admin</h2>
            <p className="text-sm text-ink-2 mb-4 flex-1">
              Manage students, the calendar, job postings, notifications, and export program-wide status reports.
            </p>
            <button onClick={handleAdmin} className="btn-primary w-full">
              Continue as Admin
            </button>
          </div>

          <div className="card flex flex-col">
            <p className="label-mono mb-2">Student</p>
            <h2 className="text-lg mb-2">Current MM Student</h2>
            <p className="text-sm text-ink-2 mb-4 flex-1">
              View your course, internship, and graduation progress, and use the onboarding and job-search tools.
            </p>
            <div className="space-y-2">
              {currentStudents.slice(0, 3).map((s) => (
                <button key={s.id} onClick={() => handleStudent(s.id)} className="btn-secondary w-full justify-between text-sm">
                  <span>{s.name}</span>
                  <span className="label-mono">{s.cohort}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="card flex flex-col">
            <p className="label-mono mb-2">Alumni</p>
            <h2 className="text-lg mb-2">MM Alumni</h2>
            <p className="text-sm text-ink-2 mb-4 flex-1">
              Access your program record, alumni events, and ways to stay connected with the MM community.
            </p>
            <div className="space-y-2">
              {alumni.map((s) => (
                <button key={s.id} onClick={() => handleAlumni(s.id)} className="btn-secondary w-full justify-between text-sm">
                  <span>{s.name}</span>
                  <span className="label-mono">Class of {s.gradYear}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button onClick={() => navigate('/program')} className="btn-ghost text-sm">
            Browse program information without signing in →
          </button>
        </div>
      </main>
    </div>
  )
}
