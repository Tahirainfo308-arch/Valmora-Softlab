import { useState } from 'react'
import { MoveHorizontal } from 'lucide-react'

interface BeforeAfterProps {
  before: string
  after: string
  alt: string
}

export function BeforeAfter({ before, after, alt }: BeforeAfterProps) {
  const [pos, setPos] = useState(50)

  return (
    <div
      className="relative aspect-[4/3] select-none overflow-hidden bg-roof-200"
      role="group"
      aria-label={`Before and after comparison — ${alt}`}
    >
      <img
        src={after}
        alt={`${alt} — after`}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={before}
          alt={`${alt} — before`}
          className="absolute inset-0 h-full object-cover"
          draggable={false}
          style={{ width: `calc(100% / ${pos / 100})` }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 z-10"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute inset-y-0 -ml-px w-0.5 bg-white shadow" />
        <div className="absolute top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink-900 shadow-card">
          <MoveHorizontal size={18} aria-hidden="true" />
        </div>
      </div>

      <span className="absolute left-3 top-3 z-10 rounded-full bg-ink-950/70 px-2.5 py-0.5 text-xs font-bold text-white">
        Before
      </span>
      <span className="absolute right-3 top-3 z-10 rounded-full bg-ink-950/70 px-2.5 py-0.5 text-xs font-bold text-white">
        After
      </span>

      <input
        type="range"
        min={2}
        max={98}
        step={0.1}
        value={pos}
        onChange={(event) => setPos(Number(event.target.value))}
        aria-label="Drag to compare before and after photos"
        className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  )
}