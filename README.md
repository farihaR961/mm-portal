# MM Portal

A frontend prototype of the MM Program Portal for the University of Alberta Multimedia (MM) co-op MSc program. It is built with React, Vite, TypeScript, and Tailwind CSS.


## Run it

You need Node.js 18 or newer and npm.

```bash
npm install
npm run dev
```

Open the address that `npm run dev` prints, usually `http://localhost:5173`. If that port is busy, Vite picks the next free one and prints it.

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the site for development |
| `npm run build` | Type-checks and builds the production bundle |
| `npm run preview` | Serves the built bundle locally |
| `npx tsc --noEmit` | Type-checks the whole project without building |
| `npm run lint` | Runs ESLint |

## Sign in

There is one sign-in page for everyone, at `/login`. The email decides your role.

1. Enter a CCID (or the full email) and any password.
2. Enter the 6-digit code from the verification step.

The prototype cannot send email, so the "email" appears on the login page as a **demo inbox notification** in the corner. Click **Open email** to see the code. Codes expire after 10 minutes, and five wrong tries end the sign-in.

Settings for developers:

- `MOCK_TWO_FACTOR_ENABLED` in `src/mock-api/twoFactor.ts` turns the code step on or off.
- `MOCK_ALLOW_UNKNOWN_UALBERTA_EMAILS` in `src/mock-api/users.ts` decides whether any other `@ualberta.ca` CCID is accepted.
## What is in it

**Public pages**
- `/` is the MM program home page: a short description, key numbers, and a tabbed card (Apply, Timeline, Courses, Internship, Contact). A placeholder is ready for the lab posters.
- `/login` is the sign-in page with 2-step verification.
- `/program` is the program information route (it currently redirects to the home page).

**Current student** (`/student`)
- Dashboard: next action, progress, links to Gmail, Canvas, and Bear Tracks, upcoming calendar items, notifications, and a TA resources link
- Profile, MM journey timeline, documents, calendar, notifications and admin requests, internship tracking, job hub, and tools (resume, LinkedIn, job search tips)

**Alumni** (`/alumni`): profile, past program record, alumni events, and openings

**Admin** (`/admin`)
- Cohort dashboard, student detail with notify and request-information actions
- Calendar management (students get a notification and an email on every change)
- Document management, job posting management, notification centre, and CSV export

## How the code is organized

```
src/
  types/         Shared TypeScript types
  mock-api/      The only place fake data and data functions live
                 (students, calendar, notifications, jobs, documents,
                  users, twoFactor, csv, catalogue)
  context/       AuthContext: session and the two-step sign-in
  hooks/         useCurrentStudent
  components/    AppShell (portal menu), Footer, PageHeader, Modal,
                 StatusBadge, CategoryTag, CalendarView, RequireRole
  pages/         Home, Login, AlumniPortal, PartnerPortal,
                 student/ pages, admin/ pages
  App.tsx        Route table, with role checks
```

Pages never hold their own fake data. They call functions from `src/mock-api`.

## Moving to a real backend

`src/mock-api` is the swap point. Replace the functions there with real requests, keep the same return shapes from `src/types`, and the pages should not need to change.

Two parts need a server and cannot be done safely in the browser:
- **Sign-in and the email code.** The server should create the code, email it, and check it. It must never send the code back to the browser. The logic is isolated in `src/mock-api/twoFactor.ts`.
- **Role checks.** `RequireRole` only hides pages in the browser. A real server must also check the role on every request.

## Limits of this prototype

- Data lives in memory and resets when the page is refreshed.
- Document downloads are placeholder files, unless an admin pastes a link to a real file.
- Resume template, job postings, course details, and all dates are placeholders or fake.
- Course project assignment, submission, and grading are intentionally not built.

Planned next: student status updates, alumni profile editing (LinkedIn, website, CV upload, "last updated"), and admin dashboard filters.

## Design

The look follows the ROSS research site: UA green `#007C41`, deep green `#0B3D23`, gold `#FFDB05`, mist `#F3F6F2`, line `#DBE2DA`, ink `#101B13` and `#44544A`. Fonts are Archivo for text, Fraunces italic for accents, and IBM Plex Mono for small labels. It works on phones as well as desktops.

## More documentation

See `docs/PROJECT_NOTES.md` for the sitemap, the user stories, and a record of what was added and why.
