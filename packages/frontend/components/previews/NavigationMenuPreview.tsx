const VIEW_W = 320
const VIEW_H = 180

const ITEM_W = 50
const ITEM_H = 26
const ITEM_GAP = 8
const ITEM_RX = 6
const ITEM_COUNT = 4
const ACTIVE_INDEX = 1

const PANEL_W = 140
const PANEL_H = 80
const PANEL_RX = 8
const PANEL_GAP = 8

export default function NavigationMenuPreview() {
  const navTotalW = ITEM_COUNT * ITEM_W + (ITEM_COUNT - 1) * ITEM_GAP
  const navStartX = (VIEW_W - navTotalW) / 2
  const navY = 28

  const activeX = navStartX + ACTIVE_INDEX * (ITEM_W + ITEM_GAP)
  const panelX = activeX + ITEM_W / 2 - PANEL_W / 2
  const panelY = navY + ITEM_H + PANEL_GAP

  const rowCount = 3
  const rowGap = 14
  const rowH = 5
  const rowStartY = panelY + 18

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      <defs>
        <filter
          id='nav-menu-shadow'
          x='-20%'
          y='-20%'
          width='140%'
          height='160%'>
          <feGaussianBlur
            in='SourceAlpha'
            stdDeviation='2.5'
          />
          <feOffset
            dy='2'
            result='offsetblur'
          />
          <feComponentTransfer>
            <feFuncA
              type='linear'
              slope='0.18'
            />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
      </defs>

      {Array.from({ length: ITEM_COUNT }).map((_, i) => {
        const x = navStartX + i * (ITEM_W + ITEM_GAP)
        const isActive = i === ACTIVE_INDEX
        return (
          <g key={`item-${i}`}>
            <rect
              x={x}
              y={navY}
              width={ITEM_W}
              height={ITEM_H}
              rx={ITEM_RX}
              style={{
                fill: isActive ? 'var(--divider)' : 'var(--surface)',
                stroke: 'var(--outline)',
                strokeWidth: isActive ? 1 : 0.75,
                opacity: isActive ? 1 : 0.9
              }}
            />
            <rect
              x={x + 10}
              y={navY + ITEM_H / 2 - 2.5}
              width={isActive ? 20 : 26}
              height={5}
              rx={2.5}
              style={{
                fill: 'var(--body)',
                opacity: isActive ? 0.9 : 0.6
              }}
            />
            {isActive ? (
              <path
                d={`M${x + ITEM_W - 12} ${navY + ITEM_H / 2 - 2} l3 3 l3 -3`}
                style={{
                  stroke: 'var(--body)',
                  strokeWidth: 1.5,
                  strokeLinecap: 'round',
                  strokeLinejoin: 'round',
                  fill: 'none'
                }}
              />
            ) : null}
          </g>
        )
      })}

      <g filter='url(#nav-menu-shadow)'>
        <rect
          x={panelX}
          y={panelY}
          width={PANEL_W}
          height={PANEL_H}
          rx={PANEL_RX}
          style={{
            fill: 'var(--surface)',
            stroke: 'var(--outline)',
            strokeWidth: 1
          }}
        />
      </g>

      {Array.from({ length: rowCount }).map((_, i) => {
        const y = rowStartY + i * rowGap
        const w = i === 0 ? 100 : i === 1 ? 86 : 72
        return (
          <rect
            key={`row-${i}`}
            x={panelX + 16}
            y={y}
            width={w}
            height={rowH}
            rx={2.5}
            style={{
              fill: 'var(--body)',
              opacity: 0.7 - i * 0.12
            }}
          />
        )
      })}
    </svg>
  )
}
