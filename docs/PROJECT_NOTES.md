# MM Portal — Sitemap, User Stories, and Notes

## Sitemap

```
/                              Mock login (Admin / Current Student / Alumni)
/program                       Program overview & onboarding (public, no login required)

/student                       Student dashboard
/student/profile               Profile & progress (view + admin-requested edits)
/student/journey                Full MM journey timeline
/student/calendar               MM calendar (month/list, filtered)
/student/notifications          Notifications & information requests inbox
/student/internship              Internship tracking
/student/jobs                     Job & internship hub
/student/tools                     Resume builder, LinkedIn guide, job-search tips

/alumni                          Alumni portal

/admin                             Admin dashboard (cohort overview)
/admin/students/:studentId          Admin student detail (inspect + update + notify/request)
/admin/calendar                       Calendar management (add/edit/remove events)
/admin/jobs                             Job posting management
/admin/notifications                     Notification centre (one/group/cohort)
/admin/export                              CSV export
```

## User stories covered

**Authentication**
- [x] Mock login with Admin, Current Student, and Alumni options.

**Program information**
- [x] Public onboarding page explaining the MM co-op MSc vs. thesis/course MSc.
- [x] Full program timeline: admission → orientation → courses → internship search
      → internship → reports → graduation → alumni.
- [x] Admission calendar info (Fall intake, deadlines) from the brief.
- [x] MRC mentors and program contacts section.

**Student dashboard & profile**
- [x] Next action, course/internship/graduation progress, upcoming calendar items,
      unread notifications, open requests all surfaced on one dashboard.
- [x] Profile page shows admin-entered info; only admin-requested fields are editable.

**MM journey**
- [x] Timeline with completed / current / upcoming / waiting / overdue states,
      computed from each student's actual record.

**Calendar**
- [x] Month and list views.
- [x] Filters for all 8 categories from the brief (orientation, briefing, seminar,
      course, internship, report, event, graduation).
- [x] Event detail view.
- [x] Admin-only add/edit/remove; every change triggers a mock notification + mock
      email to the affected students.

**Notifications & requests**
- [x] Portal inbox with read/unread state.
- [x] Information requests with due date, requested fields, student submission,
      and admin visibility into pending/viewed/submitted status.

**Job & internship hub**
- [x] Searchable opportunity cards, full detail view, application link.
- [x] Admin posting management (add/remove).

**Internship tracking**
- [x] All required states from the brief: not-started, looking, applied,
      interviewing, offer, placed, active (all represented across sample students).
- [x] Company/group, project, duration, start/end, approval status, MM807/MM808,
      four- and eight-month reports, supplementary courses (MM809/810) shown only
      when flagged required.

**Resume & LinkedIn tools**
- [x] Step-by-step resume info form with a generated preview (placeholder layout —
      real MM template not yet provided).
- [x] LinkedIn setup step tracker.
- [x] Job search suggestions (where to look, how to start, what to prepare).

**Alumni portal**
- [x] Alumni profile, past program record, alumni events, current openings.

**Admin dashboard & student detail**
- [x] Cohort overview: counts by internship status, students needing attention,
      pending requests, full student table.
- [x] Per-student detail: courses, requirements, internship, graduation checklist,
      forms, and the ability to send a notification or an information request.

**Admin calendar / jobs / notifications / export**
- [x] Calendar CRUD, job posting CRUD, notification centre (one/group/cohort),
      CSV export (all students or one student) using fake data.

**Data model**
- [x] Cohort course selection (6 of 8 catalogue courses) is admin-configurable
      data, not hard-coded, per the brief's explicit instruction.

## What's intentionally out of scope for this 2-week frontend pass

- Real UofA login — mock login only, as instructed.
- Real backend — all data lives in `src/mock-api`, matching the fake-data
  instruction; the module boundary is designed so a real API can replace it.
- Real email delivery — notifications show a "mock email sent" marker instead.
- Course project assignment, submission, and grading — the brief explicitly
  says not to build this for the first version.

## Additions beyond the literal brief (and why)

- **"Needs attention" flag on students** (admin dashboard + student detail):
  not explicitly requested, but the brief asks for a "students who need
  attention" section on the admin dashboard — this required computing *some*
  signal, so a simple flagged reason (e.g. incomplete ethics hours + no
  internship search started) was added directly on the mock student record
  rather than invented purely in the UI, so it's visible and explainable to
  a reviewer.
- **CSV preview before download** on the export page: makes it possible to
  verify the export is using the right fake data without opening the
  downloaded file, useful during review/demo.
- **Job Hub search box**: the brief says "searchable opportunity cards" but
  doesn't specify what's searchable — implemented as a simple text match
  across title, company, and location.

## Style notes

Tailwind theme (`tailwind.config.js`) encodes the exact ROSS palette and
fonts from the brief: UA green, deep green, gold, mist, line, ink/ink-2,
sage and cream card tints; Archivo for body/UI, Fraunces italic reserved for
a small number of accent words (used sparingly — see `.accent` class), IBM
Plex Mono for small uppercase labels via the `.label-mono` utility class.
Deliberately avoided: purple/gradient accents, glass-panel effects, floating
blobs, and emoji icons, per the brief's explicit "don't" list.
