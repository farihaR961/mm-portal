import { createContext, useContext, useState, ReactNode } from 'react'
import { Role, StudentSubRole } from '../types'
import { STUDENTS } from '../mock-api/students'

interface Session {
  role: Role
  studentId?: string // set when role is 'student'
  subRole?: StudentSubRole
}

interface AuthContextValue {
  session: Session | null
  loginAsAdmin: () => void
  loginAsStudent: (studentId: string, subRole: StudentSubRole) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)

  const loginAsAdmin = () => setSession({ role: 'admin' })
  const loginAsStudent = (studentId: string, subRole: StudentSubRole) =>
    setSession({ role: 'student', studentId, subRole })
  const logout = () => setSession(null)

  return (
    <AuthContext.Provider value={{ session, loginAsAdmin, loginAsStudent, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

// Convenience: the default students used for the "Current Student" and
// "Alumni" mock login options.
export const DEFAULT_CURRENT_STUDENT_ID = STUDENTS.find((s) => s.subRole === 'current')!.id
export const DEFAULT_ALUMNI_ID = STUDENTS.find((s) => s.subRole === 'alumni')!.id
