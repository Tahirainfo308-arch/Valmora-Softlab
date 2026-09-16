import { useEffect, useState } from 'react'
import { LayoutTemplate, X } from 'lucide-react'
import { getCompanyConfig } from './lib/config'
import { cn } from './lib/utils'
import {
  isTemplateKey,
  TEMPLATES,
  TEMPLATE_OPTIONS,
} from './templates'
import type { TemplateKey } from './templates'

function readTemplateFromUrl(): TemplateKey {
  const value = new URLSearchParams(window.location.search).get('template')
  return isTemplateKey(value) ? value : 'lead-gen'
}

function readSwitcherOpenFromUrl(): boolean {
  return new URLSearchParams(window.location.search).get('demo') !== '0'
}

interface DemoSwitcherProps {
  current: TemplateKey
  onChange: (key: TemplateKey) => void
  open: boolean
  onToggle: () => void
}

function DemoSwitcher({ current, onChange, open, onToggle }: DemoSwitcherProps) {
  if (!open) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full border border-roof-200 bg-white px-4 py-2 text-sm font-semibold text-ink-800 shadow-card transition-colors hover:border-brand-600 hover:text-brand-700"
        aria-label="Open template switcher"
      >
        <LayoutTemplate size={16} aria-hidden="true" />
        Demo templates
      </button>
    )
  }

  return (
    <div
      className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 rounded-card border border-roof-200 bg-white p-3 shadow-card-hover"
      role="region"
      aria-label="Velmora demo template switcher"
    >
      <div className="flex items-center gap-3">
        <span className="hidden items-center gap-1.5 pl-1 text-xs font-bold uppercase tracking-wider text-ink-400 sm:inline-flex">
          <LayoutTemplate size={14} aria-hidden="true" />
          Velmora demo
        </span>
        <div className="flex flex-1 flex-col gap-1 sm:flex-row" role="group" aria-label="Choose template">
          {TEMPLATE_OPTIONS.map((option) => (
            <button
              key={option.key}
              type="button"
              onClick={() => onChange(option.key)}
              aria-pressed={current === option.key}
              className={cn(
                'rounded-md px-4 py-2 text-sm font-semibold transition-colors',
                current === option.key
                  ? 'bg-ink-950 text-white'
                  : 'text-ink-600 hover:bg-roof-100 hover:text-ink-950',
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-ink-400 transition-colors hover:bg-roof-100 hover:text-ink-900"
          aria-label="Close template switcher"
        >
          <X size={16} aria-hidden="true" />
        </button>
      </div>
      <p className="mt-2 border-t border-roof-100 pt-2 text-center text-xs text-ink-400">
        Preview the same {getCompanyConfig().company.name} config rendered by
        three different templates — shareable via{' '}
        <code className="rounded bg-roof-100 px-1 py-0.5 font-mono text-[11px]">
          ?template=lead-gen | trust | modern
        </code>
      </p>
    </div>
  )
}

function App() {
  const config = getCompanyConfig()
  const [template, setTemplate] = useState<TemplateKey>(readTemplateFromUrl)
  const [switcherOpen, setSwitcherOpen] = useState(readSwitcherOpenFromUrl)

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set('template', template)
    if (switcherOpen) {
      url.searchParams.delete('demo')
    } else {
      url.searchParams.set('demo', '0')
    }
    window.history.replaceState({}, '', url)
  }, [template, switcherOpen])

  const Site = TEMPLATES[template]

  return (
    <div id="top">
      <Site key={template} config={config} />
      <DemoSwitcher
        current={template}
        onChange={setTemplate}
        open={switcherOpen}
        onToggle={() => setSwitcherOpen((value) => !value)}
      />
    </div>
  )
}

export default App