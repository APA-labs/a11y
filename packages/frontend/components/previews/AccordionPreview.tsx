const VIEW_W = 320
const VIEW_H = 180

const CONTAINER_X = 30
const CONTAINER_Y = 18
const CONTAINER_W = 260
const CONTAINER_H = 144
const RADIUS = 10

const HEADER_H = 32
const EXPANDED_H = 80

const LABEL_X = 20
const LABEL_W = 96
const LABEL_H = 6

const CHEVRON_CX = CONTAINER_W - 22

type Section = { y: number; h: number; expanded: boolean }

const SECTIONS: Section[] = [
  { y: CONTAINER_Y, h: HEADER_H, expanded: false },
  { y: CONTAINER_Y + HEADER_H, h: EXPANDED_H, expanded: true },
  { y: CONTAINER_Y + HEADER_H + EXPANDED_H, h: HEADER_H, expanded: false }
]

const BODY_BARS = [
  { x: 20, w: 200 },
  { x: 20, w: 168 },
  { x: 20, w: 140 }
]

export default function AccordionPreview() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      <defs>
        <clipPath id='accordion-clip'>
          <rect
            x={CONTAINER_X}
            y={CONTAINER_Y}
            width={CONTAINER_W}
            height={CONTAINER_H}
            rx={RADIUS}
          />
        </clipPath>
      </defs>

      <rect
        x={CONTAINER_X}
        y={CONTAINER_Y}
        width={CONTAINER_W}
        height={CONTAINER_H}
        rx={RADIUS}
        style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1 }}
      />

      <g clipPath='url(#accordion-clip)'>
        {SECTIONS[1] ? (
          <rect
            x={CONTAINER_X}
            y={SECTIONS[1].y}
            width={CONTAINER_W}
            height={HEADER_H}
            style={{ fill: 'var(--divider)' }}
          />
        ) : null}

        <path
          d={`M${CONTAINER_X} ${SECTIONS[1]!.y} L${CONTAINER_X + CONTAINER_W} ${SECTIONS[1]!.y}`}
          style={{ stroke: 'var(--outline)', strokeWidth: 1 }}
        />
        <path
          d={`M${CONTAINER_X} ${SECTIONS[1]!.y + HEADER_H} L${CONTAINER_X + CONTAINER_W} ${SECTIONS[1]!.y + HEADER_H}`}
          style={{ stroke: 'var(--outline)', strokeWidth: 1 }}
        />
        <path
          d={`M${CONTAINER_X} ${SECTIONS[2]!.y} L${CONTAINER_X + CONTAINER_W} ${SECTIONS[2]!.y}`}
          style={{ stroke: 'var(--outline)', strokeWidth: 1 }}
        />

        {SECTIONS.map((section, i) => {
          const headerMidY = section.y + HEADER_H / 2
          const chevronCx = CONTAINER_X + CHEVRON_CX
          return (
            <g key={`header-${i}`}>
              <rect
                x={CONTAINER_X + LABEL_X}
                y={headerMidY - LABEL_H / 2}
                width={LABEL_W - (i === 1 ? 0 : 12 * i)}
                height={LABEL_H}
                rx={3}
                style={{
                  fill: section.expanded ? 'var(--body)' : 'var(--body)',
                  opacity: section.expanded ? 0.9 : 0.7
                }}
              />
              {section.expanded ? (
                <path
                  d={`M${chevronCx - 5} ${headerMidY - 2} L${chevronCx} ${headerMidY + 3} L${chevronCx + 5} ${headerMidY - 2}`}
                  style={{ fill: 'none', stroke: 'var(--body)', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' }}
                />
              ) : (
                <path
                  d={`M${chevronCx - 2} ${headerMidY - 5} L${chevronCx + 3} ${headerMidY} L${chevronCx - 2} ${headerMidY + 5}`}
                  style={{ fill: 'none', stroke: 'var(--soft)', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' }}
                />
              )}
            </g>
          )
        })}

        {BODY_BARS.map((bar, i) => {
          const by = SECTIONS[1]!.y + HEADER_H + 16 + i * 14
          return (
            <rect
              key={`body-${i}`}
              x={CONTAINER_X + bar.x}
              y={by}
              width={bar.w}
              height={5}
              rx={2.5}
              style={{
                fill: i === 0 ? 'var(--body)' : 'var(--soft)',
                opacity: i === 0 ? 0.7 : 0.5
              }}
            />
          )
        })}
      </g>
    </svg>
  )
}
