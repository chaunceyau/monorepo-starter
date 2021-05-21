import React from 'react'
import { Button } from '../button'
import { Action } from './interfaces'

interface SlideoverFooterProps {
  actions: Action[]
}

export function SlideoverFooter(props: SlideoverFooterProps) {
  return (
    <div className='flex-shrink-0 px-4 border-t border-gray-200 py-5 sm:px-6'>
      <div className='space-x-3 flex justify-end'>
        {props.actions.map((action) => (
          <Button key={action.label} {...action} />
        ))}
      </div>
    </div>
  )
}
