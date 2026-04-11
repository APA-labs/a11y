const VIEW_W = 320
const VIEW_H = 180

const FIELD_W = 240
const FIELD_H = 34
const GAP = 14
const FOCUS = '#8b5cf6'

const FIELD_X = (VIEW_W - FIELD_W) / 2
const TOTAL_H = FIELD_H * 2 + GAP + 10 + 8
const START_Y = (VIEW_H - TOTAL_H) / 2

const LABEL_H = 4
const LABEL_GAP = 8

const FIELD_1_LABEL_Y = START_Y
const FIELD_1_Y = FIELD_1_LABEL_Y + LABEL_H + LABEL_GAP
const FIELD_2_LABEL_Y = FIELD_1_Y + FIELD_H + GAP
const FIELD_2_Y = FIELD_2_LABEL_Y + LABEL_H + LABEL_GAP

export default function TextInputPreview() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      <rect
        x={FIELD_X}
        y={FIELD_1_LABEL_Y}
        width={30}
        height={LABEL_H}
        rx={2}
        style={{ fill: 'var(--soft)' }}
      />
      <rect
        x={FIELD_X}
        y={FIELD_1_Y}
        width={FIELD_W}
        height={FIELD_H}
        rx={8}
        style={{ fill: 'var(--surface)', stroke: FOCUS, strokeWidth: 2 }}
      />
      <rect
        x={FIELD_X + 12}
        y={FIELD_1_Y + FIELD_H / 2 - 2.5}
        width={80}
        height={5}
        rx={2.5}
        style={{ fill: 'var(--body)' }}
      />
      <rect
        x={FIELD_X + 12 + 80 + 3}
        y={FIELD_1_Y + FIELD_H / 2 - 7}
        width={1.5}
        height={14}
        style={{ fill: 'var(--body)' }}
      />

      <rect
        x={FIELD_X}
        y={FIELD_2_LABEL_Y}
        width={40}
        height={LABEL_H}
        rx={2}
        style={{ fill: 'var(--soft)' }}
      />
      <rect
        x={FIELD_X}
        y={FIELD_2_Y}
        width={FIELD_W}
        height={FIELD_H}
        rx={8}
        style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1.5 }}
      />
      <rect
        x={FIELD_X + 12}
        y={FIELD_2_Y + FIELD_H / 2 - 2}
        width={60}
        height={4}
        rx={2}
        style={{ fill: 'var(--faint)' }}
      />
    </svg>
  )
}
