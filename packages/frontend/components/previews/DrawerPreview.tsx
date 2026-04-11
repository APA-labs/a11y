const VIEW_W = 320
const VIEW_H = 180

const OVERLAY_W = 190
const PANEL_X = OVERLAY_W
const PANEL_W = VIEW_W - PANEL_X
const PANEL_RADIUS = 12

export default function DrawerPreview() {
  const rowYs = [72, 102, 132]

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      <defs>
        <clipPath id='drawer-clip'>
          <path
            d={`M${PANEL_X + PANEL_RADIUS} 0
                H${VIEW_W}
                V${VIEW_H}
                H${PANEL_X + PANEL_RADIUS}
                Q${PANEL_X} ${VIEW_H} ${PANEL_X} ${VIEW_H - PANEL_RADIUS}
                V${PANEL_RADIUS}
                Q${PANEL_X} 0 ${PANEL_X + PANEL_RADIUS} 0
                Z`}
          />
        </clipPath>
        <filter
          id='drawer-shadow'
          x='-20%'
          y='-20%'
          width='140%'
          height='140%'>
          <feGaussianBlur
            in='SourceAlpha'
            stdDeviation='3'
          />
          <feOffset
            dx='-2'
            dy='1'
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
        x={0}
        y={0}
        width={VIEW_W}
        height={VIEW_H}
        style={{ fill: 'var(--inset)' }}
      />
      <rect
        x={0}
        y={0}
        width={PANEL_X + PANEL_RADIUS}
        height={VIEW_H}
        style={{ fill: 'var(--divider)', opacity: 0.6 }}
      />

      <rect
        x={20}
        y={32}
        width={140}
        height={5}
        rx={2.5}
        style={{ fill: 'var(--soft)', opacity: 0.22 }}
      />
      <rect
        x={20}
        y={52}
        width={110}
        height={4}
        rx={2}
        style={{ fill: 'var(--soft)', opacity: 0.18 }}
      />
      <rect
        x={20}
        y={70}
        width={150}
        height={4}
        rx={2}
        style={{ fill: 'var(--soft)', opacity: 0.18 }}
      />
      <rect
        x={20}
        y={88}
        width={120}
        height={4}
        rx={2}
        style={{ fill: 'var(--soft)', opacity: 0.18 }}
      />

      <g
        clipPath='url(#drawer-clip)'
        filter='url(#drawer-shadow)'>
        <rect
          x={PANEL_X}
          y={0}
          width={PANEL_W + 2}
          height={VIEW_H}
          style={{ fill: 'var(--surface)' }}
        />

        <rect
          x={PANEL_X + 14}
          y={22}
          width={70}
          height={6}
          rx={3}
          style={{ fill: 'var(--body)' }}
        />

        <circle
          cx={VIEW_W - 18}
          cy={25}
          r={7}
          style={{ fill: 'var(--divider)' }}
        />
        <path
          d={`M${VIEW_W - 21} 22 L${VIEW_W - 15} 28 M${VIEW_W - 21} 28 L${VIEW_W - 15} 22`}
          style={{ stroke: 'var(--body)', strokeWidth: 1.2, strokeLinecap: 'round' }}
        />

        <path
          d={`M${PANEL_X + 14} 44 L${VIEW_W - 14} 44`}
          style={{ stroke: 'var(--divider)', strokeWidth: 1 }}
        />

        {rowYs.map((ry, i) => (
          <g key={i}>
            <circle
              cx={PANEL_X + 20}
              cy={ry}
              r={5}
              style={{ fill: 'var(--soft)', opacity: 0.55 }}
            />
            <rect
              x={PANEL_X + 32}
              y={ry - 3}
              width={80}
              height={5}
              rx={2.5}
              style={{ fill: 'var(--body)', opacity: 0.75 }}
            />
            <rect
              x={PANEL_X + 32}
              y={ry + 4}
              width={54}
              height={3}
              rx={1.5}
              style={{ fill: 'var(--soft)', opacity: 0.55 }}
            />
          </g>
        ))}
      </g>

      <path
        d={`M${PANEL_X + PANEL_RADIUS} 0
            Q${PANEL_X} 0 ${PANEL_X} ${PANEL_RADIUS}
            V${VIEW_H - PANEL_RADIUS}
            Q${PANEL_X} ${VIEW_H} ${PANEL_X + PANEL_RADIUS} ${VIEW_H}`}
        style={{ fill: 'none', stroke: 'var(--outline)', strokeWidth: 1.5 }}
      />
    </svg>
  )
}
