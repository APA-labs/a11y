import { DS_META, DS_ORDER } from '../lib/types'

export default function DSLegendFloat() {
  return (
    <div className='hidden lg:block fixed bottom-5 right-5 z-50 motion-safe:animate-[legendIn_400ms_ease-out_300ms_both]'>
      <div className='bg-surface backdrop-blur-md border border-outline rounded-xl shadow-lg px-4 py-3 space-y-1.5'>
        <p className='text-[10px] font-semibold uppercase tracking-wider text-faint mb-1'>Design Systems</p>
        {DS_ORDER.map((id, i) => {
          const ds = DS_META[id]
          return (
            <div
              key={id}
              className='flex items-center gap-2 motion-safe:animate-[legendItemIn_300ms_ease-out_both]'
              style={{ animationDelay: `${450 + i * 60}ms` }}>
              <span
                className='w-2 h-2 rounded-full shrink-0'
                style={{ backgroundColor: ds.color }}
              />
              <span className='text-xs text-body whitespace-nowrap'>{ds.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
