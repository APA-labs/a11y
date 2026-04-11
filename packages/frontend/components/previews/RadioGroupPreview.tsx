const VIEW_W = 320
const VIEW_H = 180
const ACCENT = '#8b5cf6'

type Row = { label: string; selected: boolean }

const ROWS: Row[] = [
  { label: 'Standard shipping', selected: false },
  { label: 'Express delivery', selected: true },
  { label: 'Pick up in store', selected: false },
  { label: 'Same-day', selected: false }
]

const RADIUS = 9
const ROW_H = 26
const LABEL_GAP = 12
const GROUP_W = 210
const START_X = (VIEW_W - GROUP_W) / 2
const TOTAL_H = ROWS.length * ROW_H
const START_Y = (VIEW_H - TOTAL_H) / 2 + RADIUS

export default function RadioGroupPreview() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      {ROWS.map((row, i) => {
        const cy = START_Y + i * ROW_H
        return (
          <g key={row.label}>
            <circle
              cx={START_X + RADIUS}
              cy={cy}
              r={RADIUS}
              style={{
                fill: 'var(--surface)',
                stroke: row.selected ? ACCENT : 'var(--outline)',
                strokeWidth: row.selected ? 2 : 1.5
              }}
            />
            {row.selected ? (
              <circle
                cx={START_X + RADIUS}
                cy={cy}
                r={4.5}
                style={{ fill: ACCENT }}
              />
            ) : null}
            <text
              x={START_X + RADIUS * 2 + LABEL_GAP}
              y={cy + 4}
              fontSize={12}
              fontWeight={row.selected ? 600 : 500}
              fontFamily='system-ui, -apple-system, sans-serif'
              style={{ fill: row.selected ? 'var(--body)' : 'var(--soft)' }}>
              {row.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
