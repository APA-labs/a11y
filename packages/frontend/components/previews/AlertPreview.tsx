const VIEW_W = 320
const VIEW_H = 180

type AlertItem = { y: number; stripe: string }

const ITEMS: AlertItem[] = [
  { y: 26, stripe: '#ef4444' },
  { y: 94, stripe: '#f59e0b' }
]

const CARD_X = 24
const CARD_W = 272
const CARD_H = 60
const STRIPE_W = 5
const RADIUS = 8

export default function AlertPreview() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      <defs>
        {ITEMS.map((item, i) => (
          <clipPath
            key={`clip-${i}`}
            id={`alert-clip-${i}`}>
            <rect
              x={CARD_X}
              y={item.y}
              width={CARD_W}
              height={CARD_H}
              rx={RADIUS}
            />
          </clipPath>
        ))}
      </defs>

      {ITEMS.map((item, i) => (
        <g key={i}>
          <rect
            x={CARD_X}
            y={item.y}
            width={CARD_W}
            height={CARD_H}
            rx={RADIUS}
            style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1 }}
          />
          <g clipPath={`url(#alert-clip-${i})`}>
            <rect
              x={CARD_X}
              y={item.y}
              width={STRIPE_W}
              height={CARD_H}
              style={{ fill: item.stripe }}
            />
          </g>
          <circle
            cx={CARD_X + 26}
            cy={item.y + CARD_H / 2}
            r={10}
            style={{ fill: item.stripe, opacity: 0.18 }}
          />
          <circle
            cx={CARD_X + 26}
            cy={item.y + CARD_H / 2}
            r={4}
            style={{ fill: item.stripe }}
          />
          <rect
            x={CARD_X + 48}
            y={item.y + CARD_H / 2 - 10}
            width={140}
            height={6}
            rx={3}
            style={{ fill: 'var(--body)', opacity: 0.78 }}
          />
          <rect
            x={CARD_X + 48}
            y={item.y + CARD_H / 2 + 2}
            width={100}
            height={4}
            rx={2}
            style={{ fill: 'var(--soft)', opacity: 0.6 }}
          />
          <rect
            x={CARD_X + 48}
            y={item.y + CARD_H / 2 + 10}
            width={76}
            height={4}
            rx={2}
            style={{ fill: 'var(--soft)', opacity: 0.5 }}
          />
        </g>
      ))}
    </svg>
  )
}
