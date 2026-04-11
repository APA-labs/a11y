const VIEW_W = 320
const VIEW_H = 180

const INPUT_W = 220
const INPUT_H = 34
const INPUT_X = (VIEW_W - INPUT_W) / 2
const INPUT_Y = 22

const PANEL_X = INPUT_X
const PANEL_Y = INPUT_Y + INPUT_H + 6
const PANEL_W = INPUT_W
const PANEL_H = 100
const PANEL_RADIUS = 8

const ROW_H = PANEL_H / 4
const ACTIVE_INDEX = 1
const ACCENT = '#8b5cf6'

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
            x={PANEL_X}
            y={PANEL_Y}
            width={PANEL_W}
            height={PANEL_H}
            rx={PANEL_RADIUS}
          />
        </clipPath>
        <filter
          id='combobox-shadow'
          x='-10%'
          y='-20%'
          width='120%'
          height='150%'>
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
              slope='0.14'
            />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
      </defs>

      <g>
        <rect
          x={INPUT_X}
          y={INPUT_Y}
          width={INPUT_W}
          height={INPUT_H}
          rx={8}
          style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1 }}
        />
        <rect
          x={INPUT_X + 14}
          y={INPUT_Y + INPUT_H / 2 - 3}
          width={90}
          height={6}
          rx={3}
          style={{ fill: 'var(--body)', opacity: 0.78 }}
        />
        <path
          d={`M${INPUT_X + INPUT_W - 22} ${INPUT_Y + INPUT_H / 2 - 3} L${INPUT_X + INPUT_W - 14} ${INPUT_Y + INPUT_H / 2 + 3} L${INPUT_X + INPUT_W - 6} ${INPUT_Y + INPUT_H / 2 - 3}`}
          style={{ fill: 'none', stroke: 'var(--soft)', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' }}
        />
      </g>

      <g filter='url(#combobox-shadow)'>
        <rect
          x={PANEL_X}
          y={PANEL_Y}
          width={PANEL_W}
          height={PANEL_H}
          rx={PANEL_RADIUS}
          style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1 }}
        />
      </g>

      <g clipPath='url(#combobox-clip)'>
        <rect
          x={PANEL_X}
          y={PANEL_Y + ACTIVE_INDEX * ROW_H}
          width={PANEL_W}
          height={ROW_H}
          style={{ fill: ACCENT, opacity: 0.12 }}
        />

        {[1, 2, 3].map((i) => (
          <path
            key={`div-${i}`}
            d={`M${PANEL_X + 12} ${PANEL_Y + i * ROW_H} L${PANEL_X + PANEL_W - 12} ${PANEL_Y + i * ROW_H}`}
            style={{ stroke: 'var(--divider)', strokeWidth: 1 }}
          />
        ))}

        {[0, 1, 2, 3].map((i) => {
          const rowCenterY = PANEL_Y + i * ROW_H + ROW_H / 2
          const isActive = i === ACTIVE_INDEX
          const barWidths = [130, 110, 140, 120]
          return (
            <g key={`row-${i}`}>
              {isActive ? (
                <circle
                  cx={PANEL_X + 18}
                  cy={rowCenterY}
                  r={3}
                  style={{ fill: ACCENT }}
                />
              ) : null}
              <rect
                x={PANEL_X + (isActive ? 28 : 18)}
                y={rowCenterY - 3}
                width={barWidths[i]}
                height={6}
                rx={3}
                style={{
                  fill: 'var(--body)',
                  opacity: isActive ? 0.92 : 0.62
                }}
              />
            </g>
          )
        })}
      </g>
    </svg>
  )
}
