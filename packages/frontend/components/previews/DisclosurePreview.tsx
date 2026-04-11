const VIEW_W = 320
const VIEW_H = 180

const TRIGGER_W = 240
const TRIGGER_H = 36
const RADIUS = 8
const GAP = 10

const BAR_H = 5
const BARS = [
  { w: 220, fill: 'var(--body)', opacity: 0.8 },
  { w: 200, fill: 'var(--soft)', opacity: 1 },
  { w: 180, fill: 'var(--soft)', opacity: 0.7 }
]
const BAR_GAP = 8

export default function DisclosurePreview() {
  const contentH = BARS.length * BAR_H + (BARS.length - 1) * BAR_GAP
  const totalH = TRIGGER_H + GAP + contentH
  const startY = (VIEW_H - totalH) / 2
  const triggerX = (VIEW_W - TRIGGER_W) / 2
  const triggerY = startY

  const labelX = triggerX + 16
  const labelY = triggerY + TRIGGER_H / 2 - 3
  const labelW = 130

  const chevronCx = triggerX + TRIGGER_W - 20
  const chevronCy = triggerY + TRIGGER_H / 2
  const chevronSize = 5
  const chevronPath = `M ${chevronCx - chevronSize} ${chevronCy - chevronSize / 2} L ${chevronCx} ${chevronCy + chevronSize / 2} L ${chevronCx + chevronSize} ${chevronCy - chevronSize / 2}`

  const contentStartY = triggerY + TRIGGER_H + GAP

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      <rect
        x={triggerX}
        y={triggerY}
        width={TRIGGER_W}
        height={TRIGGER_H}
        rx={RADIUS}
        style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1 }}
      />

      <rect
        x={labelX}
        y={labelY}
        width={labelW}
        height={6}
        rx={3}
        style={{ fill: 'var(--body)' }}
      />

      <path
        d={chevronPath}
        style={{
          fill: 'none',
          stroke: 'var(--soft)',
          strokeWidth: 1.8,
          strokeLinecap: 'round',
          strokeLinejoin: 'round'
        }}
      />

      {BARS.map((bar, i) => {
        const by = contentStartY + i * (BAR_H + BAR_GAP)
        const bx = (VIEW_W - bar.w) / 2
        return (
          <rect
            key={i}
            x={bx}
            y={by}
            width={bar.w}
            height={BAR_H}
            rx={2.5}
            style={{ fill: bar.fill, opacity: bar.opacity }}
          />
        )
      })}
    </svg>
  )
}
