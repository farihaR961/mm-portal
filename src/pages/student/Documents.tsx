import { useMemo, useState } from 'react'
import {
  getAllDocuments,
  downloadPlaceholderFile,
  DOCUMENT_CATEGORIES,
  DOCUMENT_CATEGORY_LABELS,
  DocumentCategory,
  ProgramDocument,
} from '../../mock-api'
import PageHeader from '../../components/PageHeader'

export default function StudentDocuments() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<DocumentCategory | 'all'>('all')

  const documents = getAllDocuments()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return documents.filter((d) => {
      const matchesCategory = category === 'all' || d.category === category
      const matchesQuery = !q || d.title.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [documents, query, category])

  const handleDownload = (doc: ProgramDocument) => {
    if (doc.url) {
      window.open(doc.url, '_blank', 'noopener')
    } else {
      downloadPlaceholderFile(doc)
    }
  }

  return (
    <div>
      <PageHeader
        eyebrow="Documents"
        title="Program documents"
        description="Guides, forms, and policies for the MM program, kept up to date by the MM office."
      />

      <input
        className="input mb-4 max-w-md"
        placeholder="Search documents…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="flex flex-wrap gap-1.5 mb-6">
        {(['all', ...DOCUMENT_CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
              category === c ? 'bg-ua-deep-green text-white border-ua-deep-green' : 'bg-white text-ink-2 border-line'
            }`}
          >
            {c === 'all' ? 'All' : DOCUMENT_CATEGORY_LABELS[c]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-ink-2">No documents match your search.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((doc) => (
            <div key={doc.id} className="card flex flex-col">
              <div className="flex items-start justify-between gap-3 mb-2">
                <p className="label-mono">{DOCUMENT_CATEGORY_LABELS[doc.category]}</p>
                <span className="badge bg-mist text-ink-2 border-line">{doc.format}</span>
              </div>
              <h2 className="font-medium mb-1">{doc.title}</h2>
              <p className="text-sm text-ink-2 mb-4 flex-1">{doc.description}</p>
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-ink-2 font-mono">Updated {doc.updatedAt}</p>
                <button onClick={() => handleDownload(doc)} className="btn-primary text-sm">
                  {doc.format === 'Link' ? 'Open ↗' : 'Download'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}