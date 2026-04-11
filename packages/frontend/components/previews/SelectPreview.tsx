const VIEW_W = 320
const VIEW_H = 180
const ACCENT = '#8b5cf6'

const FIELD_W = 220
const TRIGGER_H = 34
const FIELD_X = (VIEW_W - FIELD_W) / 2
const TRIGGER_Y = 22

const OPTION_H = 24
const PANEL_PAD_Y = 6
const OPTIONS = ['English', 'Korean', 'Japanese', 'Chinese']
const ACTIVE_INDEX = 1

const PANEL_Y = TRIGGER_Y + TRIGGER_H + 8
const PANEL_H = OPTIONS.length * OPTION_H + PANEL_PAD_Y * 2
const RADIUS = 8

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
            x={FIELD_X}
            y={PANEL_Y}
            width={FIELD_W}
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

      <rect
        x={FIELD_X}
        y={TRIGGER_Y}
        width={FIELD_W}
        height={TRIGGER_H}
        rx={RADIUS}
        style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1.5 }}
      />
      <text
        x={FIELD_X + 14}
        y={TRIGGER_Y + TRIGGER_H / 2 + 4}
        fontSize={12}
        fontWeight={500}
        fontFamily='system-ui, -apple-system, sans-serif'
        style={{ fill: 'var(--body)' }}>
        Korean
      </text>
      <path
        d={`M${FIELD_X + FIELD_W - 18} ${TRIGGER_Y + TRIGGER_H / 2 - 2} l4 4 l4 -4`}
        style={{
          stroke: 'var(--soft)',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          fill: 'none'
        }}
      />

      <g filter='url(#select-shadow)'>
        <rect
          x={FIELD_X}
          y={PANEL_Y}
          width={FIELD_W}
          height={PANEL_H}
          rx={RADIUS}
          style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1 }}
        />
        <g clipPath='url(#select-clip)'>
          {OPTIONS.map((label, i) => {
            const rowY = PANEL_Y + PANEL_PAD_Y + i * OPTION_H
            const isActive = i === ACTIVE_INDEX
            return (
              <g key={label}>
                {isActive ? (
                  <rect
                    x={FIELD_X + 4}
                    y={rowY}
                    width={FIELD_W - 8}
                    height={OPTION_H}
                    rx={4}
                    style={{ fill: ACCENT }}
                  />
                ) : null}
                <text
                  x={FIELD_X + 14}
                  y={rowY + OPTION_H / 2 + 4}
                  fontSize={12}
                  fontWeight={isActive ? 600 : 500}
                  fontFamily='system-ui, -apple-system, sans-serif'
                  style={{ fill: isActive ? '#ffffff' : 'var(--body)' }}>
                  {label}
                </text>
              </g>
            )
          })}
        </g>
      </g>
    </svg>
  )
}
