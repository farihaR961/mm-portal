import { ReactNode } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/AppShell'
import RequireRole from './components/RequireRole'

import Home from './pages/Home'
import Login from './pages/Login'
import ProgramOverview from './pages/ProgramOverview'
import AlumniPortal from './pages/AlumniPortal'
import PartnerPortal from './pages/PartnerPortal'

import StudentDashboard from './pages/student/Dashboard'
import StudentProfile from './pages/student/Profile'
import StudentJourney from './pages/student/Journey'
import StudentDocuments from './pages/student/Documents'
import StudentCalendarPage from './pages/student/StudentCalendar'
import StudentNotifications from './pages/student/Notifications'
import StudentInternship from './pages/student/Internship'
import JobHub from './pages/student/Jobs'
import StudentTools from './pages/student/Tools'

import AdminDashboard from './pages/admin/Dashboard'
import AdminStudentDetail from './pages/admin/StudentDetail'
import AdminCalendarManagement from './pages/admin/CalendarManagement'
import AdminDocumentManagement from './pages/admin/DocumentManagement'
import AdminJobManagement from './pages/admin/JobManagement'
import AdminNotificationCentre from './pages/admin/NotificationCentre'
import AdminExport from './pages/admin/Export'

// One small helper per role keeps the route table below easy to read.
const asCurrentStudent = (page: ReactNode) => (
  <RequireRole role="student" subRole="current">
    {page}
  </RequireRole>
)
const asAlumni = (page: ReactNode) => (
  <RequireRole role="student" subRole="alumni">
    {page}
  </RequireRole>
)
const asAdmin = (page: ReactNode) => <RequireRole role="admin">{page}</RequireRole>
const asPartner = (page: ReactNode) => <RequireRole role="partner">{page}</RequireRole>

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/program" element={<ProgramOverview />} />

        <Route path="/student" element={asCurrentStudent(<StudentDashboard />)} />
        <Route path="/student/profile" element={asCurrentStudent(<StudentProfile />)} />
        <Route path="/student/journey" element={asCurrentStudent(<StudentJourney />)} />
        <Route path="/student/documents" element={asCurrentStudent(<StudentDocuments />)} />
        <Route path="/student/calendar" element={asCurrentStudent(<StudentCalendarPage />)} />
        <Route path="/student/notifications" element={asCurrentStudent(<StudentNotifications />)} />
        <Route path="/student/internship" element={asCurrentStudent(<StudentInternship />)} />
        <Route path="/student/jobs" element={asCurrentStudent(<JobHub />)} />
        <Route path="/student/tools" element={asCurrentStudent(<StudentTools />)} />

        <Route path="/alumni" element={asAlumni(<AlumniPortal />)} />

        <Route path="/partner" element={asPartner(<PartnerPortal />)} />

        <Route path="/admin" element={asAdmin(<AdminDashboard />)} />
        <Route path="/admin/students/:studentId" element={asAdmin(<AdminStudentDetail />)} />
        <Route path="/admin/calendar" element={asAdmin(<AdminCalendarManagement />)} />
        <Route path="/admin/documents" element={asAdmin(<AdminDocumentManagement />)} />
        <Route path="/admin/jobs" element={asAdmin(<AdminJobManagement />)} />
        <Route path="/admin/notifications" element={asAdmin(<AdminNotificationCentre />)} />
        <Route path="/admin/export" element={asAdmin(<AdminExport />)} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppShell>
  )
}