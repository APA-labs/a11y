const VIEW_W = 320
const VIEW_H = 180

const ACCENT = '#8b5cf6'

type MenuItem = { label: string; w: number; active?: boolean }

const ITEMS: MenuItem[] = [
  { label: 'Home', w: 58 },
  { label: 'Products', w: 96, active: true },
  { label: 'Docs', w: 58 },
  { label: 'Blog', w: 54 }
]

const SUB_ITEMS = ['Overview', 'Features', 'Pricing']

const ITEM_H = 28
const ITEM_GAP = 6
const NAV_Y = 28

const PANEL_W = 116
const PANEL_ITEM_H = 22
const PANEL_PAD_Y = 8

export default function NavigationMenuPreview() {
  const totalW = ITEMS.reduce((s, it) => s + it.w, 0) + (ITEMS.length - 1) * ITEM_GAP
  const startX = (VIEW_W - totalW) / 2

  let cursor = startX
  const itemPositions = ITEMS.map((it) => {
    const x = cursor
    cursor += it.w + ITEM_GAP
    return { ...it, x }
  })

  const activeItem = itemPositions.find((it) => it.active) ?? itemPositions[0]!
  const panelX = activeItem.x + activeItem.w / 2 - PANEL_W / 2
  const panelY = NAV_Y + ITEM_H + 8
  const panelH = SUB_ITEMS.length * PANEL_ITEM_H + PANEL_PAD_Y * 2

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      <defs>
        <filter
          id='nav-shadow'
          x='-20%'
          y='-20%'
          width='140%'
          height='140%'>
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

      {itemPositions.map((it) => {
        const x = it.x
        return (
          <g key={it.label}>
            {it.active ? (
              <rect
                x={x}
                y={NAV_Y}
                width={it.w}
                height={ITEM_H}
                rx={6}
                style={{ fill: 'var(--divider)' }}
              />
            ) : null}
            <text
              x={x + it.w / 2 - (it.active ? 10 : 0)}
              y={NAV_Y + ITEM_H / 2 + 4}
              textAnchor='middle'
              fontSize={13}
              fontWeight={it.active ? 600 : 500}
              fontFamily='system-ui, -apple-system, sans-serif'
              style={{ fill: it.active ? 'var(--body)' : 'var(--soft)' }}>
              {it.label}
            </text>
            {it.active ? (
              <path
                d={`M${x + it.w - 18} ${NAV_Y + ITEM_H / 2 - 2} l4 4 l4 -4`}
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

      <g filter='url(#nav-shadow)'>
        <rect
          x={panelX}
          y={panelY}
          width={PANEL_W}
          height={panelH}
          rx={8}
          style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1 }}
        />
        {SUB_ITEMS.map((label, i) => {
          const isFirst = i === 0
          return (
            <g key={label}>
              {isFirst ? (
                <rect
                  x={panelX + 4}
                  y={panelY + PANEL_PAD_Y + i * PANEL_ITEM_H}
                  width={PANEL_W - 8}
                  height={PANEL_ITEM_H}
                  rx={4}
                  style={{ fill: ACCENT, opacity: 0.1 }}
                />
              ) : null}
              <text
                x={panelX + 14}
                y={panelY + PANEL_PAD_Y + i * PANEL_ITEM_H + PANEL_ITEM_H / 2 + 4}
                fontSize={12}
                fontWeight={isFirst ? 600 : 500}
                fontFamily='system-ui, -apple-system, sans-serif'
                style={{ fill: isFirst ? ACCENT : 'var(--body)' }}>
                {label}
              </text>
            </g>
          )
        })}
      </g>
    </svg>
  )
}
