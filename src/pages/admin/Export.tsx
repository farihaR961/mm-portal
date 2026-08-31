import { useState } from 'react'
import { getCurrentStudents, studentsToCsv, downloadCsv } from '../../mock-api'
import PageHeader from '../../components/PageHeader'

export default function AdminExport() {
  const students = getCurrentStudents()
  const [selectedId, setSelectedId] = useState<string>('all')

  const handleExport = () => {
    const target = selectedId === 'all' ? students : students.filter((s) => s.id === selectedId)
    const csv = studentsToCsv(target)
    const filename = selectedId === 'all' ? 'mm-cohort-status.csv' : `mm-status-${selectedId}.csv`
    downloadCsv(filename, csv)
  }

  const previewTarget = selectedId === 'all' ? students : students.filter((s) => s.id === selectedId)
  const previewCsv = studentsToCsv(previewTarget)
  const previewLines = previewCsv.split('\n').slice(0, 6)

  return (
    <div>
      <PageHeader eyebrow="Admin" title="Export status" description="Export the current status of all students, or one student's full status, as CSV." />

      <div className="card max-w-2xl">
        <label className="text-sm font-medium block mb-1">Export scope</label>
        <select className="input mb-4" value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          <option value="all">All current students</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <p className="label-mono mb-2">Preview (first rows)</p>
        <div className="border border-line rounded-card p-3 overflow-x-auto bg-mist mb-4">
          <pre className="text-xs font-mono whitespace-pre">{previewLines.join('\n')}</pre>
        </div>

        <button className="btn-primary" onClick={handleExport}>
          Download CSV
        </button>
      </div>
    </div>
  )
}
