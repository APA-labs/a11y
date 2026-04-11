const VIEW_W = 320
const VIEW_H = 180
const ACCENT = '#8b5cf6'

type Row = { label: string; on: boolean }

const ROWS: Row[] = [
  { label: 'Dark mode', on: true },
  { label: 'Auto-save', on: true },
  { label: 'Share analytics', on: false }
]

const ROW_H = 38
const SWITCH_W = 44
const SWITCH_H = 24
const HANDLE_R = 9

const GROUP_W = 230
const START_X = (VIEW_W - GROUP_W) / 2
const TOTAL_H = ROWS.length * ROW_H
const START_Y = (VIEW_H - TOTAL_H) / 2 + ROW_H / 2

export default function TogglePreview() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      {ROWS.map((row, i) => {
        const cy = START_Y + i * ROW_H
        const switchX = START_X + GROUP_W - SWITCH_W
        const switchY = cy - SWITCH_H / 2
        const handleCx = row.on ? switchX + SWITCH_W - HANDLE_R - 3 : switchX + HANDLE_R + 3
        return (
          <g key={row.label}>
            <text
              x={START_X}
              y={cy + 4}
              fontSize={12.5}
              fontWeight={row.on ? 600 : 500}
              fontFamily='system-ui, -apple-system, sans-serif'
              style={{ fill: row.on ? 'var(--body)' : 'var(--soft)' }}>
              {row.label}
            </text>
            <rect
              x={switchX}
              y={switchY}
              width={SWITCH_W}
              height={SWITCH_H}
              rx={12}
              style={{
                fill: row.on ? ACCENT : 'var(--divider)',
                stroke: row.on ? 'none' : 'var(--outline)',
                strokeWidth: row.on ? 0 : 1
              }}
            />
            <circle
              cx={handleCx}
              cy={cy}
              r={HANDLE_R}
              style={{
                fill: '#ffffff'
              }}
            />
          </g>
        )
      })}
    </svg>
  )
}
