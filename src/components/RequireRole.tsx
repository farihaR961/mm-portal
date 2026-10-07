import { Navigate } from 'react-router-dom'
import { ReactNode } from 'react'
import { useAuth, homePathFor } from '../context/AuthContext'
import { Role, StudentSubRole } from '../types'

export default function RequireRole({
  role,
  subRole,
  children,
}: {
  role: Role
  subRole?: StudentSubRole
  children: ReactNode
}) {
  const { session } = useAuth()

  if (!session) return <Navigate to="/login" replace />

  const wrongRole = session.role !== role
  const wrongSubRole = subRole !== undefined && session.subRole !== subRole
  if (wrongRole || wrongSubRole) return <Navigate to={homePathFor(session)} replace />

  return <>{children}</>
}