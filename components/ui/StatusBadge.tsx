type StatusBadgeTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info'

type StatusBadgeProps = {
  label: string
  tone?: StatusBadgeTone
  className?: string
}

export function StatusBadge({ label, tone = 'neutral', className }: StatusBadgeProps) {
  const classes = ['button', 'secondary', 'status-badge', `status-badge-${tone}`, className]
    .filter(Boolean)
    .join(' ')

  return <span className={classes}>{label}</span>
}
