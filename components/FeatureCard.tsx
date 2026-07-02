type FeatureCardProps = {
  title: string
  description: string
  metric?: string
}

export function FeatureCard({ title, description, metric }: FeatureCardProps) {
  return (
    <article className="card">
      {metric ? <div className="metric">{metric}</div> : null}
      <h2>{title}</h2>
      <p>{description}</p>
    </article>
  )
}
