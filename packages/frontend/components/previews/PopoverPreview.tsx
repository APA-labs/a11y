const VIEW_W = 320
const VIEW_H = 180

const ANCHOR_X = 30
const ANCHOR_Y = 120
const ANCHOR_W = 70
const ANCHOR_H = 32

const POP_X = 115
const POP_Y = 20
const POP_W = 180
const POP_H = 90

export default function PopoverPreview() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      <defs>
        <clipPath id='popover-clip'>
          <rect
            x={POP_X}
            y={POP_Y}
            width={POP_W}
            height={POP_H}
            rx={10}
          />
        </clipPath>
        <filter
          id='popover-shadow'
          x='-10%'
          y='-20%'
          width='120%'
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

      <g>
        <rect
          x={ANCHOR_X}
          y={ANCHOR_Y}
          width={ANCHOR_W}
          height={ANCHOR_H}
          rx={8}
          style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1.5 }}
        />
        <rect
          x={ANCHOR_X + 17}
          y={ANCHOR_Y + ANCHOR_H / 2 - 2.5}
          width={36}
          height={5}
          rx={2.5}
          style={{ fill: 'var(--body)', opacity: 0.8 }}
        />
      </g>

      <g filter='url(#popover-shadow)'>
        <rect
          x={POP_X}
          y={POP_Y}
          width={POP_W}
          height={POP_H}
          rx={10}
          style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1 }}
        />

        <g clipPath='url(#popover-clip)'>
          <rect
            x={POP_X + 16}
            y={POP_Y + 18}
            width={80}
            height={6}
            rx={3}
            style={{ fill: 'var(--body)' }}
          />

          <path
            d={`M${POP_X + 16} ${POP_Y + 34} L${POP_X + POP_W - 16} ${POP_Y + 34}`}
            style={{ stroke: 'var(--divider)', strokeWidth: 1 }}
          />

          <rect
            x={POP_X + 16}
            y={POP_Y + 44}
            width={140}
            height={4}
            rx={2}
            style={{ fill: 'var(--body)', opacity: 0.65 }}
          />
          <rect
            x={POP_X + 16}
            y={POP_Y + 54}
            width={120}
            height={4}
            rx={2}
            style={{ fill: 'var(--soft)', opacity: 0.6 }}
          />
          <rect
            x={POP_X + 16}
            y={POP_Y + 64}
            width={100}
            height={4}
            rx={2}
            style={{ fill: 'var(--soft)', opacity: 0.55 }}
          />

          <circle
            cx={POP_X + POP_W - 20}
            cy={POP_Y + POP_H - 16}
            r={5}
            style={{ fill: 'var(--divider)' }}
          />
          <circle
            cx={POP_X + POP_W - 20}
            cy={POP_Y + POP_H - 16}
            r={2}
            style={{ fill: 'var(--soft)' }}
          />
        </g>
      </g>

      <path
        d={`M${POP_X + 12} ${POP_Y + POP_H - 1} L${POP_X + 24} ${POP_Y + POP_H - 1} L${POP_X + 10} ${POP_Y + POP_H + 12} Z`}
        style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1 }}
      />
      <path
        d={`M${POP_X + 12} ${POP_Y + POP_H} L${POP_X + 24} ${POP_Y + POP_H}`}
        style={{ stroke: 'var(--surface)', strokeWidth: 2 }}
      />
    </svg>
  )
}
