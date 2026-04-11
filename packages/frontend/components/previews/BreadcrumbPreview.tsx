const VIEW_W = 320
const VIEW_H = 180

type Crumb = { label: string; current?: boolean }

const CRUMBS: Crumb[] = [{ label: 'Home' }, { label: 'Products' }, { label: 'Laptops', current: true }]

const FONT_SIZE = 14
const SEPARATOR = '/'
const GAP = 10

export default function BreadcrumbPreview() {
  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      xmlns='http://www.w3.org/2000/svg'
      className='w-full h-full'
      aria-hidden='true'>
      <g transform={`translate(${VIEW_W / 2}, ${VIEW_H / 2 + 5})`}>
        <text
          textAnchor='middle'
          fontSize={FONT_SIZE}
          fontFamily='system-ui, -apple-system, sans-serif'
          fontWeight={500}>
          {CRUMBS.map((crumb, i) => (
            <tspan
              key={i}
              style={{
                fill: crumb.current ? 'var(--body)' : 'var(--soft)',
                fontWeight: crumb.current ? 700 : 500
              }}>
              {i > 0 ? (
                <tspan
                  dx={GAP}
                  style={{ fill: 'var(--faint)', fontWeight: 400 }}>
                  {SEPARATOR}
                </tspan>
              ) : null}
              <tspan dx={i > 0 ? GAP : 0}>{crumb.label}</tspan>
            </tspan>
          ))}
        </text>
      </g>

      <circle
        cx={62}
        cy={VIEW_H / 2}
        r={3}
        style={{ fill: 'var(--faint)', opacity: 0.6 }}
      />
    </svg>
  )
}
