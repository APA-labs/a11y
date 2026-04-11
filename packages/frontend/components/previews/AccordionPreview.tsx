const VIEW_W = 320
const VIEW_H = 180

const CONTAINER_X = 30
const CONTAINER_Y = 14
const CONTAINER_W = VIEW_W - CONTAINER_X * 2
const CONTAINER_H = VIEW_H - CONTAINER_Y * 2
const RADIUS = 10

type Section = { label: string; expanded?: boolean }

const SECTIONS: Section[] = [{ label: 'Getting started' }, { label: 'How it works', expanded: true }, { label: 'Pricing & plans' }]

const COLLAPSED_H = 34
const EXPANDED_EXTRA = 56
const totalExpanded = SECTIONS.length * COLLAPSED_H + EXPANDED_EXTRA

export default function AccordionPreview() {
  const scale = Math.min(1, CONTAINER_H / totalExpanded)
  const rowH = COLLAPSED_H * scale
  const expandedExtra = EXPANDED_EXTRA * scale

  let cursorY = CONTAINER_Y

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
        {SECTIONS.map((section, i) => {
          const y = cursorY
          const isExpanded = section.expanded === true
          const thisRowH = rowH
          cursorY += thisRowH + (isExpanded ? expandedExtra : 0)
          return (
            <g key={section.label}>
              {isExpanded ? (
                <rect
                  x={CONTAINER_X}
                  y={y}
                  width={CONTAINER_W}
                  height={thisRowH}
                  style={{ fill: 'var(--divider)' }}
                />
              ) : null}
              {i > 0 ? (
                <line
                  x1={CONTAINER_X + 12}
                  x2={CONTAINER_X + CONTAINER_W - 12}
                  y1={y}
                  y2={y}
                  style={{ stroke: 'var(--divider)', strokeWidth: 1 }}
                />
              ) : null}
              <text
                x={CONTAINER_X + 16}
                y={y + thisRowH / 2 + 4}
                fontSize={12.5}
                fontWeight={isExpanded ? 600 : 500}
                fontFamily='system-ui, -apple-system, sans-serif'
                style={{ fill: isExpanded ? 'var(--body)' : 'var(--soft)' }}>
                {section.label}
              </text>
              {isExpanded ? (
                <path
                  d={`M${CONTAINER_X + CONTAINER_W - 24} ${y + thisRowH / 2 - 2} l4 4 l4 -4`}
                  style={{
                    stroke: 'var(--body)',
                    strokeWidth: 1.5,
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    fill: 'none'
                  }}
                />
              ) : (
                <path
                  d={`M${CONTAINER_X + CONTAINER_W - 22} ${y + thisRowH / 2 - 4} l4 4 l-4 4`}
                  style={{
                    stroke: 'var(--faint)',
                    strokeWidth: 1.5,
                    strokeLinecap: 'round',
                    strokeLinejoin: 'round',
                    fill: 'none'
                  }}
                />
              )}
              {isExpanded ? (
                <g>
                  <text
                    x={CONTAINER_X + 16}
                    y={y + thisRowH + 18}
                    fontSize={11}
                    fontWeight={500}
                    fontFamily='system-ui, -apple-system, sans-serif'
                    style={{ fill: 'var(--soft)' }}>
                    Pick a plan, add your team,
                  </text>
                  <text
                    x={CONTAINER_X + 16}
                    y={y + thisRowH + 34}
                    fontSize={11}
                    fontWeight={500}
                    fontFamily='system-ui, -apple-system, sans-serif'
                    style={{ fill: 'var(--soft)' }}>
                    and ship your first release.
                  </text>
                </g>
              ) : null}
            </g>
          )
        })}
      </g>
    </svg>
  )
}
