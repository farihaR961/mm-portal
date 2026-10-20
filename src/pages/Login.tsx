import { useState, FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth, homePathFor } from '../context/AuthContext'
import { CodeSent } from '../mock-api'
import Modal from '../components/Modal'

type Step = 'credentials' | 'code'

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
  const { session, beginLogin, verifyCode, resendCode, cancelLogin } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState<Step>('credentials')
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [codeSent, setCodeSent] = useState<CodeSent | null>(null)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [toastOpen, setToastOpen] = useState(false)
  const [emailOpen, setEmailOpen] = useState(false)

  // Already signed in: skip the login page and go to your own portal.
  if (session) return <Navigate to={homePathFor(session)} replace />

  // Go back to the first step, optionally showing why.
  const backToStart = (message = '') => {
    cancelLogin()
    setStep('credentials')
    setCodeSent(null)
    setCode('')
    setPassword('')
    setNotice('')
    setToastOpen(false)
    setEmailOpen(false)
    setError(message)
  }

  const handleCredentials = (e: FormEvent) => {
    e.preventDefault()
    // A CCID like "fariha5" and the full email "fariha5@ualberta.ca" both work.
    const typed = identifier.trim()
    const email = typed.includes('@') || typed === '' ? typed : `${typed}@ualberta.ca`
    const result = beginLogin(email, password)
    if (!result.ok) {
      setError(result.error)
      return
    }
    if (result.step === 'done') {
      navigate(result.redirectTo)
      return
    }
    setCodeSent(result)
    setStep('code')
    setCode('')
    setError('')
    setNotice('')
    setToastOpen(true)
  }

  const handleVerify = (e: FormEvent) => {
    e.preventDefault()
    const result = verifyCode(code)
    if (!result.ok) {
      if (result.restart) {
        backToStart(result.error)
        return
      }
      setError(result.error)
      setNotice('')
      setCode('')
      return
    }
    navigate(result.redirectTo)
  }

  const handleResend = () => {
    const result = resendCode()
    if (!result.ok) {
      backToStart(result.error)
      return
    }
    if (result.step === 'code') {
      setCodeSent(result)
      setCode('')
      setError('')
      setNotice('A new code was sent.')
      setToastOpen(true)
    }
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
          {step === 'credentials' && (
            <div className="bg-white border border-line rounded-card shadow-sm p-6 sm:p-8">
              <div className="text-center mb-6">
                <p className="text-ink-2">Campus Computing ID</p>
                <h1 className="text-4xl font-bold leading-tight">MM Portal</h1>
              </div>

              <form onSubmit={handleCredentials} className="space-y-4" noValidate>
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
          )}

          {step === 'code' && codeSent && (
            <>
              <div className="bg-white border border-line rounded-card shadow-sm p-6 sm:p-8">
                <div className="text-center mb-4">
                  <p className="text-ink-2">2-step verification</p>
                  <h1 className="text-4xl font-bold leading-tight">Check your email</h1>
                </div>

                <p className="text-sm text-ink-2 text-center mb-6">
                  We sent a 6-digit code to{' '}
                  <span className="font-medium text-ink">{codeSent.maskedEmail}</span>. It expires in{' '}
                  {codeSent.expiresInMinutes} minutes.
                </p>

                <form onSubmit={handleVerify} className="space-y-4" noValidate>
                  <div>
                    <label htmlFor="code" className="text-sm font-medium block mb-1">
                      Verification code
                    </label>
                    <input
                      id="code"
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      autoFocus
                      maxLength={6}
                      className="input py-3 text-center font-mono text-2xl tracking-[0.5em]"
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    />
                  </div>

                  {notice && (
                    <p
                      role="status"
                      className="text-sm text-ua-deep-green bg-sage border border-ua-green/30 rounded-card px-3 py-2"
                    >
                      {notice}
                    </p>
                  )}
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
                    disabled={code.length !== 6}
                    className="w-full bg-ua-deep-green text-white font-medium py-3 rounded-card hover:brightness-125 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:brightness-100"
                  >
                    Verify and sign in
                  </button>
                </form>

                <div className="flex items-center justify-between gap-4 text-sm mt-5">
                  <button
                    type="button"
                    onClick={() => backToStart()}
                    className="text-ua-deep-green underline underline-offset-2"
                  >
                    ← Use a different account
                  </button>
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-ua-deep-green underline underline-offset-2"
                  >
                    Send a new code
                  </button>
                </div>

                <p className="text-xs text-ink-2 text-center mt-5 pt-5 border-t border-line">
                  <span className="font-medium text-ink">Prototype:</span> no real email is sent.{' '}
                  <button
                    type="button"
                    onClick={() => setEmailOpen(true)}
                    className="text-ua-deep-green underline underline-offset-2"
                  >
                    Open the demo email
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </main>

      {/* A "new email" notification, like one arriving in an inbox */}
      {step === 'code' && codeSent && toastOpen && !emailOpen && (
        <div
          role="status"
          className="fixed z-40 bottom-4 left-4 right-4 sm:left-auto sm:right-4 sm:w-80 bg-white border border-line border-l-4 border-l-ua-gold rounded-card shadow-lg p-4 animate-fade-up"
        >
          <div className="flex items-start gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#007C41"
              strokeWidth="1.75"
              className="mt-0.5 flex-shrink-0"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="m3 7 9 6 9-6" />
            </svg>
            <div className="flex-1 min-w-0">
              <p className="label-mono mb-0.5">Demo inbox · new email</p>
              <p className="text-sm font-medium truncate">{codeSent.mockEmail.subject}</p>
              <button
                type="button"
                onClick={() => {
                  setEmailOpen(true)
                  setToastOpen(false)
                }}
                className="text-sm text-ua-deep-green underline underline-offset-2 mt-1"
              >
                Open email
              </button>
            </div>
            <button
              type="button"
              onClick={() => setToastOpen(false)}
              aria-label="Dismiss"
              className="text-ink-2 hover:text-ink text-xl leading-none"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* The mock email itself, opened from the notification or the link in the card */}
      {emailOpen && codeSent && (
        <Modal title="Demo email" onClose={() => setEmailOpen(false)}>
          
          <div className="border border-line rounded-card text-sm">
            <div className="px-3 py-2 bg-mist border-b border-line text-xs space-y-0.5">
              <p>
                <span className="text-ink-2">To:</span> {codeSent.mockEmail.to}
              </p>
              <p>
                <span className="text-ink-2">Subject:</span> {codeSent.mockEmail.subject}
              </p>
            </div>
            <div className="px-3 py-4">
              <p className="text-ink-2 mb-3">{codeSent.mockEmail.body}</p>
              <p className="font-mono text-3xl tracking-[0.3em] text-ink">{codeSent.mockEmail.code}</p>
            </div>
          </div>
        </Modal>
      )}

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