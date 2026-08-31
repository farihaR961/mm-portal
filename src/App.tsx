import { Routes, Route } from 'react-router-dom'
import AppShell from './components/AppShell'
import RequireRole from './components/RequireRole'

import Login from './pages/Login'
import ProgramOverview from './pages/ProgramOverview'
import AlumniPortal from './pages/AlumniPortal'

import StudentDashboard from './pages/student/Dashboard'
import StudentProfile from './pages/student/Profile'
import StudentJourney from './pages/student/Journey'
import StudentCalendarPage from './pages/student/StudentCalendar'
import StudentNotifications from './pages/student/Notifications'
import StudentInternship from './pages/student/Internship'
import JobHub from './pages/student/Jobs'
import StudentTools from './pages/student/Tools'

import AdminDashboard from './pages/admin/Dashboard'
import AdminStudentDetail from './pages/admin/StudentDetail'
import AdminCalendarManagement from './pages/admin/CalendarManagement'
import AdminJobManagement from './pages/admin/JobManagement'
import AdminNotificationCentre from './pages/admin/NotificationCentre'
import AdminExport from './pages/admin/Export'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/program" element={<ProgramOverview />} />

        <Route
          path="/student"
          element={
            <RequireRole role="student">
              <StudentDashboard />
            </RequireRole>
          }
        />
        <Route
          path="/student/profile"
          element={
            <RequireRole role="student">
              <StudentProfile />
            </RequireRole>
          }
        />
        <Route
          path="/student/journey"
          element={
            <RequireRole role="student">
              <StudentJourney />
            </RequireRole>
          }
        />
        <Route
          path="/student/calendar"
          element={
            <RequireRole role="student">
              <StudentCalendarPage />
            </RequireRole>
          }
        />
        <Route
          path="/student/notifications"
          element={
            <RequireRole role="student">
              <StudentNotifications />
            </RequireRole>
          }
        />
        <Route
          path="/student/internship"
          element={
            <RequireRole role="student">
              <StudentInternship />
            </RequireRole>
          }
        />
        <Route
          path="/student/jobs"
          element={
            <RequireRole role="student">
              <JobHub />
            </RequireRole>
          }
        />
        <Route
          path="/student/tools"
          element={
            <RequireRole role="student">
              <StudentTools />
            </RequireRole>
          }
        />

        <Route
          path="/alumni"
          element={
            <RequireRole role="student">
              <AlumniPortal />
            </RequireRole>
          }
        />

        <Route
          path="/admin"
          element={
            <RequireRole role="admin">
              <AdminDashboard />
            </RequireRole>
          }
        />
        <Route
          path="/admin/students/:studentId"
          element={
            <RequireRole role="admin">
              <AdminStudentDetail />
            </RequireRole>
          }
        />
        <Route
          path="/admin/calendar"
          element={
            <RequireRole role="admin">
              <AdminCalendarManagement />
            </RequireRole>
          }
        />
        <Route
          path="/admin/jobs"
          element={
            <RequireRole role="admin">
              <AdminJobManagement />
            </RequireRole>
          }
        />
        <Route
          path="/admin/notifications"
          element={
            <RequireRole role="admin">
              <AdminNotificationCentre />
            </RequireRole>
          }
        />
        <Route
          path="/admin/export"
          element={
            <RequireRole role="admin">
              <AdminExport />
            </RequireRole>
          }
        />
      </Routes>
    </AppShell>
  )
}
