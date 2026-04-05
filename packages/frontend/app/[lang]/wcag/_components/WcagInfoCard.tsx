export function WcagInfoCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={`bg-surface border border-outline rounded-xl p-4 ${className ?? ''}`}>{children}</div>
}
