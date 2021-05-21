import React from 'react'
import { Button } from './index'
import { AsyncButton } from './async-button'

export function ButtonGroup({ children }: any) {
  return (
    <div className='flex space-x-2'>
      {React.Children.map(children, (child) => {
        if (child === null) {
          return null
        } else if (child.type !== Button && child.type !== AsyncButton) {
          throw new Error(
            `${child.type} is not a valid child of the ButtonGroup component.`
          )
        }
        return child
      })}
    </div>
  )
}
