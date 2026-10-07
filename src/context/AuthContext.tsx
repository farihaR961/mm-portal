import { createContext, useContext, useState, ReactNode } from 'react'
import { Role, StudentSubRole } from '../types'
import { signIn } from '../mock-api'

export interface Session {
  email: string
  displayName: string
  role: Role
  subRole?: StudentSubRole
  studentId?: string
}

export type LoginResult = { ok: true; redirectTo: string } | { ok: false; error: string }

// Where each role lands after signing in (and when sent away from a page
// they are not allowed to see).
export function homePathFor(session: Pick<Session, 'role' | 'subRole'>): string {
  if (session.role === 'admin') return '/admin'
  if (session.role === 'partner') return '/partner'
  return session.subRole === 'alumni' ? '/alumni' : '/student'
}

interface AuthContextValue {
  session: Session | null
  login: (email: string, password: string) => LoginResult
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)

  const login = (email: string, password: string): LoginResult => {
    const result = signIn(email, password)
    if (!result.ok) return { ok: false, error: result.error }

    const { account } = result
    const next: Session = {
      email: account.email,
      displayName: account.displayName,
      role: account.role,
      subRole: account.subRole,
      studentId: account.studentId,
    }
    setSession(next)
    return { ok: true, redirectTo: homePathFor(next) }
  }

  const logout = () => setSession(null)

  return <AuthContext.Provider value={{ session, login, logout }}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}