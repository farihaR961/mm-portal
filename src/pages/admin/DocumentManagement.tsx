import { FormEvent, useState } from 'react'
import {
  getAllDocuments,
  addDocument,
  updateDocument,
  removeDocument,
  DOCUMENT_CATEGORIES,
  DOCUMENT_CATEGORY_LABELS,
  DOCUMENT_FORMATS,
  DocumentCategory,
  DocumentFormat,
  ProgramDocument,
} from '../../mock-api'
import PageHeader from '../../components/PageHeader'
import Modal from '../../components/Modal'

type DocumentFormData = Omit<ProgramDocument, 'id' | 'updatedAt'>

export default function AdminDocumentManagement() {
  const [, forceRerender] = useState(0)
  const [editing, setEditing] = useState<ProgramDocument | null>(null)
  const [creating, setCreating] = useState(false)

  const documents = getAllDocuments()

  const handleSave = (data: DocumentFormData, existingId?: string) => {
    if (existingId) {
      updateDocument(existingId, data)
    } else {
      addDocument(data)
    }
    setEditing(null)
    setCreating(false)
    forceRerender((n) => n + 1)
  }

  const handleRemove = (id: string) => {
    removeDocument(id)
    forceRerender((n) => n + 1)
  }

  return (
    <div>
      <PageHeader
        eyebrow="Admin"
        title="Document management"
        description="Add, edit, or remove the documents students see in the Documents section. Real file uploads need a backend; for now, paste a link to a file, or leave it blank to use a placeholder download."
        actions={
          <button className="btn-primary" onClick={() => setCreating(true)}>
            Add document
          </button>
        }
      />

      {documents.length === 0 ? (
        <p className="text-sm text-ink-2">No documents yet. Use "Add document" to create the first one.</p>
      ) : (
        <div className="space-y-3">
          {documents.map((doc) => (
            <div key={doc.id} className="card flex items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <p className="font-medium">{doc.title}</p>
                  <span className="badge bg-mist text-ink-2 border-line">{doc.format}</span>
                </div>
                <p className="text-sm text-ink-2">
                  {DOCUMENT_CATEGORY_LABELS[doc.category]} · Updated {doc.updatedAt}
                  {doc.url ? ' · Has link' : ' · Placeholder file'}
                </p>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <button className="text-sm text-ua-green hover:underline" onClick={() => setEditing(doc)}>
                  Edit
                </button>
                <button className="text-sm text-red-600 hover:underline" onClick={() => handleRemove(doc.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(creating || editing) && (
        <DocumentFormModal
          document={editing ?? undefined}
          onClose={() => {
            setCreating(false)
            setEditing(null)
          }}
          onSave={handleSave}
        />
      )}
    </div>
  )
}

function DocumentFormModal({
  document,
  onClose,
  onSave,
}: {
  document?: ProgramDocument
  onClose: () => void
  onSave: (data: DocumentFormData, existingId?: string) => void
}) {
  const [title, setTitle] = useState(document?.title ?? '')
  const [description, setDescription] = useState(document?.description ?? '')
  const [category, setCategory] = useState<DocumentCategory>(document?.category ?? 'orientation')
  const [format, setFormat] = useState<DocumentFormat>(document?.format ?? 'PDF')
  const [url, setUrl] = useState(document?.url ?? '')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSave(
      {
        title: title.trim(),
        description: description.trim(),
        category,
        format,
        url: url.trim() || undefined,
      },
      document?.id,
    )
  }

  return (
    <Modal title={document ? 'Edit document' : 'Add document'} onClose={onClose}>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="text-sm font-medium block mb-1">Title</label>
          <input className="input" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Description</label>
          <textarea
            className="input"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium block mb-1">Category</label>
            <select
              className="input"
              value={category}
              onChange={(e) => setCategory(e.target.value as DocumentCategory)}
            >
              {DOCUMENT_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {DOCUMENT_CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">Format</label>
            <select className="input" value={format} onChange={(e) => setFormat(e.target.value as DocumentFormat)}>
              {DOCUMENT_FORMATS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium block mb-1">Link to the file (optional)</label>
          <input
            className="input"
            placeholder="https://… (leave blank for a placeholder download)"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <button type="submit" className="btn-primary w-full">
          {document ? 'Save changes' : 'Add document'}
        </button>
      </form>
    </Modal>
  )
}