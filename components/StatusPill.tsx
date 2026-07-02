type StatusPillProps = {
  label: string
}

export function StatusPill({ label }: StatusPillProps) {
  return <span className="button secondary">{label}</span>
}
