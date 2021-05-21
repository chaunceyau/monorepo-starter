import React from 'react'

interface ProgressBarProps {
  percent: number
}

export function ProgressBar(props: ProgressBarProps) {
  const barClasses = ['h-full rounded-l-full']

  if (props.percent === 100) {
    barClasses.push('rounded-r-full bg-green-500')
  } else {
    barClasses.push('bg-yellow-300')
  }

  return (
    <div className='h-2 w-full rounded-full bg-gray-300'>
      <div
        className={barClasses.join(' ')}
        style={{ width: props.percent + '%' }}
      >
        &nbsp;
      </div>
    </div>
  )
}
