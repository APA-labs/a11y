const VIEW_W = 320
const VIEW_H = 180
const ACTIVE = '#8b5cf6'

type Row = { selected: boolean; labelW: number }

const ROWS: Row[] = [
  { selected: false, labelW: 120 },
  { selected: true, labelW: 150 },
  { selected: false, labelW: 130 },
  { selected: false, labelW: 100 }
]

const RADIUS = 10
const INNER_R = 4.5
const ROW_GAP = 18
const ROW_H = RADIUS * 2
const LABEL_H = 5
const CIRCLE_TO_LABEL = 14

const GROUP_X = 70
const totalH = ROWS.length * ROW_H + (ROWS.length - 1) * ROW_GAP
const startY = (VIEW_H - totalH) / 2

export default function RadioGroupPreview() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      {ROWS.map((row, i) => {
        const cy = startY + RADIUS + i * (ROW_H + ROW_GAP)
        const cx = GROUP_X + RADIUS
        const labelX = cx + RADIUS + CIRCLE_TO_LABEL
        return (
          <g key={i}>
            <circle
              cx={cx}
              cy={cy}
              r={RADIUS}
              style={{
                fill: 'var(--surface)',
                stroke: row.selected ? ACTIVE : 'var(--outline)',
                strokeWidth: row.selected ? 2 : 1.5
              }}
            />
            {row.selected ? (
              <circle
                cx={cx}
                cy={cy}
                r={INNER_R}
                style={{ fill: ACTIVE }}
              />
            ) : null}
            <rect
              x={labelX}
              y={cy - LABEL_H / 2}
              width={row.labelW}
              height={LABEL_H}
              rx={LABEL_H / 2}
              style={{
                fill: row.selected ? 'var(--body)' : 'var(--soft)'
              }}
            />
          </g>
        )
      })}
    </svg>
  )
}
