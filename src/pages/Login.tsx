import { useState, FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth, homePathFor } from '../context/AuthContext'
import { USER_ACCOUNTS, describeRole, UserAccount } from '../mock-api'
import Footer from '../components/Footer'

const AUDIENCES = [
  { who: 'Students', what: 'Track courses, internship progress, forms, and graduation requirements.' },
  { who: 'Alumni', what: 'Keep your program record and stay connected with the MM community.' },
  { who: 'Program staff', what: 'See where every student is and manage the calendar and opportunities.' },
  { who: 'Industry partners', what: 'Work with the MM program on projects and placements.' },
]

export default function Login() {
  const { session, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  // Already signed in: skip the login page and go to your own portal.
  if (session) return <Navigate to={homePathFor(session)} replace />

  const demoAccounts = [
    USER_ACCOUNTS.find((a) => a.role === 'admin'),
    USER_ACCOUNTS.find((a) => a.role === 'student' && a.subRole === 'current'),
    USER_ACCOUNTS.find((a) => a.role === 'student' && a.subRole === 'alumni'),
    USER_ACCOUNTS.find((a) => a.role === 'partner'),
  ].filter((a): a is UserAccount => Boolean(a))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const result = login(email, password)
    if (!result.ok) {
      setError(result.error)
      return
    }
    setError('')
    navigate(result.redirectTo)
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
              <p className="font-semibold leading-tight">MM Program</p>
              <p className="label-mono leading-tight">University of Alberta · Multimedia</p>
            </div>
          </button>
          <button onClick={() => navigate('/')} className="btn-ghost text-sm">
            ← MM Program home
          </button>
        </div>
      </header>

      <main className="flex-1 grid md:grid-cols-[1.1fr_1fr]">
        <section className="bg-mist border-b md:border-b-0 md:border-r border-line">
          <div className="max-w-lg mx-auto px-6 py-14 md:py-20">
            <p className="label-mono mb-3">University of Alberta · Multimedia Program</p>
            <h1 className="text-3xl md:text-4xl leading-tight mb-4">MM Portal</h1>
            <p className="text-ink-2 leading-relaxed mb-8">
              One place for the MM program community. Sign in with your UAlberta email, and the portal shows what
              is relevant to your role in the program.
            </p>
            <ul className="space-y-4">
              {AUDIENCES.map((a) => (
                <li key={a.who} className="border-l-2 border-ua-gold pl-4">
                  <p className="font-medium text-sm">{a.who}</p>
                  <p className="text-sm text-ink-2 mt-0.5">{a.what}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="flex items-center justify-center px-6 py-14">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl mb-1">Sign in</h2>
            <p className="text-sm text-ink-2 mb-6">Use your UAlberta email address.</p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="email" className="text-sm font-medium block mb-1">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  className="input"
                  placeholder="ccid@ualberta.ca"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="password" className="text-sm font-medium block mb-1">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  className="input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && (
                <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-card px-3 py-2">
                  {error}
                </p>
              )}
              <button type="submit" className="btn-primary w-full">
                Log in
              </button>
            </form>

            <p className="text-xs text-ink-2 mt-5">
              Need access? Contact the MM office at{' '}
              <a href="mailto:csmmadm@ualberta.ca" className="text-ua-deep-green hover:underline">
                csmmadm@ualberta.ca
              </a>
              .
            </p>

            <details className="mt-8 border border-line rounded-card">
              <summary className="px-4 py-3 text-sm cursor-pointer text-ink-2 hover:text-ua-deep-green">
                Prototype demo accounts
              </summary>
              <div className="px-4 pb-4">
                <p className="text-xs text-ink-2 mb-3">
                  Prototype only: any password works. The email decides the role. Real UAlberta sign-in comes later.
                </p>
                <ul className="space-y-2">
                  {demoAccounts.map((a) => (
                    <li key={a.email}>
                      <button
                        type="button"
                        onClick={() => {
                          setEmail(a.email)
                          setPassword('demo-password')
                          setError('')
                        }}
                        className="w-full text-left text-sm border border-line rounded-card px-3 py-2 hover:bg-mist transition-colors"
                      >
                        <span className="font-mono text-xs block">{a.email}</span>
                        <span className="text-xs text-ink-2">{describeRole(a)}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </details>
          </div>
        </section>
      </main>

      <Footer maxWidth="max-w-5xl" />
    </div>
  )
}