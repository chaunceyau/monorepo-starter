import { H2 } from '@monorepo-starter/ui'

interface CardHeaderProps {
  title: string
  description?: string
}

export function CardHeader({ title, description }: CardHeaderProps) {
  return (
    <div>
      <H2>{title}</H2>
      {description ? (
        <p className='mt-1 text-sm text-gray-500'>{description}</p>
      ) : null}
    </div>
  )
}
