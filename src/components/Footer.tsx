export default function Footer({ maxWidth = 'max-w-6xl' }: { maxWidth?: string }) {
  return (
    <footer className="border-t-2 border-ua-gold">
      <div className={`${maxWidth} mx-auto px-4 py-10 grid md:grid-cols-[1.3fr_1fr_1fr] gap-8`}>
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-card bg-ua-green flex items-center justify-center text-white font-mono text-xs font-semibold">
              MM
            </div>
            <p className="font-semibold">MM Portal</p>
          </div>
          <p className="text-sm text-ink-2 max-w-xs leading-relaxed">
            Department of Computing Science, University of Alberta. University Commons 7-213, Edmonton, Alberta,
            Canada T6G 2N8.
          </p>
        </div>

        <div>
          <p className="label-mono mb-3">Contact</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a
                href="mailto:csmmadm@ualberta.ca"
                className="text-ink-2 hover:text-ua-deep-green hover:underline underline-offset-2 transition-colors"
              >
                csmmadm@ualberta.ca
              </a>
              <p className="text-xs text-ink-2/70">MM Program admissions</p>
            </li>
            <li>
              <a
                href="mailto:csgradprog@ualberta.ca"
                className="text-ink-2 hover:text-ua-deep-green hover:underline underline-offset-2 transition-colors"
              >
                csgradprog@ualberta.ca
              </a>
              <p className="text-xs text-ink-2/70">Graduate advising</p>
            </li>
            <li>
              <a
                href="tel:+17804922285"
                className="text-ink-2 hover:text-ua-deep-green hover:underline underline-offset-2 transition-colors"
              >
                (780) 492-2285
              </a>
              <p className="text-xs text-ink-2/70">Main office</p>
            </li>
          </ul>
        </div>

        <div>
          <p className="label-mono mb-3">Elsewhere</p>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://mmgrad.org/program.php"
                target="_blank"
                rel="noreferrer"
                className="text-ink-2 hover:text-ua-deep-green hover:underline underline-offset-2 transition-colors"
              >
                Official MM Program site ↗
              </a>
            </li>
            <li>
              <a
                href="https://www.ualberta.ca/en/computing-science/index.html"
                target="_blank"
                rel="noreferrer"
                className="text-ink-2 hover:text-ua-deep-green hover:underline underline-offset-2 transition-colors"
              >
                Dept. of Computing Science ↗
              </a>
            </li>
          </ul>
        </div
        >
      </div>

      <div className="border-t border-line">
        <div className={`${maxWidth} mx-auto px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1`}>
          <p className="label-mono">© 2026 Multimedia UofA</p>
          
        </div>
      </div>
    </footer>
  )
}