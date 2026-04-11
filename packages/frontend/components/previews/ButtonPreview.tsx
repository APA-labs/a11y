const VIEW_W = 320
const VIEW_H = 180

const BTN_W = 76
const BTN_H = 40
const RADIUS = 10
const GAP = 14
const PRIMARY = '#8b5cf6'

const LABEL = 'Button'

export default function ButtonPreview() {
  const totalW = BTN_W * 3 + GAP * 2
  const startX = (VIEW_W - totalW) / 2
  const y = (VIEW_H - BTN_H) / 2

  const primaryX = startX
  const outlineX = startX + BTN_W + GAP
  const ghostX = startX + (BTN_W + GAP) * 2

  const textY = y + BTN_H / 2 + 4.5

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      <rect
        x={primaryX}
        y={y}
        width={BTN_W}
        height={BTN_H}
        rx={RADIUS}
        style={{ fill: PRIMARY, stroke: PRIMARY, strokeWidth: 1.5 }}
      />
      <text
        x={primaryX + BTN_W / 2}
        y={textY}
        textAnchor='middle'
        fontSize={13}
        fontWeight={600}
        fontFamily='system-ui, -apple-system, sans-serif'
        style={{ fill: '#ffffff' }}>
        {LABEL}
      </text>

      <rect
        x={outlineX}
        y={y}
        width={BTN_W}
        height={BTN_H}
        rx={RADIUS}
        style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1.5 }}
      />
      <text
        x={outlineX + BTN_W / 2}
        y={textY}
        textAnchor='middle'
        fontSize={13}
        fontWeight={600}
        fontFamily='system-ui, -apple-system, sans-serif'
        style={{ fill: 'var(--body)' }}>
        {LABEL}
      </text>

      <rect
        x={ghostX}
        y={y}
        width={BTN_W}
        height={BTN_H}
        rx={RADIUS}
        style={{ fill: 'var(--canvas)' }}
      />
      <text
        x={ghostX + BTN_W / 2}
        y={textY}
        textAnchor='middle'
        fontSize={13}
        fontWeight={600}
        fontFamily='system-ui, -apple-system, sans-serif'
        style={{ fill: 'var(--body)' }}>
        {LABEL}
      </text>
    </svg>
  )
}
