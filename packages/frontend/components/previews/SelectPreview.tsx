const VIEW_W = 320
const VIEW_H = 180

const ACCENT = '#8b5cf6'

const TRIGGER_W = 220
const TRIGGER_H = 34
const TRIGGER_X = (VIEW_W - TRIGGER_W) / 2
const TRIGGER_Y = 18
const RADIUS = 8

const PANEL_X = TRIGGER_X
const PANEL_Y = TRIGGER_Y + TRIGGER_H + 6
const PANEL_W = TRIGGER_W
const OPTION_H = 25
const PANEL_H = OPTION_H * 4

export default function SelectPreview() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      <defs>
        <clipPath id='select-clip'>
          <rect
            x={PANEL_X}
            y={PANEL_Y}
            width={PANEL_W}
            height={PANEL_H}
            rx={RADIUS}
          />
        </clipPath>
        <filter
          id='select-shadow'
          x='-10%'
          y='-20%'
          width='120%'
          height='160%'>
          <feGaussianBlur
            in='SourceAlpha'
            stdDeviation='2'
          />
          <feOffset
            dy='1.5'
            result='offsetblur'
          />
          <feComponentTransfer>
            <feFuncA
              type='linear'
              slope='0.15'
            />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
      </defs>

      <g filter='url(#select-shadow)'>
        <rect
          x={TRIGGER_X}
          y={TRIGGER_Y}
          width={TRIGGER_W}
          height={TRIGGER_H}
          rx={RADIUS}
          style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1 }}
        />
        <rect
          x={TRIGGER_X + 14}
          y={TRIGGER_Y + TRIGGER_H / 2 - 3}
          width={90}
          height={6}
          rx={3}
          style={{ fill: 'var(--body)', opacity: 0.75 }}
        />
        <path
          d={`M${TRIGGER_X + TRIGGER_W - 20} ${TRIGGER_Y + TRIGGER_H / 2 - 3} l6 6 l6 -6`}
          style={{ fill: 'none', stroke: 'var(--soft)', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }}
        />
      </g>

      <g filter='url(#select-shadow)'>
        <rect
          x={PANEL_X}
          y={PANEL_Y}
          width={PANEL_W}
          height={PANEL_H}
          rx={RADIUS}
          style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1 }}
        />

        <g clipPath='url(#select-clip)'>
          <rect
            x={PANEL_X}
            y={PANEL_Y + OPTION_H}
            width={PANEL_W}
            height={OPTION_H}
            style={{ fill: ACCENT }}
          />

          {[1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M${PANEL_X + 12} ${PANEL_Y + i * OPTION_H} L${PANEL_X + PANEL_W - 12} ${PANEL_Y + i * OPTION_H}`}
              style={{ stroke: 'var(--divider)', strokeWidth: 1 }}
            />
          ))}

          {[0, 1, 2, 3].map((i) => {
            const isSelected = i === 1
            const widths = [110, 96, 120, 84]
            return (
              <rect
                key={`opt-${i}`}
                x={PANEL_X + 14}
                y={PANEL_Y + i * OPTION_H + OPTION_H / 2 - 3}
                width={widths[i]}
                height={6}
                rx={3}
                style={{
                  fill: isSelected ? '#ffffff' : 'var(--body)',
                  opacity: isSelected ? 1 : 0.75
                }}
              />
            )
          })}
        </g>
      </g>
    </svg>
  )
}
