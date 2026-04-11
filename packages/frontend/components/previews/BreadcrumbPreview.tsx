const VIEW_W = 320
const VIEW_H = 180

const ROW_Y = 90
const GAP = 10
const SEP_W = 8

const HOME_SIZE = 14
const SOFT_H = 10
const CURRENT_H = 14

const SEGMENTS = [
  { w: 50, current: false },
  { w: 70, current: false },
  { w: 85, current: false },
  { w: 60, current: true }
]

export default function BreadcrumbPreview() {
  const totalW = HOME_SIZE + GAP + SEGMENTS.reduce((acc, s) => acc + s.w, 0) + (SEGMENTS.length - 1) * (GAP + SEP_W + GAP)

  const startX = (VIEW_W - totalW) / 2

  let cursorX = startX

  const homeX = cursorX
  cursorX += HOME_SIZE + GAP

  const items = SEGMENTS.map((seg, i) => {
    const x = cursorX
    cursorX += seg.w
    const sepX = cursorX + GAP
    if (i < SEGMENTS.length - 1) {
      cursorX += GAP + SEP_W + GAP
    }
    return { x, w: seg.w, current: seg.current, sepX, showSep: i < SEGMENTS.length - 1 }
  })

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      <rect
        x={homeX}
        y={ROW_Y - HOME_SIZE / 2}
        width={HOME_SIZE}
        height={HOME_SIZE}
        rx={3}
        style={{ fill: 'var(--surface)', stroke: 'var(--soft)', strokeWidth: 1.5 }}
      />
      <path
        d={`M${homeX + 3} ${ROW_Y + 1} L${homeX + HOME_SIZE / 2} ${ROW_Y - 4} L${homeX + HOME_SIZE - 3} ${ROW_Y + 1} L${homeX + HOME_SIZE - 3} ${ROW_Y + 5} L${homeX + 3} ${ROW_Y + 5} Z`}
        style={{ fill: 'var(--soft)' }}
      />

      <g
        fontFamily='system-ui, -apple-system, sans-serif'
        fontSize={16}
        fontWeight={500}>
        {items.map((item, i) => {
          const h = item.current ? CURRENT_H : SOFT_H
          return (
            <g key={i}>
              <rect
                x={item.x}
                y={ROW_Y - h / 2}
                width={item.w}
                height={h}
                rx={3}
                style={{
                  fill: item.current ? 'var(--body)' : 'var(--soft)',
                  opacity: item.current ? 1 : 0.55
                }}
              />
              {item.showSep ? (
                <text
                  x={item.sepX + SEP_W / 2}
                  y={ROW_Y + 5}
                  textAnchor='middle'
                  style={{ fill: 'var(--faint)' }}>
                  ›
                </text>
              ) : null}
            </g>
          )
        })}
      </g>
    </svg>
  )
}
