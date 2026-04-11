const VIEW_W = 320
const VIEW_H = 180

type ToastItem = { y: number; stripe: string; bar: string }

const ITEMS: ToastItem[] = [
  { y: 24, stripe: '#10b981', bar: '#065f46' },
  { y: 74, stripe: '#3b82f6', bar: '#1e3a8a' },
  { y: 124, stripe: '#f59e0b', bar: '#7c2d12' }
]

const CARD_X = 30
const CARD_W = 260
const CARD_H = 36
const STRIPE_W = 5
const RADIUS = 8

export default function ToastPreview() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      <defs>
        <filter
          id='toast-shadow'
          x='-10%'
          y='-40%'
          width='120%'
          height='180%'>
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

      {ITEMS.map((item, i) => (
        <g
          key={i}
          filter='url(#toast-shadow)'>
          <rect
            x={CARD_X}
            y={item.y}
            width={CARD_W}
            height={CARD_H}
            rx={RADIUS}
            style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1 }}
          />
          <rect
            x={CARD_X}
            y={item.y}
            width={STRIPE_W}
            height={CARD_H}
            style={{ fill: item.stripe }}
          />
          <circle
            cx={CARD_X + 24}
            cy={item.y + CARD_H / 2}
            r={7}
            style={{ fill: item.stripe, opacity: 0.18 }}
          />
          <circle
            cx={CARD_X + 24}
            cy={item.y + CARD_H / 2}
            r={3}
            style={{ fill: item.stripe }}
          />
          <rect
            x={CARD_X + 44}
            y={item.y + CARD_H / 2 - 5}
            width={160}
            height={4}
            rx={2}
            style={{ fill: 'var(--body)', opacity: 0.72 }}
          />
          <rect
            x={CARD_X + 44}
            y={item.y + CARD_H / 2 + 3}
            width={100}
            height={3}
            rx={1.5}
            style={{ fill: 'var(--soft)', opacity: 0.55 }}
          />
        </g>
      ))}
    </svg>
  )
}
