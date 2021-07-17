import React from 'react'
import styles from './styles.module.css'

interface CheckIconProps {
 dataTestId?: string
 className?: string
}

export const CheckIcon: React.FC<CheckIconProps> = (props: CheckIconProps) => (
  <svg
    className={`${styles.checkmark} ${props.className} w-3 h-3`}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 52 52'
    data-testid={props.dataTestId}
  >
    <circle
      className={styles.checkmark__circle}
      cx='26'
      cy='26'
      r='25'
      fill='none'
    />
    <path
      className={styles.checkmark__check + ' text-white'}
      fill='none'
      d='M14.1 27.2l7.1 7.2 16.7-16.8'
    />
  </svg>
);
