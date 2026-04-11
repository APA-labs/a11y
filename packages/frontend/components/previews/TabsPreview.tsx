const VIEW_W = 320
const VIEW_H = 180

const TABS = ['Overview', 'Details', 'Activity']
const TAB_SPACING = 84
const TAB_Y = 48
const ACTIVE_INDEX = 1
const ACCENT = '#8b5cf6'

const DIVIDER_Y = 64
const PANEL_START_Y = 88
const BAR_GAP = 12
const BAR_HEIGHT = 6
const BAR_LEFT_X = 36

const BARS = [
  { w: 248, tone: 'var(--body)' },
  { w: 208, tone: 'var(--soft)' },
  { w: 168, tone: 'var(--soft)' }
]

export default function TabsPreview() {
  const totalTabsW = (TABS.length - 1) * TAB_SPACING
  const tabsStartX = (VIEW_W - totalTabsW) / 2

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
              fontSize={13}
              fontWeight={600}
              fontFamily='system-ui, -apple-system, sans-serif'
              style={{ fill: isActive ? 'var(--body)' : 'var(--soft)' }}>
              {label}
            </text>
            {isActive ? (
              <rect
                x={cx - 26}
                y={TAB_Y + 10}
                width={52}
                height={3}
                rx={1.5}
                style={{ fill: ACCENT }}
              />
            ) : null}
          </g>
        )
      })}

      <rect
        x={16}
        y={DIVIDER_Y}
        width={VIEW_W - 32}
        height={1}
        style={{ fill: 'var(--divider)' }}
      />

      {BARS.map((bar, i) => (
        <rect
          key={i}
          x={BAR_LEFT_X}
          y={PANEL_START_Y + i * (BAR_HEIGHT + BAR_GAP)}
          width={bar.w}
          height={BAR_HEIGHT}
          rx={3}
          style={{ fill: bar.tone }}
        />
      ))}
    </svg>
  )
}
