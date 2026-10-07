import { Role, StudentSubRole } from '../types'
import { STUDENTS } from './students'

export interface UserAccount {
  email: string
  displayName: string
  role: Role
  subRole?: StudentSubRole // only used when role is 'student'
  studentId?: string // links student/alumni accounts to their program record
}

// Prototype convenience: any unknown @ualberta.ca email signs in as the first
// sample current student. Set to false to require an exact account match,
// which is how the real system should behave.
export const MOCK_ALLOW_UNKNOWN_UALBERTA_EMAILS = true

const ADMIN_ACCOUNTS: UserAccount[] = [
  { email: 'mmadmin@ualberta.ca', displayName: 'MM Administrator', role: 'admin' },
]

const PARTNER_ACCOUNTS: UserAccount[] = [
  { email: 'recruiter@northlightstudios.com', displayName: 'Northlight Studios', role: 'partner' },
]

const STUDENT_ACCOUNTS: UserAccount[] = STUDENTS.map(
  (s): UserAccount => ({
    email: s.email,
    displayName: s.name,
    role: 'student',
    subRole: s.subRole,
    studentId: s.id,
  }),
)

export const USER_ACCOUNTS: UserAccount[] = [...ADMIN_ACCOUNTS, ...STUDENT_ACCOUNTS, ...PARTNER_ACCOUNTS]

export type SignInResult = { ok: true; account: UserAccount } | { ok: false; error: string }

// Mock sign-in: the password is not checked (there is no real UAlberta login
// yet), but the email decides which role, and therefore which portal, you get.
export function signIn(email: string, password: string): SignInResult {
  const normalized = email.trim().toLowerCase()
  if (!normalized || !password) {
    return { ok: false, error: 'Enter your email and password.' }
  }

  const account = USER_ACCOUNTS.find((a) => a.email.toLowerCase() === normalized)
  if (account) return { ok: true, account }

  if (MOCK_ALLOW_UNKNOWN_UALBERTA_EMAILS && normalized.endsWith('@ualberta.ca')) {
    const fallback = USER_ACCOUNTS.find((a) => a.role === 'student' && a.subRole === 'current')
    if (fallback) return { ok: true, account: { ...fallback, email: normalized } }
  }

  return { ok: false, error: 'No portal account is linked to this email. Contact the MM office for access.' }
}

export function describeRole(account: Pick<UserAccount, 'role' | 'subRole'>): string {
  if (account.role === 'admin') return 'Admin'
  if (account.role === 'partner') return 'Outside partner'
  return account.subRole === 'alumni' ? 'Alumni' : 'Current student'
}