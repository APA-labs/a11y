const VIEW_W = 320
const VIEW_H = 180

const CARD_W = 240
const CARD_H = 148
const CARD_X = (VIEW_W - CARD_W) / 2
const CARD_Y = (VIEW_H - CARD_H) / 2
const RADIUS = 10

const HEADER_H = 28
const DIVIDER_Y = CARD_Y + HEADER_H

const GRID_X = CARD_X + 12
const GRID_Y = DIVIDER_Y + 10
const CELL_W = (CARD_W - 24) / 7
const WEEKDAY_H = 6
const ROW_H = 18
const ROWS = 5

const ACTIVE = '#8b5cf6'
const HIGHLIGHT_ROW = 2
const HIGHLIGHT_COL = 3

export default function DatePickerPreview() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      <defs>
        <clipPath id='date-picker-clip'>
          <rect
            x={CARD_X}
            y={CARD_Y}
            width={CARD_W}
            height={CARD_H}
            rx={RADIUS}
          />
        </clipPath>
      </defs>

      <rect
        x={CARD_X}
        y={CARD_Y}
        width={CARD_W}
        height={CARD_H}
        rx={RADIUS}
        style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1 }}
      />

      <g clipPath='url(#date-picker-clip)'>
        <rect
          x={CARD_X + 14}
          y={CARD_Y + HEADER_H / 2 - 4}
          width={70}
          height={8}
          rx={3}
          style={{ fill: 'var(--body)' }}
        />

        <path
          d={`M${CARD_X + CARD_W - 38} ${CARD_Y + HEADER_H / 2 - 4} L${CARD_X + CARD_W - 44} ${CARD_Y + HEADER_H / 2} L${CARD_X + CARD_W - 38} ${CARD_Y + HEADER_H / 2 + 4}`}
          style={{ fill: 'none', stroke: 'var(--soft)', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }}
        />
        <path
          d={`M${CARD_X + CARD_W - 20} ${CARD_Y + HEADER_H / 2 - 4} L${CARD_X + CARD_W - 14} ${CARD_Y + HEADER_H / 2} L${CARD_X + CARD_W - 20} ${CARD_Y + HEADER_H / 2 + 4}`}
          style={{ fill: 'none', stroke: 'var(--soft)', strokeWidth: 1.5, strokeLinecap: 'round', strokeLinejoin: 'round' }}
        />

        <path
          d={`M${CARD_X + 10} ${DIVIDER_Y} L${CARD_X + CARD_W - 10} ${DIVIDER_Y}`}
          style={{ stroke: 'var(--outline)', strokeWidth: 1 }}
        />

        {Array.from({ length: 7 }).map((_, col) => (
          <rect
            key={`wd-${col}`}
            x={GRID_X + col * CELL_W + (CELL_W - 14) / 2}
            y={GRID_Y}
            width={14}
            height={WEEKDAY_H}
            rx={2.5}
            style={{ fill: 'var(--soft)', opacity: 0.7 }}
          />
        ))}

        {Array.from({ length: ROWS }).map((_, row) =>
          Array.from({ length: 7 }).map((_, col) => {
            const isHighlight = row === HIGHLIGHT_ROW && col === HIGHLIGHT_COL
            const isFaded = row > HIGHLIGHT_ROW || (row === HIGHLIGHT_ROW && col > HIGHLIGHT_COL)
            const cx = GRID_X + col * CELL_W + CELL_W / 2
            const cy = GRID_Y + WEEKDAY_H + 10 + row * ROW_H + 9

            if (isHighlight) {
              return (
                <g key={`cell-${row}-${col}`}>
                  <circle
                    cx={cx}
                    cy={cy}
                    r={9}
                    style={{ fill: ACTIVE }}
                  />
                  <rect
                    x={cx - 5}
                    y={cy - 1.5}
                    width={10}
                    height={3}
                    rx={1.5}
                    style={{ fill: '#ffffff' }}
                  />
                </g>
              )
            }

            return (
              <rect
                key={`cell-${row}-${col}`}
                x={cx - 5}
                y={cy - 1.5}
                width={10}
                height={3}
                rx={1.5}
                style={{
                  fill: isFaded ? 'var(--soft)' : 'var(--body)',
                  opacity: isFaded ? 0.35 : 0.7
                }}
              />
            )
          })
        )}
      </g>
    </svg>
  )
}
