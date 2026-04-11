const VIEW_W = 320
const VIEW_H = 180
const ACCENT = '#8b5cf6'

type Row = { label: string; checked: boolean }

const ROWS: Row[] = [
  { label: 'Enable notifications', checked: true },
  { label: 'Subscribe to newsletter', checked: true },
  { label: 'Remember this device', checked: false },
  { label: 'Make profile public', checked: false }
]

const BOX_SIZE = 18
const ROW_H = 26
const LABEL_GAP = 12
const GROUP_W = 210
const START_X = (VIEW_W - GROUP_W) / 2
const TOTAL_H = ROWS.length * ROW_H
const START_Y = (VIEW_H - TOTAL_H) / 2 + BOX_SIZE / 2

export default function CheckboxPreview() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      {ROWS.map((row, i) => {
        const cy = START_Y + i * ROW_H
        const boxY = cy - BOX_SIZE / 2
        return (
          <g key={row.label}>
            <rect
              x={START_X}
              y={boxY}
              width={BOX_SIZE}
              height={BOX_SIZE}
              rx={4}
              style={{
                fill: row.checked ? ACCENT : 'var(--surface)',
                stroke: row.checked ? ACCENT : 'var(--outline)',
                strokeWidth: 1.5
              }}
            />
            {row.checked ? (
              <path
                d={`M${START_X + 4} ${cy + 1} L${START_X + 8} ${cy + 4.5} L${START_X + 14} ${cy - 3}`}
                style={{
                  stroke: '#ffffff',
                  strokeWidth: 2,
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  fill: 'none'
                }}
              />
            ) : null}
            <text
              x={START_X + BOX_SIZE + LABEL_GAP}
              y={cy + 4}
              fontSize={12}
              fontWeight={500}
              fontFamily='system-ui, -apple-system, sans-serif'
              style={{ fill: row.checked ? 'var(--body)' : 'var(--soft)' }}>
              {row.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
