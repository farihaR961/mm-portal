# MM Portal-Frontend Prototype

A frontend-only prototype of the MM Program Portal, built with React + Vite + TypeScript + Tailwind CSS. All data is fake and lives behind a single mock API module (`src/mock-api/`) so a real backend can be swapped in later without touching UI code. There is no real UofA login and no real email sending — both are mocked, as scoped for this first two-week deliverable.

## Running it locally

Requirements: Node.js 18+ and npm.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:5173`).

To type-check and build a production bundle:

```bash
npm run build
npm run preview
```

## Signing in

There is no real authentication. On the landing page, pick one of:
- **Continue as Admin** — goes straight to the admin dashboard.
- **Current MM Student** — pick one of three sample students, each in a different stage of the program (course-heavy, actively searching, internship offer in hand).
- **Alumni** — a sample graduated student.

You can also browse `/program` (Program Information) without signing in at all.

## Project structure

```
src/
  types/            Shared TypeScript types for the whole data model
  mock-api/          The ONLY place fake data and data-access functions live
    catalogue.ts      Course catalogue + which 6 of 8 courses this cohort uses
    students.ts        8 fake student records across every internship stage
    calendar.ts         Calendar events + add/update/remove functions
    notifications.ts     Notifications + information requests
    jobs.ts               Job/internship postings
    csv.ts                 CSV export helpers
    index.ts               Re-exports everything above — import from here
  context/           Mock auth (role + which student is "logged in")
  hooks/             useCurrentStudent() convenience hook
  components/        Shared UI: AppShell (nav), StatusBadge, CategoryTag,
                     CalendarView, Modal, PageHeader, RequireRole (route guard)
  pages/
    Login.tsx, ProgramOverview.tsx, AlumniPortal.tsx
    student/          All current-student pages
    admin/            All admin pages
  App.tsx            Route table
```

## Swapping in a real backend later

Every page imports data functions from `src/mock-api` (e.g. `getStudentById`,
`getAllEvents`, `sendNotification`). To connect a real backend, replace the
implementations inside `src/mock-api/*.ts` with real `fetch` calls that
return the same shapes defined in `src/types/index.ts` — no component code
should need to change.

## What's covered

See `docs/PROJECT_NOTES.md` for the full sitemap, the list of user stories
covered, and a log of anything added beyond the original brief with reasoning.

## Known gaps / next steps

- The real MM resume template and sample job postings hadn't been provided
  yet at the time of this build — the resume tool uses a clearly-labeled
  placeholder layout, and the Job Hub uses invented sample postings. Both are
  easy to swap in `src/mock-api/jobs.ts` and `src/pages/student/Tools.tsx`.
- Course/internship/calendar dates are intentionally fake, as instructed.
- No persistence — refreshing the page resets any admin edits made during a
  session (calendar edits, sent notifications, submitted CSV exports), since
  there's no backend yet.
