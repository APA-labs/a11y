const VIEW_W = 320
const VIEW_H = 180

const TRIGGER_W = 248
const TRIGGER_H = 40
const TRIGGER_X = (VIEW_W - TRIGGER_W) / 2
const TRIGGER_Y = 34

const CONTENT_X = TRIGGER_X + 16
const CONTENT_Y = TRIGGER_Y + TRIGGER_H + 18

export default function DisclosurePreview() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      <rect
        x={TRIGGER_X}
        y={TRIGGER_Y}
        width={TRIGGER_W}
        height={TRIGGER_H}
        rx={10}
        style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1.5 }}
      />
      <text
        x={TRIGGER_X + 18}
        y={TRIGGER_Y + TRIGGER_H / 2 + 4}
        fontSize={13}
        fontWeight={600}
        fontFamily='system-ui, -apple-system, sans-serif'
        style={{ fill: 'var(--body)' }}>
        Show shipping details
      </text>
      <path
        d={`M${TRIGGER_X + TRIGGER_W - 22} ${TRIGGER_Y + TRIGGER_H / 2 - 3} l5 5 l5 -5`}
        style={{
          stroke: 'var(--body)',
          strokeWidth: 1.8,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          fill: 'none'
        }}
      />

      <text
        x={CONTENT_X}
        y={CONTENT_Y}
        fontSize={11.5}
        fontWeight={500}
        fontFamily='system-ui, -apple-system, sans-serif'
        style={{ fill: 'var(--soft)' }}>
        Free delivery on orders over $50.
      </text>
      <text
        x={CONTENT_X}
        y={CONTENT_Y + 18}
        fontSize={11.5}
        fontWeight={500}
        fontFamily='system-ui, -apple-system, sans-serif'
        style={{ fill: 'var(--soft)' }}>
        Standard arrives in 3–5 business days.
      </text>
    </svg>
  )
}
