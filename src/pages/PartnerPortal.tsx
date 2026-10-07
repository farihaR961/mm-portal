import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import PageHeader from '../components/PageHeader'

export default function PartnerPortal() {
  const { session } = useAuth()
  const navigate = useNavigate()
  if (!session) return null

  return (
    <div>
      <PageHeader
        eyebrow="Outside partner"
        title={`Welcome, ${session.displayName}`}
        description="This is the portal view for outside partners of the MM program."
      />

      <div className="card border-2 border-dashed border-line">
        <p className="label-mono mb-1">To be defined</p>
        <h2 className="text-lg mb-2">Partner features are not designed yet</h2>
        <p className="text-sm text-ink-2 mb-4">
          What partners should see and do here will be confirmed with the MM team. For now, this page shows that the
          partner role signs in to its own view, separate from students, alumni, and admins.
        </p>
        <button onClick={() => navigate('/')} className="btn-secondary">
          Visit the MM Program home page
        </button>
      </div>
    </div>
  )
}