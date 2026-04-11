const VIEW_W = 320
const VIEW_H = 180
const ACCENT = '#8b5cf6'

type LinkItem = { label: string; link?: boolean }

const ITEMS: LinkItem[] = [{ label: 'About us' }, { label: 'View documentation', link: true }, { label: 'Contact support' }]

const LINE_GAP = 30
const TOTAL_H = (ITEMS.length - 1) * LINE_GAP
const START_Y = (VIEW_H - TOTAL_H) / 2 + 4

export default function LinkPreview() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      {ITEMS.map((item, i) => {
        const y = START_Y + i * LINE_GAP
        const color = item.link ? ACCENT : 'var(--soft)'
        const weight = item.link ? 600 : 500
        return (
          <g key={item.label}>
            <text
              x={VIEW_W / 2}
              y={y}
              textAnchor='middle'
              fontSize={14}
              fontWeight={weight}
              fontFamily='system-ui, -apple-system, sans-serif'
              style={{ fill: color }}>
              {item.label}
              {item.link ? ' →' : ''}
            </text>
            {item.link ? (
              <line
                x1={VIEW_W / 2 - 68}
                x2={VIEW_W / 2 + 68}
                y1={y + 4}
                y2={y + 4}
                style={{ stroke: ACCENT, strokeWidth: 1.2 }}
              />
            ) : null}
          </g>
        )
      })}

      <rect
        x={VIEW_W / 2 - 78}
        y={START_Y + LINE_GAP - 16}
        width={156}
        height={24}
        rx={6}
        style={{
          fill: 'none',
          stroke: ACCENT,
          strokeWidth: 1.5,
          strokeDasharray: '3 3',
          opacity: 0.55
        }}
      />
    </svg>
  )
}
