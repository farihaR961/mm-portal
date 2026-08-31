import { Student } from '../types'

function escapeCsvValue(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`
  }
  return value
}

function studentToRow(s: Student): Record<string, string> {
  const coursesDone = s.courses.filter((c) => c.status === 'completed').length
  return {
    Name: s.name,
    CCID: s.ccid,
    Email: s.email,
    Cohort: s.cohort,
    Role: s.subRole,
    Status: s.status,
    'Courses Completed': `${coursesDone}/6`,
    'Internship Search Status': s.internship.searchStatus,
    'Company/Group': s.internship.companyOrGroup ?? '',
    'MM807 Status': s.internship.mm807Status,
    'MM808 Status': s.internship.mm808Status,
    'Four-Month Report': s.internship.fourMonthReport,
    'Eight-Month Report': s.internship.eightMonthReport,
    'IDP Completed': s.idpCompleted ? 'Yes' : 'No',
    'Ethics Hours': `${s.ethicsHoursCompleted}/8`,
    'Needs Attention': s.needsAttention ?? '',
  }
}

export function studentsToCsv(students: Student[]): string {
  if (students.length === 0) return ''
  const rows = students.map(studentToRow)
  const headers = Object.keys(rows[0])
  const lines = [
    headers.join(','),
    ...rows.map((row) => headers.map((h) => escapeCsvValue(row[h])).join(',')),
  ]
  return lines.join('\n')
}

export function downloadCsv(filename: string, csvContent: string): void {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
