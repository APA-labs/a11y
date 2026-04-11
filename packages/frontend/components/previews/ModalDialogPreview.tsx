const VIEW_W = 320
const VIEW_H = 180

const MODAL_W = 232
const MODAL_H = 116
const MODAL_X = (VIEW_W - MODAL_W) / 2
const MODAL_Y = (VIEW_H - MODAL_H) / 2
const RADIUS = 12
const HEADER_H = 28

const CONTENT_BARS = [
  { w: 190, fill: 'var(--body)', opacity: 0.72 },
  { w: 160, fill: 'var(--soft)', opacity: 0.55 },
  { w: 130, fill: 'var(--soft)', opacity: 0.55 }
]

const PAGE_BARS = [
  { y: 22, w: 220 },
  { y: 46, w: 260 },
  { y: 140, w: 200 },
  { y: 162, w: 240 }
]

const BTN_W = 48
const BTN_H = 20
const BTN_GAP = 8
const FOOTER_Y = MODAL_Y + MODAL_H - BTN_H - 12
const CONFIRM_X = MODAL_X + MODAL_W - BTN_W - 12
const CANCEL_X = CONFIRM_X - BTN_W - BTN_GAP

const ACCENT = '#8b5cf6'

export default function ModalDialogPreview() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      <defs>
        <clipPath id='modal-dialog-clip'>
          <rect
            x={MODAL_X}
            y={MODAL_Y}
            width={MODAL_W}
            height={MODAL_H}
            rx={RADIUS}
          />
        </clipPath>
        <filter
          id='modal-dialog-shadow'
          x='-20%'
          y='-20%'
          width='140%'
          height='140%'>
          <feGaussianBlur
            in='SourceAlpha'
            stdDeviation='3'
          />
          <feOffset
            dy='2'
            result='offsetblur'
          />
          <feComponentTransfer>
            <feFuncA
              type='linear'
              slope='0.22'
            />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
      </defs>

      {PAGE_BARS.map((bar, i) => (
        <rect
          key={`page-${i}`}
          x={(VIEW_W - bar.w) / 2}
          y={bar.y}
          width={bar.w}
          height={6}
          rx={3}
          style={{ fill: 'var(--soft)', opacity: 0.3 }}
        />
      ))}

      <rect
        x={0}
        y={0}
        width={VIEW_W}
        height={VIEW_H}
        style={{ fill: 'var(--divider)', opacity: 0.5 }}
      />

      <g filter='url(#modal-dialog-shadow)'>
        <rect
          x={MODAL_X}
          y={MODAL_Y}
          width={MODAL_W}
          height={MODAL_H}
          rx={RADIUS}
          style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1 }}
        />

        <g clipPath='url(#modal-dialog-clip)'>
          <rect
            x={MODAL_X}
            y={MODAL_Y}
            width={MODAL_W}
            height={HEADER_H}
            style={{ fill: 'var(--divider)' }}
          />
        </g>

        <rect
          x={MODAL_X + 16}
          y={MODAL_Y + HEADER_H / 2 - 3}
          width={100}
          height={6}
          rx={3}
          style={{ fill: 'var(--body)' }}
        />

        <circle
          cx={MODAL_X + MODAL_W - 18}
          cy={MODAL_Y + HEADER_H / 2}
          r={8}
          style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1 }}
        />
        <path
          d={`M${MODAL_X + MODAL_W - 22} ${MODAL_Y + HEADER_H / 2 - 4} L${MODAL_X + MODAL_W - 14} ${MODAL_Y + HEADER_H / 2 + 4} M${MODAL_X + MODAL_W - 14} ${MODAL_Y + HEADER_H / 2 - 4} L${MODAL_X + MODAL_W - 22} ${MODAL_Y + HEADER_H / 2 + 4}`}
          style={{ stroke: 'var(--body)', strokeWidth: 1.5, strokeLinecap: 'round' }}
        />

        {CONTENT_BARS.map((bar, i) => (
          <rect
            key={`content-${i}`}
            x={MODAL_X + 16}
            y={MODAL_Y + HEADER_H + 14 + i * 15}
            width={bar.w}
            height={5}
            rx={2.5}
            style={{ fill: bar.fill, opacity: bar.opacity }}
          />
        ))}

        <rect
          x={CANCEL_X}
          y={FOOTER_Y}
          width={BTN_W}
          height={BTN_H}
          rx={6}
          style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1 }}
        />
        <rect
          x={CANCEL_X + 12}
          y={FOOTER_Y + BTN_H / 2 - 2}
          width={26}
          height={4}
          rx={2}
          style={{ fill: 'var(--body)', opacity: 0.7 }}
        />

        <rect
          x={CONFIRM_X}
          y={FOOTER_Y}
          width={BTN_W}
          height={BTN_H}
          rx={6}
          style={{ fill: ACCENT }}
        />
        <rect
          x={CONFIRM_X + 12}
          y={FOOTER_Y + BTN_H / 2 - 2}
          width={26}
          height={4}
          rx={2}
          style={{ fill: '#ffffff', opacity: 0.95 }}
        />
      </g>
    </svg>
  )
}
