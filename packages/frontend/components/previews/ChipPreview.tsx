const VIEW_W = 320
const VIEW_H = 180

const ACCENT = '#8b5cf6'

type Chip = {
  label: string
  w: number
  fill: string
  stroke?: string
  textColor: string
  xColor: string
}

const CHIPS: Chip[] = [
  {
    label: 'Design',
    w: 86,
    fill: 'var(--surface)',
    stroke: 'var(--outline)',
    textColor: 'var(--body)',
    xColor: 'var(--soft)'
  },
  {
    label: 'React',
    w: 80,
    fill: ACCENT,
    textColor: '#ffffff',
    xColor: 'rgba(255,255,255,0.85)'
  },
  {
    label: 'A11y',
    w: 72,
    fill: 'var(--surface)',
    stroke: 'var(--outline)',
    textColor: 'var(--body)',
    xColor: 'var(--soft)'
  }
]

const CHIP_H = 30
const GAP = 14
const X_OFFSET = 14

export default function ChipPreview() {
  const totalW = CHIPS.reduce((s, c) => s + c.w, 0) + (CHIPS.length - 1) * GAP
  const startX = (VIEW_W - totalW) / 2
  const y = (VIEW_H - CHIP_H) / 2

  let cursor = startX

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      {CHIPS.map((c, i) => {
        const x = cursor
        cursor += c.w + GAP
        const labelX = x + (c.w - X_OFFSET) / 2 + 2
        const xCx = x + c.w - X_OFFSET
        const xCy = y + CHIP_H / 2
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={c.w}
              height={CHIP_H}
              rx={15}
              style={{
                fill: c.fill,
                stroke: c.stroke ?? 'none',
                strokeWidth: c.stroke ? 1.5 : 0
              }}
            />
            <text
              x={labelX}
              y={y + CHIP_H / 2 + 4}
              textAnchor='middle'
              fontSize={12}
              fontWeight={600}
              fontFamily='system-ui, -apple-system, sans-serif'
              style={{ fill: c.textColor }}>
              {c.label}
            </text>
            <path
              d={`M${xCx - 3.5} ${xCy - 3.5} L${xCx + 3.5} ${xCy + 3.5} M${xCx + 3.5} ${xCy - 3.5} L${xCx - 3.5} ${xCy + 3.5}`}
              style={{ stroke: c.xColor, strokeWidth: 1.5, strokeLinecap: 'round' }}
            />
          </g>
        )
      })}
    </svg>
  )
}
