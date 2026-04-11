const VIEW_W = 320
const VIEW_H = 180

const ANCHOR_CX = 160
const ANCHOR_CY = 120
const ANCHOR_R = 16

const BUBBLE_CX = 160
const BUBBLE_CY = 60
const BUBBLE_W = 120
const BUBBLE_H = 42
const BUBBLE_X = BUBBLE_CX - BUBBLE_W / 2
const BUBBLE_Y = BUBBLE_CY - BUBBLE_H / 2

const TAIL_TOP_Y = BUBBLE_Y + BUBBLE_H
const TAIL_HALF = 5
const TAIL_H = 7

export default function TooltipPreview() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      <circle
        cx={ANCHOR_CX}
        cy={ANCHOR_CY}
        r={ANCHOR_R}
        style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1.5 }}
      />
      <circle
        cx={ANCHOR_CX}
        cy={ANCHOR_CY - 6}
        r={1.8}
        style={{ fill: 'var(--body)' }}
      />
      <rect
        x={ANCHOR_CX - 1.8}
        y={ANCHOR_CY - 2}
        width={3.6}
        height={10}
        rx={1.8}
        style={{ fill: 'var(--body)' }}
      />

      <rect
        x={BUBBLE_X}
        y={BUBBLE_Y}
        width={BUBBLE_W}
        height={BUBBLE_H}
        rx={8}
        style={{ fill: 'var(--body)' }}
      />

      <path
        d={`M${BUBBLE_CX - TAIL_HALF} ${TAIL_TOP_Y} L${BUBBLE_CX + TAIL_HALF} ${TAIL_TOP_Y} L${BUBBLE_CX} ${TAIL_TOP_Y + TAIL_H} Z`}
        style={{ fill: 'var(--body)' }}
      />

      <rect
        x={BUBBLE_CX - 40}
        y={BUBBLE_CY - 6}
        width={80}
        height={4}
        rx={2}
        style={{ fill: 'var(--surface)' }}
      />
      <rect
        x={BUBBLE_CX - 30}
        y={BUBBLE_CY + 4}
        width={60}
        height={4}
        rx={2}
        style={{ fill: 'var(--surface)', opacity: 0.7 }}
      />
    </svg>
  )
}
