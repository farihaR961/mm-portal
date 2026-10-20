import { createContext, useContext, useState, ReactNode } from 'react'
import { Role, StudentSubRole } from '../types'
import {
  CodeSent,
  StartResult,
  UserAccount,
  startTwoFactor,
  resendTwoFactor,
  verifyTwoFactor,
  cancelTwoFactor,
} from '../mock-api'

export interface Session {
  email: string
  displayName: string
  role: Role
  subRole?: StudentSubRole
  studentId?: string
}

// Step 1 and "send a new code": either a code was emailed, or (when two-step
// verification is switched off) the person is already signed in.
export type BeginResult =
  | CodeSent
  | { ok: true; step: 'done'; redirectTo: string }
  | { ok: false; error: string }

// Step 2: the result of checking the code. "restart" means the sign-in is
// over and the person has to start again from the email and password.
export type LoginResult =
  | { ok: true; redirectTo: string }
  | { ok: false; error: string; restart: boolean }

// Where each role lands after signing in (and when sent away from a page
// they are not allowed to see).
export function homePathFor(session: Pick<Session, 'role' | 'subRole'>): string {
  if (session.role === 'admin') return '/admin'
  if (session.role === 'partner') return '/partner'
  return session.subRole === 'alumni' ? '/alumni' : '/student'
}

interface AuthContextValue {
  session: Session | null
  beginLogin: (email: string, password: string) => BeginResult
  verifyCode: (code: string) => LoginResult
  resendCode: () => BeginResult
  cancelLogin: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)

  const finishLogin = (account: UserAccount): string => {
    const next: Session = {
      email: account.email,
      displayName: account.displayName,
      role: account.role,
      subRole: account.subRole,
      studentId: account.studentId,
    }
    setSession(next)
    return homePathFor(next)
  }

  const handleStart = (result: StartResult): BeginResult => {
    if (!result.ok) return { ok: false, error: result.error }
    if (result.step === 'done') return { ok: true, step: 'done', redirectTo: finishLogin(result.account) }
    return result
  }

  const beginLogin = (email: string, password: string): BeginResult =>
    handleStart(startTwoFactor(email, password))

  const resendCode = (): BeginResult => handleStart(resendTwoFactor())

  const verifyCode = (code: string): LoginResult => {
    const result = verifyTwoFactor(code)
    if (!result.ok) return { ok: false, error: result.error, restart: result.restart }
    return { ok: true, redirectTo: finishLogin(result.account) }
  }

  const cancelLogin = () => cancelTwoFactor()

  const logout = () => setSession(null)

  return (
    <AuthContext.Provider value={{ session, beginLogin, verifyCode, resendCode, cancelLogin, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}