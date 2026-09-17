import { useNavigate } from 'react-router-dom'

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

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-20 text-center">
        <p className="label-mono mb-3">Multimedia Research Centre</p>
        <h1 className="text-4xl md:text-5xl mb-4">
          Welcome to the <span className="accent">MM</span> Portal
        </h1>
        <p className="text-ink-2 max-w-xl mx-auto mb-8">
          A single place for MM students to track courses, internships, forms, and graduation progress
          throughout the co-op Master's program.
        </p>
        <div className="flex justify-center gap-3">
          <button onClick={() => navigate('/login')} className="btn-primary">
            Log in
          </button>
          <button onClick={() => navigate('/program')} className="btn-secondary">
            Program information
          </button>
        </div>
      </main>

      <footer className="border-t border-line py-4">
        <div className="max-w-5xl mx-auto px-4 label-mono">© 2026 Multimedia UofA</div>
      </footer>
    </div>
  )
}