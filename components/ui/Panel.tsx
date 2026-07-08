import type { ReactNode } from 'react'

type PanelProps = {
  children: ReactNode
  className?: string
  eyebrow?: string
  title?: string
  description?: string
}

export function Panel({ children, className, eyebrow, title, description }: PanelProps) {
  const classes = ['card', 'panel', className].filter(Boolean).join(' ')

  return (
    <section className={classes}>
      {eyebrow || title || description ? (
        <header className="panel-header">
          {eyebrow ? <div className="eyebrow">{eyebrow}</div> : null}
          {title ? <h2>{title}</h2> : null}
          {description ? <p>{description}</p> : null}
        </header>
      ) : null}
      <div className="panel-body">{children}</div>
    </section>
  )
}
