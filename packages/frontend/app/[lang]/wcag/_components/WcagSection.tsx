export function WcagSection({ label, children, className }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <section className={className}>
      <h2 className='text-sm font-semibold text-soft uppercase tracking-wider mb-3'>{label}</h2>
      {children}
    </section>
  )
}
