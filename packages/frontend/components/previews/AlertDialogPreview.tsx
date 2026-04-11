const VIEW_W = 320
const VIEW_H = 180

const DIALOG_W = 240
const DIALOG_H = 130
const DIALOG_X = (VIEW_W - DIALOG_W) / 2
const DIALOG_Y = (VIEW_H - DIALOG_H) / 2
const RADIUS = 12

const DANGER = '#ef4444'

const PAD_X = 16
const ICON_R = 9
const ICON_CX = DIALOG_X + PAD_X + ICON_R
const ICON_CY = DIALOG_Y + 22

const TITLE_X = ICON_CX + ICON_R + 8
const TITLE_Y = ICON_CY - 3
const TITLE_W = 140
const TITLE_H = 6

const DESC1_X = DIALOG_X + PAD_X
const DESC1_Y = DIALOG_Y + 48
const DESC1_W = 180
const DESC2_W = 140
const DESC_H = 5

const BTN_W = 50
const BTN_H = 22
const BTN_GAP = 8
const BTN_Y = DIALOG_Y + DIALOG_H - BTN_H - 14
const CONFIRM_X = DIALOG_X + DIALOG_W - PAD_X - BTN_W
const CANCEL_X = CONFIRM_X - BTN_GAP - BTN_W

export default function AlertDialogPreview() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      <defs>
        <filter
          id='alert-dialog-shadow'
          x='-10%'
          y='-20%'
          width='120%'
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
              slope='0.18'
            />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in='SourceGraphic' />
          </feMerge>
        </filter>
        <clipPath id='alert-dialog-clip'>
          <rect
            x={DIALOG_X}
            y={DIALOG_Y}
            width={DIALOG_W}
            height={DIALOG_H}
            rx={RADIUS}
          />
        </clipPath>
      </defs>

      <g filter='url(#alert-dialog-shadow)'>
        <rect
          x={DIALOG_X}
          y={DIALOG_Y}
          width={DIALOG_W}
          height={DIALOG_H}
          rx={RADIUS}
          style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1 }}
        />

        <g clipPath='url(#alert-dialog-clip)'>
          <circle
            cx={ICON_CX}
            cy={ICON_CY}
            r={ICON_R}
            style={{ fill: DANGER, opacity: 0.18 }}
          />
          <circle
            cx={ICON_CX}
            cy={ICON_CY}
            r={5}
            style={{ fill: DANGER }}
          />
          <rect
            x={ICON_CX - 0.9}
            y={ICON_CY - 2.8}
            width={1.8}
            height={3.4}
            rx={0.9}
            style={{ fill: '#ffffff' }}
          />
          <circle
            cx={ICON_CX}
            cy={ICON_CY + 2.2}
            r={0.9}
            style={{ fill: '#ffffff' }}
          />

          <rect
            x={TITLE_X}
            y={TITLE_Y}
            width={TITLE_W}
            height={TITLE_H}
            rx={3}
            style={{ fill: 'var(--body)' }}
          />

          <rect
            x={DESC1_X}
            y={DESC1_Y}
            width={DESC1_W}
            height={DESC_H}
            rx={2.5}
            style={{ fill: 'var(--soft)', opacity: 0.75 }}
          />
          <rect
            x={DESC1_X}
            y={DESC1_Y + 12}
            width={DESC2_W}
            height={DESC_H}
            rx={2.5}
            style={{ fill: 'var(--soft)', opacity: 0.6 }}
          />
        </g>

        <rect
          x={CANCEL_X}
          y={BTN_Y}
          width={BTN_W}
          height={BTN_H}
          rx={6}
          style={{ fill: 'var(--surface)', stroke: 'var(--outline)', strokeWidth: 1 }}
        />
        <rect
          x={CANCEL_X + 10}
          y={BTN_Y + BTN_H / 2 - 2}
          width={30}
          height={4}
          rx={2}
          style={{ fill: 'var(--body)', opacity: 0.7 }}
        />

        <rect
          x={CONFIRM_X}
          y={BTN_Y}
          width={BTN_W}
          height={BTN_H}
          rx={6}
          style={{ fill: DANGER }}
        />
        <rect
          x={CONFIRM_X + 10}
          y={BTN_Y + BTN_H / 2 - 2}
          width={30}
          height={4}
          rx={2}
          style={{ fill: '#ffffff' }}
        />
      </g>
    </svg>
  )
}
