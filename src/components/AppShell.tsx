import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { describeRole } from '../mock-api'
import { Role, StudentSubRole } from '../types'
import Footer from './Footer'

interface NavLeaf {
  to: string
  label: string
}

interface NavGroup {
  label: string
  items: NavLeaf[]
}

type NavEntry = NavLeaf | NavGroup

function isGroup(entry: NavEntry): entry is NavGroup {
  return 'items' in entry
}

// Related pages share one dropdown so the menu stays on a single row.
function navEntriesFor(role: Role, subRole?: StudentSubRole): NavEntry[] {
  if (role === 'admin') {
    return [
      { to: '/admin', label: 'Dashboard' },
      {
        label: 'Manage',
        items: [
          { to: '/admin/calendar', label: 'Calendar' },
          { to: '/admin/documents', label: 'Documents' },
          { to: '/admin/jobs', label: 'Job Postings' },
          { to: '/admin/notifications', label: 'Notifications' },
        ],
      },
      { to: '/admin/export', label: 'Export' },
      { to: '/program', label: 'Program Info' },
    ]
  }
  if (role === 'partner') {
    return [
      { to: '/partner', label: 'Partner Home' },
      { to: '/program', label: 'Program Info' },
    ]
  }
  if (subRole === 'alumni') {
    return [
      { to: '/alumni', label: 'Alumni Portal' },
      { to: '/program', label: 'Program Info' },
    ]
  }
  return [
    { to: '/student', label: 'Dashboard' },
    { to: '/student/profile', label: 'Profile' },
    { to: '/student/journey', label: 'MM Journey' },
    {
      label: 'Updates',
      items: [
        { to: '/student/calendar', label: 'Calendar' },
        { to: '/student/notifications', label: 'Notifications' },
        { to: '/student/documents', label: 'Documents' },
      ],
    },
    {
      label: 'Career',
      items: [
        { to: '/student/internship', label: 'Internship' },
        { to: '/student/jobs', label: 'Job Hub' },
        { to: '/student/tools', label: 'Tools' },
      ],
    },
    { to: '/program', label: 'Program Info' },
  ]
}

const ACTIVE_LINK = 'text-ua-deep-green font-medium after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:h-0.5 after:bg-ua-green'
const IDLE_LINK = 'text-ink-2 hover:bg-mist'

// A menu that opens on hover or click, and closes on Escape, on a click
// outside it, or when you go to another page.
function NavDropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const location = useLocation()

  const hasActiveChild = group.items.some(
    (item) => location.pathname === item.to || location.pathname.startsWith(item.to + '/'),
  )

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return
    const onMouseDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className={`relative flex items-center gap-1 px-2.5 py-2 text-sm whitespace-nowrap rounded-card transition-colors ${
          hasActiveChild ? ACTIVE_LINK : IDLE_LINK
        }`}
      >
        {group.label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
        >
          <path d="m5 8 5 5 5-5" />
        </svg>
      </button>

      {open && (
        <div role="menu" className="absolute left-0 top-full pt-1 z-40 min-w-[11rem]">
          <div className="bg-white border border-line rounded-card shadow-md py-1">
            {group.items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                role="menuitem"
                className={({ isActive }) =>
                  `block px-4 py-2 text-sm whitespace-nowrap transition-colors ${
                    isActive ? 'text-ua-deep-green font-medium bg-mist' : 'text-ink-2 hover:bg-mist'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function AppShell({ children }: { children: ReactNode }) {
  const { session, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // The Home page is a standalone landing page with its own header — never
  // wrap it in the logged-in app nav, even if someone happens to be signed in.
  if (!session || location.pathname === '/') {
    return <>{children}</>
  }

  const entries = navEntriesFor(session.role, session.subRole)
  // On phones the menu is one scrolling row, so the groups are flattened.
  const flatItems: NavLeaf[] = entries.flatMap((entry) => (isGroup(entry) ? entry.items : [entry]))

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-line bg-white relative z-30">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-card bg-ua-green flex items-center justify-center text-white font-mono text-sm font-semibold">
              MM
            </div>
            <div>
              <p className="font-semibold leading-tight">MM Portal</p>
              <p className="label-mono leading-tight whitespace-nowrap">University of Alberta</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {entries.map((entry) =>
              isGroup(entry) ? (
                <NavDropdown key={entry.label} group={entry} />
              ) : (
                <NavLink
                  key={entry.to}
                  to={entry.to}
                  end={entry.to === '/admin' || entry.to === '/student'}
                  className={({ isActive }) =>
                    `px-2.5 py-2 text-sm whitespace-nowrap rounded-card transition-colors relative ${
                      isActive ? ACTIVE_LINK : IDLE_LINK
                    }`
                  }
                >
                  {entry.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right hidden xl:block">
              <p className="text-sm font-medium leading-tight whitespace-nowrap">{session.displayName}</p>
              <p className="label-mono leading-tight uppercase whitespace-nowrap">{describeRole(session)}</p>
            </div>
            <button onClick={handleLogout} className="btn-secondary text-sm whitespace-nowrap">
              Log out
            </button>
          </div>
        </div>

        <nav className="md:hidden flex overflow-x-auto gap-1 px-4 pb-2">
          {flatItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin' || item.to === '/student'}
              className={({ isActive }) =>
                `px-3 py-2 text-sm rounded-card whitespace-nowrap relative ${
                  isActive
                    ? 'text-ua-deep-green font-medium after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-ua-green'
                    : 'text-ink-2'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main key={location.pathname} className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 animate-fade-up">
        {children}
      </main>
      <Footer />
    </div>
  )
}