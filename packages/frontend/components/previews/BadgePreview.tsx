const VIEW_W = 320
const VIEW_H = 180

type BadgeVariant = {
  fill: string
  stroke?: string
  bar: string
  dot?: boolean
  neutral?: boolean
}

const BADGES: BadgeVariant[] = [
  { fill: '#8b5cf6', bar: '#ffffff', dot: true },
  { fill: '#10b981', bar: '#ffffff', dot: true },
  { fill: '#f59e0b', bar: '#ffffff' },
  { fill: '#ef4444', bar: '#ffffff', dot: true },
  { fill: 'var(--surface)', bar: 'var(--body)', neutral: true }
]

const BADGE_W = 48
const BADGE_H = 24
const GAP = 12
const RADIUS = 12

export default function BadgePreview() {
  const totalW = BADGES.length * BADGE_W + (BADGES.length - 1) * GAP
  const startX = (VIEW_W - totalW) / 2
  const y = (VIEW_H - BADGE_H) / 2

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      {BADGES.map((badge, i) => {
        const x = startX + i * (BADGE_W + GAP)
        const cy = y + BADGE_H / 2
        const hasDot = badge.dot === true
        const barW = 24
        const barH = 4
        const dotR = 2.5
        const dotGap = 5
        const contentW = hasDot ? dotR * 2 + dotGap + barW : barW
        const contentStartX = x + (BADGE_W - contentW) / 2
        const dotCx = hasDot ? contentStartX + dotR : 0
        const barX = hasDot ? contentStartX + dotR * 2 + dotGap : contentStartX

        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={BADGE_W}
              height={BADGE_H}
              rx={RADIUS}
              style={{
                fill: badge.fill,
                stroke: badge.neutral ? 'var(--outline)' : badge.fill,
                strokeWidth: 1.5
              }}
            />
            {hasDot ? (
              <circle
                cx={dotCx}
                cy={cy}
                r={dotR}
                style={{ fill: badge.bar, opacity: badge.neutral ? 0.7 : 0.9 }}
              />
            ) : null}
            <rect
              x={barX}
              y={cy - barH / 2}
              width={barW}
              height={barH}
              rx={2}
              style={{ fill: badge.bar, opacity: badge.neutral ? 0.75 : 1 }}
            />
          </g>
        )
      })}
    </svg>
  )
}
