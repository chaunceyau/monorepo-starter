import React from 'react'
import { Button } from '../../button'

interface SectionHeadingProps {
  title: string
  description?: string
  action?: {
    label: string
    onClick: () => void
  }
}

const HeadingWrapper = ({
  children
}: {
  children: React.ReactNode | React.ReactNode[]
}) => (
  <div className='pb-5 border-b border-gray-200 flex justify-between items-start'>
    {children}
  </div>
)

const Title = ({ title }: { title: string }) => (
  <h3 className='text-lg leading-6 font-medium text-gray-900'>{title}</h3>
)

const Description = ({ description }: { description?: string }) => {
  if (!description) {
    return null
  }
  return <p className='mt-2 max-w-4xl text-sm text-gray-500'>{description}</p>
}

export function SectionHeading({
  title,
  description,
  action
}: SectionHeadingProps) {
  return (
    <div>
      <HeadingWrapper>
        <div className='flex flex-col flex-grow'>
          <Title title={title} />
          <Description description={description} />
        </div>
        {action ? (
          <Button buttonStyle='primary' onClick={action.onClick}>
            {action.label}
          </Button>
        ) : null}
      </HeadingWrapper>
    </div>
  )
}
