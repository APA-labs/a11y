interface Row {
  id: string
  title: string
  desc: string
}

interface WcagLevelCardProps {
  color: string
  bg: string
  border: string
  badge: string
  icon: React.ComponentType<{ size?: number; className?: string }>
  label: string
  description: string
  rows: Row[]
  colHeaders: [string, string, string]
}

export function WcagLevelCard({ color, bg, border, badge, icon: Icon, label, description, rows, colHeaders }: WcagLevelCardProps) {
  return (
    <div className={`rounded-xl border ${border} ${bg} overflow-hidden`}>
      <div className='px-5 py-4 flex items-start gap-3'>
        <Icon
          size={18}
          className={`${color} mt-0.5 shrink-0`}
        />
        <div>
          <div className='flex items-center gap-2 mb-1'>
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badge}`}>{label}</span>
          </div>
          <p className='text-sm text-soft leading-relaxed'>{description}</p>
        </div>
      </div>
      <div className='bg-surface/70 border-t border-outline/60'>
        <table className='w-full text-sm'>
          <thead>
            <tr className='border-b border-outline/60'>
              {colHeaders.map((h) => (
                <th
                  key={h}
                  className='text-left px-5 py-2.5 text-xs font-semibold text-faint first:w-24 [&:nth-child(2)]:w-36'>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.id}
                className={i < rows.length - 1 ? 'border-b border-divider' : ''}>
                <td className='px-5 py-2.5 font-mono text-xs text-faint'>{row.id}</td>
                <td className='px-4 py-2.5 text-xs font-medium text-body'>{row.title}</td>
                <td className='px-4 py-2.5 text-xs text-soft leading-relaxed'>{row.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
