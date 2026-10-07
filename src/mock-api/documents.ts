// Documents module (the program "wiki"): the admin controls this library and
// students browse and download from it. The types live here for now and can
// move into src/types if the module grows.

export type DocumentCategory = 'orientation' | 'forms' | 'lab' | 'career'
export type DocumentFormat = 'PDF' | 'DOCX' | 'Link'

export interface ProgramDocument {
  id: string
  title: string
  description: string
  category: DocumentCategory
  format: DocumentFormat
  url?: string // real file or page, if the admin has one; otherwise a placeholder file downloads
  updatedAt: string // ISO date
}

export const DOCUMENT_CATEGORIES: DocumentCategory[] = ['orientation', 'forms', 'lab', 'career']

export const DOCUMENT_CATEGORY_LABELS: Record<DocumentCategory, string> = {
  orientation: 'Orientation',
  forms: 'Forms & templates',
  lab: 'Lab procedures & policies',
  career: 'Career',
}

export const DOCUMENT_FORMATS: DocumentFormat[] = ['PDF', 'DOCX', 'Link']

// Placeholder documents with clearly fake dates. Replace these with the real
// files once the MM office provides them.
export let DOCUMENTS: ProgramDocument[] = [
  {
    id: 'doc-1',
    title: 'MM Orientation Guide',
    description: 'A first-week guide to the MM program: who to contact, what to expect, and what to do first.',
    category: 'orientation',
    format: 'PDF',
    updatedAt: '2026-08-15',
  },
  {
    id: 'doc-2',
    title: 'IDP Workbook',
    description: 'The Individual Development Plan workbook that students complete during the first year.',
    category: 'forms',
    format: 'DOCX',
    updatedAt: '2026-08-15',
  },
  {
    id: 'doc-3',
    title: 'IDP and PD Completion Form',
    description: 'Submit this after the internship to confirm the IDP and professional development requirements are done.',
    category: 'forms',
    format: 'PDF',
    updatedAt: '2026-08-15',
  },
  {
    id: 'doc-4',
    title: 'Internship Approval Form',
    description: 'Submit this once an internship placement is confirmed, before the internship begins.',
    category: 'forms',
    format: 'PDF',
    updatedAt: '2026-08-20',
  },
  {
    id: 'doc-5',
    title: 'Internship Report Guidelines',
    description: 'What to include in the four-month progress report and the eight-month final report.',
    category: 'forms',
    format: 'PDF',
    updatedAt: '2026-08-20',
  },
  {
    id: 'doc-6',
    title: 'Lab Procedures and Safety Policies',
    description: 'How to use the lab space and equipment, and the policies everyone working in the lab follows.',
    category: 'lab',
    format: 'PDF',
    updatedAt: '2026-09-01',
  },
  {
    id: 'doc-7',
    title: 'How to Apply for GPU Access',
    description: 'Steps for requesting GPU compute access for course projects and research work.',
    category: 'lab',
    format: 'PDF',
    updatedAt: '2026-09-01',
  },
  {
    id: 'doc-8',
    title: 'MM Resume Template',
    description: 'The latest MM resume template, to use with the resume tool when preparing for the internship search.',
    category: 'career',
    format: 'DOCX',
    updatedAt: '2026-09-05',
  },
]

function today(): string {
  return new Date().toISOString().slice(0, 10)
}

export function getAllDocuments(): ProgramDocument[] {
  return [...DOCUMENTS].sort((a, b) => a.title.localeCompare(b.title))
}

export function addDocument(doc: Omit<ProgramDocument, 'id' | 'updatedAt'>): ProgramDocument {
  const newDoc: ProgramDocument = { ...doc, id: `doc-${Date.now()}`, updatedAt: today() }
  DOCUMENTS = [...DOCUMENTS, newDoc]
  return newDoc
}

export function updateDocument(
  id: string,
  updates: Partial<Omit<ProgramDocument, 'id'>>,
): ProgramDocument | undefined {
  let updated: ProgramDocument | undefined
  DOCUMENTS = DOCUMENTS.map((d) => {
    if (d.id !== id) return d
    updated = { ...d, ...updates, updatedAt: today() }
    return updated
  })
  return updated
}

export function removeDocument(id: string): void {
  DOCUMENTS = DOCUMENTS.filter((d) => d.id !== id)
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// There is no real file storage in this prototype, so documents without a link
// download a small placeholder text file instead.
export function downloadPlaceholderFile(doc: ProgramDocument): void {
  const text = [
    doc.title,
    '',
    doc.description,
    '',
    'This is a placeholder file from the MM Portal prototype.',
    'The real document will be added by the MM office.',
  ].join('\n')
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', `${slugify(doc.title)}.txt`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}