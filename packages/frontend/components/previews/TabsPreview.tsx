const VIEW_W = 320
const VIEW_H = 180

const TABS = ['OVERVIEW', 'DETAILS', 'ACTIVITY']
const TAB_SPACING = 50
const TAB_Y = 40
const ACTIVE_INDEX = 1
const ACCENT = '#8b5cf6'

const LEFT_X = 50
const DIVIDER_Y = 54
const PANEL_START_Y = 76
const BAR_GAP = 10
const BAR_HEIGHT = 5

const BARS = [
  { w: 220, tone: 'var(--body)' },
  { w: 180, tone: 'var(--soft)' },
  { w: 150, tone: 'var(--soft)' }
]

export default function TabsPreview() {
  const totalTabsW = (TABS.length - 1) * TAB_SPACING
  const tabsStartX = LEFT_X + (220 - totalTabsW) / 2

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      {TABS.map((label, i) => {
        const cx = tabsStartX + i * TAB_SPACING
        const isActive = i === ACTIVE_INDEX
        return (
          <g key={label}>
            <text
              x={cx}
              y={TAB_Y}
              textAnchor='middle'
              fontSize={12}
              fontWeight={600}
              fontFamily='system-ui, -apple-system, sans-serif'
              style={{ fill: isActive ? 'var(--body)' : 'var(--soft)' }}>
              {label}
            </text>
            {isActive ? (
              <rect
                x={cx - 24}
                y={TAB_Y + 8}
                width={48}
                height={3}
                rx={1.5}
                style={{ fill: ACCENT }}
              />
            ) : null}
          </g>
        )
      })}

      <rect
        x={0}
        y={DIVIDER_Y}
        width={VIEW_W}
        height={1}
        style={{ fill: 'var(--divider)' }}
      />

      {BARS.map((bar, i) => (
        <rect
          key={i}
          x={LEFT_X}
          y={PANEL_START_Y + i * (BAR_HEIGHT + BAR_GAP)}
          width={bar.w}
          height={BAR_HEIGHT}
          rx={2.5}
          style={{ fill: bar.tone }}
        />
      ))}
    </svg>
  )
}
