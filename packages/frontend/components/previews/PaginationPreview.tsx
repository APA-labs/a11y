const VIEW_W = 320
const VIEW_H = 180
const BTNS = ['‹', '1', '2', '3', '…', '10', '›']
const SIZE = 34
const GAP = 8
const ACTIVE = '#8b5cf6'

export default function PaginationPreview() {
  const totalW = BTNS.length * SIZE + (BTNS.length - 1) * GAP
  const startX = (VIEW_W - totalW) / 2
  const y = (VIEW_H - SIZE) / 2

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      {BTNS.map((label, i) => {
        const x = startX + i * (SIZE + GAP)
        const isActive = label === '2'
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={SIZE}
              height={SIZE}
              rx={10}
              style={{
                fill: isActive ? ACTIVE : 'var(--surface)',
                stroke: isActive ? ACTIVE : 'var(--outline)',
                strokeWidth: 1.5
              }}
            />
            <text
              x={x + SIZE / 2}
              y={y + SIZE / 2 + 5}
              textAnchor='middle'
              fontSize={14}
              fontWeight={600}
              fontFamily='system-ui, -apple-system, sans-serif'
              style={{ fill: isActive ? '#ffffff' : 'var(--body)' }}>
              {label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
