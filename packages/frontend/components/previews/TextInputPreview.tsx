const VIEW_W = 320
const VIEW_H = 180
const ACCENT = '#8b5cf6'

const FIELD_W = 240
const INPUT_H = 34
const FIELD_X = (VIEW_W - FIELD_W) / 2
const GAP = 16
const LABEL_OFFSET = 12
const TOTAL_H = INPUT_H * 2 + GAP + LABEL_OFFSET * 2
const START_Y = (VIEW_H - TOTAL_H) / 2

const FIELD1_LABEL_Y = START_Y + 10
const FIELD1_Y = START_Y + LABEL_OFFSET + 6
const FIELD2_LABEL_Y = FIELD1_Y + INPUT_H + GAP - 2
const FIELD2_Y = FIELD2_LABEL_Y + LABEL_OFFSET - 4

export default function TextInputPreview() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      <text
        x={FIELD_X}
        y={FIELD1_LABEL_Y}
        fontSize={11}
        fontWeight={600}
        fontFamily='system-ui, -apple-system, sans-serif'
        style={{ fill: ACCENT }}>
        Email
      </text>
      <rect
        x={FIELD_X}
        y={FIELD1_Y}
        width={FIELD_W}
        height={INPUT_H}
        rx={8}
        style={{ fill: 'var(--surface)', stroke: ACCENT, strokeWidth: 2 }}
      />
      <text
        x={FIELD_X + 14}
        y={FIELD1_Y + INPUT_H / 2 + 4}
        fontSize={12}
        fontWeight={500}
        fontFamily='system-ui, -apple-system, sans-serif'
        style={{ fill: 'var(--body)' }}>
        alice@example.com
      </text>
      <rect
        x={FIELD_X + 14 + 114}
        y={FIELD1_Y + INPUT_H / 2 - 8}
        width={1.5}
        height={16}
        style={{ fill: ACCENT }}
      />

      <text
        x={FIELD_X}
        y={FIELD2_LABEL_Y}
        fontSize={11}
        fontWeight={600}
        fontFamily='system-ui, -apple-system, sans-serif'
        style={{ fill: 'var(--soft)' }}>
        Password
      </text>
      <rect
        x={FIELD_X}
        y={FIELD2_Y}
        width={FIELD_W}
        height={INPUT_H}
        rx={8}
        style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1.5 }}
      />
      <text
        x={FIELD_X + 14}
        y={FIELD2_Y + INPUT_H / 2 + 4}
        fontSize={12}
        fontWeight={500}
        fontFamily='system-ui, -apple-system, sans-serif'
        style={{ fill: 'var(--faint)' }}>
        Enter your password
      </text>
    </svg>
  )
}
