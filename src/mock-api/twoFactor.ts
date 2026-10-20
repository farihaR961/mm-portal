import { UserAccount, signIn } from './users'

// Mock two-step sign-in by email. In the real system the server creates the
// code, emails it, and checks it. The server never sends the code back to the
// browser; the prototype only does that so the mock email preview can show it.

// Set to false to skip the code step while developing.
export const MOCK_TWO_FACTOR_ENABLED = true

const CODE_LENGTH = 6
const CODE_LIFETIME_MINUTES = 10
const MAX_WRONG_ATTEMPTS = 5

export interface MockEmail {
  to: string
  subject: string
  body: string
  code: string
}

interface Challenge {
  account: UserAccount
  code: string
  expiresAt: number
  attemptsLeft: number
}

// The one sign-in that is waiting for its code (the server-side state).
let challenge: Challenge | null = null

export type CodeSent = {
  ok: true
  step: 'code'
  maskedEmail: string
  mockEmail: MockEmail
  expiresInMinutes: number
}

export type StartResult = CodeSent | { ok: true; step: 'done'; account: UserAccount } | { ok: false; error: string }

export type VerifyResult =
  | { ok: true; account: UserAccount }
  | { ok: false; error: string; restart: boolean }

const SESSION_EXPIRED = 'Your sign-in session expired. Please sign in again.'

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!domain) return email
  if (local.length <= 2) return `${local[0] ?? ''}*@${domain}`
  return `${local[0]}${'*'.repeat(local.length - 2)}${local[local.length - 1]}@${domain}`
}

function newCode(): string {
  const n = crypto.getRandomValues(new Uint32Array(1))[0] % 900000
  return String(100000 + n)
}

function issueCode(account: UserAccount): CodeSent {
  const code = newCode()
  challenge = {
    account,
    code,
    expiresAt: Date.now() + CODE_LIFETIME_MINUTES * 60 * 1000,
    attemptsLeft: MAX_WRONG_ATTEMPTS,
  }
  return {
    ok: true,
    step: 'code',
    maskedEmail: maskEmail(account.email),
    expiresInMinutes: CODE_LIFETIME_MINUTES,
    mockEmail: {
      to: account.email,
      subject: 'Your MM Portal sign-in code',
      body: `Use this code to finish signing in to the MM Portal. It expires in ${CODE_LIFETIME_MINUTES} minutes. If you did not try to sign in, you can ignore this email.`,
      code,
    },
  }
}

// Step 1: check the email and password, then "email" a code.
export function startTwoFactor(email: string, password: string): StartResult {
  const result = signIn(email, password)
  if (!result.ok) return { ok: false, error: result.error }
  if (!MOCK_TWO_FACTOR_ENABLED) {
    challenge = null
    return { ok: true, step: 'done', account: result.account }
  }
  return issueCode(result.account)
}

// A new code replaces the old one, and the wrong-attempt count starts over.
export function resendTwoFactor(): StartResult {
  if (!challenge) return { ok: false, error: SESSION_EXPIRED }
  return issueCode(challenge.account)
}

// Step 2: check the code the person typed.
export function verifyTwoFactor(input: string): VerifyResult {
  if (!challenge) return { ok: false, error: SESSION_EXPIRED, restart: true }
  if (Date.now() > challenge.expiresAt) {
    return { ok: false, error: 'That code has expired. Request a new one.', restart: false }
  }

  const typed = input.replace(/\s/g, '')
  if (!new RegExp(`^\\d{${CODE_LENGTH}}$`).test(typed)) {
    return { ok: false, error: `Enter the ${CODE_LENGTH}-digit code from the email.`, restart: false }
  }

  if (typed !== challenge.code) {
    challenge.attemptsLeft -= 1
    if (challenge.attemptsLeft <= 0) {
      challenge = null
      return { ok: false, error: 'Too many incorrect codes. Please sign in again.', restart: true }
    }
    const left = challenge.attemptsLeft
    return {
      ok: false,
      error: `That code is not right. ${left} ${left === 1 ? 'attempt' : 'attempts'} left.`,
      restart: false,
    }
  }

  const { account } = challenge
  challenge = null
  return { ok: true, account }
}

export function cancelTwoFactor(): void {
  challenge = null
}