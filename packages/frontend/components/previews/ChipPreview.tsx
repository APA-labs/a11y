const VIEW_W = 320
const VIEW_H = 180

const VIOLET = '#8b5cf6'
const EMERALD = '#10b981'

const CHIP_H = 28
const RADIUS = 14
const GAP = 10

type Chip = {
  w: number
  barW: number
  fill: string
  stroke?: string
  barFill: string
  barOpacity?: number
  hasClose: boolean
  closeFill?: string
  closeStroke?: string
  closeX?: string
}

const ROW1: Chip[] = [
  {
    w: 76,
    barW: 42,
    fill: 'var(--surface)',
    stroke: 'var(--outline)',
    barFill: 'var(--body)',
    barOpacity: 0.75,
    hasClose: true,
    closeFill: 'var(--surface)',
    closeStroke: 'var(--outline)',
    closeX: 'var(--soft)'
  },
  {
    w: 70,
    barW: 36,
    fill: VIOLET,
    barFill: '#ffffff',
    barOpacity: 0.95,
    hasClose: true,
    closeFill: 'rgba(255,255,255,0.18)',
    closeStroke: 'rgba(255,255,255,0.55)',
    closeX: '#ffffff'
  },
  {
    w: 68,
    barW: 34,
    fill: 'var(--divider)',
    barFill: 'var(--body)',
    barOpacity: 0.8,
    hasClose: true,
    closeFill: 'var(--surface)',
    closeStroke: 'var(--outline)',
    closeX: 'var(--soft)'
  }
]

const ROW2: Chip[] = [
  {
    w: 108,
    barW: 72,
    fill: 'var(--surface)',
    stroke: 'var(--outline)',
    barFill: 'var(--body)',
    barOpacity: 0.75,
    hasClose: true,
    closeFill: 'var(--surface)',
    closeStroke: 'var(--outline)',
    closeX: 'var(--soft)'
  },
  {
    w: 72,
    barW: 46,
    fill: EMERALD,
    barFill: '#ffffff',
    barOpacity: 0.95,
    hasClose: false
  }
]

function renderChip(chip: Chip, x: number, y: number, key: string) {
  const closeCx = x + chip.w - 14
  const closeCy = y + CHIP_H / 2
  return (
    <g key={key}>
      <rect
        x={x}
        y={y}
        width={chip.w}
        height={CHIP_H}
        rx={RADIUS}
        style={{
          fill: chip.fill,
          stroke: chip.stroke,
          strokeWidth: chip.stroke ? 1 : 0
        }}
      />
      <rect
        x={x + 12}
        y={y + CHIP_H / 2 - 3}
        width={chip.barW}
        height={6}
        rx={3}
        style={{ fill: chip.barFill, opacity: chip.barOpacity ?? 1 }}
      />
      {chip.hasClose ? (
        <g>
          <circle
            cx={closeCx}
            cy={closeCy}
            r={7}
            style={{
              fill: chip.closeFill,
              stroke: chip.closeStroke,
              strokeWidth: 1
            }}
          />
          <path
            d={`M${closeCx - 2.5} ${closeCy - 2.5} L${closeCx + 2.5} ${closeCy + 2.5} M${closeCx + 2.5} ${closeCy - 2.5} L${closeCx - 2.5} ${closeCy + 2.5}`}
            style={{
              stroke: chip.closeX,
              strokeWidth: 1.4,
              strokeLinecap: 'round'
            }}
          />
        </g>
      ) : null}
    </g>
  )
}

export default function ChipPreview() {
  const row1Total = ROW1.reduce((sum, c) => sum + c.w, 0) + GAP * (ROW1.length - 1)
  const row2Total = ROW2.reduce((sum, c) => sum + c.w, 0) + GAP * (ROW2.length - 1)

  const row1StartX = (VIEW_W - row1Total) / 2
  const row2StartX = (VIEW_W - row2Total) / 2

  const row1Y = 52
  const row2Y = 100

  let cursor1 = row1StartX
  let cursor2 = row2StartX

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      {ROW1.map((chip, i) => {
        const x = cursor1
        cursor1 += chip.w + GAP
        return renderChip(chip, x, row1Y, `r1-${i}`)
      })}
      {ROW2.map((chip, i) => {
        const x = cursor2
        cursor2 += chip.w + GAP
        return renderChip(chip, x, row2Y, `r2-${i}`)
      })}
    </svg>
  )
}
