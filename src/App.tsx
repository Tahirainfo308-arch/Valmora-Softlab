import { useEffect, useMemo, useState } from 'react'
import { LayoutTemplate, X } from 'lucide-react'
import {
  CONFIG_OPTIONS,
  getCompanyConfigById,
  isConfigId,
  type ConfigId,
} from './lib/config'
import { cn } from './lib/utils'
import type { CompanyConfig } from './types'
import {
  isTemplateId,
  resolveTemplate,
  TEMPLATES,
  TEMPLATE_OPTIONS,
} from './templates'
import type { TemplateId } from './types'

const URL_KEY_TEMPLATE = 'template'
const URL_KEY_CONFIG = 'config'
const URL_KEY_DEMO = 'demo'

function readParam(key: string): string | null {
  return new URLSearchParams(window.location.search).get(key)
}

function readSwitcherOpenFromUrl(): boolean {
  return readParam(URL_KEY_DEMO) !== '0'
}

interface DemoSwitcherProps {
  configId: ConfigId
  template: TemplateId
  open: boolean
  onConfigChange: (id: ConfigId) => void
  onTemplateChange: (id: TemplateId) => void
  onToggle: () => void
}

function DemoSwitcher({
  configId,
  template,
  open,
  onConfigChange,
  onTemplateChange,
  onToggle,
}: DemoSwitcherProps) {
  if (!open) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full border border-roof-200 bg-white px-4 py-2 text-sm font-semibold text-ink-800 shadow-card transition-colors hover:border-brand-600 hover:text-brand-700"
        aria-label="Open demo switcher"
      >
        <LayoutTemplate size={16} aria-hidden="true" />
        Demo
      </button>
    )
  }

  const currentConfig = CONFIG_OPTIONS.find((option) => option.id === configId)
  const currentTemplate = TEMPLATE_OPTIONS.find((option) => option.id === template)

  return (
    <div
      className="fixed bottom-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 rounded-card border border-roof-200 bg-white p-3 shadow-card-hover"
      role="region"
      aria-label="Velmora demo switcher"
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 pl-1 text-xs font-bold uppercase tracking-wider text-ink-400 sm:inline-flex">
            <LayoutTemplate size={14} aria-hidden="true" />
            Velmora demo
          </span>
          <div className="flex flex-1 flex-wrap gap-1">
            {CONFIG_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => onConfigChange(option.id)}
                aria-pressed={configId === option.id}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-semibold transition-colors',
                  configId === option.id
                    ? 'bg-brand-700 text-white'
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
            aria-label="Close demo switcher"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="flex items-center gap-3 border-t border-roof-100 pt-3">
          <span className="hidden pl-1 text-xs font-bold uppercase tracking-wider text-ink-400 sm:inline-flex">
            Template
          </span>
          <div className="flex flex-1 flex-wrap gap-1" role="group" aria-label="Choose template">
            {TEMPLATE_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => onTemplateChange(option.id)}
                aria-pressed={template === option.id}
                className={cn(
                  'rounded-md px-3 py-2 text-sm font-semibold transition-colors',
                  template === option.id
                    ? 'bg-ink-950 text-white'
                    : 'text-ink-600 hover:bg-roof-100 hover:text-ink-950',
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="mt-2 border-t border-roof-100 pt-2 text-center text-xs text-ink-400">
        {currentConfig?.label}
        {currentTemplate?.tagline ? ` · ${currentTemplate.tagline}` : ''} — shareable via{' '}
        <code className="rounded bg-roof-100 px-1 py-0.5 font-mono text-[11px]">
          ?config={configId}&template={template}
        </code>
      </p>
    </div>
  )
}

function readInitialTemplate(config: CompanyConfig): TemplateId {
  const raw = readParam(URL_KEY_TEMPLATE)
  return resolveTemplate(isTemplateId(raw) ? raw : config.template)
}

function App() {
  const [configId, setConfigId] = useState<ConfigId>(() => {
    const raw = readParam(URL_KEY_CONFIG)
    return isConfigId(raw) ? raw : 'summit'
  })
  const config = useMemo(() => getCompanyConfigById(configId), [configId])

  const [template, setTemplate] = useState<TemplateId>(() => readInitialTemplate(config))
  const [switcherOpen, setSwitcherOpen] = useState(readSwitcherOpenFromUrl)

  useEffect(() => {
    document.title = `${config.company.name} — Roofing Contractor`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', config.hero.subheadline)
  }, [config])

  useEffect(() => {
    const url = new URL(window.location.href)
    url.searchParams.set(URL_KEY_CONFIG, configId)
    url.searchParams.set(URL_KEY_TEMPLATE, template)
    if (switcherOpen) {
      url.searchParams.delete(URL_KEY_DEMO)
    } else {
      url.searchParams.set(URL_KEY_DEMO, '0')
    }
    window.history.replaceState({}, '', url)
  }, [configId, template, switcherOpen])

  function handleConfigChange(id: ConfigId) {
    setConfigId(id)
    setTemplate(resolveTemplate(getCompanyConfigById(id).template))
  }

  const Site = TEMPLATES[template]

  return (
    <div id="top">
      <Site key={`${configId}-${template}`} config={config} />
      <DemoSwitcher
        configId={configId}
        template={template}
        open={switcherOpen}
        onConfigChange={handleConfigChange}
        onTemplateChange={setTemplate}
        onToggle={() => setSwitcherOpen((value) => !value)}
      />
    </div>
  )
}

export default App