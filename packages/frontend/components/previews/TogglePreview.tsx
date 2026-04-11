const VIEW_W = 320
const VIEW_H = 180

const ACTIVE = '#8b5cf6'

const LABEL_X = 50
const SWITCH_X = 220
const SWITCH_W = 48
const SWITCH_H = 28
const HANDLE_R = 10
const PADDING = 4

type Row = {
  cy: number
  labelW: number
  labelFill: string
  on: boolean
}

const ROWS: Row[] = [
  { cy: 40, labelW: 130, labelFill: 'var(--body)', on: true },
  { cy: 90, labelW: 150, labelFill: 'var(--body)', on: true },
  { cy: 140, labelW: 100, labelFill: 'var(--soft)', on: false }
]

export default function TogglePreview() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      {ROWS.map((row, i) => {
        const switchY = row.cy - SWITCH_H / 2
        const handleCx = row.on ? SWITCH_X + SWITCH_W - PADDING - HANDLE_R : SWITCH_X + PADDING + HANDLE_R
        const handleCy = row.cy

        return (
          <g key={i}>
            <rect
              x={LABEL_X}
              y={row.cy - 2.5}
              width={row.labelW}
              height={5}
              rx={2.5}
              style={{ fill: row.labelFill, opacity: row.on ? 0.85 : 0.7 }}
            />
            <rect
              x={SWITCH_X}
              y={switchY}
              width={SWITCH_W}
              height={SWITCH_H}
              rx={14}
              style={{
                fill: row.on ? ACTIVE : 'var(--divider)',
                stroke: row.on ? ACTIVE : 'var(--outline)',
                strokeWidth: 1
              }}
            />
            <circle
              cx={handleCx}
              cy={handleCy}
              r={HANDLE_R}
              style={{
                fill: row.on ? '#ffffff' : 'var(--surface)',
                stroke: row.on ? 'transparent' : 'var(--outline)',
                strokeWidth: 1
              }}
            />
          </g>
        )
      })}
    </svg>
  )
}
