const VIEW_W = 320
const VIEW_H = 180
const ACCENT = '#8b5cf6'

const BOX_SIZE = 20
const BOX_RADIUS = 4
const ROW_GAP = 14
const LABEL_GAP = 12
const GROUP_X = 78

type Row = { checked: boolean; labelW: number }

const ROWS: Row[] = [
  { checked: true, labelW: 156 },
  { checked: true, labelW: 128 },
  { checked: false, labelW: 144 },
  { checked: false, labelW: 120 }
]

export default function CheckboxPreview() {
  const totalH = ROWS.length * BOX_SIZE + (ROWS.length - 1) * ROW_GAP
  const startY = (VIEW_H - totalH) / 2

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      {ROWS.map((row, i) => {
        const y = startY + i * (BOX_SIZE + ROW_GAP)
        const cx = GROUP_X
        const cy = y
        return (
          <g key={i}>
            <rect
              x={cx}
              y={cy}
              width={BOX_SIZE}
              height={BOX_SIZE}
              rx={BOX_RADIUS}
              style={{
                fill: row.checked ? ACCENT : 'var(--surface)',
                stroke: row.checked ? ACCENT : 'var(--outline)',
                strokeWidth: 1.5
              }}
            />
            {row.checked ? (
              <polyline
                points={`${cx + 4.5},${cy + 10.5} ${cx + 8.5},${cy + 14.5} ${cx + 15.5},${cy + 6.5}`}
                style={{
                  fill: 'none',
                  stroke: '#ffffff',
                  strokeWidth: 2,
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round'
                }}
              />
            ) : null}
            <rect
              x={cx + BOX_SIZE + LABEL_GAP}
              y={cy + BOX_SIZE / 2 - 2.5}
              width={row.labelW}
              height={5}
              rx={2.5}
              style={{
                fill: row.checked ? 'var(--body)' : 'var(--soft)',
                opacity: row.checked ? 0.82 : 0.6
              }}
            />
          </g>
        )
      })}
    </svg>
  )
}
