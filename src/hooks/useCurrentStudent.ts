import { useAuth } from '../context/AuthContext'
import { getStudentById } from '../mock-api'

export function useCurrentStudent() {
  const { session } = useAuth()
  if (!session?.studentId) return undefined
  return getStudentById(session.studentId)
}
