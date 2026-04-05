export function WcagPageShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className='max-w-4xl mx-auto px-6 sm:px-10 py-10 sm:py-14'>
      <div className='mb-8'>
        <h1 className='text-2xl font-bold text-body mb-2'>{title}</h1>
        <p className='text-soft text-sm leading-relaxed'>{subtitle}</p>
      </div>
      {children}
    </div>
  )
}
