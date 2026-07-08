import type { ReactNode } from 'react'

type DataStateStatus = 'loading' | 'error' | 'empty' | 'unavailable'

type DataStateProps = {
  status: DataStateStatus
  title: string
  description: string
  action?: ReactNode
  className?: string
}

export function DataState({ status, title, description, action, className }: DataStateProps) {
  const classes = ['card', 'data-state', `data-state-${status}`, className].filter(Boolean).join(' ')

  return (
    <section className={classes} role={status === 'error' ? 'alert' : 'status'}>
      <div className="eyebrow">{status}</div>
      <h2>{title}</h2>
      <p>{description}</p>
      {action ? <div className="button-row">{action}</div> : null}
    </section>
  )
}
