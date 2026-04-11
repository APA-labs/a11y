const VIEW_W = 320
const VIEW_H = 180

type Badge = {
  label: string
  w: number
  fill: string
  stroke?: string
  textColor: string
}

const BADGES: Badge[] = [
  { label: 'New', w: 54, fill: '#8b5cf6', textColor: '#ffffff' },
  { label: 'Success', w: 76, fill: '#10b981', textColor: '#ffffff' },
  { label: '99+', w: 48, fill: '#ef4444', textColor: '#ffffff' },
  { label: 'Beta', w: 58, fill: 'var(--surface)', stroke: 'var(--outline)', textColor: 'var(--body)' }
]

const BADGE_H = 28
const GAP = 14

export default function BadgePreview() {
  const totalW = BADGES.reduce((s, b) => s + b.w, 0) + (BADGES.length - 1) * GAP
  const startX = (VIEW_W - totalW) / 2
  const y = (VIEW_H - BADGE_H) / 2

  let cursor = startX

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      {BADGES.map((b, i) => {
        const x = cursor
        cursor += b.w + GAP
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={b.w}
              height={BADGE_H}
              rx={14}
              style={{
                fill: b.fill,
                stroke: b.stroke ?? 'none',
                strokeWidth: b.stroke ? 1.5 : 0
              }}
            />
            <text
              x={x + b.w / 2}
              y={y + BADGE_H / 2 + 4}
              textAnchor='middle'
              fontSize={12}
              fontWeight={600}
              fontFamily='system-ui, -apple-system, sans-serif'
              style={{ fill: b.textColor }}>
              {b.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
