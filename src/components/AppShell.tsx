import { NavLink, useNavigate } from 'react-router-dom'
import { ReactNode } from 'react'
import { useAuth } from '../context/AuthContext'
import { getStudentById } from '../mock-api'

interface NavItem {
  to: string
  label: string
}

function navItemsFor(role: 'admin' | 'student', subRole?: 'current' | 'alumni'): NavItem[] {
  if (role === 'admin') {
    return [
      { to: '/admin', label: 'Dashboard' },
      { to: '/admin/calendar', label: 'Calendar' },
      { to: '/admin/jobs', label: 'Job Postings' },
      { to: '/admin/notifications', label: 'Notifications' },
      { to: '/admin/export', label: 'Export' },
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
    { to: '/student/calendar', label: 'Calendar' },
    { to: '/student/notifications', label: 'Notifications' },
    { to: '/student/internship', label: 'Internship' },
    { to: '/student/jobs', label: 'Job Hub' },
    { to: '/student/tools', label: 'Tools' },
    { to: '/program', label: 'Program Info' },
  ]
}

export default function AppShell({ children }: { children: ReactNode }) {
  const { session, logout } = useAuth()
  const navigate = useNavigate()

  if (!session) {
    return <>{children}</>
  }

  const student = session.studentId ? getStudentById(session.studentId) : undefined
  const items = navItemsFor(session.role, session.subRole)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-line bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-card bg-ua-green flex items-center justify-center text-white font-mono text-sm font-semibold">
              MM
            </div>
            <div>
              <p className="font-semibold leading-tight">MM Portal</p>
              <p className="label-mono leading-tight">University of Alberta</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-1 flex-wrap">
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin' || item.to === '/student'}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm rounded-card transition-colors ${
                    isActive ? 'bg-mist text-ua-deep-green font-medium' : 'text-ink-2 hover:bg-mist'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium leading-tight">{student ? student.name : 'MM Administrator'}</p>
              <p className="label-mono leading-tight uppercase">{session.role === 'admin' ? 'Admin' : session.subRole}</p>
            </div>
            <button onClick={handleLogout} className="btn-secondary text-sm">
              Log out
            </button>
          </div>
        </div>
        <nav className="md:hidden flex overflow-x-auto gap-1 px-4 pb-2">
          {items.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/admin' || item.to === '/student'}
              className={({ isActive }) =>
                `px-3 py-2 text-sm rounded-card whitespace-nowrap ${
                  isActive ? 'bg-mist text-ua-deep-green font-medium' : 'text-ink-2'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6">{children}</main>
      <footer className="border-t border-line py-4">
        <div className="max-w-6xl mx-auto px-4 label-mono">
          © 2026 Multimedia UofA
        </div>
      </footer>
    </div>
  )
}
