const VIEW_W = 320
const VIEW_H = 180

const TABLE_X = 28
const TABLE_Y = 24
const TABLE_W = 264
const TABLE_H = 132
const ROW_H = 26
const HEADER_H = 28

const COLS = [
  { x: 16, w: 70 },
  { x: 104, w: 40 },
  { x: 160, w: 36 },
  { x: 212, w: 36 }
]

export default function TablePreview() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      <rect
        x={TABLE_X}
        y={TABLE_Y}
        width={TABLE_W}
        height={TABLE_H}
        rx={10}
        style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1 }}
      />

      <rect
        x={TABLE_X}
        y={TABLE_Y}
        width={TABLE_W}
        height={HEADER_H}
        style={{ fill: 'var(--divider)' }}
      />
      <path
        d={`M${TABLE_X} ${TABLE_Y + HEADER_H} L${TABLE_X + TABLE_W} ${TABLE_Y + HEADER_H}`}
        style={{ stroke: 'var(--outline)', strokeWidth: 1 }}
      />

      {COLS.map((col, i) => (
        <rect
          key={`h${i}`}
          x={TABLE_X + col.x}
          y={TABLE_Y + HEADER_H / 2 - 3}
          width={col.w}
          height={6}
          rx={3}
          style={{ fill: 'var(--body)' }}
        />
      ))}

      {[0, 1, 2, 3].map((row) => {
        const ry = TABLE_Y + HEADER_H + row * ROW_H
        return (
          <g key={`r${row}`}>
            {row < 3 ? (
              <path
                d={`M${TABLE_X + 12} ${ry + ROW_H} L${TABLE_X + TABLE_W - 12} ${ry + ROW_H}`}
                style={{ stroke: 'var(--divider)', strokeWidth: 1 }}
              />
            ) : null}
            {COLS.map((col, i) => {
              const w = i === 0 ? col.w : Math.max(20, col.w - 10 + ((row * 7) % 12))
              return (
                <rect
                  key={`c${row}-${i}`}
                  x={TABLE_X + col.x}
                  y={ry + ROW_H / 2 - 2.5}
                  width={w}
                  height={5}
                  rx={2.5}
                  style={{
                    fill: i === 0 ? 'var(--body)' : 'var(--soft)',
                    opacity: i === 0 ? 0.75 : 0.55
                  }}
                />
              )
            })}
          </g>
        )
      })}
    </svg>
  )
}
