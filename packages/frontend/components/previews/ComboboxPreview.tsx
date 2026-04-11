const VIEW_W = 320
const VIEW_H = 180
const ACCENT = '#8b5cf6'

const INPUT_W = 220
const INPUT_H = 34
const INPUT_X = (VIEW_W - INPUT_W) / 2
const INPUT_Y = 22

const PANEL_W = INPUT_W
const OPTION_H = 24
const PANEL_PAD_Y = 6
const OPTIONS = ['San Francisco', 'San Diego', 'Santa Monica', 'Santa Fe']
const ACTIVE_INDEX = 0

const PANEL_Y = INPUT_Y + INPUT_H + 8
const PANEL_H = OPTIONS.length * OPTION_H + PANEL_PAD_Y * 2
const RADIUS = 8

export default function ComboboxPreview() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      <defs>
        <clipPath id='combobox-clip'>
          <rect
            x={INPUT_X}
            y={PANEL_Y}
            width={PANEL_W}
            height={PANEL_H}
            rx={RADIUS}
          />
        </clipPath>
        <filter
          id='combobox-shadow'
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
        x={INPUT_X}
        y={INPUT_Y}
        width={INPUT_W}
        height={INPUT_H}
        rx={RADIUS}
        style={{ fill: 'var(--surface)', stroke: ACCENT, strokeWidth: 2 }}
      />
      <circle
        cx={INPUT_X + 18}
        cy={INPUT_Y + INPUT_H / 2}
        r={5}
        style={{ fill: 'none', stroke: 'var(--soft)', strokeWidth: 1.5 }}
      />
      <path
        d={`M${INPUT_X + 22} ${INPUT_Y + INPUT_H / 2 + 4} l3 3`}
        style={{ stroke: 'var(--soft)', strokeWidth: 1.5, strokeLinecap: 'round' }}
      />
      <text
        x={INPUT_X + 32}
        y={INPUT_Y + INPUT_H / 2 + 4}
        fontSize={12}
        fontWeight={500}
        fontFamily='system-ui, -apple-system, sans-serif'
        style={{ fill: 'var(--body)' }}>
        San
      </text>
      <rect
        x={INPUT_X + 32 + 24}
        y={INPUT_Y + INPUT_H / 2 - 8}
        width={1.5}
        height={16}
        style={{ fill: ACCENT }}
      />

      <g filter='url(#combobox-shadow)'>
        <rect
          x={INPUT_X}
          y={PANEL_Y}
          width={PANEL_W}
          height={PANEL_H}
          rx={RADIUS}
          style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1 }}
        />
        <g clipPath='url(#combobox-clip)'>
          {OPTIONS.map((label, i) => {
            const rowY = PANEL_Y + PANEL_PAD_Y + i * OPTION_H
            const isActive = i === ACTIVE_INDEX
            return (
              <g key={label}>
                {isActive ? (
                  <rect
                    x={INPUT_X + 4}
                    y={rowY}
                    width={PANEL_W - 8}
                    height={OPTION_H}
                    rx={4}
                    style={{ fill: ACCENT, opacity: 0.14 }}
                  />
                ) : null}
                <text
                  x={INPUT_X + 14}
                  y={rowY + OPTION_H / 2 + 4}
                  fontSize={12}
                  fontWeight={isActive ? 600 : 500}
                  fontFamily='system-ui, -apple-system, sans-serif'
                  style={{ fill: isActive ? ACCENT : 'var(--body)' }}>
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
