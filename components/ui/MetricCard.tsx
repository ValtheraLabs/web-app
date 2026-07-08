import type { ReactNode } from 'react'

import { Panel } from './Panel'

type MetricCardProps = {
  label: string
  value: string
  detail?: string
  trend?: ReactNode
  className?: string
}

export function MetricCard({ label, value, detail, trend, className }: MetricCardProps) {
  return (
    <Panel className={['metric-card', className].filter(Boolean).join(' ')}>
      <div className="metric-card-label">{label}</div>
      <div className="metric">{value}</div>
      {detail ? <p>{detail}</p> : null}
      {trend ? <div className="metric-card-trend">{trend}</div> : null}
    </Panel>
  )
}
