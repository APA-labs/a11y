const VIEW_W = 320
const VIEW_H = 180
const ACCENT = '#8b5cf6'

type Bar = { w: number; link?: boolean }

const ROW1: Bar[] = [{ w: 22 }, { w: 34 }, { w: 28, link: true }, { w: 40 }, { w: 18 }, { w: 30 }]

const ROW2: Bar[] = [{ w: 26 }, { w: 42 }, { w: 20 }, { w: 36 }, { w: 30 }]

const ROW3: Bar[] = [{ w: 24 }, { w: 30 }, { w: 20 }, { w: 26 }, { w: 22, link: true }, { w: 32, link: true }]

const BAR_H = 6
const BAR_RX = 3
const GAP = 7
const ROW_GAP = 22
const START_X = 28

export default function LinkPreview() {
  const totalHeight = BAR_H * 3 + ROW_GAP * 2
  const firstRowY = (VIEW_H - totalHeight) / 2

  const rows = [ROW1, ROW2, ROW3]

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      {rows.map((bars, rowIdx) => {
        const y = firstRowY + rowIdx * (BAR_H + ROW_GAP)
        const isSoftRow = rowIdx === 1
        let cursorX = START_X

        return (
          <g key={rowIdx}>
            {bars.map((bar, i) => {
              const x = cursorX
              cursorX += bar.w + GAP
              const isLink = !!bar.link && !isSoftRow
              const fill = isLink ? ACCENT : isSoftRow ? 'var(--soft)' : 'var(--body)'

              return (
                <g key={i}>
                  <rect
                    x={x}
                    y={y}
                    width={bar.w}
                    height={BAR_H}
                    rx={BAR_RX}
                    style={{ fill }}
                  />
                  {isLink ? (
                    <rect
                      x={x}
                      y={y + BAR_H + 2}
                      width={bar.w}
                      height={1}
                      style={{ fill: ACCENT }}
                    />
                  ) : null}
                  {rowIdx === 0 && isLink ? (
                    <rect
                      x={x - 3}
                      y={y - 3}
                      width={bar.w + 6}
                      height={BAR_H + 6}
                      rx={4}
                      style={{
                        fill: 'none',
                        stroke: ACCENT,
                        strokeWidth: 1.5,
                        opacity: 0.4
                      }}
                    />
                  ) : null}
                </g>
              )
            })}
            {rowIdx === 2
              ? (() => {
                  const iconX = cursorX - GAP + 4
                  const iconY = y - 2
                  const iconSize = 8
                  return (
                    <g>
                      <rect
                        x={iconX}
                        y={iconY}
                        width={iconSize}
                        height={iconSize}
                        rx={1}
                        style={{
                          fill: 'none',
                          stroke: ACCENT,
                          strokeWidth: 1.2
                        }}
                      />
                      <path
                        d={`M${iconX + 3} ${iconY + 5} L${iconX + 5.5} ${iconY + 2.5}`}
                        style={{
                          stroke: ACCENT,
                          strokeWidth: 1.2,
                          fill: 'none',
                          strokeLinecap: 'round'
                        }}
                      />
                      <path
                        d={`M${iconX + 3.5} ${iconY + 2.5} L${iconX + 5.5} ${iconY + 2.5} L${iconX + 5.5} ${iconY + 4.5}`}
                        style={{
                          stroke: ACCENT,
                          strokeWidth: 1.2,
                          fill: 'none',
                          strokeLinecap: 'round',
                          strokeLinejoin: 'round'
                        }}
                      />
                    </g>
                  )
                })()
              : null}
          </g>
        )
      })}
    </svg>
  )
}
