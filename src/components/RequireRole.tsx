import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'
import { useAuth } from '../context/AuthContext'
import { Role } from '../types'

export default function RequireRole({ role, children }: { role: Role; children: ReactNode }) {
  const { session } = useAuth()
  if (!session) return <Navigate to="/" replace />
  if (session.role !== role) {
    return <Navigate to={session.role === 'admin' ? '/admin' : '/student'} replace />
  }
  return <>{children}</>
}
