import { useState, FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth, homePathFor } from '../context/AuthContext'

function EyeIcon({ off }: { off: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      {off && <path d="M4 4l16 16" />}
    </svg>
  )
}

function MmMark({ size = 'md' }: { size?: 'md' | 'sm' }) {
  const box = size === 'md' ? 'w-9 h-9 text-sm' : 'w-7 h-7 text-xs'
  return (
    <div
      className={`${box} rounded-card bg-white/10 border border-white/30 flex items-center justify-center text-white font-mono font-semibold`}
    >
      MM
    </div>
  )
}

export default function Login() {
  const { session, login } = useAuth()
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  // Already signed in: skip the login page and go to your own portal.
  if (session) return <Navigate to={homePathFor(session)} replace />

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // A CCID like "fariha5" and the full email "fariha5@ualberta.ca" both work.
    const typed = identifier.trim()
    const email = typed.includes('@') || typed === '' ? typed : `${typed}@ualberta.ca`
    const result = login(email, password)
    if (!result.ok) {
      setError(result.error)
      return
    }
    setError('')
    navigate(result.redirectTo)
  }

  return (
    <div className="min-h-screen flex flex-col bg-mist">
      {/* Top bar */}
      <header className="bg-ua-deep-green">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <button onClick={() => navigate('/')} className="flex items-center gap-3 text-left">
            <MmMark />
            <div>
              <p className="text-white font-semibold leading-tight">MM Program</p>
              <p className="font-mono text-[11px] tracking-wide text-white/70 leading-tight">
                University of Alberta · Multimedia
              </p>
            </div>
          </button>
          <button onClick={() => navigate('/')} className="text-sm text-white/80 hover:text-white hover:underline">
            ← MM Program home
          </button>
        </div>
      </header>

      {/* Centered sign-in card */}
      <main className="flex-1 px-4 py-12 md:py-16">
        <div className="w-full max-w-lg mx-auto">
          <div className="bg-white border border-line rounded-card shadow-sm p-6 sm:p-8">
            <div className="text-center mb-6">
              <p className="text-ink-2">Campus Computing ID</p>
              <h1 className="text-4xl font-bold leading-tight">Multimedia Portal</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="ccid" className="text-sm font-medium block mb-1">
                  CCID
                </label>
                <input
                  id="ccid"
                  type="text"
                  autoComplete="username"
                  autoCapitalize="none"
                  spellCheck={false}
                  className="input py-3"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password" className="text-sm font-medium block mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    className="input py-3 pr-11"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-ink-2/60 hover:text-ua-deep-green transition-colors"
                  >
                    <EyeIcon off={showPassword} />
                  </button>
                </div>
              </div>

              {error && (
                <p
                  role="alert"
                  className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-card px-3 py-2"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-ua-deep-green text-white font-medium py-3 rounded-card hover:brightness-125 active:scale-[0.99] transition-all"
              >
                Login
              </button>
            </form>

            <p className="text-right text-sm mt-5">
              <a href="mailto:csmmadm@ualberta.ca" className="text-ua-deep-green underline underline-offset-2">
                Need access? Contact the MM office
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Bottom bar */}
      <footer className="bg-ua-deep-green text-white/80">
        <div className="max-w-6xl mx-auto px-6 py-6 grid gap-4 sm:grid-cols-3 sm:items-center text-sm">
          <button onClick={() => navigate('/')} className="text-left hover:text-white hover:underline">
            MM Program home
          </button>
          <div className="flex items-center gap-3 sm:justify-center">
            <MmMark size="sm" />
            <span className="font-semibold text-white">MM Portal</span>
          </div>
          <p className="sm:text-right font-mono text-[11px] tracking-wide">© 2026 Multimedia UofA</p>
        </div>
      </footer>
    </div>
  )
}