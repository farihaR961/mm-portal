import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'

export default function Home() {
  const navigate = useNavigate()

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

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
        <div className="animate-fade-up">
          <p className="label-mono mb-3">Multimedia Research Centre</p>
          <h1 className="text-4xl md:text-5xl mb-4">
            Welcome to the <span className="accent">MM</span> Portal
          </h1>
          <p className="text-ink-2 max-w-md mb-8">
            A single place for MM students to track courses, internships, forms, and graduation progress
            throughout the co-op Master's program.
          </p>
          <div className="flex gap-3">
            <button onClick={() => navigate('/login')} className="btn-primary">
              Log in
            </button>
            <button onClick={() => navigate('/program')} className="btn-secondary">
              Program information
            </button>
          </div>
        </div>

        <div className="animate-fade-up flex justify-center">
          <svg viewBox="0 0 320 280" className="w-full max-w-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="20" y="30" width="220" height="150" rx="6" fill="#E3EDE6" stroke="#007C41" strokeWidth="2" />
            <polygon points="105,80 105,130 150,105" fill="#007C41" />
            <rect x="60" y="200" width="100" height="10" rx="5" fill="#DBE2DA" />
            <rect x="60" y="220" width="60" height="10" rx="5" fill="#DBE2DA" />
            <circle cx="270" cy="60" r="28" fill="#F7ECC4" stroke="#FFDB05" strokeWidth="2" />
            <rect x="255" y="120" width="55" height="70" rx="6" fill="white" stroke="#0B3D23" strokeWidth="2" />
            <circle cx="282" cy="140" r="6" fill="#0B3D23" />
            <rect x="265" y="155" width="35" height="4" rx="2" fill="#DBE2DA" />
            <rect x="265" y="165" width="25" height="4" rx="2" fill="#DBE2DA" />
          </svg>
        </div>
      </main>

      <Footer maxWidth="max-w-5xl" />
    </div>
  )
}