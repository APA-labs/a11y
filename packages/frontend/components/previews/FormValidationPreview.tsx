const VIEW_W = 320
const VIEW_H = 180

const FIELD_W = 240
const INPUT_H = 32
const GAP = 22
const LABEL_H = 5
const LABEL_GAP = 6
const HELPER_GAP = 6
const HELPER_H = 5

const SUCCESS = '#10b981'
const DANGER = '#ef4444'

const BLOCK_H = LABEL_H + LABEL_GAP + INPUT_H + HELPER_GAP + HELPER_H
const TOTAL_H = BLOCK_H * 2 + GAP
const START_X = (VIEW_W - FIELD_W) / 2
const START_Y = (VIEW_H - TOTAL_H) / 2

export default function FormValidationPreview() {
  const field1Y = START_Y
  const field2Y = START_Y + BLOCK_H + GAP

  const renderField = (
    y: number,
    accent: string,
    helperWidth: number,
    helperColor: string,
    iconType: 'check' | 'warn',
    strokeWidth: number,
    valueWidth: number
  ) => {
    const inputY = y + LABEL_H + LABEL_GAP
    const helperY = inputY + INPUT_H + HELPER_GAP
    const iconCx = START_X + FIELD_W - 18
    const iconCy = inputY + INPUT_H / 2

    return (
      <g>
        <rect
          x={START_X}
          y={y}
          width={30}
          height={LABEL_H}
          rx={2.5}
          style={{ fill: 'var(--soft)', opacity: 0.7 }}
        />

        <rect
          x={START_X}
          y={inputY}
          width={FIELD_W}
          height={INPUT_H}
          rx={8}
          style={{
            fill: 'var(--surface)',
            stroke: accent === 'neutral' ? 'var(--outline)' : accent,
            strokeWidth
          }}
        />

        <rect
          x={START_X + 12}
          y={inputY + INPUT_H / 2 - 3}
          width={valueWidth}
          height={6}
          rx={3}
          style={{ fill: 'var(--body)', opacity: 0.78 }}
        />

        <circle
          cx={iconCx}
          cy={iconCy}
          r={8}
          style={{ fill: accent === 'neutral' ? SUCCESS : accent, opacity: 0.18 }}
        />

        {iconType === 'check' ? (
          <path
            d={`M${iconCx - 3.5} ${iconCy + 0.2} L${iconCx - 1} ${iconCy + 2.6} L${iconCx + 3.8} ${iconCy - 2.4}`}
            fill='none'
            strokeLinecap='round'
            strokeLinejoin='round'
            style={{ stroke: SUCCESS, strokeWidth: 1.8 }}
          />
        ) : (
          <g>
            <rect
              x={iconCx - 0.8}
              y={iconCy - 3.2}
              width={1.6}
              height={4.2}
              rx={0.8}
              style={{ fill: DANGER }}
            />
            <circle
              cx={iconCx}
              cy={iconCy + 2.6}
              r={0.9}
              style={{ fill: DANGER }}
            />
          </g>
        )}

        <rect
          x={START_X}
          y={helperY}
          width={helperWidth}
          height={HELPER_H}
          rx={2.5}
          style={{ fill: helperColor, opacity: helperColor === DANGER ? 0.95 : 0.7 }}
        />
      </g>
    )
  }

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      {renderField(field1Y, 'neutral', 60, 'var(--soft)', 'check', 1, 110)}
      {renderField(field2Y, DANGER, 130, DANGER, 'warn', 1.5, 90)}
    </svg>
  )
}
