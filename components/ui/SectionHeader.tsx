import type { ReactNode } from 'react'

type SectionHeaderProps = {
  eyebrow: string
  title: string
  description?: string
  actions?: ReactNode
  className?: string
}

export function SectionHeader({ eyebrow, title, description, actions, className }: SectionHeaderProps) {
  const classes = ['page-title', 'section-header', className].filter(Boolean).join(' ')

  return (
    <section className={classes}>
      <div>
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {description ? <p>{description}</p> : null}
      </div>
      {actions ? <div className="section-header-actions">{actions}</div> : null}
    </section>
  )
}
