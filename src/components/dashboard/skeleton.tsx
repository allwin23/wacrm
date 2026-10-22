import { cn } from '@/lib/utils'

/**
 * Shared skeleton primitive — a subtle pulsing neutral block sized to whatever
 * container it's dropped into.
 */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('animate-pulse rounded-[4px] bg-muted/60', className)} />
}

export function SkeletonCard({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'rounded-[8px] border border-border bg-card p-4',
        className,
      )}
    >
      <Skeleton className="h-3.5 w-24" />
      <Skeleton className="mt-3 h-7 w-20" />
      <Skeleton className="mt-2 h-3 w-16" />
    </div>
  )
}
