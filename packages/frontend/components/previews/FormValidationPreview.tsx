const VIEW_W = 320
const VIEW_H = 180

const SUCCESS = '#10b981'
const DANGER = '#ef4444'

const FIELD_W = 240
const FIELD_H = 34
const FIELD_X = (VIEW_W - FIELD_W) / 2

const LABEL_GAP = 12
const HELPER_GAP = 8
const ROW_GAP = 14

const ROW_H = LABEL_GAP + FIELD_H + HELPER_GAP + 12
const TOTAL_H = ROW_H * 2 + ROW_GAP
const START_Y = (VIEW_H - TOTAL_H) / 2

const ROW1_LABEL_Y = START_Y + 10
const ROW1_FIELD_Y = START_Y + LABEL_GAP + 4
const ROW1_HELPER_Y = ROW1_FIELD_Y + FIELD_H + HELPER_GAP + 6

const ROW2_LABEL_Y = ROW1_HELPER_Y + ROW_GAP
const ROW2_FIELD_Y = ROW2_LABEL_Y + LABEL_GAP - 8
const ROW2_HELPER_Y = ROW2_FIELD_Y + FIELD_H + HELPER_GAP + 6

export default function FormValidationPreview() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      <text
        x={FIELD_X}
        y={ROW1_LABEL_Y}
        fontSize={11}
        fontWeight={600}
        fontFamily='system-ui, -apple-system, sans-serif'
        style={{ fill: 'var(--soft)' }}>
        Email
      </text>
      <rect
        x={FIELD_X}
        y={ROW1_FIELD_Y}
        width={FIELD_W}
        height={FIELD_H}
        rx={8}
        style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1.5 }}
      />
      <text
        x={FIELD_X + 14}
        y={ROW1_FIELD_Y + FIELD_H / 2 + 4}
        fontSize={12}
        fontWeight={500}
        fontFamily='system-ui, -apple-system, sans-serif'
        style={{ fill: 'var(--body)' }}>
        alice@example.com
      </text>
      <circle
        cx={FIELD_X + FIELD_W - 18}
        cy={ROW1_FIELD_Y + FIELD_H / 2}
        r={9}
        style={{ fill: SUCCESS, opacity: 0.16 }}
      />
      <path
        d={`M${FIELD_X + FIELD_W - 22} ${ROW1_FIELD_Y + FIELD_H / 2} l3 3 l5 -5`}
        style={{
          stroke: SUCCESS,
          strokeWidth: 1.8,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          fill: 'none'
        }}
      />

      <text
        x={FIELD_X}
        y={ROW2_LABEL_Y}
        fontSize={11}
        fontWeight={600}
        fontFamily='system-ui, -apple-system, sans-serif'
        style={{ fill: DANGER }}>
        Password
      </text>
      <rect
        x={FIELD_X}
        y={ROW2_FIELD_Y}
        width={FIELD_W}
        height={FIELD_H}
        rx={8}
        style={{ fill: 'var(--surface)', stroke: DANGER, strokeWidth: 2 }}
      />
      <text
        x={FIELD_X + 14}
        y={ROW2_FIELD_Y + FIELD_H / 2 + 4}
        fontSize={12}
        fontWeight={500}
        fontFamily='system-ui, -apple-system, sans-serif'
        style={{ fill: 'var(--body)' }}>
        ••••
      </text>
      <circle
        cx={FIELD_X + FIELD_W - 18}
        cy={ROW2_FIELD_Y + FIELD_H / 2}
        r={9}
        style={{ fill: DANGER, opacity: 0.16 }}
      />
      <text
        x={FIELD_X + FIELD_W - 18}
        y={ROW2_FIELD_Y + FIELD_H / 2 + 4}
        textAnchor='middle'
        fontSize={12}
        fontWeight={700}
        fontFamily='system-ui, -apple-system, sans-serif'
        style={{ fill: DANGER }}>
        !
      </text>
      <text
        x={FIELD_X}
        y={ROW2_HELPER_Y}
        fontSize={10.5}
        fontWeight={500}
        fontFamily='system-ui, -apple-system, sans-serif'
        style={{ fill: DANGER }}>
        Must be at least 8 characters
      </text>
    </svg>
  )
}
