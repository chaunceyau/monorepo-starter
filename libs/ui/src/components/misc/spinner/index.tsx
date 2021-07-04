import * as React from 'react'
import styles from './styles.module.css'

interface LoadingSpinnerProps {
  color?: 'white' | 'dark' | 'currentColor'
  dataTestId?: string
}

export function LoadingSpinner({ color, dataTestId }: LoadingSpinnerProps) {
  const svgClasses = React.useMemo(() => {
    const arr = [styles.spinner, 'w-4 h-4', '-mt-px']

    switch (color) {
      case 'white': {
        arr.push('text-white')
        break
      }
      case 'dark': {
        arr.push('text-gray-800')
        break
      }
    }

    return arr.join(' ')
  }, [color])

  return (
    <svg className={svgClasses} viewBox='0 0 50 50' data-testid={dataTestId}>
      <circle
        className={styles.path}
        cx='25'
        cy='25'
        r='20'
        fill='none'
        strokeWidth='5'
      />
    </svg>
  )
}
