import { useState, FormEvent } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth, homePathFor } from '../context/AuthContext'
import { USER_ACCOUNTS, describeRole, UserAccount } from '../mock-api'
import Footer from '../components/Footer'

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  )
}

function EyeIcon({ off }: { off: boolean }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
      <circle cx="12" cy="12" r="3" />
      {off && <path d="M4 4l16 16" />}
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

// Left illustration: a video editor with a film strip and an image card.
function CreateIllustration() {
  return (
    <svg viewBox="0 0 320 380" className="w-full max-w-[300px]" fill="none">
      {/* soft backdrop shapes */}
      <circle cx="165" cy="200" r="144" fill="#E3EDE6" />
      <circle cx="165" cy="200" r="144" stroke="#007C41" strokeOpacity="0.15" strokeWidth="1.5" />

      {/* Monitor */}
      <rect x="40" y="70" width="230" height="150" rx="10" fill="white" stroke="#0B3D23" strokeWidth="2.5" />
      <rect x="52" y="82" width="206" height="102" rx="5" fill="#0B3D23" />
      {/* screen scene: sun + hills */}
      <circle cx="215" cy="108" r="12" fill="#FFDB05" />
      <path d="M52 184 L110 128 L150 164 L190 132 L258 184 Z" fill="#007C41" />
      <path d="M52 184 L96 150 L132 184 Z" fill="#E3EDE6" fillOpacity="0.35" />
      {/* play button */}
      <circle cx="155" cy="133" r="22" fill="white" fillOpacity="0.95" />
      <polygon points="148,122 148,144 168,133" fill="#007C41" />
      {/* timeline */}
      <rect x="52" y="194" width="206" height="18" rx="4" fill="#F3F6F2" />
      <rect x="56" y="198" width="46" height="10" rx="3" fill="#007C41" />
      <rect x="106" y="198" width="30" height="10" rx="3" fill="#FFDB05" />
      <rect x="140" y="198" width="58" height="10" rx="3" fill="#0B3D23" />
      <rect x="202" y="198" width="52" height="10" rx="3" fill="#DBE2DA" />
      <line x1="136" y1="190" x2="136" y2="216" stroke="#E4423F" strokeWidth="2" />
      {/* stand */}
      <path d="M135 220 h40 l6 26 h-52 Z" fill="#DBE2DA" stroke="#0B3D23" strokeWidth="2" strokeLinejoin="round" />
      <rect x="112" y="246" width="86" height="10" rx="5" fill="#0B3D23" />

      {/* Film strip card */}
      <g transform="rotate(-8 80 300)">
        <rect x="30" y="268" width="130" height="62" rx="6" fill="#0B3D23" />
        <g fill="#F3F6F2">
          <rect x="38" y="274" width="8" height="6" rx="1.5" />
          <rect x="54" y="274" width="8" height="6" rx="1.5" />
          <rect x="70" y="274" width="8" height="6" rx="1.5" />
          <rect x="86" y="274" width="8" height="6" rx="1.5" />
          <rect x="102" y="274" width="8" height="6" rx="1.5" />
          <rect x="118" y="274" width="8" height="6" rx="1.5" />
          <rect x="134" y="274" width="8" height="6" rx="1.5" />
          <rect x="38" y="318" width="8" height="6" rx="1.5" />
          <rect x="54" y="318" width="8" height="6" rx="1.5" />
          <rect x="70" y="318" width="8" height="6" rx="1.5" />
          <rect x="86" y="318" width="8" height="6" rx="1.5" />
          <rect x="102" y="318" width="8" height="6" rx="1.5" />
          <rect x="118" y="318" width="8" height="6" rx="1.5" />
          <rect x="134" y="318" width="8" height="6" rx="1.5" />
        </g>
        <rect x="38" y="284" width="34" height="28" rx="3" fill="#E3EDE6" />
        <rect x="76" y="284" width="34" height="28" rx="3" fill="#FFDB05" />
        <rect x="114" y="284" width="34" height="28" rx="3" fill="#007C41" />
      </g>

      {/* Image frame card */}
      <rect x="214" y="248" width="76" height="62" rx="8" fill="white" stroke="#007C41" strokeWidth="2.5" />
      <circle cx="236" cy="270" r="6" fill="#FFDB05" />
      <path d="M220 304 l22 -22 l14 14 l10 -10 l18 18 Z" fill="#007C41" />

      {/* floating accent */}
      <circle
        cx="46"
        cy="56"
        r="16"
        fill="#F7ECC4"
        stroke="#FFDB05"
        strokeWidth="2"
        className="animate-float"
        style={{ transformOrigin: '46px 56px' }}
      />
    </svg>
  )
}

// Right illustration: VR headset, 3D cube, audio waveform, and a camera.
function ExperienceIllustration() {
  return (
    <svg viewBox="0 0 320 380" className="w-full max-w-[300px]" fill="none">
      <circle cx="155" cy="200" r="144" fill="#F7ECC4" fillOpacity="0.6" />
      <circle cx="155" cy="200" r="144" stroke="#FFDB05" strokeOpacity="0.5" strokeWidth="1.5" />

      {/* VR headset */}
      <path
        d="M30 120 C30 98 46 90 70 90 H230 C254 90 270 98 270 120 V160 C270 176 258 184 244 184 H208 C198 184 192 176 184 168 C174 158 126 158 116 168 C108 176 102 184 92 184 H56 C42 184 30 176 30 160 Z"
        fill="#0B3D23"
      />
      <circle cx="98" cy="134" r="26" fill="#007C41" stroke="#E3EDE6" strokeWidth="3" />
      <circle cx="98" cy="134" r="17" fill="#0B3D23" stroke="#E3EDE6" strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="98" cy="134" r="8" fill="none" stroke="#FFDB05" strokeWidth="2" />
      <path d="M82 120 L92 112" stroke="white" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.7" />
      <circle cx="202" cy="134" r="26" fill="#007C41" stroke="#E3EDE6" strokeWidth="3" />
      <circle cx="202" cy="134" r="17" fill="#0B3D23" stroke="#E3EDE6" strokeWidth="1.5" strokeOpacity="0.6" />
      <circle cx="202" cy="134" r="8" fill="none" stroke="#FFDB05" strokeWidth="2" />
      <path d="M186 120 L196 112" stroke="white" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.7" />
      <rect x="132" y="98" width="36" height="8" rx="4" fill="#FFDB05" />
      <path d="M30 118 C10 118 6 150 30 154" stroke="#0B3D23" strokeWidth="8" strokeLinecap="round" />
      <path d="M270 118 C290 118 294 150 270 154" stroke="#0B3D23" strokeWidth="8" strokeLinecap="round" />

      {/* 3D cube */}
      <g transform="translate(40 214)">
        <polygon points="50,0 100,26 50,52 0,26" fill="#E3EDE6" stroke="#0B3D23" strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points="0,26 50,52 50,112 0,86" fill="#007C41" stroke="#0B3D23" strokeWidth="2.5" strokeLinejoin="round" />
        <polygon points="100,26 50,52 50,112 100,86" fill="#0B3D23" stroke="#0B3D23" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="50" cy="26" r="5" fill="#FFDB05" />
      </g>

      {/* Waveform card */}
      <rect x="168" y="230" width="116" height="70" rx="8" fill="white" stroke="#007C41" strokeWidth="2.5" />
      <g fill="#007C41">
        <rect x="180" y="258" width="6" height="14" rx="3" />
        <rect x="192" y="248" width="6" height="34" rx="3" />
        <rect x="204" y="240" width="6" height="50" rx="3" fill="#FFDB05" />
        <rect x="216" y="252" width="6" height="26" rx="3" />
        <rect x="228" y="244" width="6" height="42" rx="3" />
        <rect x="240" y="256" width="6" height="18" rx="3" fill="#0B3D23" />
        <rect x="252" y="250" width="6" height="30" rx="3" />
        <rect x="264" y="260" width="6" height="10" rx="3" />
      </g>

      {/* Camera */}
      <rect x="212" y="318" width="22" height="9" rx="3" fill="#0B3D23" />
      <rect x="198" y="324" width="76" height="46" rx="9" fill="#0B3D23" />
      <circle cx="236" cy="347" r="15" fill="#F3F6F2" />
      <circle cx="236" cy="347" r="10" fill="#007C41" />
      <circle cx="236" cy="347" r="4" fill="#0B3D23" />
      <circle cx="262" cy="334" r="3.5" fill="#FFDB05" />

      {/* floating accent */}
      <circle
        cx="282"
        cy="206"
        r="14"
        fill="#E3EDE6"
        stroke="#007C41"
        strokeWidth="2"
        className="animate-float"
        style={{ transformOrigin: '282px 206px' }}
      />
    </svg>
  )
}

export default function Login() {
  const { session, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
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

      <main className="flex-1 relative overflow-hidden bg-mist">
        {/* Dotted background */}
        <svg className="absolute inset-0 w-full h-full opacity-60 pointer-events-none">
          <defs>
            <pattern id="login-dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#DBE2DA" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#login-dots)" />
        </svg>

        {/* Three columns on wide screens: illustration, centered card, illustration */}
        <div className="relative max-w-6xl mx-auto px-4 py-12 md:py-16 lg:min-h-[640px] lg:grid lg:grid-cols-[1fr_24rem_1fr] lg:items-center lg:gap-6">
          <div className="hidden lg:flex justify-end animate-fade-up">
            <CreateIllustration />
          </div>

          <div className="w-full max-w-sm mx-auto">
            <div className="text-center mb-6 animate-fade-up">
              <div className="w-12 h-1 bg-ua-gold mx-auto mb-4" />
              <p className="label-mono mb-2">University of Alberta · Multimedia Program</p>
              <h1 className="text-3xl md:text-4xl leading-tight mb-3">MM Portal</h1>
              <p className="text-sm text-ink-2 leading-relaxed">
                One place for the MM program community. Sign in with your UAlberta email.
              </p>
            </div>

            <div className="bg-white border border-line border-t-4 border-t-ua-gold rounded-card shadow-sm p-7 animate-fade-up">
              <h2 className="text-2xl mb-1">Sign in</h2>
              <p className="text-sm text-ink-2 mb-6">Use your UAlberta email address.</p>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <div>
                  <label htmlFor="email" className="text-sm font-medium block mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-2/60 pointer-events-none">
                      <MailIcon />
                    </span>
                    <input
                      id="email"
                      type="email"
                      autoComplete="username"
                      className="input pl-10"
                      placeholder="ccid@ualberta.ca"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="text-sm font-medium block mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-2/60 pointer-events-none">
                      <LockIcon />
                    </span>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      className="input pl-10 pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      aria-pressed={showPassword}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-ink-2/60 hover:text-ua-deep-green transition-colors"
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
                <button type="submit" className="btn-primary w-full">
                  Log in
                  <ArrowIcon />
                </button>
              </form>

              <p className="text-xs text-ink-2 mt-5 pt-5 border-t border-line">
                Need access? Contact the MM office at{' '}
                <a href="mailto:csmmadm@ualberta.ca" className="text-ua-deep-green hover:underline">
                  csmmadm@ualberta.ca
                </a>
                .
              </p>
            </div>

            <details className="mt-5 border border-line rounded-card bg-white">
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

          <div className="hidden lg:flex justify-start animate-fade-up">
            <ExperienceIllustration />
          </div>
        </div>
      </main>

      <Footer maxWidth="max-w-5xl" />
    </div>
  )
}