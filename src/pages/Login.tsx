import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { STUDENTS } from '../mock-api/students'
import Footer from '../components/Footer'

function AdminIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.6 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  )
}

function StudentIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5" />
    </svg>
  )
}

function AlumniIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="8" r="5" />
      <path d="M8.5 13.5 7 22l5-3 5 3-1.5-8.5" />
    </svg>
  )
}

export default function Login() {
  const { loginAsAdmin, loginAsStudent } = useAuth()
  const navigate = useNavigate()

  const [studentEmail, setStudentEmail] = useState('')
  const [studentPassword, setStudentPassword] = useState('')
  const [studentError, setStudentError] = useState('')

  const [alumniEmail, setAlumniEmail] = useState('')
  const [alumniPassword, setAlumniPassword] = useState('')
  const [alumniError, setAlumniError] = useState('')

  const currentStudents = STUDENTS.filter((s) => s.subRole === 'current')
  const alumni = STUDENTS.filter((s) => s.subRole === 'alumni')

  const handleAdmin = () => {
    loginAsAdmin()
    navigate('/admin')
  }

  const handleStudentSubmit = (e: FormEvent) => {
    e.preventDefault()
    const email = studentEmail.trim().toLowerCase()
    if (!email.endsWith('@ualberta.ca') || !studentPassword) {
      setStudentError('Enter a valid @ualberta.ca email and password.')
      return
    }
    setStudentError('')
    const match = currentStudents.find((s) => s.email.toLowerCase() === email)
    loginAsStudent(match ? match.id : currentStudents[0].id, 'current')
    navigate('/student')
  }

  const handleAlumniSubmit = (e: FormEvent) => {
    e.preventDefault()
    const email = alumniEmail.trim().toLowerCase()
    if (!email.endsWith('@ualberta.ca') || !alumniPassword) {
      setAlumniError('Enter a valid @ualberta.ca email and password.')
      return
    }
    setAlumniError('')
    const match = alumni.find((s) => s.email.toLowerCase() === email)
    loginAsStudent(match ? match.id : alumni[0].id, 'alumni')
    navigate('/alumni')
  }

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
          <button onClick={() => navigate('/program')} className="btn-ghost text-sm">
            Program information
          </button>
        </div>
      </header>

      <section className="border-b border-line bg-mist relative overflow-hidden">
        <svg
          className="absolute right-0 top-0 h-full opacity-[0.06] pointer-events-none"
          viewBox="0 0 300 200"
          fill="none"
        >
          <circle cx="260" cy="40" r="90" stroke="#0B3D23" strokeWidth="1.5" />
          <circle cx="260" cy="40" r="130" stroke="#0B3D23" strokeWidth="1.5" />
          <circle cx="260" cy="40" r="170" stroke="#0B3D23" strokeWidth="1.5" />
        </svg>
        <div className="max-w-5xl mx-auto px-4 pt-14 pb-10 relative">
          <p className="label-mono mb-3">Sign in</p>
          <h1 className="text-3xl md:text-4xl mb-3 max-w-xl">
            Welcome back to the <span className="font-bold">MM Portal</span>
          </h1>
          <p className="text-ink-2 max-w-lg">
            Sign in with your ualberta mail.
          </p>
        </div>
      </section>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-14">
        <div className="grid md:grid-cols-3 gap-5">
          <div className="card flex flex-col border-t-4 border-ua-deep-green">
            <div className="text-ua-deep-green mb-4">
              <AdminIcon />
            </div>
            <p className="label-mono mb-2">Administrator</p>
            <h2 className="text-lg mb-2">MM Program Admin</h2>
            <p className="text-sm text-ink-2 mb-6 flex-1 leading-relaxed">
              Manage students, the calendar, job postings, notifications, and export program-wide status reports.
            </p>
            <button onClick={handleAdmin} className="btn-primary w-full">
              Continue as Admin
            </button>
          </div>

          <div className="card flex flex-col border-t-4 border-ua-green">
            <div className="text-ua-green mb-4">
              <StudentIcon />
            </div>
            <p className="label-mono mb-2">Student</p>
            <h2 className="text-lg mb-2">Current MM Student</h2>
            <p className="text-sm text-ink-2 mb-4 leading-relaxed">
              Sign in with your @ualberta.ca email.
            </p>
            <form onSubmit={handleStudentSubmit} className="space-y-2 mt-auto">
              <input
                type="email"
                className="input text-sm"
                placeholder="ccid@ualberta.ca"
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
              />
              <input
                type="password"
                className="input text-sm"
                placeholder="Password"
                value={studentPassword}
                onChange={(e) => setStudentPassword(e.target.value)}
              />
              {studentError && <p className="text-xs text-red-600">{studentError}</p>}
              <button type="submit" className="btn-primary w-full text-sm">
                Sign in
              </button>
            </form>
            <details className="mt-3">
              <summary className="text-xs text-ink-2 cursor-pointer hover:text-ua-deep-green">
                Sample CCID emails
              </summary>
              <ul className="mt-2 space-y-1">
                {currentStudents.slice(0, 3).map((s) => (
                  <li key={s.id} className="text-xs font-mono text-ink-2">
                    {s.email}
                  </li>
                ))}
              </ul>
            </details>
          </div>

          <div className="card flex flex-col border-t-4 border-ua-gold">
            <div className="text-ink mb-4">
              <AlumniIcon />
            </div>
            <p className="label-mono mb-2">Alumni</p>
            <h2 className="text-lg mb-2">MM Alumni</h2>
            <p className="text-sm text-ink-2 mb-4 leading-relaxed">
              Sign in with your @ualberta.ca email.
            </p>
            <form onSubmit={handleAlumniSubmit} className="space-y-2 mt-auto">
              <input
                type="email"
                className="input text-sm"
                placeholder="ccid@ualberta.ca"
                value={alumniEmail}
                onChange={(e) => setAlumniEmail(e.target.value)}
              />
              <input
                type="password"
                className="input text-sm"
                placeholder="Password"
                value={alumniPassword}
                onChange={(e) => setAlumniPassword(e.target.value)}
              />
              {alumniError && <p className="text-xs text-red-600">{alumniError}</p>}
              <button type="submit" className="btn-primary w-full text-sm">
                Sign in
              </button>
            </form>
            <details className="mt-3">
              <summary className="text-xs text-ink-2 cursor-pointer hover:text-ua-deep-green">
                Sample CCID emails
              </summary>
              <ul className="mt-2 space-y-1">
                {alumni.map((s) => (
                  <li key={s.id} className="text-xs font-mono text-ink-2">
                    {s.email}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </div>
      </main>

      <Footer maxWidth="max-w-5xl" />
    </div>
  )
}